import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  BrainCircuit,
  FileText,
  BookOpen,
  Bookmark,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Gavel
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, shortcut: "⌥1" },
    { name: "Global Search", path: "/search", icon: Search, shortcut: "⌥2" },
    { name: "AI Research", path: "/ai-research", icon: BrainCircuit, shortcut: "⌥3" },
    { name: "Document Workspace", path: "/workspace", icon: FileText, shortcut: "⌥4" },
    { name: "Bare Acts", path: "/acts", icon: BookOpen, shortcut: "⌥5" },
    { name: "Bookmarks", path: "/bookmarks", icon: Bookmark, shortcut: "⌥6" },
  ];

  const bottomItems = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div
      className={`h-screen border-r border-border bg-white flex flex-col transition-all duration-300 select-none ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4">
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-primaryText text-lg tracking-tight">
            <Gavel className="w-5 h-5 text-primaryBlue" />
            <span>Legal<span className="text-primaryBlue">OS</span></span>
          </Link>
        )}
        {isCollapsed && (
          <Link to="/dashboard" className="mx-auto">
            <Gavel className="w-6 h-6 text-primaryBlue" />
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-background border border-transparent hover:border-border rounded transition-colors text-secondaryText"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group ${
                isActive
                  ? "bg-primaryBlue/5 text-primaryBlue font-medium"
                  : "text-secondaryText hover:text-primaryText hover:bg-background"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${isActive ? "text-primaryBlue" : "text-secondaryText group-hover:text-primaryText"}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
              {!isCollapsed && item.shortcut && (
                <span className="text-[10px] text-secondaryText/60 bg-background px-1.5 py-0.5 rounded border border-border/50 font-mono">
                  {item.shortcut}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile & Settings */}
      <div className="p-2 border-t border-border space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group ${
                isActive
                  ? "bg-primaryBlue/5 text-primaryBlue font-medium"
                  : "text-secondaryText hover:text-primaryText hover:bg-background"
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? "text-primaryBlue" : "text-secondaryText group-hover:text-primaryText"}`} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
