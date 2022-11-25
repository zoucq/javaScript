
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const PENDING = 'pending'

class MyPromise {
    constructor(executor) {

        this.status = PENDING
        this.value = null
        this.reason = null

        // 异步处理：当promise内部存在异步操作时，then方法会先执行，异步操作后执行，回导致status还是penging，所以then方法执行不下去
        // 此处采用发布订阅模式处理下，then方法里面订阅要执行的函数，等resolve执行后在发布执行函数
        this.onFulfilledCb = []
        this.onRejectedCb = []

        try{
            // 外部实例下直接调用，改变下this指向
            executor(this.resolve.bind(this), this.reject.bind(this))
        }catch (e) {
            // console.log('executor catch',e);
            this.reject(e)
        }
    }

    resolve (value) {
        // 避免调用多次resolve
        if(this.status === PENDING){
            // console.log('resolve params', value);
            // 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
            // 这个事件队列可以采用“宏任务（macro-task）”机制，比如setTimeout 或者 setImmediate；
            // 也可以采用“微任务（micro-task）”机制来实现， 比如 MutationObserver 或者process.nextTick。
            setTimeout(() => {
                this.status = FULFILLED
                this.value = value
                this.onFulfilledCb.forEach(a => a(value))
            })
        }
    }

    reject (reason) {
        // 避免调用多次reject
        if(this.status === PENDING) {
            // console.log('reject params', value);
            setTimeout(() => {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCb.forEach(a => a(reason))
            })
        }
    }

    then (onFulfilled, onRejected) {
        // 检查onFulfilled和onRejected是不是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

        // 返回promise，后续链式调用
        let promise2 = new MyPromise((resolve, reject) => {
            if(this.status === FULFILLED){
                setTimeout(() => {
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch (e){
                        reject(e)
                    }
                })
            }else if(this.status === REJECTED){
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch (e){
                        reject(e)
                    }
                })
            }else if(this.status === PENDING){
                this.onFulfilledCb.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch (e){
                            reject(e)
                        }
                    })
                })
                this.onRejectedCb.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch (e){
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2
    }
}

function resolvePromise (promise2, x, resolve, reject) {
    // 2.3.1规范 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if(x === promise2){
        return reject(new TypeError('Chaining cycle detected for promise'))
    }

    // 2.3.2规范 如果 x 为 Promise ，则使 promise2 接受 x 的状态
    if(x instanceof MyPromise){
        if(x.status === PENDING){
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reject)
        }else if(x.status === FULFILLED){
            resolve(x.value)
        }else if(x.status === REJECTED){
            reject(x.reason)
        }
    }else if(x !== null && ['object', 'function'].includes(typeof x)){
        // 2.3.3 如果 x 为对象或函数
        try {
            // 2.3.3.1 把 x.then 赋值给 then
            var then = x.then;
        } catch (e) {
            // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
            return reject(e);
        }

        if(typeof then === 'function'){
            let called = false; // 避免多次调用
            try{
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            }catch (e){
                if (called) return;
                called = true;
                reject(e);
            }
        }else {
            // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x);
        }
    } else {
        // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
        return resolve(x);
    }

}


// const p1 = new Promise((resolve, reject) => {
//     console.log(111)
//     setTimeout(() => {
//         resolve('resolve')
//         // reject('reject')
//     })
//     // throw 'error'
// })
// // console.log('promise p', p);
// p1.then((v) => {
//     console.log('resolved', v)
// }, (reason) => {
//     console.log('rejected', reason);
// }).then((v) => {
//     console.log('resolved222', v)
// }, (reason) => {
//     console.log('rejected222', reason);
// })
//
// const p = new MyPromise((resolve, reject) => {
//     console.log(111)
//     setTimeout(() => {
//         resolve('resolve')
//         // reject('reject')
//     })
//     // throw 'error'
// })
// // console.log('promise p', p);
// p.then((v) => {
//     console.log('resolved', v)
// }, (reason) => {
//     console.log('rejected', reason);
// }).then((v) => {
//     console.log('resolved222', v)
// }, (reason) => {
//     console.log('rejected222', reason);
// })

// promises-aplus-tests 测试需要的方法
MyPromise.deferred = function () {
      let result = {};
      result.promise = new MyPromise((resolve, reject) => {
          result.resolve = resolve;
          result.reject = reject;
     });
     return result;
}

module.exports = MyPromise;


