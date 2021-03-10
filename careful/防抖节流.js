
function debonce(fn, wait){
    let timer = null
    return (...args) => {
        if(timer){
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        },wait)
    }
}

function test(p1,p2){
    console.log('test', p1, p2)
}

let dTest = debonce(test,200)


function throttle(fn, wait){
    let timer = null
    return (...args) => {
        if(timer) return
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        },wait)
    }

    // let timer = null
    // let now = 0
    // return (...args) => {
    //     if(!timer && Date.now() - now > wait){
    //         timer = setTimeout(() => {
    //             fn.apply(this, args)
    //             timer = null
    //             now = Date.now()
    //         },wait)
    //     }
    // }
}

let tTest = throttle(test,1000)
