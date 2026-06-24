'use client';

import { useState } from 'react';
import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  Blocks,
  HelpCircle,
  Shield,
  Truck,
  HeadphonesIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

type ResourceKey = 'construction' | 'materials' | 'warranty' | 'delivery' | 'support';

const RESOURCES = [
  {
    key: 'construction' as const,
    icon: BookOpen,
    title: 'Construction Guides',
    description: 'Detailed guides covering plumbing, electrical, flooring, roofing, waterproofing, building materials, procurement planning, and construction best practices.',
    button: 'View Construction Guides',
  },
  {
    key: 'materials' as const,
    icon: Blocks,
    title: 'Material Selection Guides',
    description: 'Compare materials, understand specifications, review use cases, and choose suitable products for residential, commercial, and project-based requirements.',
    button: 'View Material Guides',
  },
  {
    key: 'faq' as const,
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Find answers to common questions about pricing, products, services, delivery, warranty, wholesale supply, vendor sourcing, and quote requests.',
    button: 'View FAQ',
  },
  {
    key: 'warranty' as const,
    icon: Shield,
    title: 'Warranty Information',
    description: 'Understand manufacturer warranties, documentation requirements, claim processes, service warranty limitations, and product coverage basics.',
    button: 'View Warranty Details',
  },
  {
    key: 'delivery' as const,
    icon: Truck,
    title: 'Delivery Information',
    description: 'Learn about local delivery, freight coordination, project-site delivery, damage reporting, customer responsibilities, and order scheduling.',
    button: 'View Delivery Details',
  },
  {
    key: 'support' as const,
    icon: HeadphonesIcon,
    title: 'Support Center',
    description: 'Get help with product inquiries, quote requests, vendor sourcing, delivery support, warranty questions, services, and procurement assistance.',
    button: 'Visit Support Center',
  },
];

