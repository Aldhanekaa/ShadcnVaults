"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  CreditCard,
  Calendar,
  Building2,
  Users,
  Zap,
  Shield,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  maxUsers: number;
  storage: string;
  support: string;
  popular?: boolean;
  highlighted?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  unit: string;
}

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  planName: string;
}

interface CustomerAdminDashboardProps {
  companyName?: string;
  currentPlan?: string;
  plans?: Plan[];
  addOns?: AddOn[];
  bills?: Bill[];
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
    maxUsers: 5,
    storage: "10GB",
    support: "Email",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Great for growing businesses",
    price: { monthly: 79, yearly: 790 },
    features: [
      "Up to 25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "All integrations",
      "Custom workflows",
    ],
    maxUsers: 25,
    storage: "100GB",
    support: "Priority",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: { monthly: 199, yearly: 1990 },
    features: [
      "Unlimited team members",
      "1TB storage",
      "Custom analytics",
      "24/7 phone support",
      "Custom integrations",
      "Advanced security",
      "Dedicated account manager",
    ],
    maxUsers: -1,
    storage: "1TB",
    support: "24/7 Phone",
    highlighted: true,
  },
];

const defaultAddOns: AddOn[] = [
  {
    id: "extra-storage",
    name: "Extra Storage",
    description: "Additional storage for your data",
    price: { monthly: 10, yearly: 100 },
    unit: "per 50GB",
  },
  {
    id: "advanced-security",
    name: "Advanced Security",
    description: "Enhanced security features and compliance",
    price: { monthly: 25, yearly: 250 },
    unit: "per account",
  },
  {
    id: "premium-support",
    name: "Premium Support",
    description: "24/7 priority support with dedicated agent",
    price: { monthly: 50, yearly: 500 },
    unit: "per account",
  },
];

const defaultBills: Bill[] = [
  {
    id: "bill-1",
    description: "Professional Plan - Monthly",
    amount: 79,
    dueDate: "2024-02-15",
    status: "pending",
    planName: "Professional",
  },
  {
    id: "bill-2",
    description: "Extra Storage Add-on",
    amount: 10,
    dueDate: "2024-02-15",
    status: "pending",
    planName: "Add-on",
  },
  {
    id: "bill-3",
    description: "Professional Plan - Monthly",
    amount: 79,
    dueDate: "2024-01-15",
    status: "paid",
    planName: "Professional",
  },
];

