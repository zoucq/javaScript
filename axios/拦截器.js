
// 数组存储对象函数
function InterceptorManager() {
    this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
    });
    return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
        this.handlers[id] = null;
    }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
    this.handlers.forEach((h,i) => {
        if (h !== null) {
            fn(h);
        }
    })
};

// 请求函数
function dispatchRequest(config){
    console.log('dispatchRequest', config)
    return new Promise((resolve, reject) => {
        if(Math.random() > 0.5){
            resolve({
                data: [1,2,3]
            })
        }else{
            reject('error')
        }
    })
}

function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}

Axios.prototype.request = function request(config) {
    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    // [ (r1-req-s,r1-req-r), dispatchRequest,undefined, (r1-res-s,r1-res-r) ]
    // 每次请求的request或response都会经过，一个成功一个失败，只走一个
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
        // 数组删除后，返回删除那个数组，连接then的函数并传参
        promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
};

const test = new Axios({})

test.interceptors.request.use((config) => {
    console.log('test request fulfilled')
    return config
},() => {
    console.log('test request rejected')
})

test.interceptors.response.use((config) => {
    console.log('test response fulfilled', config)
    return config
},(reason) => {
    console.log('test response rejected', reason)
})

let p = [1,2,3].map((a,i) => {
    return test.request({
        url: '/getData/test' + i,
        headers: {},
        data: {}
    })
})

Promise.all(p).then(res => {
    console.log('all', res)
})

// modules = {}
// define

function define(name,arr,fn){
    let modules = {}
    for(let i=0;i<arr.length;i++){
        fn.apply(fn,arr)
    }
    modules[name] = fn
    console.log('modules', modules)
}

define('b',[],function (){
    function bb(){
        return 'bb'
    }
    return {
        bb
    }
})

define('a',['b'],function (b){
    console.log('aa', b)
})

