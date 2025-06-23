"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CreditCard,
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Database,
  Shield,
  Zap,
  Plus,
  Minus,
  Info,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
  current?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  enabled: boolean;
}

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "failed";
  invoiceUrl?: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  last4: string;
  brand?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const B2BCustomerAdminDashboard: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: "storage",
      name: "Extra Storage",
      description: "1TB additional storage",
      price: 10,
      icon: <Database className="h-4 w-4" />,
      enabled: false,
    },
    {
      id: "users",
      name: "Additional Users",
      description: "10 extra team members",
      price: 25,
      icon: <Users className="h-4 w-4" />,
      enabled: true,
    },
    {
      id: "security",
      name: "Advanced Security",
      description: "SSO and advanced permissions",
      price: 15,
      icon: <Shield className="h-4 w-4" />,
      enabled: false,
    },
    {
      id: "priority",
      name: "Priority Support",
      description: "24/7 priority customer support",
      price: 20,
      icon: <Zap className="h-4 w-4" />,
      enabled: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small teams",
      price: billingCycle === "monthly" ? 29 : 290,
      billing: billingCycle,
      features: [
        "Up to 5 users",
        "10GB storage",
        "Basic support",
        "Core features",
      ],
    },
    {
      id: "pro",
      name: "Professional",
      description: "Best for growing businesses",
      price: billingCycle === "monthly" ? 79 : 790,
      billing: billingCycle,
      features: [
        "Up to 25 users",
        "100GB storage",
        "Priority support",
        "Advanced features",
        "API access",
      ],
      popular: true,
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: billingCycle === "monthly" ? 199 : 1990,
      billing: billingCycle,
      features: [
        "Unlimited users",
        "1TB storage",
        "24/7 support",
        "All features",
        "Custom integrations",
        "SLA guarantee",
      ],
    },
  ];

  const billingHistory: BillingRecord[] = [
    {
      id: "1",
      date: "2024-01-15",
      description: "Professional Plan - January 2024",
      amount: 79.0,
      status: "paid",
      invoiceUrl: "#",
    },
    {
      id: "2",
      date: "2024-01-10",
      description: "Additional Users Add-on",
      amount: 25.0,
      status: "paid",
      invoiceUrl: "#",
    },
    {
      id: "3",
      date: "2024-01-01",
      description: "Priority Support Add-on",
      amount: 20.0,
      status: "pending",
      invoiceUrl: "#",
    },
    {
      id: "4",
      date: "2023-12-15",
      description: "Professional Plan - December 2023",
      amount: 79.0,
      status: "overdue",
      invoiceUrl: "#",
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryDate: "08/26",
      isDefault: false,
    },
  ];

  const toggleAddOn = (id: string) => {
    setAddOns((prev) =>
      prev.map((addon) =>
        addon.id === id ? { ...addon, enabled: !addon.enabled } : addon
      )
    );
  };

  const calculateTotal = () => {
    const currentPlan = plans.find((p) => p.id === selectedPlan);
    const planPrice = currentPlan?.price || 0;
    const addOnTotal = addOns
      .filter((addon) => addon.enabled)
      .reduce((sum, addon) => sum + addon.price, 0);
    return planPrice + addOnTotal;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: "default",
      pending: "secondary",
      overdue: "destructive",
      failed: "destructive",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {status}
      </Badge>
    );
  };

  const filteredBillingHistory = billingHistory.filter((record) => {
    const matchesSearch = record.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const overdueAmount = billingHistory
    .filter((record) => record.status === "overdue")
    .reduce((sum, record) => sum + record.amount, 0);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Billing & Plans
            </h1>
            <p className="text-muted-foreground">
              Manage your subscription and billing preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {overdueAmount > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You have ${overdueAmount.toFixed(2)} in overdue payments. Please
              update your payment method to avoid service interruption.
            </AlertDescription>
          </Alert>
        )}

        {/* Billing Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Plan
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Professional</div>
              <p className="text-xs text-muted-foreground">
                ${plans.find((p) => p.current)?.price}/month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${calculateTotal()}</div>
              <p className="text-xs text-muted-foreground">
                +$
                {addOns
                  .filter((a) => a.enabled)
                  .reduce((s, a) => s + a.price, 0)}{" "}
                add-ons
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Billing
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Feb 15</div>
              <p className="text-xs text-muted-foreground">
                Auto-renewal enabled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <Progress value={78} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans">Plans & Add-ons</TabsTrigger>
            <TabsTrigger value="billing">Billing History</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            {/* Billing Cycle Toggle */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Choose Your Plan</CardTitle>
                    <CardDescription>
                      Select the perfect plan for your business needs
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={
                        billingCycle === "monthly"
                          ? "font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      Monthly
                    </span>
                    <Switch
                      checked={billingCycle === "yearly"}
                      onCheckedChange={(checked) =>
                        setBillingCycle(checked ? "yearly" : "monthly")
                      }
                    />
                    <span
                      className={
                        billingCycle === "yearly"
                          ? "font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      Yearly{" "}
                      <Badge variant="secondary" className="ml-1">
                        Save 20%
                      </Badge>
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`relative cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                      } ${plan.popular ? "border-primary" : ""}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          Most Popular
                        </Badge>
                      )}
                      {plan.current && (
                        <Badge
                          variant="secondary"
                          className="absolute -top-2 right-4"
                        >
                          Current Plan
                        </Badge>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="text-3xl font-bold">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full mt-4"
                          variant={
                            selectedPlan === plan.id ? "default" : "outline"
                          }
                          disabled={plan.current}
                        >
                          {plan.current ? "Current Plan" : "Select Plan"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>Add-ons</CardTitle>
                <CardDescription>
                  Enhance your plan with additional features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addOns.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-md">
                          {addon.icon}
                        </div>
                        <div>
                          <div className="font-medium">{addon.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {addon.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">
                          ${addon.price}/month
                        </span>
                        <Switch
                          checked={addon.enabled}
                          onCheckedChange={() => toggleAddOn(addon.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
                <CardDescription>Your next invoice breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>
                      {plans.find((p) => p.id === selectedPlan)?.name} Plan
                    </span>
                    <span>
                      ${plans.find((p) => p.id === selectedPlan)?.price}
                    </span>
                  </div>
                  {addOns
                    .filter((addon) => addon.enabled)
                    .map((addon) => (
                      <div
                        key={addon.id}
                        className="flex justify-between text-sm"
                      >
                        <span>{addon.name}</span>
                        <span>${addon.price}</span>
                      </div>
                    ))}
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${calculateTotal()}/month</span>
                  </div>
                  <Button className="w-full mt-4">Update Plan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View and manage your billing records
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search billing records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Billing Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBillingHistory.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No billing records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBillingHistory.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>
                              {new Date(record.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{record.description}</TableCell>
                            <TableCell>${record.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              {getStatusBadge(record.status)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {method.brand} ending in {method.last4}
                            {method.isDefault && (
                              <Badge variant="secondary" className="ml-2">
                                Default
                              </Badge>
                            )}
                          </div>
                          {method.expiryDate && (
                            <div className="text-sm text-muted-foreground">
                              Expires {method.expiryDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default B2BCustomerAdminDashboard;
