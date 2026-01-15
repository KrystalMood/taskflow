import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Select,
  Textarea,
  SubmitButton,
  ColorPicker,
  Breadcrumb,
} from "@/components/ui";

export default function DesignPage() {
  return (
    <div className="bg-brand-50 text-brand-900 min-h-screen py-10 pb-20">
      <div className="container mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-brand-900 text-4xl font-bold">Design System</h1>
          <p className="text-brand-600 text-lg">
            Overview of the design tokens and components used in TaskFlow.
          </p>
        </div>

        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-brand-900 text-2xl font-semibold">Colors</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (step) => (
                <div key={step} className="space-y-2">
                  <div
                    className={`h-20 w-full rounded-lg shadow-sm bg-brand-${step}`}
                  />
                  <div className="text-center text-xs font-medium">
                    brand-{step}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (step) => (
                <div key={step} className="space-y-2">
                  <div
                    className={`h-20 w-full rounded-lg shadow-sm bg-accent-${step}`}
                  />
                  <div className="text-center text-xs font-medium">
                    accent-{step}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-brand-900 text-2xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-brand-900 text-2xl font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-brand-900 text-2xl font-semibold">Cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  Card Description adds context.
                </CardDescription>
              </CardHeader>
              <CardContent>
                This is the main content of the card. It uses standard padding
                and spacing from the design system.
              </CardContent>
            </Card>
            <Card className="border-accent-200 bg-accent-50">
              <CardHeader>
                <CardTitle className="text-accent-900">Accent Card</CardTitle>
                <CardDescription className="text-accent-600">
                  A variation using accent colors.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-accent-700">
                Useful for highlighting premium or featured content.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-6">
          <h2 className="text-brand-900 text-2xl font-semibold">
            Form Elements
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Input label="Email Address" placeholder="name@example.com" />
            <Select
              label="Role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "guest", label: "Guest" },
              ]}
            />
          </div>
        </section>

        {/* Input and Actions */}
        <section className="space-y-6">
          <h2 className="text-brand-900 text-2xl font-semibold">
            Advanced Inputs & Actions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Textarea
              label="Bio / Description"
              placeholder="Tell us about yourself..."
              rows={4}
            />
            <div className="space-y-6">
              <ColorPicker
                label="Project Color"
                name="color"
                defaultValue="#3b82f6"
              />
              <div className="space-y-2">
                <label className="text-brand-700 text-sm font-medium">
                  Submit Button (Loading State)
                </label>
                <div className="flex gap-4">
                  <SubmitButton>Save Changes</SubmitButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="space-y-6">
          <h2 className="text-brand-900 text-2xl font-semibold">Navigation</h2>
          <div className="space-y-4">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Design System", href: "/design", active: true },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
