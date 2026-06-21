'use client';

import { Building2, Wrench, Truck } from 'lucide-react';

const models = [
  {
    icon: Building2,
    title: 'Retail / B2C Supply',
    description:
      'Individual buyers, homeowners and small projects. Browse our catalog and request competitive pricing on quality construction materials.',
  },
  {
    icon: Wrench,
    title: 'Contractor / B2B Supply',
    description:
      'Contractors, builders and trade professionals. Get bulk pricing, project support and priority vendor coordination.',
  },
  {
    icon: Truck,
    title: 'Wholesale & Vendor Distribution',
    description:
      'Large-scale supply, multi-project procurement and vendor network access. Custom sourcing and material estimation for major builds.',
  },
];

export default function BusinessModelSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Supply &amp; Procurement Solutions
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Built for every scale of construction procurement
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.title}
                className="rounded-lg border border-[#E5E7EB] bg-white p-8 transition-shadow hover:shadow-sm"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#FAFAFA]">
                  <Icon className="h-5 w-5 text-[#111827]" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827]">
                  {model.title}
                </h3>
                <p className="mt-3 leading-relaxed text-sm text-[#6B7280]">
                  {model.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}