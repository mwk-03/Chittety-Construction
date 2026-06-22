'use client';

import { useNavigation } from '@/store/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, FileText } from 'lucide-react';

interface PolicySection {
  id: string;
  title: string;
}

function getPolicyData(policy: string): { title: string; lastUpdated: string; sections: PolicySection[]; content: Record<string, React.ReactNode> } {
  switch (policy) {
    case 'privacy':
      return {
        title: 'Privacy Policy',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'info-collection', title: 'Information We Collect' },
          { id: 'how-we-use', title: 'How We Use Your Information' },
          { id: 'info-sharing', title: 'Information Sharing' },
          { id: 'data-security', title: 'Data Security' },
          { id: 'cookies', title: 'Cookies & Tracking' },
          { id: 'your-rights', title: 'Your Rights' },
          { id: 'contact', title: 'Contact Us' },
        ],
        content: {
          'info-collection': (
            <>
              <p className="mb-4">
                Chittety Construction collects information that you voluntarily provide when using our website, submitting quote requests, contacting our team, or engaging with our services. This information may include your name, phone number, email address, company name, project details, delivery location, and any other information you choose to share with us.
              </p>
              <p className="mb-4">
                We also collect certain technical information automatically when you visit our website, including your IP address, browser type, device type, operating system, pages visited, time spent on pages, and referring URLs. This information is collected through standard web analytics tools and helps us understand how visitors interact with our website so we can improve the user experience.
              </p>
              <p>
                When you submit a quote request or contact form, the information you provide is stored in our database and used solely for the purpose of responding to your inquiry and providing our services. We do not collect payment information directly on our website, as payment processing is handled through third-party payment providers with their own privacy policies.
              </p>
            </>
          ),
          'how-we-use': (
            <>
              <p className="mb-4">
                The information we collect is used for several purposes: to process and respond to your quote requests, to provide customer support, to communicate with you about products, services, and project requirements, to improve our website and services, to send relevant updates about your orders or inquiries, and to comply with legal obligations.
              </p>
              <p className="mb-4">
                We may use your contact information to follow up on inquiries, provide order updates, and inform you about products or services that may be relevant to your construction projects. If you prefer not to receive such communications, you can opt out at any time by contacting us directly.
              </p>
              <p>
                Technical data collected from website visits is used for analytics purposes only. This data helps us identify popular content, understand navigation patterns, and make informed decisions about website improvements. This data is aggregated and anonymized and is not used to personally identify individual visitors.
              </p>
            </>
          ),
          'info-sharing': (
            <>
              <p className="mb-4">
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes. Your information is shared only as necessary to provide our services, fulfill your requests, or comply with legal requirements.
              </p>
              <p className="mb-4">
                We may share your information with: service providers who assist in operating our website and business (such as hosting providers and analytics services); vendor partners involved in fulfilling your specific order or service request; and legal authorities when required by law or to protect our rights.
              </p>
              <p>
                When you submit a quote request that requires vendor involvement, the relevant project details (excluding sensitive personal information) may be shared with our vendor partners to obtain pricing, availability, and delivery information. We share only the information necessary to fulfill your request and instruct our partners to maintain the confidentiality of any information shared with them.
              </p>
            </>
          ),
          'data-security': (
            <>
              <p className="mb-4">
                We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include secure server infrastructure, encrypted data transmission, access controls, and regular security assessments.
              </p>
              <p>
                While we strive to protect your information, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security, but we are committed to maintaining industry-standard protections and promptly addressing any security vulnerabilities that are identified. In the event of a data breach that affects your personal information, we will notify affected individuals in accordance with applicable legal requirements.
              </p>
            </>
          ),
          'cookies': (
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences, understand usage patterns, and deliver relevant content. You can control cookie settings through your browser preferences. Please note that disabling cookies may affect certain functionality of our website. For detailed information about our use of cookies, please refer to our Cookie Policy.
            </p>
          ),
          'your-rights': (
            <>
              <p className="mb-4">
                You have the right to access, review, and request correction of your personal information that we hold. You may also request deletion of your personal information, subject to certain exceptions such as legal retention requirements or ongoing transaction processing.
              </p>
              <p>
                To exercise any of these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable privacy laws. Please note that we may require identity verification before processing requests related to personal information.
              </p>
            </>
          ),
          'contact': (
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at: Chittety Construction, 6816 Outland Drive, Plano, Texas 75024. You can also reach us by email at info@chittety.com or by phone during our business hours, Monday through Friday, 8:00 AM to 6:00 PM CST.
            </p>
          ),
        },
      };

    case 'terms':
      return {
        title: 'Terms & Conditions',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'acceptance', title: 'Acceptance of Terms' },
          { id: 'services', title: 'Products & Services' },
          { id: 'pricing', title: 'Pricing & Payment' },
          { id: 'orders', title: 'Orders & Quotations' },
          { id: 'delivery', title: 'Delivery & Shipping' },
          { id: 'intellectual-property', title: 'Intellectual Property' },
          { id: 'limitation', title: 'Limitation of Liability' },
          { id: 'governing-law', title: 'Governing Law' },
        ],
        content: {
          'acceptance': (
            <p>
              By accessing and using the Chittety Construction website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our website or services. These terms apply to all visitors, users, customers, and others who access or use our services. We reserve the right to modify these terms at any time, and continued use of our services after changes constitutes acceptance of the updated terms.
            </p>
          ),
          'services': (
            <>
              <p className="mb-4">
                Chittety Construction provides construction material sourcing, procurement support, vendor coordination, and service coordination for plumbing, electrical, flooring, roofing, HVAC, and other construction-related categories. Our services act as an intermediary between customers and our network of vendors and service providers.
              </p>
              <p>
                We strive to provide accurate product information, reliable vendor sourcing, and quality service coordination. However, we do not manufacture the products we supply, and specific product warranties, specifications, and performance are the responsibility of the respective manufacturers. Service quality is the responsibility of the respective service providers in our network, all of whom are vetted, licensed, and insured.
              </p>
            </>
          ),
          'pricing': (
            <>
              <p className="mb-4">
                All prices displayed on our website are starting prices and serve as preliminary estimates. Actual pricing is provided through formal quotes that take into account specific project requirements, material specifications, order quantities, delivery logistics, and current vendor pricing. Prices are subject to change based on market conditions, vendor pricing adjustments, and material availability.
              </p>
              <p>
                Payment terms are specified in the formal quote and must be agreed upon before order processing begins. We reserve the right to modify pricing at any time prior to order confirmation. Any applicable discounts, including volume or promotional discounts, are applied as specified at the time of quoting and are subject to the terms and conditions associated with each specific offer.
              </p>
            </>
          ),
          'orders': (
            <>
              <p className="mb-4">
                All orders are subject to acceptance and confirmation. When you submit a quote request, our team reviews the requirements, checks availability, and provides a formal quote. The quote is valid for the period specified in the quote document, after which pricing and availability may be subject to change.
              </p>
              <p>
                By confirming an order, you agree to the terms specified in the quote, including pricing, delivery timeline, and any applicable conditions. We reserve the right to decline or cancel orders in cases of product unavailability, pricing errors, or other circumstances beyond our reasonable control. In such cases, we will notify you promptly and provide a full refund if payment has been received.
              </p>
            </>
          ),
          'delivery': (
            <p>
              Delivery timelines provided in quotes are estimates based on standard conditions and current availability. Actual delivery times may vary due to factors including vendor inventory levels, shipping carrier schedules, weather conditions, and project site access. For DFW local area deliveries, we coordinate direct delivery. For out-of-area shipments, we arrange freight shipping with tracking. We are not liable for delays caused by factors beyond our reasonable control but will communicate proactively about any expected delays.
            </p>
          ),
          'intellectual-property': (
            <p>
              All content on the Chittety Construction website, including text, graphics, logos, images, product descriptions, and design elements, is the property of Chittety Construction or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from our website without prior written permission. Product names, logos, and brand names referenced on our site are the property of their respective owners.
            </p>
          ),
          'limitation': (
            <>
              <p className="mb-4">
                To the maximum extent permitted by applicable law, Chittety Construction shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our website, products, or services. This includes, but is not limited to, damages for loss of profits, data, project delays, or business interruption.
              </p>
              <p>
                Our total liability for any claim arising from or related to our products or services shall not exceed the amount you paid for the specific product or service giving rise to the claim. This limitation applies regardless of the legal theory under which the claim is made, whether in contract, tort, strict liability, or any other theory.
              </p>
            </>
          ),
          'governing-law': (
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. Any disputes arising from or related to these terms or your use of our services shall be resolved in the courts located in Collin County, Texas. You agree to submit to the personal jurisdiction of these courts and waive any objection to venue in these courts.
            </p>
          ),
        },
      };

    case 'cookies':
      return {
        title: 'Cookie Policy',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'what-are-cookies', title: 'What Are Cookies' },
          { id: 'types-cookies', title: 'Types of Cookies We Use' },
          { id: 'third-party', title: 'Third-Party Cookies' },
          { id: 'managing-cookies', title: 'Managing Cookies' },
          { id: 'changes', title: 'Changes to This Policy' },
        ],
        content: {
          'what-are-cookies': (
            <p>
              Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better browsing experience, and supply information to the owners of the site. Cookies help websites remember your preferences, understand how you use the site, and improve the services offered. This Cookie Policy explains how Chittety Construction uses cookies and similar technologies on our website.
            </p>
          ),
          'types-cookies': (
            <>
              <p className="mb-4">
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as page navigation, secure access to authenticated areas, and remembering your form inputs during a session. Essential cookies cannot be disabled as the website would not function without them.
              </p>
              <p className="mb-4">
                <strong>Analytics Cookies:</strong> We use analytics cookies to collect information about how visitors interact with our website. This includes pages visited, time spent on pages, navigation paths, and similar aggregate data. This information helps us understand website usage patterns and make improvements to enhance the user experience. Analytics data is anonymized and used solely for statistical purposes.
              </p>
              <p>
                <strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make (such as language preferences or display settings) and provide enhanced, personalized features. Functionality cookies improve your browsing experience by making the site more relevant to your needs and preferences.
              </p>
            </>
          ),
          'third-party': (
            <p>
              Our website may include content and integrations from third-party services, such as analytics tools, which may set their own cookies on your device. These third-party cookies are subject to the respective third-party privacy and cookie policies. We do not control these third-party cookies and recommend reviewing the privacy policies of these services for more information about their cookie practices. Third-party cookies are used only for the purposes described and do not give these parties access to information beyond what is necessary for their specified functions.
            </p>
          ),
          'managing-cookies': (
            <p>
              You can manage and control cookies through your browser settings. Most browsers allow you to view, manage, and delete cookies. You can typically set your browser to refuse all cookies, accept only certain cookies, or notify you when a cookie is being set. Please note that disabling or refusing cookies may affect the functionality of our website and your ability to use certain features. If you choose to disable cookies, some parts of the site may not work as intended. For detailed instructions on managing cookies in your specific browser, please refer to your browser&apos;s help documentation.
            </p>
          ),
          'changes': (
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated effective date. We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies. Your continued use of our website after any changes constitutes acceptance of the updated policy.
            </p>
          ),
        },
      };

    case 'refund':
      return {
        title: 'Refund & Return Policy',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'returns', title: 'Return Policy' },
          { id: 'return-process', title: 'Return Process' },
          { id: 'damage-reporting', title: 'Damage Reporting (48 Hours)' },
          { id: 'non-returnable', title: 'Non-Returnable Items' },
          { id: 'refund-processing', title: 'Refund Processing (7-14 Days)' },
          { id: 'partial-returns', title: 'Partial Returns' },
          { id: 'contact', title: 'Contact for Returns' },
        ],
        content: {
          'returns': (
            <>
              <p className="mb-4">
                We accept returns within 30 days of the original purchase date, subject to the conditions outlined in this policy. Products must be in their original, unused, and resalable condition with all original packaging, labels, and documentation intact. Custom orders, cut materials, and special-order items are generally not eligible for return unless they are defective or do not match the specifications confirmed at the time of order.
              </p>
              <p>
                To initiate a return, please contact our team with your order information, the reason for the return, and photos of the product in its current condition. We will review your request and provide return instructions, including the shipping address and any applicable return shipping costs. Returns must be shipped back in appropriate packaging to prevent damage during transit.
              </p>
            </>
          ),
          'return-process': (
            <p>
              Once your return request is approved, you will receive detailed return instructions including the return shipping address and any required documentation. Items must be returned within 14 days of receiving return approval. We recommend using a trackable shipping method and purchasing shipping insurance for the return shipment, as we cannot be held responsible for items lost or damaged during return transit. Upon receiving and inspecting the returned items, we will process the refund according to the terms outlined below.
            </p>
          ),
          'damage-reporting': (
            <>
              <p className="mb-4">
                All damage must be reported within 48 hours of delivery. This is a strict requirement, as we cannot process damage claims for issues reported after the 48-hour window. When you receive your delivery, please inspect the materials promptly and note any visible damage, missing items, or discrepancies on the delivery receipt before signing.
              </p>
              <p>
                To report damage, contact our team immediately with your order number, a description of the damage, and clear photographs showing the condition of the packaging and the damaged products. We will work with you and the shipping carrier to resolve the issue, which may include a replacement shipment, repair, or refund depending on the nature and extent of the damage. Failure to report damage within 48 hours may result in the claim being denied.
              </p>
            </>
          ),
          'non-returnable': (
            <>
              <p className="mb-4">
                The following items are not eligible for return: custom-cut or modified materials, special-order products that were specifically procured for your project, items that have been installed, used, or altered in any way, materials that show signs of wear, damage, or contamination from use, and items returned without original packaging.
              </p>
              <p>
                Additionally, clearance items, final-sale products, and items explicitly marked as non-returnable at the time of purchase cannot be returned. If you are unsure whether an item is returnable, please contact our team before making your purchase, and we will clarify the return eligibility for that specific product.
              </p>
            </>
          ),
          'refund-processing': (
            <>
              <p className="mb-4">
                Approved refunds are processed within 7 to 14 business days from the date we receive and inspect the returned items. The refund will be issued using the same payment method used for the original purchase, unless an alternative arrangement is agreed upon. Please allow additional time for the refund to appear on your statement, as processing times vary by financial institution.
              </p>
              <p>
                Refund amounts may be adjusted for original shipping costs, return shipping costs (if applicable), restocking fees (where applicable), and any depreciation in the condition of the returned items. We will communicate the refund amount and any deductions before processing, so there are no surprises. If a partial refund is being issued, we will explain the basis for the adjustment.
              </p>
            </>
          ),
          'partial-returns': (
            <p>
              Partial returns of multi-item orders are accepted for eligible items. Each item in a return is evaluated individually, and refunds are processed accordingly. If you received a volume discount on your original order, returning a portion of the items may affect the discount applied to the remaining items. In such cases, the refund may be adjusted to reflect the pricing that would have applied to the items you are keeping at the reduced quantity.
            </p>
          ),
          'contact': (
            <p>
              For all return and refund inquiries, please contact our team at info@chittety.com or call us during business hours, Monday through Friday, 8:00 AM to 6:00 PM CST. Please have your order number and relevant details ready when you contact us to expedite the process.
            </p>
          ),
        },
      };

    case 'warranty':
      return {
        title: 'Warranty Policy',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'manufacturer-warranty', title: 'Manufacturer Warranties' },
          { id: 'proof-of-purchase', title: 'Proof of Purchase' },
          { id: 'warranty-claims', title: 'Warranty Claims Process' },
          { id: 'exclusions', title: 'Warranty Exclusions' },
          { id: 'service-warranty', title: 'Service Warranty' },
          { id: 'limitations', title: 'Limitations' },
        ],
        content: {
          'manufacturer-warranty': (
            <>
              <p className="mb-4">
                Products sold through Chittety Construction are covered by the respective manufacturer&apos;s warranty. Each manufacturer sets their own warranty terms, duration, coverage, and claim procedures, which vary by product type, brand, and category. When you purchase a product through us, it comes with the manufacturer&apos;s warranty as applicable to that specific product.
              </p>
              <p>
                We facilitate warranty claims by providing documentation and support, but the warranty terms and coverage are determined solely by the manufacturer. Warranty durations may range from limited to lifetime, depending on the product and manufacturer. We encourage customers to review warranty terms before purchase, and we can provide warranty information upon request for specific products.
              </p>
            </>
          ),
          'proof-of-purchase': (
            <>
              <p className="mb-4">
                To make a warranty claim, proof of purchase from Chittety Construction is required. This serves as verification that the product was purchased through our platform and establishes the purchase date for warranty period calculation. Your order confirmation, invoice, or receipt from Chittety Construction serves as valid proof of purchase.
              </p>
              <p>
                Please retain all purchase documentation for the duration of the warranty period. If you lose your proof of purchase, contact our team with your name, email, and approximate purchase date, and we will attempt to locate your order records. However, we cannot guarantee that we will be able to verify purchases without adequate documentation.
              </p>
            </>
          ),
          'warranty-claims': (
            <p>
              To initiate a warranty claim, contact our team with the product details, your proof of purchase, a description of the issue, and photographs showing the defect or issue. We will review your claim, coordinate with the manufacturer if necessary, and guide you through the next steps. The manufacturer may require the product to be inspected, and in some cases, returned for evaluation. We will facilitate this process and keep you informed throughout. Warranty claim processing times vary by manufacturer and the nature of the claim.
            </p>
          ),
          'exclusions': (
            <>
              <p className="mb-4">
                Warranties typically do not cover: damage resulting from improper installation, misuse, abuse, or negligence; normal wear and tear; damage from environmental factors such as weather, chemicals, or excessive moisture; modifications or alterations made to the product after purchase; products used beyond their rated capacity or in applications they were not designed for; and consumable items that are expected to degrade with normal use.
              </p>
              <p>
                Additionally, warranties are void if the product serial number has been removed, altered, or defaced, or if the product has been repaired or modified by unauthorized parties. Specific exclusions vary by manufacturer and product, and detailed warranty terms are available from the manufacturer upon request.
              </p>
            </>
          ),
          'service-warranty': (
            <p>
              For services coordinated through Chittety Construction, warranty coverage is provided by the respective service provider. Service warranty terms, including duration and scope, are specified in the service quote and agreement. Service warranties typically cover workmanship and labor related to the specific service performed. Materials used in service work are covered by their respective manufacturer warranties. If you experience an issue with service work covered under warranty, contact our team and we will coordinate with the service provider to address the issue promptly.
            </p>
          ),
          'limitations': (
            <p>
              Chittety Construction acts as an intermediary for warranty facilitation and is not a party to the manufacturer warranty agreement. Our liability is limited to providing documentation support and facilitating communication between the customer and the manufacturer or service provider. We do not extend, modify, or guarantee manufacturer warranties beyond their stated terms. Total liability related to warranty facilitation shall not exceed the purchase price of the product in question.
            </p>
          ),
        },
      };

    case 'shipping':
      return {
        title: 'Shipping & Delivery Policy',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'dfw-delivery', title: 'DFW Local Delivery' },
          { id: 'freight', title: 'Freight Coordination' },
          { id: 'delivery-timeline', title: 'Delivery Timeline' },
          { id: 'damage-reporting', title: 'Damage Reporting (48 Hours)' },
          { id: 'delivery-requirements', title: 'Delivery Requirements' },
          { id: 'costs', title: 'Shipping Costs' },
        ],
        content: {
          'dfw-delivery': (
            <>
              <p className="mb-4">
                We provide local delivery service within the Dallas-Fort Worth (DFW) metropolitan area. Local deliveries are coordinated directly by our team and delivered to your specified project site, business address, or residential address within our delivery zone. Local delivery is available for orders of all sizes, from single items to full truckloads.
              </p>
              <p>
                DFW local delivery schedules are coordinated based on product availability and your preferred delivery window. We strive to accommodate specific delivery date and time requests, though availability may vary based on order volume and logistics. Delivery appointments are confirmed prior to dispatch to ensure someone is available to receive the materials.
              </p>
            </>
          ),
          'freight': (
            <>
              <p className="mb-4">
                For deliveries outside the DFW metro area, we coordinate freight shipping to locations across the United States. Freight shipments are arranged through our network of shipping carriers and logistics partners. We select carriers based on reliability, transit time, and cost-effectiveness for your specific delivery location and order characteristics.
              </p>
              <p>
              Freight shipments typically require a commercial delivery address with loading dock access. For residential freight deliveries, additional arrangements such as liftgate service may be required, which may incur additional charges. Tracking information is provided for all freight shipments so you can monitor the progress of your delivery.
              </p>
            </>
          ),
          'delivery-timeline': (
            <p>
              Delivery timelines are provided as estimates and are based on product availability, order processing time, and shipping distance. DFW local deliveries are typically completed within 1 to 5 business days from order confirmation, depending on product availability and scheduling. Out-of-area freight shipments generally arrive within 3 to 10 business days, depending on the destination and shipping method selected. These timelines are estimates and not guaranteed. Delays may occur due to vendor inventory, carrier schedules, weather conditions, or other factors beyond our control. We communicate proactively about any known or expected delays.
            </p>
          ),
          'damage-reporting': (
            <>
              <p className="mb-4">
                All damage must be reported within 48 hours of delivery receipt. This is a strict requirement for both local and freight deliveries. When receiving your order, please inspect all items promptly and note any visible damage, missing items, or discrepancies on the delivery receipt before signing.
              </p>
              <p>
                To report damage, contact our team immediately with your order number, a description of the damage, and clear photographs of the damaged items and packaging. We will coordinate with the shipping carrier and work toward a resolution, which may include a replacement shipment or refund. Damage reported after the 48-hour window may not be eligible for a claim, as carrier liability periods are time-limited.
              </p>
            </>
          ),
          'delivery-requirements': (
            <p>
              For all deliveries, ensure the delivery location is accessible and has adequate space for the delivery vehicle. Someone authorized must be present to receive and inspect the delivery. For large or heavy items, ensure the delivery path is clear and suitable for the materials being delivered. If special equipment (such as a crane or forklift) is needed for unloading, this should be communicated at the time of order placement so appropriate arrangements can be made. Failure to meet delivery requirements may result in rescheduling fees or additional delivery charges.
            </p>
          ),
          'costs': (
            <p>
              Shipping and delivery costs are calculated based on order size, weight, dimensions, delivery distance, and delivery method. For DFW local deliveries, costs are included in or quoted alongside the product pricing. For out-of-area freight shipments, shipping costs are quoted separately based on the destination and shipment details. Shipping costs are communicated before order confirmation and are non-refundable once the order has been shipped. For bulk orders and regular customers, we may offer reduced or negotiated shipping rates.
            </p>
          ),
        },
      };

    case 'product-disclaimer':
      return {
        title: 'Product Disclaimer',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'representative-images', title: 'Representative Product Images' },
          { id: 'spec-variations', title: 'Specification Variations' },
          { id: 'pricing-changes', title: 'Pricing Changes' },
          { id: 'product-suitability', title: 'Product Suitability' },
          { id: 'third-party', title: 'Third-Party Products' },
        ],
        content: {
          'representative-images': (
            <>
              <p className="mb-4">
                Product images displayed on our website are for illustrative purposes and are intended to represent the general appearance and characteristics of the product category. Actual products may vary in color, texture, finish, dimensions, and appearance from the images shown. Variations occur due to manufacturing processes, material batch differences, monitor color calibration, and photographic conditions.
              </p>
              <p>
                While we make every effort to display images that accurately represent the products we offer, we cannot guarantee that the actual product will match the website image exactly. For projects where specific color, texture, or finish is critical, we recommend requesting physical samples or verifying product specifications before placing your order. Product specifications and technical data sheets are available upon request and provide the most accurate representation of product characteristics.
              </p>
            </>
          ),
          'spec-variations': (
            <>
              <p className="mb-4">
                Product specifications, dimensions, weights, and technical data listed on our website are provided by manufacturers and are subject to change without notice. While we strive to maintain accurate and up-to-date specifications, variations may occur due to manufacturing updates, product improvements, or changes in industry standards.
              </p>
              <p>
                Before making a purchase decision, especially for applications with specific technical requirements, we recommend verifying current specifications with our team. We can provide the most up-to-date technical data sheets and manufacturer documentation to ensure the product meets your project requirements. Chittety Construction is not responsible for specification changes made by manufacturers after the product information was published on our website.
              </p>
            </>
          ),
          'pricing-changes': (
            <>
              <p className="mb-4">
                Product prices displayed on our website are starting prices and are subject to change based on market conditions, vendor pricing adjustments, material costs, and other factors. The displayed price does not include applicable taxes, shipping costs, or delivery charges unless explicitly stated.
              </p>
              <p>
                Final pricing is confirmed through our formal quoting process, which takes into account your specific requirements, current vendor pricing, and order details. Prices confirmed in a quote are valid for the period specified in the quote. We reserve the right to adjust pricing for any orders not yet confirmed, and market-driven price changes may occur between the time of your initial inquiry and order confirmation.
              </p>
            </>
          ),
          'product-suitability': (
            <p>
              Customers are responsible for verifying that products are suitable for their intended application and comply with all applicable building codes, regulations, and standards for their specific project. While our team can provide general guidance and product information, the final determination of product suitability for a specific application rests with the customer or their qualified design professional. We recommend consulting with architects, engineers, or other qualified professionals when selecting products for projects with specific performance, safety, or compliance requirements.
            </p>
          ),
          'third-party': (
            <p>
              Products sold through Chittety Construction are sourced from various manufacturers and suppliers. We do not manufacture the products and do not provide any express or implied warranties beyond those offered by the respective manufacturers. Any product warranties are provided directly by the manufacturer, and warranty claims are subject to the manufacturer&apos;s terms and conditions. Our role is to facilitate the purchase, provide accurate product information, and support the warranty claim process as an intermediary between the customer and the manufacturer.
            </p>
          ),
        },
      };

    case 'service-disclaimer':
      return {
        title: 'Service Disclaimer',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'preliminary-estimates', title: 'Preliminary Estimates' },
          { id: 'site-inspection', title: 'Site Inspection' },
          { id: 'permits', title: 'Permits & Compliance' },
          { id: 'third-party-providers', title: 'Third-Party Service Providers' },
          { id: 'timeline', title: 'Service Timeline' },
        ],
        content: {
          'preliminary-estimates': (
            <>
              <p className="mb-4">
                Service prices displayed on our website are preliminary starting estimates and are provided for informational and planning purposes only. These estimates are based on standard conditions and do not account for the specific variables of your individual project. Actual service pricing is determined after a thorough assessment that considers site conditions, project scope, material requirements, labor complexity, access conditions, urgency, and other project-specific factors.
              </p>
              <p>
                A preliminary estimate should not be interpreted as a binding quote or a guarantee of final pricing. The final price is provided in the formal service quote issued after site inspection and is the only binding price document. We recommend obtaining the formal quote before making project budget decisions based on our preliminary estimates.
              </p>
            </>
          ),
          'site-inspection': (
            <>
              <p className="mb-4">
                Site inspection is a critical step in our service coordination process. Before providing a final quote, a qualified professional visits the project site to assess conditions, measure requirements, identify potential challenges, and gather the information needed for an accurate quote. The site inspection ensures that the final quote reflects the actual work required and helps avoid unexpected costs or complications during service execution.
              </p>
              <p>
                Customers are responsible for providing safe and reasonable access to the project site for inspection purposes. If site access is restricted, hazardous, or requires special arrangements, this should be communicated at the time of scheduling the inspection. Information discovered during the site inspection may significantly affect the quoted price, timeline, or scope of work compared to the preliminary estimate.
              </p>
            </>
          ),
          'permits': (
            <>
              <p className="mb-4">
                It is the customer&apos;s responsibility to obtain all necessary permits, approvals, and inspections required for the work being performed. Chittety Construction does not apply for, obtain, or manage building permits on behalf of customers. The service providers we coordinate with perform work in accordance with applicable codes and standards, but securing the required permits and approvals is the responsibility of the property owner or their authorized representative.
              </p>
              <p>
                We recommend consulting with your local building department or a qualified professional to determine the permit requirements for your specific project before initiating service work. Failure to obtain required permits may result in work stoppages, fines, or the need to redo work, and Chittety Construction is not responsible for any consequences arising from the customer&apos;s failure to obtain necessary permits.
            </p>
            </>
          ),
          'third-party-providers': (
            <>
              <p className="mb-4">
                Services coordinated through Chittety Construction are performed by independent, third-party service providers who are part of our vetted network. These service providers are independent contractors and are not employees of Chittety Construction. While we vet our service providers for licensing, insurance, quality, and reliability, the actual work is performed under the service provider&apos;s own professional judgment and responsibility.
              </p>
              <p>
                Chittety Construction acts as a coordinator and facilitator, connecting customers with qualified service providers. We do not directly supervise the work performed, and the quality and timeliness of service execution is the responsibility of the respective service provider. We facilitate communication, address concerns, and work to ensure customer satisfaction, but we are not a party to the service agreement between the customer and the service provider.
              </p>
            </>
          ),
          'timeline': (
            <p>
              Service timelines provided are estimates based on standard conditions and current scheduling availability. Actual service timelines may be affected by factors including weather conditions, material availability, permit processing times, site access limitations, project complexity, and scheduling conflicts. We communicate timeline estimates as part of the quoting process and provide updates if significant changes are anticipated. While we strive to complete services within the estimated timeframe, delays may occur, and Chittety Construction is not liable for delays caused by factors beyond our reasonable control or the control of the service provider.
            </p>
          ),
        },
      };

    case 'accessibility':
      return {
        title: 'Accessibility Statement',
        lastUpdated: 'January 1, 2025',
        sections: [
          { id: 'commitment', title: 'Our Commitment' },
          { id: 'measures', title: 'Accessibility Measures' },
          { id: 'ongoing-efforts', title: 'Ongoing Efforts' },
          { id: 'feedback', title: 'Feedback & Assistance' },
        ],
        content: {
          'commitment': (
            <p>
              Chittety Construction is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to ensure our website is accessible to the widest possible audience, regardless of technology or ability. We believe that every individual should have equal access to our products, services, and information, and we work to remove barriers that may prevent interaction with our digital platforms.
            </p>
          ),
          'measures': (
            <>
              <p className="mb-4">
                We have implemented several measures to improve the accessibility of our website. These include maintaining a clear and consistent page structure with proper heading hierarchy, providing descriptive text for images and interactive elements, ensuring sufficient color contrast between text and background elements, making all interactive elements keyboard-accessible, and using semantic HTML to support assistive technologies.
              </p>
              <p>
                We also ensure that our website is responsive and functions across different screen sizes and devices, and we test compatibility with major screen readers and assistive technologies. Our forms include appropriate labels and error messages to ensure usability for all visitors.
              </p>
            </>
          ),
          'ongoing-efforts': (
            <p>
              Accessibility is an ongoing effort, and we continuously evaluate our website to identify and address potential accessibility barriers. As we update and expand our website, we incorporate accessibility considerations into our development process. We monitor changes in accessibility standards and guidelines, including the Web Content Accessibility Guidelines (WCAG), and work to align our practices with current best practices. While we strive for full accessibility, we acknowledge that some areas may require improvement, and we are committed to addressing issues as they are identified.
            </p>
          ),
          'feedback': (
            <p>
              We welcome feedback on the accessibility of our website. If you encounter any accessibility barriers while using our site, or if you have suggestions for improving accessibility, please contact us at info@chittety.com or call us during business hours, Monday through Friday, 8:00 AM to 6:00 PM CST. Your feedback helps us identify areas for improvement and prioritize our accessibility efforts. If you require assistance accessing information or using our services, our team is happy to provide support through alternative communication channels.
            </p>
          ),
        },
      };

    default:
      return {
        title: 'Policy',
        lastUpdated: 'January 1, 2025',
        sections: [],
        content: {},
      };
  }
}

