import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/utils/auth";

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const handleSignUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      await signUp(email, password, name);
      return redirect("/dashboard");
    } catch (error) {
      return redirect("/signup?message=Could not create account");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full px-8 sm:max-w-md justify-center gap-2">
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
          </svg>{" "}
          Back
        </Link>
      </div>

      <form className="w-full min-w-[100vw] h-full flex flex-col p-12 justify-center items-center gap-12">
        <div className="card flex flex-col mx-auto grid flex-center gap-6 min-w-[300px] max-w-[400px]">
          <div className="grid gap-2 text-center items-center justify-center">
            <h2>Create Account</h2>
            <p className="text-balance text-muted-foreground">
              Join Daybridge today.
            </p>
          </div>
          <div className="flex flex-col w-full gap-4 justify-start">
            <div>
              <Label className="text-md" htmlFor="name">
                Name
              </Label>
              <Input name="name" placeholder="Your Name" required />
            </div>
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
            formAction={handleSignUp}
            className="w-full bg-slate-900 text-white"
            pendingText="Creating Account..."
            variant={"default"}
          >
            Sign Up
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
