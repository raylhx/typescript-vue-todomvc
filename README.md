# typescript-vue-todomvc
file:///F:/workplace/my/typescript-vue-todomvc/index.html
a sample TodoMVC-style app written in TypeScript and Vue.
https://github.com/typescript-eslint/typescript-eslint
1.初始化一个项目
npm init

2.安装 vue,typescript, webpack 以及相关 loader
npm install --save-dev typescript webpack webpack-cli ts-loader css-loader vue vue-loader vue-template-compiler

3.完善大体结构

- 添加 src 文件夹，并在 src 文件夹下添加 components，放置组件
- 在 src/下新建 index.ts

```
typescript-vue-todomvc/
├─ dist/
└─ src/
   └─ components/
   └─ index.ts
```

4.添加 typescript 配置文件
在根目录下，运行生成一个 tsconfig.json，tsconfig.json 文件制定了用来编译这个项目的根文件和编译选项

```
tsc -init
```

写入编译选项

```json
{
  "compilerOptions": {
    "outDir": "./built/",
    "sourceMap": true,
    "strict": true,
    "noImplicitReturns": true,
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es5",
    "experimentalDecorators": true
  },
  "include": ["./src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

5.添加 webpack config 文件
在更目录下新增一个 webpack.config.js,并写入

```js
var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [new VueLoaderPlugin()]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
```

在 package.json 中，加入 webpack 启动脚本

```
  "scripts": {
    "build": "webpack --watch",
  },
```

试着运行一下

```
npm run build

```

6.配置 eslint
- @typescript-eslint项目取代 tslint
- @typescript-eslint/parser是将ts转换为ESTree,是eslint可以识别
- @typescript-eslint/eslint-plugin  可以打开或关闭的规则列表
```bash
npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```
初始化` eslint --init `,选择自定义配置,可以[参考这里](https://larrylu.blog/improve-code-quality-using-eslint-742cf1f384f1)

## 填充一些内容

1.将 todomvc-app-template 中的 index.html 文件 copy 一份在根目录下，并将<section></section>内容换成如下

```html
<body>
  <div id="app"></div>
  <!-- 这个脚本是原模板的js -->
  <script src="node_modules/todomvc-common/base.js"></script>
  <!-- 添加build.js -->
  <script src="./dist/build.js"></script>
</body>
```

在 src/index.ts，写一个最简单的 vue，然后再逐步替换

```js
import Vue from "vue";

const app = new Vue({
  el: "#app",
  template: "<div>test</div>"
});
```

2.引入 vue 文件
在 components 下新建 index.vue，将模板中`<section class="todoapp"></section>`的内容放入 index.vue 中，

```js
<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li class="completed">
          <div class="view">
            <input class="toggle" type="checkbox" checked />
            <label>Taste JavaScript</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="Create a TodoMVC template" />
        </li>
        <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>Buy a unicorn</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="Rule the web" />
        </li>
      </ul>
    </section>
    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count">
        <strong>0</strong> item left
      </span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed">Clear completed</button>
    </footer>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
</style>

```

在 index.ts 文件中引入 index.vue

```js
import Vue from "vue";
import App from "./components/index.vue";

const app = new Vue({
  el: "#app",
  render: h => h(App)
});
```

但是在引入 vue 文件中，会报错：找不到 vue 文件，typescript 默认只识别*.ts 文件，为了让 ts 识别出*.vue 文件（其他情况下可能是 window 对象、module 等第三方库）需要一个声明文件：在 src 下新建`vue-shims.d.ts`，写入希望声明的内容，比如

```js

declare module "*.vue" {
  import Vue from 'vue';
  export default Vue;
}

```
与这次代码无关的，如果想声明window或者第三方库可以如下：
``` js
/**
 * 告诉 TypeScript window是个全局对象，直接可用，这样就不会在window.xx = 123时报错
 */
declare var window: any
/**
 * 引入部分第三方库/自己编写的模块的时候需要额外声明文件
 * 引入的时候，需要使用类似 import VueLazyLaod from 'vue-lazyload' 的写法
 */
declare module 'vue-lazyload'

```

3.拆组件写代码了 
引入vue文件没有问题之后，就可以把原模板的代码拆解成小组件。看原模板html部分结构写的很清晰明了，可以拆成
