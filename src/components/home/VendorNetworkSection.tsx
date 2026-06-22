'use client';

import {
  Users,
  ArrowLeftRight,
  Package,
  MapPin,
  FolderKanban,
  BadgeCheck,
} from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Users,
    title: 'Multi-Vendor Sourcing',
    description: 'Access competitive pricing from multiple verified suppliers',
  },
  {
    icon: ArrowLeftRight,
    title: 'Product Alternatives',
    description: 'Compare brands, specifications and pricing options',
  },
  {
    icon: Package,
    title: 'Bulk Sourcing',
    description: 'Volume discounts and coordinated delivery for large orders',
  },
  {
    icon: MapPin,
    title: 'Nationwide Network',
    description: 'Vendor relationships spanning across the United States',
  },
  {
    icon: FolderKanban,
    title: 'Project-Based Supply',
    description: 'End-to-end material coordination for construction projects',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Assurance',
    description: 'Verified vendors and product authenticity guaranteed',
  },
];

export default function VendorNetworkSection() {
  const { navigateTo } = useNavigation();

  return (
    <section className="w-full bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Vendor Network
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            Chittety Construction works with a strong vendor ecosystem across the
            USA to help clients source materials, compare alternatives, coordinate
            supply and support project requirements.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-lg border border-white/10 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                  <Icon className="h-5 w-5 text-[#C8A44D]" />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-12">
          <Button
            onClick={() => navigateTo('vendor-network')}
            className="bg-[#C8A44D] text-white hover:bg-[#B8943F] focus-visible:ring-[#C8A44D]/50"
          >
            Explore Vendor Network
          </Button>
        </div>
      </div>
    </section>
  );
}