export function PolicyPage() {
  const { selectedPolicy, navigateTo } = useNavigation();

  const policyData = getPolicyData(selectedPolicy || '');

  if (!selectedPolicy || policyData.sections.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <FileText className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Policy Not Found</h2>
          <p className="text-text-secondary mb-6">The requested policy could not be located.</p>
          <Button variant="outline" onClick={() => navigateTo('home')}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {policyData.title}
          </h1>
          <p className="mt-2 text-sm text-text-muted">Last updated: {policyData.lastUpdated}</p>
        </div>
      </section>

      {/* Table of Contents */}
      {policyData.sections.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Card className="py-0 overflow-hidden bg-muted/50">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Table of Contents</h2>
              <nav aria-label="Table of contents">
                <ol className="space-y-2">
                  {policyData.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm text-text-secondary hover:text-accent transition-colors"
                      >
                        {index + 1}. {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Policy Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-10">
          {policyData.sections.map((section, index) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground mb-4 tracking-tight">
                {index + 1}. {section.title}
              </h2>
              <div className="text-text-secondary leading-relaxed text-[15px]">
                {policyData.content[section.id]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back Button */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Separator className="mb-8" />
        <Button variant="outline" onClick={() => navigateTo('home')}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </Button>
      </section>
    </main>
  );
}