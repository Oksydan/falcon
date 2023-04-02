const chokidar = require('chokidar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FontPreloadPlugin = require('webpack-font-preload-plugin');

exports.configureDevServer = (serverAddress, publicPath, port, siteURL) => ({
  allowedHosts: [ serverAddress ],
  host: serverAddress,
  client: {
    logging: 'error',
    progress: false,
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  devMiddleware: {
    publicPath: publicPath,
    writeToDisk: (filePath) => {
      return !(/hot-update/.test(filePath));
    },
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  hot: true,
  liveReload: true,
  watchFiles: [
    '../../**/*.tpl',
    '../../modules/**/*.js',
    '../../modules/**/*.css',
  ],
  open: true,
  port,
  proxy: {
    '**': {
      target: siteURL,
      secure: false,
      changeOrigin: true,
    }
  },
  static: {
    publicPath: publicPath,
  },
});

exports.extractScss = ({mode = 'production'}) => ({
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, 'postcss.config.js'),
            },
          }
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        },
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: mode === 'production' ? 'css/[chunkhash].css' : 'css/[id].css',
    }),
  ],
});

exports.extractJs = () => ({
  module: {
    rules: [
      {
        test: /swiper\.esm\.js/,
        sideEffects: false
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'esbuild-loader',
          options: {
            target: 'es2015'
          }
        }
      },
    ]
  }
});

exports.extractImages = ({ publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img-dist/',
              publicPath: publicPath + '/img-dist/',
              name: '[contenthash].[ext]',
            },
          },
        ],
        type: 'javascript/auto',
      },
    ]
  }
})

exports.extractFonts = ({ publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              publicPath: publicPath + '/fonts/',
              name: '[name]-[contenthash].[ext]',
            },
          },
        ],
        type: 'javascript/auto',
      }
    ]
  }
})

exports.extractVendorsChunks = () => ({
  optimization: {
    splitChunks: {
      cacheGroups: {
        swiper: {
          test: /[\\/]node_modules[\\/](swiper|dom7)[\\/]/,
          name: 'swipervendor',
          filename: 'js/swipervendor.js',
          chunks: 'initial',
        }
      },
    },
  },
})

exports.cleanDistFolders = () => ({
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanOnceBeforeBuildPatterns: [
        path.join(__dirname, '../../assets/js/**'),
        path.join(__dirname, '../../assets/css/**'),
        path.join(__dirname, '../../assets/img-dist/**'),
        path.join(__dirname, '../../assets/fonts/**')
      ],
    }),
  ]
})

exports.externals = () => ({
  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery : 'jQuery'
  }
})

exports.preloadFonts = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'preload.html',
      templateContent: '{{{preloadLinks}}}',
      inject: false,
    }),
    new FontPreloadPlugin({
      index: 'preload.html',
      extensions: ['woff2'],
      filter: /(materialicons|roboto-v20-latin-ext_latin-regular|roboto-v20-latin-ext_latin-700|roboto-v20-latin-ext_latin-500|icomoon)/i,
      replaceCallback: ({ indexSource, linksAsString }) => {
        return indexSource.replace('{{{preloadLinks}}}', linksAsString);
      },
    }),
  ]
})

exports.resolve = () => ({
  resolve: {
    modules: [
      'node_modules',
      path.resolve('node_modules')
    ],
    alias: {
      '@node_modules': path.resolve(__dirname, '../node_modules'),
      '@themeAbstract': path.resolve(__dirname, '../css/abstracts'),
      '@css': path.resolve(__dirname, '../css'),
      '@js': path.resolve(__dirname, '../js'),
    }
  },
});

