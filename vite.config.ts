import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
            } else {
              options.startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        {
          entry: 'electron/preload/index.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
            // instead of restarting the entire Electron App.
            options.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        }
      ]),
      // Use Node.js API in the Renderer-process
      renderer({
        nodeIntegration: true,
      }),
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
        ],
        imports: ['vue',
          '@vueuse/core',
         

        ],
        vueTemplate: true,
        dirs: [
          'src/composables',
          'src/stores',
        ],
        dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    clearScreen: false,
  }
})
