// Vendor Options

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const vendor_plugins = require('./vendor_plugins');
const vendor_rules = require('./vendor_rules');
const vendor_entrypoints = require('./vendor_entrypoints');

function opts(isDevBuild, bundleOutputDir) {
  return [{
    // If to run webpack in development or production
    mode: isDevBuild ? 'development' : 'production',
    // Style of output when running webpack
    stats: { modules: false },
    // Entry points of the js to start with when packing
    entry: vendor_entrypoints.entrypoints,
    // Plugins
    plugins: vendor_plugins.plugins(isDevBuild, bundleOutputDir),
    // Define rules / loaders for loading other related files
    module: { rules: vendor_rules.rules(isDevBuild) },
    // The base directory for the js source
    context: path.join(__dirname, '..'),
    // This should be set to false when SourceMapDevToolPlugin is used instead
    devtool: false,
    // Allow the use of the import statement in js without the need of the below file extensions.
    resolve: { extensions: ['.js'] },
    // Output destination
    output: {
      // Destination Directory
      path: bundleOutputDir,
      // Output relative to the site root
      publicPath: '/dist/',
      filename: '[name].js',
      library: '[name]_[hash]'
    },
    // Terser options for shrinking js files for production
    optimization: {
      minimizer: [new TerserPlugin({ sourceMap: true })]
    }
  }];
};

exports.opts = opts;
