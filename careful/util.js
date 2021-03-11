
function isType(val){
    return Object.prototype.toString.call(val).slice(8, -1)
}

function isObject(val) {
    return isType(val) === 'Object'
}

function isArray(val) {
    return isType(val) === 'Array'
}

module.exports = {
    isType,
    isObject,
    isArray
}
