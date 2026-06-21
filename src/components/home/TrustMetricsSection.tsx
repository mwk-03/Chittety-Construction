'use client';

const metrics = [
  { value: '10+', label: 'Years Industry Experience' },
  { value: '1,500+', label: 'Construction Products' },
  { value: '185+', label: 'Service Categories' },
  { value: 'USA', label: 'Vendor Network Across USA' },
  { value: 'B2B & B2C', label: 'Residential & Commercial Supply' },
  { value: 'End-to-End', label: 'Project Procurement Support' },
];

export default function TrustMetricsSection() {
  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-[#E5E7EB] bg-white p-6"
            >
              <p className="text-2xl font-bold text-[#111827]">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-[#6B7280]">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}