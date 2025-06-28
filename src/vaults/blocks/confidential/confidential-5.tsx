"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const AddOnRequiredPage = () => {
  const [showUpgradeDialog, setShowUpgradeDialog] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Premium Feature
          </h1>
          <p className="text-muted-foreground">
            This feature requires a premium add-on to access.
          </p>
        </div>

        <Alert variant="info" layout="complex" icon={<CreditCard size={16} />}>
          <div>
            <h3 className="font-medium text-sm mb-1">Add-on Required</h3>
            <p className="text-xs text-muted-foreground">
              Upgrade your plan to unlock this premium feature.
            </p>
          </div>
        </Alert>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-sm mb-2">
              Premium Add-on Benefits
            </h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Advanced analytics and reporting</li>
              <li>• Priority customer support</li>
              <li>• Extended storage capacity</li>
              <li>• Custom integrations</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full group"
              onClick={() => setShowUpgradeDialog(true)}
            >
              Upgrade Now
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button className="w-full" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upgrade to Premium</DialogTitle>
              <DialogDescription>
                Choose a plan that works best for you and unlock all premium
                features.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Premium Add-on</h4>
                  <span className="text-lg font-bold">$19/mo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All premium features included
                </p>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Subscribe Now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const ConfidentialAccessDemo = () => {
  return (
    <div className="space-y-4">
      <AddOnRequiredPage />
    </div>
  );
};

export default ConfidentialAccessDemo;
