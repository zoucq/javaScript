
/*
    1.创建一个空对象
    2.将空对象的_proto_属性指向构造函数的原型
    3.将this指向这个对象
    4.返回这个对象
 */

function newFn(Fn){
    let obj = {}
    obj.__proto__ = Fn.prototype
    Fn.apply(obj, [...arguments].slice(1))
    return obj
}

function Test(name){
    this.name = name
}

let t = newFn(Test, 'test')
console.log(t.name)

let a = [5,8,1,8,4,8,2]
a.sort((a,b) => a===8?1:-1)
// console.log(a)


let arr = [91,92,93,90,95,94,89,96,88,87]
// [1,1,2,1,3,2,1,0,0,0]

tt(arr)

function tt(arr){
    console.log(1111, arr)
    // 0
    let s = []
    let res = []
    for(let i=0;i<arr.length;i++){
        while(s.length && arr[i] > arr[s[s.length-1]]){
            let len = s.length-1
            res[s[len]] = i - s[len]
            s.pop()
        }
        s.push(i)
    }
    console.log('res', res)
}

Array.prototype.myReduce = function (fn, res) {
    this.map((...args) => {
        res = fn(res,...args)
        return res
    })
    return res
}

console.log(
    's1',
    [1,2,3].reduce((s, a, i) => {
        return s += a
    }, 0)
)
console.log(
    's2',
    [1,2,3].myReduce((s, a, i) => {
        return s += a
    }, 0)
)

console.log(
    's1',
    [1,2,3].reduce((s, a, i) => {
        s.push(a)
        return s
    }, [])
)
console.log(
    's2',
    [1,2,3].myReduce((s, a, i) => {
        s.push(a)
        return s
    }, [])
)

function ra(s){
    let res = []
    for(let i=0;i<s.length;i++){
        if(s[i] > 'a'){
            res[i] = s[i].toUpperCase()
        }else{
            res[i] = s[i].toLowerCase()
        }
    }
    return res.join('')
}
console.log(ra('sAzDqtYmN'))
