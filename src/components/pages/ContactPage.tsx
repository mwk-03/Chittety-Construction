'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CONTACT } from '@/lib/contact';

const CATEGORY_OPTIONS = [
  'Plumbing & Bathroom',
  'Electrical & Wiring',
  'Lighting / HVAC / Pumps',
  'Flooring / Roofing / Building',
  'Hardware / Steel / Tools',
  'Services',
  'Other',
];

const PROJECT_TYPE_OPTIONS = [
  'Residential',
  'Commercial',
  'Industrial',
  'Infrastructure',
  'Renovation',
  'Other',
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  projectType: string;
  category: string;
  sku: string;
  quantity: string;
  deliveryLocation: string;
  message: string;
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Address',
    value: CONTACT.address,
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    href: CONTACT.emailHref,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon – Fri: 8:00 AM – 6:00 PM (CST)',
    href: null,
  },
];

export function ContactPage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [fileName, setFileName] = useState('');

  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    projectType: '',
    category: '',
    sku: '',
    quantity: '',
    deliveryLocation: '',
    message: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast({
        title: 'Required fields',
        description: 'Name and phone are required.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          company_name: form.company,
          product_sku: form.sku,
          category: form.category,
          quantity: form.quantity,
          delivery_location: form.deliveryLocation,
          project_type: form.projectType,
          requirement_type: 'Contact Request',
          source: 'Contact Page',
          message: [form.message, fileName ? `Material list filename: ${fileName}` : ''].filter(Boolean).join('\n'),
          page_url: window.location.href,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to send request');
      }

      const data = await res.json();
      setRequestId(data.request_id);
      setSubmitted(true);
      toast({
        title: 'Thank you. Your inquiry has been sent successfully.',
        description: `Request ID: ${data.request_id}. Our team will contact you soon.`,
      });
    } catch (err) {
      toast({
        title: 'Submission failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Thank You!
          </h1>
          <p className="text-text-secondary mb-2">
            Your inquiry has been sent successfully. Our team will contact you soon.
          </p>
          <p className="font-mono text-sm font-semibold text-foreground mb-2">Request ID: {requestId}</p>
          <p className="text-sm text-text-muted mb-8">
            If your matter is urgent, please call us directly during business hours.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: '', phone: '', email: '', company: '',
                projectType: '', category: '', sku: '', quantity: '',
                deliveryLocation: '', message: '',
              });
              setFileName('');
              setRequestId('');
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl">
            Get in touch with our team for quotes, product inquiries, service requests, or any construction-related needs.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Left Column - Contact Info + Map */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map((info) => (
                <Card key={info.label} className="py-0 overflow-hidden">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0">
                      <info.icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-sm text-foreground hover:text-accent transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{info.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl border border-border bg-muted h-64 flex flex-col items-center justify-center text-text-muted">
              <MapPin className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Google Maps</span>
              <span className="text-xs mt-0.5">Plano, TX 75023</span>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <Card className="py-0 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-1">Request a Quote</h2>
                <p className="text-sm text-text-secondary mb-6">
                  Fill in the details below and our team will get back to you within 24 hours.
                </p>

                <div className="grid gap-5">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="c-name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="c-phone"
                        placeholder="(469) 000-0000"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email">
                        Email
                      </Label>
                      <Input
                        id="c-email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-company">Company Name</Label>
                      <Input
                        id="c-company"
                        placeholder="Company name"
                        value={form.company}
                        onChange={(e) => updateField('company', e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Project Type & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Project Type</Label>
                      <Select
                        value={form.projectType}
                        onValueChange={(val) => updateField('projectType', val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_TYPE_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Product / Service Category</Label>
                      <Select
                        value={form.category}
                        onValueChange={(val) => updateField('category', val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* SKU & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-sku">SKU / Product Code</Label>
                      <Input
                        id="c-sku"
                        placeholder="e.g. CC-PLB-0001"
                        value={form.sku}
                        onChange={(e) => updateField('sku', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-qty">Quantity</Label>
                      <Input
                        id="c-qty"
                        type="number"
                        min={1}
                        placeholder="1"
                        value={form.quantity}
                        onChange={(e) => updateField('quantity', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div className="space-y-1.5">
                    <Label htmlFor="c-location">Delivery Location</Label>
                    <Input
                      id="c-location"
                      placeholder="Address or zip code"
                      value={form.deliveryLocation}
                      onChange={(e) => updateField('deliveryLocation', e.target.value)}
                    />
                  </div>

                  {/* Upload Material List */}
                  <div className="space-y-1.5">
                    <Label>Upload Material List</Label>
                    <div className="border border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="w-5 h-5 text-text-muted mx-auto mb-1.5" />
                      {fileName ? (
                        <p className="text-sm text-foreground">{fileName}</p>
                      ) : (
                        <p className="text-sm text-text-muted">
                          Click to upload or drag and drop
                        </p>
                      )}
                      <p className="text-xs text-text-muted mt-1">PDF, XLS, XLSX, DOC, DOCX (max 10MB)</p>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer sr-only"
                        accept=".pdf,.xls,.xlsx,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFileName(file.name);
                        }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="c-message">Message</Label>
                    <Textarea
                      id="c-message"
                      placeholder="Tell us about your project requirements, specifications, or any other details..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white h-10 px-8"
                    >
                      {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                      {submitting ? 'Sending request...' : 'Submit Quote Request'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
