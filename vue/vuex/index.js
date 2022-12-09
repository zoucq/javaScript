
// vuex
// 相对于全局变量 1.响应式的 2.不能直接改，只能通过方法改
// 1.响应式实现 new Vue
// 2.getter = 计算属性
// 3.mutations，actions 其实就是调用函数，把数据返回
// 4.模块的话就是生成一个数据格式，然后获取命名空间path，然后调方法时把path放到函数前面
// 5.辅助函数，就是帮助我们简写，比如写计算属性 mapState mapGetter 但在modules下写起来依旧不算方便

const options = {
    state: {
        count: 1
    },
    mutations: {
        add (state, n) {
            state.count += n
        }
    }
}
let {state, mutations} = options
Object.keys(mutations).forEach(key => {
    let value = mutations[key]
    mutations[key] = (args) => {
        value(state, args)
    }
})

options.mutations.add(1)

console.log(options.state.count);