const chokidar = require('chokidar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildPlugin } = require('esbuild-loader');
const ChunkRenamePlugin = require('enhanced-webpack-chunk-rename-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FontPreloadPlugin = require('webpack-font-preload-plugin');

exports.configureDevServer = (serverAddress, publicPath, port, siteURL) => ({
  host: serverAddress,
  hot: true,
  open: true,
  overlay: true,
  port,
  publicPath,
  writeToDisk: (filePath) => {
    return !(/hot-update/.test(filePath));
  },
  proxy: {
    '**': {
      target: siteURL,
      secure: false,
      changeOrigin: true,
    }
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  before(app, server) {
    const files = [
      '../../**/*.tpl',
      '../../modules/**/*.js',
      '../../modules/**/*.css'
    ];

    chokidar
      .watch(files, {
        alwaysStat: true,
        atomic: false,
        followSymlinks: false,
        ignoreInitial: true,
        ignorePermissionErrors: true,
        persistent: true
      })
      .on("all", () => {
        server.sockWrite(server.sockets, "content-changed");
      });
  }
});

exports.extractScss = ({mode = 'production'}) => ({
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: true
          }
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, 'postcss.config.js'),
            },
          }
        },
        'sass-loader'
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
  },
  plugins: [
    new ESBuildPlugin()
  ]
});

exports.extractImages = ({ publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img-dist/',
          publicPath: publicPath + '/img-dist/',
          name: '[name].[ext]',
        },
      },
    ]
  }
})

exports.extractFonts = ({ publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          publicPath: publicPath + '/fonts/',
          name: '[contenthash].[ext]'
        },
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
          chunks: 'all'
        }
      },
    },
  },
  plugins: [
    new ChunkRenamePlugin({
      initialChunks: true,
      swiper: "[name].js",
      bootstrap: "[name].js",
    }),
  ],
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
      templateContent: `{{{preloadLinks}}}`
    }),
    new FontPreloadPlugin({
      index: 'preload.html',
      extensions: ['woff2'],
      replaceCallback: ({ indexSource, linksAsString }) => {
        return indexSource.replace('{{{preloadLinks}}}', linksAsString);
      },
    }),
  ]
})
