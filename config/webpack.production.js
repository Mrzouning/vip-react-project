const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin =   require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    context: __dirname,
  mode: "production",
  output: {
    assetModuleFilename: 'images/[name][fullhash:5].bundle.[ext]',
    // path: path.join(__dirname, "../dist"),
    filename: "scripts/[name].bundle.js",
    publicPath: "assets"
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
        name: "runtime"
    },
    splitChunks: {
        chunks: "async",
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
            commons: {
                chunks: "initial",
                minChunks: 2,
                name: "commons"
            }
        },
        minSize: {
            javascript: 100000,
            style: 100000
        }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "VIP官网",
      filename: "index.html",
      template: "../public/index-dev.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      }
    }),
    new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        // cssProcessor: require("cssnano"),
        cssProcessorOptions: {
            preset: [
                "default",
                {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        }
    })
  ],
};
