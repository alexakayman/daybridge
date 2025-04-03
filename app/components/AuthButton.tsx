"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <Button variant="ghost" className="w-full" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
