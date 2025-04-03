import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/utils/auth";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const handleSignIn = async (formData: FormData) => {
    "use server";

    console.log("[Login] Processing sign in request");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      console.log("[Login] Calling signIn function");
      await signIn(email, password);
      console.log("[Login] Sign in successful, redirecting to dashboard");
      return redirect("/dashboard");
    } catch (error) {
      console.error("[Login] Sign in error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Could not authenticate user";
      return redirect(`/login?message=${encodeURIComponent(errorMessage)}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full px-8 sm:max-w-md justify-center gap-2">
      {/* TODO: get these side by side */}
      <div className="flex flex-row w-full align-middle gap-2">
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      </div>

      <form
        action={handleSignIn}
        className="w-full min-w-[100vw] h-full flex flex-col p-12 justify-center items-center gap-12"
      >
        <div className="card flex flex-col mx-auto grid flex-center gap-6 min-w-[300px] max-w-[400px]">
          <div className="grid gap-2 text-center items-center justify-center">
            <h2>Join Daybridge</h2>
            <p className="text-balance text-muted-foreground">
              Start banking for peace of mind.
            </p>
          </div>
          <div className="flex flex-col w-full gap-4 justify-start">
            <div>
              <Label className="text-md" htmlFor="email">
                Email
              </Label>
              <Input name="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label className="text-md" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <SubmitButton
            className="w-full bg-slate-900 text-white"
            pendingText="Signing In..."
            variant="default"
          >
            Sign In
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
