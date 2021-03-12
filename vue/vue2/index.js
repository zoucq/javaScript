
function covert(obj){
    Object.keys(obj).forEach(key => {
        let value = obj[key]
        Object.defineProperty(obj, key, {
            get(){
                console.log(`get ${key} ${value}`)
                return value
            },
            set(newVal) {
                value = newVal
                console.log(`set ${key} ${value}`)
            }
        })
    })
}

let obj = {
    a:1,
    b:2
}
covert(obj)
obj.a = 11
obj.b = obj.a


console.log('--------------------------')

const state = {
    aa: 11,
    bb: 22
}

let wrapperUpdate
function autorun(update){
    wrapperUpdate = this
    update()
    wrapperUpdate = null
}

class Dep {
    constructor() {
        this.subscribe = new Set()
    }
    depend(){
        if(wrapperUpdate){
            this.subscribe.add(wrapperUpdate)
        }
    }
    notify(){
        this.subscribe.forEach(a => a())
    }
}

autorun(() => {
    console.log(state.aa)
})

autorun(() => {
    console.log(state.bb)
})

console.log('--------------------------')

class Dep2 {
    constructor() {
        this.subscribe = new Set()
    }
    depend(fn){
        if(!fn) return
        this.subscribe.add(fn)
    }
    notify(){
        this.subscribe.forEach(a => a())
    }
}

let dep = new Dep2()

let currentUpdate
function collectRun(update){
    if(!update) return
    currentUpdate = update
    update()
    currentUpdate = null
}

function observe(data){
    Object.keys(data).forEach(key => {
        let value = data[key]
        Object.defineProperty(data, key, {
            get(){
                console.log(`get ${key} ${value}`)
                if(currentUpdate){
                    dep.depend(currentUpdate)
                }
                return value
            },
            set(newVal) {
                value = newVal
                console.log(`set ${key} ${value}`)
                dep.notify()
            }
        })
    })
}

const data = {
    aa: 11,
    bb: 22
}

observe(data)

collectRun(() => {
    console.log('collectRun', data.aa)
})

data.aa = 22


