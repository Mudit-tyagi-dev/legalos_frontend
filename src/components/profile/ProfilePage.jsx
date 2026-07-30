import React, { useState } from "react";
import { User, Shield, Key, Database, RefreshCw, Copy, Check } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ProfilePage() {
  const { user, addToast } = useApp();
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateApiKey = () => {
    setLoading(true);
    setTimeout(() => {
      const hex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      setApiKey(`legalos_live_sk_${hex.slice(0, 16)}...`);
      setLoading(false);
      addToast("Successfully generated new API Key", "success");
    }, 1000);
  };

  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText("legalos_live_sk_8f294a2b918c5e3d74f29a28bc01d129");
    setCopied(true);
    addToast("Mock full API key copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const usageStats = [
    { label: "AI Search Queries", current: 45, max: 100, percentage: 45 },
    { label: "AI Document Workspace", current: 2, max: 20, percentage: 10 },
    { label: "Shared Research Collections", current: 3, max: 10, percentage: 30 }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-primaryText">User Profile</h1>
        <p className="text-xs text-secondaryText mt-0.5">Manage details, credentials, and API access.</p>
      </div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Account Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Details Card */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-subtle space-y-4">
            <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-primaryBlue" />
              <span>Chamber Account</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-secondaryText uppercase">Full Name</label>
                <div className="mt-1 text-xs font-medium text-primaryText bg-background border border-border rounded-lg px-3 py-2">
                  {user.name}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-secondaryText uppercase">Email Address</label>
                <div className="mt-1 text-xs font-medium text-primaryText bg-background border border-border rounded-lg px-3 py-2">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-secondaryText uppercase">Assigned Role</label>
                <div className="mt-1 text-xs font-medium text-primaryText bg-background border border-border rounded-lg px-3 py-2">
                  {user.role}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-secondaryText uppercase">Organization</label>
                <div className="mt-1 text-xs font-medium text-primaryText bg-background border border-border rounded-lg px-3 py-2">
                  {user.firm || "Supreme Constitutional Chambers"}
                </div>
              </div>
            </div>
          </div>

          {/* Security & Access API Keys */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-subtle space-y-4">
            <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-yellow" />
              <span>Developer Keys (Future Integration)</span>
            </h3>
            <p className="text-[11px] text-secondaryText leading-relaxed">
              Integrate the LegalOS AI search engine directly inside your custom internal litigation briefs or law chamber software.
            </p>

            <div className="space-y-3 pt-2">
              {apiKey ? (
                <div className="flex gap-2">
                  <div className="flex-1 bg-background font-mono text-[10px] border border-border rounded-lg px-3 py-2 flex items-center justify-between text-primaryText font-semibold">
                    <span>{apiKey}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-3 border border-border hover:border-secondaryText/30 rounded-lg text-secondaryText hover:text-primaryText transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={generateApiKey}
                    className="px-3 border border-border hover:border-secondaryText/30 rounded-lg text-secondaryText hover:text-primaryText transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                    title="Rotate Key"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={generateApiKey}
                  disabled={loading}
                  className="bg-primaryText hover:bg-primaryText/90 disabled:bg-secondaryText/30 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  {loading ? "Generating..." : "Generate API Key"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Usage Statistics */}
        <div className="space-y-6">
          <div className="bg-white border border-border rounded-xl p-5 shadow-subtle space-y-4">
            <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-green" />
              <span>Chamber Plan & Usage</span>
            </h3>

            <div className="space-y-4">
              {usageStats.map((stat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-primaryText">{stat.label}</span>
                    <span className="text-secondaryText">{stat.current} / {stat.max}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-border/40">
                    <div
                      className="bg-primaryBlue h-full rounded-full transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-border flex justify-between items-center text-[11px]">
              <span className="text-secondaryText font-medium">Plan Tier: <span className="text-primaryBlue font-bold">Chamber Enterprise</span></span>
              <a href="#" className="text-primaryBlue hover:underline font-semibold">Upgrade plan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
