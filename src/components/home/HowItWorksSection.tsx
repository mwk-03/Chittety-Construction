'use client';

import {
  Search,
  FileText,
  SearchCheck,
  Calculator,
  Truck,
  ShieldCheck,
} from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Search,
    title: 'Browse Products',
    description: 'Search our catalog of 1,500+ construction materials',
  },
  {
    step: 2,
    icon: FileText,
    title: 'Submit Requirement',
    description: 'Share your project needs and material specifications',
  },
  {
    step: 3,
    icon: SearchCheck,
    title: 'Vendor Evaluation',
    description: 'We evaluate vendors for the best pricing and availability',
  },
  {
    step: 4,
    icon: Calculator,
    title: 'Quotation',
    description: 'Receive a competitive quote tailored to your project',
  },
  {
    step: 5,
    icon: Truck,
    title: 'Supply Coordination',
    description: 'Coordinated delivery and logistics for your order',
  },
  {
    step: 6,
    icon: ShieldCheck,
    title: 'Project Support',
    description: 'Ongoing support throughout your construction project',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Simple, transparent procurement process
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:grid lg:grid-cols-6 lg:gap-0">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative flex flex-col items-center px-2">
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+24px)] top-6 h-px w-[calc(100%-48px)] bg-[#E5E7EB]" />
                )}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#E5E7EB] bg-white">
                  <Icon className="h-5 w-5 text-[#111827]" />
                </div>
                <span className="mt-3 text-xs font-medium text-[#C8A44D]">
                  Step {item.step}
                </span>
                <h3 className="mt-1 text-center text-sm font-semibold text-[#111827]">
                  {item.title}
                </h3>
                <p className="mt-2 text-center text-xs leading-relaxed text-[#6B7280]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet stacked */}
        <div className="flex flex-col gap-8 lg:hidden">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#E5E7EB] bg-white">
                    <Icon className="h-4 w-4 text-[#111827]" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mt-2 h-full w-px bg-[#E5E7EB]" />
                  )}
                </div>
                <div className="pb-2">
                  <span className="text-xs font-medium text-[#C8A44D]">
                    Step {item.step}
                  </span>
                  <h3 className="text-sm font-semibold text-[#111827]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}