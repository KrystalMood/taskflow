import { Section, SectionHeader, Card, CardContent } from "@/components/ui";

const features = [
  {
    icon: "📋",
    title: "Task Management",
    description: "Create, assign, and track tasks with an intuitive interface",
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    description: "Work together in real-time with comments and mentions",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    description: "Track progress with detailed reports and insights",
  },
  {
    icon: "🔔",
    title: "Smart Notifications",
    description: "Stay updated with customizable alerts and reminders",
  },
  {
    icon: "📱",
    title: "Mobile Ready",
    description: "Access your tasks anywhere with our mobile-friendly design",
  },
  {
    icon: "🔒",
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
              <span className="text-4xl">{feature.icon}</span>
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
