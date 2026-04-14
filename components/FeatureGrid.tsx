"use client"
import { motion } from "framer-motion"
import { Gamepad2, Sparkles, Users, Trophy } from "lucide-react"

const features = [
  { icon: <Gamepad2 size={32} />, title: "独特玩法", desc: "融合平台跳跃与物理谜题" },
  { icon: <Sparkles size={32} />, title: "手绘美术", desc: "全程卡通渲染，色彩明快" },
  { icon: <Users size={32} />, title: "本地合作", desc: "支持 2-4 人同屏闯关" },
  { icon: <Trophy size={32} />, title: "成就系统", desc: "收集隐藏彩蛋解锁特殊外观" },
]

export default function FeatureGrid() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="font-[family-name:var(--font-bangers)] text-4xl md:text-5xl text-center mb-12">游戏特色</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="cartoon-card p-6 text-center flex flex-col items-center"
          >
            <div className="mb-4 text-blue-600">{f.icon}</div>
            <h3 className="font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
