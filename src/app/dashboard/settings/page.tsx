import { prisma, requireAuth } from "@/lib";
import { PageHeader } from "@/components/layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { AvatarUpload } from "@/components/settings";

export default async function SettingsPage() {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true, name: true },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />

      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Update your avatar to be recognized by your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xl">
            <AvatarUpload
              currentAvatar={user?.image || null}
              userName={user?.name || session.user.name || "User"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
