const chokidar = require('chokidar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

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
  }
});


const autoprefixer = () => ({
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-preset-env')(),
    ]
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
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          },
        },
        MediaQueryPlugin.loader,
        autoprefixer(),
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass')
          }
        },
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: mode === 'production' ? "css/[hash].css" : "css/[id].css",
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
  ],
});

exports.extractJs = () => ({
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
    ]
  },
  plugins: [
    new ESLintPlugin(),
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
  },
  plugins: [
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
})

exports.extractFonts = ({ publicPath }) => ({
  module: {
    rules: [
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
  }
})

exports.extractExternals = () => ({
  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery : 'jQuery'
  }
})
