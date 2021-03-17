/*
    用来检测 constructor.prototype 是否存在于参数 object 的原型链上
    判断一个引用类型是否属于某构造函数
    判断一个实例是否属于它的父类型
    @object 某个实例对象
    @constructor 某个构造函数
 */
function instanceof2(obj, constructor){
    let o = obj.__proto__
    let t = constructor.prototype
    while(true){
        if(o === null){
            return false;
        }
        if(o === t){
            return true;
        }
        o = o.__proto__
    }
}


function C(){}
let a = new C()

console.log( instanceof2(a, C) ) // true
console.log( instanceof2(a, Object) ) // true

console.log('------------------------------')

C.prototype = {};
let b = new C();
console.log( instanceof2(b, C) ) // true
console.log( instanceof2(a, C) ) // false, C.prototype 指向了一个空对象,这个空对象不在 a 的原型链上.

console.log('------------------------------')

let simpleStr = "This is a simple string";
let myString  = new String();

console.log( simpleStr instanceof String ); // false, 非对象实例，因此返回 false
console.log( myString  instanceof String ); // true

/*
    检测对象不是某个构造函数的实例时，你可以这样做
    if (!(mycar instanceof Car)) {
    }
 */
