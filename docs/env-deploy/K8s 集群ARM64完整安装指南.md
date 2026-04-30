# K8s 集群 ARM64 完整安装指南

环境概述

- 服务器：3 台 **ARM64** 架构 openEuler 24.03
- 集群架构：**1 Master + 2 Worker**
- 容器运行时：**containerd 2.2.1（二进制手动安装）**
- 必装依赖：**runc 1.4.0 + CNI 插件 1.9.0**
- Kubernetes 版本：**v1.34.6**
- 权限约束：**仅 admin 用户 + sudo，禁止 root 登录**
- 网络插件：Calico
- 状态：可直接复制生产部署

## 集群规划

| 节点角色 | 角色        | 内网 IP                     | 执行范围          |
| -------- | ----------- | --------------------------- | ----------------- |
| Master   | k8s-master  | [10.0.71.211](ssc-kp01-101) | 全节点 + 专属操作 |
| Worker 1 | k8s-worker1 | [10.0.71.212](ssc-kp01-102) | 全节点 + 加入集群 |
| Worker 2 | k8s-worker2 | [10.0.71.205](ssc-kp01-05)  | 全节点 + 加入集群 |

## 通用规则

1. 全程使用 **admin** 用户登录
2. **系统操作** 必须加 `sudo`
3. **用户操作**（kubectl 配置）不加 `sudo`
4. 命令标注：`【所有节点】`/`【仅 Master】`/`【仅 Worker】`

# 第一部分：所有节点 → 系统初始化（必备基础）

## 1. 设置主机名（可选，可不执行，本文未执行，推荐生产环境执行）

```Bash
# Master 执行
sudo hostnamectl set-hostname k8s-master
# Worker1 执行
sudo hostnamectl set-hostname k8s-worker1
# Worker2 执行
sudo hostnamectl set-hostname k8s-worker2
```

**作用**：为节点设置唯一名称，K8s 识别节点的基础。

## 2. 配置 hosts 主机解析（可选，可不执行，本文未执行，推荐生产环境执行）

```Bash
sudo tee -a /etc/hosts << EOF
10.0.71.211   k8s-master
10.0.71.212   k8s-worker1
10.0.71.205   k8s-worker2
EOF
```

**作用**：节点间通过主机名通信，不依赖外部 DNS，保证集群稳定。

## 3.初始化磁盘

作用：外置磁盘初始化 + 数据盘挂载 + K8s 目录绑定挂载

🔴 前置必查（防止格式化错误磁盘！）

```Bash
# 1. 查看系统识别的磁盘，确认数据盘是 /dev/sdb（无MOUNTPOINT、无数据）
lsblk

# 2. 确认磁盘未挂载、无重要数据（以下命令仅空盘执行！）
sudo umount /dev/sdb* 2>/dev/null
```

### 1) 挂载磁盘:磁盘分区 + 格式化（GPT + XFS）

> 如果外置数据盘已正确挂载（完成初始化并挂载到/data盘），就跳过此步骤。

使用如下命令初始化外置磁盘（理论上应该就是/dev/sdb）

```Bash
# 1. 创建GPT分区表
sudo parted /dev/sdb mklabel gpt -s

# 2. 创建1个完整分区
sudo parted /dev/sdb mkpart primary xfs 0% 100%

# 3. 刷新内核分区表（关键：让系统识别新分区）
sudo partprobe /dev/sdb

# 4. 格式化分区为XFS（-f 强制格式化，空盘执行！）
sudo mkfs.xfs -f /dev/sdb1

# 5. 获取分区UUID（复制备用，格式如：12345678-1234-1234-1234-1234567890ab）
sudo blkid /dev/sdb1
```

### 2) 创建根数据目录 /data 并配置永久挂载

1. 创建挂载目录

```Bash
sudo mkdir -p /data
```

1. 配置 /etc/fstab（永久挂载）

```Bash
# 编辑fstab文件
sudo vi /etc/fstab
```

**在文件末尾添加**（替换`你的UUID`为上一步获取的值）：

```Bash
# /dev/sdb1 数据盘，XFS文件系统，开机挂载
UUID=你的UUID  /data  xfs  defaults  0 0
```

