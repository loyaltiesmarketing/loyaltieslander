/** Legal TOC: section splitting + IntersectionObserver scroll spy */

export type TocItem = {
  id: string
  label: string
  index: number
  level: 2 | 3
}

export type LegalSection = {
  id: string
  label: string
  level: 2 | 3
  /** Markdown body that follows this heading (until the next h2/h3) */
  body: string
}

export type LegalDocParts = {
  preamble: string
  sections: LegalSection[]
}

/**
 * Split markdown into scrollable sections at each ## / ### heading.
 * Each section gets a stable id used by both the body and the TOC buttons.
 */
export function splitLegalDocument(markdown: string): LegalDocParts {
  const lines = markdown.split('\n')
  const sections: LegalSection[] = []
  let current: LegalSection | null = null
  const preambleLines: string[] = []

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line)
    if (match) {
      if (current) sections.push(current)
      const level = (match[1].length === 2 ? 2 : 3) as 2 | 3
      const label = match[2].trim()
      current = {
        id: `legal-section-${sections.length}`,
        label,
        level,
        body: '',
      }
      continue
    }

    if (!current) {
      preambleLines.push(line)
      continue
    }

    current.body += (current.body ? '\n' : '') + line
  }

  if (current) sections.push(current)

  return {
    preamble: preambleLines.join('\n').trim(),
    sections,
  }
}

export function splitLegalSections(markdown: string): LegalSection[] {
  return splitLegalDocument(markdown).sections
}

export function getLegalPreamble(markdown: string) {
  return splitLegalDocument(markdown).preamble
}

export function extractToc(markdown: string): TocItem[] {
  return splitLegalSections(markdown).map((section, index) => ({
    id: section.id,
    label: section.label,
    level: section.level,
    index,
  }))
}

export const LEGAL_HEADER_OFFSET = 96

export function scrollToLegalSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  const top =
    window.scrollY + el.getBoundingClientRect().top - LEGAL_HEADER_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  return true
}

/**
 * Tutorial pattern:
 * - observe each [data-legal-section] (scroll-section)
 * - rootMargin 0 0 -70% 0 so only the top ~30% of the viewport counts
 * - highlight TOC buttons whose data-section matches the section id
 */
export function watchLegalToc(onActive: (id: string) => void): () => void {
  let rafWait = 0
  let observer: IntersectionObserver | null = null
  const intersecting = new Map<string, HTMLElement>()

  const publish = () => {
    if (!intersecting.size) return

    // Among sections in the top zone, pick the lowest one (most recently entered).
    // Min-top keeps an earlier tall section "active" forever — that was the bug.
    let bestId = ''
    let bestTop = Number.NEGATIVE_INFINITY
    for (const [id, el] of intersecting) {
      const top = el.getBoundingClientRect().top
      if (top >= bestTop) {
        bestTop = top
        bestId = id
      }
    }

    if (!bestId) return
    onActive(bestId)
  }

  const attach = () => {
    const sections = document.querySelectorAll<HTMLElement>('[data-legal-section]')
    if (!sections.length) {
      rafWait = window.requestAnimationFrame(attach)
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (!id) continue
          if (entry.isIntersecting) {
            intersecting.set(id, entry.target as HTMLElement)
          } else {
            intersecting.delete(id)
          }
        }
        publish()
      },
      {
        root: null,
        // Only trigger when the section hits the top ~30% of the viewport
        rootMargin: '0px 0px -70% 0px',
        threshold: 0,
      },
    )

    sections.forEach((section) => observer?.observe(section))
  }

  attach()

  return () => {
    window.cancelAnimationFrame(rafWait)
    observer?.disconnect()
    intersecting.clear()
  }
}
