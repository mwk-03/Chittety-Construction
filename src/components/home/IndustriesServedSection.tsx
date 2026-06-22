'use client';

import {
  Home,
  Building2,
  Factory,
  Warehouse,
  Cog,
  GraduationCap,
  Heart,
  Hotel,
  Landmark,
  Building,
  Store,
  Settings,
} from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import { Button } from '@/components/ui/button';

const industries = [
  { name: 'Residential Construction', icon: Home },
  { name: 'Commercial Buildings', icon: Building2 },
  { name: 'Industrial Facilities', icon: Factory },
  { name: 'Warehouses', icon: Warehouse },
  { name: 'Manufacturing Plants', icon: Cog },
  { name: 'Educational Institutions', icon: GraduationCap },
  { name: 'Healthcare Facilities', icon: Heart },
  { name: 'Hospitality & Hotels', icon: Hotel },
  { name: 'Government Projects', icon: Landmark },
  { name: 'Apartment Communities', icon: Building },
  { name: 'Retail Developments', icon: Store },
  { name: 'Property Management', icon: Settings },
];

export default function IndustriesServedSection() {
  const { navigateTo } = useNavigation();

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Industries Served
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Supporting construction across diverse sectors
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="flex flex-col items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-5 text-center transition-shadow hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FAFAFA]">
                  <Icon className="h-5 w-5 text-[#111827]" />
                </div>
                <p className="text-xs font-medium text-[#111827]">
                  {industry.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-12">
          <Button
            onClick={() => navigateTo('industries')}
            variant="outline"
            className="border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white"
          >
            View All Industries
          </Button>
        </div>
      </div>
    </section>
  );
}