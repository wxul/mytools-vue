var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].js',
        chunkFilename: '[name],[chunkhash].min.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exlude: /^node_modules$/,
            loader: 'babel'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpe?g|gif)(\?\S*)?$/,
            exclude: /^node_modules$/,
            loader: 'file-loader?limit=8192&name=[name].[hash:8].[ext]'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        },{ 
            test: require.resolve("../src/other/llqrcode.js"),  
            loader: "exports?qrcode"
        },{ 
            test: require.resolve("../src/other/qrcanvas.js"),  
            loader: "exports?createQRImage"
        },{ 
            test: require.resolve("../src/other/qrcode.js"),  
            loader: "exports?QRCode&QRErrorCorrectLevel"
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.vue']
    }
}