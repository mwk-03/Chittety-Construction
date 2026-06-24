import type { Metadata } from 'next';
import { LegalPolicyPage } from '@/components/legal/LegalPolicyPage';
import { LEGAL_POLICIES } from '@/lib/legal-policies';

export const metadata: Metadata = { title: 'Service Disclaimer | Chittety Construction', description: LEGAL_POLICIES.service.description };
export default function Page() { return <LegalPolicyPage policy={LEGAL_POLICIES.service} />; }
