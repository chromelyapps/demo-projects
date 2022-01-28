// Site Plugins

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function plugins(isDevBuild, bundleOutputDir) {
  return [

    // Set the NODE_ENV environment variable to production / development
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"' }),
    new webpack.DllReferencePlugin({ context: path.join(__dirname, '../..'), manifest: require('../../wwwroot/dist/vendor-manifest.json') }),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin()

  ].concat(isDevBuild ? [

    // Plugins that apply in development builds only
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map', // Remove this line if you prefer inline source maps
      moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
    })

  ] : [

    // Plugins that apply in production builds only
    new ExtractCssChunks({ filename: 'styles/site.css' }),

    // Condense the CSS to as small as possible, and remove comments
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      }
    })

  ]);
};

exports.plugins = plugins;