export function CustomerAdminDashboard({
  companyName = "Acme Corp",
  currentPlan = "professional",
  plans = defaultPlans,
  addOns = defaultAddOns,
  bills = defaultBills,
}: CustomerAdminDashboardProps) {
  const [billingFrequency, setBillingFrequency] = React.useState<
    "monthly" | "yearly"
  >("monthly");
  const [selectedPlan, setSelectedPlan] = React.useState(currentPlan);
  const [selectedAddOns, setSelectedAddOns] = React.useState<string[]>([
    "extra-storage",
  ]);

  const currentPlanData = plans.find((plan) => plan.id === currentPlan);
  const pendingBills = bills.filter((bill) => bill.status === "pending");
  const totalPendingAmount = pendingBills.reduce(
    (sum, bill) => sum + bill.amount,
    0
  );

  const calculateTotal = () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    const planPrice = plan ? plan.price[billingFrequency] : 0;
    const addOnPrice = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return sum + (addOn ? addOn.price[billingFrequency] : 0);
    }, 0);
    return planPrice + addOnPrice;
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your subscription and billing for {companyName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {companyName}
            </Badge>
          </div>
        </div>

        {/* Current Plan Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="font-semibold text-lg">
                  {currentPlanData?.name}
                </h3>
                <p className="text-muted-foreground">
                  {currentPlanData?.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    ${currentPlanData?.price.monthly}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {currentPlanData?.maxUsers === -1
                      ? "Unlimited"
                      : currentPlanData?.maxUsers}{" "}
                    users
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {currentPlanData?.storage} storage
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {currentPlanData?.support} support
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button variant="outline">Manage Plan</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Plans and Add-ons */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="plans" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="addons">Add-ons</TabsTrigger>
              </TabsList>

              <TabsContent value="plans" className="space-y-6">
                {/* Billing Frequency Toggle */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Billing Frequency</h3>
                        <p className="text-sm text-muted-foreground">
                          Save up to 17% with yearly billing
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-sm",
                            billingFrequency === "monthly"
                              ? "font-semibold"
                              : "text-muted-foreground"
                          )}
                        >
                          Monthly
                        </span>
                        <Switch
                          checked={billingFrequency === "yearly"}
                          onCheckedChange={(checked) =>
                            setBillingFrequency(checked ? "yearly" : "monthly")
                          }
                        />
                        <span
                          className={cn(
                            "text-sm",
                            billingFrequency === "yearly"
                              ? "font-semibold"
                              : "text-muted-foreground"
                          )}
                        >
                          Yearly
                        </span>
                        {billingFrequency === "yearly" && (
                          <Badge variant="secondary">Save 17%</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Plans Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={cn(
                        "relative cursor-pointer transition-all hover:shadow-md",
                        selectedPlan === plan.id && "ring-2 ring-primary",
                        plan.highlighted && "border-primary",
                        plan.popular && "border-orange-500"
                      )}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500">
                          Most Popular
                        </Badge>
                      )}
                      {plan.highlighted && (
                        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                          Enterprise
                        </Badge>
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {plan.name}
                          {selectedPlan === plan.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <span className="text-3xl font-bold">
                            ${plan.price[billingFrequency]}
                          </span>
                          <span className="text-muted-foreground">
                            /{billingFrequency === "monthly" ? "mo" : "yr"}
                          </span>
                          {billingFrequency === "yearly" && (
                            <div className="text-sm text-muted-foreground">
                              ${Math.round(plan.price.yearly / 12)}/month billed
                              yearly
                            </div>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="addons" className="space-y-6">
                <div className="grid gap-4">
                  {addOns.map((addOn) => (
                    <Card
                      key={addOn.id}
                      className="cursor-pointer"
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Switch
                              checked={selectedAddOns.includes(addOn.id)}
                              onCheckedChange={() => toggleAddOn(addOn.id)}
                            />
                            <div>
                              <h3 className="font-semibold">{addOn.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {addOn.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              ${addOn.price[billingFrequency]}/
                              {billingFrequency === "monthly" ? "mo" : "yr"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {addOn.unit}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Billing Summary and Current Bills */}
          <div className="space-y-6">
            {/* Billing Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Selected Plan</span>
                    <span>
                      {plans.find((p) => p.id === selectedPlan)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Plan Cost</span>
                    <span>
                      $
                      {
                        plans.find((p) => p.id === selectedPlan)?.price[
                          billingFrequency
                        ]
                      }
                    </span>
                  </div>
                  {selectedAddOns.map((addOnId) => {
                    const addOn = addOns.find((a) => a.id === addOnId);
                    return addOn ? (
                      <div
                        key={addOnId}
                        className="flex justify-between text-sm"
                      >
                        <span>{addOn.name}</span>
                        <span>${addOn.price[billingFrequency]}</span>
                      </div>
                    ) : null;
                  })}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    ${calculateTotal()}/
                    {billingFrequency === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <Button className="w-full">Update Subscription</Button>
              </CardContent>
            </Card>

            {/* Current Bills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Current Bills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingBills.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      {pendingBills.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {bill.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Due: {bill.dueDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${bill.amount}</p>
                            <Badge
                              variant={
                                bill.status === "overdue"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {bill.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total Due</span>
                      <span>${totalPendingAmount}</span>
                    </div>
                    <Button className="w-full" variant="destructive">
                      Pay All Bills
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No pending bills</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Bills */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bills
                    .filter((bill) => bill.status === "paid")
                    .slice(0, 3)
                    .map((bill) => (
                      <div
                        key={bill.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div>
                          <p className="font-medium">{bill.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {bill.dueDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${bill.amount}</p>
                          <Badge variant="secondary">Paid</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerAdminDashboardDemo() {
  return <CustomerAdminDashboard />;
}
