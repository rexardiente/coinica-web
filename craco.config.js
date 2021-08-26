/** CRA Webpack override https://github.com/gsoft-inc/craco */
const { whenProd } = require("@craco/craco");
const zlib = require("zlib");
const CompressionPlugin = require("compression-webpack-plugin");
const dotEnv = require("dotenv");

dotEnv.config();

module.exports = {
  webpack: {
    plugins: [
      ...whenProd(
        () => [
          new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 8192,
            minRatio: 0.7,
          }),
        ],
        []
      ),
      ...whenProd(
        () => [
          new CompressionPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
              params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY
              },
            },
            threshold: 8192,
            minRatio: 0.7,
          }),
        ],
        []
      )
    ],
  },
};
