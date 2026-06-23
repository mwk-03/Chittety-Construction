'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const CATEGORIES = [
  { code: 'PLB', name: 'Plumbing, Bathroom & Sewer', label: 'Plumbing & Bathroom' },
  { code: 'ELE', name: 'Electrical, Wiring & Panels', label: 'Electrical & Wiring' },
  { code: 'LHV', name: 'Lighting, HVAC, Pumps & Water Heaters', label: 'Lighting / HVAC / Pumps' },
  { code: 'FRB', name: 'Flooring, Roofing & Building Materials', label: 'Flooring / Roofing / Building' },
  { code: 'HST', name: 'Hardware, Steel, Tools, Safety & Kitchen', label: 'Hardware / Steel / Tools' },
];

export interface FilterParams {
  search: string;
  category: string;
  subcategory: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface ProductFiltersProps {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
  availableSubcategories: string[];
  availableBrands: string[];
  totalActive: number;
  onClearAll: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function ProductFilters({
  filters,
  onFilterChange,
  availableSubcategories,
  availableBrands,
  totalActive,
  onClearAll,
  mobileOpen = false,
  onMobileClose,
}: ProductFiltersProps) {
  const [searchBrand, setSearchBrand] = useState('');
  const [brandOpen, setBrandOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    subcategory: true,
    brand: true,
    price: true,
    sort: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = useCallback(
    (key: keyof FilterParams, value: string) => {
      onFilterChange({ ...filters, [key]: value });
    },
    [filters, onFilterChange]
  );

  const filteredBrands = useMemo(() => {
    const q = searchBrand.toLowerCase();
    return availableBrands.filter((b) => b.toLowerCase().includes(q));
  }, [availableBrands, searchBrand]);

  const filterContent = (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-[#6B7280]" />
          <span className="text-sm font-semibold text-[#111827]">Filters</span>
          {totalActive > 0 && (
            <Badge variant="secondary" className="bg-[#C8A44D] text-white text-[10px] px-1.5 py-0">
              {totalActive}
            </Badge>
          )}
        </div>
        {totalActive > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-auto p-0 text-xs text-[#6B7280] hover:text-[#111827]"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Search */}
      <div className="pt-3 pb-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#9CA3AF]" />
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="h-8 pl-8 text-sm border-[#E5E7EB] focus-visible:ring-[#C8A44D]/30 focus-visible:border-[#C8A44D]"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827]"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="py-2">
        <button
          onClick={() => toggleSection('category')}
          className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          Category
          {expandedSections.category ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
        {expandedSections.category && (
          <div className="mt-2 space-y-1.5">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.code}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-[#F9FAFB] transition-colors"
              >
                <Checkbox
                  checked={filters.category === cat.code}
                  onCheckedChange={() =>
                    updateFilter('category', filters.category === cat.code ? '' : cat.code)
                  }
                  className="data-[state=checked]:bg-[#111827] data-[state=checked]:border-[#111827]"
                />
                <span className="text-[13px] text-[#374151]">{cat.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Subcategory */}
      <div className="py-2">
        <button
          onClick={() => toggleSection('subcategory')}
          className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          Subcategory
          {expandedSections.subcategory ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
        {expandedSections.subcategory && (
          <div className="mt-2">
            <Select
              value={filters.subcategory}
              onValueChange={(val) => updateFilter('subcategory', val === '__all__' ? '' : val)}
            >
              <SelectTrigger className="w-full h-8 text-sm border-[#E5E7EB] focus-visible:ring-[#C8A44D]/30">
                <SelectValue placeholder="All Subcategories" />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                <SelectItem value="__all__">All Subcategories</SelectItem>
                {availableSubcategories.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Separator />

      {/* Brand */}
      <div className="py-2">
        <button
          onClick={() => toggleSection('brand')}
          className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          Brand
          {expandedSections.brand ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
        {expandedSections.brand && (
          <div className="mt-2">
            <Popover open={brandOpen} onOpenChange={setBrandOpen}>
              <PopoverTrigger asChild>
                <button className="flex w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm hover:border-[#C8A44D]/50 transition-colors">
                  <span className={filters.brand ? 'text-[#111827]' : 'text-[#9CA3AF]'}>
                    {filters.brand || 'Select Brand'}
                  </span>
                  <ChevronDown className="size-3.5 text-[#9CA3AF]" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <div className="p-2 border-b border-[#E5E7EB]">
                  <Input
                    placeholder="Search brands..."
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                    className="h-7 text-sm border-[#E5E7EB]"
                  />
                </div>
                <ScrollArea className="max-h-48">
                  <div className="p-1">
                    {filteredBrands.length === 0 && (
                      <p className="px-2 py-3 text-xs text-[#9CA3AF] text-center">No brands found</p>
                    )}
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          updateFilter('brand', filters.brand === brand ? '' : brand);
                          setBrandOpen(false);
                          setSearchBrand('');
                        }}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-[#F9FAFB] transition-colors ${
                          filters.brand === brand ? 'bg-[#F9FAFB] text-[#111827] font-medium' : 'text-[#374151]'
                        }`}
                      >
                        {filters.brand === brand && <Check className="size-3.5 text-[#C8A44D]" />}
                        <span className={filters.brand === brand ? 'pl-0.5' : 'pl-6'}>{brand}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
            {filters.brand && (
              <button
                onClick={() => updateFilter('brand', '')}
                className="mt-1.5 flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#111827]"
              >
                <X className="size-3" /> Clear brand
              </button>
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div className="py-2">
        <button
          onClick={() => toggleSection('price')}
          className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          Price Range
          {expandedSections.price ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
        {expandedSections.price && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                className="h-8 text-sm border-[#E5E7EB] focus-visible:ring-[#C8A44D]/30"
              />
            </div>
            <span className="text-[#9CA3AF] text-xs">—</span>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                className="h-8 text-sm border-[#E5E7EB] focus-visible:ring-[#C8A44D]/30"
              />
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Sort */}
      <div className="py-2">
        <button
          onClick={() => toggleSection('sort')}
          className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          Sort By
          {expandedSections.sort ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
        {expandedSections.sort && (
          <div className="mt-2">
            <Select
              value={filters.sort}
              onValueChange={(val) => updateFilter('sort', val)}
            >
              <SelectTrigger className="w-full h-8 text-sm border-[#E5E7EB] focus-visible:ring-[#C8A44D]/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sku">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-[8.5rem] rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(17,24,39,0.04)]">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-[#111827]" />
                <span className="font-semibold text-sm text-[#111827]">Filters</span>
              </div>
              <button
                onClick={onMobileClose}
                className="rounded-md p-1 hover:bg-[#F3F4F6] transition-colors"
              >
                <X className="size-5 text-[#6B7280]" />
              </button>
            </div>
            <ScrollArea className="h-[calc(100vh-52px)]">
              <div className="p-4">{filterContent}</div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}
