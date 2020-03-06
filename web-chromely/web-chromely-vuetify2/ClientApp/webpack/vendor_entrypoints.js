// Vendor EntryPoints

// Entrypoints define starting points for files to be brought into the packed destination.
// Anything referenced down the chain by these files will also be brought in
// If you just specify the directory
// then webpack will look at the named directory inside node_modules -> package.json -> The main field

var entrypoints = {
  vendor: [

    // Frontend
    // Vuetify brought in on the site bundle
    '@popperjs/core',
    './src/css/fontawesome.scss',

    // Additional depends
    'event-source-polyfill',
    'isomorphic-fetch',

    // Vuejs related
    'vue',
    'vue-router'
  ]
};

exports.entrypoints = entrypoints;
