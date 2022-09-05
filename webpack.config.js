const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

//获取命令执行中的参数
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeFlag = _mode === "production";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

//css解析
const cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: "postcss-loader",
  },
];
//公共配置
const webpackBaseConfig = {
  entry: {
    app: __dirname + "/src/index.js",
  },
  output: {
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.(js$|jsx|ts|tsx)/,
        include: [__dirname + "/src"],
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(css|scss)$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|jpeg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
        type: "asset",
      },
      { 
        test: /\.html$/,
       loader: "html-loader",
       options: {
        minimize: true,
      },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeFlag
        ? "styles/[name][fullhash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeFlag
        ? "styles/[id][fullhash:5].css"
        : "styles/[id].css",
      ignoreOrder: true,
    }),
  ],
};
const config = merge.default(webpackBaseConfig, _mergeConfig);

module.exports = config;
