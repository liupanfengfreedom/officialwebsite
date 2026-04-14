"use client"

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import {
  FaArrowRight,
  FaCandyCane,
  FaCopyright,
  FaEnvelope,
  FaGift,
  FaImages,
  FaMobileAlt,
  FaPause,
  FaPlayCircle,
  FaQq,
  FaSearchPlus,
  FaSteam,
  FaTachometerAlt,
  FaTimes,
  FaTwitter,
  FaUsers,
} from 'react-icons/fa'
import styles from './KapuLanding.module.css'

type MediaItem = {
  id: string
  title: string
  description: string
  kind: 'image' | 'video'
  imageSrc: string
  videoSrc?: string
}

const mediaItems: MediaItem[] = [
  {
    id: 'candy-forest',
    title: '🍬 糖果森林',
    description: '和噗噗一起收集星星糖',
    kind: 'image',
    imageSrc: '/media/candy-forest.svg',
  },
  {
    id: 'rainbow-falls',
    title: '🌈 彩虹瀑布',
    description: '梦幻滑道，收集彩虹晶石',
    kind: 'image',
    imageSrc: '/media/rainbow-falls.svg',
  },
  {
    id: 'trailer-preview',
    title: '🎬 首支预告',
    description: '先看 30 秒热闹开场，点开即可放大播放完整版。',
    kind: 'video',
    imageSrc: '/media/trailer-poster.svg',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'cloud-village',
    title: '☁️ 云朵镇',
    description: '在天空小镇里修复机关，让漂浮岛重新发光。',
    kind: 'image',
    imageSrc: '/media/cloud-village.svg',
  },
  {
    id: 'cake-castle',
    title: '🍰 蛋糕城堡',
    description: '终极对决！甜蜜的冒险终点',
    kind: 'image',
    imageSrc: '/media/cake-castle.svg',
  },
]

const loopedMediaItems = [...mediaItems, ...mediaItems, ...mediaItems]
const middleLoopStart = mediaItems.length
const heroArtwork = {
  src: '/media/hero-character-placeholder.svg',
  alt: '主视觉角色图',
}
const pageBackground = {
  imageSrc: '/media/page-background.svg',
  overlay: 'linear-gradient(145deg, rgba(255, 249, 232, 0.72) 0%, rgba(255, 230, 201, 0.58) 100%)',
  fallbackGradient: 'linear-gradient(145deg, #fff9e8 0%, #ffe6c9 100%)',
  position: 'center top',
  size: 'cover',
  attachment: 'fixed',
}