const RESOURCE_DETAILS: Record<Exclude<ResourceKey, 'support'>, {
  title: string;
  heading: string;
  intro: string;
  sections: { title: string; text: string; points: string[] }[];
  cta: string;
}> = {
  construction: {
    title: 'Construction Guides',
    heading: 'Practical Construction Knowledge for Better Project Decisions',
    intro: 'These guides help homeowners, contractors, builders, facility managers, and project teams understand essential construction topics before selecting materials or requesting services.',
    sections: [
      { title: 'Plumbing System Planning', text: 'Plan pipe type, pressure requirements, fixture demand, drainage, access, and maintenance before ordering materials.', points: ['Confirm local code and approved pipe material', 'Match fittings, valves, and joining systems', 'Allow service access for future maintenance'] },
      { title: 'Electrical Planning', text: 'Electrical material selection should follow load calculations, circuit requirements, environmental conditions, and applicable code.', points: ['Use correctly rated wire and protection devices', 'Separate indoor, outdoor, and wet-location products', 'Have final work reviewed by a qualified electrician'] },
      { title: 'Flooring and Tile Planning', text: 'Substrate condition, room use, moisture, traffic, slip resistance, finish, and installation system all affect flooring performance.', points: ['Measure area and include a waste allowance', 'Select compatible adhesive, grout, and trims', 'Verify moisture and surface preparation needs'] },
      { title: 'Roofing and Waterproofing', text: 'Successful systems depend on drainage, slope, substrate preparation, compatible membranes, flashing, and correct detailing.', points: ['Identify leak paths before material selection', 'Use complete compatible systems', 'Follow cure time and weather requirements'] },
      { title: 'Building Materials and Structural Considerations', text: 'Structural and envelope materials must match design requirements, loading, exposure, durability, and project specifications.', points: ['Verify grades, dimensions, and standards', 'Coordinate with approved drawings', 'Use qualified professionals for structural decisions'] },
      { title: 'Procurement Guide', text: 'Good procurement starts with a clear material list, specifications, quantities, delivery sequence, and approved alternatives.', points: ['Share BOQ or itemized requirements', 'Confirm lead times and availability', 'Plan staged delivery for site conditions'] },
    ],
    cta: 'Need Help Choosing Construction Materials?',
  },
  materials: {
    title: 'Material Selection Guides',
    heading: 'Choose the Right Materials for Every Construction Requirement',
    intro: 'The right material can improve durability, reduce maintenance, control costs, improve safety, and support long-term project performance.',
    sections: [
      { title: 'How to Select Plumbing Materials', text: 'Compare pressure rating, temperature, water quality, application, joining method, and code acceptance.', points: ['Match pipe and fitting standards', 'Check potable-water approval where needed', 'Consider maintenance and replacement access'] },
      { title: 'How to Select Electrical Materials', text: 'Choose products based on voltage, current, insulation, enclosure rating, conductor material, and installation environment.', points: ['Confirm circuit load and wire size', 'Use listed products for the application', 'Select suitable panels and protective devices'] },
      { title: 'How to Select Flooring Materials', text: 'Balance appearance with traffic, moisture, cleaning, slip resistance, installation, and lifecycle cost.', points: ['Review wear and water-resistance ratings', 'Confirm substrate compatibility', 'Order consistent batches where appearance matters'] },
      { title: 'Roofing and Waterproofing Materials', text: 'Select systems based on roof type, slope, climate, movement, UV exposure, and drainage conditions.', points: ['Use compatible primer and membrane systems', 'Detail penetrations and terminations', 'Review warranty installation conditions'] },
      { title: 'Hardware and Tools', text: 'Match grade, material, finish, capacity, frequency of use, safety requirements, and replacement availability.', points: ['Check load and duty ratings', 'Choose corrosion resistance for exposure', 'Use appropriate safety equipment'] },
      { title: 'Cost Considerations', text: 'Compare delivered cost, installation needs, waste, maintenance, expected service life, and warranty—not purchase price alone.', points: ['Request equivalent alternatives', 'Account for freight and lead time', 'Evaluate whole-life value'] },
    ],
    cta: 'Unsure Which Material to Choose?',
  },
  warranty: {
    title: 'Warranty Information',
    heading: 'Understanding Product and Service Warranty Coverage',
    intro: 'Warranty coverage depends on product type, manufacturer, vendor, installation method, application, usage conditions, and supporting documentation.',
    sections: [
      { title: 'Manufacturer Warranty', text: 'Most product warranties are issued and administered by the manufacturer under product-specific terms.', points: ['Coverage periods vary', 'Registration may be required', 'Manufacturer decisions govern claims'] },
      { title: 'What Warranty May Cover', text: 'Eligible manufacturing defects, premature component failure, or documented performance issues may be covered.', points: ['Coverage may be repair or replacement', 'Labor and freight may be excluded', 'Proof of defect is usually required'] },
      { title: 'What Warranty Usually Does Not Cover', text: 'Incorrect installation, misuse, normal wear, site conditions, unauthorized modification, or missing maintenance are commonly excluded.', points: ['Follow installation instructions', 'Use qualified installers', 'Retain maintenance records'] },
      { title: 'Documentation Required', text: 'Keep invoices, product codes, serial numbers, installation records, photographs, and a clear issue description.', points: ['Report issues promptly', 'Do not discard damaged components', 'Provide requested technical evidence'] },
      { title: "Chittety Construction's Role", text: 'We help identify the supplying vendor, organize available documents, and coordinate communication where applicable.', points: ['We do not replace manufacturer terms', 'Claim outcomes are not guaranteed', 'Support depends on available records'] },
      { title: 'Service Warranty Note', text: 'Service warranty terms are set by the responsible service provider and should be confirmed in the final quotation.', points: ['Confirm scope before work starts', 'Report concerns within the stated period', 'Changes by others may affect coverage'] },
    ],
    cta: 'Need Help With a Warranty Question?',
  },
  delivery: {
    title: 'Delivery Information',
    heading: 'Material Delivery, Freight Coordination & Project Supply Support',
    intro: 'Delivery depends on availability, vendor location, order size, weight, distance, freight requirements, site access, and scheduling.',
    sections: [
      { title: 'Local Delivery Support', text: 'Local Dallas–Fort Worth delivery may be coordinated for eligible products and orders.', points: ['Share the complete delivery address', 'Confirm contact and receiving hours', 'Advise access restrictions in advance'] },
      { title: 'Large Order and Freight Delivery', text: 'Bulk, palletized, oversized, or out-of-area orders may require common-carrier or dedicated freight.', points: ['Freight charges are quoted separately', 'Liftgate or unloading needs must be stated', 'Split shipments may be recommended'] },
      { title: 'Delivery Timelines', text: 'Timelines are estimates based on vendor readiness, carrier availability, distance, and project scheduling.', points: ['Confirm urgent requirements before ordering', 'Allow time for special-order products', 'Weather and carrier delays may occur'] },
      { title: 'Customer Responsibilities', text: 'Customers must provide safe access, an authorized receiver, suitable unloading arrangements, and prompt inspection.', points: ['Verify quantities at receipt', 'Note visible issues on delivery records', 'Store materials appropriately'] },
      { title: 'Damaged or Missing Items', text: 'Report damage or shortages immediately with order details and clear photographs so available carrier or vendor remedies can be reviewed.', points: ['Preserve packaging', 'Document the delivery condition', 'Do not install visibly damaged items'] },
      { title: 'Delivery Disclaimer', text: 'Delivery dates are not guaranteed until confirmed, and final cost and availability may change with order details.', points: ['Site delays may create added charges', 'Customer unloading may be required', 'Final terms appear on the quotation'] },
    ],
    cta: 'Need Materials Delivered to Your Project Site?',
  },
};

