const { merge } = require('webpack-merge')
const fs = require('fs')
const path = require('path')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const HtmlWebpackInlineSourcePlugin = require('@effortlessmotion/html-webpack-inline-source-plugin')
const pkg = require(path.join(__dirname, '../../../../package.json'))

const appInfo = pkg.appConfig.vue3;
module.exports = (env) => merge(common, (function () {
  const isOffline = env && env.app?.type === 'offline';
  return {
    mode: 'production',
    optimization: {
      minimize: true
    },
    output: {
      path: path.join(__dirname, '../../../../assets'),
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
      }),
      new CleanWebpackPlugin({
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: ['**/*.LICENSE.txt', 'report.html'],
        cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.ico*', '!css/**'],
      }),
      new WebpackBar(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../templates/index.html'),
        chunks: ['index'],
        templateContent: isOffline ? ({ htmlWebpackPlugin }) => {
          let content = fs.readFileSync(path.resolve(__dirname, '../templates/index.html'), 'utf-8')
          content = content.replace('<!-- _APP_CONFIG_ -->', `<script>const _APP_CONFIG_ = {namespace: '${appInfo.name}'}</script>`)
          return content
        } : false
      }),
      new HtmlWebpackPlugin({
        filename: 'preview.html',
        template: path.resolve(__dirname, '../templates/preview.html'),
        chunks: ['preview'],
      }),
      new HtmlWebpackPlugin({
        filename: 'setting.html',
        template: path.resolve(__dirname, '../templates/setting.html'),
        chunks: ['setting'],
      }),
      new HtmlWebpackPlugin({
        filename: 'groupSetting.html',
        template: path.resolve(__dirname, '../templates/groupSetting.html'),
        chunks: ['groupSetting'],
      }),
      new HtmlWebpackPlugin({
        filename: 'publish.html',
        template: path.resolve(__dirname, '../templates/publish.html'),
        inlineSource: '.(js)$',
        inject: 'body',
        minify: false,
        chunks: ['publish'],
      }),
      new HtmlWebpackInlineSourcePlugin()
    ]
  }
})())