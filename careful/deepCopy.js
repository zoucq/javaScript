
const {isObject, isArray} = require('./util.js')

function deepCopy(obj){
    if(!isObject(obj) || !isArray(obj)) return obj
    let res = isObject(obj) ? {} : []
    for(let k in obj){
        if(isObject(obj) || isArray(obj)){
            res[k] = deepCopy(obj[k])
        }else{
            res[k] = obj[k]
        }
    }
    return res
}

console.log('deepCopy', deepCopy(
    {
        a: {
            b:{c:'d'}
        },
        h:[
            {
                i: {j: 'k'}
            },
            [1,2,3],
            4
        ]
    }
))
