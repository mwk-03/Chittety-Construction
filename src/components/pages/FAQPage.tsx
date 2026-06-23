'use client';

import { useNavigation } from '@/store/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    question: 'Do you sell materials only?',
    answer:
      'No, Chittety Construction offers both material supply and service coordination. We provide construction materials across multiple categories including plumbing, electrical, lighting, flooring, roofing, hardware, and steel products. In addition, we coordinate professional services such as plumbing installation, electrical work, HVAC support, roofing services, waterproofing, and general maintenance. Our goal is to be a comprehensive resource for construction professionals who need both materials and skilled service providers.',
  },
  {
    question: 'Do you provide installation?',
    answer:
      'We do not directly employ installation technicians, but we coordinate installation services through our network of vetted and qualified service providers. When you request a service through our platform, we connect you with experienced professionals who specialize in the specific type of work you need. All service providers in our network are licensed, insured, and evaluated for quality and reliability. You receive a detailed quote before any work begins, and we remain available to address any questions or concerns throughout the process.',
  },
  {
    question: 'Can contractors order in bulk?',
    answer:
      'Yes, bulk ordering is one of our core capabilities. We work with contractors and businesses that need large quantities of materials, offering volume-optimized pricing through our vendor relationships. Bulk orders can be placed for any product category, and we can coordinate with multiple vendors to fulfill large or multi-category orders. For contractors with ongoing needs, we also offer repeat procurement support that simplifies reordering and maintains consistency across projects. Contact our team with your specific requirements for a tailored bulk pricing proposal.',
  },
  {
    question: 'Do you support commercial projects?',
    answer:
      'Absolutely. We provide full procurement and service support for commercial construction projects of all sizes. This includes office buildings, retail spaces, hospitality facilities, educational institutions, healthcare facilities, and government projects. Commercial projects benefit from our ability to source materials that meet commercial specifications, coordinate deliveries to active construction sites, provide documentation for project records, and support multi-trade procurement. We understand the unique requirements of commercial construction and tailor our support accordingly.',
  },
  {
    question: 'Is pricing fixed?',
    answer:
      'Our listed starting prices serve as preliminary estimates based on standard project conditions. Actual pricing is determined after a detailed assessment that considers factors such as site conditions, material specifications, project complexity, labor requirements, urgency, and delivery logistics. For materials, pricing may vary based on vendor availability, order quantity, and market conditions. For services, pricing is finalized after a site inspection. We always provide a detailed quote with transparent cost breakdowns before any commitment is required, so you know exactly what you are paying for.',
  },
  {
    question: 'How does the 10% discount work?',
    answer:
      'We offer a 10% discount on eligible products and services as part of our commitment to providing competitive value to our customers. The discount availability and applicable terms may vary depending on the product category, order quantity, vendor terms, and current promotions. The discount is typically applied during the quoting process and reflected in the final quote you receive. For bulk orders and repeat customers, additional savings may be available. Please note that the discount may not apply to all products or services, and specific terms are provided at the time of quoting.',
  },
  {
    question: 'Do product images show exact products?',
    answer:
      'Our catalog is intentionally specification-led and does not display product images. This avoids misleading customers when color, finish, packaging, or manufacturer batches vary. Actual product photos can be requested during an inquiry where appearance is important, and customers should confirm specifications before ordering.',
  },
  {
    question: 'Can you source products not listed?',
    answer:
      'Yes, one of our key capabilities is sourcing products that may not be currently listed on our platform. Through our vendor network, we have access to a wide range of construction products and materials. If you need a specific product, brand, or specification that you do not see listed, simply submit a quote request with the product details, and our team will search our vendor network to find it. We regularly source specialty items, hard-to-find components, and products from specific manufacturers based on client requirements.',
  },
  {
    question: 'Do you provide warranties?',
    answer:
      'Warranty coverage for products is provided by the respective manufacturers and varies by product and manufacturer. When you receive a product, it comes with the manufacturer\'s warranty terms and conditions. We facilitate warranty claims by providing proof of purchase and relevant documentation, but the warranty terms, coverage, and claim process are determined by the manufacturer. For services, warranty coverage depends on the service provider and the specific terms agreed upon in the service quote. We recommend reviewing warranty information carefully before making a purchase decision and keeping all documentation for future reference.',
  },
  {
    question: 'Do you deliver materials?',
    answer:
      'Yes, we offer delivery services for materials. For the DFW (Dallas-Fort Worth) metro area, we provide local delivery directly to your project site or preferred location. For deliveries outside the DFW area, we coordinate freight shipping to locations across the United States. Delivery timelines depend on product availability, order size, and destination. For local deliveries, we coordinate scheduling to align with your project needs. For freight shipments, we provide tracking information and delivery estimates. Delivery charges vary based on distance, order size, and logistics requirements, and are included in your quote.',
  },
  {
    question: 'Do you provide site inspection?',
    answer:
      'Yes, site inspection is a standard part of our service coordination process. Before providing a final quote for services, we arrange for a qualified professional to visit your project site. During the inspection, they assess the work scope, measure requirements, identify potential challenges, check access conditions, and gather all information needed to provide an accurate and detailed quote. There is no obligation to proceed after the inspection, and the assessment helps ensure that the final quote accurately reflects the work required. Site inspections are typically scheduled within a few business days of your request.',
  },
  {
    question: 'How do I request a quote?',
    answer:
      'Requesting a quote is simple. You can use our quote request form available on the website by clicking any "Request Quote" or "Get Pricing" button. Fill in your contact details, project information, product or service requirements, and any specific notes about your project. Alternatively, you can contact us directly via phone or email. Once we receive your request, our team reviews the details and responds within 24 hours with a quote or follow-up questions. For services, we will schedule a site inspection before providing the final quote. For materials, we check availability and provide pricing based on your specifications.',
  },
  { question: 'Is Chittety Construction an ecommerce store?', answer: 'No. The website is a product catalog and inquiry platform. Displayed prices are market references or estimates, and orders are finalized through quotation, availability confirmation, delivery review, and direct coordination.' },
  { question: 'Can homeowners use the platform?', answer: 'Yes. Homeowners can browse products, compare categories, request material guidance, submit project requirements, and ask for quotation or service coordination support.' },
  { question: 'Do you work with businesses and property managers?', answer: 'Yes. We support contractors, builders, property managers, commercial facilities, businesses, and project teams with recurring supply, bulk orders, vendor sourcing, and multi-category procurement.' },
  { question: 'Can I upload a material list or BOQ?', answer: 'Yes. The quote and support flows allow you to identify or attach a material list. Our team reviews product descriptions, quantities, specifications, and alternates before responding with sourcing and quotation guidance.' },
  { question: 'Can I request products and services together?', answer: 'Yes. Share the combined requirement in one inquiry. We can review material supply alongside installation or service coordination and separate the quotation scope where necessary.' },
  { question: 'How is service pricing determined?', answer: 'Service prices depend on scope, site conditions, access, labor, materials, urgency, permits, and technical requirements. Final service pricing is confirmed after adequate assessment and, where needed, a site inspection.' },
  { question: 'What areas do you serve?', answer: 'Chittety Construction is based in Plano and serves Dallas–Fort Worth directly. Wider product sourcing and freight-supported procurement may be available through our vendor network across the United States.' },
  { question: 'Do you provide emergency support?', answer: 'Urgent requests are reviewed based on location, category, product availability, and service-partner capacity. Contact us by phone for time-sensitive needs, but emergency response cannot be guaranteed.' },
  { question: 'How do vendor relationships help customers?', answer: 'Our vendor network helps us compare availability, identify alternatives, support bulk requirements, match brands and specifications, and coordinate products across multiple construction categories.' },
  { question: 'Do you provide wholesale distribution?', answer: 'Yes. We support wholesale, contractor supply, B2B sourcing, volume requirements, and repeat procurement. Final pricing depends on quantity, vendor terms, freight, and availability.' },
  { question: 'What happens after I submit an inquiry?', answer: 'Our team reviews the requirement, confirms any missing specifications, checks vendor options and availability, and then responds with guidance, next steps, or a quotation.' },
  { question: 'How quickly will I receive a response?', answer: 'Most complete inquiries receive an initial response within one business day. Complex BOQs, special orders, freight requirements, and multi-vendor sourcing may require additional review time.' },
  { question: 'Is the displayed price the final price?', answer: 'No. Prices are reference estimates and may change with market conditions, quantity, brand, specification, tax, freight, delivery, and vendor availability. Only the issued quotation confirms final pricing and validity.' },
];

export function FAQPage() {
  const { navigateTo } = useNavigation();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl">
            Find answers to common questions about our products, services, pricing, delivery, and more.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-text-secondary leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator className="max-w-3xl mx-auto" />

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">Still Have Questions?</h2>
        <p className="text-text-secondary text-sm mb-6">
          Our team is happy to help with any questions not covered here.
        </p>
        <Button
          className="bg-accent hover:bg-accent/90 text-white"
          onClick={() => navigateTo('contact')}
        >
          Contact Us <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </section>
    </main>
  );
}
