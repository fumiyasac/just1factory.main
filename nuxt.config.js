const pkg = require('./package')

/**
 * MEMO: Nuxt.jsのTypescript化について
 * (1) まずは公式ドキュメントに則って進めるのが基本方針
 * → https://typescript.nuxtjs.org/ja/guide/
 * (2) Nuxt.js2.10 + TypeScript環境構成をやってみた（※「vue-property-decorator」は「nuxt-property-decorator」に置き換えています）
 * → https://medium.com/anti-pattern-engineering/nuxt-js-typescript%E7%92%B0%E5%A2%83%E6%A7%8B%E6%88%90%E3%82%92%E3%82%84%E3%81%A3%E3%81%A6%E3%81%BF%E3%81%9F-c27df2011e7d
 * (3) Vueファイルの書き換えは下記を参考にしています
 * → https://qiita.com/ryo2132/items/4d43209ea89ad1297426
 */

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.description,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'こちらは「Just1factory(Fumiya Sakai)」の紹介ページになります。運営しているサービスやアプリ・書籍等に関する情報を公開しております。' }
    ],
    link: [
    ],
    css: [
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/font-awesome',
    '@nuxt/typescript-build'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
