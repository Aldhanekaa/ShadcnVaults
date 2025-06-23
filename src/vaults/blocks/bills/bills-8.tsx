"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  Bell,
  Search,
  HelpCircle,
  CreditCard,
  Package,
  Plus,
  Check,
  Crown,
  Zap,
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

interface SidebarProps {
  className?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  isPopular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  icon: React.ComponentType<{ className?: string }>;
}

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  type: "plan" | "addon";
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", name: "Dashboard", icon: Home, href: "/dashboard" },
  {
    id: "billing",
    name: "Billing & Plans",
    icon: CreditCard,
    href: "/billing",
    badge: "2",
  },
  { id: "analytics", name: "Analytics", icon: BarChart3, href: "/analytics" },
  {
    id: "documents",
    name: "Documents",
    icon: FileText,
    href: "/documents",
    badge: "3",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    href: "/notifications",
    badge: "12",
  },
  { id: "profile", name: "Profile", icon: User, href: "/profile" },
  { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
  { id: "help", name: "Help & Support", icon: HelpCircle, href: "/help" },
];

const plans: Plan[] = [
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
    icon: Zap,
    color: "blue",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Advanced features for growing businesses",
    price: { monthly: 99, yearly: 990 },
    features: [
      "Up to 25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access",
      "Advanced security",
    ],
    isPopular: true,
    icon: Crown,
    color: "purple",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Complete solution for large organizations",
    price: { monthly: 299, yearly: 2990 },
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Custom analytics",
      "24/7 dedicated support",
      "White-label options",
      "Custom development",
      "SLA guarantee",
      "Advanced compliance",
    ],
    icon: Building,
    color: "emerald",
  },
];

const addOns: AddOn[] = [
  {
    id: "extra-storage",
    name: "Extra Storage",
    description: "Additional 100GB storage per month",
    price: { monthly: 15, yearly: 150 },
    icon: Package,
  },
  {
    id: "premium-support",
    name: "Premium Support",
    description: "24/7 phone and chat support",
    price: { monthly: 25, yearly: 250 },
    icon: HelpCircle,
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    description: "Custom reports and data insights",
    price: { monthly: 35, yearly: 350 },
    icon: TrendingUp,
  },
];

