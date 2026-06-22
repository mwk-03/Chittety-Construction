'use client';

import { Settings } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Settings</h1>
        <p className="text-sm text-[#6B7280] mt-1">Admin panel configuration</p>
      </div>

      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-[#111827] mb-1">Storage & Persistence</h2>
          <p className="text-sm text-[#6B7280]">
            Currently using local SQLite database. For production, connect Supabase or PostgreSQL for persistent cloud storage, authentication, and file uploads.
          </p>
        </div>

        <div className="border-t border-[#E5E7EB] pt-4">
          <h2 className="text-base font-semibold text-[#111827] mb-1">Pending Production Steps</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="text-[#C8A44D] font-bold mt-0.5">1.</span>
              Connect Supabase or PostgreSQL for cloud persistence
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C8A44D] font-bold mt-0.5">2.</span>
              Implement admin authentication (email/password or SSO)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C8A44D] font-bold mt-0.5">3.</span>
              Enable file uploads for material lists and site photos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C8A44D] font-bold mt-0.5">4.</span>
              Configure email notifications for new quote requests
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C8A44D] font-bold mt-0.5">5.</span>
              Set up product image upload system when ready
            </li>
          </ul>
        </div>

        <div className="border-t border-[#E5E7EB] pt-4">
          <h2 className="text-base font-semibold text-[#111827] mb-1">Demo Mode</h2>
          <p className="text-sm text-[#6B7280]">
            Admin panel is running in demo mode. Quote requests submitted from the website are stored in the local SQLite database and visible in the Quote Requests section.
          </p>
        </div>
      </div>
    </div>
  );
}