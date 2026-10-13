import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { APP_URL } from '../data/site'
import { blogPosts, displayTagForPost, inlineImagesForPost, thumbnailFileForPost, type BlogEmbed, type BlogInlineImage, type BlogPost } from '../data/blog'
import { publicAssetUrl } from '../lib/assets'
import { RoiCalculator, ShareBar } from '../components/components'
import { LoyaltyCardShowcase } from '../components/LoyaltyCardShowcase'
import styles from './BlogPostPage.module.css'

const DEFAULT_TITLE = 'Loyalties'
const DEFAULT_DESCRIPTION =
  'Loyalties — the loyalty card your customers actually want to fill. Tap to join, tap to earn, no app required.'

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
    return () => {
      document.title = DEFAULT_TITLE
      meta.setAttribute('content', DEFAULT_DESCRIPTION)
    }
  }, [title, description])
}

function InlineImage({ image }: { image: BlogInlineImage }) {
  return (
    <figure className={styles.inlineFigure}>
      <img src={publicAssetUrl(image.file)} alt={image.alt} className={styles.inlineImage} />
    </figure>
  )
}

function BlogEmbedBlock({ embed }: { embed: BlogEmbed }) {
  switch (embed.kind) {
    case 'roi':
      return <RoiCalculator />
    case 'cards':
      return <LoyaltyCardShowcase industry={embed.industry} />
    default:
      return null
  }
}

/** Convert **bold** markers within a string into <strong> elements. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*/)
  if (parts.length === 1) return text
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  )
}

/** Parse a single \n\n-separated block into the right element. */
function renderBlock(text: string, key: number): React.ReactNode {
  const lines = text.split('\n')

  // Bullet list — every line starts with '- '
  if (lines.length > 0 && lines.every((l) => l.startsWith('- '))) {
    return (
      <ul key={key} className={styles.list}>
        {lines.map((l, i) => (
          <li key={i} className={styles.listItem}>{renderInline(l.slice(2))}</li>
        ))}
      </ul>
    )
  }

  // Ordered list — every line starts with a digit + period
  if (lines.length > 0 && lines.every((l) => /^\d+\.\s/.test(l))) {
    return (
      <ol key={key} className={`${styles.list} ${styles.listOrdered}`}>
        {lines.map((l, i) => (
          <li key={i} className={styles.listItem}>{renderInline(l.replace(/^\d+\.\s+/, ''))}</li>
        ))}
      </ol>
    )
  }

  // Table — lines contain pipe characters
  if (lines[0]?.includes('|')) {
    const rows = lines
      .filter((l) => l.trim().startsWith('|'))
      .map((l) =>
        l
          .trim()
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim()),
      )
    const [header, ...body] = rows
    if (header && header.length > 0) {
      return (
        <div key={key} className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {header.map((h, i) => (
                  <th key={i} className={styles.th}>{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className={styles.tr}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={styles.td}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  return <p key={key} className={styles.para}>{renderInline(text)}</p>
}

function PostSection({
  heading,
  body,
  embed,
}: {
  heading: string
  body: string
  embed?: BlogEmbed
}) {
  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{heading}</h2>
        {body.split('\n\n').map((block, i) => renderBlock(block, i))}
      </section>
      {embed ? (
        <div
          className={
            embed.kind === 'roi' ? styles.embedFull : styles.embed
          }
        >
          <BlogEmbedBlock embed={embed} />
        </div>
      ) : null}
    </>
  )
}

function relatedPosts(post: BlogPost): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== post.slug && (p.tag === post.tag || p.industry === post.industry))
    .slice(0, 3)
}

export function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  usePageMeta(
    post?.metaTitle ?? DEFAULT_TITLE,
    post?.metaDescription ?? DEFAULT_DESCRIPTION,
  )

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!post) {
    return (
      <div className={`container ${styles.notFound}`}>
        <h1>Post not found</h1>
        <p>
          <Link to="/resources">Browse all resources</Link>
        </p>
      </div>
    )
  }

  const heroSrc = publicAssetUrl(thumbnailFileForPost(post))
  const related = relatedPosts(post)
  const inlineImages = inlineImagesForPost(post)
  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://loyalties.marketing/resources/${post.slug}`

  return (
    <main>
      <section
        className={styles.hero}
        style={{ '--accent': post.accent } as React.CSSProperties}
      >
        <div className={styles.heroBg} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>{displayTagForPost(post).label}</span>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <p className={styles.heroSub}>{post.excerpt}</p>
            <a href={APP_URL} className={styles.heroCta}>
              {post.cta}
            </a>
          </div>
          <div className={styles.heroShape}>
            <img
              src={heroSrc}
              alt=""
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={`container ${styles.contentInner}`}>
          <article className={styles.article}>
            <PostSection
              heading={post.section1Heading}
              body={post.section1Body}
              embed={post.embed?.afterSection === 1 ? post.embed : undefined}
            />
            {inlineImages[0] ? <InlineImage image={inlineImages[0]} /> : null}
            <PostSection
              heading={post.section2Heading}
              body={post.section2Body}
              embed={post.embed?.afterSection === 2 ? post.embed : undefined}
            />
            {inlineImages[1] ? <InlineImage image={inlineImages[1]} /> : null}
            <PostSection
              heading={post.section3Heading}
              body={post.section3Body}
              embed={post.embed?.afterSection === 3 ? post.embed : undefined}
            />

            <div className={styles.postFooter}>
              <ShareBar url={shareUrl} title={post.title} />
              {related.length > 0 ? (
                <div className={styles.related}>
                  <p className={styles.relatedLabel}>Related resources</p>
                  <ul className={styles.relatedList}>
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link to={`/resources/${item.slug}`}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <p className={styles.sideCardLabel}>Ready to try it?</p>
              <p className={styles.sideCardText}>
                Build your free stamp card in under 10 minutes. No app needed
                for customers.
              </p>
              <a href={APP_URL} className={styles.sideCardCta}>
                Start free
              </a>
            </div>
            <Link to="/resources" className={styles.backLink}>
              ← All resources
            </Link>
          </aside>
        </div>
      </div>

      <section
        className={styles.close}
        style={{ '--accent': post.accent } as React.CSSProperties}
      >
        <div className={`container ${styles.closeInner}`}>
          <p className={styles.closeText}>
            Start your free stamp card today. Free up to 100 active customers,
            no app needed.
          </p>
          <a href={APP_URL} className={styles.closeCta}>
            {post.cta}
          </a>
        </div>
      </section>
    </main>
  )
}
