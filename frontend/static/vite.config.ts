import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  viteCommonjs,
  esbuildCommonjs
} from '@originjs/vite-plugin-commonjs'
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCommonjs(),
    requireTransform({})
  ],
  base: process.env.mode === "production" ? "/static/" : "/",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    manifest: true,
    modulePreload: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-s3'])],
    },
  }
});

export type VitePluginRequireTransformParamsType = {
  //filter files that should enter the plugin
  fileRegex?: RegExp;
  //prefix that would plugin into the requireSpecifier
  importPrefix?: string;
  //to deal with the requireSpecifier
  importPathHandler?: Function;
};
