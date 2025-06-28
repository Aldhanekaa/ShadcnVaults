"use client";

import * as React from "react";
import { CreditCard, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UpgradeRequiredPageProps {
  title?: string;
  description?: string;
  features?: string[];
  onUpgrade?: () => void;
  className?: string;
}

const UpgradeRequiredPage = ({
  title = "Premium Feature",
  description = "Upgrade to access this feature and unlock more capabilities.",
  features = [
    "Advanced Analytics",
    "Priority Support",
    "Unlimited Access",
    "Custom Integrations",
  ],
  onUpgrade,
  className,
}: UpgradeRequiredPageProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

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
        className="max-w-lg w-full text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center relative"
        >
          <Zap className="w-10 h-10 text-primary" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full"
          />
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            What you'll get:
          </h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onUpgrade}
              className="w-full h-12 text-base font-semibold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Upgrade Now
              <motion.div animate={{ x: isHovered ? 5 : 0 }} className="ml-2">
                →
              </motion.div>
            </Button>
          </motion.div>

          <Button variant="ghost" className="w-full">
            Learn More
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          30-day money-back guarantee • Cancel anytime
        </div>
      </motion.div>
    </div>
  );
};

function ConfidentialAccessDemo() {
  return (
    <div className="min-h-screen bg-background">
      <UpgradeRequiredPage
        onUpgrade={() => alert("Redirecting to upgrade...")}
      />
    </div>
  );
}

export default ConfidentialAccessDemo;
