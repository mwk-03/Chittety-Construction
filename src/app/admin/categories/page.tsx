'use client';

import { useEffect, useState } from 'react';
import { FolderTree } from 'lucide-react';

interface CategoryInfo {
  name: string;
  count: number;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?limit=1')
      .then((r) => r.json())
      .then((data) => {
        const cats: Record<string, number> = {};
        // We need all products to count - fetch a large set
        return fetch('/api/products?limit=1500')
          .then((r) => r.json())
          .then((allData) => {
            (allData.products || []).forEach((p: any) => {
              cats[p.category] = (cats[p.category] || 0) + 1;
            });
            setCategories(
              Object.entries(cats)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
            );
          });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getCategoryShort = (category: string) => {
    const map: Record<string, string> = {
      'Plumbing, Bathroom & Sewer': 'Plumbing & Bathroom',
      'Electrical, Wiring & Panels': 'Electrical & Wiring',
      'Lighting, HVAC, Pumps & Water Heaters': 'Lighting / HVAC / Pumps',
      'Flooring, Roofing & Building Materials': 'Flooring / Roofing / Building',
      'Hardware, Steel, Tools, Safety & Kitchen': 'Hardware / Steel / Tools',
    };
    return map[category] || category;
  };

  const totalProducts = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Categories</h1>
        <p className="text-sm text-[#6B7280] mt-1">{categories.length} categories, {totalProducts.toLocaleString()} total products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-[#E5E7EB] bg-white p-5 animate-pulse">
              <div className="h-4 w-32 bg-[#F3F4F6] rounded mb-3" />
              <div className="h-6 w-12 bg-[#F3F4F6] rounded" />
            </div>
          ))
        ) : (
          categories.map((cat) => (
            <div key={cat.name} className="rounded-lg border border-[#E5E7EB] bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#F3F4F6] p-2">
                  <FolderTree className="size-4 text-[#6B7280]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">{getCategoryShort(cat.name)}</h3>
                  <p className="text-xs text-[#9CA3AF]">{cat.count} products</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}