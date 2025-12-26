"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui";

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="bg-brand-200 h-8 w-20 animate-pulse rounded" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/login">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-brand-600 text-sm">
        {session.user?.name || session.user?.email}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </Button>
    </div>
  );
}
