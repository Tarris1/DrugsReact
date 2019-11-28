const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: [/\.jsx?$/, /\.css?$]
            exclude: /node_modules/,
            loader: 'babel-loader', 
            query: {
               presets: ["@babel/preset-env", "@babel/react"]
            }
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
   //loaders: [
 // { test: /\.json$/, loader: 'json-loader' },
  // other loaders 
//]
}