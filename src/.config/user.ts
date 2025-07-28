import type { UserConfig } from '~/types'

export const userConfig: Partial<UserConfig> = {
  // Override the default config here
  site: { 
    website: "https://new-blog.c7w.tech",
    title: "c7w's blog",
    subtitle: ":P",
    author: "c7w",
    description: "c7w's personal blog",
    navLinks: [
      // 导航链接
      { name: '首页', href: '/' },
      { name: '博客', href: '/archive' },
      { name: '友链', href: '/friends' },
    ],
    socialLinks: [
      { name: 'email', href: 'mailto:cc7w@foxmail.com' },
      { name: 'github', href: 'https://github.com/c7w' },
      { name: 'scholar', href: 'https://scholar.google.com/citations?user=WvbKfLgAAAAJ' },
    ],
    footer: [
      // 页脚信息
      '© 2020-2025 <a target="_blank" href="%website">%author</a>',
    ],
    
  },
  seo: {
    twitter: '@c7w_tech',
    meta: [
      // 核心关键词 - 根据你的研究领域定制
      { 
        name: 'keywords', 
        content: '高焕昂,机器学习,深度学习,强化学习,计算机视觉,人工智能,Embodied AI,自动驾驶,NeRF,Gaussian Splatting,扩散模型,博客,技术分享,研究,清华大学,计算机科学'
      },
      // 英文关键词
      { 
        name: 'keywords', 
        content: 'huanang gao,huan-ang gao,machine learning,deep learning,reinforcement learning,computer vision,artificial intelligence,embodied ai,autonomous driving,nerf,gaussian splatting,diffusion models,blog,tech,research,tsinghua university,computer science'
      },
      // 网站主题和分类
      { 
        name: 'subject', 
        content: 'Computer Science, Artificial Intelligence, Machine Learning'
      },
      // 内容语言
      { 
        name: 'language', 
        content: 'zh-CN,en-US'
      },
      // 作者信息
      { 
        name: 'author', 
        content: 'c7w, Huan-ang Gao, 高焕昂, huanang gao, huanang'
      },
      // 版权信息
      { 
        name: 'copyright', 
        content: 'Copyright (c) 2020-2025 c7w'
      },
      // 网站类型
      { 
        name: 'category', 
        content: 'technology,blog,research,academic'
      },
      // 内容评级
      { 
        name: 'rating', 
        content: 'general'
      },
      // 搜索引擎指令
      { 
        name: 'robots', 
        content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      },
      // 地理位置（可选）
      { 
        name: 'geo.region', 
        content: 'CN-BJ'
      },
      { 
        name: 'geo.placename', 
        content: 'Beijing, China'
      },
      // Google站点验证（需要你去Google Search Console获取）
      // { name: 'google-site-verification', content: '你的验证码' },
      
      // 百度站点验证（需要你去百度站长平台获取）
      // { name: 'baidu-site-verification', content: '你的验证码' },
      
      // 必应站点验证（需要你去Bing Webmaster Tools获取）
      // { name: 'msvalidate.01', content: '你的验证码' },
    ],
    link: [
      // 备用语言版本（如果有的话）
      // { rel: 'alternate', hreflang: 'en', href: 'https://new-blog.c7w.tech/en/' },
      // { rel: 'alternate', hreflang: 'zh', href: 'https://new-blog.c7w.tech/zh/' },
      
      // 规范链接
      { rel: 'canonical', href: 'https://new-blog.c7w.tech/' },
      
      // DNS预连接优化
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
      
      // 安全策略
      { rel: 'me', href: 'https://github.com/c7w' },
    ],
  },
  latex: {
    katex: true,
  },
}
