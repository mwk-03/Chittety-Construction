import type { Metadata } from 'next';
import { LegalPolicyPage } from '@/components/legal/LegalPolicyPage';
import { LEGAL_POLICIES } from '@/lib/legal-policies';

export const metadata: Metadata = { title: 'Product Disclaimer | Chittety Construction', description: LEGAL_POLICIES.product.description };
export default function Page() { return <LegalPolicyPage policy={LEGAL_POLICIES.product} />; }
