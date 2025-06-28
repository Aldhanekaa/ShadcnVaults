"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Shield,
  Crown,
  Check,
  X,
  ChevronRight,
  Star,
  Zap,
  Users,
  FileText,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  permissions: string[];
  subscriptionTier: "free" | "premium" | "enterprise";
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

interface ConfidentialAccessSystemProps {
  user?: User;
  requiredPermission?: string;
  contentTitle?: string;
  contentDescription?: string;
  onPurchase?: (tierId: string) => Promise<void>;
  onLogin?: () => void;
}

const ConfidentialAccessSystem: React.FC<ConfidentialAccessSystemProps> = ({
  user = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    isLoggedIn: true,
    permissions: ["basic"],
    subscriptionTier: "free",
  },
  requiredPermission = "premium",
  contentTitle = "Confidential Business Report",
  contentDescription = "Access exclusive insights and strategic analysis reserved for premium members.",
  onPurchase = async (tierId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  },
  onLogin = () => console.log("Login triggered"),
}) => {
  const [currentView, setCurrentView] = useState<
    "access-denied" | "upgrade-prompt" | "loading" | "error"
  >("access-denied");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [purchaseProgress, setPurchaseProgress] = useState(0);

  const pricingTiers: PricingTier[] = [
    {
      id: "premium",
      name: "Premium",
      price: 29,
      period: "month",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Access to confidential reports",
        "Advanced analytics dashboard",
        "Priority customer support",
        "Monthly strategy sessions",
        "Export capabilities",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      period: "month",
      popular: true,
      icon: <Shield className="h-6 w-6" />,
      features: [
        "Everything in Premium",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced security features",
        "API access",
        "White-label options",
      ],
    },
  ];

  const hasAccess =
    user.isLoggedIn && user.permissions.includes(requiredPermission);

  useEffect(() => {
    if (!user.isLoggedIn) {
      setCurrentView("access-denied");
    } else if (!hasAccess) {
      setCurrentView("upgrade-prompt");
    }
  }, [user, hasAccess]);

  const handlePurchase = async (tierId: string) => {
    alert(`Tier ID ${tierId}`);
  };

  const AccessDeniedView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl p-8 text-center border-2 border-border/50 shadow-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6"
        >
          <Lock className="h-10 w-10 text-destructive" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-foreground mb-4"
        >
          {!user.isLoggedIn ? "Authentication Required" : "Access Restricted"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-6"
        >
          {!user.isLoggedIn
            ? "Please log in to view this confidential content."
            : `This content requires ${requiredPermission} access level.`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/30 rounded-lg p-6 mb-8"
        >
          <h3 className="font-semibold text-foreground mb-2">{contentTitle}</h3>
          <p className="text-muted-foreground text-sm">{contentDescription}</p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showPreview ? (
                <EyeOff className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>

          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-background/50 rounded border border-border/50 relative overflow-hidden"
              >
                <div className="blur-sm">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Badge variant="secondary" className="font-medium">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium Content
                  </Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {!user.isLoggedIn ? (
            <Button onClick={onLogin} size="lg" className="group">
              Sign In
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setCurrentView("upgrade-prompt")}
                size="lg"
                className="group"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Access
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </>
          )}
        </motion.div>

        {user.isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 pt-6 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground">
              Logged in as{" "}
              <span className="font-medium text-foreground">{user.name}</span>
            </p>
            <Badge variant="outline" className="mt-2">
              {user.subscriptionTier} plan
            </Badge>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );

  const UpgradePromptView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4"
    >
      <div className="max-w-6xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Upgrade Required
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Unlock Premium Content
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get access to exclusive reports, advanced analytics, and premium
            features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative p-8 h-full ${
                  tier.popular
                    ? "border-primary shadow-lg scale-105"
                    : "border-border"
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">
                        ${tier.price}
                      </span>
                      <span className="text-muted-foreground">
                        /{tier.period}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(tier.id)}
                  disabled={isLoading}
                  className={`w-full ${
                    tier.popular ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {isLoading && selectedTier === tier.id ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Crown className="h-4 w-4 mr-2" />
                  )}
                  Choose {tier.name}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Card className="p-6 bg-muted/30">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>Trusted by 10,000+ professionals</span>
              </div>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-6"
              />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5" />
                <span>Enterprise-grade security</span>
              </div>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-6"
              />
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-5 w-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button
            variant="ghost"
            onClick={() => setCurrentView("access-denied")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to content
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );

  const LoadingView = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6"
        >
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground mb-4">
          Processing Your Upgrade
        </h2>
        <p className="text-muted-foreground mb-6">
          Please wait while we activate your premium access...
        </p>

        <div className="space-y-4">
          <Progress value={purchaseProgress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {purchaseProgress < 30 && "Verifying payment..."}
            {purchaseProgress >= 30 &&
              purchaseProgress < 60 &&
              "Activating features..."}
            {purchaseProgress >= 60 &&
              purchaseProgress < 90 &&
              "Setting up your account..."}
            {purchaseProgress >= 90 && "Almost done!"}
          </p>
        </div>
      </Card>
    </motion.div>
  );

  const ErrorView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6"
        >
          <X className="h-8 w-8 text-destructive" />
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground mb-4">
          Purchase Failed
        </h2>
        <p className="text-muted-foreground mb-6">
          We encountered an issue processing your payment. Please try again.
        </p>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            If the problem persists, please contact our support team for
            assistance.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-3">
          <Button onClick={() => setCurrentView("upgrade-prompt")}>
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentView("access-denied")}
          >
            Go Back
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="font-sans antialiased">
      <AnimatePresence mode="wait">
        {currentView === "access-denied" && <AccessDeniedView />}
        {currentView === "upgrade-prompt" && <UpgradePromptView />}
        {currentView === "loading" && <LoadingView />}
        {currentView === "error" && <ErrorView />}
      </AnimatePresence>
    </div>
  );
};

export default ConfidentialAccessSystem;
