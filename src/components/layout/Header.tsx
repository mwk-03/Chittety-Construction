'use client';

import { useNavigation } from '@/store/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Phone, Menu } from 'lucide-react';
import { useState, useCallback } from 'react';
import type { PageSection } from '@/store/navigation';

const NAV_LINKS: { label: string; page: PageSection }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Services', page: 'services' },
  { label: 'Industries', page: 'industries' },
  { label: 'Vendor Network', page: 'vendor-network' },
  { label: 'Resources', page: 'resources' },
  { label: 'Contact', page: 'contact' },
];

function NavLink({
  label,
  page,
  active,
  onClick,
}: {
  label: string;
  page: PageSection;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative text-sm font-medium transition-colors py-1 ${
        active
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
      )}
    </button>
  );
}

export function Header() {
  const { currentPage, navigateTo, openQuoteDialog } =
    useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleNav = useCallback(
    (page: PageSection) => {
      navigateTo(page);
      setSheetOpen(false);
    },
    [navigateTo]
  );

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="font-heading font-bold text-lg tracking-widest text-primary hover:opacity-80 transition-opacity"
          >
            CHITTETY
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.page}
                label={link.label}
                page={link.page}
                active={currentPage === link.page}
                onClick={() => handleNav(link.page)}
              />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+14692290728"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="size-4" />
              (469) 229-0728
            </a>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => window.open('tel:+14692290728')}
            >
              Call Now
            </Button>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-white text-xs"
              onClick={() => openQuoteDialog()}
            >
              Request Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setSheetOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-80 p-0">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
            <SheetTitle className="font-heading font-bold tracking-widest text-primary">
              CHITTETY
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-border space-y-3">
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-white"
              onClick={() => {
                setSheetOpen(false);
                openQuoteDialog();
              }}
            >
              Request Quote
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open('tel:+14692290728')}
            >
              <Phone className="size-4" />
              Call Now
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}