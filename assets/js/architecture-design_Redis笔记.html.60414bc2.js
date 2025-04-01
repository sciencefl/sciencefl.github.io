"use strict";(self.webpackChunkgo_beyond=self.webpackChunkgo_beyond||[]).push([[586],{8295:(i,e)=>{e.A=(i,e)=>{const l=i.__vccOpts||i;for(const[i,t]of e)l[i]=t;return l}},1839:(i,e,l)=>{l.r(e),l.d(e,{comp:()=>o,data:()=>n});var t=l(4691);const s={},o=(0,l(8295).A)(s,[["render",function(i,e){return(0,t.uX)(),(0,t.CE)("div",null,e[0]||(e[0]=[(0,t.Fv)("<p>Redis笔记 一、数据结构</p><ol><li>String： 缓存，计数，共享session</li><li>list：消息列表，文章列表，记录前N个最新登录的用户ID列表</li><li>set ：独立IP，共同爱好，标签</li><li>hash：存储、读取、修改用户属性</li><li>Sorted set：排行榜</li></ol><p>二、更新方式（缓存一致性）：</p><ol><li>实时更新：在一个事务内先删除缓存，再更新数据库，再更新缓存</li><li>异步准实时更新：在一个事务内先通过消息队列发布待更新数据消息给缓存更新服务，然后更新数据库；缓存更新服务订阅缓存更新消息，待收到更新消息后更新缓存。</li></ol><p>三、缓存淘汰机制</p><ol><li>不淘汰缓存</li><li>最近最少使用LRU 从已设置过期时间的key中选择</li><li>最近最不经常使用(LFU) 从已设置过期时间的key中选择</li><li>随机淘汰 从已设置过期时间的key中选择</li><li>生存时间淘汰 移出将要过期的ttl值小的key 从已设置过期时间的key中选择</li><li>全键LRU</li><li>全键LFU</li><li>全键随机</li></ol><p>四、Redis分布式存储方案</p><ol><li>主从模式：一主多从，出现故障时手动切换。</li><li>哨兵模式：有哨兵的一主多从，主节点故障自动选择新的主节点。</li><li>集群模式：分节点对等集群，分slots，不同slots的信息存储到不同的节点。</li></ol><p>五、集群模式下的Redis切片方式</p><ol><li>客户端切片：在客户端通过Key的hash值对应到不同的服务器。将分片工作放在业务程序端。不依赖于第三方分布式中间件，实现方法和代码可掌控，对开发人员要求高。</li><li>中间件切片：在应用软件和Redis中间由中间件实现服务到后台redis节点的路由分派。将分片工作交给专门的代理程序来做，运维方便。代表：Twemproxy，Codis。</li><li>客户端服务器协作分片：Redis Cluster将所有Key映射到16384个Slot中，集群中每个Redis实例负责一部分，业务程序通过集成的Redis Cluster客户端进行操作。redisCluter模式，客户端采用一致性哈希，服务端提供错误节点的重定向服务slot上。不同的slot对应到不同服务器。</li></ol><p>六、Redis数据分片方案</p><ol><li>范围分片：按数据范围值（0-60，61-80，81-100）</li><li>哈希分片：通过key进行hash运算分片（类似于取余），余数相同放在一个实例。</li><li>一致性哈希分片： 利用扩展结点，可以有效解决重新分配结点带来的无法命中问题。哈希分片的改进（有效解决hash无法命中问题）哈希环、节点、数据对象</li><li>哈希槽分片算法：redis真正采用的分区算法</li></ol><p>七、Redis持久化存储机制</p><ol><li>RDB(Redis DataBase):把当前内存中的数据集快照写入磁盘，恢复时将快照文件直接读到内存。</li><li>AOF(Append Only File)：通过不断保存Redis服务器所执行的更新命令来记录数据库状态，恢复数据时需要从头开始执行命令。</li></ol><p>八、Redis常见问题</p><ol><li>缓存雪崩：大部分缓存失效，直接请求到数据库，导致数据库压力过大，甚至崩溃。 解决方案：1. 使用锁或者队列，保证不会有大量的线程对数据库一次性读写，避免大量请求落在最底层的存储系统上。 2. 固定过期时间上加一个随机的时间作为缓存失效时间。 3. 二级缓存：设置一个有时间限制的缓存和无时间限制的缓存，避免大规模访问数据库。</li><li>缓存击穿(缓存穿透)： 大量请求没有缓存的key，从而直接查询数据库。 解决方案：1. 查询结果为空时，直接设置一个默认的值存放在缓存上，同时缓存过期时间不超过5分钟，以便正常更新缓存。 2. 设置布隆过滤器,将所有可能存在的数据哈希到一个足够大的bitmap中，一个一定不存在的数据会被这个bitmap拦截掉，从而避免了对底层存储系统的压力。 原理：一个bitmap和k个哈希函数，当一个元素加入布隆过滤器时，这个元素经过k个哈希函数运算得到k个哈希值，将这个k个哈希值，并且根据得到的哈希值，在维数组中把对应下标的值置位1。 判断某个数是否在布隆过滤器中，就对该元素进行k次哈希计算，得到的值在位数组中判断每个元素是否都为1，如果每个元素都为1，就说明这个值在布隆过滤器中。 误判，是因为哈希值有限，有可能通过哈希碰撞，导致重复，但是如果判断哈希值不在map中则，一定不在。</li><li>缓存预热 1. 人工编写界面，手动刷新加载 2. 数据量不大时，服务启动的时候通过编写代码进行加载。 3.定时刷新缓存。</li><li>缓存更新</li><li>缓存降级</li></ol>",16)]))}]]),n=JSON.parse('{"path":"/architecture-design/Redis%E7%AC%94%E8%AE%B0.html","title":"","lang":"zh-CN","frontmatter":{"description":"Redis笔记 一、数据结构 String： 缓存，计数，共享session list：消息列表，文章列表，记录前N个最新登录的用户ID列表 set ：独立IP，共同爱好，标签 hash：存储、读取、修改用户属性 Sorted set：排行榜 二、更新方式（缓存一致性）： 实时更新：在一个事务内先删除缓存，再更新数据库，再更新缓存 异步准实时更新：在一...","head":[["meta",{"property":"og:url","content":"https://sciencefl.github.io/architecture-design/Redis%E7%AC%94%E8%AE%B0.html"}],["meta",{"property":"og:site_name","content":"FlynnDocs 学习笔记"}],["meta",{"property":"og:description","content":"Redis笔记 一、数据结构 String： 缓存，计数，共享session list：消息列表，文章列表，记录前N个最新登录的用户ID列表 set ：独立IP，共同爱好，标签 hash：存储、读取、修改用户属性 Sorted set：排行榜 二、更新方式（缓存一致性）： 实时更新：在一个事务内先删除缓存，再更新数据库，再更新缓存 异步准实时更新：在一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-01T07:47:50.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-01T07:47:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-01T07:47:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Flynn\\",\\"url\\":\\"https://sciencefl.github.io/\\"}]}"]]},"headers":[],"git":{"createdTime":1733297771000,"updatedTime":1743493670000,"contributors":[{"name":"fuliang","email":"fuliang@ssc-hn.com","commits":2}]},"readingTime":{"minutes":4.58,"words":1374},"filePathRelative":"architecture-design/Redis笔记.md","localizedDate":"2024年12月4日","excerpt":"<p>Redis笔记\\n一、数据结构</p>\\n<ol>\\n<li>String： 缓存，计数，共享session</li>\\n<li>list：消息列表，文章列表，记录前N个最新登录的用户ID列表</li>\\n<li>set ：独立IP，共同爱好，标签</li>\\n<li>hash：存储、读取、修改用户属性</li>\\n<li>Sorted set：排行榜</li>\\n</ol>\\n<p>二、更新方式（缓存一致性）：</p>\\n<ol>\\n<li>实时更新：在一个事务内先删除缓存，再更新数据库，再更新缓存</li>\\n<li>异步准实时更新：在一个事务内先通过消息队列发布待更新数据消息给缓存更新服务，然后更新数据库；缓存更新服务订阅缓存更新消息，待收到更新消息后更新缓存。</li>\\n</ol>","autoDesc":true}')}}]);