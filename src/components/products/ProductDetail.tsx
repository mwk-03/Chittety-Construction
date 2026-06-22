'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Phone,
  MessageCircle,
  ChevronRight,
  AlertTriangle,
  Tag,
  Info,
  Ruler,
  Layers,
  BoxesIcon,
  FileText,
  Send,
  ShoppingCart,
  Truck,
  ClipboardList,
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
  const fetchedSkuRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback((targetSku: string) => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setProduct(null);
      setRelatedProducts([]);

      fetch(`/api/products?search=${encodeURIComponent(targetSku)}&limit=1`)
        .then((r) => r.json())
        .then((productData) => {
          if (cancelled) return;
          const p = productData?.products?.[0] || productData?.[0] || null;
          setProduct(p);
          setLoading(false);

          if (p?.category) {
            fetch(`/api/products?category=${encodeURIComponent(p.category)}&limit=8`)
              .then((r) => r.json())
              .then((data) => {
                if (cancelled) return;
                const relProducts = data?.products || data || [];
                setRelatedProducts(relProducts.filter((rp: Product) => rp.sku !== targetSku).slice(0, 4));
              })
              .catch(() => {});
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!open || !sku) return;
    if (fetchedSkuRef.current === sku) return;
    fetchedSkuRef.current = sku;
    const cleanup = fetchData(sku);
    return cleanup;
  }, [open, sku, fetchData]);

  // Reset ref when sheet closes so re-opening same SKU works
  useEffect(() => {
    if (!open) {
      fetchedSkuRef.current = null;
    }
  }, [open]);

  const discountPercent = product?.discount ? Math.round(product.discount * 100) : 0;
  const isAvailable =
    product?.availability &&
    !product.availability.toLowerCase().includes('out of stock') &&
    !product.availability.toLowerCase().includes('discontinued');

  const handleRequestQuote = () => {
    if (!product) return;
    openQuoteDialog({
      sku: product.sku,
      productName: product.name,
      category: product.category,
      brand: product.brand,
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
    <div className="space-y-5 p-6">
      <div className="space-y-3">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  ) : !product ? (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="flex items-center justify-center size-16 rounded-full bg-[#F3F4F6] mb-4">
        <Layers className="size-7 text-[#9CA3AF]" />
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
        {/* Header Section */}
        <div className="space-y-4">
          {/* Product Name */}
          <h1 className="text-xl font-bold text-[#111827] leading-tight">
            {product.name}
          </h1>

          {/* SKU */}
          <div className="flex items-center gap-2">
            <Tag className="size-3.5 text-[#9CA3AF]" />
            <span className="text-sm font-mono text-[#6B7280]">{product.sku}</span>
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

          {/* Brand + Availability */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Info className="size-3.5 text-[#9CA3AF]" />
              <span className="text-[#374151]">
                Brand: <span className="font-medium">{product.brand}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`size-2 rounded-full ${
                  isAvailable ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              />
              <span className="text-[#374151]">
                {isAvailable ? 'Available' : product.availability || 'Confirm Stock'}
              </span>
            </div>
          </div>

          <Separator />

          {/* Pricing */}
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

          {/* Quick Actions */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Quick Actions</p>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleRequestQuote}
                className="h-9 bg-[#C8A44D] hover:bg-[#B8943F] text-white font-semibold px-4 text-sm gap-1.5"
              >
                <FileText className="size-3.5" />
                Request Quote
              </Button>
              <Button
                variant="outline"
                onClick={handleCallNow}
                className="h-9 border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white font-medium px-4 text-sm gap-1.5"
              >
                <Phone className="size-3.5" />
                Call Now
              </Button>
              <Button
                variant="outline"
                onClick={handleWhatsApp}
                className="h-9 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium px-4 text-sm gap-1.5"
              >
                <MessageCircle className="size-3.5" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={handleRequestQuote}
                className="h-9 border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] font-medium px-4 text-sm gap-1.5"
              >
                <Send className="size-3.5" />
                Send Material List
              </Button>
              <Button
                variant="outline"
                onClick={handleRequestQuote}
                className="h-9 border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] font-medium px-4 text-sm gap-1.5"
              >
                <ShoppingCart className="size-3.5" />
                Bulk Supply
              </Button>
              <Button
                variant="outline"
                onClick={handleWhatsApp}
                className="h-9 border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] font-medium px-4 text-sm gap-1.5"
              >
                <Truck className="size-3.5" />
                Delivery Info
              </Button>
            </div>
          </div>
        </div>

        {/* Below fold: Details */}
        <div className="mt-8 space-y-8">
          <Separator />

          {/* Description */}
          {product.shortDescription && (
            <section>
              <h2 className="text-base font-semibold text-[#111827] mb-2">Product Description</h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {product.shortDescription}
              </p>
            </section>
          )}

          {/* Full Specifications Table */}
          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-3">Specifications</h2>
            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: 'SKU / Product Code', value: product.sku, icon: Tag },
                    { label: 'Product Name', value: product.name, icon: Layers },
                    { label: 'Category', value: product.category, icon: ClipboardList },
                    { label: 'Subcategory', value: product.subcategory, icon: ClipboardList },
                    { label: 'Brand', value: product.brand, icon: Info },
                    { label: 'Product Type', value: product.productType, icon: Layers },
                    { label: 'Specification / Size', value: product.specification, icon: Ruler },
                    { label: 'Unit', value: product.unit || 'Each', icon: BoxesIcon },
                    { label: 'Minimum Order Qty', value: String(product.moq || 1), icon: BoxesIcon },
                    { label: 'Price Basis', value: product.priceBasis || 'Market reference', icon: Tag },
                    { label: 'Market Reference Price', value: `$${product.marketPrice.toFixed(2)}`, icon: Tag },
                    { label: 'Chittety Estimated Price', value: `$${product.chittetyPrice.toFixed(2)}`, icon: Tag },
                    { label: 'Availability', value: product.availability || 'Confirm Stock', icon: Info },
                  ]
                    .filter((row) => row.value)
                    .map((row, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
                      >
                        <td className="px-4 py-2.5 text-[#6B7280] font-medium w-44 border-b border-[#E5E7EB] last:border-b-0">
                          <div className="flex items-center gap-2">
                            <row.icon className="size-3.5 text-[#9CA3AF] shrink-0" />
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

          {/* Common Use Cases */}
          <section>
            <h2 className="text-base font-semibold text-[#111827] mb-3">Common Use Cases</h2>
            <div className="flex flex-wrap gap-2">
              {['Construction', 'Renovation', 'Maintenance', 'Commercial Projects', 'Residential Projects', 'Infrastructure'].map(
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
                    const nav = useNavigation.getState();
                    nav.filterByCategory(catCode);
                  }}
                  className="text-xs text-[#C8A44D] hover:text-[#B8943F] font-medium transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.sku} product={rp} />
                ))}
              </div>
            </section>
          )}

          {/* Photo Note */}
          <div className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4">
            <div className="flex gap-3">
              <Info className="size-4 text-[#6B7280] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#374151]">Product Photos</p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Actual product photos can be requested during inquiry where required. Contact our team for detailed images, technical datasheets, or sample requests.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-amber-800">Important Notice</p>
                <p className="text-xs text-amber-700/80 leading-relaxed">
                  Specifications may vary. Final pricing depends on vendor availability, quantity, delivery
                  location, and market conditions. Contact us for an accurate quote.
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
      <SheetContent side="right" className="w-full sm:max-w-[640px] md:max-w-[780px] p-0 overflow-hidden">
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