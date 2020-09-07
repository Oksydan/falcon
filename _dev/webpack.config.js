const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config  = {
  "port" : "3505",
  "publicPath": "/themes/starter/assets",
  "serverAddress" : "starter.test",
  "siteURL": "http://starter.test"
};


const configureDevServer = () => {
  return {
  host: config.serverAddress,
  hot: true,
  open: true,
  overlay: true,
  port: config.port,
  publicPath: config.publicPath,
  proxy: {
    '**': {
      target: config.siteURL,
      secure: false,
      changeOrigin: true,
    }
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  };
};


module.exports = {
  context: path.resolve(__dirname, '../_dev'),
  devServer: configureDevServer(),
  devtool: "cheap-source-map",

 entry: {
    theme: [
      './js/theme.js',
      './css/theme.scss'
    ]
  },

  mode: 'development',

  output: {
    filename: "[name].js",
    publicPath: config.siteURL + ':' + config.port + config.publicPath,
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
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img/',
          publicPath: config.publicPath + '/img/',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          publicPath: config.publicPath + '/fonts/',
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
      filename: "[name].css"
    })
  ]
}