"use client";

import * as React from "react";
import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  X,
  Lock,
  Shield,
  CreditCard,
  Eye,
  EyeOff,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

interface ConfidentialAccessProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onRequestAccess?: () => void;
  className?: string;
}

function ConfidentialAccess({
  title = "Confidential Access Required",
  description = "This content is restricted and requires special authorization to view. Please contact your administrator or request access below.",
  icon = <Lock className="h-12 w-12 text-muted-foreground" />,
  onRequestAccess = () => console.log("Access requested"),
  className,
}: ConfidentialAccessProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestAccess = async () => {
    setIsRequesting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onRequestAccess();
    setIsRequesting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex min-h-screen items-center justify-center bg-background p-4",
        className
      )}
    >
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="space-y-4"
        >
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure authentication required</span>
            </div>
          </div>

          <Button
            onClick={handleRequestAccess}
            disabled={isRequesting}
            className="w-full"
            size="lg"
          >
            {isRequesting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
              />
            ) : (
              "Request Access"
            )}
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-sm">
              Contact Administrator
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface PremiumUpgradeProps {
  title?: string;
  description?: string;
  features?: string[];
  price?: string;
  onUpgrade?: () => void;
  onContactSales?: () => void;
  className?: string;
}

function PremiumUpgrade({
  title = "Premium Add-on Required",
  description = "Unlock this feature with our premium add-on package. Get access to advanced tools and enhanced functionality.",
  features = [
    "Advanced analytics and reporting",
    "Priority customer support",
    "Enhanced security features",
    "Custom integrations",
  ],
  price = "$29/month",
  onUpgrade = () => console.log("Upgrade clicked"),
  onContactSales = () => console.log("Contact sales clicked"),
  className,
}: PremiumUpgradeProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onUpgrade();
    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex min-h-screen items-center justify-center bg-background p-4",
        className
      )}
    >
      <div className="w-full max-w-lg space-y-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500">
            <CreditCard className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-4 text-center">
            <div className="text-3xl font-bold text-foreground">{price}</div>
            <div className="text-sm text-muted-foreground">per user</div>
          </div>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                className="flex items-center space-x-3"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <AnimatePresence>
          {!showPayment ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="space-y-3"
            >
              <Button
                onClick={() => setShowPayment(true)}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
              <Button
                variant="outline"
                onClick={onContactSales}
                className="w-full"
              >
                Contact Sales
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 rounded-lg border border-border bg-muted/50 p-4"
            >
              <h3 className="font-semibold text-foreground">Payment Details</h3>
              <div className="space-y-3">
                <Input placeholder="Card number" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </div>
                <Input placeholder="Cardholder name" />
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                    />
                  ) : (
                    "Complete Purchase"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPayment(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="flex items-center justify-center space-x-2 text-xs text-muted-foreground"
        >
          <Shield className="h-3 w-3" />
          <span>Secure payment processing</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface AccessDeniedProps {
  variant?: "confidential" | "premium";
  title?: string;
  description?: string;
  className?: string;
}

function AccessDenied({
  variant = "confidential",
  title,
  description,
  className,
}: AccessDeniedProps) {
  if (variant === "premium") {
    return (
      <PremiumUpgrade
        title={title}
        description={description}
        className={className}
      />
    );
  }

  return (
    <ConfidentialAccess
      title={title}
      description={description}
      className={className}
    />
  );
}

function AccessDeniedDemo() {
  const [currentView, setCurrentView] = useState<"confidential" | "premium">(
    "confidential"
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 left-4 z-10 space-x-2">
        <Button
          variant={currentView === "confidential" ? "default" : "outline"}
          onClick={() => setCurrentView("confidential")}
          size="sm"
        >
          Confidential
        </Button>
        <Button
          variant={currentView === "premium" ? "default" : "outline"}
          onClick={() => setCurrentView("premium")}
          size="sm"
        >
          Premium
        </Button>
      </div>

      <AccessDenied variant={currentView} />
    </div>
  );
}

export default AccessDeniedDemo;
