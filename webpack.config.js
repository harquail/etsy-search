module.exports = {
  devtool: "source-map",
  entry: ["./src/app.ts", "./style/index.css"],
  mode: "none",
  module: {
    rules: [{
        loader: "ts-loader",
        test: /\.ts$/,
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader", // creates style nodes from JS strings
        }, {
          loader: "css-loader", // translates CSS into CommonJS
        }],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
};
