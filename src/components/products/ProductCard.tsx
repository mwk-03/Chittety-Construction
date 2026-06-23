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
      className="group flex h-full min-h-[22rem] cursor-pointer flex-col overflow-hidden rounded-lg border border-[#E5E7EB] bg-white transition-all hover:border-[#D1D5DB] hover:shadow-md"
    >
      {/* Mobile card layout */}
      <div className="flex flex-1 flex-col p-4 sm:hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-[#111827]" title={product.name}>{product.name}</h3>
            <p className="mt-0.5 text-[11px] text-[#9CA3AF] font-mono">{product.sku}</p>
          </div>
          {discountPercent > 0 && (
            <Badge className="shrink-0 bg-[#C8A44D] text-white text-[10px] font-semibold px-1.5 py-0 border-0">
              {discountPercent}% OFF
            </Badge>
          )}
        </div>

        <div className="mt-3 min-h-12 flex flex-wrap content-start gap-x-3 gap-y-1 text-[11px] text-[#6B7280]">
          <span className="truncate">{product.brand}</span>
          <span className="truncate">{getCategoryShort(product.category)}</span>
          {product.specification && <span className="truncate">{product.specification}</span>}
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-amber-400'}`} />
          <span className="text-[11px] text-[#6B7280]">{isAvailable ? 'Available' : 'Confirm Stock'}</span>
        </div>

        <div className="mt-auto flex min-h-12 items-end gap-2 pt-3">
          <span className="text-base font-bold text-[#111827]">${product.chittetyPrice.toFixed(2)}</span>
          {product.marketPrice > product.chittetyPrice && (
            <span className="text-[11px] text-[#9CA3AF] line-through">${product.marketPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openQuoteDialog({ sku: product.sku, productName: product.name, category: product.category, brand: product.brand, source: 'Product Catalog', requirementType: 'Product Inquiry', priceReference: `$${product.chittetyPrice.toFixed(2)}` });
            }}
            className="h-10 w-full rounded-md bg-[#C8A44D] px-2 text-xs font-semibold text-white hover:bg-[#B8943F]"
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
            className="h-10 w-full rounded-md border-[#E5E7EB] px-2 text-xs text-[#374151] hover:bg-[#F9FAFB]"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Desktop card layout */}
      <div className="hidden flex-1 flex-col p-4 sm:flex">
        {/* Top row: SKU + Name + Badge */}
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-mono text-[#9CA3AF] tracking-wide uppercase">{product.sku}</p>
            <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-[#111827]" title={product.name}>{product.name}</h3>
          </div>
          {discountPercent > 0 && (
            <Badge className="shrink-0 bg-[#C8A44D] text-white text-[10px] font-semibold px-1.5 py-0 border-0">
              {discountPercent}% OFF
            </Badge>
          )}
        </div>

        {/* Specs row */}
        <div className="mt-3 grid min-h-[7.5rem] grid-cols-2 content-start gap-x-4 gap-y-2 text-xs">
          <div className="min-w-0">
            <span className="text-[#9CA3AF]">Category </span>
            <span className="text-[#374151] font-medium">{getCategoryShort(product.category)}</span>
          </div>
          {product.subcategory && (
            <div className="min-w-0">
              <span className="text-[#9CA3AF]">Subcat </span>
              <span className="text-[#374151] font-medium">{product.subcategory}</span>
            </div>
          )}
          <div className="min-w-0">
            <span className="text-[#9CA3AF]">Brand </span>
            <span className="text-[#374151] font-medium">{product.brand}</span>
          </div>
          {product.specification && (
            <div className="min-w-0">
              <span className="text-[#9CA3AF]">Spec </span>
              <span className="text-[#374151] font-medium truncate">{product.specification}</span>
            </div>
          )}
          <div className="min-w-0">
            <span className="text-[#9CA3AF]">Unit </span>
            <span className="text-[#374151]">{product.unit || 'Each'}</span>
          </div>
          <div className="min-w-0">
            <span className="text-[#9CA3AF]">MOQ </span>
            <span className="text-[#374151]">{product.moq || 1}</span>
          </div>
        </div>

        {/* Availability + Price row */}
        <div className="mt-auto flex min-h-14 items-end justify-between gap-3 pt-3">
          <div className="flex min-w-0 items-center gap-1.5 pb-1">
            <span className={`size-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-amber-400'}`} />
            <span className="truncate text-xs text-[#6B7280]">{isAvailable ? 'Available' : product.availability || 'Confirm Stock'}</span>
          </div>
          <div className="flex shrink-0 items-baseline gap-2">
            <span className="text-lg font-bold text-[#111827]">${product.chittetyPrice.toFixed(2)}</span>
            {product.marketPrice > product.chittetyPrice && (
              <span className="text-xs text-[#9CA3AF] line-through">${product.marketPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openQuoteDialog({ sku: product.sku, productName: product.name, category: product.category, brand: product.brand, source: 'Product Catalog', requirementType: 'Product Inquiry', priceReference: `$${product.chittetyPrice.toFixed(2)}` });
            }}
            className="h-10 w-full rounded-md bg-[#C8A44D] px-2 text-xs font-semibold text-white hover:bg-[#B8943F]"
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
            className="h-10 w-full rounded-md border-[#E5E7EB] px-2 text-xs text-[#374151] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
