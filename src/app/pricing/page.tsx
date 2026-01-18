import { PageHeader } from "@/components/layout";
import { Metadata } from "next";
import { PricingSection, FAQSection } from "@/components/landing";

export const metadata: Metadata = {
  title: "Pricing - Taskflow",
  description: "Simple, transparent pricing for teams of all sizes.",
};

export default function PricingPage() {
  return (
    <main className="bg-brand-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          title="Plans & Pricing"
          description="Choose the perfect plan for your team's needs. No hidden fees."
        />

        <div className="mt-8">
          <PricingSection />
        </div>

        <div className="mt-24">
          <FAQSection />
        </div>
      </div>
    </main>
  );
}
