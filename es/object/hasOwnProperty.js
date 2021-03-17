/*
    指示对象(自身属性)中是否具有指定的属性, 返回一个布尔值; 继承属性返回false;
    检查对象是否具有自己定义的属性，而不是其原型链上的某个属性;
    描述: 所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性
 */

let o = new Object();
o.prop = 'exists';
console.log( o.hasOwnProperty('prop') );             // 返回 true
console.log( o.hasOwnProperty('toString') );         // 返回 false
console.log( o.hasOwnProperty('hasOwnProperty') );   // 返回 false

for(let k in o){
    console.log(k)
}

// 使用 hasOwnProperty 作为属性名
// JavaScript 并没有保护 hasOwnProperty 这个属性名，因此，当某个对象可能自有一个占用该属性名的属性时，就需要使用外部的 hasOwnProperty 获得正确的结果：

let foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，
// 可以直接使用原型链上真正的 hasOwnProperty 方法
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
