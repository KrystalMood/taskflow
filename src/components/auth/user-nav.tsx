"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="bg-brand-200 h-10 w-24 animate-pulse rounded-md" />;
  }

  if (!session?.user) {
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

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-brand-100 border-brand-200 relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-brand-700 text-xs font-bold">{initials}</div>
          )}
        </div>

        <div className="hidden flex-col md:flex">
          <span className="text-brand-900 text-sm font-medium">
            {session.user.name || "User"}
          </span>
          <span className="text-brand-500 text-xs">{session.user.email}</span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-brand-600 hover:text-danger-600 hover:bg-danger-50"
      >
        Sign Out
      </Button>
    </div>
  );
}
