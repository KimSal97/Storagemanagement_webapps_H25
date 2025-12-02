"use client";
import Sidebar from "@/components/Dashboard/Sidebar";
import ProfileSettings from "./ProfileSettings";

export default function SettingsPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Innstillinger</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <ProfileSettings />
        </div>
      </div>
    </div>
  );
}
