import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  blogPosts,
  displayTagForPost,
  industriesWithPosts,
  resourceTags,
  thumbnailFileForPost,
  type ResourceIndustryId,
  type ResourceTagId,
} from '../data/blog'
import { publicAssetUrl } from '../lib/assets'
import { usePageMeta } from '../lib/usePageMeta'
import styles from './ResourcesPage.module.css'

const POSTS_PER_PAGE = 10
const TAG_IDS = new Set(resourceTags.map((t) => t.id))

function parseTag(value: string | null): ResourceTagId | 'all' {
  if (value && TAG_IDS.has(value as ResourceTagId)) return value as ResourceTagId
  return 'all'
}

function parseIndustry(
  value: string | null,
  available: ResourceIndustryId[],
): ResourceIndustryId | 'all' {
  if (value && available.includes(value as ResourceIndustryId)) {
    return value as ResourceIndustryId
  }
  return 'all'
}

export function ResourcesPage() {
  usePageMeta(
    'Resources — Loyalty guides for local businesses | Loyalties',
    'Guides and how-tos for cafes, restaurants, bars, bakeries and salons running a stamp card that customers actually finish.',
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const industryOptions = useMemo(() => industriesWithPosts(), [])
  const industryIds = useMemo(
    () => industryOptions.map((i) => i.id),
    [industryOptions],
  )

  const filter = parseTag(searchParams.get('tag'))
  const industryFilter = parseIndustry(searchParams.get('industry'), industryIds)
  const showIndustryRow = filter === 'by-industry'

  // Reset to page 1 whenever filter or search changes
  useEffect(() => { setPage(1) }, [filter, industryFilter, query])

  const setFilter = (next: ResourceTagId | 'all') => {
    const params = new URLSearchParams(searchParams)
    if (next === 'all') {
      params.delete('tag')
      params.delete('industry')
    } else {
      params.set('tag', next)
      if (next !== 'by-industry') params.delete('industry')
    }
    setSearchParams(params, { replace: true })
  }

  const setIndustryFilter = (next: ResourceIndustryId | 'all') => {
    const params = new URLSearchParams(searchParams)
    params.set('tag', 'by-industry')
    if (next === 'all') params.delete('industry')
    else params.set('industry', next)
    setSearchParams(params, { replace: true })
  }

  const filtered = blogPosts.filter((post) => {
    if (filter === 'by-industry') {
      if (!post.industry) return false
      if (industryFilter !== 'all' && post.industry !== industryFilter) return false
    } else if (filter !== 'all' && post.tag !== filter) {
      return false
    }

    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      (post.industry?.includes(q) ?? false)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const clampedPage = Math.min(page, totalPages)
  const paged = filtered.slice(
    (clampedPage - 1) * POSTS_PER_PAGE,
    clampedPage * POSTS_PER_PAGE,
  )

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>Resources</p>
          <h1 className={styles.heading}>Guides, tips and how-tos for local businesses</h1>
          <p className={styles.sub}>
            Everything you need to run a loyalty program that actually works.
          </p>

          {/* Search */}
          <div className={styles.searchWrap}>
            <svg
              className={styles.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden
            >
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className={styles.search}
              type="search"
              placeholder="Search resources…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search resources"
            />
          </div>

          {/* Filter tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Resource categories">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`}
              style={{ '--tab-pastel': '#ECEAE6', '--tab-ink': '#3A3A38' } as React.CSSProperties}
              onClick={() => setFilter('all')}
            >
              <span className={styles.tabSymbol} aria-hidden>◈</span>
              All
            </button>
            {resourceTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                role="tab"
                aria-selected={filter === tag.id}
                className={`${styles.tab} ${filter === tag.id ? styles.tabActive : ''}`}
                style={{ '--tab-pastel': tag.pastel, '--tab-ink': tag.ink } as React.CSSProperties}
                onClick={() => setFilter(tag.id)}
              >
                <span className={styles.tabSymbol} aria-hidden>{tag.symbol}</span>
                {tag.label}
              </button>
            ))}
          </div>

          {/* Industry sub-tabs */}
          {showIndustryRow ? (
            <div className={styles.subTabs} role="tablist" aria-label="Industry">
              <button
                type="button"
                role="tab"
                aria-selected={industryFilter === 'all'}
                className={`${styles.subTab} ${styles.subTabIndustry} ${industryFilter === 'all' ? styles.subTabActive : ''}`}
                onClick={() => setIndustryFilter('all')}
              >
                All industries
              </button>
              {industryOptions.map((industry) => (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  aria-selected={industryFilter === industry.id}
                  className={`${styles.subTab} ${styles.subTabIndustry} ${industryFilter === industry.id ? styles.subTabActive : ''}`}
                  onClick={() => setIndustryFilter(industry.id)}
                >
                  <span className={styles.subTabSymbol} aria-hidden>{industry.symbol}</span>
                  {industry.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Post list */}
      <section className={styles.list}>
        <div className="container">
          {filtered.length === 0 ? (
            <p className={styles.empty}>
              No results for &ldquo;{query}&rdquo; — try a different search.
            </p>
          ) : (
            <>
              <ul className={styles.cards}>
                {paged.map((post) => {
                  const thumbSrc = publicAssetUrl(thumbnailFileForPost(post))
                  const displayTag = displayTagForPost(post)
                  return (
                    <li key={post.slug}>
                      <Link to={`/resources/${post.slug}`} className={styles.card}>
                        <div
                          className={styles.thumb}
                          style={{
                            backgroundImage: `url(${thumbSrc})`,
                            '--accent': post.accent,
                          } as React.CSSProperties}
                          aria-hidden
                        />
                        <div className={styles.cardBody}>
                          <span
                            className={styles.tag}
                            style={{
                              background: displayTag.pastel,
                              color: displayTag.ink,
                            } as React.CSSProperties}
                          >
                            <span className={styles.tagSymbol} aria-hidden>
                              {displayTag.symbol}
                            </span>
                            {displayTag.label}
                          </span>
                          <h2 className={styles.title}>{post.title}</h2>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Pagination */}
              {totalPages > 1 ? (
                <nav className={styles.pagination} aria-label="Page navigation">
                  <button
                    className={styles.pageBtn}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={clampedPage <= 1}
                    aria-label="Previous page"
                  >
                    ← Prev
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        className={`${styles.pageNum} ${n === clampedPage ? styles.pageNumActive : ''}`}
                        onClick={() => setPage(n)}
                        aria-label={`Page ${n}`}
                        aria-current={n === clampedPage ? 'page' : undefined}
                      >
                        {n}
                      </button>
                    ))}
                  </div>

                  <button
                    className={styles.pageBtn}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={clampedPage >= totalPages}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
