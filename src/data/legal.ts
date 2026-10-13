import aup from '../content/legal/acceptable-use-anti-spam.md?raw'
import marketing from '../content/legal/marketing-platform.md?raw'
import privacy from '../content/legal/privacy.md?raw'
import promotions from '../content/legal/promotions-and-prizes.md?raw'
import terms from '../content/legal/terms.md?raw'
import { extractToc } from '../lib/legalToc'

export type LegalDoc = {
  slug: string
  title: string
  markdown: string
}

export const legalDocs: LegalDoc[] = [
  {
    slug: 'terms',
    title: 'Terms of Use',
    markdown: terms,
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    markdown: privacy,
  },
  {
    slug: 'acceptable-use-anti-spam',
    title: 'Acceptable Use and Anti-Spam Policy',
    markdown: aup,
  },
  {
    slug: 'marketing-platform',
    title: 'Marketing Platform Policy',
    markdown: marketing,
  },
  {
    slug: 'promotions-and-prizes',
    title: 'Promotions and Prizes Policy',
    markdown: promotions,
  },
]

export function getLegalDoc(slug: string | undefined) {
  if (!slug) return undefined
  if (slug === 'email-compliance') {
    return legalDocs.find((doc) => doc.slug === 'acceptable-use-anti-spam')
  }
  if (slug === 'terms-of-use' || slug === 'terms-of-service') {
    return legalDocs.find((doc) => doc.slug === 'terms')
  }
  if (slug === 'privacy-policy') {
    return legalDocs.find((doc) => doc.slug === 'privacy')
  }
  return legalDocs.find((doc) => doc.slug === slug)
}

export { extractToc }
