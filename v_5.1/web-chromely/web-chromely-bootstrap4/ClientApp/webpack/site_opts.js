// Site Options

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const site_plugins = require('./site_plugins');
const site_rules = require('./site_rules');

// For the site typically we just specify the entry point script
var entrypoints = { 'main': './src/common/boot.ts' };


function opts(isDevBuild, bundleOutputDir) {

  return [{
    // If to run webpack in development or production
    mode: isDevBuild ? 'development' : 'production',
    // Style of output when running webpack
    stats: { modules: false },
    // Entry points of the js to start with when packing.
    entry: entrypoints,
    // Plugins
    plugins: site_plugins.plugins(isDevBuild, bundleOutputDir),
    // Define rules / loaders for loading other related files
    module: { rules: site_rules.rules(isDevBuild) },
    // The base directory for the js source
    context: path.join(__dirname, '..'),
    // This should be set to false when SourceMapDevToolPlugin is used instead
    devtool: false,
    // Allow the use of the import statement in js without the need of the below file extensions.
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      // Allow import from common as: import 'common/xxx'
      alias: { 'common': path.resolve(__dirname, '../src/common/') }
    },
    // Output destination
    output: {
      // Destination Directory
      path: bundleOutputDir,
      // Output relative to the site root
      publicPath: '/dist/',
      filename: '[name].js'
    },
    // Terser options for shrinking js files for production
    optimization: {
      minimizer: [new TerserPlugin({ sourceMap: true })]
    }
  }];

};

exports.opts = opts;
