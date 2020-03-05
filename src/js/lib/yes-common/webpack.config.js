var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: './src/index.js',
    output: {
        path: 'dist',
        filename: 'index.js',
        library: 'yes-common',
        libraryTarget: 'umd'
    },
    // debug: true,
    // devtool:'eval-source-map',
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel',
                options:{
                    presets: ["es2015", "react"],
                    plugins: [require('babel-plugin-transform-object-rest-spread')]
                }
            }
        ]
    },
};

module.exports = config;