function ResourceDetail({ resource, onBack }: { resource: ResourceKey; onBack: () => void }) {
  const { openQuoteDialog, navigateTo } = useNavigation();
  const [supportForm, setSupportForm] = useState({ name: '', phone: '', email: '', company: '', code: '', quantity: '', location: '', category: 'Product Inquiry', message: '' });
  const [supportSending, setSupportSending] = useState(false);
  const [supportResult, setSupportResult] = useState('');

  const sendSupportRequest = async () => {
    setSupportSending(true);
    setSupportResult('');
    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: supportForm.name, phone: supportForm.phone, email: supportForm.email,
          company_name: supportForm.company, product_sku: supportForm.code,
          quantity: supportForm.quantity, delivery_location: supportForm.location,
          requirement_type: supportForm.category, source: 'Support Center',
          message: supportForm.message, page_url: window.location.href,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send support request.');
      setSupportResult(`Thank you. Your inquiry has been sent successfully. Request ID: ${data.request_id}. Our team will contact you soon.`);
      setSupportForm({ name: '', phone: '', email: '', company: '', code: '', quantity: '', location: '', category: 'Product Inquiry', message: '' });
    } catch (error) {
      setSupportResult(error instanceof Error ? error.message : 'Unable to send support request.');
    } finally {
      setSupportSending(false);
    }
  };

  if (resource === 'support') {
    return (
      <main className="min-h-screen bg-background">
        <ResourceHeader title="Support Center" heading="Get Help With Products, Services, Quotes, Warranty, Delivery & Procurement" onBack={onBack} />
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-text-secondary leading-relaxed mb-8">Use this support form for product inquiries, quote requests, bulk orders, vendor sourcing, warranty, delivery, services, BOQ review, and procurement assistance.</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2"><Label>Name</Label><Input value={supportForm.name} onChange={(event) => setSupportForm((form) => ({ ...form, name: event.target.value }))} placeholder="Name" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={supportForm.phone} onChange={(event) => setSupportForm((form) => ({ ...form, phone: event.target.value }))} placeholder="Phone" /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={supportForm.email} onChange={(event) => setSupportForm((form) => ({ ...form, email: event.target.value }))} placeholder="Email" /></div>
            <div className="space-y-2"><Label>Company Name</Label><Input value={supportForm.company} onChange={(event) => setSupportForm((form) => ({ ...form, company: event.target.value }))} placeholder="Company Name" /></div>
            <div className="space-y-2"><Label>Product Code / Service Code</Label><Input value={supportForm.code} onChange={(event) => setSupportForm((form) => ({ ...form, code: event.target.value }))} placeholder="Product Code / Service Code" /></div>
            <div className="space-y-2"><Label>Quantity</Label><Input value={supportForm.quantity} onChange={(event) => setSupportForm((form) => ({ ...form, quantity: event.target.value }))} placeholder="Quantity" /></div>
            <div className="space-y-2"><Label>Delivery Location</Label><Input value={supportForm.location} onChange={(event) => setSupportForm((form) => ({ ...form, location: event.target.value }))} placeholder="Delivery Location" /></div>
            <div className="space-y-2"><Label>Support Category</Label><select value={supportForm.category} onChange={(event) => setSupportForm((form) => ({ ...form, category: event.target.value }))} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option>Product Inquiry</option><option>Quote Request</option><option>Bulk Order Support</option><option>Vendor Sourcing Support</option><option>Warranty Inquiry</option><option>Delivery Support</option><option>Service Request</option><option>Project Procurement Assistance</option></select></div>
            <div className="space-y-2"><Label>Upload Material List</Label><Input type="file" /></div>
            <div className="space-y-2"><Label>Upload Photos</Label><Input type="file" /></div>
            <div className="sm:col-span-2 space-y-2"><Label>Message</Label><Textarea value={supportForm.message} onChange={(event) => setSupportForm((form) => ({ ...form, message: event.target.value }))} rows={5} placeholder="Tell us how we can help" /></div>
          </div>
          {supportResult && <p className="mt-5 rounded-md border border-border bg-muted/50 p-3 text-sm text-foreground">{supportResult}</p>}
          <div className="mt-6 flex flex-wrap gap-3"><Button disabled={supportSending} className="bg-accent text-white hover:bg-accent/90" onClick={sendSupportRequest}>{supportSending ? 'Sending request...' : 'Request Support'}</Button><Button variant="outline" onClick={() => navigateTo('contact')}>Contact Chittety Construction</Button></div>
        </section>
      </main>
    );
  }

  const detail = RESOURCE_DETAILS[resource];
  return (
    <main className="min-h-screen bg-background">
      <ResourceHeader title={detail.title} heading={detail.heading} onBack={onBack} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-base text-text-secondary leading-relaxed mb-10">{detail.intro}</p>
        <div className="space-y-6">
          {detail.sections.map((section) => (
            <Card key={section.title} className="py-0"><CardContent className="p-6"><h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2><p className="text-sm text-text-secondary leading-relaxed mb-4">{section.text}</p><ul className="space-y-2">{section.points.map((point) => <li key={point} className="flex gap-2 text-sm text-text-secondary"><CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />{point}</li>)}</ul></CardContent></Card>
          ))}
        </div>
        <Card className="mt-10 py-0 bg-foreground text-white"><CardContent className="p-8"><h2 className="text-2xl font-bold mb-3">{detail.cta}</h2><p className="text-white/70 mb-6">Share your requirement, product code, material list, project type, delivery location, or specification for sourcing and quotation support.</p><div className="flex flex-wrap gap-3"><Button className="bg-accent text-white hover:bg-accent/90" onClick={() => openQuoteDialog({ source: resource === 'warranty' ? 'Warranty Information' : resource === 'delivery' ? 'Delivery Information' : 'Resource Guide', requirementType: resource === 'warranty' ? 'Warranty Inquiry' : resource === 'delivery' ? 'Delivery Support' : 'Material List Support' })}>Request Guidance</Button><Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white" onClick={() => navigateTo('products')}>Browse Products</Button></div></CardContent></Card>
      </section>
    </main>
  );
}

