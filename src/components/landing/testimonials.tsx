import { Card, CardContent, Section, SectionHeader } from "@/components/ui";

const testimonials = [
  {
    quote:
      "TaskFlow has transformed how our team collaborates. We've increased productivity by 40%.",
    author: "Sarah Johnson",
    role: "CEO, TechStartup",
  },
  {
    quote: "The best task management tool we've used. Simple yet powerful.",
    author: "Michael Chen",
    role: "Project Manager, DesignCo",
  },
  {
    quote: "Finally, a tool that our entire team actually enjoys using!",
    author: "Emily Rodriguez",
    role: "Team Lead, MarketingPro",
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="bg-white">
      <SectionHeader
        title="Loved by Teams"
        subtitle="See what our customers have to say"
      />
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.author} className="p-6">
            <CardContent className="pt-0">
              <p className="text-brand-600 text-lg italic">
                &quot;{item.quote}&quot;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="bg-accent-100 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-accent-600 font-bold">
                    {item.author.charAt(0)}
                  </span>
                </div>

                <div>
                  <p className="text-brand-900 font-semibold">{item.author}</p>
                  <p className="text-brand-500 text-sm">{item.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
