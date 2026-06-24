'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigation } from '@/store/navigation';
import { ProductFilters, FilterParams } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Product } from '@/components/products/ProductCard';
import { ProductDetail } from '@/components/products/ProductDetail';

const CATEGORIES = [
  { code: 'PLB', name: 'Plumbing, Bathroom & Sewer', label: 'Plumbing & Bathroom' },
  { code: 'ELE', name: 'Electrical, Wiring & Panels', label: 'Electrical & Wiring' },
  { code: 'LHV', name: 'Lighting, HVAC, Pumps & Water Heaters', label: 'Lighting / HVAC / Pumps' },
  { code: 'FRB', name: 'Flooring, Roofing & Building Materials', label: 'Flooring / Roofing / Building' },
  { code: 'HST', name: 'Hardware, Steel, Tools, Safety & Kitchen', label: 'Hardware / Steel / Tools' },
];

const EMPTY_FILTERS: FilterParams = {
  search: '',
  category: '',
  subcategory: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  sort: 'sku',
};

function normalizeCategory(category: string | null) {
  if (!category) return '';
  return CATEGORIES.find((item) => item.code === category || item.name === category)?.code || '';
}

export function ProductsPage() {
  const { selectedCategory, selectedProductSku, closeProductDetail, productFilterResetKey } = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterParams>(EMPTY_FILTERS);

  // Apply selectedCategory from store when it changes
  useEffect(() => {
    const category = normalizeCategory(selectedCategory);
    if (category) {
      setFilters((prev) => ({
        ...prev,
        category,
        subcategory: '',
        brand: '',
      }));
      setPage(1);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }, [productFilterResetKey]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.category) params.set('codePrefix', filters.category);
      if (filters.subcategory) params.set('subcategory', filters.subcategory);
      if (filters.brand) params.set('brand', filters.brand);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      params.set('sort', filters.sort);
      params.set('page', String(page));
      params.set('limit', '24');

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);

      if (data.filters) {
        setAvailableSubcategories(data.filters.subcategories || []);
        setAvailableBrands(data.filters.brands || []);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = useCallback(
    (newFilters: FilterParams) => {
      setFilters(newFilters);
      setPage(1);
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryQuickFilter = useCallback(
    (code: string) => {
      setFilters((prev) => ({
        ...prev,
        category: prev.category === code ? '' : code,
      }));
      setPage(1);
    },
    []
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.subcategory) count++;
    if (filters.brand) count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    return count;
  }, [filters]);

  const getCategoryLabel = (code: string) => {
    return CATEGORIES.find((c) => c.code === code)?.label || code;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Page Header */}
      <section className="relative z-10 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">
            Product Catalog
          </h1>
          <p className="mt-2 text-sm md:text-base text-[#6B7280] max-w-2xl">
            Browse our comprehensive range of construction materials and supplies
          </p>
        </div>
      </section>

      {/* Category Quick Filter Pills */}
      <section className="sticky top-16 z-40 border-b border-[#E5E7EB] bg-white/95 shadow-[0_3px_8px_rgba(17,24,39,0.04)] backdrop-blur-lg supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => handleCategoryQuickFilter('')}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border ${
                !filters.category
                  ? 'bg-[#111827] text-white border-[#111827]'
                  : 'bg-white text-[#374151] border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.code}
                onClick={() => handleCategoryQuickFilter(cat.code)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border ${
                  filters.category === cat.code
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-white text-[#374151] border-[#E5E7EB] hover:border-[#D1D5DB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Filters + Grid */}
      <section className="relative z-0 mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 md:py-8 md:pb-10">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(true)}
            className="border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] gap-2"
          >
            <SlidersHorizontal className="size-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="bg-[#C8A44D] text-white text-[10px] px-1.5 py-0 border-0 ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-[#6B7280] hover:text-[#111827]"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex items-start gap-6">
          {/* Desktop Filters */}
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            availableSubcategories={availableSubcategories}
            availableBrands={availableBrands}
            totalActive={activeFilterCount}
            onClearAll={handleClearAll}
            mobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={products}
              loading={loading}
              total={total}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>

      {/* Product Detail Sheet */}
      {selectedProductSku && (
        <ProductDetail
          sku={selectedProductSku}
          open={true}
          onClose={closeProductDetail}
        />
      )}
    </div>
  );
}
