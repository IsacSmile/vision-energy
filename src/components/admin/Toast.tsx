"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

let toastListeners: ((toasts: ToastMessage[]) => void)[] = [];
let toastState: ToastMessage[] = [];

export function showToast(text: string, type: "success" | "error" | "info" = "success") {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: ToastMessage = { id, type, text };
  toastState = [...toastState, newToast];
  toastListeners.forEach((listener) => listener(toastState));

  setTimeout(() => {
    toastState = toastState.filter((t) => t.id !== id);
    toastListeners.forEach((listener) => listener(toastState));
  }, 4000);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setToasts);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all ${
            toast.type === "success"
              ? "bg-[#0D1117]/95 border-[#A3E635]/40 text-white"
              : toast.type === "error"
              ? "bg-[#0D1117]/95 border-red-500/40 text-white"
              : "bg-[#0D1117]/95 border-[#0B65B3]/40 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-[#A3E635] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <p className="text-xs font-medium leading-relaxed flex-1">{toast.text}</p>
          <button
            onClick={() => {
              toastState = toastState.filter((t) => t.id !== toast.id);
              toastListeners.forEach((listener) => listener(toastState));
            }}
            className="text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