1. 测试挂载（必做！防止 fstab 写错导致开机失败）

```Bash
# 测试fstab配置，无报错则正常
sudo mount -a

# 验证挂载成功
df -h /data
```

✅ 出现 `/data` 挂载信息即成功。

### 3) 初始化数据目录+ 迁移原有数据（若没有数据，则不用迁移）

1. 停止占用目录的服务（必须停止，否则无法迁移数据）

```Bash
sudo systemctl stop containerd docker kubelet
```

1. 创建数据盘子目录

```Bash
sudo mkdir -p /data/var/lib/{containerd,kubelet,docker,longhorn}
```

1. 迁移原有数据到新磁盘（避免数据丢失！）

如果本机器上未安装 containerd docker longhorn 等，则 3、4 步骤无需操作

```Markdown
# 迁移 containerd 数据
sudo mv /var/lib/containerd/* /data/var/lib/containerd/ 2>/dev/null
# 迁移 kubelet 数据
sudo mv /var/lib/kubelet/* /data/var/lib/kubelet/ 2>/dev/null
# 迁移 docker 数据
sudo mv /var/lib/docker/* /data/var/lib/docker/ 2>/dev/null
# 迁移 longhorn 数据
sudo mv /var/lib/longhorn/* /data/var/lib/longhorn/ 2>/dev/null
```

1. 清空原目录（为绑定挂载做准备）

```Bash
sudo rm -rf /var/lib/{containerd,kubelet,docker,longhorn}/*
```

### 4) 配置绑定挂载（Bind Mount）并永久生效

1. 再次编辑 /etc/fstab

```Bash
sudo vi /etc/fstab
```

**在文件末尾追加以下内容**（标准配置，无语法错误）：

```Bash
# K8s 绑定挂载（禁止软链接，避免服务异常）
/data/var/lib/longhorn    /var/lib/longhorn    none    bind    0 0
/data/var/lib/containerd  /var/lib/containerd  none    bind    0 0
/data/var/lib/docker      /var/lib/docker      none    bind    0 0
/data/var/lib/kubelet     /var/lib/kubelet     none    bind    0 0
```

加载所有绑定挂载

```Bash
sudo mount -a
```

### 5) 恢复服务 + 权限修复

1. 启动服务

```Bash
sudo systemctl start containerd docker kubelet
```

修复目录权限（防止服务无权限读写）

```Bash
sudo chmod -R 700 /var/lib/{containerd,kubelet,docker,longhorn}
sudo chown -R root:root /var/lib/{containerd,docker}
sudo chown -R root:root /var/lib/kubelet
sudo chown -R 1000:1000 /var/lib/longhorn 2>/dev/null
```

## 3. 永久关闭 Swap（K8s 强制要求）

```Bash
sudo swapoff -a
sudo sed -i '/swap/s/^/#/' /etc/fstab
```

**作用**：K8s 禁止交换分区，否则调度异常、容器性能暴跌。

## 4. 关闭防火墙 & SELinux

```Bash
sudo systemctl stop firewalld
sudo systemctl disable firewalld

sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
```

**作用**：关闭系统安全限制，避免拦截 K8s 网络通信与文件访问。

## 5. 配置容器网络内核参数

```Bash
sudo tee /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo modprobe br_netfilter
sudo sysctl --system
```

**作用**：开启内核网络转发，让 Pod 可以跨节点通信。

## 6. 安装时间同步服务

```Bash
sudo dnf install -y chrony
sudo systemctl enable --now chronyd
```

**作用**：所有节点时间一致，K8s 证书、etcd 强依赖时间同步。

## 7. 加载 IPVS 高性能负载模块

```Bash
sudo dnf install -y ipvsadm ipset conntrack
sudo tee /etc/modules-load.d/ipvs.conf << EOF
ip_vs
ip_vs_rr
ip_vs_wrr
ip_vs_sh
nf_conntrack
EOF

sudo modprobe $(cat /etc/modules-load.d/ipvs.conf)
```

**作用**：提升 K8s Service 负载均衡性能，生产环境必配。

# 第二部分：所有节点 → 二进制安装 containerd 2.2.1

## 1. 创建工作目录

```Bash
mkdir -p $HOME/container && cd $HOME/container
```

