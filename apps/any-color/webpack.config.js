module.exports = function (config, context) {
  config.entry.content = `${context.options.root}/${context.options.sourceRoot}/content.ts`;
  config.optimization.runtimeChunk = false;

  // to include vendor functions in entry bundles
  config.optimization.splitChunks = false;
  return config;
};
