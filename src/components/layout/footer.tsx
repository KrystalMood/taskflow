import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-brand-200 border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-brand-900 text-xl font-bold">
              Task<span className="text-accent-600">Flow</span>
            </Link>
            <p className="text-brand-500 mt-2 text-sm">
              Task management untuk tim modern.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-brand-900 mb-3 font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-brand-600 hover:text-brand-900"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-brand-600 hover:text-brand-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-brand-900 mb-3 font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-brand-600 hover:text-brand-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-brand-600 hover:text-brand-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-brand-900 mb-3 font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-brand-600 hover:text-brand-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-brand-600 hover:text-brand-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-brand-200 text-brand-500 mt-8 border-t pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
