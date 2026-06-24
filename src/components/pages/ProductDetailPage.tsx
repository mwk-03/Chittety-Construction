'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/store/navigation';
import { ProductDetail } from '@/components/products/ProductDetail';

export function ProductDetailPage() {
  const { selectedProductSku, backToProducts, navigateTo } = useNavigation();
  const [productCategory, setProductCategory] = useState<string>('');

  // Fetch product to get category for breadcrumb
  useEffect(() => {
    if (!selectedProductSku) return;

    fetch(`/api/products?search=${encodeURIComponent(selectedProductSku)}&limit=1`)
      .then((r) => r.json())
      .then((data) => {
        const p = data?.products?.[0] || data?.[0] || null;
        if (p?.category) {
          setProductCategory(p.category);
        }
      })
      .catch(() => {});
  }, [selectedProductSku]);

  useEffect(() => {
    if (!selectedProductSku) backToProducts();
  }, [selectedProductSku, backToProducts]);

  const handleBack = backToProducts;

  if (!selectedProductSku) {
    return null;
  }

  const getCategoryLabel = (category: string) => {
    const map: Record<string, string> = {
      'Plumbing, Bathroom & Sewer': 'Plumbing & Bathroom',
      'Electrical, Wiring & Panels': 'Electrical & Wiring',
      'Lighting, HVAC, Pumps & Water Heaters': 'Lighting / HVAC / Pumps',
      'Flooring, Roofing & Building Materials': 'Flooring / Roofing / Building',
      'Hardware, Steel, Tools, Safety & Kitchen': 'Hardware / Steel / Tools',
    };
    return map[category] || category;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-[#6B7280] overflow-x-auto">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#111827] transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <ChevronRight className="size-3 shrink-0" />
            <button
              onClick={() => navigateTo('products')}
              className="hover:text-[#111827] transition-colors whitespace-nowrap"
            >
              Products
            </button>
            {productCategory && (
              <>
                <ChevronRight className="size-3 shrink-0" />
                <span className="text-[#374151] whitespace-nowrap">
                  {getCategoryLabel(productCategory)}
                </span>
              </>
            )}
            <ChevronRight className="size-3 shrink-0" />
            <span className="text-[#374151] font-medium whitespace-nowrap truncate max-w-[200px]">
              {selectedProductSku}
            </span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="h-8 gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] -ml-2"
          >
            <ArrowLeft className="size-3.5" />
            Back to Products
          </Button>
        </div>
      </div>

      {/* Product Detail Sheet */}
      <ProductDetail
        sku={selectedProductSku}
        open={true}
        onClose={handleBack}
      />
    </div>
  );
}
