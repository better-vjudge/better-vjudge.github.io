import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: "Better VJudge Docs",
  description: "Better Vjudge 文档",
  siteTitle: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    // logo: 'https://cdn.luogu.com.cn/upload/usericon/1393230.png',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '获取插件',
        items: [
          { text: '插件下载 & 更新', link: '/download/download.html' },
          { text: '篡改猴下载', link: '/download/tampermonkey-download' }
        ]
      },
      { text: '预览', link: '/preview/preview.html'},
      { text: '使用说明', link: '/use/use-generalizations.html'},
      { text: '功能原理', link: '/develop/fragmented-thoughts.html'}
    ],

    sidebar: [
      {
        text: '获取插件',
        items: [
          { text: '插件下载 & 更新', link: '/download/download.html' },
          { text: '篡改猴下载', link: '/download/tampermonkey-download' }
        ]
      },
      {
        text: '预览',
        items: [
          { text: '预览', link: '/preview/preview.html' },
        ]
      },
      {
        text: '功能原理',
        items: [
          { text: '碎碎念', link: '/develop/fragmented-thoughts.html' },
          {
            text: '美化',
            items: [
              { text: '顶栏', link: '/develop/beautification/navbar.html' },
              { text: '字体', link: '/develop/beautification/font-family.html' },
              { text: '排行榜', link: '/develop/beautification/rank.html' },
              { text: '背景颜色', link: '/develop/beautification/background-color.html' },
              { text: '其他', link: '/develop/beautification/other.html' }
            ]
          },
          {
            text: '功能',
            items: [
              { text: '页脚添加说明', link: '/develop/function.html#页脚添加说明' },
              { text: '自动更新', link: '/develop/function.html#自动更新' },
              { text: '爬取样例', link: '/develop/function.html#爬取样例' },
              { text: '代码编辑器', link: '/develop/function.html#代码编辑器' },
              { text: '运行', link: '/develop/function.html#运行' }
            ]
          }
        ]
      }
    ],

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
