
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
