"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Minus,
  Check,
  CreditCard,
  Calendar,
  DollarSign,
  Users,
  Globe,
  Zap,
  Shield,
  Database,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "yearly";
  icon: React.ComponentType<{ className?: string }>;
  multipleUse: boolean;
  maxQuantity?: number;
}

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  type: "plan" | "addon";
}

interface CustomerAdminDashboardProps {
  className?: string;
}

const CustomerAdminDashboard: React.FC<CustomerAdminDashboardProps> = ({
  className = "",
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [addOnQuantities, setAddOnQuantities] = useState<
    Record<string, number>
  >({
    "extra-pages": 2,
    "custom-domain": 1,
    "priority-support": 1,
  });

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small projects",
      price: 29,
      interval: "monthly",
      features: [
        "Up to 5 pages",
        "Basic analytics",
        "Email support",
        "SSL certificate",
        "Mobile responsive",
      ],
    },
    {
      id: "pro",
      name: "Professional",
      description: "Best for growing businesses",
      price: 79,
      interval: "monthly",
      popular: true,
      features: [
        "Up to 25 pages",
        "Advanced analytics",
        "Priority support",
        "SSL certificate",
        "Mobile responsive",
        "SEO optimization",
        "Custom forms",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: 199,
      interval: "monthly",
      features: [
        "Unlimited pages",
        "Advanced analytics",
        "24/7 phone support",
        "SSL certificate",
        "Mobile responsive",
        "SEO optimization",
        "Custom forms",
        "API access",
        "White-label options",
      ],
    },
  ];

  const addOns: AddOn[] = [
    {
      id: "extra-pages",
      name: "Extra Pages",
      description: "Additional pages for your website",
      price: 10,
      interval: "monthly",
      icon: Globe,
      multipleUse: true,
      maxQuantity: 50,
    },
    {
      id: "custom-domain",
      name: "Custom Domain",
      description: "Use your own domain name",
      price: 15,
      interval: "monthly",
      icon: Globe,
      multipleUse: false,
    },
    {
      id: "priority-support",
      name: "Priority Support",
      description: "Get faster response times",
      price: 25,
      interval: "monthly",
      icon: Shield,
      multipleUse: false,
    },
    {
      id: "database-addon",
      name: "Database Storage",
      description: "Additional database storage (per 10GB)",
      price: 8,
      interval: "monthly",
      icon: Database,
      multipleUse: true,
      maxQuantity: 20,
    },
    {
      id: "email-marketing",
      name: "Email Marketing",
      description: "Email campaigns (per 1000 contacts)",
      price: 12,
      interval: "monthly",
      icon: Mail,
      multipleUse: true,
      maxQuantity: 10,
    },
  ];

  const bills: Bill[] = [
    {
      id: "bill-1",
      description: "Professional Plan - December 2024",
      amount: 79,
      dueDate: "2024-12-15",
      status: "pending",
      type: "plan",
    },
    {
      id: "bill-2",
      description: "Extra Pages (2x) - December 2024",
      amount: 20,
      dueDate: "2024-12-15",
      status: "pending",
      type: "addon",
    },
    {
      id: "bill-3",
      description: "Custom Domain - December 2024",
      amount: 15,
      dueDate: "2024-12-15",
      status: "pending",
      type: "addon",
    },
    {
      id: "bill-4",
      description: "Professional Plan - November 2024",
      amount: 79,
      dueDate: "2024-11-15",
      status: "paid",
      type: "plan",
    },
  ];

  const updateAddOnQuantity = (addOnId: string, change: number) => {
    setAddOnQuantities((prev) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (!addOn) return prev;

      const currentQuantity = prev[addOnId] || 0;
      let newQuantity = currentQuantity + change;

      if (!addOn.multipleUse) {
        newQuantity = Math.max(0, Math.min(1, newQuantity));
      } else {
        newQuantity = Math.max(0, newQuantity);
        if (addOn.maxQuantity) {
          newQuantity = Math.min(addOn.maxQuantity, newQuantity);
        }
      }

      return {
        ...prev,
        [addOnId]: newQuantity,
      };
    });
  };

  const calculateTotal = () => {
    const selectedPlanData = plans.find((p) => p.id === selectedPlan);
    const planPrice = selectedPlanData?.price || 0;

    const addOnTotal = addOns.reduce((total, addOn) => {
      const quantity = addOnQuantities[addOn.id] || 0;
      return total + addOn.price * quantity;
    }, 0);

    return planPrice + addOnTotal;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={cn("min-h-screen bg-background p-6", className)}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Customer Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your subscription plans and billing
          </p>
        </div>

        {/* Current Plan & Total */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Current Configuration
              </h2>
              <p className="text-muted-foreground">
                Plan: {plans.find((p) => p.id === selectedPlan)?.name} • Monthly
                Total:{" "}
                <span className="font-semibold text-primary">
                  ${calculateTotal()}
                </span>
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Pay Now
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plans Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Available Plans</h2>
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn(
                    "p-6 cursor-pointer transition-all border-2",
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                        {plan.popular && (
                          <Badge variant="default">Popular</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${plan.price}</div>
                      <div className="text-sm text-muted-foreground">
                        /{plan.interval}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Add-ons Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Add-ons</h2>
              {addOns.map((addOn) => {
                const Icon = addOn.icon;
                const quantity = addOnQuantities[addOn.id] || 0;

                return (
                  <Card key={addOn.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{addOn.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {addOn.description}
                          </p>
                          <p className="text-sm font-medium">
                            ${addOn.price}/{addOn.interval}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateAddOnQuantity(addOn.id, -1)}
                          disabled={quantity === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <span className="w-8 text-center font-medium">
                          {quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateAddOnQuantity(addOn.id, 1)}
                          disabled={!addOn.multipleUse && quantity >= 1}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {quantity > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal ({quantity}x):</span>
                          <span className="font-medium">
                            ${addOn.price * quantity}/{addOn.interval}
                          </span>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bills Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Current Bills</h2>

            <div className="space-y-4">
              {bills.map((bill) => (
                <Card key={bill.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{bill.description}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Due: {new Date(bill.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${bill.amount}</div>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", getStatusColor(bill.status))}
                      >
                        {bill.status.charAt(0).toUpperCase() +
                          bill.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {bill.status === "pending" && (
                    <Button size="sm" className="w-full">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Pay ${bill.amount}
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            <Separator />

            {/* Summary */}
            <Card className="p-6 bg-primary/5">
              <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pending Bills:</span>
                  <span className="font-medium">
                    $
                    {bills
                      .filter((b) => b.status === "pending")
                      .reduce((sum, b) => sum + b.amount, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Next Month Estimate:</span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Due:</span>
                  <span>
                    $
                    {bills
                      .filter((b) => b.status === "pending")
                      .reduce((sum, b) => sum + b.amount, 0)}
                  </span>
                </div>
              </div>

              <Button className="w-full mt-4" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay All Pending Bills
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdminDashboard;
