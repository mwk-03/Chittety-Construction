'use client';

import { ChevronLeft, ChevronRight, Package, Inbox } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ProductCard, Product } from '@/components/products/ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3.5 space-y-2.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-6 w-20" />
        <div className="flex flex-col gap-2 pt-1">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}

function generatePageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('ellipsis');
  }

  pages.push(total);

  return pages;
}

export function ProductGrid({
  products,
  loading,
  total,
  page,
  totalPages,
  onPageChange,
}: ProductGridProps) {
  // Loading state
  if (loading) {
    return (
      <div>
        <div className="mb-4">
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex items-center justify-center size-16 rounded-full bg-[#F3F4F6] mb-4">
          <Inbox className="size-7 text-[#9CA3AF]" />
        </div>
        <h3 className="text-base font-semibold text-[#111827]">No products found</h3>
        <p className="mt-1 text-sm text-[#6B7280] text-center max-w-sm">
          No products found matching your criteria. Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  const pageNumbers = generatePageNumbers(page, totalPages);

  return (
    <div>
      {/* Product count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[#6B7280]">
          Showing{' '}
          <span className="font-medium text-[#111827]">
            {(page - 1) * 24 + 1}
            {Math.min(page * 24, total) > (page - 1) * 24 + 1 && `–${Math.min(page * 24, total)}`}
          </span>{' '}
          of{' '}
          <span className="font-medium text-[#111827]">{total}</span> products
        </p>
        <div className="flex items-center gap-1 text-[#6B7280]">
          <Package className="size-3.5" />
          <span className="text-xs">{total} results</span>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-[#E5E7EB] hover:bg-[#F9FAFB]"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {pageNumbers.map((p, idx) =>
            p === 'ellipsis' ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex size-8 items-center justify-center text-xs text-[#9CA3AF]"
              >
                ...
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? 'default' : 'outline'}
                size="icon"
                className={
                  p === page
                    ? 'size-8 bg-[#111827] hover:bg-[#111827] text-white'
                    : 'size-8 border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#374151]'
                }
                onClick={() => onPageChange(p)}
              >
                {p}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon"
            className="size-8 border-[#E5E7EB] hover:bg-[#F9FAFB]"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
