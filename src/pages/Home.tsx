import { HeroStampGrid } from '../components/HeroStampGrid'
import { IndustryGrid } from '../components/IndustryGrid'
import { LogoCarousel } from '../components/LogoCarousel'
import { LoyaltyCardShowcase } from '../components/LoyaltyCardShowcase'

export function Home() {
  return (
    <>
      <HeroStampGrid />
      <LogoCarousel />
      <IndustryGrid />
      <LoyaltyCardShowcase section />
    </>
  )
}
