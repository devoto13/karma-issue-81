const webpack = require('webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [ 'jasmine' ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: 'src/**/*.spec.ts' }
    ],
    preprocessors: {
      'src/**/*.spec.ts': [ 'webpack' ]
    },
    mime: {
      'text/x-typescript': [ 'ts', 'tsx' ]
    },
    webpack: {
      resolve: {
        extensions: [ '.ts', '.js' ],
      },
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              removeComments: true
            }
          },
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: [ 'progress' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: [ 'Chrome' ],
    singleRun: false
  });
};
