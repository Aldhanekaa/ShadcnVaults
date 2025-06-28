"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Lock, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const alertVariants = cva("relative rounded-lg border", {
  variants: {
    variant: {
      default: "border-border bg-background",
      warning: "border-amber-500/50 text-amber-600",
      error: "border-red-500/50 text-red-600",
      success: "border-emerald-500/50",
      info: "border-blue-500/50 text-blue-600",
    },
    size: {
      sm: "px-4 py-3",
      lg: "p-4",
    },
    isNotification: {
      true: "z-[100] max-w-[400px] bg-background shadow-lg shadow-black/5",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
    isNotification: false,
  },
});

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  layout?: "row" | "complex";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      size,
      isNotification,
      icon,
      action,
      layout = "row",
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant, size, isNotification }),
        className
      )}
      {...props}
    >
      {layout === "row" ? (
        <div className="flex items-center gap-2">
          <div className="grow flex items-center">
            {icon && <span className="me-3 inline-flex">{icon}</span>}
            {children}
          </div>
          {action && <div className="flex items-center shrink-0">{action}</div>}
        </div>
      ) : (
        <div className="flex gap-2">
          {icon && children ? (
            <div className="flex grow gap-3">
              <span className="mt-0.5 shrink-0">{icon}</span>
              <div className="grow">{children}</div>
            </div>
          ) : (
            <div className="grow">
              {icon && <span className="me-3 inline-flex">{icon}</span>}
              {children}
            </div>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
    </div>
  )
);
Alert.displayName = "Alert";

const ConfidentialAccessPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Confidential Access
          </h1>
          <p className="text-muted-foreground">
            This content is restricted and requires special permissions to
            access.
          </p>
        </div>

        <Alert
          variant="error"
          layout="complex"
          icon={<AlertTriangle size={16} />}
        >
          <div>
            <h3 className="font-medium text-sm mb-1">Access Denied</h3>
            <p className="text-xs text-muted-foreground">
              You don't have the necessary permissions to view this content.
            </p>
          </div>
        </Alert>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-sm">Security Level: High</h3>
                <p className="text-xs text-muted-foreground">
                  Requires administrator approval
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" variant="outline">
              Request Access
            </Button>
            <Button className="w-full" variant="ghost">
              Contact Administrator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfidentialAccessDemo = () => {
  return (
    <div className="space-y-4">
      <ConfidentialAccessPage />
    </div>
  );
};

export default ConfidentialAccessDemo;
