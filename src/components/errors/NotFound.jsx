import React from "react";
import { Link } from "react-router-dom";
import { Gavel } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center text-center p-6 font-sans select-none">
      <div className="space-y-4 max-w-sm">
        <Gavel className="w-10 h-10 text-primaryBlue mx-auto" />
        <h1 className="text-2xl font-bold text-primaryText">404 - Reference Not Found</h1>
        <p className="text-xs text-secondaryText leading-relaxed">
          The requested judgment page, statutory article, section, or collection brief does not exist or has been archived.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-primaryText hover:bg-primaryText/90 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
