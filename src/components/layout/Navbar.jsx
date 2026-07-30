import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Search, Bell, Keyboard, LogOut } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const { user, setCommandPaletteOpen, addToast } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Create clean breadcrumbs based on route
  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length === 0) return [{ label: "LegalOS", path: "/dashboard" }];

    return [
      { label: "LegalOS", path: "/dashboard" },
      ...paths.map((path, index) => {
        const url = `/${paths.slice(0, index + 1).join("/")}`;
        const label = path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        return { label, path: url };
      })
    ];
  };

  const handleLogout = () => {
    addToast("Logged out successfully", "info");
    navigate("/auth/login");
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-6 select-none shrink-0 z-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-secondaryText">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.path}>
            {idx > 0 && <span className="text-border">/</span>}
            <Link
              to={crumb.path}
              className={`hover:text-primaryText transition-colors font-medium ${
                idx === breadcrumbs.length - 1 ? "text-primaryText font-semibold pointer-events-none" : ""
              }`}
            >
              {crumb.label}
            </Link>
          </React.Fragment>
        ))}
      </nav>

      {/* Action Center */}
      <div className="flex items-center gap-4">
        {/* Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border hover:border-secondaryText/40 rounded-lg text-xs text-secondaryText transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick search...</span>
          <span className="font-mono text-[10px] bg-white border border-border/80 px-1 py-0.25 rounded">
            Ctrl+K
          </span>
        </button>

        {/* Notifications & Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast("You have no new notifications", "info")}
            className="p-2 hover:bg-background rounded-lg border border-transparent hover:border-border text-secondaryText hover:text-primaryText transition-all relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primaryBlue rounded-full"></span>
          </button>

          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="p-2 hover:bg-background rounded-lg border border-transparent hover:border-border text-secondaryText hover:text-primaryText transition-all"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>

        {/* User Card */}
        <div className="h-6 w-px bg-border"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-primaryText leading-none">{user.name}</p>
            <span className="text-[10px] text-secondaryText leading-none">{user.role}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primaryBlue/10 text-primaryBlue flex items-center justify-between font-semibold text-xs border border-primaryBlue/20 shadow-sm justify-center">
            {user.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red/5 hover:border-red/20 rounded-lg border border-transparent text-secondaryText hover:text-red transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
