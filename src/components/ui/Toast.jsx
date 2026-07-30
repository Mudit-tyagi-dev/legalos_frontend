import React from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => {
        let Icon = Info;
        let colorClasses = "bg-white text-primaryText border-border";

        if (toast.type === "success") {
          Icon = CheckCircle2;
          colorClasses = "bg-white text-primaryText border-green/30 border-l-4 border-l-green";
        } else if (toast.type === "error") {
          Icon = AlertCircle;
          colorClasses = "bg-white text-primaryText border-red/30 border-l-4 border-l-red";
        } else if (toast.type === "info") {
          Icon = Info;
          colorClasses = "bg-white text-primaryText border-primaryBlue/30 border-l-4 border-l-primaryBlue";
        }

        return (
          <div
            key={toast.id}
            className={`flex items-start justify-between p-3.5 rounded-lg border shadow-subtle ${colorClasses} transition-all duration-300 animate-slide-in`}
          >
            <div className="flex gap-2.5 items-start">
              <Icon className={`w-4 h-4 mt-0.5 ${
                toast.type === "success" ? "text-green" :
                toast.type === "error" ? "text-red" : "text-primaryBlue"
              }`} />
              <p className="text-xs font-medium leading-normal">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 text-secondaryText hover:text-primaryText rounded transition-colors ml-3"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
