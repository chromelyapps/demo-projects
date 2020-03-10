// Vendor Rules

const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

function rules(isDevBuild) {
  return [

    // Vanilla CSS
    { test: /\.css$/, use: [ExtractCssChunks.loader, isDevBuild ? 'css-loader?sourceMap=true' : 'css-loader'] },

    // Scss (css) files
    {
      test: /\.(sass|scss)$/, use: isDevBuild ?
        // Development - vendor.css
        [ExtractCssChunks.loader,
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
          { loader: 'sass-loader', options: { sassOptions: { includePaths: ['src/css', 'node_modules'] }, sourceMap: true } }
        ] :
        // Production - vendor.css
        [ExtractCssChunks.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'sass-loader', options: { sassOptions: { includePaths: ['src/css', 'node_modules'] } } }
        ]
    },

    // images
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/, use:
        [{ loader: 'url-loader', options: { name: '[name].[hash].[ext]', outputPath: 'img/', limit: 100000 } }]
    },

    // Fonts
    {
      test: /.(ttf|otf|eot|svg|woff(2)?)$/, use:
        [{ loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'fonts/' } }]
    }
  ];
};

exports.rules = rules;
