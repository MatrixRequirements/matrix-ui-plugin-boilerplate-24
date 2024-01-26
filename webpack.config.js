const path = require("path");
const webpack = require("webpack"); //to access built-in plugins

module.exports = {
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
    // bundling mode
    mode: "none",
    resolve: "preferRelative",
    // entry files
    entry: {
        BPP: {
            import: "./src/BPP/Plugin.ts",
        },
    },

    // output bundles (location)
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/",
    },

    // file resolutions
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /(node_modules)|(ts\/types)/,
            },
            { test: /\.d.ts$/, use: "raw-loader" },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("postcss-import"),
                                    require("postcss-prefix-selector")({
                                        // that's for tailwind not to mess with bootstrap styles
                                        prefix: ".addon",
                                        transform: function (prefix, selector, prefixedSelector) {
                                            if (selector.startsWith("html") || selector.startsWith("body")) {
                                                return selector;
                                            }
                                            return prefixedSelector;
                                        },
                                    }),
                                    require("tailwindcss"),
                                    require("autoprefixer"),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: false,
        nodeEnv: "production",
    },
    //We can ignore these warnings.
    ignoreWarnings: [/possible exports/],
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: "[name].js.map",
        }),
    ],
};
