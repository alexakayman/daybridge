import { getServerUser } from "@/utils/auth/server";

export default async function AccountsPage() {
  const user = await getServerUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>
      <p>Welcome, {user?.name || user?.email}!</p>
      {/* Add your accounts content here */}
    </div>
  );
}
