const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');


module.exports = {
  entry: { main: './src/index.js' },                    //  This controls src input to 
  output: {                                             //  dist output. Change as you please.
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[name].[chunkhash].js'                // Chunkhash is not needed but can help cache problems
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]     //  Keeps this true for optimized HTML
      },
      { //  Optimize Images 
        test: /\.(png|jpe?g|svg|gif)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000                //  Inline Img as bas64 if smaller than 10kb for faster loading 
            }                             //  Highest recommended 12-15 kb
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",                 //  Parses the CSS into JavaScript and resolves any dependencies
          "postcss-loader",             //  Outputs autoprefixers in dist
          "sass-loader"                 //  Outputs our CSS into a <style> tag in the header
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index2.html",      
    }),
    
  ]
}