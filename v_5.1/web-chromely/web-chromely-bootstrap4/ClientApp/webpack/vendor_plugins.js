// Vendor Plugins

const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function plugins(isDevBuild, bundleOutputDir) {
  return [

    // Set the NODE_ENV environment variable to production / development
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"' }),
    new webpack.DllPlugin({ path: path.join(bundleOutputDir, '[name]-manifest.json'), name: '[name]_[hash]' }),

    // Maps these identifiers to the jQuery package (expected to be a global variable)
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new ExtractCssChunks({ filename: 'styles/vendor.css' })

  ].concat(isDevBuild ? [] : [

    // Plugins that apply in production builds only
    // Condense the CSS to as small as possible, and remove comments
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      }
    })

  ]);
};

exports.plugins = plugins;
