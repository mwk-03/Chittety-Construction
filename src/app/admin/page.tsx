'use client';

import { useEffect, useState } from 'react';
import { Package, FileText, ShoppingCart, TrendingUp } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalQuotes: number;
  newQuotes: number;
  totalCategories: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalQuotes: 0,
    newQuotes: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products?limit=1').then((r) => r.json()),
      fetch('/api/quote?limit=1').then((r) => r.json()),
      fetch('/api/quote?status=New&limit=1').then((r) => r.json()),
      fetch('/api/products?limit=1').then((r) => r.json()),
    ])
      .then(([prodData, quoteData, newQuoteData]) => {
        const categories = new Set((prodData?.products || []).map((p: any) => p.category));
        setStats({
          totalProducts: prodData?.total || 0,
          totalQuotes: quoteData?.total || 0,
          newQuotes: newQuoteData?.total || 0,
          totalCategories: categories.size || 5,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Total Products',
      value: loading ? '—' : stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Quote Requests',
      value: loading ? '—' : stats.totalQuotes.toLocaleString(),
      icon: FileText,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'New Inquiries',
      value: loading ? '—' : stats.newQuotes.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Product Categories',
      value: loading ? '—' : stats.totalCategories,
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-sm text-[#6B7280] mt-1">Overview of your construction supply catalog</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-[#E5E7EB] bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{card.label}</p>
                <p className="mt-1 text-2xl font-bold text-[#111827]">{card.value}</p>
              </div>
              <div className={`rounded-lg p-2.5 ${card.color}`}>
                <card.icon className="size-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <h2 className="text-base font-semibold text-[#111827] mb-2">Quick Actions</h2>
        <p className="text-sm text-[#6B7280]">
          Use the sidebar to navigate to Products, Quote Requests, Categories, or Settings. Quote requests from the website appear in the Quote Requests section.
        </p>
      </div>
    </div>
  );
}