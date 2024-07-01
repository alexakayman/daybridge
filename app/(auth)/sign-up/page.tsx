import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
  return (
    <div className="w-full min-w-[100vw] flex flex-col p-12 justify-center items-center gap-12">
      <div>
        <Image src="/assets/Logo.svg" alt="Daybridge" width="180" height="64" />
      </div>
      <div className="flex items-center justify-center">
        <div className="card flex flex-col mx-auto grid gap-6 min-w-[300px]">
          <div className="grid gap-2 text-center">
            <h2>Join Daybridge</h2>
            <p className="text-balance text-muted-foreground">
              Start banking for peace of mind.
            </p>
          </div>
          <div className="grid gap-4 w-full">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-md">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2 w-full">
              <div className="flex flex-col w-full">
                <Label htmlFor="password" className="text-md">
                  Password
                </Label>
              </div>
              <Input
                className="w-full"
                id="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-slate-900 text-white">
              Get Started
            </Button>
            <Button variant="outline" className="w-full">
              Get Started with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
