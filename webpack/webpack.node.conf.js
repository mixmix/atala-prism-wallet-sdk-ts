const webpack = require("webpack");
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const exec = require("child_process").exec;
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    const plugins = [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        })
    ];

    return {
        target: "node",
        externals: [nodeExternals()],
        mode: isProduction ? "production" : "development",
        devtool: "inline-source-map",
        entry: {
            entry: isProduction ? "./index.ts" : "./demos/test-node.ts",
        },
        output: {
            filename: "index.js",
            path: path.resolve(
                __dirname,
                `../build/node${isProduction ? "" : "-test"}/mjs`
            ),
            library: {
                type: "commonjs2"
            }
        },
        optimization: {
            minimize: false
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: plugins,
    };
};
