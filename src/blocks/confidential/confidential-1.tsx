"use client";

import * as React from "react";
import { useState } from "react";
import { Lock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { resolve } from "path";
import { Button } from "@/components/ui/button";

interface ConfidentialAccessProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onRequestAccess?: () => void;
  className?: string;
}
export function Confidential_1({
  title = "Confidential Access Required",
  description = "This content is restricted and requires special authorization to view. Please contact your administrator or request access below.",
  icon = <Lock className="h-12 w-12 text-muted-foreground" />,
  onRequestAccess = () => console.log("Access requested"),
  className,
}: ConfidentialAccessProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestAccess = async () => {
    setIsRequesting(true);
    await new Promise(() => setTimeout(resolve, 2000));
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
              <Shield className="h-4 w-h4" />
              <span>Secure Authentication required</span>
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
              ></motion.div>
            ) : (
              "Request Access"
            )}
          </Button>

          <div className="texxt-center">
            <Button variant="link" className="text-sm">
              Contact Administrator
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
