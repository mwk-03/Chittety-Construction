'use client';

import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  Handshake,
  Award,
  Eye,
  HardHat,
  Users,
  Heart,
  ArrowRight,
  CheckCircle2,
  Building2,
  Network,
  ClipboardList,
} from 'lucide-react';

const WHAT_WE_DO = [
  'Construction material supply', 'Plumbing, bathroom, sewer, pump, and water-system sourcing',
  'Electrical wiring, lighting, fan, AC, and water-heater support products',
  'Flooring, tiles, adhesives, grouts, trims, roofing, and waterproofing materials',
  'Steel fabrication, building materials, door hardware, kitchen accessories, tools, and safety equipment',
  'Contractor supply, wholesale sourcing, bulk orders, BOQ assistance, and project procurement support',
];

const VENDOR_SUPPORT = [
  'Product sourcing from trusted suppliers', 'Material comparison and alternative-product assistance',
  'Bulk-order and contractor supply coordination', 'Brand, specification, and availability matching',
  'Special-order and multi-category procurement support', 'Service-partner coordination where required',
];

const APPROACH = [
  ['Understand the Requirement', 'Review the product, service, quantity, location, project type, or material list.'],
  ['Review the Category', 'Confirm specifications, brand preference, usage purpose, quantity, and project needs.'],
  ['Evaluate Vendors', 'Check availability, alternatives, market-reference pricing, and supplier options.'],
  ['Support the Quotation', 'Provide pricing guidance and clear product or service information.'],
  ['Coordinate Supply', 'Arrange material supply, delivery coordination, or vendor assignment where applicable.'],
  ['Support the Project', 'Assist larger requirements with service coordination or procurement planning.'],
];

const TRUST_POINTS = [
  '10+ years of practical industry experience', 'Ground-level vendor relationships',
  'Wide construction product catalog', 'B2B and B2C supply support',
  'Wholesale and bulk-order assistance', 'Residential and commercial project support',
  'Multi-category procurement capability', 'Transparent quotation-driven model',
  'Vendor-backed sourcing approach', 'Practical knowledge of materials and site requirements',
];

const VALUES = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We conduct every transaction and interaction with honesty and ethical standards. Our commitments are genuine, and we hold ourselves accountable to the highest level of professional integrity in the construction supply industry.',
  },
  {
    icon: Handshake,
    title: 'Reliability',
    description: 'Contractors, builders, and project teams count on us for consistent delivery, accurate quoting, and dependable service coordination. We understand that delays cost money, and we work to ensure timelines are met.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'From the products we source to the service providers we coordinate with, quality is non-negotiable. We vet every vendor, inspect materials, and ensure that every project receives materials and services that meet or exceed standards.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Pricing, availability, timelines, and limitations are communicated clearly upfront. We believe informed customers make better decisions, and we provide all the information needed for confident procurement.',
  },
  {
    icon: HardHat,
    title: 'Safety',
    description: 'We prioritize safety in every aspect of our operations, from the products we recommend to the service providers we work with. Safety compliance and best practices are fundamental to our business approach.',
  },
  {
    icon: Users,
    title: 'Long-term Relationships',
    description: 'We invest in building lasting relationships with our clients, vendors, and service partners. Repeat business and referrals are the foundation of our growth, and we nurture every professional connection.',
  },
  {
    icon: Heart,
    title: 'Customer Commitment',
    description: 'Every inquiry is treated with importance, every quote is prepared with care, and every project is supported with dedication. Our customers are at the center of every decision we make.',
  },
];

const QUALITY_POINTS = [
  'Vetted vendor network with quality assurance processes',
  'Product verification before shipment and delivery',
  'Service provider certification and insurance verification',
  'Detailed quoting with transparent cost breakdowns',
  'Post-delivery support and issue resolution',
];

const SAFETY_POINTS = [
  'All service providers carry current licenses and insurance',
  'Safety-compliant product recommendations',
  'Site safety assessment as part of service coordination',
  'Compliance with OSHA and local building codes',
  'Regular vendor and partner safety audits',
];

