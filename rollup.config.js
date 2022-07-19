import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";
import autoprefixer from "autoprefixer";

const packageJson = require("./package.json");

export default [
  {
    input: ["src/index.ts", "src/components/buttons/Button/index.ts"],
    output: {
      dir: "build",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: true, declarationDir: "build" }),
      postcss({
        extract: "minecraft-react-ui.css",
        plugins: [
          postcssImport(),
          postcssMixins({
            mixinsDir: ["src/styles/mixins"],
          }),
          autoprefixer(),
        ],
      }),
      ,
    ],
  },
];
