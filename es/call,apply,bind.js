

Function.prototype.myCall = function (ctx, ...args) {
    ctx = ctx || window
    let id = Symbol('myCall')
    ctx[id] = this
    let res = ctx[id](...args)
    delete ctx[id]
    return res
}

function say(argus){
    console.log(argus, this.a)
}

say.call({ a:1 }, 'test1')
say.call(this, 'test2')
say.call(null, 'test3')
say.call(undefined, 'test4')

console.log('----------------')

say.myCall({ a:1 }, 'test1')
say.myCall(this, 'test2')
say.myCall(null, 'test3')
say.myCall(undefined, 'test4')


console.log('----------------')


Function.prototype.myApply = function (ctx, args) {
    ctx = ctx || window
    let id = Symbol('myApply')
    ctx[id] = this
    let res = ctx[id](...args)
    delete ctx[id]
    return res
}

say.apply({ a:1 }, ['test1'])
say.apply(this, ['test2'])
say.apply(null, ['test3'])
say.apply(undefined, ['test4'])
say.apply('', ['test5'])

console.log('----------------')

say.myApply({ a:1 }, ['test1'])
say.myApply(this, ['test2'])
say.myApply(null, ['test3'])
say.myApply(undefined, ['test4'])
say.myApply('', ['test5'])

