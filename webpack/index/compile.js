const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require("@babel/traverse").default
const babel = require("@babel/core")

function start () {

    // 获取单个文件的路径、依赖、代码
    function getModuleInfo (file) {
        const entryCode = fs.readFileSync(file, 'utf-8')
        console.log(file + '代码内容：', entryCode)
        console.log('-----------------------------')

        const ast = parse(entryCode, {
            sourceType: 'module'
        })
        // console.log(ast.program.body) // program.body内容
        // console.log('-----------------------------')

        const deps = {}
        traverse(ast, {
            ImportDeclaration({node}){
                const dirname = path.dirname(file)
                const absPath = './' + path.join(dirname, node.source.value)
                deps[node.source.value] = absPath
            }
        });
        console.log(file + '依赖：', deps);
        console.log('-----------------------------')

        const { code } = babel.transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        // console.log(code);
        // console.log('-----------------------------')

        return {
            file, // 路径
            deps, // 依赖
            code  // 代码
        }
    }

    // 解析文件下所有依赖项
    function parseModules (file) {
        const entry = getModuleInfo(file)
        const infos = [entry]
        infos.forEach(a => {
            const deps = a.deps
            if(deps){
                for(let key in deps){
                    if(deps.hasOwnProperty(key)){
                        infos.push(
                            getModuleInfo(entry.deps[key])
                        )
                    }
                }
            }
        })
        // console.log(infos)

        const res = infos.reduce((s,v) => {
            s[v.file] = v
            return s
        }, {})
        console.log(file + '所有依赖和代码', res)

        return res
    }

    // 生成最后的可执行文件
    function bundle (file) {
        const depsStr = JSON.stringify(
            parseModules(file)
        )
        return `(function(deps){
            function require (file) {
                const exports = {}
                function absPath (real_path) {
                    return require(deps[file].deps[real_path])
                }
                (function(require, exports, code){
                    eval(code)
                })(absPath, exports, deps[file].code)
                return exports
            }
            require('${file}')
        })(${depsStr})`
    }

    function deleteDirFile(path) {
        let files = [];
        if(fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function(file) {
                let curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    deleteDirFile(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    function writeFile (content) {
        deleteDirFile('./dist')
        fs.mkdirSync('./dist')
        fs.writeFileSync('./dist/bundle.js',content)
    }

    const content = bundle('./src/index.js')
    // console.log(eval(content));
    writeFile(content)

}

start()
