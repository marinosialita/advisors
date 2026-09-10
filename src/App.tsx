import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

/* Route-level code splitting — keeps the entry bundle lean;
   each page chunk loads on demand. Home stays eager for LCP. */
const WhoWeAre = lazy(() => import('./pages/WhoWeAre'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'))
const ForCorporates = lazy(() => import('./pages/ForCorporates'))
const ForPrivateClients = lazy(() => import('./pages/ForPrivateClients'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Careers = lazy(() => import('./pages/Careers'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const InsightArticle = lazy(() => import('./pages/InsightArticle'))
const RuHome = lazy(() => import('./pages/ru/RuHome'))
const RuContact = lazy(() => import('./pages/ru/RuContact'))

/**
 * Routing contract (react-dev.md): Layout renders <Outlet/>, so all pages
 * are NESTED routes inside the layout route — never wrap <Routes> in
 * <Layout>. Mixing the patterns renders a blank page that still builds.
 */
export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="what-we-do" element={<WhatWeDo />} />
          <Route path="for-corporates" element={<ForCorporates />} />
          <Route path="for-corporates/:slug" element={<ServiceDetail group="corporate" />} />
          <Route path="for-private-clients" element={<ForPrivateClients />} />
          <Route path="for-private-clients/:slug" element={<ServiceDetail group="private" />} />
          <Route path="insights/:slug" element={<InsightArticle />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          {/* Russian locale */}
          <Route path="ru" element={<RuHome />} />
          <Route path="ru/who-we-are" element={<WhoWeAre locale="ru" />} />
          <Route path="ru/what-we-do" element={<WhatWeDo locale="ru" />} />
          <Route path="ru/for-corporates" element={<ForCorporates locale="ru" />} />
          <Route path="ru/for-corporates/:slug" element={<ServiceDetail group="corporate" locale="ru" />} />
          <Route path="ru/for-private-clients" element={<ForPrivateClients locale="ru" />} />
          <Route path="ru/for-private-clients/:slug" element={<ServiceDetail group="private" locale="ru" />} />
          <Route path="ru/careers" element={<Careers locale="ru" />} />
          <Route path="ru/privacy-policy" element={<PrivacyPolicy locale="ru" />} />
          <Route path="ru/insights/:slug" element={<InsightArticle locale="ru" />} />
          <Route path="ru/contact" element={<RuContact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
