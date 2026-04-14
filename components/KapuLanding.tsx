"use client"

import { useState } from 'react'
import {
  FaArrowRight,
  FaCandyCane,
  FaCopyright,
  FaEnvelope,
  FaGift,
  FaMobileAlt,
  FaPlayCircle,
  FaQq,
  FaSteam,
  FaTachometerAlt,
  FaTwitter,
  FaUsers,
} from 'react-icons/fa'
import styles from './KapuLanding.module.css'

const galleryItems = [
  {
    title: '🍬 糖果森林',
    description: '和噗噗一起收集星星糖',
    art: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#B2E8D5" rx="20" />
        <circle cx="60" cy="150" r="45" fill="#5CAD8A" />
        <circle cx="150" cy="130" r="65" fill="#74C69D" />
        <circle cx="280" cy="120" r="55" fill="#40916C" />
        <rect x="30" y="180" width="340" height="30" fill="#9C7A3C" rx="10" />
        <circle cx="80" cy="110" r="12" fill="#FFD966" />
        <circle cx="220" cy="90" r="18" fill="#F4A261" />
        <circle cx="340" cy="100" r="15" fill="#E9C46A" />
        <text x="50" y="215" fill="#FEFAE0" fontWeight="bold" fontSize="20">
          🍬 糖果森林
        </text>
      </svg>
    ),
  },
  {
    title: '🌈 彩虹瀑布',
    description: '梦幻滑道，收集彩虹晶石',
    art: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#F9E6CF" rx="20" />
        <path d="M50 180 L200 60 L350 180 Z" fill="#A7C5EB" opacity="0.8" />
        <path d="M180 70 L210 130 L150 130 Z" fill="#70D6FF" />
        <rect x="180" y="120" width="40" height="70" fill="#D4A373" />
        <circle cx="200" cy="100" r="15" fill="#FCCF7C" />
        <path d="M80 150 Q120 100 160 150" stroke="#F4A261" strokeWidth="8" fill="none" />
        <path d="M240 150 Q280 100 320 150" stroke="#F4A261" strokeWidth="8" fill="none" />
        <text x="30" y="215" fill="#8B5A2B" fontWeight="bold" fontSize="18">
          🌈 彩虹瀑布
        </text>
      </svg>
    ),
  },
  {
    title: '🍰 蛋糕城堡',
    description: '终极对决！甜蜜的冒险终点',
    art: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#FFDDAA" rx="20" />
        <rect x="140" y="100" width="120" height="100" fill="#E7B183" rx="10" />
        <polygon points="200,40 260,100 140,100" fill="#D9895C" />
        <rect x="180" y="140" width="40" height="60" fill="#BF7B48" />
        <circle cx="160" cy="120" r="12" fill="#FFB347" />
        <circle cx="240" cy="120" r="12" fill="#FFB347" />
        <rect x="70" y="180" width="260" height="20" fill="#B2672E" rx="8" />
        <text x="140" y="215" fill="#FFF0D0" fontWeight="bold" fontSize="18">
          🍰 蛋糕城堡
        </text>
      </svg>
    ),
  },
]

const posterDataUri =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23FCD5A5'/%3E%3Ctext x='50%25' y='50%25' font-size='28' fill='%23c96a2d' text-anchor='middle' dominant-baseline='middle'%3E🎮 精彩视频加载%3C/text%3E%3C/svg%3E"

