## x-console-frontend(X资源管理控制台)
> http://aurelia.io/

该项目配置使用Babel转换器以便于你的应用程序可以使用其他语言. 在任何的标准文本编辑器下应该都运行的很好. 该骨架项目使用NPM来进行包管理,使用Webpack来打包扎捆.

## Doc
> http://semantic-ui.com/ http://192.168.7.253:81/  
> http://aurelia.io/hub.html#/doc/persona/developer  
> https://www.npmjs.com/package/wurl https://github.com/websanova/js-url 
> https://www.npmjs.com/package/toastr https://github.com/CodeSeven/toastr 
> https://www.npmjs.com/package/js-cookie https://github.com/js-cookie/js-cookie  
> https://www.npmjs.com/package/underscore https://github.com/jashkenas/underscore 
> https://www.npmjs.com/package/underscore.string https://github.com/epeli/underscore.string 
> https://www.npmjs.com/package/lodash https://github.com/lodash/lodash 
> https://github.com/github/fetch https://github.github.io/fetch/ http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/2  
> http://ionden.com/a/plugins/ion.rangeSlider/demo.html https://github.com/IonDen/ion.rangeSlider  
> https://www.npmjs.com/package/date-format  

## 入门指南(Getting started)

开始之前确保你安装了最近版本的[NodeJS](http://nodejs.org/)环境 *>=4.0* (NPM 3).
```shell
node -v
npm -v
```
在项目目录,执行下面的命令:

```shell
npm install
```

这会安装需要的依赖,包括一个本地版本的Webpack,用于构建和打包app. 不需要全局安装Webpack.

通过执行以下命令运行app:

```shell
npm start
```

该命令启动webpack开发server,它服务托管着构建的打包文件. 你现在可以通过 http://localhost:9000 浏览这个骨架app. 代码的变更会自动构建和重新加载app.

## 功能配置(Feature configuration)

大部分的配置都在`webpack.config.js`文件中.
在配置文件中, 你可以配置更高级的加载功能或者添加直接的`SASS`或者`LESS`加载支持.

## 打包扎捆(Bundling)

构建开发bundle(输出到`/dist`), 执行:

```shell
npm run build
```

构建一个最佳优化压缩最小化的产品bundle(输出到`/dist`), 执行:

```shell
npm run build:prod
```

测试开发或者产品构建, 执行:

```shell
npm run server:prod
```

产品bundle是包括部署需要的全部文件.

## 资源和打包扎捆配置(Resource and bundling configuration)

你或许想分离部分代码到其它文件中.
可以通过在 `package.json` 中指定构建资源对象.

例如, 如果你想延迟加载` /users`路径下的资源, 你可以像下面这样定义:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "users",
        "bundle": "users",
        "lazy": true
      }
    ]
  }
},
```

"path"字段可以是一个字符串或者字符串数组.
字符串需要是一个路径, 相对于源码路径或者一个外部资源路径, 作为一个请求加载路径(require path) (例如: `aurelia-plugin/some-resource.html`).
`.js`, `.ts` 和 `.html`扩展名是可选的, 会被自动解析.
打包扎捆(bundle)设置是递归式的, 因此, 任何被请求加载的路径文件都会被打包包含, 除非已经被其它bundle打包包含(重复迭代是从第一个资源到最后一个)

因为Aurelia支持加载外部文件或者外部模块, 如果它们没有作为任何依赖项被定义.
因为这种语法任然比较新, 大部分Aurelia插件没有定义它们的依赖资源.
也有些原因没有去声明定义这些资源, 当这个插件仅仅部分被需要.


```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      "aurelia-some-ui-plugin/dropdown",
      "aurelia-some-ui-plugin/checkbox"
    ]
  }
},
```

你也可以结合插件分离和资源懒加载:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "aurelia-animator-css",
        "bundle": "animator",
        "lazy": true
      },
      {
        "path": [
          // lets say we only use the checkbox from within subpage1
          // we want those to be bundled together in a bundle called: "subpage1"
          // 我们仅仅在subpage1中使用checkbox
          // 我们想打包它们在"subpage1"中
          "aurelia-some-ui-plugin/checkbox",
          "./items/subpage1"
        ],
        "bundle": "subpage1",
        "lazy": true
      },
      "aurelia-some-ui-plugin/dropdown"
    ]
  }
},
```

请参考 https://github.com/aurelia/webpack-plugin 获取更新相关信息.

## 运行单元测试(Running The Unit Tests)

执行单元测试:

```shell
npm run test
```

## 运行端到端测试(Running The E2E Tests)
集成测试使用的是 [Protractor](http://angular.github.io/protractor/#/).

1. 将E2E-Tests放到```test/e2e/src```目录中

2. 执行下面命令运行测试

  ```shell
  npm run e2e
  ```

### 手动地运行端到端测试(Running e2e tests manually)

1. 确保你的app已经运行并且是可访问的

  ```shell
  WEBPACK_PORT=19876 npm start
  ```

2. 一旦bundle完成, 在另一个控制台运行端到端测试

  ```shell
  npm run e2e:start
  ```

## 跨平台应用(Electron) (不久将到来)

添加Electron支持, 首先运行:

```shell
npm run electron:setup
```

一旦包安装完成, 你可以在Electron中浏览你的app, 或者构建产品应用程序包:

```shell
# developing on Electron with live-reload
# 在Electron上热加载开发
npm run electron:start

# creates packages for the current operating system
# 为当前操作系统创建运行包
npm run electron:package

# creates packages for all operating systems
# 为全部系统平台创建运行包
npm run electron:package:all
```

Electron的入口文件可以在`config/electron.entry.development.ts`中找到.

构建或者创建Electron包会在根目录下创建一个`electron.js`文件.

### 在Electron中加载本地包(Loading native packages in Electron)

如果你有不能运行在Electron渲染进程的包(例如: 本地包), 或者像在Node下在渲染进程中使用包, 在`config/webpack.electron.js`中列举在`externals`下.

## 致谢(Acknowledgments)

部分关于Webpack配置的代码借鉴于@AngularClass' [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter).

部分关于Webpack-Electron的配置和打包借鉴于@chentsulin's [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate).
