'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Package,
  Phone,
  MessageCircle,
  ChevronRight,
  AlertTriangle,
  Tag,
  Info,
  Ruler,
  Layers,
  BoxesIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigation } from '@/store/navigation';
import { Product, ProductCard } from '@/components/products/ProductCard';

interface ProductDetailProps {
  sku: string;
  open: boolean;
  onClose: () => void;
}

export function ProductDetail({ sku, open, onClose }: ProductDetailProps) {
  const { openQuoteDialog } = useNavigation();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const fetchedSkuRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !sku || fetchedSkuRef.current === sku) return;
    fetchedSkuRef.current = sku;

    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setSelectedThumb(0);
      setProduct(null);
      setRelatedProducts([]);

      fetch(`/api/products?search=${encodeURIComponent(sku)}&limit=1`)
        .then((r) => r.json())
        .then((productData) => {
          if (cancelled) return;
          const p = productData?.products?.[0] || productData?.[0] || null;
          setProduct(p);
          setSelectedThumb(0);
          setRelatedProducts([]);
          setLoading(false);

          if (p?.category) {
            fetch(`/api/products?category=${encodeURIComponent(p.category)}&limit=8`)
              .then((r) => r.json())
              .then((data) => {
                if (cancelled) return;
                const relProducts = data?.products || data || [];
                setRelatedProducts(relProducts.filter((rp: Product) => rp.sku !== sku).slice(0, 4));
              })
              .catch(() => {});
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    });

    return () => { cancelled = true; };
  }, [open, sku]);

  const discountPercent = product?.discount ? Math.round(product.discount * 100) : 0;
  const isAvailable =
    product?.availability &&
    !product.availability.toLowerCase().includes('out of stock') &&
    !product.availability.toLowerCase().includes('discontinued');

  // Generate image paths based on product type
  function toSlug(t: string): string {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }
  const slug = product?.productType ? toSlug(product.productType) : '';
  const productImages = slug ? Array.from({ length: 5 }, (_, i) => `/images/products/${slug}/angle-${i+1}.png`) : [];
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    if (!slug) { setLoadedImages([]); return; }
    const checks = productImages.map((img) => {
      return new Promise<boolean>((resolve) => {
        const el = new Image();
        el.onload = () => resolve(true);
        el.onerror = () => resolve(false);
        el.src = img;
      });
    });
    Promise.all(checks).then(setLoadedImages);
  }, [slug]);

  const thumbnails = productImages;

  const handleRequestQuote = () => {
    if (!product) return;
    openQuoteDialog({
      sku: product.sku,
      productName: product.name,
      category: product.category,
    });
  };

  const handleCallNow = () => {
    window.open('tel:+14690000000', '_self');
  };

  const handleWhatsApp = () => {
    const message = product
      ? `Hi, I'm interested in ${product.name} (${product.sku}). Please share pricing and availability.`
      : 'Hi, I would like to inquire about a product.';
    window.open(`https://wa.me/14690000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getCategoryCode = (category: string) => {
    const map: Record<string, string> = {
      'Plumbing, Bathroom & Sewer': 'PLB',
      'Electrical, Wiring & Panels': 'ELE',
      'Lighting, HVAC, Pumps & Water Heaters': 'LHV',
      'Flooring, Roofing & Building Materials': 'FRB',
      'Hardware, Steel, Tools, Safety & Kitchen': 'HST',
    };
    return map[category] || '';
  };

  const detailContent = loading ? (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-16 rounded-md" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-2 pt-4">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      </div>
    </div>
  ) : !product ? (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="flex items-center justify-center size-16 rounded-full bg-[#F3F4F6] mb-4">
        <Package className="size-7 text-[#9CA3AF]" />
      </div>
      <h3 className="text-base font-semibold text-[#111827]">Product not found</h3>
      <p className="mt-1 text-sm text-[#6B7280]">
        The product with SKU &quot;{sku}&quot; could not be found.
      </p>
      <Button
        variant="outline"
        className="mt-4 border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white"
        onClick={onClose}
      >
        Back to Products
      </Button>
    </div>
  ) : (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="p-6 pb-12">
        {/* Top section: Image + Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="aspect-square rounded-lg bg-[#F3F4F6] flex items-center justify-center border border-[#E5E7EB] overflow-hidden">
              {loadedImages[selectedThumb] ? (
                <img src={thumbnails[selectedThumb]} alt={product?.name || ''} className="w-full h-full object-cover" />
              ) : (
                <Package className="size-20 text-[#D1D5DB]" />
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedThumb(idx)}
                  className={`shrink-0 size-16 rounded-md border flex items-center justify-center transition-colors overflow-hidden ${
                    selectedThumb === idx
                      ? 'border-[#111827] ring-1 ring-[#111827]'
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                  } bg-[#F9FAFB]`}
                >
                  {loadedImages[idx] ? (
                    <img src={img} alt={`Angle ${idx+1}`} className="w-full h-full object-cover" />
                  ) : (
                    <Package className="size-5 text-[#D1D5DB]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div className="space-y-4">
            {/* Name */}
            <h1 className="text-2xl font-bold text-[#111827] leading-tight">
              {product.name}
            </h1>

            {/* SKU */}
            <div className="flex items-center gap-2">
              <Tag className="size-3.5 text-[#9CA3AF]" />
              <span className="text-sm text-[#6B7280]">SKU: {product.sku}</span>
            </div>

            {/* Category breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <span>Products</span>
              <ChevronRight className="size-3" />
              <span className="text-[#374151]">{product.category}</span>
              {product.subcategory && (
                <>
                  <ChevronRight className="size-3" />
                  <span className="text-[#374151]">{product.subcategory}</span>
                </>
              )}
            </div>

            {/* Brand */}
            <div className="flex items-center gap-2">
              <Info className="size-3.5 text-[#9CA3AF]" />
              <span className="text-sm text-[#374151]">
                Brand: <span className="font-medium">{product.brand}</span>
              </span>
            </div>

            <Separator />

            {/* Prices */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#111827]">
                  ${product.chittetyPrice.toFixed(2)}
                </span>
                {product.marketPrice > product.chittetyPrice && (
                  <span className="text-sm text-[#9CA3AF] line-through">
                    ${product.marketPrice.toFixed(2)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <Badge className="bg-[#C8A44D] text-white text-[10px] font-semibold px-1.5 py-0 border-0 hover:bg-[#C8A44D]">
                    {discountPercent}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-xs text-[#9CA3AF]">
                {product.priceBasis || 'Market reference price'}
              </p>
            </div>

            <Separator />

            {/* Availability, MOQ, Unit */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${
                    isAvailable ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                />
                <span className="text-sm text-[#374151]">
                  {isAvailable ? 'Available' : product.availability || 'Confirm Stock'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <BoxesIcon className="size-3.5" />
                  <span>MOQ: {product.moq || 1} {product.unit || 'units'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Ruler className="size-3.5" />
                  <span>Unit: {product.unit || 'Each'}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Button
                onClick={handleRequestQuote}
                className="h-10 bg-[#C8A44D] hover:bg-[#B8943F] text-white font-semibold px-5 transition-colors"
              >
                Request Quote
              </Button>
              <Button
                variant="outline"
                onClick={handleCallNow}
                className="h-10 border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white font-medium px-4 transition-colors"
              >
                <Phone className="size-4" />
                Call Now
              </Button>
              <Button
                variant="outline"
                onClick={handleWhatsApp}
                className="h-10 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium px-4 transition-colors"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Below fold */}
        <div className="mt-10 space-y-8">
          <Separator />

          {/* Description */}
          {product.shortDescription && (
            <section>
              <h2 className="text-base font-semibold text-[#111827] mb-3">Description</h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {product.shortDescription}
              </p>
            </section>
          )}

          {/* Specifications */}
          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-3">Specifications</h2>
            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: 'Product Type', value: product.productType, icon: Layers },
                    { label: 'Specification', value: product.specification, icon: Ruler },
                    { label: 'Unit', value: product.unit, icon: BoxesIcon },
                    { label: 'Minimum Order Qty', value: String(product.moq || 1), icon: BoxesIcon },
                    { label: 'Price Basis', value: product.priceBasis || 'Market reference', icon: Tag },
                  ]
                    .filter((row) => row.value)
                    .map((row, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
                      >
                        <td className="px-4 py-2.5 text-[#6B7280] font-medium w-40 border-b border-[#E5E7EB] last:border-b-0">
                          <div className="flex items-center gap-2">
                            <row.icon className="size-3.5 text-[#9CA3AF]" />
                            {row.label}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-[#111827] border-b border-[#E5E7EB] last:border-b-0">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Applications / Use Cases */}
          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-3">Applications &amp; Use Cases</h2>
            <div className="flex flex-wrap gap-2">
              {['Construction', 'Renovation', 'Maintenance', 'Commercial Projects', 'Residential Projects'].map(
                (app) => (
                  <span
                    key={app}
                    className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-xs text-[#374151]"
                  >
                    {app}
                  </span>
                )
              )}
            </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[#111827]">Related Products</h2>
                <button
                  onClick={() => {
                    const catCode = getCategoryCode(product.category);
                    onClose();
                    // Navigate back to products filtered by category
                    const nav = useNavigation.getState();
                    nav.filterByCategory(catCode);
                  }}
                  className="text-xs text-[#C8A44D] hover:text-[#B8943F] font-medium transition-colors"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.sku} product={rp} />
                ))}
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-amber-800">Important Notice</p>
                <p className="text-xs text-amber-700/80 leading-relaxed">
                  Product images are representative. Specifications may vary. Final pricing depends on
                  vendor availability, quantity, delivery location and market conditions. Contact us
                  for an accurate quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-[700px] md:max-w-[860px] p-0 overflow-hidden">
        <SheetHeader className="px-6 pt-5 pb-3">
          <SheetTitle className="text-base font-semibold text-[#111827]">
            Product Details
          </SheetTitle>
          <SheetDescription className="text-xs text-[#6B7280]">
            {loading ? 'Loading product information...' : product?.name || 'View product specifications'}
          </SheetDescription>
        </SheetHeader>
        {detailContent}
      </SheetContent>
    </Sheet>
  );
}
