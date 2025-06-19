"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, CreditCard, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Plan {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  period: "monthly" | "yearly";
  type: "single" | "multiple";
  maxQuantity?: number;
}

interface SelectedAddOn extends AddOn {
  quantity: number;
}

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
}

// Sample data
const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "monthly",
    features: ["Up to 5 projects", "Basic analytics", "Community support"],
  },
  {
    id: "starter",
    name: "Starter",
    price: 29,
    period: "monthly",
    features: [
      "Up to 25 projects",
      "Advanced analytics",
      "Email support",
      "Custom domains",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    period: "monthly",
    features: [
      "Unlimited projects",
      "Premium analytics",
      "Priority support",
      "API access",
      "White-label",
    ],
  },
];

const addOns: AddOn[] = [
  {
    id: "extra-page",
    name: "Extra Page",
    description: "Additional page for your website",
    price: 10,
    period: "monthly",
    type: "multiple",
    maxQuantity: 50,
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    description: "Connect your own domain",
    price: 15,
    period: "monthly",
    type: "single",
  },
  {
    id: "ssl-certificate",
    name: "SSL Certificate",
    description: "Secure your website with SSL",
    price: 5,
    period: "monthly",
    type: "single",
  },
  {
    id: "priority-support",
    name: "Priority Support",
    description: "Get faster response times",
    price: 25,
    period: "monthly",
    type: "single",
  },
];

const sampleBills: Bill[] = [
  {
    id: "bill-1",
    description: "Starter Plan - December 2024",
    amount: 29,
    dueDate: "2024-12-31",
    status: "pending",
  },
  {
    id: "bill-2",
    description: "Extra Pages (5x) - December 2024",
    amount: 50,
    dueDate: "2024-12-31",
    status: "pending",
  },
  {
    id: "bill-3",
    description: "Custom Domain - December 2024",
    amount: 15,
    dueDate: "2024-12-31",
    status: "paid",
  },
];

