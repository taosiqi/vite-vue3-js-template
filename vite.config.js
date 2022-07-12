import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import unoCss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  // 配置项目别名
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@components': resolve('./src/components'),
      '@store': resolve('./src/store'),
      '@views': resolve('./src/views')
    }
  },
  // 公共样式
  css: {
    // 全局scss
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/base.scss";'
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    AutoImport({
      // 按需引入element plus
      resolvers: [ElementPlusResolver()],
      // 自动引入vue等api
      imports: [
        'vue', 'vue-router', 'pinia'
      ],
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: './.eslintrc-auto-import.json', // 生成json文件
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()]
    }),
    vueJsx({}),
    viteCompression(),
    unoCss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        [/^fz-(\d+)$/, match => ({ 'font-size': `${match[1] / 3.75}vw` })], // 直接class上写 fz-10之类的即可
        [/^mg-(\d+)$/, match => ({ margin: `${match[1] / 3.75}vw` })]
      ]
    })
  ]
})
