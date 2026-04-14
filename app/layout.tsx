import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '梦幻卡噗 | 卡通冒险游戏官网',
  description: '和软萌伙伴一起探索童话世界，解开谜题，拯救糖果王国！',
  openGraph: {
    title: '梦幻卡噗 | 卡通冒险游戏官网',
    description: '和软萌伙伴一起探索童话世界，解开谜题，拯救糖果王国！',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
