/*
    随着前端的发展，web技术日趋成熟，js功能越来越多，代码量也越来越大。之前一个项目通常各个页面公用一个js，但是js逐渐拆分，项目中引入的js越来越多

    这样的js引入造成了问题：
        1.全局变量污染：各个文件的变量都是挂载到window对象上，污染全局变量。
        2.变量重名：不同文件中的变量如果重名，后面的会覆盖前面的，造成程序运行错误。
        3.文件依赖顺序：多个文件之间存在依赖关系，需要保证一定加载顺序问题严重。

    前两个问题其实很好解决，使用闭包配合立即执行函数;
    真正的难点在于依赖关系梳理以及加载.

    1. 闭包与命名空间
    2. YUI       早期雅虎出品的一个工具，模块化管理只是一部分，其还具有JS压缩、混淆、请求合并（合并资源需要server端配合）等性能优化的工具

    // 模块化规范，是一套抽象的约束
    CommonJs     Nodejs: 其中Commonjs是作为Node中模块化规范以及原生模块面世的. (服务端使用fs可以接近同步的读取文件)
    AMD          RequireJS: (动态创建script标签方式加载，依赖全部加载完毕之后执行)
    CMD          SeaJs:     (动态创建script标签方式加载，依赖全部加载完毕之后执行)

    ES6模块化     (export default，export，import)

    AMD和CMD主要有下面几个不同：
      （1）AMD是RequireJS在推广过程中对模块定义的规范化产出，CMD是SeaJS在推广过程中对模块定义的规范化产出
      （2）对于依赖的模块，AMD是提前执行，CMD是延迟执行
      （3）对于依赖的模块，AMD推崇依赖前置，CMD推崇依赖就近
 */