export default function KapuLanding() {
  const [copied, setCopied] = useState(false)

  async function copyGroupNumber() {
    const groupNumber = '887766552'

    try {
      await navigator.clipboard.writeText(groupNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      window.alert(`手动复制群号: ${groupNumber}`)
    }
  }

  return (
    <main className={styles.page}>
      <div
        className={styles.bubble}
        style={{ width: 250, height: 250, top: '10%', left: -80, background: 'rgba(255, 215, 150, 0.3)' }}
      />
      <div
        className={styles.bubble}
        style={{ width: 180, height: 180, bottom: '15%', right: -50, background: '#ffdd99' }}
      />
      <div
        className={styles.bubble}
        style={{ width: 300, height: 300, top: '40%', right: '20%', background: 'rgba(255, 215, 150, 0.2)' }}
      />

      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <FaCandyCane className={styles.logoIcon} />
            <span>卡噗大冒险</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#home">首页</a>
            <a href="#gallery">奇妙截图</a>
            <a href="#video">预告视频</a>
            <a href="#links">加入冒险</a>
          </div>
        </nav>

        <section id="home">
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <h1>
                ✨ 梦幻卡噗 ✨
                <br />
                甜梦大冒险
              </h1>
              <p>和软萌伙伴一起探索童话世界，解开谜题，拯救糖果王国！</p>
              <div className={styles.ctaButtons}>
                <a
                  href="https://store.steampowered.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.primaryButton}`}
                >
                  <FaSteam />
                  前往 Steam
                </a>
                <a
                  href="https://www.taptap.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btn}
                >
                  <FaMobileAlt />
                  TapTap 预约
                </a>
              </div>
            </div>

            <div className={styles.heroIllustration}>
              <svg
                viewBox="0 0 300 300"
                width="280"
                height="280"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.heroCharacter}
              >
                <circle cx="150" cy="150" r="120" fill="#FFD966" stroke="#FFB347" strokeWidth="6" />
                <circle cx="110" cy="120" r="18" fill="white" />
                <circle cx="190" cy="120" r="18" fill="white" />
                <circle cx="115" cy="122" r="8" fill="#2F2E2E" />
                <circle cx="195" cy="122" r="8" fill="#2F2E2E" />
                <path
                  d="M120 190 Q150 220 180 190"
                  stroke="#C96A2D"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect x="135" y="60" width="30" height="40" rx="15" fill="#FF8C42" />
                <circle cx="150" cy="85" r="12" fill="#FFB347" />
                <text x="150" y="270" textAnchor="middle" fill="#B4622A" fontWeight="bold" fontSize="22">
                  噗噗兽
                </text>
              </svg>
            </div>
          </div>
        </section>

        <section id="gallery">
          <h2 className={styles.sectionTitle}>🍭 梦幻世界剪影 ✨</h2>
          <div className={styles.galleryGrid}>
            {galleryItems.map((item) => (
              <article key={item.title} className={styles.galleryCard}>
                <div className={styles.cardImage}>{item.art}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="video">
          <h2 className={styles.sectionTitle}>🎬 游戏预告片 ✨</h2>
          <div className={styles.videoArea}>
            <div className={styles.videoWrapper}>
              <video
                className={styles.video}
                controls
                controlsList="nodownload"
                poster={posterDataUri}
                preload="metadata"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
                您的浏览器不支持 video 标签。
              </video>
            </div>
            <div className={styles.videoCaption}>
              <FaPlayCircle />
              <span>梦幻卡噗·首支预告 | 和伙伴们一起冒险吧！</span>
            </div>
            <p className={styles.videoNote}>⭐ 逗趣角色，萌趣战斗，2026年春季正式登场 ⭐</p>
          </div>
        </section>

        <section id="links">
          <h2 className={styles.sectionTitle}>🚀 即刻启程 ✨</h2>
          <div className={styles.linksPanel}>
            <article className={styles.platformCard}>
              <div className={styles.platformIcon}>
                <FaSteam color="#1b2838" />
              </div>
              <h3>Steam</h3>
              <p>PC 版即将上线</p>
              <a
                href="https://store.steampowered.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformLink}
              >
                <span>前往 Steam 商店</span>
                <FaArrowRight />
              </a>
            </article>

            <article className={styles.platformCard}>
              <div className={styles.platformIcon}>
                <FaTachometerAlt color="#ff7c60" />
              </div>
              <h3>TapTap</h3>
              <p>手机预约享好礼</p>
              <a
                href="https://www.taptap.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformLink}
              >
                <span>TapTap 预约</span>
                <FaMobileAlt />
              </a>
            </article>

            <article className={`${styles.platformCard} ${styles.qqGroup}`}>
              <div className={styles.platformIcon}>
                <FaQq color="#12B7F5" />
              </div>
              <h3>QQ群</h3>
              <p>加入冒险者公会</p>
              <button type="button" className={styles.qqCode} onClick={copyGroupNumber} title="点击复制群号">
                {copied ? '✅ 已复制群号！' : '🐧 群号: 887766552'}
              </button>
              <a
                href="https://jq.qq.com/?_wv=1027&k=5GfR4mC"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformLink}
                style={{ background: '#7ec8e0' }}
              >
                <span>一键加群</span>
                <FaUsers />
              </a>
              <p className={styles.qqHelper}>复制群号快速加入~</p>
            </article>
          </div>

          <div className={styles.giftBannerWrap}>
            <span className={styles.giftBanner}>
              <FaGift />
              加群抽限定皮肤！
            </span>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>
            <FaCopyright />
            2026 卡噗大冒险工作室 | 所有可爱都是我们的 🧸
          </p>
          <p className={styles.footerMeta}>
            <FaEnvelope />
            <span>contact@kapuadventure.com</span>
            <span>|</span>
            <FaTwitter />
            <span>@kapugame</span>
          </p>
        </footer>
      </div>
    </main>
  )
}
