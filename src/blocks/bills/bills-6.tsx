"use client";

import React, { useState } from "react";
import {
  Check,
  Plus,
  Minus,
  CreditCard,
  Calendar,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  isMultiple: boolean;
  maxQuantity?: number;
}

interface Bill {
  id: string;
  planName: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  addOns: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface CustomerAdminDashboardProps {
  plans?: Plan[];
  addOns?: AddOn[];
  currentBills?: Bill[];
  selectedPlanId?: string;
}

const defaultPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses getting started",
    features: [
      "Up to 5 users",
      "10GB storage",
      "Basic support",
      "Core features",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 79,
    description: "Ideal for growing teams and businesses",
    features: [
      "Up to 25 users",
      "100GB storage",
      "Priority support",
      "Advanced features",
      "Analytics dashboard",
    ],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited users",
      "1TB storage",
      "24/7 dedicated support",
      "Custom integrations",
      "Advanced security",
    ],
  },
];

const defaultAddOns: AddOn[] = [
  {
    id: "extra-page",
    name: "Extra Page",
    price: 10,
    description: "Additional page for your website",
    isMultiple: true,
    maxQuantity: 50,
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    price: 15,
    description: "Connect your own domain",
    isMultiple: false,
  },
  {
    id: "ssl-certificate",
    name: "SSL Certificate",
    price: 25,
    description: "Secure your website with SSL",
    isMultiple: false,
  },
  {
    id: "backup-service",
    name: "Daily Backup",
    price: 20,
    description: "Automated daily backups",
    isMultiple: false,
  },
  {
    id: "extra-storage",
    name: "Extra Storage",
    price: 5,
    description: "Additional 10GB storage",
    isMultiple: true,
    maxQuantity: 100,
  },
];

const defaultBills: Bill[] = [
  {
    id: "bill-1",
    planName: "Professional",
    amount: 124,
    dueDate: "2024-02-15",
    status: "pending",
    addOns: [
      { name: "Extra Page", quantity: 3, price: 30 },
      { name: "Custom Domain", quantity: 1, price: 15 },
    ],
  },
  {
    id: "bill-2",
    planName: "Professional",
    amount: 79,
    dueDate: "2024-01-15",
    status: "paid",
    addOns: [],
  },
  {
    id: "bill-3",
    planName: "Starter",
    amount: 54,
    dueDate: "2023-12-15",
    status: "overdue",
    addOns: [{ name: "Extra Storage", quantity: 5, price: 25 }],
  },
];

const CustomerAdminDashboard = ({
  plans = defaultPlans,
  addOns = defaultAddOns,
  currentBills = defaultBills,
  selectedPlanId = "professional",
}: CustomerAdminDashboardProps) => {
  const [activePlan, setActivePlan] = useState(selectedPlanId);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({
    "extra-page": 3,
    "custom-domain": 1,
  });

  const handleAddOnChange = (addOnId: string, quantity: number) => {
    setSelectedAddOns((prev) => {
      if (quantity <= 0) {
        const { [addOnId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addOnId]: quantity };
    });
  };

  const calculateTotal = () => {
    const selectedPlan = plans.find((plan) => plan.id === activePlan);
    const planPrice = selectedPlan?.price || 0;

    const addOnTotal = Object.entries(selectedAddOns).reduce(
      (total, [addOnId, quantity]) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        return total + (addOn?.price || 0) * quantity;
      },
      0
    );

    return planPrice + addOnTotal;
  };

  const getStatusColor = (status: string) => {
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Customer Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and billing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plans Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={cn(
                      "relative cursor-pointer transition-all duration-200",
                      activePlan === plan.id
                        ? "ring-2 ring-primary shadow-lg"
                        : "hover:shadow-md"
                    )}
                    onClick={() => setActivePlan(plan.id)}
                  >
                    {plan.isPopular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="flex items-center justify-center">
                        <span className="text-3xl font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          /month
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Add-ons Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Add-ons</h2>
              <div className="space-y-3">
                {addOns.map((addOn) => {
                  const quantity = selectedAddOns[addOn.id] || 0;
                  const maxQty = addOn.maxQuantity || 1;

                  return (
                    <Card key={addOn.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">{addOn.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {addOn.description}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            ${addOn.price}/month{" "}
                            {addOn.isMultiple && "(per unit)"}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {addOn.isMultiple ? (
                            <>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleAddOnChange(
                                    addOn.id,
                                    Math.max(0, quantity - 1)
                                  )
                                }
                                disabled={quantity <= 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleAddOnChange(
                                    addOn.id,
                                    Math.min(maxQty, quantity + 1)
                                  )
                                }
                                disabled={quantity >= maxQty}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant={quantity > 0 ? "default" : "outline"}
                              size="sm"
                              onClick={() =>
                                handleAddOnChange(
                                  addOn.id,
                                  quantity > 0 ? 0 : 1
                                )
                              }
                            >
                              {quantity > 0 ? "Added" : "Add"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar with Current Plan and Bills */}
          <div className="space-y-6">
            {/* Current Selection Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Current Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      Plan: {plans.find((p) => p.id === activePlan)?.name}
                    </span>
                    <span>
                      ${plans.find((p) => p.id === activePlan)?.price}
                    </span>
                  </div>

                  {Object.entries(selectedAddOns).map(([addOnId, quantity]) => {
                    const addOn = addOns.find((a) => a.id === addOnId);
                    if (!addOn) return null;

                    return (
                      <div
                        key={addOnId}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {addOn.name} {quantity > 1 && `(×${quantity})`}
                        </span>
                        <span>${addOn.price * quantity}</span>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotal()}/month</span>
                </div>

                <Button className="w-full">Update Subscription</Button>
              </CardContent>
            </Card>

            {/* Current Bills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Current Bills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="space-y-2 p-3 border rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{bill.planName}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {bill.dueDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${bill.amount}</p>
                        <Badge
                          className={cn("text-xs", getStatusColor(bill.status))}
                        >
                          {bill.status}
                        </Badge>
                      </div>
                    </div>

                    {bill.addOns.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <p>Add-ons:</p>
                        {bill.addOns.map((addOn, index) => (
                          <p key={index}>
                            • {addOn.name}{" "}
                            {addOn.quantity > 1 && `(×${addOn.quantity})`}: $
                            {addOn.price}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  <Building className="h-4 w-4 mr-2" />
                  View All Bills
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdminDashboard;
