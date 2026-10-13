/** Public Supabase storage helpers for marketing assets. */

const DEFAULT_SUPABASE_URL = 'https://lxctjzsspyvtycdhsorb.supabase.co'
const ASSETS_BUCKET = 'assets'

export function getSupabaseUrl() {
  return (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, '')
    || DEFAULT_SUPABASE_URL
}

/** Public object URL in the `assets` bucket. */
export function publicAssetUrl(path: string) {
  const encoded = path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  return `${getSupabaseUrl()}/storage/v1/object/public/${ASSETS_BUCKET}/${encoded}`
}

/** Industry photos: `{key} 1.webp` (hero) and `{key} 2.webp` (feature card). */
export function industryAssetUrl(assetKey: string, variant: 1 | 2) {
  return publicAssetUrl(`${assetKey} ${variant}.webp`)
}
