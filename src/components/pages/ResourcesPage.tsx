'use client';

import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Blocks,
  HelpCircle,
  Shield,
  Truck,
  HeadphonesIcon,
  ArrowRight,
  Clock,
} from 'lucide-react';

const RESOURCES = [
  {
    icon: BookOpen,
    title: 'Construction Guides',
    description:
      'Comprehensive guides covering plumbing, electrical, flooring, roofing, and other construction topics. Our guides are designed to help contractors, builders, and homeowners understand best practices, material selection, and project planning considerations.',
    action: null,
    badge: 'Coming Soon',
    badgeVariant: 'secondary' as const,
  },
  {
    icon: Blocks,
    title: 'Material Selection Guides',
    description:
      'Detailed material comparison and selection resources to help you choose the right products for your project. Covers material specifications, performance characteristics, installation requirements, and cost considerations across all major construction categories.',
    action: null,
    badge: 'Coming Soon',
    badgeVariant: 'secondary' as const,
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description:
      'Find answers to common questions about our products, services, pricing, ordering process, delivery, warranties, and more. Our FAQ section covers the most frequently asked questions from contractors, builders, and project managers.',
    action: 'faq' as const,
    badge: null,
    badgeVariant: undefined,
  },
  {
    icon: Shield,
    title: 'Warranty Information',
    description:
      'Understand warranty coverage for products and services offered through Chittety Construction. Learn about manufacturer warranties, claim processes, documentation requirements, and what is covered under different warranty programs.',
    action: null,
    badge: 'Coming Soon',
    badgeVariant: 'secondary' as const,
  },
  {
    icon: Truck,
    title: 'Delivery Information',
    description:
      'Everything you need to know about our delivery capabilities, timelines, local DFW area delivery, freight coordination for out-of-area shipments, delivery scheduling, and what to expect when your order arrives at your project site.',
    action: null,
    badge: 'Coming Soon',
    badgeVariant: 'secondary' as const,
  },
  {
    icon: HeadphonesIcon,
    title: 'Support Center',
    description:
      'Get in touch with our team for assistance with orders, quotes, product inquiries, service requests, or any other construction-related needs. Our support team is available during business hours to help you with your requirements.',
    action: 'contact' as const,
    badge: null,
    badgeVariant: undefined,
  },
];

export function ResourcesPage() {
  const { navigateTo } = useNavigation();

  const handleAction = (action: string | null) => {
    if (action === 'faq') navigateTo('faq');
    if (action === 'contact') navigateTo('contact');
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Resources
          </h1>
          <p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl">
            Helpful guides, information, and support resources for construction professionals and project teams.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {RESOURCES.map((resource) => (
            <Card
              key={resource.title}
              className={`py-0 overflow-hidden group transition-shadow ${
                resource.action ? 'hover:shadow-md cursor-pointer' : 'opacity-90'
              }`}
              onClick={() => handleAction(resource.action)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <resource.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  {resource.badge && (
                    <Badge variant={resource.badgeVariant} className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {resource.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{resource.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{resource.description}</p>
                {resource.action && (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    View <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* More Resources Coming */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <Card className="py-0 overflow-hidden bg-muted/50 border-dashed">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">More Resources Coming Soon</h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              We are actively building our resource library with construction guides, material comparison tools, and project planning resources. Check back regularly for new content.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}