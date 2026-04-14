import type { Metadata } from 'next'
import KapuLanding from '@/components/KapuLanding'

export const metadata: Metadata = {
  title: '梦幻卡噗 | 卡通冒险游戏官网',
  description: '和软萌伙伴一起探索童话世界，解开谜题，拯救糖果王国！',
}

export default function Home() {
  return <KapuLanding />
}
