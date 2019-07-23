#!/bin/bash
./etc/profile
tomcatPath="/home/workdisk/apache-tomcat-6.0.35"
binPath="$tomcatPath/bin"
echo "[info][$(date +'%F %H:%M:%S')]正在监控tomcat，路径：$tomcatPath"
pid=`ps -ef | grep tomcat | grep -w $tomcatPath | grep -v 'grep' | awk '{print $2}'`
if [ -n "$pid" ]; then
echo "[info][$(date +'%F %H:%M:%S')]tomcat进程为：$pid"
echo "[info][$(date +'%F %H:%M:%S')]tomcat已经启动，准备使用shutdown命令关闭..."
$binPath"/shutdown.sh"
sleep 2
pid=`ps -ef | grep tomcat | grep -w $tomcatPath | grep -v 'grep' | awk '{print $2}'`
if [ -n "$pid" ]; then
echo "[info][$(date +'%F %H:%M:%S')]使用shutdown命令关闭失败，准备kill进程..."
kill -9 $pid
echo "[info][$(date +'%F %H:%M:%S')]kill进程完毕！"
sleep 1
else
echo "[info][$(date +'%F %H:%M:%S')]使用shutdown命令关闭成功！"
fi
else
echo "[info][$(date +'%F %H:%M:%S')]tomcat未启动！"
fi
echo "[info][$(date +'%F %H:%M:%S')]准备启动tomcat..."
$binPath"/startup.sh"
# this is a change
# a change too
