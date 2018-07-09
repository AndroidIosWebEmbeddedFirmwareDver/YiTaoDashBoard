let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ROOT_PATH = path.resolve(__dirname);
let APP_PATH = path.resolve(ROOT_PATH, 'app');
let BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/index.jsx',
//webpack的入口文件只有一个，所以写的所有components甚至包括css/json什么的，都要引用在这里
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
//我这边是新建了一个folder叫public，用来放index.html和bundle.js
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'searchBar',    //配合html-webpack-plugin的配置
        })
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            }, {
                test: /\.(png|jpq)$/,
                loader: 'url? limit = 40000'
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader',
                include: APP_PATH,
            },
            {
                test: /\.js?$/,
                include: [
                    // path.join(__dirname, '你自己的js文件路径'),
                    // path.join(__dirname, 'node_modules/其他需要babel的第三方库'),
                    path.join(__dirname, 'node_modules/react-native-storage')
                ],
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-1', 'react'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};

