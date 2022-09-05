const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: __dirname ,
  mode: "development",
  output: {
    assetModuleFilename: 'images/[name][ext][query]',
    // path: path.join(__dirname, "../dist"),
    filename: "scripts/[name].bundle.js",
  },
  devServer: {
    // static: {
    //   directory: path.join(__dirname, "../dist"),
    // },
    // compress: true,
    historyApiFallback: true, //当浏览器返回时重定向到index页面
    port: 8082, //
    // watchFiles: ["../src/**/*"], // 监听文件的改动，热更新
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      filename: "index.html",
      template: "../public/index-dev.html",
    }),
  ],
};
