'use client';

import React, { forwardRef } from 'react'; // ✅ Only this one
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import type { ToastViewportProps } from '@radix-ui/react-toast';

const ToastViewportFixed = forwardRef<HTMLOListElement, ToastViewportProps>((props, ref) => (
  <ToastViewport {...props} ref={ref} />
));
ToastViewportFixed.displayName = 'ToastViewportFixed';

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
