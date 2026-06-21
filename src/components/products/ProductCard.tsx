'use client';

import { Package } from 'lucide-react';
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
  images?: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { viewProduct, openQuoteDialog } = useNavigation();

  const discountPercent = product.discount ? Math.round(product.discount * 100) : 0;

  const isAvailable = product.availability && 
    !product.availability.toLowerCase().includes('out of stock') &&
    !product.availability.toLowerCase().includes('discontinued');

  return (
    <div
      onClick={() => viewProduct(product.sku)}
      className="group cursor-pointer rounded-lg border border-[#E5E7EB] bg-white transition-shadow hover:shadow-sm overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="relative aspect-square bg-[#F3F4F6] flex items-center justify-center">
        <Package className="size-10 text-[#D1D5DB] group-hover:text-[#9CA3AF] transition-colors" />
        {discountPercent > 0 && (
          <Badge className="absolute top-2.5 left-2.5 bg-[#C8A44D] text-white text-[10px] font-semibold px-1.5 py-0.5 border-0 hover:bg-[#C8A44D]">
            {discountPercent}% OFF
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        {/* Product name */}
        <h3 className="text-sm font-semibold text-[#111827] line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Category + Brand */}
        <p className="mt-1 text-xs text-[#9CA3AF] truncate">
          {product.category} · {product.brand}
        </p>

        {/* Availability */}
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={`size-1.5 rounded-full ${
              isAvailable ? 'bg-emerald-500' : 'bg-[#D1D5DB]'
            }`}
          />
          <span className="text-[11px] text-[#6B7280]">
            {isAvailable ? 'Available' : 'Confirm Stock'}
          </span>
        </div>

        {/* Prices */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#111827]">
            ${product.chittetyPrice.toFixed(2)}
          </span>
          {product.marketPrice > product.chittetyPrice && (
            <span className="text-xs text-[#9CA3AF] line-through">
              ${product.marketPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-col gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              openQuoteDialog({
                sku: product.sku,
                productName: product.name,
                category: product.category,
              });
            }}
            className="w-full h-8 bg-[#C8A44D] hover:bg-[#B8943F] text-white text-xs font-semibold rounded-md transition-colors"
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
            className="w-full h-8 border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] text-xs rounded-md transition-colors"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
