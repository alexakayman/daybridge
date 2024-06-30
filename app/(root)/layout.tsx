// used for primary components
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="dashboard-main flex flex-col">
        <TopNav />
        {children}
      </div>
    </main>
  );
}
