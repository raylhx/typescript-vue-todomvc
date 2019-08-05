# typescript-vue-todomvc

a sample TodoMVC-style app written in TypeScript and Vue.

1.初始化一个项目
npm init

2.安装 vue,typescript, webpack 以及相关 loader
npm install --save-dev typescript webpack webpack-cli ts-loader css-loader vue vue-loader vue-template-compiler

3.完善大体结构
- 添加 src 文件夹，并在 src 文件夹下添加 components，放置组件
- 在src/下新建index.ts
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

在 package.json 中，加入webpack启动脚本

```
  "scripts": {
    "build": "webpack",
  },
```
试着运行一下
```
npm run build

// 或者

npm run build --watch
```

## 填充一些内容

将todomvc-app-template中的index.html文件copy一份在根目录下，
