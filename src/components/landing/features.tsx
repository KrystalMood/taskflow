import { Section, SectionHeader, Card, CardContent } from "@/components/ui";
import {
  BarChart3,
  Bell,
  CheckSquare,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <CheckSquare className="text-brand-600 mx-auto h-12 w-12" />,
    title: "Task Management",
    description: "Create, assign, and track tasks with an intuitive interface",
  },
  {
    icon: <Users className="text-brand-600 mx-auto h-12 w-12" />,
    title: "Team Collaboration",
    description: "Work together in real-time with comments and mentions",
  },
  {
    icon: <BarChart3 className="text-brand-600 mx-auto h-12 w-12" />,
    title: "Analytics Dashboard",
    description: "Track progress with detailed reports and insights",
  },
  {
    icon: <Bell className="text-brand-600 mx-auto h-12 w-12" />,
    title: "Smart Notifications",
    description: "Stay updated with customizable alerts and reminders",
  },
  {
    icon: <Smartphone className="text-brand-600 mx-auto h-12 w-12" />,
    title: "Mobile Ready",
    description: "Access your tasks anywhere with our mobile-friendly design",
  },
  {
    icon: <ShieldCheck className="text-brand-600 mx-auto h-12 w-12" />,
    title: "Enterprise Security",
    description: "Keep your data safe with enterprise-grade security",
  },
];

export function FeaturesSection() {
  return (
    <Section id="features" className="bg-brand-50">
      <SectionHeader
        title="Everything You Need"
        subtitle="Powerful features to help your team succeed"
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="p-8 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-brand-900 mt-4 text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-brand-600 mt-2">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