export default function KapuLanding() {
  const [copied, setCopied] = useState(false)
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null)
  const [centeredIndex, setCenteredIndex] = useState(middleLoopStart)
  const viewportRef = useRef<HTMLDivElement>(null)
  const mediaCardRefs = useRef<Array<HTMLButtonElement | null>>([])
  const resumeTimeoutRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const suppressClickRef = useRef(false)
  const pauseAutoRef = useRef(false)
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0, moved: false })
  const centeredIndexRef = useRef(middleLoopStart)
  const pageBackgroundStyle: CSSProperties = {
    backgroundImage: `${pageBackground.overlay}, url('${pageBackground.imageSrc}'), ${pageBackground.fallbackGradient}`,
    backgroundPosition: `center center, ${pageBackground.position}, center center`,
    backgroundSize: `cover, ${pageBackground.size}, cover`,
    backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
  }

  function normalizeLogicalIndex(index: number) {
    return ((index % mediaItems.length) + mediaItems.length) % mediaItems.length
  }

  function clearResumeTimer() {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }

  function scheduleAutoResume(delay = 900) {
    clearResumeTimer()
    resumeTimeoutRef.current = window.setTimeout(() => {
      pauseAutoRef.current = false
    }, delay)
  }

  function updateCenteredIndex(index: number) {
    centeredIndexRef.current = index
    setCenteredIndex(index)
  }

  function scrollCardIntoView(targetIndex: number, behavior: ScrollBehavior = 'smooth') {
    const viewport = viewportRef.current
    const card = mediaCardRefs.current[targetIndex]

    if (!viewport || !card) {
      return
    }

    const targetLeft = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2
    viewport.scrollTo({ left: targetLeft, behavior })
  }

  function centerCard(targetIndex: number, behavior: ScrollBehavior = 'smooth') {
    scrollCardIntoView(targetIndex, behavior)
    updateCenteredIndex(targetIndex)
  }

  function recenterIntoMiddleLoop(index: number) {
    const normalizedIndex = normalizeLogicalIndex(index)
    const recenteredIndex = middleLoopStart + normalizedIndex

    centeredIndexRef.current = recenteredIndex
    setCenteredIndex(recenteredIndex)

    window.requestAnimationFrame(() => {
      centerCard(recenteredIndex, 'auto')
    })
  }

  function findNearestCardIndex() {
    const viewport = viewportRef.current

    if (!viewport) {
      return centeredIndexRef.current
    }

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2
    let nearestIndex = centeredIndexRef.current
    let shortestDistance = Number.POSITIVE_INFINITY

    mediaCardRefs.current.forEach((card, index) => {
      if (!card) {
        return
      }

      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - viewportCenter)

      if (distance < shortestDistance) {
        shortestDistance = distance
        nearestIndex = index
      }
    })

    return nearestIndex
  }

  function snapToNearestCard(behavior: ScrollBehavior = 'smooth') {
    const nearestIndex = findNearestCardIndex()
    centerCard(nearestIndex, behavior)

    const isOutsideMiddleLoop =
      nearestIndex < middleLoopStart || nearestIndex >= middleLoopStart + mediaItems.length

    if (isOutsideMiddleLoop) {
      window.setTimeout(() => {
        recenterIntoMiddleLoop(nearestIndex)
      }, behavior === 'smooth' ? 380 : 0)
    }
  }

  function stepCarousel(direction: 1 | -1) {
    const currentIndex = centeredIndexRef.current
    const targetIndex = currentIndex + direction

    centerCard(targetIndex, 'smooth')

    const isOutsideMiddleLoop =
      targetIndex < middleLoopStart || targetIndex >= middleLoopStart + mediaItems.length

    if (isOutsideMiddleLoop) {
      window.setTimeout(() => {
        recenterIntoMiddleLoop(targetIndex)
      }, 380)
    }
  }

  const handleAutoStep = useEffectEvent(() => {
    if (!pauseAutoRef.current && !isDraggingRef.current && !activeMedia) {
      stepCarousel(-1)
    }
  })

  useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    scrollCardIntoView(middleLoopStart, 'auto')

    const handleResize = () => {
      scrollCardIntoView(centeredIndexRef.current, 'auto')
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearResumeTimer()
    }
  }, [])

  useEffect(() => {
    const autoStep = window.setInterval(() => {
      handleAutoStep()
    }, 2600)

    return () => {
      window.clearInterval(autoStep)
    }
  }, [])

  useEffect(() => {
    if (!activeMedia) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMedia(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeMedia])

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    clearResumeTimer()
    pauseAutoRef.current = true
    isDraggingRef.current = true
    dragStateRef.current = {
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      moved: false,
    }

    viewport.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current

    if (!viewport || !isDraggingRef.current) {
      return
    }

    const deltaX = event.clientX - dragStateRef.current.startX

    if (Math.abs(deltaX) > 6) {
      dragStateRef.current.moved = true
      suppressClickRef.current = true
    }

    viewport.scrollLeft = dragStateRef.current.startScrollLeft - deltaX
    updateCenteredIndex(findNearestCardIndex())
  }

  function finishDragging() {
    if (!isDraggingRef.current) {
      return
    }

    isDraggingRef.current = false
    snapToNearestCard('smooth')
    scheduleAutoResume(1200)
    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
  }

  function handleMediaClick(item: MediaItem) {
    if (suppressClickRef.current) {
      return
    }

    pauseAutoRef.current = true
    setActiveMedia(item)
  }

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
      <div className={styles.pageBackground} style={pageBackgroundStyle} />
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
              <Image
                src={heroArtwork.src}
                alt={heroArtwork.alt}
                width={900}
                height={900}
                priority
                className={styles.heroCharacter}
              />
            </div>
          </div>
        </section>

        <section id="gallery">
          <h2 className={styles.sectionTitle}>🍭 梦幻媒体廊 ✨</h2>
          <div className={styles.galleryHint}>
            <span>
              <FaImages />
              可自由增删媒体卡，支持图片和视频预览
            </span>
            <span>
              <FaPause />
              自动向右滚动，鼠标拖拽时会暂停并优先响应手势
            </span>
            <span>
              <FaSearchPlus />
              点击卡片即可放大查看，视频会在弹窗中播放
            </span>
          </div>
          <div
            ref={viewportRef}
            className={styles.mediaViewport}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDragging}
            onPointerCancel={finishDragging}
            onPointerLeave={() => {
              if (!isDraggingRef.current) {
                scheduleAutoResume(200)
              }
            }}
            onMouseEnter={() => {
              pauseAutoRef.current = true
              clearResumeTimer()
            }}
            onMouseLeave={() => {
              if (!isDraggingRef.current && !activeMedia) {
                scheduleAutoResume(200)
              }
            }}
          >
            <div className={styles.mediaTrack}>
              {loopedMediaItems.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  type="button"
                  ref={(node) => {
                    mediaCardRefs.current[index] = node
                  }}
                  className={`${styles.mediaCard} ${index === centeredIndex ? styles.mediaCardActive : ''}`}
                  onClick={() => handleMediaClick(item)}
                >
                  <div className={styles.mediaFrame}>
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={1600}
                      height={900}
                      className={styles.mediaImage}
                    />
                    <div className={styles.mediaOverlay}>
                      <span className={styles.mediaBadge}>{item.kind === 'video' ? '视频预览' : '场景截图'}</span>
                      <span className={styles.mediaZoom}>
                        {item.kind === 'video' ? <FaPlayCircle /> : <FaSearchPlus />}
                      </span>
                    </div>
                  </div>
                  <div className={styles.mediaMeta}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </button>
              ))}
            </div>
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
                poster="/media/trailer-poster.svg"
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

      {activeMedia ? (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-label={activeMedia.title}>
          <button type="button" className={styles.modalClose} onClick={() => setActiveMedia(null)} aria-label="关闭预览">
            <FaTimes />
          </button>
          <button type="button" className={styles.modalScrim} onClick={() => setActiveMedia(null)} aria-label="关闭背景层" />
          <div className={styles.modalCard}>
            <div className={styles.modalMedia}>
              {activeMedia.kind === 'video' && activeMedia.videoSrc ? (
                <video
                  className={styles.modalVideo}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={activeMedia.imageSrc}
                >
                  <source src={activeMedia.videoSrc} type="video/mp4" />
                  您的浏览器不支持 video 标签。
                </video>
              ) : (
                <Image
                  src={activeMedia.imageSrc}
                  alt={activeMedia.title}
                  width={1600}
                  height={900}
                  className={styles.modalImage}
                />
              )}
            </div>
            <div className={styles.modalInfo}>
              <h3>{activeMedia.title}</h3>
              <p>{activeMedia.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
