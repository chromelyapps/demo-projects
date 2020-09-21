// Vendor webpack config
// This file typically brings in any css / js from 3rd parties that doesn't need to be rebuilt often.

const path = require('path');
const bundleOutputDir = path.join(__dirname, '../wwwroot/dist');
const vendor_opts = require('./webpack/vendor_opts');

// Pulls in the options / rules / plugins from the webpack directory
module.exports = (env, argv) => {
  const isDevBuild = !((argv && argv.mode === 'production') || process.env.NODE_ENV === 'production');
  console.log(`Development build: ${isDevBuild}`);
  return vendor_opts.opts(isDevBuild, bundleOutputDir);
};