// Numeric Input Component
interface NumericInputProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function NumericInput({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  disabled = false,
}: NumericInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value);
    if (!Number.isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const incrementValue = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const decrementValue = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  return (
    <div className="flex items-center border border-border rounded-lg bg-background">
      <button
        type="button"
        onClick={decrementValue}
        disabled={disabled || value <= min}
        className="px-3 py-2 hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrement"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-16 text-center border-none bg-transparent focus:outline-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-foreground"
      />
      <button
        type="button"
        onClick={incrementValue}
        disabled={disabled || value >= max}
        className="px-3 py-2 hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increment"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

// Plan Selection Component
interface PlanSelectorProps {
  plans: Plan[];
  selectedPlan: string;
  onPlanSelect: (planId: string) => void;
}

function PlanSelector({
  plans,
  selectedPlan,
  onPlanSelect,
}: PlanSelectorProps) {
  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "relative cursor-pointer border-2 rounded-lg p-4 transition-all",
            selectedPlan === plan.id
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
          onClick={() => onPlanSelect(plan.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                {plan.popular && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                <span className="text-2xl font-bold text-foreground">
                  ${plan.price}
                </span>
                /{plan.period}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {plan.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            <div
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                selectedPlan === plan.id
                  ? "border-primary bg-primary"
                  : "border-muted-foreground"
              )}
            >
              {selectedPlan === plan.id && (
                <div className="w-3 h-3 rounded-full bg-primary-foreground" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Add-ons Component
interface AddOnsProps {
  addOns: AddOn[];
  selectedAddOns: SelectedAddOn[];
  onAddOnChange: (addOnId: string, quantity: number) => void;
}

function AddOnsSelector({
  addOns,
  selectedAddOns,
  onAddOnChange,
}: AddOnsProps) {
  const getSelectedQuantity = (addOnId: string) => {
    const selected = selectedAddOns.find((addon) => addon.id === addOnId);
    return selected ? selected.quantity : 0;
  };

  return (
    <div className="space-y-4">
      {addOns.map((addOn) => {
        const quantity = getSelectedQuantity(addOn.id);
        const isSelected = quantity > 0;

        return (
          <div
            key={addOn.id}
            className={cn(
              "border rounded-lg p-4 transition-all",
              isSelected ? "border-primary bg-primary/5" : "border-border"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{addOn.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {addOn.description}
                </p>
                <p className="text-sm font-medium text-foreground">
                  ${addOn.price}/{addOn.period}
                  {addOn.type === "multiple" && " (per unit)"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {addOn.type === "single" ? (
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => onAddOnChange(addOn.id, isSelected ? 0 : 1)}
                  >
                    {isSelected ? "Remove" : "Add"}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <NumericInput
                      min={0}
                      max={addOn.maxQuantity || 50}
                      value={quantity}
                      onChange={(value) => onAddOnChange(addOn.id, value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Bills Component
interface BillsProps {
  bills: Bill[];
}

function BillsList({ bills }: BillsProps) {
  const getStatusColor = (status: Bill["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalAmount = bills
    .filter((bill) => bill.status !== "paid")
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Current Bills</h3>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Outstanding</p>
          <p className="text-2xl font-bold text-foreground">${totalAmount}</p>
        </div>
      </div>

      <div className="space-y-3">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg bg-background"
          >
            <div className="flex-1">
              <h4 className="font-medium text-foreground">
                {bill.description}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Due: {new Date(bill.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(bill.status)}>
                {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
              </Badge>
              <div className="text-right">
                <p className="font-semibold text-foreground">${bill.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalAmount > 0 && (
        <div className="pt-4">
          <Button className="w-full" size="lg">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay Outstanding Bills (${totalAmount})
          </Button>
        </div>
      )}
    </div>
  );
}

// Main Dashboard Component
function CustomerAdminDashboard() {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>([
    { ...addOns[0], quantity: 5 },
    { ...addOns[1], quantity: 1 },
  ]);

  const handleAddOnChange = (addOnId: string, quantity: number) => {
    setSelectedAddOns((prev) => {
      const existing = prev.find((addon) => addon.id === addOnId);

      if (quantity === 0) {
        return prev.filter((addon) => addon.id !== addOnId);
      }

      if (existing) {
        return prev.map((addon) =>
          addon.id === addOnId ? { ...addon, quantity } : addon
        );
      }

      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        return [...prev, { ...addOn, quantity }];
      }

      return prev;
    });
  };

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
  const totalAddOnsCost = selectedAddOns.reduce(
    (sum, addon) => sum + addon.price * addon.quantity,
    0
  );
  const totalMonthlyCost = (selectedPlanData?.price || 0) + totalAddOnsCost;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Customer Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and billing
          </p>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans">Plans & Add-ons</TabsTrigger>
            <TabsTrigger value="billing">Current Bills</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <PlanSelector
                    plans={plans}
                    selectedPlan={selectedPlan}
                    onPlanSelect={setSelectedPlan}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add-ons</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddOnsSelector
                    addOns={addOns}
                    selectedAddOns={selectedAddOns}
                    onAddOnChange={handleAddOnChange}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <BillsList bills={sampleBills} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">
                      {selectedPlanData?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Plan Cost:</span>
                    <span className="font-medium">
                      ${selectedPlanData?.price}/month
                    </span>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Active Add-ons:</h4>
                    {selectedAddOns.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No add-ons selected
                      </p>
                    ) : (
                      selectedAddOns.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>
                            {addon.name}{" "}
                            {addon.quantity > 1 && `(${addon.quantity}x)`}
                          </span>
                          <span>${addon.price * addon.quantity}/month</span>
                        </div>
                      ))
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total Monthly Cost:</span>
                    <span>${totalMonthlyCost}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Billing History
                  </Button>
                  <Button className="w-full" variant="outline">
                    Download Invoice
                  </Button>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default CustomerAdminDashboard;
