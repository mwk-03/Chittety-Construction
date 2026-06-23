'use client';

import { useNavigation } from '@/store/navigation';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

export function MobileStickyBar() {
  const { openQuoteDialog } = useNavigation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around py-2 px-2">
        {/* Call Button */}
        <a
          href={CONTACT.phoneHref}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-md active:bg-muted transition-colors"
        >
          <Phone className="size-5 text-primary" />
          <span className="text-[10px] font-medium text-muted-foreground">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-md active:bg-muted transition-colors"
        >
          <MessageCircle className="size-5 text-green-600" />
          <span className="text-[10px] font-medium text-muted-foreground">WhatsApp</span>
        </a>

        {/* Request Quote Button */}
        <button
          onClick={() => openQuoteDialog({ source: 'Mobile Sticky Bar', requirementType: 'Quote Request' })}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-md active:bg-muted transition-colors"
        >
          <FileText className="size-5 text-accent" />
          <span className="text-[10px] font-medium text-muted-foreground">
            Quote
          </span>
        </button>
      </div>
    </div>
  );
}
