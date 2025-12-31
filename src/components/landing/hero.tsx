import { Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="from-brand-50 flex min-h-screen items-center bg-linear-to-br to-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-brand-900 text-4xl font-bold md:text-6xl">
          Task Management for
          <span className="text-accent-600"> Modern Teams</span>
        </h1>
        <p className="text-brand-600 mx-auto mt-6 max-w-2xl text-xl">
          Organize, track, and complete tasks with ease. Built for teams who
          want to get things done faster.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg">Start Free Trial</Button>
          <Button size="lg" variant="secondary">
            Watch Demo
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="text-brand-400 mt-16 flex flex-wrap justify-center gap-8">
          <span>Trusted by 10,000+ teams</span>
          <span>•</span>
          <span>4.9/5 rating</span>
          <span>•</span>
          <span>No credit card required</span>
        </div>
      </div>
    </section>
  );
}
