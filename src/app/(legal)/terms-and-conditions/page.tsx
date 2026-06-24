import type { Metadata } from 'next';
import { LegalPolicyPage } from '@/components/legal/LegalPolicyPage';
import { LEGAL_POLICIES } from '@/lib/legal-policies';

export const metadata: Metadata = { title: 'Terms & Conditions | Chittety Construction', description: LEGAL_POLICIES.terms.description };
export default function Page() { return <LegalPolicyPage policy={LEGAL_POLICIES.terms} />; }
