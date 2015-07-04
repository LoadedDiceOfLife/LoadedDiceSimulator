var webpack = require("webpack");
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
    entry: "./js/entry.js",
    output: {
        path: __dirname,
        filename: "build/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new BowerWebpackPlugin(),
        new webpack.ProvidePlugin()
    ]
};
