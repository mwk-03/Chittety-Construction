'use client';

import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Network,
  Users,
  RefreshCw,
  Package,
  HardHat,
  ClipboardCheck,
  MapPin,
  Box,
} from 'lucide-react';

const VENDOR_FEATURES = [
  {
    icon: Network,
    title: 'Multi-Vendor Sourcing',
    description:
      'We work with multiple vendors simultaneously to find the best products, prices, and availability for your project. Instead of being limited to a single supplier, you benefit from competitive comparisons across our entire vendor network, ensuring you get optimal value without compromising on quality.',
  },
  {
    icon: Users,
    title: 'Supplier Relationships',
    description:
      'Over 10 years of industry presence has allowed us to build deep, trusted relationships with suppliers across the country. These relationships translate into better pricing, priority availability, and direct communication channels that benefit our clients on every order.',
  },
  {
    icon: RefreshCw,
    title: 'Product Alternatives',
    description:
      'When a specific product is unavailable or exceeds budget, we leverage our vendor network to identify suitable alternatives. We present options with clear comparisons of specifications, pricing, and availability so you can make informed decisions without project delays.',
  },
  {
    icon: Package,
    title: 'Bulk Sourcing',
    description:
      'For projects requiring large quantities, our bulk sourcing capability ensures consistent supply at volume-optimized pricing. We coordinate with multiple vendors when needed to fulfill large orders, manage delivery scheduling, and ensure material consistency across the entire order.',
  },
  {
    icon: HardHat,
    title: 'Contractor Support',
    description:
      'Contractors benefit from our streamlined procurement process that saves time and reduces overhead. We handle vendor communication, price negotiation, availability checks, and delivery coordination so contractors can focus on what they do best — building.',
  },
  {
    icon: ClipboardCheck,
    title: 'Procurement Support',
    description:
      'Our procurement support extends beyond simple ordering. We assist with material specification review, vendor qualification, price benchmarking, and order tracking. For complex projects, we provide end-to-end procurement assistance to ensure nothing falls through the cracks.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Vendor Access',
    description:
      'Our vendor network spans the United States, giving you access to products and materials that may not be available locally. For specialized or hard-to-find items, we can source from vendors across the country and coordinate delivery to your project location.',
  },
  {
    icon: Box,
    title: 'Material Availability Assistance',
    description:
      'Material shortages can stall projects. Our team actively monitors availability across our vendor network and can proactively identify potential supply chain issues. When materials are scarce, we work to find solutions, alternatives, or reliable delivery timelines.',
  },
];

export function VendorNetworkPage() {
  const { openQuoteDialog } = useNavigation();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Network className="w-5 h-5 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Vendor Network
          </h1>
          <p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl">
            Chittety Construction works with a strong vendor ecosystem across the USA, connecting construction professionals with reliable suppliers, quality materials, and competitive pricing through established relationships built over a decade of industry presence.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10+</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-wide">Years Building Relationships</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">Nationwide</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-wide">Vendor Coverage</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">Multi-Category</div>
              <div className="text-white/70 text-sm font-medium uppercase tracking-wide">Product & Service Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          What We Offer
        </h2>
        <p className="text-text-secondary mb-10 max-w-2xl">
          Our vendor network capabilities are designed to address the real challenges that construction professionals face in material sourcing and procurement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {VENDOR_FEATURES.map((feature) => (
            <Card key={feature.title} className="py-0 overflow-hidden group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <feature.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-2">{feature.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-10">
          How Vendor Sourcing Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Share Requirements', desc: 'Tell us what you need — products, quantities, specifications, and project timeline.' },
            { step: '2', title: 'We Search Our Network', desc: 'Our team queries multiple vendors for availability, pricing, and delivery options.' },
            { step: '3', title: 'Get Options', desc: 'Receive a comparison of options with pricing, specs, and availability details.' },
            { step: '4', title: 'Confirm & Deliver', desc: 'Select your preferred option and we coordinate ordering and delivery to your site.' },
          ].map((item) => (
            <div key={item.step} className="text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center mx-auto md:mx-0 mb-4 text-sm font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1.5">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Need Help Sourcing Materials?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Submit your requirements and let our vendor network work for you. We&apos;ll find the best options from our trusted suppliers.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white"
            onClick={() => openQuoteDialog()}
          >
            Request Vendor Sourcing
          </Button>
        </div>
      </section>
    </main>
  );
}