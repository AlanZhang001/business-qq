#### business-qq 开发指引
1. 源码位于src/index.js，对外暴露的文件为es5/index.js。
2. 开发完成需自行 `npm run build`进行babel降级及打包。
3. 开发完成需要自行`jsdoc -c jsdocconf.json`生成文档查看api文档是否符合预期。
4. 如果是有功能性升级需要在`tests/qq.test.js`增加测试用例。

#### package.json scritps 说明
打包脚本均通过package.json scritps进行，目前分为如下几个部分：
```
"babel": babel降级
"build-es5": 对降级的源码进行打包，为es5级别
"build-es5-min": 对降级的源码进行打包压缩，为es5级别
"build-es6": 对源码进行打包，为es6级别
"build-es6-min": 对源码进行打包压缩，为es6级别
"build": 集成运行以上脚本
"test": 测试入口脚本   
```
开发完成，允许`npm run build` 即可。

#### 自动化测试
开发完成之后，需要运行测试用例检测成功与否。
测试代码位于`tests`目录中，执行命令`npm test`,并进入`test`进行自动化测试;