function Sidebar({ className = "" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("billing");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-background shadow-md border border-border md:hidden hover:bg-accent transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <Menu className="h-5 w-5 text-foreground" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full bg-background border-r border-border z-40 transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-20" : "w-72"}
          md:translate-x-0 md:static md:z-auto
          ${className}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
          {!isCollapsed && (
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-base">
                  B
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-base">
                  BizCorp
                </span>
                <span className="text-xs text-muted-foreground">
                  Admin Dashboard
                </span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <span className="text-primary-foreground font-bold text-base">
                B
              </span>
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-md hover:bg-accent transition-all duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {!isCollapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-md text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="space-y-0.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-md text-left transition-all duration-200 group relative
                      ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }
                      ${isCollapsed ? "justify-center px-2" : ""}
                    `}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className="flex items-center justify-center min-w-[24px]">
                      <Icon
                        className={`
                          h-4.5 w-4.5 flex-shrink-0
                          ${
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          }
                        `}
                      />
                    </div>

                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-sm ${
                            isActive ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.badge && (
                          <Badge
                            variant={isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    )}

                    {isCollapsed && item.badge && (
                      <div className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-primary border border-background">
                        <span className="text-[10px] font-medium text-primary-foreground">
                          {parseInt(item.badge) > 9 ? "9+" : item.badge}
                        </span>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-border">
          <div
            className={`border-b border-border bg-muted/30 ${
              isCollapsed ? "py-3 px-2" : "p-3"
            }`}
          >
            {!isCollapsed ? (
              <div className="flex items-center px-3 py-2 rounded-md bg-background hover:bg-accent transition-colors duration-200">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-foreground font-medium text-sm">
                    JD
                  </span>
                </div>
                <div className="flex-1 min-w-0 ml-2.5">
                  <p className="text-sm font-medium text-foreground truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Admin
                  </p>
                </div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full ml-2"
                  title="Online"
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-foreground font-medium text-sm">
                      JD
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
              </div>
            )}
          </div>

          <div className="p-3">
            <button
              onClick={() => handleItemClick("logout")}
              className={`
                w-full flex items-center rounded-md text-left transition-all duration-200 group
                text-destructive hover:bg-destructive/10
                ${
                  isCollapsed
                    ? "justify-center p-2.5"
                    : "space-x-2.5 px-3 py-2.5"
                }
              `}
              title={isCollapsed ? "Logout" : undefined}
            >
              <div className="flex items-center justify-center min-w-[24px]">
                <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
              </div>

              {!isCollapsed && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function CustomerAdminDashboard() {
  const [selectedPlan, setSelectedPlan] = useState<string>("professional");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    "premium-support",
  ]);
  const [isYearly, setIsYearly] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentPlan = plans.find((p) => p.id === selectedPlan);

  const bills: Bill[] = [
    {
      id: "1",
      description: `${currentPlan?.name} Plan - ${
        isYearly ? "Annual" : "Monthly"
      }`,
      amount: isYearly
        ? currentPlan?.price.yearly || 0
        : currentPlan?.price.monthly || 0,
      dueDate: "2024-02-15",
      status: "pending",
      type: "plan",
    },
    ...selectedAddOns.map((addonId, index) => {
      const addon = addOns.find((a) => a.id === addonId);
      return {
        id: `addon-${index}`,
        description: `${addon?.name} - ${isYearly ? "Annual" : "Monthly"}`,
        amount: isYearly ? addon?.price.yearly || 0 : addon?.price.monthly || 0,
        dueDate: "2024-02-15",
        status: "pending" as const,
        type: "addon" as const,
      };
    }),
    {
      id: "2",
      description: "Professional Plan - Monthly (Previous)",
      amount: 99,
      dueDate: "2024-01-15",
      status: "paid",
      type: "plan",
    },
  ];

  const totalAmount = bills
    .filter((bill) => bill.status === "pending")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleAddOnToggle = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
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
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-72"
        } overflow-auto`}
      >
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Billing & Plans
            </h1>
            <p className="text-muted-foreground">
              Manage your subscription plans and billing information
            </p>
          </div>

          <Tabs defaultValue="plans" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="addons">Add-ons</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Choose Your Plan</h2>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-sm ${
                        !isYearly ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Monthly
                    </span>
                    <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                    <span
                      className={`text-sm ${
                        isYearly ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Yearly
                    </span>
                    {isYearly && (
                      <Badge variant="secondary" className="ml-2">
                        Save 20%
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => {
                    const Icon = plan.icon;
                    const isSelected = selectedPlan === plan.id;

                    return (
                      <Card
                        key={plan.id}
                        className={`relative p-6 cursor-pointer transition-all hover:shadow-lg ${
                          isSelected ? "ring-2 ring-primary border-primary" : ""
                        } ${plan.isPopular ? "border-primary/50" : ""}`}
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        {plan.isPopular && (
                          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            Most Popular
                          </Badge>
                        )}

                        <div className="text-center mb-4">
                          <div
                            className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-${plan.color}-100 flex items-center justify-center`}
                          >
                            <Icon
                              className={`h-6 w-6 text-${plan.color}-600`}
                            />
                          </div>
                          <h3 className="text-lg font-semibold">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {plan.description}
                          </p>
                        </div>

                        <div className="text-center mb-6">
                          <div className="text-3xl font-bold">
                            ${isYearly ? plan.price.yearly : plan.price.monthly}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per {isYearly ? "year" : "month"}
                          </div>
                          {isYearly && (
                            <div className="text-sm text-green-600 mt-1">
                              Save $
                              {plan.price.monthly * 12 - plan.price.yearly}/year
                            </div>
                          )}
                        </div>

                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="w-full"
                          variant={isSelected ? "default" : "outline"}
                        >
                          {isSelected ? "Current Plan" : "Select Plan"}
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="addons" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Available Add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {addOns.map((addon) => {
                    const Icon = addon.icon;
                    const isSelected = selectedAddOns.includes(addon.id);

                    return (
                      <Card
                        key={addon.id}
                        className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? "ring-2 ring-primary border-primary" : ""
                        }`}
                        onClick={() => handleAddOnToggle(addon.id)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Icon className="h-5 w-5 text-foreground" />
                          </div>
                          <Switch
                            checked={isSelected}
                            onCheckedChange={() => handleAddOnToggle(addon.id)}
                          />
                        </div>

                        <h3 className="font-semibold mb-2">{addon.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {addon.description}
                        </p>

                        <div className="text-lg font-bold">
                          ${isYearly ? addon.price.yearly : addon.price.monthly}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{isYearly ? "year" : "month"}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Current Bills</h2>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {bills.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                bill.type === "plan"
                                  ? "bg-primary/10"
                                  : "bg-secondary/10"
                              }`}
                            >
                              {bill.type === "plan" ? (
                                <CreditCard className="h-5 w-5 text-primary" />
                              ) : (
                                <Package className="h-5 w-5 text-secondary-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {bill.description}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Due: {bill.dueDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-semibold">
                                ${bill.amount}
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${getStatusColor(
                                  bill.status
                                )}`}
                              >
                                {bill.status}
                              </Badge>
                            </div>
                            {bill.status === "pending" && (
                              <Button size="sm">Pay Now</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Billing Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Current Plan
                        </span>
                        <span className="font-medium">{currentPlan?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Billing Cycle
                        </span>
                        <span className="font-medium">
                          {isYearly ? "Yearly" : "Monthly"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Active Add-ons
                        </span>
                        <span className="font-medium">
                          {selectedAddOns.length}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Due</span>
                        <span>${totalAmount}</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay ${totalAmount}
                    </Button>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download Invoice
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Payment Methods
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Billing History
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-muted/50">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">
                          Payment Reminder
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your next payment of ${totalAmount} is due on February
                          15, 2024.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default CustomerAdminDashboard;
