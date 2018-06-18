var webpackConfig = require("./webpack.config.js");
var path = require("path");

webpackConfig.module.rules.push({
  enforce: "post",
  exclude: /node_modules|\.spec\.js$/,
  test: /\.ts$|\.tsx$/,
});

module.exports = webpackConfig;
