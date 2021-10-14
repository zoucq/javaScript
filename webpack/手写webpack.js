
// 文档
// babel：https://www.babeljs.cn/docs/
// nodejs：http://nodejs.cn/api

// 1.1 打包的主要流程如下
// 需要读到入口文件里面的内容。
// 分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树。
// 根据AST语法树，生成浏览器能够运行的代码

// 1.2 具体细节
// 获取主模块内容
// 分析模块
// 安装@babel/parser包（转AST）
// 对模块内容进行处理
// 安装@babel/traverse包（遍历AST收集依赖）
// 安装@babel/core和@babel/preset-env包 （es6转ES5）
// 递归所有模块
// 生成最终代码

// 1.3 流程
// 1.读取主入口文件内容     - readFileSync
// 2.解析成ast语法树       - @babel/parser
// 3.遍历ast，收集依赖      - @babel/traverse
// 4.AST代码ES6转成ES5：把ast代码转成es5代码 - @babel/core @babel/preset-env
// 5.递归获取所有依赖：拿到入口文件依赖后，循环获取其下的所有依赖项；总的来说我们需要的是三个东西（文件路径，文件代码，文件的依赖项）；
// 6.生成可执行代码，处理关键字require、exports；写一个require函数和一个exports对象，传入exports对象，把代码放到eval执行，之后返回exports对象； - eval()
// 7.最后写入文件              - mkdirSync，writeFileSync

// 1.4 总结
// 1.其实原理就是根据入口文件，生成ast语法树，获取所有依赖的文件内容，生成浏览器能够运行的代码

// 参考文章：https://mp.weixin.qq.com/s/09Zyz9oC4kzt5OZBtrSTuQ
