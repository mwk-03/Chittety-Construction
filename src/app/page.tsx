'use client';

import { useNavigation } from '@/store/navigation';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { QuoteDialog } from '@/components/layout/QuoteDialog';

import { HomePage } from '@/components/pages/HomePage';
import { ProductsPage } from '@/components/pages/ProductsPage';
import { ServicesPage } from '@/components/pages/ServicesPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { IndustriesPage } from '@/components/pages/IndustriesPage';
import { VendorNetworkPage } from '@/components/pages/VendorNetworkPage';
import { WholesalePage } from '@/components/pages/WholesalePage';
import { ResourcesPage } from '@/components/pages/ResourcesPage';
import { FAQPage } from '@/components/pages/FAQPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { PolicyPage } from '@/components/pages/PolicyPage';
import { ProductDetailPage } from '@/components/pages/ProductDetailPage';
import { ServiceDetailPage } from '@/components/pages/ServiceDetailPage';
import { useEffect } from 'react';

export default function MainApp() {
  const { currentPage } = useNavigation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'industries' && <IndustriesPage />}
        {currentPage === 'vendor-network' && <VendorNetworkPage />}
        {currentPage === 'wholesale' && <WholesalePage />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'policy' && <PolicyPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'service-detail' && <ServiceDetailPage />}
      </main>
      <Footer />
      <MobileStickyBar />
      <QuoteDialog />
    </div>
  );
}