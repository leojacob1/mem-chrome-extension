const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, '../extension/'),
    filename: 'content.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