export function AboutPage() {
  const { navigateTo, openQuoteDialog } = useNavigation();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            A Trusted Construction Supply, Vendor Network &amp; Procurement Partner
          </h1>
          <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl">
            For more than 10 years, Chittety Construction has worked at the ground level of the construction industry, building strong relationships with vendors, suppliers, contractors, technicians, project teams, and material providers across the United States.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-14">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">About Chittety Construction</p><h2 className="text-3xl font-bold text-foreground mb-5">Company Overview</h2><div className="space-y-4 text-text-secondary leading-relaxed"><p>Chittety Construction is a construction supply, sourcing, vendor network, wholesale distribution, and project support company serving residential, commercial, industrial, and infrastructure-related requirements. The company combines more than a decade of practical experience with direct vendor relationships and a ground-level understanding of how projects move from planning to sourcing, delivery, installation, and maintenance.</p><p>Unlike a contractor-listing or technician-booking website, Chittety Construction acts as a bridge between customers, contractors, vendors, suppliers, and service providers. We help clients identify suitable materials, compare available options, request quotations, source through vendor networks, and coordinate service support where required.</p><p>Our categories include plumbing, drainage, pumps, electrical, lighting, flooring, roofing, waterproofing, steel, building materials, door hardware, kitchen accessories, tools, safety equipment, and project-based procurement.</p></div></div>
        <div><h2 className="text-3xl font-bold text-foreground mb-5">Our Story</h2><div className="space-y-4 text-text-secondary leading-relaxed"><p>Chittety Construction was created to make construction material sourcing more dependable, transparent, and accessible for homeowners, contractors, builders, businesses, and project teams.</p><p>Hands-on work with vendors and construction professionals revealed recurring challenges: inconsistent pricing, unclear specifications, limited availability, supply delays, difficult comparisons, and weak coordination between product supply and service execution. In response, the company developed a broad network of material providers, distributors, contractors, technicians, and specialist vendors capable of supporting both individual inquiries and multi-category project requirements.</p><p>Today, Chittety Construction combines traditional vendor relationships with a clean digital catalog where customers can explore products and services, understand options, request quotations, and connect directly with our team.</p></div></div>
      </section>

      <section className="bg-white border-y border-border"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"><div className="grid md:grid-cols-2 gap-12"><div><div className="size-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5"><ClipboardList className="size-5 text-accent" /></div><h2 className="text-3xl font-bold text-foreground mb-5">What We Do</h2><p className="text-text-secondary leading-relaxed mb-6">We provide materials, sourcing assistance, vendor coordination, wholesale supply support, and project support across major construction categories.</p><ul className="space-y-3">{WHAT_WE_DO.map((item) => <li key={item} className="flex gap-3 text-sm text-text-secondary"><CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />{item}</li>)}</ul></div><div><div className="size-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5"><Network className="size-5 text-accent" /></div><h2 className="text-3xl font-bold text-foreground mb-5">Our Vendor Network</h2><p className="text-text-secondary leading-relaxed mb-6">Relationships with vendors, distributors, product suppliers, contractors, technicians, and service partners across the United States help us support multiple options, special orders, and project-specific supply needs.</p><ul className="space-y-3">{VENDOR_SUPPORT.map((item) => <li key={item} className="flex gap-3 text-sm text-text-secondary"><CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />{item}</li>)}</ul></div></div></div></section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Approach</h2><p className="mt-3 text-text-secondary">A clear, quotation-driven process from requirement to project support.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{APPROACH.map(([title, description], index) => <Card key={title} className="py-0"><CardContent className="p-6"><span className="text-sm font-bold text-accent">Step {index + 1}</span><h3 className="font-semibold text-foreground mt-2 mb-2">{title}</h3><p className="text-sm text-text-secondary leading-relaxed">{description}</p></CardContent></Card>)}</div></section>

      <section className="bg-muted/50 border-y border-border"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"><h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">Why Customers Trust Us</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{TRUST_POINTS.map((item) => <div key={item} className="flex gap-3 rounded-lg border border-border bg-white p-4 text-sm text-text-secondary"><CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />{item}</div>)}</div></div></section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <Card className="py-0 overflow-hidden border-accent/20">
            <CardContent className="p-6 md:p-8">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">Our Mission</h2>
              <p className="text-text-secondary leading-relaxed">
                To simplify construction sourcing, procurement and project support through trusted vendor relationships, quality products, competitive pricing and dependable service coordination.
              </p>
            </CardContent>
          </Card>
          <Card className="py-0 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center mb-5">
                <Eye className="w-5 h-5 text-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">Our Vision</h2>
              <p className="text-text-secondary leading-relaxed">
                To become a trusted construction supply and procurement partner for residential, commercial, industrial and infrastructure projects across the United States.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Our Values</h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            The principles that guide every decision, every interaction, and every project we undertake.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value) => (
            <Card key={value.title} className="py-0 overflow-hidden group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <value.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Quality Commitment */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Quality Commitment
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              At Chittety Construction, quality is not just a promise — it is a systematic practice embedded in every layer of our operations. From vendor selection to final delivery, we maintain rigorous quality standards to ensure that every product and service meets the expectations of our clients and the requirements of their projects.
            </p>
            <ul className="space-y-3">
              {QUALITY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="py-0 overflow-hidden bg-foreground">
            <CardContent className="p-8 text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">10+</div>
              <div className="text-white/80 text-sm font-medium uppercase tracking-wide">Years in Industry</div>
              <Separator className="my-6 bg-white/10" />
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">120+</div>
              <div className="text-white/80 text-sm font-medium uppercase tracking-wide">Services Offered</div>
              <Separator className="my-6 bg-white/10" />
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">USA</div>
              <div className="text-white/80 text-sm font-medium uppercase tracking-wide">Nationwide Vendor Network</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Safety Commitment */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Safety Commitment
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Safety is the foundation of everything we do. We recognize that construction environments carry inherent risks, and we take every precaution to ensure that our operations, our products, and our service partners uphold the highest safety standards. Our commitment extends beyond compliance — we actively promote a culture of safety awareness.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAFETY_POINTS.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border"
            >
              <HardHat className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span className="text-sm text-text-secondary leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Need Construction Materials or Project Support?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Whether you are a homeowner, contractor, builder, property manager, or business owner, we can help you source materials, compare options, request quotations, and coordinate construction-related requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" onClick={() => openQuoteDialog()}>Request Quote</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white" onClick={() => navigateTo('products')}>Browse Products</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white" onClick={() => navigateTo('contact')}>Contact Chittety Construction <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
