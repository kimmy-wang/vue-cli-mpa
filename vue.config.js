// vue.config.js
const path = require("path");
const WebpackBar = require("webpackbar");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const AssetsWebpackPlugin = require("assets-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const name = "Gitter"; // page title

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "",
  assetsDir: "static",
  pages: {
    index: "./src/main.js",
    auth: {
      entry: "./src/auth.js",
      filename: "./auth/index.html",
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  configureWebpack: () => {
    const config = {
      name,
      resolve: {
        alias: {
          "@": resolve("src"),
        },
      },
      // entry: {
      //   index: "./src/main.js",
      //   auth: "./src/auth.js",
      // },
      // output: {
      //   path: resolve("dist"),
      //   // filename: (chunkData) => {
      //   //   console.log(chunkData.chunk.name);
      //   //   return chunkData.chunk.name === "index"
      //   //     ? "./[name].[hash].js"
      //   //     : "./[name].[hash].js";
      //   // },
      // },
      // plugins: [
      //   new CleanWebpackPlugin(),
      //   new AssetsWebpackPlugin(),
      //   new HtmlWebpackPlugin({
      //     title: "Home",
      //     template: "./public/index.html",
      //     filename: "./index.html",
      //     chunks: ["chunk-vendors", "chunk-common", "index"],
      //   }),
      //   new HtmlWebpackPlugin({
      //     title: "Auth",
      //     template: "./public/index.html",
      //     filename: "./auth/index.html",
      //     chunks: ["chunk-vendors", "chunk-common", "auth"],
      //     publicPath: "../",
      //   }),
      // ],
    };
    if (process.env.NODE_ENV === "production") {
      config.plugins = [
        // ...config.plugins,
        new WebpackBar({
          name,
        }),
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      ];
    }
    return config;
  },
  chainWebpack: (config) => {
    config.plugin("html-auth").tap((args) => {
      console.log("args", args);
      args[0].publicPath = "../";
      return args;
    });
  },
};
