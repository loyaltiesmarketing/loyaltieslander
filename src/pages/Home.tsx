import { HeroStampGrid } from '../components/HeroStampGrid'
import { IndustryGrid } from '../components/IndustryGrid'
import { LogoCarousel } from '../components/LogoCarousel'
import { LoyaltyCardShowcase } from '../components/LoyaltyCardShowcase'
import { usePageMeta } from '../lib/usePageMeta'

export function Home() {
  usePageMeta()

  return (
    <>
      <HeroStampGrid />
      <LogoCarousel />
      <IndustryGrid />
      <LoyaltyCardShowcase section />
    </>
  )
}
