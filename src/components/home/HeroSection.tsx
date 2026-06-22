'use client';

import { useNavigation } from '@/store/navigation';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { navigateTo, openQuoteDialog } = useNavigation();

  return (
    <section className="w-full bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Construction Materials, Procurement &amp; Vendor Solutions
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            Trusted sourcing, construction materials, vendor partnerships and
            project support for residential, commercial, industrial and
            infrastructure projects across Dallas–Fort Worth and beyond.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => navigateTo('products')}
              className="h-12 rounded-md bg-[#C8A44D] px-8 text-base font-medium text-white hover:bg-[#B8943F] focus-visible:ring-[#C8A44D]/50"
            >
              Browse Products
            </Button>
            <Button
              onClick={() => openQuoteDialog()}
              variant="outline"
              className="h-12 rounded-md border-white px-8 text-base font-medium text-white hover:bg-white/10 hover:text-white"
            >
              Request Quote
            </Button>
          </div>
          <p className="mt-12 text-sm text-gray-400">
            10+ Years Industry Experience &bull; Vendor Network Across USA &bull;{' '}
            B2B &amp; B2C Supply
          </p>
        </div>
      </div>
    </section>
  );
}