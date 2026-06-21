'use client';

import { Package } from 'lucide-react';
import { useNavigation } from '@/store/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

interface Product {
  sku: string;
  name: string;
  category: string;
  brand: string;
  productType?: string;
  marketPrice: number;
  chittetyPrice: number;
}

function toSlug(productType: string): string {
  return productType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function ProductImage({ productType }: { productType: string }) {
  const [loaded, setLoaded] = useState(false);
  const slug = toSlug(productType);
  const src = `/images/products/${slug}/angle-1.png`;

  useEffect(() => {
    if (!productType) return;
    const el = new Image();
    el.onload = () => setLoaded(true);
    el.onerror = () => setLoaded(false);
    el.src = src;
  }, [src, productType]);

  if (loaded) return <img src={src} alt="" className="w-full h-full object-cover" />;
  return <Package className="h-10 w-10 text-[#D1D5DB]" />;
}

const fallbackProducts: Product[] = [
  { sku: 'PLB-001', name: 'PVC Pipe 1/2" Schedule 40', category: 'Plumbing', brand: 'Charlotte Pipe', marketPrice: 4.99, chittetyPrice: 4.49 },
  { sku: 'ELC-001', name: '12/2 NM-B Wire 250ft', category: 'Electrical', brand: 'Southwire', marketPrice: 89.99, chittetyPrice: 80.99 },
  { sku: 'FLR-001', name: 'Ceramic Floor Tile 12x12"', category: 'Flooring', brand: 'Daltile', marketPrice: 2.49, chittetyPrice: 2.24 },
  { sku: 'STL-001', name: 'Steel Rebar #4 20ft', category: 'Steel', brand: 'Nucor', marketPrice: 12.99, chittetyPrice: 11.69 },
  { sku: 'BLD-001', name: 'Portland Cement 94lb Bag', category: 'Building Materials', brand: 'Quikrete', marketPrice: 14.99, chittetyPrice: 13.49 },
  { sku: 'HWD-001', name: 'Adjustable Wrench 12"', category: 'Hardware', brand: 'Crescent', marketPrice: 24.99, chittetyPrice: 22.49 },
  { sku: 'RFG-001', name: 'Roofing Shingle Bundle', category: 'Roofing', brand: 'GAF', marketPrice: 34.99, chittetyPrice: 31.49 },
  { sku: 'PMP-001', name: 'Sump Pump 1/2 HP', category: 'Pumps', brand: 'Zoeller', marketPrice: 159.99, chittetyPrice: 143.99 },
];

export default function FeaturedProductsSection() {
  const { viewProduct, navigateTo, openQuoteDialog } = useNavigation();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    fetch('/api/products?limit=8')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 8));
        }
      })
      .catch(() => {
        // use fallback
      });
  }, []);

  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Featured Products
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Quality construction materials at competitive prices
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.sku}
              onClick={() => viewProduct(product.sku)}
              className="cursor-pointer rounded-lg border border-[#E5E7EB] bg-white p-5 transition-shadow hover:shadow-sm"
            >
              <div className="mb-4 flex h-36 items-center justify-center rounded-md bg-[#FAFAFA] overflow-hidden">
                <ProductImage productType={product.productType || ''} />
              </div>
              <Badge className="mb-2 bg-[#C8A44D] text-white hover:bg-[#B8943F]">
                10% OFF
              </Badge>
              <h3 className="text-sm font-semibold text-[#111827] line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-[#6B7280]">
                {product.category} &middot; {product.brand}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-base font-bold text-[#111827]">
                  ${product.chittetyPrice.toFixed(2)}
                </span>
                <span className="text-xs text-[#9CA3AF] line-through">
                  ${product.marketPrice.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  openQuoteDialog({ sku: product.sku, productName: product.name, category: product.category });
                }}
                variant="outline"
                size="sm"
                className="mt-3 w-full border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white"
              >
                Request Quote
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            onClick={() => navigateTo('products')}
            variant="outline"
            className="border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}