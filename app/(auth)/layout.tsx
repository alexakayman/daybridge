// used for auth components

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container relative h-full min-h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
