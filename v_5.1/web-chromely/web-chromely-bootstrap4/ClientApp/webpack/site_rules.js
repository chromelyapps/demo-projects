// Site Rules

const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

function rules(isDevBuild) {
  return [

    // Typescript files
    { test: /\.ts$/, include: /src/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } },

    // Vue files
    { test: /\.vue$/, include: /src/, loader: 'vue-loader' },

    // Vanilla CSS
    {
      test: /\.css$/, use: isDevBuild ?
        // Development - inline css
        ['style-loader', 'css-loader?sourceMap=true'] :
        // Production - site.css
        [ExtractCssChunks.loader, 'css-loader']
    },

    // Scss (css) files
    {
      test: /\.(sass|scss)$/, use: isDevBuild ?

        // Development - inline css
        ['style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
          { loader: 'sass-loader', options: { sassOptions: { includePaths: ['css', 'node_modules'] }, implementation: require('sass'), sourceMap: true } }
        ] :

        // Production - site.css
        [ExtractCssChunks.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'sass-loader', options: { sassOptions: { includePaths: ['css', 'node_modules'] }, implementation: require('sass') } }
        ]
    },

    // images
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/, use:
        [{ loader: 'url-loader', options: { name: '[name].[hash].[ext]', outputPath: 'img/', limit: 25000 } }]
    },

    // Fonts
    {
      test: /.(ttf|otf|eot|svg|woff(2)?)$/, use:
        [{ loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'fonts/' } }]
    }

  ];
};

exports.rules = rules;
