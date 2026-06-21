'use client';

import { useState, useEffect } from 'react';
import { useNavigation } from '@/store/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export function QuoteDialog() {
  const { quoteDialogOpen, closeQuoteDialog, quotePrefill } = useNavigation();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

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

  // Prefill form when dialog opens with product data
  useEffect(() => {
    if (quoteDialogOpen && quotePrefill) {
      setForm((prev) => ({
        ...prev,
        sku: quotePrefill.sku || '',
        category: quotePrefill.category || '',
        message: quotePrefill.productName
          ? `Interested in: ${quotePrefill.productName}`
          : prev.message,
      }));
    }
    if (quoteDialogOpen && !quotePrefill) {
      setForm({
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
    }
  }, [quoteDialogOpen, quotePrefill]);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast({
        title: 'Required fields',
        description: 'Name, phone, and email are required.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantity: parseInt(form.quantity) || 1,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      toast({
        title: 'Quote request submitted',
        description: 'We will get back to you shortly.',
      });
      closeQuoteDialog();
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

  return (
    <Dialog open={quoteDialogOpen} onOpenChange={(open) => !open && closeQuoteDialog()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">
            Request a Quote
          </DialogTitle>
          <DialogDescription>
            Fill in the details below and our team will get back to you within 24
            hours.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="q-name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="q-name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="q-phone"
                placeholder="(469) 000-0000"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Email & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="q-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="q-email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-company">Company</Label>
              <Input
                id="q-company"
                placeholder="Company name"
                value={form.company}
                onChange={(e) => updateField('company', e.target.value)}
              />
            </div>
          </div>

          {/* Project Type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) => updateField('category', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SKU & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="q-sku">SKU</Label>
              <Input
                id="q-sku"
                placeholder="e.g. CC-PLB-0001"
                value={form.sku}
                onChange={(e) => updateField('sku', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-qty">Quantity</Label>
              <Input
                id="q-qty"
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
            <Label htmlFor="q-location">Delivery Location</Label>
            <Input
              id="q-location"
              placeholder="Address or zip code"
              value={form.deliveryLocation}
              onChange={(e) => updateField('deliveryLocation', e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <Label htmlFor="q-message">Message</Label>
            <Textarea
              id="q-message"
              placeholder="Tell us about your project requirements..."
              rows={3}
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={closeQuoteDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-accent hover:bg-accent/90 text-white"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            Submit Quote Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}