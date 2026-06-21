'use client';

import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Home,
  Building,
  Factory,
  Warehouse,
  Cog,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Building2 as Apartment,
  Store,
  ClipboardList,
  Wrench,
  PenTool,
  Settings,
} from 'lucide-react';

const INDUSTRIES = [
  {
    icon: Home,
    name: 'Residential Construction',
    description: 'We supply materials and coordinate services for single-family homes, townhomes, and residential renovations. From plumbing fixtures to electrical components, we support builders and homeowners with reliable sourcing and competitive pricing.',
  },
  {
    icon: Building,
    name: 'Commercial Buildings',
    description: 'Commercial projects require precise specification and timely delivery. We provide procurement support for office buildings, retail spaces, and mixed-use developments, coordinating with vendors who specialize in commercial-grade materials and services.',
  },
  {
    icon: Factory,
    name: 'Industrial Facilities',
    description: 'Industrial construction demands durability and compliance. We source heavy-duty plumbing, industrial electrical components, roofing systems, and flooring materials designed to withstand demanding environments and operational requirements.',
  },
  {
    icon: Warehouse,
    name: 'Warehouses',
    description: 'Large-scale warehouse projects benefit from our bulk sourcing capabilities and vendor network. We coordinate delivery of structural materials, lighting systems, HVAC support, and flooring solutions for distribution and storage facilities.',
  },
  {
    icon: Cog,
    name: 'Manufacturing Plants',
    description: 'Manufacturing facilities require specialized materials and systems. We support plant construction and maintenance with industrial plumbing, electrical infrastructure, pump and water systems, and compliant building materials.',
  },
  {
    icon: GraduationCap,
    name: 'Educational Institutions',
    description: 'Schools and universities need safe, durable, and compliant construction solutions. We provide materials and service coordination that meet educational facility standards, including plumbing, electrical, lighting, and maintenance support.',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare Facilities',
    description: 'Healthcare construction requires strict adherence to regulations and hygiene standards. We source compliant materials for medical facilities, including specialized plumbing, electrical systems, and water management solutions.',
  },
  {
    icon: Hotel,
    name: 'Hospitality & Hotels',
    description: 'The hospitality industry demands quality finishes and reliable building systems. We support hotel construction and renovation with premium fixtures, lighting, flooring, plumbing, and HVAC coordination for guest comfort and operational efficiency.',
  },
  {
    icon: Landmark,
    name: 'Government Projects',
    description: 'Government and public sector projects require documented compliance and qualified vendors. We work within procurement frameworks to supply materials and services that meet government standards and specifications.',
  },
  {
    icon: Apartment,
    name: 'Apartment Communities',
    description: 'Multi-family housing projects benefit from our ability to source in bulk and coordinate across multiple unit types. We support apartment construction with consistent materials, competitive volume pricing, and scheduled delivery coordination.',
  },
  {
    icon: Store,
    name: 'Retail Developments',
    description: 'Retail spaces require precise construction timelines and quality finishes. We provide procurement support for storefronts, shopping centers, and retail renovations with materials and services tailored to commercial retail requirements.',
  },
  {
    icon: ClipboardList,
    name: 'Property Management Companies',
    description: 'Property management teams rely on us for ongoing maintenance materials and service coordination. We support multi-property portfolios with consistent sourcing, repair services, and maintenance support across various building types.',
  },
  {
    icon: Wrench,
    name: 'Contractors',
    description: 'General contractors and subcontractors depend on our vendor network for timely material sourcing and service coordination. We help contractors streamline their procurement process and access competitive pricing across multiple categories.',
  },
  {
    icon: PenTool,
    name: 'Engineering Firms',
    description: 'Engineering firms benefit from our technical product knowledge and specification support. We assist with material selection, sourcing hard-to-find components, and providing product information for engineering design and project planning.',
  },
  {
    icon: Settings,
    name: 'Facility Managers',
    description: 'Facility managers need reliable maintenance and repair support. We provide ongoing access to maintenance services, replacement parts, repair materials, and emergency service coordination to keep facilities running smoothly.',
  },
];

export function IndustriesPage() {
  const { openQuoteDialog } = useNavigation();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Industries We Serve
          </h1>
          <p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl">
            Chittety Construction supports a wide range of industries with materials, services, and procurement solutions tailored to each sector&apos;s unique requirements.
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {INDUSTRIES.map((industry) => (
            <Card
              key={industry.name}
              className="py-0 overflow-hidden group hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <industry.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{industry.name}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{industry.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Need Industry-Specific Support?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Tell us about your project and industry, and we&apos;ll connect you with the right materials and services.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white"
            onClick={() => openQuoteDialog()}
          >
            Request Industry Quote
          </Button>
        </div>
      </section>
    </main>
  );
}