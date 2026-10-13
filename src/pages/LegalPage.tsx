import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getLegalDoc, legalDocs } from '../data/legal'
import {
  scrollToLegalSection,
  splitLegalDocument,
  watchLegalToc,
  type LegalSection,
  type TocItem,
} from '../lib/legalToc'
import styles from './LegalPage.module.css'

export function LegalPage() {
  const { doc } = useParams()
  const page = getLegalDoc(doc)
  const [tocOpen, setTocOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [activeId, setActiveId] = useState('')

  const { preamble, sections } = useMemo(
    () =>
      page
        ? splitLegalDocument(page.markdown)
        : { preamble: '', sections: [] as LegalSection[] },
    [page],
  )
  const toc: TocItem[] = useMemo(
    () =>
      sections.map((section, index) => ({
        id: section.id,
        label: section.label,
        level: section.level,
        index,
      })),
    [sections],
  )

  useEffect(() => {
    setTocOpen(false)
    setActiveId(sections[0]?.id ?? '')
    window.scrollTo({ top: 0 })
  }, [doc, sections])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!sections.length) return undefined
    return watchLegalToc((id) => setActiveId(id))
  }, [sections, page?.slug])

  if (!page) {
    return (
      <div className={`container ${styles.page}`}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.lede}>
          That legal page doesn’t exist.{' '}
          <Link to="/legal">Browse all policies</Link>.
        </p>
      </div>
    )
  }

  const jumpTo = (id: string) => {
    setActiveId(id)
    setTocOpen(false)
    window.requestAnimationFrame(() => {
      scrollToLegalSection(id)
      window.history.replaceState(null, '', `#${id}`)
    })
  }

  return (
    <div className={styles.shell}>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar} aria-label="On this page">
          <Link to="/legal" className={styles.backLink}>
            ← All policies
          </Link>
          <p className={styles.tocTitle}>On this page</p>
          <nav className={styles.navMenu} aria-label="Page sections">
            <TocList items={toc} activeId={activeId} onNavigate={jumpTo} />
          </nav>
        </aside>

        <div className={styles.mobileNav}>
          <Link to="/legal" className={styles.mobileBack}>
            ← All policies
          </Link>
          <div className={styles.mobileToc}>
            <button
              type="button"
              className={styles.tocToggle}
              aria-expanded={tocOpen}
              onClick={() => setTocOpen((open) => !open)}
            >
              <span>On this page</span>
              <span
                className={`${styles.chevron} ${tocOpen ? styles.chevronOpen : ''}`}
                aria-hidden
              >
                ▾
              </span>
            </button>
            {tocOpen ? (
              <nav className={styles.tocPanel} aria-label="Page sections">
                <TocList items={toc} activeId={activeId} onNavigate={jumpTo} />
              </nav>
            ) : null}
          </div>
        </div>

        <article className={styles.article}>
          <p className={styles.eyebrow}>
            <Link to="/legal">Legal</Link>
          </p>

          <div className={styles.prose}>
            {preamble ? (
              <div className={styles.preamble}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {preamble}
                </ReactMarkdown>
              </div>
            ) : null}

            {sections.map((section) => (
              <LegalScrollSection key={section.id} section={section} />
            ))}
          </div>

          <nav className={styles.other} aria-label="Other legal pages">
            <p className={styles.otherLabel}>Other policies</p>
            <ul className={styles.navList}>
              {legalDocs
                .filter((item) => item.slug !== page.slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link to={`/legal/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
            </ul>
          </nav>

          <Link to="/legal" className={styles.back}>
            ← All policies
          </Link>
        </article>
      </div>

      <button
        type="button"
        className={`${styles.backToTop} ${showTop ? styles.backToTopVisible : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </button>
    </div>
  )
}

function LegalScrollSection({ section }: { section: LegalSection }) {
  const HeadingTag = section.level === 2 ? 'h2' : 'h3'
  return (
    <section
      id={section.id}
      className={`scroll-section ${styles.scrollSection}`}
      data-legal-section={section.id}
    >
      <HeadingTag
        className={section.level === 2 ? styles.section : styles.subsection}
      >
        {section.label}
      </HeadingTag>
      {section.body.trim() ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.body}
        </ReactMarkdown>
      ) : null}
    </section>
  )
}

function TocList({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[]
  activeId: string
  onNavigate: (id: string) => void
}) {
  if (!items.length) return null
  return (
    <ul className={styles.tocList}>
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <li key={item.id}>
            <button
              type="button"
              data-section={item.id}
              className={[
                styles.tocLink,
                item.level === 3 ? styles.tocChild : '',
                isActive ? styles.tocActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
