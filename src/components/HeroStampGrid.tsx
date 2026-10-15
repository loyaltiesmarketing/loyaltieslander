import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { APP_URL } from '../data/site'
import { publicAssetUrl } from '../lib/assets'
import styles from './HeroStampGrid.module.css'

const HERO_VIDEO = publicAssetUrl('cosmos_1710149938 (1).mp4')
const HERO_POSTER = '/hero-poster.jpg'

type Stamp = { label?: string }

const DESKTOP_STAMPS: Stamp[] = [{}, {}, {}, {}, {}, {}, {}]

/** Mobile 2×3 — 5 video stamps + Sign up */
const MOBILE_STAMPS: Stamp[] = [{}, {}, {}, {}, {}]

type Offset = { w: number; h: number; left: number; top: number }

export function HeroStampGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const clipRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [inView, setInView] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [offsets, setOffsets] = useState<Offset[]>([])
  const [videoPlaying, setVideoPlaying] = useState(false)

  const stamps = isDesktop ? DESKTOP_STAMPS : MOBILE_STAMPS

  useEffect(() => {
    const desktopMq = window.matchMedia('(min-width: 768px)')
    const updateDesktop = () => setIsDesktop(desktopMq.matches)
    updateDesktop()
    desktopMq.addEventListener('change', updateDesktop)
    return () => {
      desktopMq.removeEventListener('change', updateDesktop)
    }
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => {
      const stageRect = stage.getBoundingClientRect()
      const next = stamps.map((_, i) => {
        const clip = clipRefs.current[i]
        if (!clip) return { w: stageRect.width, h: stageRect.height, left: 0, top: 0 }
        const clipRect = clip.getBoundingClientRect()
        return {
          w: stageRect.width,
          h: stageRect.height,
          left: stageRect.left - clipRect.left,
          top: stageRect.top - clipRect.top,
        }
      })
      setOffsets(next)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    clipRefs.current.forEach((clip) => {
      if (clip) ro.observe(clip)
    })
    return () => ro.disconnect()
  }, [stamps, isDesktop])

  useEffect(() => {
    setVideoPlaying(false)
  }, [stamps.length, isDesktop])

  useEffect(() => {
    if (!inView) return
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[]
    if (!videos.length) return

    const primary = videos[0]

    const markPlaying = () => setVideoPlaying(true)
    primary.addEventListener('playing', markPlaying)

    const playAll = async () => {
      await Promise.all(
        videos.map(async (video) => {
          video.muted = true
          video.defaultMuted = true
          video.playsInline = true
          video.setAttribute('playsinline', '')
          video.setAttribute('webkit-playsinline', 'true')
          try {
            await video.play()
            setVideoPlaying(true)
          } catch {
            /* Autoplay blocked — poster stays until play succeeds */
          }
        }),
      )
    }
    void playAll()

    const sync = () => {
      const t = primary.currentTime
      for (let i = 1; i < videos.length; i++) {
        const v = videos[i]
        if (Math.abs(v.currentTime - t) > 0.125) v.currentTime = t
      }
    }
    const id = window.setInterval(sync, 500)
    return () => {
      primary.removeEventListener('playing', markPlaying)
      window.clearInterval(id)
    }
  }, [inView, stamps.length])

  return (
    <section className={styles.hero} ref={sectionRef} aria-labelledby="hero-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.stampStage} ref={stageRef}>
          <div className={styles.grid}>
            {stamps.map((stamp, i) => {
              const offset = offsets[i]
              const mediaStyle = offset
                ? {
                    width: offset.w,
                    height: offset.h,
                    left: offset.left,
                    top: offset.top,
                  }
                : undefined

              return (
                <div
                  key={`${isDesktop ? 'd' : 'm'}-${i}`}
                  className={styles.stampWindow}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div
                    className={styles.stampClip}
                    ref={(el) => {
                      clipRefs.current[i] = el
                    }}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el
                      }}
                      className={`${styles.stampMedia} ${videoPlaying ? styles.stampMediaVisible : ''}`}
                      muted
                      loop
                      playsInline
                      autoPlay
                      controls={false}
                      disablePictureInPicture
                      preload={inView ? 'auto' : 'metadata'}
                      style={mediaStyle}
                      aria-hidden
                      tabIndex={-1}
                    >
                      <source src={HERO_VIDEO} type="video/mp4" />
                    </video>
                    <img
                      className={`${styles.stampPoster} ${videoPlaying ? styles.stampPosterHidden : ''}`}
                      src={HERO_POSTER}
                      alt=""
                      aria-hidden
                      draggable={false}
                      style={mediaStyle}
                    />
                    <div className={styles.shade} />
                  </div>
                  {stamp.label ? (
                    <span className={styles.stampLabel}>{stamp.label}</span>
                  ) : null}
                </div>
              )
            })}
            <a
              href={APP_URL}
              className={styles.signUp}
              style={{ animationDelay: `${stamps.length * 60}ms` }}
            >
              <img
                className={styles.signUpMark}
                src="/submark-white.svg"
                alt=""
                aria-hidden
              />
              <span className={styles.signUpText}>Sign up</span>
            </a>
          </div>
        </div>

        <div className={styles.copy}>
          <h1 id="hero-heading" className={styles.headline}>
            Turn first-timers into regulars.
          </h1>
          <p className={styles.support}>
            Tap to join, tap to earn, no app required.
          </p>
        </div>
      </div>
    </section>
  )
}
