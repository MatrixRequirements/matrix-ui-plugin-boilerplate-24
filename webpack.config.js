const path = require("path");
const webpack = require("webpack"); //to access built-in plugins

module.exports = {
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
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
        extensions: [".ts", ".js",".tsx",".jsx"]
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /(node_modules)|(ts\/types)/,
            },
            { test: /\.d.ts$/, use: "raw-loader" },
        ],
    },
    optimization: {
        minimize: false,
        nodeEnv: "production"
    },
    //We can ignore these warnings. 
    ignoreWarnings: [
        /possible exports/
    ],
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: "[name].js.map",
        }),
    ]
};
