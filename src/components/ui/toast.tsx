"use client";

import { Toast as ToastType } from "@/types/toast";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useEffect } from "react";

const TOAST_ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TOAST_STYLES = {
  success: "bg-success-50 border-success-200 text-success-800",
  error: "bg-danger-50 border-danger-200 text-danger-800",
  warning: "bg-warning-50 border-warning-200 text-warning-800",
  info: "bg-accent-50 border-accent-200 text-accent-800",
};

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = TOAST_ICONS[toast.type];
  const duration = toast.duration ?? (toast.type === "error" ? 0 : 4000);

  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <div
      className={`animate-in slide-in-from-top-5 fade-in flex items-start gap-3 rounded-lg border p-4 shadow-lg duration-300 ${TOAST_STYLES[toast.type]}`}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="font-medium">{toast.title}</p>
        {toast.message && (
          <p className="mt-1 text-sm opacity-80">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
