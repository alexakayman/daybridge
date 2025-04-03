"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthButton() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <Button variant="ghost" className="w-full" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
