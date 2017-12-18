const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './frontend/src/main.js',
  output: {
    path: path.join(__dirname, 'frontend/dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 末尾vueのファイルに
        loader: 'vue-loader', // vue-loaderを適用
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
          }
        }
      },
      {
        test: /\.js$/, // 末尾jsのファイルに
        loader: 'babel-loader', // babel-loaderを適用
        exclude: /node_modules/ // ただし/node_modules/は除外
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      }
    ]
  },
  // vue-routerを使用する場合は必要、それ以外の場合は不要
  resolve: {
    alias: {'vue$': 'vue/dist/vue.esm.js'}
  },
  // webpack-dev-serverのための設定
  devServer: {
    contentBase: 'frontend/dist', // rootディレクトリ
    historyApiFallback: true, // trueだとSPAでブラウザの戻るボタンに対応。すごい。
    noInfo: true // なに
  },
  // .mapファイルを作るための設定。よくわかってない
  // devtool: '#inline-source-map'
}

if (process.env.NODE_ENV === 'production') {
  // .mapファイルを作るための設定。よくわかってない
  // module.exports.devtool = '#source-map'

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
