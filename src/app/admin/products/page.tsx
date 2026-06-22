'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Product {
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  specification: string;
  unit: string;
  moq: number;
  marketPrice: number;
  chittetyPrice: number;
  availability: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      params.set('page', String(page));
      params.set('limit', '25');

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const getCategoryShort = (category: string) => {
    const map: Record<string, string> = {
      'Plumbing, Bathroom & Sewer': 'Plumbing',
      'Electrical, Wiring & Panels': 'Electrical',
      'Lighting, HVAC, Pumps & Water Heaters': 'Lighting/HVAC',
      'Flooring, Roofing & Building Materials': 'Flooring/Building',
      'Hardware, Steel, Tools, Safety & Kitchen': 'Hardware/Steel',
    };
    return map[category] || category;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Products</h1>
          <p className="text-sm text-[#6B7280] mt-1">{total.toLocaleString()} products in catalog</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#9CA3AF]" />
            <Input
              placeholder="Search by name, SKU, brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-64 h-9 text-sm"
            />
          </div>
          <Button type="submit" size="sm" className="h-9 bg-[#111827] hover:bg-[#111827]/90">
            Search
          </Button>
          {search && (
            <Button type="button" variant="ghost" size="sm" onClick={() => { setSearch(''); setPage(1); }}>
              <X className="size-3.5" />
            </Button>
          )}
        </form>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">SKU</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Product Name</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden lg:table-cell">Category</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden xl:table-cell">Brand</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden xl:table-cell">Spec</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Chittety Price</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3"><div className="h-3 w-16 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3"><div className="h-3 w-40 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><div className="h-3 w-20 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3 hidden xl:table-cell"><div className="h-3 w-16 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3 hidden xl:table-cell"><div className="h-3 w-20 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3 text-right"><div className="h-3 w-14 bg-[#F3F4F6] rounded ml-auto" /></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="h-3 w-16 bg-[#F3F4F6] rounded mx-auto" /></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-[#6B7280]">No products found</td>
                </tr>
              ) : (
                products.map((p) => {
                  const isAvailable = p.availability && !p.availability.toLowerCase().includes('out of stock') && !p.availability.toLowerCase().includes('discontinued');
                  return (
                    <tr key={p.sku} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-[#6B7280]">{p.sku}</td>
                      <td className="px-4 py-3 font-medium text-[#111827] max-w-[200px] truncate">{p.name}</td>
                      <td className="px-4 py-3 text-[#6B7280] hidden lg:table-cell">{getCategoryShort(p.category)}</td>
                      <td className="px-4 py-3 text-[#6B7280] hidden xl:table-cell">{p.brand}</td>
                      <td className="px-4 py-3 text-[#6B7280] hidden xl:table-cell max-w-[150px] truncate">{p.specification}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[#111827]">${p.chittetyPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            isAvailable
                              ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                              : 'border-amber-200 text-amber-700 bg-amber-50'
                          }`}
                        >
                          {isAvailable ? 'Available' : 'Confirm'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB]">
            <p className="text-xs text-[#6B7280]">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}