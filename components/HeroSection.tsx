"use client"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"

export default function HeroSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  }
  const item: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120 } }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16">
      {/* 背景动态元素 */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-24 h-24 bg-yellow-300 rounded-full opacity-60 blur-xl"
        />
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-32 right-[15%] w-32 h-32 bg-pink-400 rounded-full opacity-50 blur-xl"
        />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 text-center max-w-4xl">
        {/* 游戏 Logo / 标题 */}
        <motion.h1 variants={item} className="font-[family-name:var(--font-bangers)] text-6xl md:text-8xl text-black drop-shadow-[4px_4px_0px_#fff] mb-4 tracking-wider">
          你的游戏标题
        </motion.h1>
        
        <motion.p variants={item} className="text-xl md:text-2xl text-gray-800 font-[family-name:var(--font-fredoka)] mb-8 max-w-2xl mx-auto">
          一段充满欢笑、机关与未知冒险的卡通世界，准备好了吗？
        </motion.p>

        {/* Steam CTA */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="https://store.steampowered.com/app/你的APPID" target="_blank" className="cartoon-btn-steam flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037c.004.004.007.008.007.008l10.292 10.292c.006.006.012.012.018.018 6.177-.489 11.037-5.656 11.037-11.957C21.377 4.19 16.187 0 11.979 0zM6.197 15.237a2.58 2.58 0 01-2.578-2.578 2.58 2.58 0 012.578-2.578 2.58 2.58 0 012.578 2.578 2.58 2.58 0 01-2.578 2.578zm8.756-2.068a1.426 1.426 0 01-1.426-1.426 1.426 1.426 0 011.426-1.426 1.426 1.426 0 011.426 1.426 1.426 1.426 0 01-1.426 1.426z"/></svg>
            添加至 Steam 愿望单
          </Link>
          <button className="cartoon-btn bg-white text-black hover:bg-gray-50">
            观看预告片 ▶
          </button>
        </motion.div>

        {/* 浮动角色示意（替换为实际 PNG 透明图） */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="mt-12 relative mx-auto w-64 h-64"
        >
          <div className="w-full h-full bg-gray-200 border-4 border-black rounded-full flex items-center justify-center text-gray-500">
            替换为游戏主角立绘
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
