import Link from 'next/link';

import { BrandLogo } from '@/components/common/BrandLogo';
import { CONTACT } from '@/lib/contact';
import { LEGAL_LINKS } from '@/lib/legal-policies';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Chittety Construction home" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A44D]">
            <BrandLogo variant="header" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-600 transition-colors hover:text-[#C8A44D]">Main Website</Link>
        </div>
      </header>
      {children}
      <footer className="bg-[#111827] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <div>
              <BrandLogo variant="footer" />
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Construction materials, sourcing, vendor coordination, wholesale distribution, and project support.</p>
              <p className="mt-3 text-sm text-slate-400">{CONTACT.phoneDisplay} · {CONTACT.email}</p>
            </div>
            <nav aria-label="Legal policies" className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {LEGAL_LINKS.map((link) => <Link key={link.href} href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">{link.title}</Link>)}
            </nav>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5 text-xs text-slate-500">Copyright © 2026 Chittety Construction. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
