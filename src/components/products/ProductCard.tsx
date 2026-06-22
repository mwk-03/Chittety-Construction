'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/store/navigation';

export interface Product {
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  productType: string;
  specification: string;
  unit: string;
  moq: number;
  marketPrice: number;
  discount: number;
  chittetyPrice: number;
  availability: string;
  priceBasis: string;
  shortDescription: string;
  codePrefix: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { viewProduct, openQuoteDialog } = useNavigation();

  const discountPercent = product.discount ? Math.round(product.discount * 100) : 0;

  const isAvailable =
    product.availability &&
    !product.availability.toLowerCase().includes('out of stock') &&
    !product.availability.toLowerCase().includes('discontinued');

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
    <div
      onClick={() => viewProduct(product.sku)}
      className="group cursor-pointer rounded-lg border border-[#E5E7EB] bg-white transition-all hover:shadow-md hover:border-[#D1D5DB] overflow-hidden"
    >
      {/* Mobile card layout */}
      <div className="p-3.5 sm:hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-[#111827] leading-snug truncate">{product.name}</h3>
            <p className="mt-0.5 text-[11px] text-[#9CA3AF] font-mono">{product.sku}</p>
          </div>
          {discountPercent > 0 && (
            <Badge className="shrink-0 bg-[#C8A44D] text-white text-[10px] font-semibold px-1.5 py-0 border-0">
              {discountPercent}% OFF
            </Badge>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#6B7280]">
          <span className="truncate">{product.brand}</span>
          <span className="truncate">{getCategoryShort(product.category)}</span>
          {product.specification && <span className="truncate">{product.specification}</span>}
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-amber-400'}`} />
          <span className="text-[11px] text-[#6B7280]">{isAvailable ? 'Available' : 'Confirm Stock'}</span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-base font-bold text-[#111827]">${product.chittetyPrice.toFixed(2)}</span>
          {product.marketPrice > product.chittetyPrice && (
            <span className="text-[11px] text-[#9CA3AF] line-through">${product.marketPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openQuoteDialog({ sku: product.sku, productName: product.name, category: product.category, brand: product.brand });
            }}
            className="flex-1 h-8 bg-[#C8A44D] hover:bg-[#B8943F] text-white text-xs font-semibold rounded-md"
          >
            Request Quote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              viewProduct(product.sku);
            }}
            className="flex-1 h-8 border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] text-xs rounded-md"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Desktop card layout */}
      <div className="hidden sm:block p-4">
        {/* Top row: SKU + Name + Badge */}
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-mono text-[#9CA3AF] tracking-wide uppercase">{product.sku}</p>
            <h3 className="mt-0.5 text-sm font-semibold text-[#111827] leading-snug line-clamp-1">{product.name}</h3>
          </div>
          {discountPercent > 0 && (
            <Badge className="shrink-0 bg-[#C8A44D] text-white text-[10px] font-semibold px-1.5 py-0 border-0">
              {discountPercent}% OFF
            </Badge>
          )}
        </div>

        {/* Specs row */}
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          <div>
            <span className="text-[#9CA3AF]">Category </span>
            <span className="text-[#374151] font-medium">{getCategoryShort(product.category)}</span>
          </div>
          {product.subcategory && (
            <div>
              <span className="text-[#9CA3AF]">Subcat </span>
              <span className="text-[#374151] font-medium">{product.subcategory}</span>
            </div>
          )}
          <div>
            <span className="text-[#9CA3AF]">Brand </span>
            <span className="text-[#374151] font-medium">{product.brand}</span>
          </div>
          {product.specification && (
            <div>
              <span className="text-[#9CA3AF]">Spec </span>
              <span className="text-[#374151] font-medium truncate">{product.specification}</span>
            </div>
          )}
          <div>
            <span className="text-[#9CA3AF]">Unit </span>
            <span className="text-[#374151]">{product.unit || 'Each'}</span>
          </div>
          <div>
            <span className="text-[#9CA3AF]">MOQ </span>
            <span className="text-[#374151]">{product.moq || 1}</span>
          </div>
        </div>

        {/* Availability + Price row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-amber-400'}`} />
            <span className="text-xs text-[#6B7280]">{isAvailable ? 'Available' : product.availability || 'Confirm Stock'}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#111827]">${product.chittetyPrice.toFixed(2)}</span>
            {product.marketPrice > product.chittetyPrice && (
              <span className="text-xs text-[#9CA3AF] line-through">${product.marketPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openQuoteDialog({ sku: product.sku, productName: product.name, category: product.category, brand: product.brand });
            }}
            className="h-8 bg-[#C8A44D] hover:bg-[#B8943F] text-white text-xs font-semibold px-4 rounded-md"
          >
            Request Quote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              viewProduct(product.sku);
            }}
            className="h-8 border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] text-xs px-4 rounded-md"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}