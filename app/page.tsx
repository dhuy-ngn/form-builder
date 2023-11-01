"use client";

import { SignOutButton, UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <SignOutButton />
      <UserProfile />
    </main>
  );
}
