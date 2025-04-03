import React from "react";
import Sidebar from "@/components/Sidebar";
import DemoDashboard from "@/components/DemoDashboard";

export default function Index() {
  return (
    <div className="flex flex-row w-full min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <DemoDashboard />
      </main>
    </div>
  );
}
