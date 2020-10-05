var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const extractPlugin = {
    loader: MiniCssExtractPlugin.loader,
};

module.exports = (env, argv) => {
    const IS_PRODUCTION = argv.mode === "production";

    const config_dist = {
        entry: path.resolve(__dirname, "src", "index.js"),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "nbviewer.js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.s?[ac]ss$/,
                    use: [extractPlugin, "css-loader", "sass-loader"],
                    // use: ["null-loader"],
                },
                // Bundle Jupyter Widgets and Font Awesome
                {
                    test: /\.(eot|ttf|woff|woff2|svg|png|gif|jpe?g)$/,
                    loader: require.resolve("url-loader"),
                    // loader: require.resolve("file-loader"),
                    // options: {
                    //     name: "[name].[ext]?[hash]",
                    // outputPath: "assets/",
                    // },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src", "index.html"),
            }),
            new MiniCssExtractPlugin({
                filename: "index.css",
            }),
            new FileManagerPlugin({
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, "static"),
                            destination: path.resolve(__dirname, "dist"),
                        },
                    ],
                },
            }),
            // new BundleAnalyzerPlugin(),
        ],
        devServer: {
            port: 3000,
            contentBase: path.resolve(__dirname, "dist"),
            historyApiFallback: { index: "/", disableDotRule: true },
        },
        node: {
            fs: "empty",
        },
        mode: IS_PRODUCTION ? "production" : "development",
        devtool: "source-map",
    };

    let config = [config_dist];

    return config;
};