function ResourceHeader({ title, heading, onBack }: { title: string; heading: string; onBack: () => void }) {
  return <section className="border-b border-border bg-white"><div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16"><button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground mb-6"><ArrowLeft className="size-4" />Back to Resources</button><p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{title}</p><h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{heading}</h1></div></section>;
}

export function ResourcesPage() {
  const { navigateTo } = useNavigation();
  const [selectedResource, setSelectedResource] = useState<ResourceKey | null>(null);

  if (selectedResource) return <ResourceDetail resource={selectedResource} onBack={() => setSelectedResource(null)} />;

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-white"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"><h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Resources</h1><p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl">Practical guides, policy details, and direct support for construction professionals, homeowners, and project teams.</p></div></section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {RESOURCES.map((resource) => (
            <Card key={resource.title} className="py-0 overflow-hidden group transition-shadow hover:shadow-md cursor-pointer" onClick={() => resource.key === 'faq' ? navigateTo('faq') : setSelectedResource(resource.key)}>
              <CardContent className="p-6 h-full flex flex-col"><div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors mb-4"><resource.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" /></div><h3 className="font-semibold text-foreground text-base mb-2">{resource.title}</h3><p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">{resource.description}</p><span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">{resource.button}<ArrowRight className="w-4 h-4" /></span></CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
