// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/docs/react-storybook/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path')
module.exports = {
    devtool:'source-map',
    resolve: {
        alias: {
            'react-native': 'react-native-web',
            'yes-native': path.resolve(__dirname, '../js/lib/yes-web'),
            // 'yes-web': path.resolve(__dirname, '../js/lib/yes-web'),
            'yes': path.resolve(__dirname, '../js/lib/yes'),
            'yes-common': path.resolve(__dirname, '../js/lib/yes-common'),
            // 'react-native-web': path.resolve(__dirname, '../react-native-web/src'),
        },
    },
    plugins: [
        // your custom plugins
    ],
    module: {
        loaders: [
        // add your custom loaders.
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, '../node_modules/react-native-scrollable-tab-view/'),
                    path.resolve(__dirname, '../node_modules/react-native-material-ui/'),
                    path.resolve(__dirname, '../node_modules/react-native-actionsheet/'),
                    path.resolve(__dirname, '../node_modules/react-native-radio-buttons/'),
                    path.resolve(__dirname, '../node_modules/react-native-tableview-simple/'),
                    path.resolve(__dirname, '../node_modules/react-native-vector-icons/'),
                    path.resolve(__dirname, '../node_modules/react-native-tab-view/'),
                    path.resolve(__dirname, '../node_modules/react-navigation/'),
                    path.resolve(__dirname, '../node_modules/react-native-web/'),
                    path.resolve(__dirname, '../stories/'),
                    path.resolve(__dirname, '../js'),
                    path.resolve(__dirname, '../entry.js'),
                    path.resolve(__dirname, '../app'),
                ],
                exclude: [
                ],
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: ['es2015', 'react', 'stage-1'],
                },
            },
        ],
    },
};
