'use strict';

const path = require('path');
const { ReactLoadablePlugin } = require('webpack');

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
    ],
},
devtool: 'inline-source-map'
};