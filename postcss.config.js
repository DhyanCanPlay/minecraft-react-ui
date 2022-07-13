const postcssImport = require("postcss-import");
const postcssMixins = require("postcss-mixins");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    postcssImport(),
    postcssMixins({
      mixinsDir: ["src/styles/mixins"],
    }),
    autoprefixer(),
  ],
};
