'use client';

import React from 'react';
import Link from 'next/link';

export default function PartnerTerms() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/causes" className="text-xl font-black text-[#1A2B48] tracking-tight">
            Givebly<span className="text-[#2ECC71]">.</span>
          </Link>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Legal Docs</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-12 bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-[#1A2B48] mb-2">Givebly Partner Terms & Conditions</h1>
        <p className="text-sm text-gray-500 font-medium mb-10">Last Updated: February 2026</p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
          
          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">1. Introduction & Acceptance</h2>
            <p className="mb-2">These Terms and Conditions ("Terms") govern the relationship between Givebly Pty Ltd ("Givebly", "we", "us", or "our") and the organization applying to be listed as a beneficiary on the Givebly platform ("Partner", "you", or "your"). By submitting an application and using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">2. Authorization & Compliance</h2>
            <p className="mb-2"><strong>2.1 Warranty of Authority:</strong> You warrant that you are a legally authorized representative of the Partner organization, possessing the right to bind the organization to these Terms.</p>
            <p className="mb-2"><strong>2.2 Regulatory Compliance:</strong> You must maintain a valid Australian Business Number (ABN) or registration with the Australian Charities and Not-for-profits Commission (ACNC). You agree to comply with all applicable Australian laws, including the Privacy Act 1988 (Cth) and any fundraising legislation relevant to your State or Territory.</p>
            <p><strong>2.3 AML/CTF Acknowledgment:</strong> Givebly reserves the right to request additional documentation to verify the identity of the Partner and its directors/committee members to comply with Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) regulations. Givebly may suspend or terminate accounts suspected of fraudulent or illegal activity.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">3. Funding Logistics & Affiliate Clearing</h2>
            <p className="mb-2"><strong>3.1 Source of Funds:</strong> Givebly is an affiliate-funded platform. Funds are generated via commissions from third-party retailers when Givebly users make eligible purchases.</p>
            <p className="mb-2"><strong>3.2 Pending vs. Cleared Funds:</strong> Points allocated by users to your campaign will initially reflect as "Pending." Funds will only transition to "Cleared" status once the third-party retailer finalizes the transaction, typically after the expiration of their standard return policy (usually 30-90 days).</p>
            <p className="mb-2"><strong>3.3 Transaction Reversals:</strong> If a user returns an item or a transaction is flagged as fraudulent by the retailer, the affiliate commission is voided. Givebly automatically deducts the corresponding "Pending" funds from your campaign. You acknowledge that Givebly is not liable for reversed or cancelled affiliate commissions.</p>
            <p><strong>3.4 Withdrawals:</strong> Partners may request to withdraw Cleared Funds subject to a minimum threshold of $50.00 AUD. Givebly makes no guarantees regarding the timeframe in which users will allocate points to your campaign.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">4. Media Ownership, Impact Reporting & Content Licensing</h2>
            <p className="mb-2"><strong>4.1 The Impact Report Requirement:</strong> To maintain active status on the Platform, Partners must submit an "Impact Report" within thirty (30) days of withdrawing successfully funded capital. This report must include high-resolution photographs or videos demonstrating the tangible outcome of the funds.</p>
            <p className="mb-2"><strong>4.2 Transfer of Media Ownership:</strong> By uploading photos, videos, written testimonials, or other media ("Content") to the Givebly platform, you agree that Givebly Pty Ltd becomes the rightful and exclusive owner of this Content.</p>
            <p><strong>4.3 Unrestricted Usage Rights:</strong> You grant Givebly the unrestricted, perpetual, irrevocable, worldwide, and royalty-free right to use, edit, alter, watermark, distribute, and publicly display this Content across any and all mediums. This includes, but is not limited to, physical print publications (such as local community magazines), television broadcasts, our official YouTube channel, digital advertisements, and across all social media networks for the purpose of marketing and platform growth.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">5. Limitation of Liability</h2>
            <p className="mb-2">To the maximum extent permitted by the Australian Consumer Law (ACL) and applicable legislation:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Givebly provides the Platform on an "as is" and "as available" basis without any warranties, express or implied.</li>
              <li>Givebly shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use of the Platform.</li>
              <li>Givebly is not a bank, financial institution, or registered charity. We act solely as a technology platform facilitating the direction of corporate affiliate commissions.</li>
              <li>Givebly assumes no liability for how the Partner utilizes the disbursed funds. The Partner bears sole legal responsibility for ensuring funds are applied to their stated community or charitable goals.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">6. Indemnity</h2>
            <p>You agree to indemnify, defend, and hold harmless Givebly, its directors, employees, and affiliates from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with: (a) your breach of these Terms; (b) your misuse of the Platform or the funds disbursed to you; or (c) your violation of any third-party right, including intellectual property or privacy rights.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">7. Termination</h2>
            <p>Givebly reserves the right, at our absolute discretion, to suspend or terminate your campaign, withhold Pending funds, or remove your organization from the Platform at any time, with or without notice, if we suspect a violation of these Terms, fraudulent activity, or if your inclusion on the Platform is deemed detrimental to Givebly's brand or reputation.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-[#1A2B48] mb-3 uppercase tracking-tight">8. Governing Law & Jurisdiction</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of New South Wales.</p>
          </section>

        </div>
      </main>
    </div>
  );
}