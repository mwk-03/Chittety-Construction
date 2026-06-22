'use client';

import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Wrench, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SERVICE_CATEGORIES from '@/lib/data/service-categories.json';

interface Service {
  code: string;
  category: string;
  name: string;
  startingPrice: number;
  priceType: string;
  notes: string;
  cta: string;
  source: string;
}

export function ServicesPage() {
  const { viewService, openQuoteDialog, selectedServiceCategory } = useNavigation();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedServiceCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.set('category', activeCategory);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      params.set('page', page.toString());
      params.set('limit', limit.toString());

      const res = await fetch(`/api/services?${params.toString()}`);
      const data = await res.json();
      setServices(data.services || []);
      setCategories(data.filters?.categories || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery, page]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (selectedServiceCategory) {
      setActiveCategory(selectedServiceCategory);
      setPage(1);
    }
  }, [selectedServiceCategory]);

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('ellipsis');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Construction Services
          </h1>
          <p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl">
            Professional service coordination for plumbing, electrical, flooring, roofing and more
          </p>

          {/* Search */}
          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeCategory
                  ? 'bg-foreground text-white'
                  : 'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              All Services
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-foreground text-white'
                    : 'bg-muted text-text-secondary hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Info */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <p className="text-sm text-text-muted">
          {loading ? (
            'Loading services...'
          ) : (
            <>Showing {services.length} of {total} services{activeCategory ? ` in ${activeCategory}` : ''}</>
          )}
        </p>
      </section>

      {/* Service Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="py-0 overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-9 w-40 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <Wrench className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No services found</h3>
            <p className="text-text-secondary text-sm">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { handleCategoryClick(null); setSearchQuery(''); }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card
                key={service.code}
                className="py-0 overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
                onClick={() => viewService(service.code)}
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-base group-hover:text-accent transition-colors">
                        {service.name}
                      </h3>
                      <div className="mt-2">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent/15"
                        >
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted shrink-0 mt-1 group-hover:text-accent transition-colors" />
                  </div>

                  {service.startingPrice > 0 && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-text-muted uppercase tracking-wide">Starting From</span>
                      <span className="text-lg font-bold text-foreground">
                        ${service.startingPrice.toLocaleString()}
                      </span>
                      {service.priceType && (
                        <span className="text-xs text-text-muted">/ {service.priceType}</span>
                      )}
                    </div>
                  )}

                  {service.notes && (
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                      {service.notes}
                    </p>
                  )}

                  <div className="mt-1">
                    <Button
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuoteDialog({
                          sku: service.code,
                          productName: service.name,
                          category: service.category,
                        });
                      }}
                    >
                      Request Service Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {getPageNumbers().map((p, i) =>
                p === 'ellipsis' ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p as number)}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      )}
    </main>
  );
}