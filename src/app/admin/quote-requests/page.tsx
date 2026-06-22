'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, X, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuoteRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  projectType: string;
  category: string;
  sku: string;
  quantity: number;
  deliveryLocation: string;
  requirementType: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'In Review', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'Quoted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'Closed', color: 'bg-gray-50 text-gray-600 border-gray-200' },
];

function getStatusColor(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.color || 'bg-gray-50 text-gray-600 border-gray-200';
}

export default function AdminQuoteRequests() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      params.set('page', String(page));
      params.set('limit', '25');

      const res = await fetch(`/api/quote?${params.toString()}`);
      const data = await res.json();

      setQuotes(data.quotes || []);
      setTotal(data.total || 0);
    } catch {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await fetch('/api/quote', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
    } catch {
      // Handle error
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Quote Requests</h1>
          <p className="text-sm text-[#6B7280] mt-1">{total} total inquiries</p>
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === 'all' ? '' : v); setPage(1); }}>
            <SelectTrigger className="w-36 h-9 text-sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Product</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden lg:table-cell">Qty</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden xl:table-cell">Location</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3"><div className="h-3 w-8 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3"><div className="h-3 w-24 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3"><div className="h-3 w-28 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="h-3 w-32 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><div className="h-3 w-10 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3 hidden xl:table-cell"><div className="h-3 w-24 bg-[#F3F4F6] rounded" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-16 bg-[#F3F4F6] rounded mx-auto" /></td>
                    <td className="px-4 py-3"><div className="h-7 w-7 bg-[#F3F4F6] rounded mx-auto" /></td>
                  </tr>
                ))
              ) : quotes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-[#6B7280]">
                    {statusFilter ? 'No quote requests with this status' : 'No quote requests yet'}
                  </td>
                </tr>
              ) : (
                quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#6B7280]">QR-{String(q.id).padStart(4, '0')}</td>
                    <td className="px-4 py-3 text-xs text-[#6B7280]">{formatDate(q.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#111827] text-xs">{q.name}</div>
                      <div className="text-[11px] text-[#9CA3AF]">{q.phone}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-xs text-[#111827]">{q.sku || '—'}</div>
                      <div className="text-[11px] text-[#9CA3AF] truncate max-w-[150px]">{q.category}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6B7280] hidden lg:table-cell">{q.quantity}</td>
                    <td className="px-4 py-3 text-xs text-[#6B7280] hidden xl:table-cell truncate max-w-[120px]">{q.deliveryLocation || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <Select value={q.status} onValueChange={(v) => handleStatusChange(q.id, v)}>
                        <SelectTrigger className={`h-6 w-24 text-[10px] font-medium border ${getStatusColor(q.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="inline-flex items-center justify-center size-7 rounded-md hover:bg-[#F3F4F6] transition-colors"
                        title="View details"
                      >
                        <Eye className="size-3.5 text-[#6B7280]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedQuote} onOpenChange={(o) => !o && setSelectedQuote(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quote Request QR-{String(selectedQuote?.id || 0).padStart(4, '0')}</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-[#9CA3AF]">Name: </span><span className="font-medium text-[#111827]">{selectedQuote.name}</span></div>
                <div><span className="text-[#9CA3AF]">Phone: </span><span className="font-medium text-[#111827]">{selectedQuote.phone}</span></div>
                <div><span className="text-[#9CA3AF]">Email: </span><span className="font-medium text-[#111827]">{selectedQuote.email}</span></div>
                <div><span className="text-[#9CA3AF]">Company: </span><span className="font-medium text-[#111827]">{selectedQuote.company || '—'}</span></div>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-3 text-sm border-t border-[#E5E7EB] pt-4">
                <div><span className="text-[#9CA3AF]">SKU: </span><span className="font-mono font-medium text-[#111827]">{selectedQuote.sku || '—'}</span></div>
                <div><span className="text-[#9CA3AF]">Quantity: </span><span className="font-medium text-[#111827]">{selectedQuote.quantity}</span></div>
                <div><span className="text-[#9CA3AF]">Category: </span><span className="font-medium text-[#111827]">{selectedQuote.category || '—'}</span></div>
                <div><span className="text-[#9CA3AF]">Project Type: </span><span className="font-medium text-[#111827]">{selectedQuote.projectType || '—'}</span></div>
                <div><span className="text-[#9CA3AF]">Req. Type: </span><span className="font-medium text-[#111827]">{selectedQuote.requirementType || '—'}</span></div>
                <div><span className="text-[#9CA3AF]">Location: </span><span className="font-medium text-[#111827]">{selectedQuote.deliveryLocation || '—'}</span></div>
              </div>

              {/* Status */}
              <div className="border-t border-[#E5E7EB] pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#9CA3AF]">Status:</span>
                  <Select
                    value={selectedQuote.status}
                    onValueChange={(v) => {
                      handleStatusChange(selectedQuote.id, v);
                      setSelectedQuote({ ...selectedQuote, status: v });
                    }}
                  >
                    <SelectTrigger className="w-36 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              {selectedQuote.message && (
                <div className="border-t border-[#E5E7EB] pt-4">
                  <p className="text-sm text-[#9CA3AF] mb-1">Message:</p>
                  <p className="text-sm text-[#111827] bg-[#F9FAFB] rounded-md p-3">{selectedQuote.message}</p>
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-[#9CA3AF]">Submitted: {formatDate(selectedQuote.createdAt)}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}