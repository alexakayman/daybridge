import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="bio-text flex flex-row justify-center align-middle items-center gap-1">
      <div className="bio-content flex flex-row gap-2">
        <Image
          className="bio-image"
          src={user?.avatar_url || "/assets/userheadshot.png"}
          height={45}
          width={45}
          alt="User Profile"
        />
        <div className="bio-text flex flex-row gap-1 justify-center items-start">
          <div className="bio-text flex flex-col gap-1">
            <p className="bio-name pb-1">{user?.full_name || "You"}</p>
            <p className="bio-email pb-1">{user.email}</p>
          </div>
          <form action={signOut}>
            <button>
              <Image
                src="/icons/logout.svg"
                width={16}
                height={16}
                alt="Logout"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
