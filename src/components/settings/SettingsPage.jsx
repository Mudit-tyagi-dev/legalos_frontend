import React, { useState } from "react";
import { Sliders, Bell, EyeOff, Layout, Save } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function SettingsPage() {
  const { addToast } = useApp();
  const [theme, setTheme] = useState("light");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [statusAlerts, setStatusAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [encryptLogs, setEncryptLogs] = useState(true);
  const [telemetry, setTelemetry] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Workspace settings saved successfully", "success");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto select-none">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-primaryText">Platform Settings</h1>
        <p className="text-xs text-secondaryText mt-0.5">Customize workspace parameters and telemetry encryption.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Workspace Theme Preference */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-subtle space-y-4">
          <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
            <Layout className="w-4 h-4 text-primaryBlue" />
            <span>Theme Configuration</span>
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "light", name: "System Light", desc: "Minimal white & slate" },
              { id: "dark", name: "System Dark (Beta)", desc: "Deep dark charcoal" },
              { id: "amoled", name: "Contrast", desc: "Pure high contrast" }
            ].map((t) => {
              const isSelected = theme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    addToast(`Theme toggled to ${t.name}`, "info");
                  }}
                  className={`p-3 border rounded-xl cursor-pointer text-left transition-all ${
                    isSelected
                      ? "border-primaryBlue bg-primaryBlue/5"
                      : "border-border hover:border-secondaryText/30"
                  }`}
                >
                  <span className="block text-xs font-bold text-primaryText">{t.name}</span>
                  <span className="block text-[10px] text-secondaryText mt-0.5">{t.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications Preferences */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-subtle space-y-4">
          <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-yellow" />
            <span>Email & Platform Notifications</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4.5 w-4.5 text-primaryBlue border-border rounded mt-0.5 cursor-pointer"
              />
              <div>
                <span className="block text-xs font-semibold text-primaryText">Litigation Alerts</span>
                <span className="block text-[10px] text-secondaryText">Send emails when active judgments or bare acts referenced in folders update.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-border/60">
              <input
                type="checkbox"
                checked={statusAlerts}
                onChange={(e) => setStatusAlerts(e.target.checked)}
                className="h-4.5 w-4.5 text-primaryBlue border-border rounded mt-0.5 cursor-pointer"
              />
              <div>
                <span className="block text-xs font-semibold text-primaryText">AI Analysis Logs</span>
                <span className="block text-[10px] text-secondaryText">Show toast notifications when background briefs upload and process completely.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-border/60">
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="h-4.5 w-4.5 text-primaryBlue border-border rounded mt-0.5 cursor-pointer"
              />
              <div>
                <span className="block text-xs font-semibold text-primaryText">Weekly Chamber Digest</span>
                <span className="block text-[10px] text-secondaryText">Receive a weekly email summarizing constitutional law updates, acts revisions, and popular citations.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Security & Encryption Privacy */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-subtle space-y-4">
          <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-green" />
            <span>Search Encryptions & Telemetry</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={encryptLogs}
                onChange={(e) => setEncryptLogs(e.target.checked)}
                className="h-4.5 w-4.5 text-primaryBlue border-border rounded mt-0.5 cursor-pointer"
              />
              <div>
                <span className="block text-xs font-semibold text-primaryText">End-to-End Encrypted Query Log</span>
                <span className="block text-[10px] text-secondaryText">Encrypt search terms so even chamber administrators cannot read research queries.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-border/60">
              <input
                type="checkbox"
                checked={telemetry}
                onChange={(e) => setTelemetry(e.target.checked)}
                className="h-4.5 w-4.5 text-primaryBlue border-border rounded mt-0.5 cursor-pointer"
              />
              <div>
                <span className="block text-xs font-semibold text-primaryText">Anonymized telemetry</span>
                <span className="block text-[10px] text-secondaryText">Share anonymous usage data to train the LegalOS LLM models.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Save Settings Trigger */}
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 bg-primaryText hover:bg-primaryText/90 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
}
