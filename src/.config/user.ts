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
  latex: {
    katex: true,
  },
}
