
// let const
// array map some every reduce find
// Object.assign() Object.keys()
// 解构赋值 对象展开符 默认值 字符串拼接
// 箭头函数
// symbol set map
// for of
// includes trim repeat
// class


Array.prototype.myMap = function (cb){
    const arr = this
    const res = []
    for(let i=0;i<arr.length;i++){
        res.push( cb(arr[i], i) )
    }
    return res
}

let res = [1,2,3].myMap((v,i) => {
    console.log(123,i,v);
    return {i,v}
})
console.log(res);