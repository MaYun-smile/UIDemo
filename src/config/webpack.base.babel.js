import path from 'path';
import webpack from 'webpack';

const { ProvidePlugin, DefinePlugin, NamedModulesPlugin } = webpack;
export default (options) => ({
    resolve: {
        extensions: ['.js', '.web.js'],
        alias: {
            'react-native': 'react-native-web',
            'yes-common': path.resolve(__dirname, '../js/lib/yes-common'),
            'yes-prop-types': path.resolve(__dirname, '../js/lib/yes-prop-types'),
            'yes-core': path.resolve(__dirname, '../js/lib/yes-core'),
            yes: path.resolve(__dirname, '../js/lib/yes'),
            'yes-native': path.resolve(__dirname, '../js/lib/yes-native'),
            'yes-router': path.resolve(__dirname, '../js/lib/yes-router'),
            'yes-web': path.resolve(__dirname, '../js/lib/yes-web'),
            'yes-platform': 'yes-web',
            // wx: path.resolve(__dirname, '../js/lib/yes-web/src/platform/wechat/jweixin.js'),
        },
    },
    entry: options.entry,
    output: Object.assign({
        path: path.resolve(process.cwd(), 'build'),
        publicPath: './',
        filename: '[name].js',
    }, options.output),
    module: {
        loaders: [
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
                    path.resolve(__dirname, '../node_modules/react-native-safe-area-view/'),
                    path.resolve(__dirname, '../node_modules/react-native-web/'),
                    path.resolve(__dirname, '../js'),
                    path.resolve(__dirname, '../entry.js'),
                    path.resolve(__dirname, '../main.js'),
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../cmcc'),
                    path.resolve(__dirname, '../thgn'),
                ],
                exclude: [
                    // path.resolve(__dirname, '../js/lib/yes-web/platform/wechat/jweixin.js'),
                ],
                loader: 'babel-loader',
                query: {
                    babelrc: false,
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: ['transform-decorators-legacy'],
                },
            }, {
                test: /\.scss$/,
                loaders: [
                    'isomorphic-style-loader',
                    'css-loader',
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
            { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
            {
                test: /\.tpl/,
                loader: 'html-loader',
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
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
            //     test: require.resolve('../js/lib/yes-web/platform/wechat/jweixin.js'),
            //     use: 'imports-loader?this=>window',
            // },

        ],
    },
    plugins: options.plugins.concat([
        new ProvidePlugin({
            // make fetch available
            fetch: 'exports-loader?self.fetch!whatwg-fetch',
        }),
        // Always expose NODE_ENV to webpack, in order to use `process.evn.NODE_ENV`
        // inside your code for any environment checks;
        // UglifyJS will automatically drop any unreachable code.
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                YIGO_PLATFORM: JSON.stringify(process.env.YIGO_PLATFORM),
            },
        }),
        new NamedModulesPlugin(),
    ]),
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
});

