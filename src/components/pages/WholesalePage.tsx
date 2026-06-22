'use client';

import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Truck,
  Package,
  Layers,
  ClipboardList,
  Network,
  Calculator,
  FileSpreadsheet,
  Building2,
  Grid3x3,
  RotateCcw,
} from 'lucide-react';

const SOLUTIONS = [
  {
    icon: Truck,
    title: 'Contractor Supply',
    description:
      'We support contractors with a streamlined supply pipeline that covers plumbing, electrical, lighting, flooring, roofing, and hardware materials. Our contractor supply program is designed to reduce procurement overhead, provide competitive pricing on both small and large orders, and ensure materials arrive when needed. Whether you are working on a single residential project or managing multiple job sites, our team coordinates sourcing and delivery so you can focus on execution.',
  },
  {
    icon: Package,
    title: 'Wholesale Supply',
    description:
      'Our wholesale distribution channel provides construction materials at volume-optimized pricing for businesses that purchase regularly or in large quantities. We work with wholesalers, retailers, and re-sellers to provide consistent supply, reliable availability, and flexible ordering options. Our wholesale program includes access to our full product catalog with special pricing tiers based on order volume and frequency.',
  },
  {
    icon: Layers,
    title: 'Bulk Orders',
    description:
      'For projects requiring significant material quantities, our bulk ordering capability ensures you receive consistent, high-quality materials at competitive prices. We coordinate with multiple vendors when necessary to fulfill large orders, manage delivery logistics across project phases, and maintain material consistency. Bulk orders benefit from our vendor relationships and negotiated pricing structures.',
  },
  {
    icon: ClipboardList,
    title: 'Project Procurement',
    description:
      'We provide end-to-end procurement support for construction projects of all sizes. From initial material takeoff assistance to final delivery coordination, our team manages the procurement process so project managers can focus on schedule and quality. We handle vendor selection, price comparison, order placement, delivery scheduling, and issue resolution throughout the project lifecycle.',
  },
  {
    icon: Network,
    title: 'Vendor Sourcing',
    description:
      'When you need specific products that are hard to find, competitively priced, or available from limited suppliers, our vendor sourcing capability connects you with the right suppliers. We leverage our nationwide vendor network to locate products, compare options, and coordinate delivery. This service is particularly valuable for specialized materials, urgent requirements, or projects in remote locations.',
  },
  {
    icon: Calculator,
    title: 'Material Estimation',
    description:
      'Accurate material estimation is critical for project budgeting and procurement planning. We assist with material quantity calculations based on project specifications, helping you order the right amounts to minimize waste and avoid shortages. Our team reviews project plans and provides material estimates that account for standard waste factors and project-specific conditions.',
  },
  {
    icon: FileSpreadsheet,
    title: 'BOQ Assistance',
    description:
      'Bill of Quantities preparation can be time-consuming and error-prone. We support project teams with BOQ development and review, ensuring that material specifications, quantities, and categories are accurately captured. Our familiarity with construction materials across multiple categories allows us to provide informed input on BOQ preparation and identify potential issues before they affect procurement.',
  },
  {
    icon: Building2,
    title: 'Commercial Projects',
    description:
      'Commercial construction projects have unique procurement requirements including compliance documentation, specification adherence, and coordination across multiple trades. We provide specialized support for commercial projects with attention to these requirements, including sourcing materials that meet commercial building codes, coordinating deliveries to active construction sites, and providing documentation for project records.',
  },
  {
    icon: Grid3x3,
    title: 'Multi-Category Supply',
    description:
      'Construction projects typically require materials from multiple categories — plumbing, electrical, flooring, roofing, hardware, and more. Instead of managing multiple supplier relationships, our multi-category supply capability provides a single point of contact for all your material needs. We coordinate across categories, consolidate deliveries where possible, and provide unified billing and documentation.',
  },
  {
    icon: RotateCcw,
    title: 'Repeat Procurement Support',
    description:
      'For contractors and companies with ongoing construction activity, we offer repeat procurement support that simplifies reordering and maintains consistency across projects. We track your preferred products, maintain order history for easy reference, and provide priority handling for returning customers. This program is designed to reduce the friction of repeated procurement cycles and build long-term supply reliability.',
  },
];

export function WholesalePage() {
  const { openQuoteDialog } = useNavigation();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Business Solutions
          </h1>
          <p className="mt-2 text-accent font-medium text-sm uppercase tracking-wide">
            Contractor Supply &bull; Wholesale Distribution &bull; Project Procurement
          </p>
          <p className="mt-4 text-text-secondary text-base md:text-lg max-w-2xl">
            Comprehensive procurement and supply solutions for contractors, wholesalers, project managers, and construction businesses. We simplify the sourcing process so you can focus on building.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SOLUTIONS.map((solution) => (
            <Card key={solution.title} className="py-0 overflow-hidden group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <solution.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-2">{solution.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{solution.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Why Businesses Choose Us
        </h2>
        <p className="text-text-secondary mb-10 max-w-2xl">
          Our business solutions are built on practical understanding of what construction professionals need from a supply partner.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Competitive Volume Pricing', desc: 'Leverage our vendor relationships for better prices on large orders.' },
            { label: 'Single Point of Contact', desc: 'One team handles all your procurement needs across categories.' },
            { label: 'Nationwide Delivery', desc: 'We coordinate delivery to project sites across the United States.' },
            { label: 'Dedicated Support', desc: 'Our team provides ongoing assistance throughout your project lifecycle.' },
          ].map((item) => (
            <div key={item.label} className="p-5 rounded-xl bg-white border border-border">
              <h3 className="font-semibold text-foreground text-sm mb-1.5">{item.label}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Looking for Bulk or Contract Pricing?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Share your project or business requirements and our team will prepare a tailored proposal with competitive pricing.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white"
            onClick={() => openQuoteDialog()}
          >
            Contact for Bulk Pricing
          </Button>
        </div>
      </section>
    </main>
  );
}