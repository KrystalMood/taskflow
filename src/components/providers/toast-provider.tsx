"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Toast, ToastContextType } from "@/types/toast";
import { ToastContainer } from "@/components/ui/toast-container";

const ToastContext = createContext<ToastContextType | null>(null);

const MAX_TOASTS = 3;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev.slice(-(MAX_TOASTS - 1)), { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return {
    success: (title: string, message?: string) =>
      context.addToast({ type: "success", title, message }),
    error: (title: string, message?: string) =>
      context.addToast({ type: "error", title, message }),
    warning: (title: string, message?: string) =>
      context.addToast({ type: "warning", title, message }),
    info: (title: string, message?: string) =>
      context.addToast({ type: "info", title, message }),
  };
}