**作用**：存放安装包，避免文件混乱。

## 2. 下载官方 ARM64 二进制包

```Bash
wget https://github.com/containerd/containerd/releases/download/v2.2.1/containerd-2.2.1-linux-arm64.tar.gz
```

**作用**：下载指定版本的容器运行时安装包。

## 3. 解压安装到系统目录

```Bash
sudo tar Cxzvf /usr/local containerd-2.2.1-linux-arm64.tar.gz
```

**作用**：将 containerd 二进制文件安装到系统全局路径。

## 4. 安装 systemd 服务文件

```Bash
sudo wget -P /etc/systemd/system/ https://raw.githubusercontent.com/containerd/containerd/main/containerd.service
```

**作用**：让系统可以管理 containerd 开机自启 / 状态。

## 5. 创建配置目录 &生成默认配置

```Bash
sudo mkdir -p /etc/containerd
sudo /usr/local/bin/containerd config default | sudo tee /etc/containerd/config.toml
```

**作用**：生成 containerd 标准配置文件。

## 6. 修改核心配置

### 1）启用 systemd cgroup 驱动（K8s 强制要求）

```Bash
# 启用 systemd cgroup 驱动（K8s 强制要求）
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
```

### 2）替换 pause 镜像为国内源，直接修改配置文件的地址（推荐）

```Bash
# 替换 pause 镜像为国内源
sudo sed -i 's#registry.k8s.io/pause#registry.aliyuncs.com/google_containers/pause#' /etc/containerd/config.toml
```

### 3）设置镜像代理

1. 创建代理相关文件和目录

```Bash
# 设置镜像proxy
sudo mkdir -p /etc/containerd/certs.d/docker.io/ /etc/containerd/certs.d/registry.k8s.io/
cat <<EOF | sudo tee /etc/containerd/certs.d/docker.io/hosts.toml
server = "https://docker.io"

[host."https://docker.m.daocloud.io"]
  capabilities = ["pull", "resolve"]
EOF
cat <<EOF | sudo tee /etc/containerd/certs.d/registry.k8s.io/hosts.toml
server = "registry.k8s.io"

[host."https://k8s.m.daocloud.io"]
  capabilities = ["pull", "resolve"]
EOF
```

1. 修改/etc/containerd/config.toml 配置文件的 config_path，大约 54 行（不修改的话会导致镜像 porxy 不生效）

删除`:/etc/docker/certs.d` 只保留`/etc/containerd/certs.d`

修改前：

```TOML
[plugins.'io.containerd.cri.v1.images'.registry]
    config_path = '/etc/containerd/certs.d:/etc/docker/certs.d'
```

修改后如下所示：

```TOML
[plugins.'io.containerd.cri.v1.images'.registry]
    config_path = '/etc/containerd/certs.d'
```

### 4） 重启服务以使配置生效

```Bash
sudo systemctl daemon-reload
sudo systemctl restart containerd
```

**作用**：解决兼容问题，加速镜像拉取。

## 7. 启动并设置开机自启

```Bash
sudo systemctl daemon-reload
sudo systemctl enable --now containerd
sudo systemctl status containerd
```

**作用**：启动服务，服务器重启后自动运行。

## 8. 验证安装

```Bash
/usr/local/bin/containerd --version
```

**作用**：确认版本为 **2.2.1**，安装成功。

# 第三部分：所有节点 → 安装 runc（容器发动机，必装）

## 1. 下载 runc ARM64 版本

```Bash
wget https://github.com/opencontainers/runc/releases/download/v1.4.0/runc.arm64
```

**作用**：下载容器底层运行工具（containerd 必须依赖）。

## 2. 安装到系统目录

```Bash
sudo install -m 755 runc.arm64 /usr/local/bin/runc
```

**作用**：赋予执行权限，全局可调用。

## 3. 验证

```Bash
runc --version
```

**作用**：确认安装成功。

# 第四部分：所有节点 → 安装 CNI 插件（容器网络，必装）

## 1. 创建标准目录

```Bash
sudo mkdir -p /opt/cni/bin
```

**作用**：K8s 强制要求的 CNI 工具存放路径。

## 2. 下载 CNI 插件包

