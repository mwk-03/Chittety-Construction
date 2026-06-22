'use client';

import { useState, useEffect, useRef } from 'react';
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
import { Loader2, Upload, X } from 'lucide-react';
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

const REQUIREMENT_TYPE_OPTIONS = [
  'Standard Order',
  'Bulk Supply',
  'Custom/Bespoke',
  'Urgent Delivery',
  'Site Inspection Needed',
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
  productName: string;
  brand: string;
  quantity: string;
  deliveryLocation: string;
  requirementType: string;
  message: string;
}

export function QuoteDialog() {
  const { quoteDialogOpen, closeQuoteDialog, quotePrefill } = useNavigation();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const materialListRef = useRef<HTMLInputElement>(null);
  const sitePhotoRef = useRef<HTMLInputElement>(null);
  const [materialFileName, setMaterialFileName] = useState('');
  const [sitePhotoFileName, setSitePhotoFileName] = useState('');

  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    projectType: '',
    category: '',
    sku: '',
    productName: '',
    brand: '',
    quantity: '',
    deliveryLocation: '',
    requirementType: '',
    message: '',
  });

  useEffect(() => {
    if (quoteDialogOpen && quotePrefill) {
      setForm((prev) => ({
        ...prev,
        sku: quotePrefill.sku || '',
        productName: quotePrefill.productName || '',
        category: quotePrefill.category || '',
        brand: quotePrefill.brand || '',
        message: quotePrefill.productName
          ? `Interested in: ${quotePrefill.productName}${quotePrefill.brand ? ` by ${quotePrefill.brand}` : ''}`
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
        productName: '',
        brand: '',
        quantity: '',
        deliveryLocation: '',
        requirementType: '',
        message: '',
      });
    }
    // Reset file names when dialog opens
    setMaterialFileName('');
    setSitePhotoFileName('');
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
        description: 'We will get back to you within 24 hours.',
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

  const handleFileChange = (type: 'material' | 'site', files: FileList | null) => {
    if (!files || files.length === 0) return;
    // Store filename for display; actual upload requires backend storage (pending)
    if (type === 'material') {
      setMaterialFileName(files[0].name);
    } else {
      setSitePhotoFileName(files[0].name);
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
            Fill in the details below and our team will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Prefilled Product Info (read-only) */}
          {form.sku && (
            <div className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-3 space-y-1">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <div>
                  <span className="text-[#9CA3AF]">SKU: </span>
                  <span className="font-mono font-medium text-[#374151]">{form.sku}</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF]">Brand: </span>
                  <span className="font-medium text-[#374151]">{form.brand || '—'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#9CA3AF]">Product: </span>
                  <span className="font-medium text-[#374151]">{form.productName || '—'}</span>
                </div>
              </div>
            </div>
          )}

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
              <Label htmlFor="q-company">Company Name</Label>
              <Input
                id="q-company"
                placeholder="Company name"
                value={form.company}
                onChange={(e) => updateField('company', e.target.value)}
              />
            </div>
          </div>

          {/* Project Type & Requirement Type */}
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
              <Label>Requirement Type</Label>
              <Select
                value={form.requirementType}
                onValueChange={(val) => updateField('requirementType', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {REQUIREMENT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category & SKU (if not prefilled) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {/* Upload Material List */}
          <div className="space-y-1.5">
            <Label>Upload Material List (optional)</Label>
            <div
              onClick={() => materialListRef.current?.click()}
              className="flex items-center gap-2 rounded-md border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-3 py-2.5 cursor-pointer hover:border-[#9CA3AF] transition-colors text-xs text-[#6B7280]"
            >
              <Upload className="size-3.5 text-[#9CA3AF]" />
              {materialFileName ? (
                <span className="flex-1 truncate text-[#374151] font-medium">{materialFileName}</span>
              ) : (
                <span>Click to upload material list (PDF, Excel, images)</span>
              )}
              {materialFileName && <X className="size-3 text-[#9CA3AF]" onClick={(e) => { e.stopPropagation(); setMaterialFileName(''); }} />}
            </div>
            <input
              ref={materialListRef}
              type="file"
              className="hidden"
              accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange('material', e.target.files)}
            />
          </div>

          {/* Upload Site Photo */}
          <div className="space-y-1.5">
            <Label>Upload Site Photo (optional)</Label>
            <div
              onClick={() => sitePhotoRef.current?.click()}
              className="flex items-center gap-2 rounded-md border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-3 py-2.5 cursor-pointer hover:border-[#9CA3AF] transition-colors text-xs text-[#6B7280]"
            >
              <Upload className="size-3.5 text-[#9CA3AF]" />
              {sitePhotoFileName ? (
                <span className="flex-1 truncate text-[#374151] font-medium">{sitePhotoFileName}</span>
              ) : (
                <span>Click to upload site photo (JPG, PNG)</span>
              )}
              {sitePhotoFileName && <X className="size-3 text-[#9CA3AF]" onClick={(e) => { e.stopPropagation(); setSitePhotoFileName(''); }} />}
            </div>
            <input
              ref={sitePhotoRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange('site', e.target.files)}
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
            className="bg-[#C8A44D] hover:bg-[#B8943F] text-white"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            Submit Quote Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}