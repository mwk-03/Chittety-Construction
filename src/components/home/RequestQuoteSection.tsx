'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const projectTypes = [
  'Residential',
  'Commercial',
  'Industrial',
  'Infrastructure',
  'Renovation',
  'Other',
];

const categories = [
  'Plumbing & Bathroom',
  'Electrical & Wiring',
  'Flooring & Tiles',
  'Roofing & Waterproofing',
  'Steel & Fabrication',
  'Building Materials',
  'Hardware & Tools',
  'Pumps & Water Systems',
  'Lighting & Fans',
  'Kitchen & Modular',
  'Site Equipment & Safety',
  'Other',
];

export default function RequestQuoteSection() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    category: '',
    quantity: '',
    location: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult('');
    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, phone: formData.phone, email: formData.email,
          project_type: formData.projectType, category: formData.category,
          quantity: formData.quantity, delivery_location: formData.location,
          message: formData.message, source: 'Home Quote Section',
          requirement_type: 'Quote Request', page_url: window.location.href,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send request.');
      setResult(`Thank you. Your inquiry has been sent successfully. Request ID: ${data.request_id}. Our team will contact you soon.`);
      setFormData({ name: '', phone: '', email: '', projectType: '', category: '', quantity: '', location: '', message: '' });
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'Unable to send request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Request a Quote
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Tell us about your project and we&apos;ll get back to you with
            competitive pricing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quote-name">Name</Label>
              <Input
                id="quote-name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-phone">Phone</Label>
              <Input
                id="quote-phone"
                type="tel"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="quote-email">Email</Label>
              <Input
                id="quote-email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-project">Project Type</Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => handleChange('projectType', value)}
                required
              >
                <SelectTrigger id="quote-project" className="w-full">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-category">Product / Service Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
                required
              >
                <SelectTrigger id="quote-category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-quantity">Quantity</Label>
              <Input
                id="quote-quantity"
                placeholder="e.g. 500 units"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-location">Delivery Location</Label>
              <Input
                id="quote-location"
                placeholder="City, State or ZIP"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="quote-message">Message</Label>
              <Textarea
                id="quote-message"
                placeholder="Tell us about your project requirements..."
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8">
            {result && <p className="mb-4 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-3 text-sm text-[#374151]">{result}</p>}
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 bg-[#C8A44D] px-8 text-white hover:bg-[#B8943F] focus-visible:ring-[#C8A44D]/50"
            >
              {submitting ? 'Sending request...' : 'Submit Quote Request'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
