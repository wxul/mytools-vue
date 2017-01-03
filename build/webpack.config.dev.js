var webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        publicPath: '/dist',
        path: '/dist',
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
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.vue']
    }
}