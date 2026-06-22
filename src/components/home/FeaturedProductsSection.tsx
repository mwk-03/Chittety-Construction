'use client';

import { useNavigation } from '@/store/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

interface Product {
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  productType?: string;
  marketPrice: number;
  chittetyPrice: number;
  discount?: number;
}

const fallbackProducts: Product[] = [
  { sku: 'PLB-001', name: 'PVC Pipe 1/2" Schedule 40', category: 'Plumbing, Bathroom & Sewer', subcategory: '', brand: 'Charlotte Pipe', marketPrice: 4.99, chittetyPrice: 4.49, discount: 0.1 },
  { sku: 'ELC-001', name: '12/2 NM-B Wire 250ft', category: 'Electrical, Wiring & Panels', subcategory: '', brand: 'Southwire', marketPrice: 89.99, chittetyPrice: 80.99, discount: 0.1 },
  { sku: 'FLR-001', name: 'Ceramic Floor Tile 12x12"', category: 'Flooring, Roofing & Building Materials', subcategory: '', brand: 'Daltile', marketPrice: 2.49, chittetyPrice: 2.24, discount: 0.1 },
  { sku: 'STL-001', name: 'Steel Rebar #4 20ft', category: 'Hardware, Steel, Tools, Safety & Kitchen', subcategory: '', brand: 'Nucor', marketPrice: 12.99, chittetyPrice: 11.69, discount: 0.1 },
  { sku: 'BLD-001', name: 'Portland Cement 94lb Bag', category: 'Flooring, Roofing & Building Materials', subcategory: '', brand: 'Quikrete', marketPrice: 14.99, chittetyPrice: 13.49, discount: 0.1 },
  { sku: 'HWD-001', name: 'Adjustable Wrench 12"', category: 'Hardware, Steel, Tools, Safety & Kitchen', subcategory: '', brand: 'Crescent', marketPrice: 24.99, chittetyPrice: 22.49, discount: 0.1 },
  { sku: 'RFG-001', name: 'Roofing Shingle Bundle', category: 'Flooring, Roofing & Building Materials', subcategory: '', brand: 'GAF', marketPrice: 34.99, chittetyPrice: 31.49, discount: 0.1 },
  { sku: 'PMP-001', name: 'Sump Pump 1/2 HP', category: 'Lighting, HVAC, Pumps & Water Heaters', subcategory: '', brand: 'Zoeller', marketPrice: 159.99, chittetyPrice: 143.99, discount: 0.1 },
];

function getCategoryShort(category: string) {
  const map: Record<string, string> = {
    'Plumbing, Bathroom & Sewer': 'Plumbing',
    'Electrical, Wiring & Panels': 'Electrical',
    'Lighting, HVAC, Pumps & Water Heaters': 'Lighting/HVAC',
    'Flooring, Roofing & Building Materials': 'Flooring/Building',
    'Hardware, Steel, Tools, Safety & Kitchen': 'Hardware/Steel',
  };
  return map[category] || category;
}

export default function FeaturedProductsSection() {
  const { viewProduct, navigateTo, openQuoteDialog } = useNavigation();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    fetch('/api/products?limit=8')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.products || [];
        if (list.length > 0) setProducts(list.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight">
            Featured Products
          </h2>
          <p className="mt-1.5 text-sm text-[#6B7280] max-w-xl">
            Explore our curated selection of construction materials at competitive wholesale pricing
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const discountPercent = product.discount ? Math.round(product.discount * 100) : 10;
            return (
              <div
                key={product.sku}
                className="group cursor-pointer rounded-lg border border-[#E5E7EB] bg-white p-4 transition-all hover:shadow-md hover:border-[#D1D5DB]"
              >
                {/* Name + Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#111827] leading-snug line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <Badge className="shrink-0 bg-[#C8A44D] text-white text-[10px] font-semibold px-1.5 py-0 border-0">
                    {discountPercent}% OFF
                  </Badge>
                </div>

                {/* Meta */}
                <div className="mt-2 space-y-1 text-[11px] text-[#6B7280]">
                  <p className="font-mono">{product.sku}</p>
                  <p>{getCategoryShort(product.category)} &middot; {product.brand}</p>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-2">
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
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuoteDialog({ sku: product.sku, productName: product.name, category: product.category, brand: product.brand });
                    }}
                    className="flex-1 h-7 bg-[#C8A44D] hover:bg-[#B8943F] text-white text-[11px] font-semibold rounded-md"
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
                    className="flex-1 h-7 border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] text-[11px] rounded-md"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigateTo('products')}
            variant="outline"
            className="border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white font-medium px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}