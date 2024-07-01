// used for auth components

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="h-full min-h-[100vh]">{children}</main>;
}
