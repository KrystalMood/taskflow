import { Section, Button } from "@/components/ui";

export function CTASection() {
  return (
    <Section id="cta" className="bg-accent-600">
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-accent-100 mx-auto mt-4 max-w-2xl text-lg">
          Join thousands of teams already using TaskFlow to get more done. Start
          your free trial today.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="text-accent-600 hover:bg-accent-50 bg-white"
          >
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="hover:bg-accent-700 border-white text-white"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </Section>
  );
}
