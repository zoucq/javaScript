
const object1 = {};
Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false, // 可写, false: 它不能被重新赋值
    enumerable: true, // 可枚举, 是否可以在 for...in 循环和 Object.keys() 中被枚举
    configurable: true // 可配置, 表示对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改
});

let o = {};
// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, "conflict", {
    value: 0x9f91102,
    get() { return 0xdeadbeef; }
});
// 抛出错误 TypeError: value appears only in data descriptors, get appears only in accessor descriptors

function checkHandle (data, key) {
    return data.some(a => {
        if (a.id === key) {
            return true
        }
        if (a.children) {
            this.checkHandle(a.children, key)
        }
        return false
    })
}
