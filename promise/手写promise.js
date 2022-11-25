
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
        // console.log('resolve params', value);
        if(this.status === PENDING){
            setTimeout(() => {
                this.status = FULFILLED
                this.value = value
                this.onFulfilledCb.forEach(a => a(value))
            })
        }
    }

    reject (reason) {
        // console.log('reject params', value);
        if(this.status === PENDING) {
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
    if(x === promise2){
        return reject(new TypeError('Chaining cycle detected for promise'))
    }

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

MyPromise.deferred = function () {
      let result = {};
      result.promise = new MyPromise((resolve, reject) => {
          result.resolve = resolve;
          result.reject = reject;
     });
     return result;
}

module.exports = MyPromise;


