import { defineConfig } from "rollup";
import { join } from "path";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser"; // js压缩
import typescript from "rollup-plugin-typescript2";
import { visualizer } from "rollup-plugin-visualizer";
import vue from "rollup-plugin-vue";
import { readFileSync } from "fs";

const PKG_JSON = JSON.parse(readFileSync("package.json", { encoding: "utf8" }));

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "es",
        name: "vue-frame-render",
        sourcemap: true,
      },
      {
        file: "dist/index.js",
        format: "cjs",
        name: "vue-frame-render",
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(PKG_JSON.peerDependencies || {}),
      ...Object.keys(PKG_JSON.dependencies || {}),
    ],
    plugins: [
      resolve({ browser: true, extensions: [".vue"] }),
      commonjs(),
      typescript({
        clean: true,
        tsconfig: "tsconfig.json",
        rollupCommonJSResolveHack: false,
      }),
      vue({ css: true, compileTemplate: true }),
      terser(),
      visualizer(),
    ],
  },
]);
