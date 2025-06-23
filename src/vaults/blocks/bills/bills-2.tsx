"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Plus,
  Minus,
  Check,
  Star,
  Zap,
  Globe,
  FileText,
  Users,
  Building2,
  Crown,
  Sparkles,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  badge?: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  maxQuantity?: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface SelectedAddOn {
  id: string;
  quantity: number;
}

interface CustomerAdminDashboardProps {
  currentPlan?: string;
  selectedAddOns?: SelectedAddOn[];
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses getting started",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Up to 5 team members",
      "10GB storage",
      "Basic analytics",
      "Email support",
      "SSL certificate",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses",
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    badge: "Most Popular",
    features: [
      "Up to 25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "API access",
      "Advanced security",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Unlimited team members",
      "1TB storage",
      "Custom integrations",
      "24/7 phone support",
      "SLA guarantee",
      "Advanced permissions",
      "Audit logs",
      "Single sign-on (SSO)",
    ],
  },
];

const addOns: AddOn[] = [
  {
    id: "extra-pages",
    name: "Extra Pages",
    description: "Additional landing pages for your campaigns",
    price: 10,
    unit: "per page/month",
    icon: FileText,
  },
  {
    id: "team-members",
    name: "Additional Team Members",
    description: "Add more users to your workspace",
    price: 15,
    unit: "per user/month",
    icon: Users,
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    description: "Use your own domain name",
    price: 15,
    unit: "per month",
    maxQuantity: 1,
    icon: Globe,
  },
  {
    id: "priority-support",
    name: "Priority Support",
    description: "Get faster response times",
    price: 25,
    unit: "per month",
    maxQuantity: 1,
    icon: Zap,
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    description: "Detailed insights and reporting",
    price: 35,
    unit: "per month",
    maxQuantity: 1,
    icon: TrendingUp,
  },
];

function CustomerAdminDashboard({
  currentPlan = "professional",
  selectedAddOns = [
    { id: "extra-pages", quantity: 3 },
    { id: "custom-domain", quantity: 1 },
  ],
}: CustomerAdminDashboardProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [addOnQuantities, setAddOnQuantities] = useState<
    Record<string, number>
  >(() => {
    const quantities: Record<string, number> = {};
    selectedAddOns.forEach((addon) => {
      quantities[addon.id] = addon.quantity;
    });
    return quantities;
  });

  const currentPlanData = plans.find((plan) => plan.id === selectedPlan);

  const updateAddOnQuantity = (addOnId: string, change: number) => {
    setAddOnQuantities((prev) => {
      const current = prev[addOnId] || 0;
      const addOn = addOns.find((a) => a.id === addOnId);
      const maxQuantity = addOn?.maxQuantity || 99;
      const newQuantity = Math.max(0, Math.min(maxQuantity, current + change));

      if (newQuantity === 0) {
        const { [addOnId]: removed, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [addOnId]: newQuantity,
      };
    });
  };

  const calculateTotal = () => {
    if (!currentPlanData) return 0;

    const planPrice =
      billingCycle === "yearly"
        ? currentPlanData.yearlyPrice / 12
        : currentPlanData.monthlyPrice;

    const addOnTotal = Object.entries(addOnQuantities).reduce(
      (total, [addOnId, quantity]) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        return total + (addOn ? addOn.price * quantity : 0);
      },
      0
    );

    return planPrice + addOnTotal;
  };

  const calculateYearlyTotal = () => {
    if (!currentPlanData) return 0;

    const planPrice =
      billingCycle === "yearly"
        ? currentPlanData.yearlyPrice
        : currentPlanData.monthlyPrice * 12;

    const addOnTotal = Object.entries(addOnQuantities).reduce(
      (total, [addOnId, quantity]) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        return total + (addOn ? addOn.price * quantity * 12 : 0);
      },
      0
    );

    return planPrice + addOnTotal;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Billing & Plans
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing preferences
          </p>
        </div>

        {/* Current Plan Overview */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Current Plan</CardTitle>
                  <CardDescription>Your active subscription</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="text-2xl font-bold text-foreground">
                  {currentPlanData?.name}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Billing Cycle</p>
                <p className="text-lg font-semibold capitalize text-foreground">
                  {billingCycle}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-lg font-semibold text-foreground">
                  ${calculateTotal().toFixed(2)}/month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plans Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Available Plans
              </h2>
              <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                <Button
                  variant={billingCycle === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("monthly")}
                  className="text-xs"
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === "yearly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("yearly")}
                  className="text-xs"
                >
                  Yearly
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-green-100 text-green-700"
                  >
                    Save 20%
                  </Badge>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn(
                    "relative cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedPlan === plan.id &&
                      "ring-2 ring-primary border-primary",
                    plan.popular && "border-primary/50"
                  )}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {plan.description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          $
                          {billingCycle === "yearly"
                            ? plan.yearlyPrice
                            : plan.monthlyPrice}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {billingCycle === "yearly" ? "/year" : "/month"}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          +{plan.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Add-ons</h2>

            <div className="space-y-4">
              {addOns.map((addOn) => {
                const IconComponent = addOn.icon;
                const quantity = addOnQuantities[addOn.id] || 0;
                const isSelected = quantity > 0;
                const isSingleUse = addOn.maxQuantity === 1;

                return (
                  <Card
                    key={addOn.id}
                    className={cn(
                      "transition-all duration-200",
                      isSelected &&
                        "ring-2 ring-primary border-primary bg-primary/5"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-muted rounded-lg">
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {addOn.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {addOn.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-foreground">
                                ${addOn.price}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {addOn.unit}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isSingleUse ? (
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() =>
                                updateAddOnQuantity(
                                  addOn.id,
                                  isSelected ? -1 : 1
                                )
                              }
                            >
                              {isSelected ? "Remove" : "Add"}
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateAddOnQuantity(addOn.id, -1)
                                }
                                disabled={quantity === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateAddOnQuantity(addOn.id, 1)}
                                disabled={quantity >= (addOn.maxQuantity || 99)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Bill Summary */}
        <Card className="border-2 border-muted">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Current Bill</CardTitle>
                <CardDescription>Your upcoming charges</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Plan Cost */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  {currentPlanData?.name} Plan
                </p>
                <p className="text-sm text-muted-foreground">
                  {billingCycle === "yearly"
                    ? "Annual billing"
                    : "Monthly billing"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  $
                  {billingCycle === "yearly"
                    ? (currentPlanData?.yearlyPrice || 0).toFixed(2)
                    : (currentPlanData?.monthlyPrice || 0).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {billingCycle === "yearly" ? "/year" : "/month"}
                </p>
              </div>
            </div>

            {/* Add-ons */}
            {Object.entries(addOnQuantities).map(([addOnId, quantity]) => {
              const addOn = addOns.find((a) => a.id === addOnId);
              if (!addOn || quantity === 0) return null;

              return (
                <div
                  key={addOnId}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {addOn.name}
                      {quantity > 1 && ` × ${quantity}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${addOn.price} {addOn.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${(addOn.price * quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </div>
                </div>
              );
            })}

            <Separator />

            {/* Monthly Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-foreground">Monthly Total</span>
              <span className="text-foreground">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>

            {/* Yearly Total */}
            {billingCycle === "yearly" && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Yearly Total</span>
                <span className="text-muted-foreground">
                  ${calculateYearlyTotal().toFixed(2)}
                </span>
              </div>
            )}

            {/* Next Payment Date */}
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Next payment:{" "}
                {new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
          <CardFooter className="gap-3">
            <Button className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment Method
            </Button>
            <Button variant="outline" className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function Demo() {
  return <CustomerAdminDashboard />;
}
