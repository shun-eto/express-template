const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const PORT = process.env.PORT || "3000";

const config = {
  entry: path.resolve(__dirname, "../src/main.ts"),
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js",
    publicPath: "/"
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true } //  ビルドの高速化
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        PORT: JSON.stringify(PORT)
      }
    })
  ]
};

module.exports = config;
