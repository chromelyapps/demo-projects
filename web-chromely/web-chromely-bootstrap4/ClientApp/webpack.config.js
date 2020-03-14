// Site webpack config
// This file typically brings in any css / js that's unique to the site / is rebuilt often or live.

const path = require('path');
const bundleOutputDir = path.join(__dirname, '../wwwroot/dist');
const site_opts = require('./webpack/site_opts');

// Pulls in the options / rules / plugins from the webpack directory
module.exports = (env, argv) => {
  const isDevBuild = !((argv && argv.mode === 'production') || process.env.NODE_ENV === 'production');
  console.log(`Development build: ${isDevBuild}`);
  return site_opts.opts(isDevBuild, bundleOutputDir);
};
