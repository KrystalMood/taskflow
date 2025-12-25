"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "You get 14 days of full access to all Pro features. No credit card required. Cancel anytime.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption and security measures to protect your data.",
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer:
      "Yes, we offer 50% off for verified nonprofit organizations. Contact us for details.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with Slack, GitHub, Google Workspace, and many more. Check our integrations page for the full list.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" className="bg-white">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers"
      />
      <div className="mx-auto max-w-2xl space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-brand-200 overflow-hidden rounded-lg border bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="text-brand-900 hover:bg-brand-50 flex w-full items-center justify-between p-4 text-left font-medium transition-colors"
            >
              {faq.question}
              <span
                className={cn(
                  "transition-transform",
                  openIndex === index && "rotate-180"
                )}
              >
                ▼
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all",
                openIndex === index ? "max-h-40" : "max-h-0"
              )}
            >
              <p className="text-brand-600 p-4">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
