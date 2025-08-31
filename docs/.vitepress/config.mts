import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: "Better VJudge Docs",
  description: "Better Vjudge 插件使用文档",
  logo: 'https://cdn.luogu.com.cn/upload/usericon/1393230.png',
  siteTitle: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '获取插件',
        items: [
          { text: '插件下载 & 更新', link: '/download/download.html' },
          { text: '篡改猴下载', link: '/download/tampermonkey-download' }
        ]
      }
    ],

    sidebar: {
      '/download/': [{
        text: '获取插件',
        items: [
          { text: '插件下载 & 更新', link: '/download/download.html' },
          { text: '篡改猴下载', link: '/download/tampermonkey-download' }
        ]
      }]
    },

    markdown: {
      container: {
        tipLabel: '提示',
        warningLabel: '警告',
        dangerLabel: '危险',
        infoLabel: '信息',
        detailsLabel: '详细信息'
      }
    },

    editLink: {
      pattern: 'https://github.com/better-vjudge/better-vjudge.github.io/edit/main/docs/:path',
      text: '编辑此页'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangyimin12345/better-vjudge' }
    ]
  }
})
