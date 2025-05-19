"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { forwardRef } from "react";

// Fix: Ensure ToastViewport is passed a proper ref
const ToastViewportFixed = forwardRef<HTMLDivElement>((props, ref) => (
  <ToastViewport {...props} ref={ref} />
));
ToastViewportFixed.displayName = "ToastViewportFixed";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="border-none bg-dark-1 text-white">
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewportFixed />
    </ToastProvider>
  );
}
