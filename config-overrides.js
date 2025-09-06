const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addBabelPlugins,
  getBabelLoader,
} = require("customize-cra");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
process.env.CI = "false";
const addCustomize = () => (config) => {
  if (config.output.publicPath) {
    config.output.publicPath =
      process.env.REACT_APP_NODE_ENV === "production"
        ? "/react-antd-admin-template/"
        : "/";
  }
  if (config.resolve) {
    config.resolve.extensions.push(".jsx");
  }
  
  // 处理 node_modules 中的可选链语法
  const babelLoader = getBabelLoader(config);
  if (babelLoader) {
    babelLoader.include = [
      babelLoader.include,
      /node_modules\/react-draggable/,
      /node_modules\/react-resizable/
    ];
  }
  
  return config;
};
module.exports = override(
  // 添加 Babel 插件支持可选链和空值合并
  addBabelPlugins(
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ),

  // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // 自动打包相关的样式
  }),

  // 使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#409EFF" }, // 1DA57A
  }),

  // 配置路径别名
  addWebpackAlias({
    "@": resolve("src"),
  }),
  addCustomize()
);
