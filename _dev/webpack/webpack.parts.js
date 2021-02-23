const chokidar = require('chokidar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildPlugin } = require('esbuild-loader');
const path = require('path');

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
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img/',
          publicPath: publicPath + '/img/',
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
          name: '[name].[ext]'
        },
      }
    ]
  }
})

exports.externals = () => ({
  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery : 'jQuery'
  }
})
