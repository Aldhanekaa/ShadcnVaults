"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Check,
  CreditCard,
  Calendar,
  DollarSign,
  Users,
  Zap,
  Shield,
  Star,
  AlertCircle,
  Clock,
  Building,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  popular?: boolean;
  current?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  category: string;
  enabled?: boolean;
}

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  planId?: string;
  addOnIds?: string[];
}

interface CustomerAdminDashboardProps {
  plans?: Plan[];
  addOns?: AddOn[];
  bills?: Bill[];
  currentPlan?: string;
  onPlanSelect?: (planId: string) => void;
  onAddOnToggle?: (addOnId: string, enabled: boolean) => void;
}

const defaultPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: { monthly: 29, yearly: 290 },
    features: [
      "Up to 5 team members",
      "10GB storage",
      "Basic analytics",
      "Email support",
      "Standard integrations",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Advanced features for growing businesses",
    price: { monthly: 79, yearly: 790 },
    features: [
      "Up to 25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "All integrations",
      "Custom workflows",
      "API access",
    ],
    popular: true,
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Complete solution for large organizations",
    price: { monthly: 199, yearly: 1990 },
    features: [
      "Unlimited team members",
      "1TB storage",
      "Enterprise analytics",
      "24/7 phone support",
      "Custom integrations",
      "Advanced security",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

const defaultAddOns: AddOn[] = [
  {
    id: "extra-storage",
    name: "Extra Storage",
    description: "Additional 500GB storage space",
    price: { monthly: 15, yearly: 150 },
    category: "Storage",
    enabled: true,
  },
  {
    id: "advanced-security",
    name: "Advanced Security",
    description: "Enhanced security features and compliance",
    price: { monthly: 25, yearly: 250 },
    category: "Security",
    enabled: false,
  },
  {
    id: "premium-support",
    name: "Premium Support",
    description: "24/7 priority support with dedicated agent",
    price: { monthly: 35, yearly: 350 },
    category: "Support",
    enabled: true,
  },
  {
    id: "analytics-pro",
    name: "Analytics Pro",
    description: "Advanced reporting and business intelligence",
    price: { monthly: 20, yearly: 200 },
    category: "Analytics",
    enabled: false,
  },
];

const defaultBills: Bill[] = [
  {
    id: "bill-1",
    description: "Professional Plan - Monthly",
    amount: 79,
    dueDate: "2024-02-15",
    status: "pending",
    planId: "professional",
  },
  {
    id: "bill-2",
    description: "Extra Storage Add-on",
    amount: 15,
    dueDate: "2024-02-15",
    status: "pending",
    addOnIds: ["extra-storage"],
  },
  {
    id: "bill-3",
    description: "Premium Support Add-on",
    amount: 35,
    dueDate: "2024-02-15",
    status: "pending",
    addOnIds: ["premium-support"],
  },
  {
    id: "bill-4",
    description: "Professional Plan - January",
    amount: 79,
    dueDate: "2024-01-15",
    status: "paid",
    planId: "professional",
  },
];

export function CustomerAdminDashboard({
  plans = defaultPlans,
  addOns = defaultAddOns,
  bills = defaultBills,
  currentPlan = "professional",
  onPlanSelect,
  onAddOnToggle,
}: CustomerAdminDashboardProps) {
  const [selectedPlan, setSelectedPlan] = React.useState(currentPlan);
  const [billingInterval, setBillingInterval] = React.useState<
    "monthly" | "yearly"
  >("monthly");
  const [enabledAddOns, setEnabledAddOns] = React.useState<Set<string>>(
    new Set(addOns.filter((addon) => addon.enabled).map((addon) => addon.id))
  );

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    onPlanSelect?.(planId);
  };

  const handleAddOnToggle = (addOnId: string, enabled: boolean) => {
    const newEnabledAddOns = new Set(enabledAddOns);
    if (enabled) {
      newEnabledAddOns.add(addOnId);
    } else {
      newEnabledAddOns.delete(addOnId);
    }
    setEnabledAddOns(newEnabledAddOns);
    onAddOnToggle?.(addOnId, enabled);
  };

  const currentPlanData = plans.find((plan) => plan.id === selectedPlan);
  const pendingBills = bills.filter((bill) => bill.status === "pending");
  const overdueBills = bills.filter((bill) => bill.status === "overdue");

  const calculateTotal = () => {
    const planPrice = currentPlanData?.price[billingInterval] || 0;
    const addOnPrice = Array.from(enabledAddOns).reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return total + (addOn?.price[billingInterval] || 0);
    }, 0);
    return planPrice + addOnPrice;
  };

  const getBillStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getBillStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <Check className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Billing Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your subscription plans and billing
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Enterprise Account
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Cost</p>
                  <p className="text-2xl font-bold">${calculateTotal()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">18/25</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Bills</p>
                  <p className="text-2xl font-bold">{pendingBills.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Add-ons</p>
                  <p className="text-2xl font-bold">{enabledAddOns.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
            <TabsTrigger value="billing">Current Bills</TabsTrigger>
          </TabsList>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Choose Your Plan</h2>
              <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setBillingInterval("monthly")}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm transition-colors",
                    billingInterval === "monthly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingInterval("yearly")}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm transition-colors",
                    billingInterval === "yearly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn(
                    "relative transition-all duration-200",
                    selectedPlan === plan.id && "ring-2 ring-primary",
                    plan.popular && "border-primary"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">
                        ${plan.price[billingInterval]}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingInterval === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      className="w-full"
                    >
                      {selectedPlan === plan.id
                        ? "Current Plan"
                        : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add-ons Tab */}
          <TabsContent value="addons" className="space-y-6">
            <h2 className="text-2xl font-semibold">Available Add-ons</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addOns.map((addOn) => (
                <Card key={addOn.id} className="transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Checkbox
                            checked={enabledAddOns.has(addOn.id)}
                            onCheckedChange={(checked) =>
                              handleAddOnToggle(addOn.id, !!checked)
                            }
                          />
                          <div>
                            <h3 className="font-semibold">{addOn.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {addOn.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {addOn.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            ${addOn.price[billingInterval]}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            /{billingInterval === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add-ons Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Add-ons Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(enabledAddOns).map((addOnId) => {
                    const addOn = addOns.find((a) => a.id === addOnId);
                    if (!addOn) return null;

                    return (
                      <div
                        key={addOnId}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{addOn.name}</span>
                        <span className="font-medium">
                          ${addOn.price[billingInterval]}
                        </span>
                      </div>
                    );
                  })}

                  {enabledAddOns.size === 0 && (
                    <p className="text-muted-foreground text-sm">
                      No add-ons selected
                    </p>
                  )}

                  {enabledAddOns.size > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total Add-ons</span>
                        <span>
                          $
                          {Array.from(enabledAddOns).reduce(
                            (total, addOnId) => {
                              const addOn = addOns.find(
                                (a) => a.id === addOnId
                              );
                              return (
                                total + (addOn?.price[billingInterval] || 0)
                              );
                            },
                            0
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Current Bills</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                View History
              </Button>
            </div>

            {/* Alerts for overdue bills */}
            {overdueBills.length > 0 && (
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">
                      You have {overdueBills.length} overdue bill(s)
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bills List */}
            <div className="space-y-4">
              {bills.map((bill) => (
                <Card key={bill.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-lg">
                          {getBillStatusIcon(bill.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{bill.description}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(bill.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge className={getBillStatusColor(bill.status)}>
                          {bill.status.charAt(0).toUpperCase() +
                            bill.status.slice(1)}
                        </Badge>
                        <span className="font-semibold text-lg">
                          ${bill.amount}
                        </span>
                        {bill.status === "pending" && (
                          <Button size="sm">Pay Now</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Total Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Current Plan ({currentPlanData?.name})</span>
                    <span>${currentPlanData?.price[billingInterval] || 0}</span>
                  </div>

                  {Array.from(enabledAddOns).map((addOnId) => {
                    const addOn = addOns.find((a) => a.id === addOnId);
                    if (!addOn) return null;

                    return (
                      <div
                        key={addOnId}
                        className="flex justify-between items-center"
                      >
                        <span>{addOn.name}</span>
                        <span>${addOn.price[billingInterval]}</span>
                      </div>
                    );
                  })}

                  <Separator />

                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>
                      Total{" "}
                      {billingInterval === "monthly" ? "Monthly" : "Yearly"}
                    </span>
                    <span>${calculateTotal()}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Next billing date</span>
                    <span>February 15, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function CustomerAdminDashboardDemo() {
  return <CustomerAdminDashboard />;
}
