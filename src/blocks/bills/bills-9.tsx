"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  CreditCard,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
  maxUsers?: number;
  storage?: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  category: string;
}

interface BillItem {
  id: string;
  name: string;
  type: "plan" | "addon";
  quantity: number;
  unitPrice: number;
  total: number;
}

interface CustomerData {
  companyName: string;
  currentPlan?: string;
  billingCycle: "monthly" | "annual";
  nextBillingDate: string;
  totalUsers: number;
}

// Tag Component for Add-ons
const Tag = ({
  children,
  className,
  name,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  name?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      layout
      layoutId={name}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-md bg-gray-200 px-2 py-1 text-sm",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Multiple Select Component for Add-ons
const MultipleSelect = ({
  tags,
  onChange,
  defaultValue = [],
}: {
  tags: AddOn[];
  onChange?: (value: AddOn[]) => void;
  defaultValue?: AddOn[];
}) => {
  const [selected, setSelected] = useState<AddOn[]>(defaultValue);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollBy({
        left: containerRef.current?.scrollWidth,
        behavior: "smooth",
      });
    }
    onChange?.(selected);
  }, [selected, onChange]);

  const onSelect = (item: AddOn) => {
    setSelected((prev) => [...prev, item]);
  };

  const onDeselect = (item: AddOn) => {
    setSelected((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <AnimatePresence mode={"popLayout"}>
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Add-ons</h3>
          <Badge variant="outline">{selected.length} selected</Badge>
        </div>

        <motion.div
          layout
          ref={containerRef}
          className="selected no-scrollbar flex min-h-12 w-full items-center overflow-x-scroll scroll-smooth rounded-md border border-border bg-muted/30 p-2"
        >
          <motion.div layout className="flex items-center gap-2">
            {selected?.map((item) => (
              <Tag
                name={item?.id}
                key={item?.id}
                className="bg-background shadow-sm border"
              >
                <div className="flex items-center gap-2">
                  <motion.span layout className="text-nowrap text-xs">
                    {item?.name}
                  </motion.span>
                  <button onClick={() => onDeselect(item)}>
                    <X size={12} />
                  </button>
                </div>
              </Tag>
            ))}
            {selected.length === 0 && (
              <span className="text-muted-foreground text-sm">
                No add-ons selected
              </span>
            )}
          </motion.div>
        </motion.div>

        {tags?.length > selected?.length && (
          <div className="flex w-full flex-wrap gap-2 rounded-md border border-border p-3 bg-background">
            {tags
              ?.filter((item) => !selected?.some((i) => i.id === item.id))
              .map((item) => (
                <Tag
                  name={item?.id}
                  onClick={() => onSelect(item)}
                  key={item?.id}
                  className="hover:bg-muted transition-colors"
                >
                  <motion.div layout className="flex items-center gap-2">
                    <span className="text-nowrap text-xs">{item?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ${item.monthlyPrice}/mo
                    </span>
                    <Plus size={12} />
                  </motion.div>
                </Tag>
              ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

// Main Dashboard Component
const CustomerAdminDashboard = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("starter");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  // Sample data
  const customerData: CustomerData = {
    companyName: "Acme Corporation",
    currentPlan: "starter",
    billingCycle: "monthly",
    nextBillingDate: "2024-02-15",
    totalUsers: 12,
  };

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      maxUsers: 3,
      storage: "1GB",
      features: [
        "Basic dashboard",
        "Up to 3 users",
        "1GB storage",
        "Email support",
      ],
    },
    {
      id: "starter",
      name: "Starter",
      description: "Great for small teams",
      monthlyPrice: 29,
      annualPrice: 290,
      maxUsers: 10,
      storage: "10GB",
      popular: true,
      features: [
        "Advanced dashboard",
        "Up to 10 users",
        "10GB storage",
        "Priority support",
        "API access",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing businesses",
      monthlyPrice: 99,
      annualPrice: 990,
      maxUsers: 50,
      storage: "100GB",
      features: [
        "Full dashboard",
        "Up to 50 users",
        "100GB storage",
        "24/7 support",
        "Advanced API",
        "Custom integrations",
      ],
    },
  ];

  const addOns: AddOn[] = [
    {
      id: "extra-storage",
      name: "Extra Storage",
      description: "Additional 50GB storage",
      monthlyPrice: 10,
      annualPrice: 100,
      category: "Storage",
    },
    {
      id: "advanced-analytics",
      name: "Advanced Analytics",
      description: "Detailed reporting and insights",
      monthlyPrice: 25,
      annualPrice: 250,
      category: "Analytics",
    },
    {
      id: "priority-support",
      name: "Priority Support",
      description: "24/7 premium support",
      monthlyPrice: 15,
      annualPrice: 150,
      category: "Support",
    },
    {
      id: "api-calls",
      name: "Extra API Calls",
      description: "Additional 10K API calls/month",
      monthlyPrice: 20,
      annualPrice: 200,
      category: "API",
    },
  ];

  // Calculate current bill
  const currentBill = useMemo(() => {
    const selectedPlanData = plans.find((p) => p.id === selectedPlan);
    if (!selectedPlanData) return [];

    const items: BillItem[] = [
      {
        id: selectedPlanData.id,
        name: selectedPlanData.name + " Plan",
        type: "plan",
        quantity: 1,
        unitPrice:
          billingCycle === "monthly"
            ? selectedPlanData.monthlyPrice
            : selectedPlanData.annualPrice,
        total:
          billingCycle === "monthly"
            ? selectedPlanData.monthlyPrice
            : selectedPlanData.annualPrice,
      },
    ];

    selectedAddOns.forEach((addon) => {
      items.push({
        id: addon.id,
        name: addon.name,
        type: "addon",
        quantity: 1,
        unitPrice:
          billingCycle === "monthly" ? addon.monthlyPrice : addon.annualPrice,
        total:
          billingCycle === "monthly" ? addon.monthlyPrice : addon.annualPrice,
      });
    });

    return items;
  }, [selectedPlan, selectedAddOns, billingCycle, plans]);

  const totalAmount = currentBill.reduce((sum, item) => sum + item.total, 0);
  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Billing & Plans
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing for {customerData.companyName}
          </p>
        </div>

        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Plan
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {plans.find((p) => p.id === customerData.currentPlan)
                      ?.name || "Free"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Next Billing
                  </p>
                  <p className="text-2xl font-bold text-foreground">Feb 15</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {customerData.totalUsers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plans Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Choose Your Plan</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span
                      className={cn(
                        "text-sm",
                        billingCycle === "monthly"
                          ? "font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      Monthly
                    </span>
                    <Switch
                      checked={billingCycle === "annual"}
                      onCheckedChange={(checked) =>
                        setBillingCycle(checked ? "annual" : "monthly")
                      }
                    />
                    <span
                      className={cn(
                        "text-sm",
                        billingCycle === "annual"
                          ? "font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      Annual
                    </span>
                    {billingCycle === "annual" && (
                      <Badge variant="secondary" className="text-xs">
                        Save 20%
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative border-2 rounded-lg p-4 cursor-pointer transition-all",
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-4 bg-primary">
                        Popular
                      </Badge>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold">
                            $
                            {billingCycle === "monthly"
                              ? plan.monthlyPrice
                              : plan.annualPrice}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm text-muted-foreground">
                          <div>Up to {plan.maxUsers} users</div>
                          <div>{plan.storage} storage</div>
                        </div>
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPlan === plan.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {selectedPlan === plan.id && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {plan.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>Add-ons</CardTitle>
              </CardHeader>
              <CardContent>
                <MultipleSelect
                  tags={addOns}
                  onChange={setSelectedAddOns}
                  defaultValue={[]}
                />
              </CardContent>
            </Card>
          </div>

          {/* Current Bill Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Current Bill</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentBill.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">
                        Qty {item.quantity} • ${item.unitPrice}/
                        {billingCycle === "monthly" ? "mo" : "yr"}
                      </p>
                    </div>
                    <p className="font-medium">${item.total}</p>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>
                    ${totalAmount}/{billingCycle === "monthly" ? "mo" : "yr"}
                  </p>
                </div>

                {billingCycle === "annual" && (
                  <div className="text-xs text-green-600 flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>
                      You save ${Math.round(totalAmount * 0.2)} annually
                    </span>
                  </div>
                )}

                <Button className="w-full" size="lg">
                  Update Subscription
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Changes will be applied to your next billing cycle
                </div>
              </CardContent>
            </Card>

            {/* Usage Warning */}
            {selectedPlanData &&
              customerData.totalUsers > (selectedPlanData.maxUsers || 0) && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-orange-800">
                          User Limit Exceeded
                        </p>
                        <p className="text-xs text-orange-700">
                          You have {customerData.totalUsers} users but your
                          selected plan only supports{" "}
                          {selectedPlanData.maxUsers}. Consider upgrading to
                          avoid service interruption.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdminDashboard;
