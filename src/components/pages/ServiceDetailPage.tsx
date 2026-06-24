'use client';

import { useState, useEffect } from 'react';
import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { CONTACT } from '@/lib/contact';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  Phone,
  ClipboardList,
  Search,
  FileText,
  Hammer,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

interface Service {
  code: string;
  category: string;
  name: string;
  startingPrice: number;
  priceType: string;
  notes: string;
  cta: string;
  source: string;
}

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Submit Request',
    description: 'Fill out the quote request form with your project details, preferred timeline, and any specific requirements. Our team will review your submission promptly.',
  },
  {
    icon: Search,
    title: 'Site Inspection',
    description: 'Our field team visits the project location to assess conditions, measure requirements, identify access points, and document any factors that may affect the service scope.',
  },
  {
    icon: FileText,
    title: 'Detailed Quote',
    description: 'Based on the site inspection, we provide a comprehensive quote covering materials, labor, timeline, and any additional considerations. All costs are transparently itemized.',
  },
  {
    icon: Hammer,
    title: 'Service Execution',
    description: 'Once the quote is approved, our experienced technicians and service partners carry out the work with professionalism, adhering to industry standards and safety protocols.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Check',
    description: 'After service completion, a thorough quality inspection ensures all work meets our standards and your expectations. We address any concerns before final sign-off.',
  },
];

const SERVICE_FAQS = [
  {
    question: 'What is included in the service price?',
    answer: 'The starting price covers basic service coordination and standard labor. Final pricing depends on the site inspection findings, material selection, project complexity, and scope of work. A detailed breakdown is provided in the formal quote before any work begins.',
  },
  {
    question: 'How long does a typical service take?',
    answer: 'Service duration varies significantly based on the type of service, project size, site conditions, and material availability. After the site inspection, we provide an estimated timeline as part of the detailed quote. Urgent requests can often be accommodated with adjusted scheduling.',
  },
  {
    question: 'Do I need to be present during the service?',
    answer: 'For most services, we recommend that someone authorized is present during the initial assessment and at key milestones. For the actual service execution, this depends on the nature of the work. We will communicate these requirements clearly during the quoting process.',
  },
  {
    question: 'Are the technicians licensed and insured?',
    answer: 'Yes, all service providers and technicians in our network are properly licensed, insured, and vetted. We work with qualified professionals who meet industry standards and maintain current certifications for their respective trades.',
  },
  {
    question: 'What happens if I need to change the scope of work?',
    answer: 'If the project scope changes after the initial quote, we conduct a reassessment and provide an updated quote. We understand that construction projects often evolve, and we strive to accommodate changes with transparency regarding any cost or timeline adjustments.',
  },
];

export function ServiceDetailPage() {
  const { selectedServiceCode, navigateTo, openQuoteDialog } = useNavigation();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      if (!selectedServiceCode) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/services?search=${encodeURIComponent(selectedServiceCode)}&limit=50`);
        const data = await res.json();
        const found = (data.services || []).find(
          (s: Service) => s.code === selectedServiceCode
        );
        setService(found || null);
      } catch {
        setService(null);
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [selectedServiceCode]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-48" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <AlertTriangle className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Service Not Found</h2>
          <p className="text-text-secondary mb-6">The requested service could not be located.</p>
          <Button variant="outline" onClick={() => navigateTo('services')}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigateTo('services')}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </button>
      </div>

      {/* Service Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <Badge
          variant="secondary"
          className="text-xs bg-accent/10 text-accent border-accent/20 mb-4"
        >
          {service.category}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {service.name}
        </h1>
        <p className="mt-1 text-sm text-text-muted font-mono">{service.code}</p>

        {service.startingPrice > 0 && (
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-xs text-text-muted uppercase tracking-wide">Starting From</span>
            <span className="text-3xl font-bold text-foreground">
              ${service.startingPrice.toLocaleString()}
            </span>
            {service.priceType && (
              <span className="text-sm text-text-muted">/ {service.priceType}</span>
            )}
          </div>
        )}
      </section>

      {/* Description */}
      {service.notes && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Card className="py-0 overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Service Overview</h2>
              <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                {service.notes}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Site Inspection Note */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Site Inspection Required</p>
            <p className="text-sm text-amber-700 mt-1 leading-relaxed">
              Final quote depends on site inspection, material requirement, labor, urgency, access conditions and project size.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">How It Works</h2>
        <div className="space-y-0">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Connector line */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
              )}
              {/* Step number and icon */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5 text-accent" />
              </div>
              {/* Content */}
              <div className="pt-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-accent uppercase tracking-wide">Step {index + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground text-base">{step.title}</h3>
                <p className="text-sm text-text-secondary mt-1.5 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {SERVICE_FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-text-secondary leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* CTAs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="py-0 overflow-hidden border-accent/20">
          <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">Ready to Get Started?</h2>
              <p className="text-sm text-text-secondary mt-1">
                Submit a request and our team will get back to you within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto"
                onClick={() =>
                  openQuoteDialog({
                    sku: service.code,
                    productName: service.name,
                    category: service.category,
                  })
                }
              >
                Request Service Quote
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => window.open(CONTACT.phoneHref, '_self')}
              >
                <Phone className="w-4 h-4 mr-1" /> Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
