import { create } from 'zustand';

export type PageSection =
  | 'home' | 'products' | 'product-detail' | 'services' | 'service-detail'
  | 'about' | 'industries' | 'vendor-network' | 'wholesale' | 'resources'
  | 'faq' | 'contact' | 'policy';

interface NavigationState {
  currentPage: PageSection;
  selectedProductSku: string | null;
  selectedServiceCode: string | null;
  selectedPolicy: string | null;
  selectedCategory: string | null;
  selectedServiceCategory: string | null;
  searchQuery: string;
  mobileMenuOpen: boolean;
  quoteDialogOpen: boolean;
  quotePrefill: {
    sku?: string;
    productName?: string;
    category?: string;
    brand?: string;
  } | null;
}

interface NavigationActions {
  navigateTo: (page: PageSection) => void;
  viewProduct: (sku: string) => void;
  closeProductDetail: () => void;
  viewService: (code: string) => void;
  viewPolicy: (policy: string) => void;
  filterByCategory: (category: string | null) => void;
  filterServiceByCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openQuoteDialog: (prefill?: NavigationState['quotePrefill']) => void;
  closeQuoteDialog: () => void;
  goHome: () => void;
}

export const useNavigation = create<NavigationState & NavigationActions>((set) => ({
  currentPage: 'home',
  selectedProductSku: null,
  selectedServiceCode: null,
  selectedPolicy: null,
  selectedCategory: null,
  selectedServiceCategory: null,
  searchQuery: '',
  mobileMenuOpen: false,
  quoteDialogOpen: false,
  quotePrefill: null,

  navigateTo: (page) => set({ currentPage: page, mobileMenuOpen: false }),
  viewProduct: (sku) => set({ currentPage: 'product-detail', selectedProductSku: sku, mobileMenuOpen: false }),
  closeProductDetail: () => set({ selectedProductSku: null, mobileMenuOpen: false }),
  viewService: (code) => set({ currentPage: 'service-detail', selectedServiceCode: code, mobileMenuOpen: false }),
  viewPolicy: (policy) => set({ currentPage: 'policy', selectedPolicy: policy, mobileMenuOpen: false }),
  filterByCategory: (category) => set({ currentPage: 'products', selectedCategory: category, mobileMenuOpen: false }),
  filterServiceByCategory: (category) => set({ currentPage: 'services', selectedServiceCategory: category, mobileMenuOpen: false }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openQuoteDialog: (prefill) => set({ quoteDialogOpen: true, quotePrefill: prefill || null }),
  closeQuoteDialog: () => set({ quoteDialogOpen: false, quotePrefill: null }),
  goHome: () => set({ currentPage: 'home', mobileMenuOpen: false }),
}));