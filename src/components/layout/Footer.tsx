'use client';

import { useNavigation } from '@/store/navigation';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock } from 'lucide-react';
import type { PageSection } from '@/store/navigation';

const COMPANY_LINKS: { label: string; page: PageSection }[] = [
  { label: 'About', page: 'about' },
  { label: 'Our Story', page: 'about' },
  { label: 'Industries Served', page: 'industries' },
  { label: 'Vendor Network', page: 'vendor-network' },
  { label: 'Wholesale', page: 'wholesale' },
  { label: 'Procurement Solutions', page: 'services' },
  { label: 'Contact Us', page: 'contact' },
];

const PRODUCT_LINKS: { label: string; category: string }[] = [
  { label: 'Plumbing & Bathroom', category: 'PLB' },
  { label: 'Electrical & Wiring', category: 'ELE' },
  { label: 'Lighting', category: 'LHV' },
  { label: 'Pumps & Water', category: 'LHV' },
  { label: 'Flooring & Tiles', category: 'FRB' },
  { label: 'Roofing', category: 'FRB' },
  { label: 'Steel & Fabrication', category: 'HST' },
  { label: 'Building Materials', category: 'FRB' },
  { label: 'Hardware & Tools', category: 'HST' },
  { label: 'Kitchen Systems', category: 'HST' },
];

const SERVICE_LINKS: { label: string }[] = [
  { label: 'Plumbing' },
  { label: 'Electrical' },
  { label: 'Flooring' },
  { label: 'Roofing' },
  { label: 'Building Maintenance' },
  { label: 'Steel Fabrication' },
  { label: 'Water Tank' },
  { label: 'Pump Installation' },
  { label: 'Leak Detection' },
  { label: 'Project Support' },
];

const BUSINESS_LINKS: { label: string }[] = [
  { label: 'Contractor Supply' },
  { label: 'Wholesale' },
  { label: 'Bulk Orders' },
  { label: 'Project Procurement' },
  { label: 'Vendor Sourcing' },
  { label: 'Material Estimation' },
  { label: 'BOQ Assistance' },
  { label: 'Commercial Projects' },
];

const RESOURCE_LINKS: { label: string; page: PageSection }[] = [
  { label: 'Construction Guides', page: 'resources' },
  { label: 'Material Selection Guides', page: 'resources' },
  { label: 'FAQ', page: 'faq' },
  { label: 'Warranty Info', page: 'policy' },
  { label: 'Delivery Info', page: 'resources' },
  { label: 'Support Center', page: 'contact' },
];

function FooterLink({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-sm text-gray-400 hover:text-white transition-colors leading-relaxed"
      >
        {label}
      </button>
    </li>
  );
}

export function Footer() {
  const { navigateTo, filterByCategory } = useNavigation();

  return (
    <footer className="bg-primary text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Column */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-white">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  onClick={() => navigateTo(link.page)}
                />
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-white">
              Products
            </h3>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  onClick={() => filterByCategory(link.category)}
                />
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-white">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((link) => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  onClick={() => navigateTo('services')}
                />
              ))}
            </ul>
          </div>

          {/* Business Column */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-white">
              Business
            </h3>
            <ul className="space-y-2">
              {BUSINESS_LINKS.map((link) => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  onClick={() => navigateTo('wholesale')}
                />
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  onClick={() => navigateTo(link.page)}
                />
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-white">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 shrink-0 text-accent" />
                <span>6816 Outland Drive, Plano, Texas 75024</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="size-4 mt-0.5 shrink-0 text-accent" />
                <span>Mon–Fri 8AM–6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-center text-xs text-gray-500">
          Copyright © 2026 Chittety Construction. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}