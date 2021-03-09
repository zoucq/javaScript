
// modules = {}
// define
// b => function
// a => function [function(){}]

let modules = {}
function define(name,arr,fn){
    for(let i=0;i<arr.length;i++){
        console.log( 111,arr[i], modules[arr[i]]() )
        arr[i] = modules[arr[i]].apply()
    }
    fn.apply(fn,arr)
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
