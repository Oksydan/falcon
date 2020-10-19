const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const chokidar = require('chokidar');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');

require('dotenv').config()

const {
  PORT: port,
  PUBLIC_PATH: publicPath,
  SERVER_ADDRESS: serverAddress,
  SITE_URL: siteURL
} = process.env;


const configureDevServer = () => {
  return {
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
        '../**/*.tpl',
        '../modules/**/*.js',
        '../modules/**/*.css'
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
    },
  };
};


module.exports = {
  context: path.resolve(__dirname, '../_dev'),
  devServer: configureDevServer(),
  devtool: "cheap-source-map",

 entry: {
    theme: './js/theme.js',
  },

  mode: 'development',

  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, '../assets'),
    publicPath: siteURL + ':' + port + publicPath,
    pathinfo: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            },
          },
          MediaQueryPlugin.loader,
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          },
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img/',
          publicPath: publicPath + '/img/',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          publicPath: publicPath + '/fonts/',
          name: '[name].[ext]'
        },
      }
    ]
  },

  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery : 'jQuery'
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new MediaQueryPlugin({
      include: true,
      queries: {
        '(min-width: 1200px)': 'desktop',
        '(min-width: 992px)': 'desktop',
        '(min-width: 768px)': 'tablet',
        '(min-width: 576px)': 'tablet'
      },
    }),
    new ESLintPlugin(),
    // new StylelintPlugin(),
    new SVGSpritemapPlugin('img/**/*.svg', {
      output: {
        filename: 'img/sprite.svg',
      },
      sprite: {
        generate: {
          use: true
        }
      },
    })
  ]
}
