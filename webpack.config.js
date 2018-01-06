'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
entry: {
    index: './src/index.js'
},
output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'index.js',
    chunkFilename: 'react-tracker.js',    
    sourceMapFilename: 'react-tracker.map',
    library: 'ReactTracker',
    libraryTarget: 'umd'
},
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [
                ['es2015', { modules: false }],
                'react',
                ],
                plugins: [
                'transform-class-properties',
                'transform-object-assign',
                ],
            }
            },
        },
    ]
},
plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      }
    }),
]
};