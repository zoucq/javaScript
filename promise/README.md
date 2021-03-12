# careful
## 其中一个reject直接就到catch了
* Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的
* Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
