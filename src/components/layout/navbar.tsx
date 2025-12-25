import Link from "next/link";
import { Button } from "@/components/ui";

export function Navbar() {
  return (
    <header className="border-brand-200 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-brand-900 text-xl font-bold">
          Task<span className="text-accent-600">Flow</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/about"
            className="text-brand-600 hover:text-brand-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="text-brand-600 hover:text-brand-900 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-brand-600 hover:text-brand-900 transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
