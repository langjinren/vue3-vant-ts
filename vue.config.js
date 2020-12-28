const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')
const vantTheme = path.resolve(__dirname, "./src/styles/theme.less")
const emoji_data = require('./src/mock/emoji.json');
const result_data = require('./src/mock/result.json');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: './docs',
  assetsDir: 'static',
  indexPath: 'index.html',
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'demo',
    }
  },
  css: {
    extract: true,
    sourceMap: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      },
      // less: {
      //   lessOptions: {
      //     modifyVars: {
      //       hack: `true; @import "${vantTheme}";`,
      //     },
      //   },
      // },
    },
    requireModuleExtension: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    // 修复HMR
    config.resolve.symlinks(true)
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        // new CompressionPlugin({
        //   // gzip压缩配置
        //   test: /\.js$|\.html$|\.css/, // 匹配文件名
        //   threshold: 10240, // 对超过10kb的数据进行压缩
        //   deleteOriginalAssets: false, // 是否删除原文件
        // })
      )
    }
    config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
            inline: /runtime\..*\.js$/
        }])
        .end()
      config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial'
            },
            commons: {
                name: 'chunk-commons',
                test: resolve('src/components'),
                minChunks: 3,
                priority: 5,
                reuseExistingChunk: true
            }
          }
        })
      config.optimization.runtimeChunk('single')
    }
  },
  parallel: require('os').cpus().length > 1,
  devServer: {
    host: '0.0.0.0',
    port: 8011,
    https: false,
    open: false,
    overlay: {
      warnings: false,
      errors: false
    },
    before(app){
      app.get('/bullet_screen/get_emoji_list',(req,res,next)=>{
        res.json(emoji_data);
      })
      app.post('/bullet_screen/add_bullet_screen_by_web',(req,res,next)=>{
        res.json(result_data);
      })
    }
  }
}
