'use client';

import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustMetricsSection from '@/components/home/TrustMetricsSection';
import BusinessModelSection from '@/components/home/BusinessModelSection';
import ProductCategoriesSection from '@/components/home/ProductCategoriesSection';
import ServicesOverviewSection from '@/components/home/ServicesOverviewSection';
import VendorNetworkSection from '@/components/home/VendorNetworkSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import IndustriesServedSection from '@/components/home/IndustriesServedSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import RequestQuoteSection from '@/components/home/RequestQuoteSection';

export function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main>
      <HeroSection />
      <TrustMetricsSection />
      <BusinessModelSection />
      <ProductCategoriesSection />
      <ServicesOverviewSection />
      <VendorNetworkSection />
      <HowItWorksSection />
      <IndustriesServedSection />
      <FeaturedProductsSection />
      <RequestQuoteSection />
    </main>
  );
}