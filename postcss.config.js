const path = require("path");
const postcssImport = require("postcss-import");
const postcssMixins = require("postcss-mixins");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    postcssImport({
      path: [path.resolve(__dirname, "src/styles")],
    }),
    postcssMixins({
      mixinsDir: ["src/styles/mixins"],
    }),
    autoprefixer(),
  ],
};
