"use client";

import * as React from "react";
import {
  Check,
  Plus,
  Minus,
  CreditCard,
  Calendar,
  DollarSign,
  Package,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  type: "single" | "multiple";
  unit?: string;
}

interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "plan" | "addon";
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses",
    features: [
      "Up to 5 team members",
      "10GB storage",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 79,
    description: "For growing companies",
    features: [
      "Up to 25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "1TB storage",
      "Enterprise analytics",
      "24/7 phone support",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

const addOns: AddOn[] = [
  {
    id: "extra-storage",
    name: "Extra Storage",
    price: 10,
    description: "Additional 50GB storage",
    type: "multiple",
    unit: "per 50GB",
  },
  {
    id: "additional-users",
    name: "Additional Users",
    price: 15,
    description: "Add more team members",
    type: "multiple",
    unit: "per 5 users",
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    price: 25,
    description: "Use your own domain",
    type: "single",
  },
  {
    id: "white-label",
    name: "White Label",
    price: 50,
    description: "Remove our branding",
    type: "single",
  },
  {
    id: "api-access",
    name: "API Access",
    price: 30,
    description: "Full API integration",
    type: "single",
  },
];

export function CustomerAdminDashboard() {
  const [selectedPlan, setSelectedPlan] =
    React.useState<string>("professional");
  const [selectedAddOns, setSelectedAddOns] = React.useState<
    Record<string, number>
  >({});
  const [billingPeriod, setBillingPeriod] = React.useState<
    "monthly" | "yearly"
  >("monthly");

  const handleAddOnChange = (addOnId: string, quantity: number) => {
    if (quantity <= 0) {
      const newAddOns = { ...selectedAddOns };
      delete newAddOns[addOnId];
      setSelectedAddOns(newAddOns);
    } else {
      setSelectedAddOns((prev) => ({
        ...prev,
        [addOnId]: quantity,
      }));
    }
  };

  const calculateTotal = () => {
    const selectedPlanData = plans.find((p) => p.id === selectedPlan);
    const planPrice = selectedPlanData ? selectedPlanData.price : 0;

    const addOnTotal = Object.entries(selectedAddOns).reduce(
      (total, [addOnId, quantity]) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        return total + (addOn ? addOn.price * quantity : 0);
      },
      0
    );

    const subtotal = planPrice + addOnTotal;
    const yearlyDiscount = billingPeriod === "yearly" ? subtotal * 0.2 : 0;
    const total =
      billingPeriod === "yearly" ? subtotal * 12 - yearlyDiscount : subtotal;

    return {
      planPrice,
      addOnTotal,
      subtotal,
      yearlyDiscount,
      total,
    };
  };

  const getBillItems = (): BillItem[] => {
    const items: BillItem[] = [];

    const selectedPlanData = plans.find((p) => p.id === selectedPlan);
    if (selectedPlanData) {
      items.push({
        id: selectedPlanData.id,
        name: selectedPlanData.name,
        price: selectedPlanData.price,
        quantity: 1,
        type: "plan",
      });
    }

    Object.entries(selectedAddOns).forEach(([addOnId, quantity]) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        items.push({
          id: addOn.id,
          name: addOn.name,
          price: addOn.price,
          quantity,
          type: "addon",
        });
      }
    });

    return items;
  };

  const totals = calculateTotal();
  const billItems = getBillItems();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Billing & Plans
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your subscription and billing preferences
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Admin Dashboard
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plans Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Period Toggle */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Billing Period</h2>
                <Badge variant="secondary">Save 20% yearly</Badge>
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    billingPeriod === "monthly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod("yearly")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    billingPeriod === "yearly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </Card>

            {/* Plans */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose Your Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? "ring-2 ring-primary border-primary"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPlan === plan.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {selectedPlan === plan.id && (
                            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        {plan.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-2xl font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Add-ons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns.map((addOn) => (
                  <Card key={addOn.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium">{addOn.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {addOn.description}
                        </p>
                        <div className="mt-2">
                          <span className="font-semibold">${addOn.price}</span>
                          <span className="text-muted-foreground text-sm">
                            /month {addOn.unit && `(${addOn.unit})`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {addOn.type === "multiple" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddOnChange(
                              addOn.id,
                              Math.max(0, (selectedAddOns[addOn.id] || 0) - 1)
                            )
                          }
                          disabled={!selectedAddOns[addOn.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">
                          {selectedAddOns[addOn.id] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddOnChange(
                              addOn.id,
                              (selectedAddOns[addOn.id] || 0) + 1
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant={
                          selectedAddOns[addOn.id] ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleAddOnChange(
                            addOn.id,
                            selectedAddOns[addOn.id] ? 0 : 1
                          )
                        }
                        className="w-full"
                      >
                        {selectedAddOns[addOn.id] ? "Remove" : "Add"}
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Billing Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Current Bill</h2>
              </div>

              <div className="space-y-4">
                {billItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      )}
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                {billItems.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No items selected
                  </p>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}/month</span>
                  </div>

                  {billingPeriod === "yearly" && (
                    <>
                      <div className="flex justify-between text-green-600">
                        <span>Yearly discount (20%)</span>
                        <span>-${totals.yearlyDiscount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total (yearly)</span>
                        <span>${totals.total.toFixed(2)}/year</span>
                      </div>
                    </>
                  )}

                  {billingPeriod === "monthly" && (
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${totals.total.toFixed(2)}/month</span>
                    </div>
                  )}
                </div>
              </div>

              <Button className="w-full mt-6">Update Subscription</Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Account Overview</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Plan</span>
                  <Badge variant="outline">
                    {plans.find((p) => p.id === selectedPlan)?.name}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Add-ons</span>
                  <span className="font-medium">
                    {Object.keys(selectedAddOns).length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Next Billing</span>
                  <span className="font-medium">
                    {billingPeriod === "monthly" ? "Monthly" : "Yearly"}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Next payment: Dec 15, 2024
                </div>
              </div>
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
