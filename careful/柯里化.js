/*
    描述：函数柯里化是js函数式编程的一项重要应用，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
    原理：如果我们传入的参数不少于函数的参数，那么会直接执行并返回结果，否则返回一个函数，以供我们后续调用。
    两种
    1.参数固定，有具体个数，在返回函数的基础上，根据参数判断小于参数时递归传参，参数足够直接执行
    2.参数不固定，这时候主要就是用到toString方法，修改返回函数的toString执行函数
*/

function add(a,b){
    return a + b
}

let add1 = curryFn(add,1)
console.log(add1(2))
console.log(add1(3))


function curryFn(fn,...args){
    // 传入的参数不少于函数的参数，那么会直接执行并返回结果；否则返回一个函数，直到参数足够。
    return fn.length === args.length ?
            fn(args) :
            (...args2) => fn(...args,...args2)
}

function curry(fn, ...args){
    // 传入函数参数长度
    let fnLen = fn.length
    return (...argument) => {
        // 调用时合并传入的剩余参数
        argument = args.concat(argument)
        // 重点（传入的参数不少于函数的参数，那么会直接执行并返回结果；否则返回一个函数，直到参数足够。）
        if(argument.length < fnLen){
            return curry.apply(this, fn, args)
        }
        return fn.apply(fn, argument)
    }
}


console.log('---------- 面试题 ---------------')
console.log(someAdd(1)(2))
console.log(someAdd(1,2)(3));
console.log(someAdd(1)(2)(3)(4));


function someAdd(...args){

    // 返回函数收集参数并递归调用
    function add(...args2){
        args.push(...args2)
        return add
    }

    // 在Function需要转换为字符串时，通常会自动调用函数的 toString 方法
    // 重写toString方法，返回计算的所有的参数和
    add.toString = function sum(){
        return args.reduce((s,v) => s+v)
    }

    return add
}



console.log('---------- 异步加法 -----------');

function asyncAdd(a,b){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                let res = a+b
                resolve(res)
            }catch (e) {
                reject(e)
            }
        }, 200)
    })
}

(async () => {
    console.log('promise index start');
    await [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
        (s, a, i) => s.then(res => {
            console.log('promise index',i ,res)
            return asyncAdd(a, a + 1)
        }),
        Promise.resolve(1)
    )
    console.log('promise index end');


    console.log('promise all start')
    const p = [1,2,3,4,5,6,7,8,9].map(a =>{
        return asyncAdd(a, a+1)
    })
    const res = await Promise.all(p)
    console.log('promise all', res);
    console.log('promise all end')
})()
