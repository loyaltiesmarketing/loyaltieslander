import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AbusePage } from './pages/AbusePage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ContactPage } from './pages/ContactPage'
import { Home } from './pages/Home'
import { IndustryPage } from './pages/IndustryPage'
import { LegalIndex } from './pages/LegalIndex'
import { LegalPage } from './pages/LegalPage'
import { PricingPage } from './pages/PricingPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { SupportTicketPage } from './pages/SupportTicketPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="industries/:slug" element={<IndustryPage />} />
          <Route path="industries/clothing-stores" element={<Navigate to="/industries/clothing" replace />} />
          <Route path="industries/other-services" element={<Navigate to="/industries/services" replace />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="support" element={<SupportTicketPage />} />
          <Route path="abuse" element={<AbusePage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resources/:slug" element={<BlogPostPage />} />
          <Route path="legal" element={<LegalIndex />} />
          <Route path="legal/:doc" element={<LegalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
