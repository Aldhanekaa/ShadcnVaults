"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Check, CreditCard, Calendar } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  billing: "monthly" | "yearly";
  multipleUse: boolean;
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

const CustomerAdminDashboard: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>([]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      billing: "monthly",
      features: [
        "Up to 5 pages",
        "Basic analytics",
        "Email support",
        "1GB storage",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: 79,
      billing: "monthly",
      features: [
        "Up to 25 pages",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Custom integrations",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 199,
      billing: "monthly",
      features: [
        "Unlimited pages",
        "Enterprise analytics",
        "24/7 phone support",
        "100GB storage",
        "White-label solution",
        "API access",
      ],
    },
  ];

  const addOns: AddOn[] = [
    {
      id: "extra-page",
      name: "Additional Page",
      description: "Add extra pages to your plan",
      price: 10,
      billing: "monthly",
      multipleUse: true,
      maxQuantity: 50,
    },
    {
      id: "custom-domain",
      name: "Custom Domain",
      description: "Connect your own domain",
      price: 15,
      billing: "monthly",
      multipleUse: false,
    },
    {
      id: "ssl-certificate",
      name: "SSL Certificate",
      description: "Secure your website with SSL",
      price: 25,
      billing: "monthly",
      multipleUse: false,
    },
    {
      id: "extra-storage",
      name: "Additional Storage",
      description: "Extra 5GB storage per unit",
      price: 8,
      billing: "monthly",
      multipleUse: true,
      maxQuantity: 20,
    },
  ];

  const currentBills: Bill[] = [
    {
      id: "bill-1",
      description: "Professional Plan - January 2024",
      amount: 79,
      dueDate: "2024-01-15",
      status: "pending",
    },
    {
      id: "bill-2",
      description: "Custom Domain Add-on",
      amount: 15,
      dueDate: "2024-01-15",
      status: "pending",
    },
    {
      id: "bill-3",
      description: "Additional Pages (3x)",
      amount: 30,
      dueDate: "2024-01-15",
      status: "pending",
    },
  ];

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleAddOnToggle = (addOn: AddOn) => {
    const existingIndex = selectedAddOns.findIndex(
      (item) => item.id === addOn.id
    );

    if (existingIndex >= 0) {
      setSelectedAddOns((prev) => prev.filter((item) => item.id !== addOn.id));
    } else {
      setSelectedAddOns((prev) => [...prev, { ...addOn, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (addOnId: string, change: number) => {
    setSelectedAddOns((prev) =>
      prev.map((item) => {
        if (item.id === addOnId) {
          const newQuantity = Math.max(
            1,
            Math.min(item.maxQuantity || 999, item.quantity + change)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    const planCost = selectedPlan ? selectedPlan.price : 0;
    const addOnsCost = selectedAddOns.reduce(
      (total, addOn) => total + addOn.price * addOn.quantity,
      0
    );
    return planCost + addOnsCost;
  };

  const totalBillAmount = currentBills.reduce(
    (total, bill) => total + bill.amount,
    0
  );

  const getBillStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span
                className={
                  billingCycle === "monthly"
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }
              >
                Monthly
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="relative"
              >
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    billingCycle === "yearly" ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform transform ${
                      billingCycle === "yearly"
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </Button>
              <span
                className={
                  billingCycle === "yearly"
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }
              >
                Yearly{" "}
                <Badge variant="secondary" className="ml-1">
                  Save 20%
                </Badge>
              </span>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlan?.id === plan.id
                      ? "ring-2 ring-primary border-primary"
                      : "border-border"
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="space-y-1">
                      <span className="text-3xl font-bold text-foreground">
                        $
                        {billingCycle === "yearly"
                          ? Math.round(plan.price * 0.8)
                          : plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingCycle === "yearly" ? "year" : "month"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {selectedPlan?.id === plan.id && (
                      <Badge
                        variant="secondary"
                        className="w-full justify-center mt-4"
                      >
                        Selected
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add-ons Section */}
            <Card>
              <CardHeader>
                <CardTitle>Add-ons</CardTitle>
                <CardDescription>
                  Enhance your plan with additional features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {addOns.map((addOn) => {
                  const selectedAddOn = selectedAddOns.find(
                    (item) => item.id === addOn.id
                  );
                  const isSelected = !!selectedAddOn;

                  return (
                    <div
                      key={addOn.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-foreground">
                            {addOn.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            ${addOn.price}/
                            {billingCycle === "yearly" ? "year" : "month"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {addOn.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        {isSelected && addOn.multipleUse && (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(addOn.id, -1)}
                              disabled={selectedAddOn?.quantity === 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {selectedAddOn?.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(addOn.id, 1)}
                              disabled={
                                selectedAddOn?.quantity === addOn.maxQuantity
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        )}

                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleAddOnToggle(addOn)}
                        >
                          {isSelected ? "Remove" : "Add"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Selection Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Current Selection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlan ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Plan
                      </span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Base Price
                      </span>
                      <span className="font-medium">
                        $
                        {billingCycle === "yearly"
                          ? Math.round(selectedPlan.price * 0.8)
                          : selectedPlan.price}
                      </span>
                    </div>

                    {selectedAddOns.length > 0 && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Add-ons:</span>
                          {selectedAddOns.map((addOn) => (
                            <div
                              key={addOn.id}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-muted-foreground">
                                {addOn.name}{" "}
                                {addOn.quantity > 1 && `(${addOn.quantity}x)`}
                              </span>
                              <span>${addOn.price * addOn.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        ${calculateTotal()}/
                        {billingCycle === "yearly" ? "year" : "month"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Select a plan to see pricing
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Current Bills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Current Bills</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentBills.map((bill) => (
                  <div key={bill.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {bill.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {bill.dueDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${bill.amount}</p>
                        <Badge
                          className={`text-xs ${getBillStatusColor(
                            bill.status
                          )}`}
                        >
                          {bill.status}
                        </Badge>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}

                <div className="pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Due</span>
                    <span>${totalBillAmount}</span>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Pay All Bills
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdminDashboard;
