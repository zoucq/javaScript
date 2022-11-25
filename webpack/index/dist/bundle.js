(function(deps){
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
            require('./src/index.js')
        })({
        "./src/index.js": {
            "file":"./src/index.js",
            "deps":{"./add.js":"./src/add.js","./minus.js":"./src/minus.js"},
            "code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _minus = require(\"./minus.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar sum = (0, _add[\"default\"])(1, 2);\nvar division = (0, _minus.minus)(2, 1);\nconsole.log(sum);\nconsole.log(division);"
        },
        "./src/add.js":{"file":"./src/add.js","deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"},"./src/minus.js":{"file":"./src/minus.js","deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = void 0;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;"}})