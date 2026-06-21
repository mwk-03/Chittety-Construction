'use client';

import {
  Droplets,
  Zap,
  LayoutGrid,
  Shield,
  Hammer,
  Waves,
  SearchCheck,
  Wrench,
  ClipboardCheck,
} from 'lucide-react';
import { useNavigation } from '@/store/navigation';

const services = [
  { name: 'Plumbing Services', icon: Droplets, description: 'Installation, repair and maintenance for all plumbing systems' },
  { name: 'Electrical Services', icon: Zap, description: 'Wiring, panel upgrades and electrical system support' },
  { name: 'Flooring & Tiling', icon: LayoutGrid, description: 'Professional flooring and tile installation services' },
  { name: 'Roofing & Waterproofing', icon: Shield, description: 'Roof repairs, waterproofing and weather protection' },
  { name: 'Steel Fabrication', icon: Hammer, description: 'Custom steel work and structural fabrication solutions' },
  { name: 'Pump Installation', icon: Waves, description: 'Water pump setup, repair and system optimization' },
  { name: 'Water Tank Solutions', icon: Droplets, description: 'Tank installation, maintenance and water storage systems' },
  { name: 'Leak Detection', icon: SearchCheck, description: 'Advanced leak detection and diagnostic services' },
  { name: 'Building Maintenance', icon: Wrench, description: 'Ongoing maintenance and facility management support' },
  { name: 'Project Support', icon: ClipboardCheck, description: 'End-to-end coordination and project management services' },
];

export default function ServicesOverviewSection() {
  const { navigateTo } = useNavigation();

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Construction Services
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Professional service coordination for your projects
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="flex items-start gap-4 rounded-lg border border-[#E5E7EB] bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#FAFAFA]">
                  <Icon className="h-5 w-5 text-[#111827]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#111827]">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {service.description}
                  </p>
                  <button
                    onClick={() => navigateTo('services')}
                    className="mt-2 text-xs font-medium text-[#C8A44D]"
                  >
                    Learn More &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}