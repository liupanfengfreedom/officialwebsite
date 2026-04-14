import { Fredoka, Bangers } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-fredoka' })
const bangers = Bangers({ subsets: ['latin'], weight: ['400'], variable: '--font-bangers' })

export const metadata = {
  title: '你的游戏名 | Steam Indie Game',
  description: '一段充满动感与卡通趣味的冒险，即将登陆 Steam！',
  openGraph: {
    images: ['/og-image.jpg'], // 替换为你的宣传图
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${fredoka.variable} ${bangers.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}