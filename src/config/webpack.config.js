import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
export default (DEBUG, PATH, PORT = 3000) => {
    return ({
        resolve: {
            extensions: ['.js', '.web.js'],
            alias: {
                'react-native': 'react-native-web',
                'yes-common': path.resolve(__dirname, '../js/lib/yes-common'),
                'yes-prop-types': path.resolve(__dirname, '../js/lib/yes-prop-types'),
                'yes-core': path.resolve(__dirname, '../js/lib/yes-core'),
                yes: path.resolve(__dirname, '../js/lib/yes'),
                'yes-intf': path.resolve(__dirname, '../js/lib/yes'),
                'yes-native': path.resolve(__dirname, '../js/lib/yes-native'),
                'yes-router': path.resolve(__dirname, '../js/lib/yes-router'),
                'yes-web': path.resolve(__dirname, '../js/lib/yes-web'),
                'yes-platform': 'yes-web',
                'yes-yiui-common': 'yes-core/src/YIUI-common',
                'yes-filtermap': 'yes-core/src/filtermap',
                'yes-components-wrap': 'yes-intf/src/components',
                '@': path.join(__dirname, '../js/projects/thgn/src'),
                // wx: path.resolve(__dirname, '../js/lib/yes-web/src/platform/wechat/jweixin.js'),
            },
        },
        entry: {
            app: (DEBUG ? [`webpack-dev-server/client?http://localhost:${PORT}`] : []).concat([
                'whatwg-fetch',
                'babel-polyfill',
                './main',
            ]),
            // initializationLoading: './initializationLoading',
        },
        output: {
            path: path.resolve(__dirname, `../${PATH}`, 'generated'),
            filename: '[name].js',
            // publicPath: './generated/',
        },
        cache: DEBUG,
        // For options, see http://webpack.github.io/docs/configuration.html#devtool
        devtool: DEBUG ? 'source-map' : false,
        module: {
            loaders: [
                // Load ES6/JSX
                {
                    test: /\.jsx?$/,
                    include: [
                        path.resolve(__dirname, '../node_modules/react-native-scrollable-tab-view/'),
                        path.resolve(__dirname, '../node_modules/react-native-material-ui/'),
                        path.resolve(__dirname, '../node_modules/react-native-actionsheet/'),
                        path.resolve(__dirname, '../node_modules/react-native-datepicker/'),
                        path.resolve(__dirname, '../node_modules/react-native-radio-buttons/'),
                        path.resolve(__dirname, '../node_modules/react-native-tableview-simple/'),
                        path.resolve(__dirname, '../node_modules/react-native-vector-icons/'),
                        path.resolve(__dirname, '../node_modules/react-native-tab-view/'),
                        path.resolve(__dirname, '../node_modules/react-native-safe-area-view/'),
                        path.resolve(__dirname, '../node_modules/react-navigation/'),
                        path.resolve(__dirname, '../node_modules/react-native-web/'),
                        path.resolve(__dirname, '../node_modules/webpack-dev-server/'),
                        path.resolve(__dirname, '../node_modules/yg-echarts/'),
                        path.resolve(__dirname, '../js'),
                        path.resolve(__dirname, '../entry.js'),
                        path.resolve(__dirname, '../main.js'),
                        path.resolve(__dirname, '../app'),
                        path.resolve(__dirname, '../cmcc'),
                        path.resolve(__dirname, '../thgn'),
                    ],
                    exclude: [
                        // path.resolve(__dirname, '../js/lib/yes-web/src/platform/wechat/jweixin.js'),
                    ],
                    loader: 'babel-loader',
                    query: {
                        babelrc: false,
                        presets: ['es2015', 'react', 'stage-1'],
                    },
                }, {
                    test: /\.scss$/,
                    loaders: [
                        'isomorphic-style-loader',
                        'css-loader',
                        // 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                // Load images
                { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
                { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
                { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
                { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
                {
                    test: /\.tpl/,
                    loader: 'html-loader',
                },
                // Load fonts
                { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    exclude: [/control\.json/],
                },
                {
                    test: /control\.json/,
                    loader: 'control-loader',
                },
                { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
                // {
                //     test: require.resolve('../js/lib/yes-web/src/platform/wechat/jweixin.js'),
                //     use: 'imports-loader?this=>window',
                // },

            ],
        },
        plugins: DEBUG
            ? [
                new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"', __DEV__: true, __VERSION__: '"debug"' }),
                new HtmlWebpackPlugin({
                    template: './index.html',
                }),
            ]
            : [
                new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"', __DEV__: false, __VERSION__: '"debug"' }),
                // new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    compressor: { screw_ie8: true, keep_fnames: true, warnings: false },
                    mangle: { screw_ie8: true, keep_fnames: true },
                }),
                // new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.AggressiveMergingPlugin(),
                new HtmlWebpackPlugin({
                    template: './index.html',
                    // chunksSortMode: 'manual',
                    // chunks: ['initializationLoading', 'vendor'],

                }),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: './reports.html',
                    openAnalyzer: true,
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    children: true,
                    // chunks: ['app'],
                    minChunks: ({ resource }) => (
                        resource &&
                        resource.indexOf('node_modules') >= 0 &&
                        resource.match(/\.js$/)
                    ),
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    // filename: 'used-twice.js',
                    async: 'used-twice',
                    children: true,
                    minChunks(module, count) {
                        return count >= 2;
                    },
                }),
                // new webpack.optimize.UglifyJsPlugin({
                //     sourceMap: true,
                //     compress: {
                //         warnings: false,
                //     },
                // }),
            ],
    });
};
