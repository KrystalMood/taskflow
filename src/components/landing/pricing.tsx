import {
  Section,
  SectionHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals",
    features: [
      "5 Projects",
      "10 Tasks per project",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "Best for growing teams",
    features: [
      "Unlimited projects",
      "Unlimited tasks",
      "Advanced analytics",
      "Priority support",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "SSO integration",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <Section id="pricing" className="bg-brand-50">
      <SectionHeader
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that works for your team"
      />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative flex flex-col p-8",
              plan.popular && "border-accent-600 border-2 shadow-lg"
            )}
          >
            {plan.popular && (
              <span className="bg-accent-600 absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-sm text-white">
                Most Popular
              </span>
            )}
            <CardHeader className="p-0 pb-6">
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-brand-900 text-4xl font-bold">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-brand-500">{plan.period}</span>
                )}
              </div>
              <p className="text-brand-600 mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-0">
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-brand-600 flex items-center gap-2"
                  >
                    <span className="text-success-500">
                      <CheckIcon />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "primary" : "secondary"}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
