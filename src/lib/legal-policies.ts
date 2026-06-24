import { CONTACT } from '@/lib/contact';

export type LegalPolicy = {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const LEGAL_LINKS = [
  { title: 'Privacy Policy', href: '/privacy-policy' },
  { title: 'Terms & Conditions', href: '/terms-and-conditions' },
  { title: 'Refund & Return Policy', href: '/refund-return-policy' },
  { title: 'Shipping & Delivery Policy', href: '/shipping-delivery-policy' },
  { title: 'Warranty Policy', href: '/warranty-policy' },
  { title: 'Product Disclaimer', href: '/product-disclaimer' },
  { title: 'Service Disclaimer', href: '/service-disclaimer' },
  { title: 'Cookie Policy', href: '/cookie-policy' },
  { title: 'Accessibility Statement', href: '/accessibility-statement' },
] as const;

const contactText = `Chittety Construction, ${CONTACT.address}, United States. Phone: ${CONTACT.phoneDisplay}. Email: ${CONTACT.email}.`;

export const LEGAL_POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How Chittety Construction collects, uses, protects, and shares information.',
    sections: [
      { title: 'Introduction', paragraphs: ['Chittety Construction respects your privacy and is committed to protecting the personal information you share with us through our website, inquiry forms, quote request forms, support forms, email communications, phone calls, and other contact methods.', 'This Privacy Policy explains what information we collect, how we use it, how we protect it, and how you may contact us regarding your information.'] },
      { title: 'Information We Collect', paragraphs: ['We may collect the following information when you submit a form, request a quote, contact us, or interact with the website:'], bullets: ['Name', 'Phone number', 'Email address', 'Company name', 'Delivery location', 'Project type', 'Product or service category', 'Product SKU or product name', 'Quantity requirement', 'Message or inquiry details', 'Uploaded material lists or site photos, if enabled', 'Page URL or source of inquiry', 'Basic technical data such as browser type, device type, and website usage information'] },
      { title: 'How We Use Your Information', paragraphs: ['We use your information to:'], bullets: ['Respond to inquiries', 'Prepare quotations', 'Understand product or service requirements', 'Coordinate vendor sourcing', 'Provide delivery or procurement support', 'Contact you regarding your request', 'Improve our website and customer experience', 'Maintain internal records', 'Prevent spam, fraud, misuse, or unauthorized activity'] },
      { title: 'Sharing of Information', paragraphs: ['Chittety Construction may share inquiry details with trusted vendors, suppliers, contractors, logistics providers, or service partners when necessary to respond to your request, check availability, prepare pricing, coordinate delivery, or support service execution.', 'We do not sell your personal information.'] },
      { title: 'Email Communications', paragraphs: ['When you submit a form, your inquiry may be sent to Chittety Construction by email. We may respond by phone, email, or other communication channels based on the information you provide.'] },
      { title: 'Data Security', paragraphs: ['We take reasonable steps to protect your information from unauthorized access, misuse, or disclosure. However, no online transmission or electronic storage method is completely secure.'] },
      { title: 'Cookies and Analytics', paragraphs: ['Our website may use cookies, analytics tools, or similar technologies to understand visitor behavior, improve website performance, and enhance user experience.'] },
      { title: 'Third-Party Links', paragraphs: ['Our website may contain links to third-party websites, brands, suppliers, manufacturers, or service providers. We are not responsible for the privacy practices or content of third-party websites.'] },
      { title: 'Contact', paragraphs: [`For privacy-related questions, contact ${contactText}`] },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    description: 'Terms governing access to and use of the Chittety Construction website.',
    sections: [
      { title: 'Acceptance of Terms', paragraphs: ['By accessing or using the Chittety Construction website, you agree to these Terms & Conditions. If you do not agree, please do not use the website.'] },
      { title: 'Website Purpose', paragraphs: ['The Chittety Construction website is a catalog, information, inquiry, quote request, procurement support, and service coordination platform. It is not a direct ecommerce checkout website.', 'Products, services, pricing, availability, and specifications displayed on the website are provided for informational and inquiry purposes only.'] },
      { title: 'Product Information', paragraphs: ['We aim to provide accurate product names, categories, specifications, SKUs, descriptions, and pricing references. However, product details may vary by brand, vendor, model, availability, location, quantity, and manufacturer updates.', 'Customers should verify technical compatibility before ordering or using any product.'] },
      { title: 'Pricing Information', paragraphs: ['Prices displayed on the website are market-reference or estimated discounted prices. Final pricing may vary based on:'], bullets: ['Vendor availability', 'Brand or product model', 'Quantity', 'Delivery location', 'Freight or handling requirements', 'Market conditions', 'Special-order requirements', 'Taxes or applicable charges', 'A quote issued by Chittety Construction or its vendor network will confirm the applicable pricing for a specific request.'] },
      { title: 'Quotes', paragraphs: ['Quotes may be subject to validity periods, vendor confirmation, product availability, and project-specific conditions. Chittety Construction reserves the right to revise or withdraw quotes if pricing, availability, vendor terms, or project conditions change.'] },
      { title: 'Services', paragraphs: ['Service information shown on the website is general and may be subject to inspection, scope review, site conditions, labor requirements, material availability, local requirements, permits, and vendor or contractor availability.', 'Final service pricing is not confirmed until the project or site conditions are reviewed.'] },
      { title: 'User Responsibilities', paragraphs: ['Users agree to provide accurate information when submitting inquiries, quote requests, support requests, or product/service requirements.', 'Users must not misuse the website, submit false information, attempt unauthorized access, or interfere with website functionality.'] },
      { title: 'Intellectual Property', paragraphs: ['All website content, branding, layout, text, product organization, design elements, and materials are owned by or licensed to Chittety Construction unless otherwise stated.', 'Users may not copy, reproduce, distribute, or commercially use website content without written permission.'] },
      { title: 'Limitation of Liability', paragraphs: ['Chittety Construction is not liable for indirect, incidental, special, or consequential damages arising from website use, product availability changes, vendor delays, service partner actions, technical errors, or reliance on website information.'] },
      { title: 'Updates to Terms', paragraphs: ['Chittety Construction may update these Terms & Conditions from time to time. Continued use of the website after updates means you accept the revised terms.'] },
    ],
  },
  refunds: {
    title: 'Refund & Return Policy',
    description: 'Return eligibility, product inspection, refunds, and non-returnable items.',
    sections: [
      { title: 'Overview', paragraphs: ['Chittety Construction strives to support customers with quality materials, reliable sourcing, and practical procurement assistance. Because construction materials vary by category, vendor, condition, size, handling, and installation status, returns and refunds are subject to inspection and approval.'] },
      { title: 'Eligible Returns', paragraphs: ['Products may be eligible for return if:'], bullets: ['The return request is made within 30 days of delivery or pickup.', 'The product is unused.', 'The product is in original condition.', 'The product is in original packaging.', 'Proof of purchase or invoice is provided.', 'The product is determined to be resalable after inspection.', 'The product was not custom, special-order, cut-to-size, installed, altered, or damaged after delivery.'] },
      { title: 'Damaged or Defective Products', paragraphs: ['If a product arrives damaged, defective, incomplete, or visibly incorrect, the customer should notify Chittety Construction within 48 hours of delivery or pickup.', 'The customer may be asked to provide:'], bullets: ['Product code or SKU', 'Photos or videos of the issue', 'Delivery receipt', 'Invoice or proof of purchase', 'Description of damage or defect', 'Quantity affected', 'After review, Chittety Construction may support replacement, vendor claim, manufacturer warranty coordination, store credit, or refund where applicable.'] },
      { title: 'Non-Returnable Items', paragraphs: ['The following items are generally non-returnable:'], bullets: ['Custom-fabricated materials', 'Special-order products', 'Cut-to-size materials', 'Installed products', 'Used products', 'Products without original packaging', 'Clearance or final-sale items', 'Products damaged after delivery', 'Products altered, modified, painted, drilled, cut, or assembled', 'Products exposed to weather, moisture, site damage, misuse, or improper storage', 'Bulk materials that cannot be verified or resold', 'Perishable, consumable, or job-site mixed materials', 'Products ordered specifically for a customer or project'] },
      { title: 'Services and Labor', paragraphs: ['Service-related fees are generally non-refundable once any of the following has occurred:'], bullets: ['Site visit', 'Consultation', 'Labor commencement', 'Installation', 'Inspection', 'Vendor dispatch', 'Project coordination', 'Custom sourcing work', 'Special procurement activity', 'If a service issue occurs, Chittety Construction may review the matter and coordinate with the relevant vendor, contractor, or service partner where applicable.'] },
      { title: 'Return Shipping / Pickup Costs', paragraphs: ['Return transportation, pickup, shipping, freight, handling, unloading, or restocking costs may be the customer’s responsibility unless the return is due to a verified product defect, incorrect supply, or approved vendor issue.'] },
      { title: 'Restocking Fees', paragraphs: ['Certain approved returns may be subject to restocking fees, especially for non-stock, vendor-sourced, bulky, or special-handling materials. Restocking fees may vary depending on product type and vendor terms.'] },
      { title: 'Refund Processing', paragraphs: ['Approved refunds are generally processed within 7-14 business days after inspection and approval.', 'Refunds may be issued to the original payment method, as store credit, or through another approved method depending on the transaction type and vendor process.'] },
      { title: 'Inspection Rights', paragraphs: ['Chittety Construction reserves the right to inspect returned products before approving any refund, replacement, or credit.'] },
    ],
  },
  shipping: {
    title: 'Shipping & Delivery Policy',
    description: 'Delivery areas, timelines, site responsibilities, and issue reporting.',
    sections: [
      { title: 'Overview', paragraphs: ['Chittety Construction may help coordinate product pickup, local delivery, vendor delivery, freight delivery, or project-site material supply depending on product category, quantity, location, vendor availability, and logistics requirements.'] },
      { title: 'Delivery Areas', paragraphs: ['Chittety Construction primarily supports Dallas-Fort Worth and surrounding areas. Wider procurement or delivery support may be available through vendor networks depending on the product and project requirement.'] },
      { title: 'Delivery Timelines', paragraphs: ['Delivery timelines depend on:'], bullets: ['Stock availability', 'Vendor location', 'Product category', 'Quantity', 'Delivery address', 'Freight requirements', 'Weather conditions', 'Site access', 'Special handling needs', 'Vendor or logistics schedules', 'Delivery dates are estimates unless confirmed in writing.'] },
      { title: 'Customer Responsibilities', paragraphs: ['Customers are responsible for:'], bullets: ['Providing an accurate delivery address', 'Providing site contact details', 'Ensuring access for the delivery vehicle', 'Arranging unloading support where required', 'Checking product quantity at delivery', 'Inspecting visible damage', 'Reporting damage or shortage within 48 hours', 'Ensuring safe storage after delivery'] },
      { title: 'Large / Heavy Materials', paragraphs: ['Large, heavy, bulky, or palletized materials may require special delivery arrangements, freight handling, forklift access, unloading support, or scheduled site coordination.', 'Additional delivery or handling charges may apply.'] },
      { title: 'Failed Delivery', paragraphs: ['If delivery cannot be completed due to an incorrect address, unavailable receiver, restricted access, unsafe site conditions, or customer delay, additional delivery or rescheduling fees may apply.'] },
      { title: 'Damage or Shortage Reporting', paragraphs: ['Damage, shortage, incorrect item, or delivery issue must be reported within 48 hours with supporting photos, delivery receipt, and order details.'] },
    ],
  },
  warranty: {
    title: 'Warranty Policy',
    description: 'Manufacturer warranty coverage and claim coordination information.',
    sections: [
      { title: 'Manufacturer Warranty', paragraphs: ['Most products listed or sourced through Chittety Construction are manufactured by third-party manufacturers. Product warranties are generally provided by the original manufacturer and vary by brand, model, category, application, and intended use.'] },
      { title: 'Warranty Coverage May Include', paragraphs: ['Depending on the manufacturer, warranty coverage may include:'], bullets: ['Manufacturing defects', 'Material defects', 'Product failure under normal use', 'Limited parts replacement', 'Product-specific repair or replacement'] },
      { title: 'Warranty Usually Does Not Cover', paragraphs: ['Warranty generally does not cover:'], bullets: ['Improper installation', 'Misuse or abuse', 'Accidental damage', 'Unauthorized modification', 'Normal wear and tear', 'Damage from incorrect product selection', 'Damage from poor maintenance', 'Damage caused by site conditions', 'Weather exposure after delivery', 'Labor charges unless specifically covered by the manufacturer'] },
      { title: 'Documentation Required', paragraphs: ['Warranty claims may require:'], bullets: ['Proof of purchase', 'Invoice or receipt', 'Product SKU or model', 'Brand information', 'Photos/videos of the issue', 'Installation details', 'Warranty card, if provided', 'Date of purchase or delivery'] },
      { title: 'Chittety Construction’s Role', paragraphs: ['Chittety Construction may assist with warranty coordination by helping customers identify product source, vendor details, documentation needs, and manufacturer claim process where applicable.', 'Warranty approval remains subject to manufacturer, vendor, or service partner terms.'] },
    ],
  },
  product: {
    title: 'Product Disclaimer',
    description: 'Important limitations regarding product information, suitability, and pricing.',
    sections: [
      { title: 'Product Information', paragraphs: ['Product names, categories, SKUs, descriptions, specifications, prices, and availability shown on the website are for informational and quote-request purposes.'] },
      { title: 'Product Variations', paragraphs: ['Actual product specifications, size, finish, packaging, color, model, brand, availability, or appearance may vary depending on manufacturer, supplier, vendor, stock, or updated product line.'] },
      { title: 'Product Images', paragraphs: ['If product images are added in the future, they may be representative and may not always show the exact supplied product. Customers should request current product photos, brand confirmation, model details, or technical sheets before ordering where required.'] },
      { title: 'Technical Suitability', paragraphs: ['Customers, contractors, installers, engineers, or project professionals are responsible for verifying product suitability, code compliance, compatibility, installation requirements, and intended application before use.'] },
      { title: 'Pricing', paragraphs: ['All pricing shown is market-reference or estimated pricing unless confirmed in a written quote.', 'Final pricing may change due to vendor availability, quantity, location, market movement, taxes, handling, freight, or special order terms.'] },
    ],
  },
  service: {
    title: 'Service Disclaimer',
    description: 'Important limitations regarding service estimates, providers, and site conditions.',
    sections: [
      { title: 'General Service Information', paragraphs: ['Service descriptions on the website are provided for general informational purposes. Service availability, scope, timeline, and final pricing depend on site conditions, access, labor requirement, material availability, urgency, permit requirements, and vendor/contractor availability.'] },
      { title: 'Estimates', paragraphs: ['Any service price shown as “starting from,” “estimated,” or “reference” is not a final quote.', 'Final service pricing requires review of actual project conditions.'] },
      { title: 'Third-Party Service Partners', paragraphs: ['Chittety Construction may coordinate service support through vendors, contractors, technicians, or service partners. Where third-party providers are involved, their own terms, licensing, insurance, availability, workmanship, warranty, and service conditions may apply.'] },
      { title: 'Permits and Compliance', paragraphs: ['Certain construction, electrical, plumbing, roofing, structural, or mechanical work may require permits, inspections, licensed professionals, or compliance with local codes.', 'Customers are responsible for confirming project requirements unless otherwise agreed in writing.'] },
      { title: 'Site Conditions', paragraphs: ['Chittety Construction is not responsible for hidden, unknown, unsafe, or pre-existing site conditions discovered during inspection, delivery, or service execution.'] },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How cookies and similar technologies may be used on this website.',
    sections: [
      { title: 'What Are Cookies?', paragraphs: ['Cookies are small files stored on your device that help websites remember preferences, analyze usage, improve performance, and provide a better browsing experience.'] },
      { title: 'How We May Use Cookies', paragraphs: ['Chittety Construction may use cookies or similar technologies to:'], bullets: ['Improve website performance', 'Understand visitor behavior', 'Remember user preferences', 'Analyze traffic', 'Improve forms and navigation', 'Support security and spam protection'] },
      { title: 'Third-Party Cookies', paragraphs: ['Third-party tools such as analytics providers, embedded maps, communication tools, or marketing platforms may use cookies according to their own policies.'] },
      { title: 'Managing Cookies', paragraphs: ['You may disable cookies through your browser settings. Some website features may not function properly if cookies are disabled.'] },
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    description: 'Our commitment to an accessible and usable website experience.',
    sections: [
      { title: 'Commitment', paragraphs: ['Chittety Construction is committed to making its website accessible and usable for as many visitors as reasonably possible.'] },
      { title: 'Accessibility Efforts', paragraphs: ['We aim to support:'], bullets: ['Clear navigation', 'Readable text', 'Proper contrast', 'Mobile-friendly layouts', 'Keyboard-friendly interactions where practical', 'Descriptive form labels', 'Clear call-to-action buttons'] },
      { title: 'Feedback', paragraphs: [`If you experience difficulty accessing any part of the website, please contact us at ${CONTACT.phoneDisplay} or ${CONTACT.email}. We will make reasonable efforts to improve accessibility and provide information in an alternative format where possible.`] },
    ],
  },
} satisfies Record<string, LegalPolicy>;

export type LegalPolicyKey = keyof typeof LEGAL_POLICIES;