```Bash
wget https://github.com/containernetworking/plugins/releases/download/v1.9.0/cni-plugins-linux-arm64-v1.9.0.tgz
```

**作用**：下载容器网络基础工具集。

## 3. 解压安装

```Bash
sudo tar Cxzvf /opt/cni/bin cni-plugins-linux-arm64-v1.9.0.tgz
```

**作用**：安装网络工具，供 Calico/K8s 调用。

## 4. 验证

```Bash
ls /opt/cni/bin
```

**作用**：查看是否生成 bridge/loopback 等工具。

# 第五部分：所有节点 → 安装 K8s v1.34.6（ARM64 专属）

## 1. 配置 软件源

K8S官方维护

```Bash
# 创建 Kubernetes 仓库文件，安装k8s 1.34版本
sudo tee /etc/yum.repos.d/kubernetes.repo <<'EOF'
[kubernetes]
name=Kubernetes
baseurl=https://pkgs.k8s.io/core:/stable:/v1.34/rpm/
enabled=1
gpgcheck=1
gpgkey=https://pkgs.k8s.io/core:/stable:/v1.34/rpm/repodata/repomd.xml.key
repo_gpgcheck=1
EOF
# 导入 GPG 密钥
rpm --import https://pkgs.k8s.io/core:/stable:/v1.34/rpm/repodata/repomd.xml.key
```

**作用**：添加 ARM 架构专用源，下载 v1.34.6 版本。

## 2. 安装 K8s 核心组件

```Bash
sudo dnf install -y kubelet-1.34.6 kubeadm-1.34.6 kubectl-1.34.6
```

**作用**：

- kubelet：节点代理，管理容器
- kubeadm：集群初始化工具
- kubectl：集群管理命令行

## 3. 启动 kubelet 并开机自启

```Bash
sudo systemctl enable --now kubelet
```

**作用**：节点核心服务开机自启。

# 第六部分：【仅 Master】初始化 K8s 集群

```Bash
sudo kubeadm init \
  --apiserver-advertise-address=10.0.71.211 \
  --kubernetes-version=v1.34.6 \
  --service-cidr=10.96.0.0/12 \
  --pod-network-cidr=192.168.0.0/16 \
  --image-repository=registry.aliyuncs.com/google_containers \
  --cri-socket=unix:///var/run/containerd/containerd.sock
```

## 参数含义详解

- `--apiserver-advertise-address=10.0.71.211`
  - 含义：指定 API Server 对外广播的 IP 地址。这是其他节点（Worker）加入集群时连接的地址，也是你配置 `kubectl` 连接集群的地址。
- `--kubernetes-version=v1.34.6`
  - 含义：指定要安装的 Kubernetes 版本。
  - 注意：`v1.34.6` 。请确保你使用的镜像源确实有这个版本，否则可能会报“版本不存在”的错误。建议先运行 `yum list kubeadm --showduplicates | sort -r` 确认可用版本。
- `--service-cidr=10.96.0.0/12`
  - 含义：指定 Service（服务）的虚拟 IP 地址池。这些 IP 不会分配给具体的物理网卡，而是用于集群内部服务发现。
  - 注意：通常不需要修改。只要这个网段不和你所在的物理网络（`10.0.71.0/24`）冲突即可。
- `--pod-network-cidr=192.168.0.0/16`
  - 含义：指定 Pod（容器组）的 IP 地址池。集群中每个 Pod 都会从这个网段分配一个 IP。
  - 注意：这个网段通常配合网络插件（CNI）使用。`10.244.0.0/16` 是著名的 Flannel 网络插件的默认网段。如果你打算用 Flannel，这个参数是正确的。Calico 的官方 `yaml` 配置文件（比如 `tigera-operator` 或 `calico.yaml`）中，默认的 IP Pool 通常是 `192.168.0.0/16` 或者 `10.42.0.0/16`（取决于具体发行版）
- `--cri-socket=unix:///var/run/containerd/containerd.sock`
  - 含义：Kubernetes 版本（v1.24+）已经移除了 Docker-shim，如果使用的是 `containerd` 或 `cri-dockerd`，通常需要显式指定 socket 路径，否则初始化可能会报错找不到运行时。如果用的是 cri-dockerd，路径是 `unix:///var/run/cri-dockerd.sock`
