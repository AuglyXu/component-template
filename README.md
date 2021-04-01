# React 组件、方法库发布

**注: 请遵循eslint语法规范和prettier代码规范, 切勿私自修改**

### 环境依赖

安装`yarn`稳定版本`v1.22.5`

[yarn 安装地址](https://classic.yarnpkg.com/en/docs/install#windows-stable)

安装`node`

[node 安装地址](http://nodejs.cn/download/)

请搭建组件的时候打开*vscode/webstorm*的*eslint*配置和自动修复
以下是我的一份*vscode*中*eslint*配置
```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "[json]": {
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace"
  },
  "eslint.alwaysShowStatus": true,
  "eslint.format.enable": true,
  "eslint.debug": true,
  "eslint.lintTask.enable": true,
```

### 项目结构

```JavaScript
|-build // 注意: 此文件夹只有在打包后生成
|    |- index.js // 编译打包后的文件，组件库压缩后的js代码, 安装此组件后宿主环境读取的文件
|-component
|    |- index.js // 组件源代码
|-example
|    |- test // 单元测试
|       |- __mock__  // 静态数据文件夹(样式和文件存放路径)
|       |- __tmp__   // 测试目录缓存文件夹
|       |- ...       // 测试demo
|    |- testInternals // 测试构建文件
|       |- analyze // 测试数据分析文件夹
|       |- enzymeTest.js // 配合enzyme做的测试构建工具(测试前调用)
|       |- preTest.js  // enzyme后 测试前 调用
|    |- index.html // 本地调试的html模板
|    |- index.js // 本地调试的入口文件
|-node_modules // 组件的第三方依赖， yarn install后生成
|    |- ...
|    |- ...
|-server
|    |- index.js // webpack服务器启动文件
|-webpack
|    |- webpack.base.config.js // 基础webpack配置
|    |- webpack.dev.config.js  // 本地开发环境webpack配置
|    |- webpack.prod.config.js   // 组件打包webpack配置
|-.npmignore // 上传到npm私服需要忽略的文件和文件夹
|-babel.config.json // babel转换ES6语法、jsx等高级语法的配置文件
|-package.json // 包依赖
|-README.md // 发布组件描述内容
|-yarn.lock // 依赖版本文件
```

### 打包发布组件(无较大的静态资源文件或依赖文件)

请先阅读以下注意点：

- 注意点：

  - **(重要)** 发布组件的依赖必须严格遵循开发环境依赖放在`package.json`中的`"devDependencies"`字段中, 生产环境依赖放在`package.json`中的`"dependencies"`中
    (例如: `less`仅在开发环境下使用, 因此必须使用**yarn add less --dev**, `antd`需要在生产环境中使用, 必须使用**yarn add antd --save**)
    
  ```js
  // 安装生产环境依赖
  yarn add <package>(包名) --save
  ```

  ```js
  // 安装开发环境依赖
  yarn add <package>(包名) --dev
  ```

  - **(重要)** 发布后读取的是`build`下的`index.js`文件, 请发包前务必仔细检查

  - **(重要)** 如果你打包的是工具库, 可能不需要依赖`react`, `react-dom`, `antd`, 请自行将`package.json`中的`"peerDependencies"`中的依赖放到`"devDependencies"`中
  ```js
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0",
    "antd": ">=4.3.3"
  }
  ```

  - 从`gitlab`中拉下来组件库模板后把隐藏的`.git`文件夹删除, 避免污染模板

  - 发布组件必须首先通过本地开发环境调试, 请移至**组件调试**了解调试方法

  - 已经发布并使用的组件不要轻易使用`npm unpublish`下架

  - 每次更新发布需要修改`package.json`中的`version`字段

  - 发布的组件暂时只支持一个入口, 放在`component/index.js`中

  - 宿主环境安装已经发布的组件时, 必须同时安装**此组件对应的依赖**(注: 如果宿主环境已经安装, 可以不安装), 为了避免重复打包的问题。(例如： 此组件依赖`jQuery`, 那么外部使用时需要`yarn add 包名 ` 同时需要安装一份 `yarn add jQuery`)

  - 暂时仅支持 `js jsx less css png svg jpg jpeg gif` 文件

  - 输出文件不要使用 `export default` 的输出模式, 如需使用 `export default` 暴露, 请在`webpack/webpack.prod.config.js`中设置`output.libraryExport`为`default` 来仅暴露 `exports`对象中的 `default` 值

  - 组件不应该包含任何副作用(即相同的输入必须有同样的输出)(例如: 组件不应该修改全局变量, 包含接口请求等操作)

##### 发包准备

1. 执行`yarn build`

##### 发包上线

1. 切换`npm`源到公司私服`npm set registry 服务器地址`

2. 执行`npm login`登录账号

3. 执行`npm publish`发布

4. 执行`npm config delete registry`将源切换为`npm`官网

### 非打包发布组件(有较大的静态资源文件或依赖文件)

- 依赖包含较多的静态文件时可能会出现引用不到的情况, 为了避免这种意外情况, 采用非打包压缩(不用担心包过大的问题, 因为用到项目里打包的时候仍然会对`node_modules`中的代码进行打包压缩)

**请先阅读打包发布组件的注意点**

##### 发包准备

1. 执行`yarn prebuild`

2. 修改`package.json`中的`main`字段修改为`component/index.js`

##### 发包上线

**与打包上线组件流程相同**

### 组件调试

0. 执行`yarn install`安装项目依赖

**以下操作项目路径均在根目录下执行**

1. 安装你要发布的组件依赖的包(注： 只需要安装此项目没有的包)

2. 将组件源代码复制进入`component/index.js`文件

3. 修改`package.json`中的`name`属性为**你要发布的包名(必须)**, `version`为**你要发布的版本号(必须)**, `description` 为 **包的简要描述**, `keywords`为 **包的关键字**

4. 先执行`yarn link`, 将组件链接到全局, 在执行`yarn link 包名`将组件链接到项目, 可以通过 `npm config get prefix` 获取链接后的包路径

5. 进入`example/index.js`文件, 编写你的业务代码

6. 执行`yarn start`, 打开浏览器，输入`localhost:3000`查看你编写好的代码

- 注意点：
  - 本地调试每次修改完之后重复以上**6**步骤
  - **非打包模式发布组件**需要将`package.json`中的`main`字段修改为`component/index.js`

### 组件单元测试

1. 单元测试都在`example`下的`test`文件夹下编写, 项目提供了测试的`demo`可参照, 项目支持配合`enzyme`使用

2. 可以执行 `yarn test:coverage` 生成测试覆盖率分析文件

3. 编写完测试代码执行`yarn test`或者`yarn test:watch`进行测试

---

##### 注意

安装私有库上的包, 需要切换到npm源到服务器地址
