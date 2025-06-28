"use client";

import * as React from "react";
import { Lock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ConfidentialAccessPageProps {
  title?: string;
  description?: string;
  onRequestAccess?: () => void;
  className?: string;
}

const ConfidentialAccessPage = ({
  title = "Confidential Access Required",
  description = "This content requires special authorization to view.",
  onRequestAccess,
  className,
}: ConfidentialAccessPageProps) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-background flex items-center justify-center p-4",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center"
        >
          <Shield className="w-10 h-10 text-destructive" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Restricted Content</span>
          </div>

          <Button onClick={onRequestAccess} className="w-full">
            Request Access
          </Button>

          <Button variant="outline" className="w-full">
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

function ConfidentialAccessDemo() {
  return (
    <div className="min-h-screen bg-background">
      <ConfidentialAccessPage
        onRequestAccess={() => alert("Access requested!")}
      />
    </div>
  );
}

export default ConfidentialAccessDemo;
