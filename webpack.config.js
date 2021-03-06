const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      // 简写路径配置
      pages: path.resolve(__dirname,'src/pages'),
      // page:'./src/pages',
      store: path.resolve(__dirname,'store'),
      util: path.resolve(__dirname,'src/util'),
      modules: path.resolve(__dirname,'src/modules'),
      static: path.resolve(__dirname,'src/static')
    }
  },
  module: {
    rules: [
        // babel配置
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
    //   css配置
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
      },
    //   图片配置
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            },
          },
        ],
      },
    // 字体图标配置
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            },
          },
        ],
      },
    ]
  },
  plugins: [
    // 处理HTML文件
    new HtmlWebpackPlugin({
        template: './src/index.html',
        thunks: ['vendor', 'index'],  // 需要引入的入口文件
        excludeChunks: ['login'],
        favicon: './src/favicon.ico'
    }),
    // 独立css文件
    new ExtractTextPlugin("css/[name].css") ,//打包后的文件目录(名)
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name : 'commin',
        filename: 'js/base.js'
    }),
  ],
  devServer: {
      port: 8086,
      historyApiFallback:{ 
        index: '/dist/index.html'
      },
      proxy:{
        '/getCharacter' :{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/getBoss' :{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/addBoss' :{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/deleteBoss' :{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/clearBoss' :{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/addCharacter' :{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/deleteCharacter' :{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/addWork':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/deleteWork':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/getWorkList':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/getWorkItem':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/login':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/register':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/getUserListMsg':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/deleteManager':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/addManager':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/deleteOwner':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        },
        '/addOwner':{
          target: 'http://127.0.0.1:8081',
          changeOrigin: true
        }
      },
      disableHostCheck:true
  }
};