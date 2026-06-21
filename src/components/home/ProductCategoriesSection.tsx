'use client';

import {
  Droplets,
  GitBranch,
  Waves,
  Zap,
  Lightbulb,
  LayoutGrid,
  Shield,
  Hammer,
  Building2,
  Wrench,
  ChefHat,
  HardHat,
} from 'lucide-react';
import { useNavigation } from '@/store/navigation';

const categories = [
  { name: 'Plumbing & Bathroom', icon: Droplets, dbCategory: 'Plumbing, Bathroom & Sewer' },
  { name: 'Sewer Line & Drainage', icon: GitBranch, dbCategory: 'Plumbing, Bathroom & Sewer' },
  { name: 'Pumps & Water Systems', icon: Waves, dbCategory: 'Lighting, HVAC, Pumps & Water Heaters' },
  { name: 'Electrical & Wiring', icon: Zap, dbCategory: 'Electrical, Wiring & Panels' },
  { name: 'Lighting, Fans & Water Heaters', icon: Lightbulb, dbCategory: 'Lighting, HVAC, Pumps & Water Heaters' },
  { name: 'Flooring & Tiles', icon: LayoutGrid, dbCategory: 'Flooring, Roofing & Building Materials' },
  { name: 'Roofing & Waterproofing', icon: Shield, dbCategory: 'Flooring, Roofing & Building Materials' },
  { name: 'Steel & Fabrication', icon: Hammer, dbCategory: 'Hardware, Steel, Tools, Safety & Kitchen' },
  { name: 'Building Materials', icon: Building2, dbCategory: 'Flooring, Roofing & Building Materials' },
  { name: 'Hardware & Tools', icon: Wrench, dbCategory: 'Hardware, Steel, Tools, Safety & Kitchen' },
  { name: 'Kitchen & Modular Systems', icon: ChefHat, dbCategory: 'Hardware, Steel, Tools, Safety & Kitchen' },
  { name: 'Site Equipment & Safety', icon: HardHat, dbCategory: 'Hardware, Steel, Tools, Safety & Kitchen' },
];

export default function ProductCategoriesSection() {
  const { filterByCategory } = useNavigation();

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Product Categories
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Comprehensive construction materials and supplies
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => filterByCategory(cat.dbCategory)}
                className="flex items-center gap-4 rounded-lg border border-[#E5E7EB] bg-white p-6 text-left transition-shadow hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#FAFAFA]">
                  <Icon className="h-5 w-5 text-[#111827]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#111827]">
                    {cat.name}
                  </p>
                  <p className="mt-1 text-xs text-[#C8A44D]">Browse &rarr;</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}