import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import CommandPalette from "../components/ui/CommandPalette";
import ToastContainer from "../components/ui/Toast";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Panel */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Workspace Page Area */}
        <main className="flex-1 overflow-y-auto px-8 py-6 relative">
          <Outlet />
        </main>
      </div>

      {/* Global Command Console */}
      <CommandPalette />

      {/* Action Notification System */}
      <ToastContainer />
    </div>
  );
}