- `--image-repository=``registry.aliyuncs.com/google_containers`
  - 为了防止拉取镜像超时，建议显式指定阿里云镜像源。如果已经指定了镜像代理，则可以不用设置。

**作用**：创建 K8s 控制面（apiserver/etcd/controller-manager），生成节点加入令牌。

## ✅ 配置 admin 用户 kubectl 权限

```Bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

**作用**：普通用户直接管理集群，无需 root。

常见问题：

1. #### Token 后续还可以重新生成吗

可以，Token 随时都可以重新生成。

Token 是有时效性的（默认 24 小时），而且是可以无限次重新生成的。你完全不用担心现在生成的 token 过期或者忘记了怎么办。

**场景 1：Token 过期了，或者你忘记了**

你可以随时在 Master 节点上运行以下命令生成一个新的：

```Bash
# 生成一个新的 token 并打印出完整的 join 命令
kubeadm token create --print-join-command
```

**场景 2：你想指定特定的 Token**

你可以在命令里加上 `--token` 参数：

```Bash
sudo kubeadm init \
  --apiserver-advertise-address=10.0.71.211 \
  --kubernetes-version=v1.34.6 \
  --service-cidr=10.96.0.0/12 \
  --pod-network-cidr=192.168.0.0/16 \
  --image-repository=registry.aliyuncs.com/google_containers \
  --token abcdef.0123456789abcdef \
  --cri-socket=unix:///var/run/containerd/containerd.sock
```

## 📌 保存 Worker 加入命令（终端输出，示例）

```Bash
sudo kubeadm join 10.0.71.211:6443 --token xxx --discovery-token-ca-cert-hash sha256:xxx
```

若 token 忘记或者遗失，可随时生成

# 第七部分：【仅 2 台 Worker】加入集群

在两台 Worker 分别执行**你自己保存的命令**：

```Bash
sudo kubeadm join 10.0.71.211:6443 --token xxx --discovery-token-ca-cert-hash sha256:xxx
```

**作用**：将工作节点加入集群，由 Master 统一调度。

# 第八部分：【仅 Master】安装 Calico 网络插件

```Bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/refs/tags/v3.31.3/manifests/calico.yaml
```

**作用**：实现 Pod 跨节点通信，集群必备。

# 第九部分：集群最终验证（仅 Master）

## 1. 查看节点状态

```Bash
kubectl get nodes
```

✅ 结果：所有节点 **Ready**

## 2. 查看系统 Pod

```Bash
kubectl get pods -n kube-system
```

✅ 结果：所有 Pod **Running**

## 3. 查看 K8s 版本

```Bash
kubectl version
```

✅ 结果：**v1.34.6**

## 4. 部署 nginx 测试

```Bash
kubectl create deployment nginx --image=nginx --replicas=2
kubectl  get pods -n default
```

✅ 结果：部署 成功

```Bash
[admin@ssc-kp01-101 containerd]$ kubectl  get pods -n default
NAME                     READY   STATUS    RESTARTS   AGE
nginx-66686b6766-8lszs   1/1     Running   0          15m
nginx-66686b6766-ssm9m   1/1     Running   0          15m
```

# 第十部分：生产环境优化（推荐）

## 安装监控组件 metrics-server

```Bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

**作用**：支持 `kubectl top` 查看资源使用率，支持自动扩缩容。

```Bash
[admin@ssc-kp01-101 containerd]$ kubectl top node
NAME           CPU(cores)   CPU(%)   MEMORY(bytes)   MEMORY(%)   
ssc-kp01-05    78m          0%       1472Mi          0%          
ssc-kp01-101   214m         0%       3288Mi          0%          
ssc-kp01-102   86m          0%       1535Mi          0% 
```

# 🔴 最终完整性检查（全部满足）

✅ containerd 2.2.1（二进制安装） 

✅ runc 1.4.0（必装依赖） 

✅ CNI 插件 1.9.0（必装依赖） 

✅ K8s v1.34.6 

✅ ARM64 + openEuler 24.03 

✅ 1 Master + 2 Worker 

✅ admin + sudo，无 root 

✅ 生产环境可用
