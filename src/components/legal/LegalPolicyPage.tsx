import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

import type { LegalPolicy } from '@/lib/legal-policies';

export function LegalPolicyPage({ policy }: { policy: LegalPolicy }) {
  return (
    <main className="flex-1 bg-[#F8FAFC]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#C8A44D]">
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
          <div className="flex items-start gap-4">
            <span className="rounded-xl bg-[#111827] p-3 text-[#C8A44D]"><FileText className="size-6" /></span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">{policy.title}</h1>
              <p className="mt-2 max-w-2xl text-slate-600">{policy.description}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Last updated June 23, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">On this page</h2>
          <ol className="mt-4 space-y-2.5">
            {policy.sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#section-${index + 1}`} className="text-sm leading-snug text-slate-600 transition-colors hover:text-[#C8A44D]">
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="rounded-xl border border-slate-200 bg-white px-5 py-7 shadow-sm sm:px-8 md:px-10 md:py-10">
          <div className="space-y-10">
            {policy.sections.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-8">
                <h2 className="text-xl font-bold text-[#111827] md:text-2xl">{index + 1}. {section.title}</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600 md:text-base">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="space-y-2 pl-5">
                      {section.bullets.map((item) => <li key={item} className="list-disc pl-1 marker:text-[#C8A44D]">{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
