import { useEffect } from 'react'

export const SITE_TITLE = 'Loyalties — Digital stamp cards for local businesses'
export const SITE_DESCRIPTION =
  'Loyalties puts a branded stamp card in Apple Wallet and Google Wallet. Customers tap to join and tap to earn — no app to download.'

export function usePageMeta(title?: string, description?: string) {
  const pageTitle = title?.trim() || SITE_TITLE
  const pageDescription = description?.trim() || SITE_DESCRIPTION

  useEffect(() => {
    document.title = pageTitle
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', pageDescription)
    return () => {
      document.title = SITE_TITLE
      meta.setAttribute('content', SITE_DESCRIPTION)
    }
  }, [pageTitle, pageDescription])
}
