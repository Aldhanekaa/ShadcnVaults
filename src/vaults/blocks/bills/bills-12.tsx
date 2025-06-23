"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  DollarSign,
  Calendar,
  Check,
  Plus,
  Minus,
  AlertCircle,
  Building,
  Users,
  Zap,
  Crown,
  Rocket,
  Star,
  Shield,
} from "lucide-react";

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
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
  icon: React.ComponentType<{ className?: string }>;
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
  enabled: boolean;
}

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  type: "subscription" | "addon" | "usage";
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
  { id: "users", name: "Team Members", icon: Users, href: "/users" },
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
    current: false,
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
      "Premium integrations",
      "Custom workflows",
      "API access",
    ],
    icon: Crown,
    popular: true,
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Complete solution for large organizations",
    price: { monthly: 299, yearly: 2990 },
    features: [
      "Unlimited team members",
      "1TB storage",
      "Enterprise analytics",
      "24/7 dedicated support",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
      "White-label options",
    ],
    icon: Rocket,
    current: false,
  },
];

const addOns: AddOn[] = [
  {
    id: "extra-storage",
    name: "Extra Storage",
    description: "Additional 100GB storage space",
    price: { monthly: 15, yearly: 150 },
    enabled: true,
  },
  {
    id: "advanced-security",
    name: "Advanced Security",
    description: "Enhanced security features and compliance",
    price: { monthly: 25, yearly: 250 },
    enabled: false,
  },
  {
    id: "priority-support",
    name: "Priority Support",
    description: "24/7 priority customer support",
    price: { monthly: 20, yearly: 200 },
    enabled: true,
  },
];

const bills: Bill[] = [
  {
    id: "1",
    description: "Professional Plan - Monthly",
    amount: 99,
    dueDate: "2024-02-15",
    status: "pending",
    type: "subscription",
  },
  {
    id: "2",
    description: "Extra Storage Add-on",
    amount: 15,
    dueDate: "2024-02-15",
    status: "pending",
    type: "addon",
  },
  {
    id: "3",
    description: "Priority Support Add-on",
    amount: 20,
    dueDate: "2024-02-15",
    status: "pending",
    type: "addon",
  },
  {
    id: "4",
    description: "Professional Plan - January",
    amount: 99,
    dueDate: "2024-01-15",
    status: "paid",
    type: "subscription",
  },
];

function Sidebar({
  className = "",
  activeItem,
  setActiveItem,
}: {
  className?: string;
  activeItem: string;
  setActiveItem: (item: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
                <Building className="text-primary-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-base">
                  B2B Admin
                </span>
                <span className="text-xs text-muted-foreground">
                  Customer Portal
                </span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <Building className="text-primary-foreground h-5 w-5" />
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
                          <span
                            className={`
                            px-1.5 py-0.5 text-xs font-medium rounded-full
                            ${
                              isActive
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }
                          `}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {isCollapsed && item.badge && (
                      <div className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-primary/20 border border-background">
                        <span className="text-[10px] font-medium text-primary">
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
                    Admin User
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
              className={`
                w-full flex items-center rounded-md text-left transition-all duration-200 group
                text-destructive hover:bg-destructive/10 hover:text-destructive
                ${
                  isCollapsed
                    ? "justify-center p-2.5"
                    : "space-x-2.5 px-3 py-2.5"
                }
              `}
              title={isCollapsed ? "Logout" : undefined}
            >
              <div className="flex items-center justify-center min-w-[24px]">
                <LogOut className="h-4.5 w-4.5 flex-shrink-0 text-destructive" />
              </div>

              {!isCollapsed && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function BillingDashboard() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [enabledAddOns, setEnabledAddOns] = useState<string[]>([
    "extra-storage",
    "priority-support",
  ]);

  const currentPlan = plans.find((plan) => plan.current);
  const pendingBills = bills.filter((bill) => bill.status === "pending");
  const totalPending = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);

  const toggleAddOn = (addOnId: string) => {
    setEnabledAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    const planPrice = plan
      ? isYearly
        ? plan.price.yearly
        : plan.price.monthly
      : 0;
    const addOnPrice = addOns
      .filter((addon) => enabledAddOns.includes(addon.id))
      .reduce(
        (sum, addon) =>
          sum + (isYearly ? addon.price.yearly : addon.price.monthly),
        0
      );
    return planPrice + addOnPrice;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Billing & Plans
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription and billing information
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={
                !isYearly
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isYearly ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow-sm transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={
                isYearly
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }
            >
              Yearly
            </span>
            {isYearly && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Current Plan & Bills Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2">
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Current Plan
              </h2>
              {currentPlan?.popular && (
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  Most Popular
                </span>
              )}
            </div>

            {currentPlan && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <currentPlan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {currentPlan.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentPlan.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    $
                    {isYearly
                      ? currentPlan.price.yearly
                      : currentPlan.price.monthly}
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pending Bills */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Pending Bills
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  Total Due
                </span>
              </div>
              <span className="text-lg font-bold text-orange-700">
                ${totalPending}
              </span>
            </div>

            {pendingBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {bill.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Due: {bill.dueDate}
                  </p>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ${bill.amount}
                </span>
              </div>
            ))}

            <button className="w-full mt-4 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Available Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`relative bg-background border rounded-lg p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              } ${
                plan.current ? "ring-2 ring-green-500/20 border-green-500" : ""
              }`}
              onClick={() => setSelectedPlan(plan.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedPlan === plan.id ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <plan.icon
                    className={`w-5 h-5 ${
                      selectedPlan === plan.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-sm text-green-600 mt-1">
                    Save ${plan.price.monthly * 12 - plan.price.yearly} per year
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {plan.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.features.length > 4 && (
                  <p className="text-xs text-muted-foreground">
                    +{plan.features.length - 4} more features
                  </p>
                )}
              </div>

              {!plan.current && (
                <button
                  className={`w-full mt-4 py-2 px-4 rounded-md transition-colors ${
                    selectedPlan === plan.id
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Add-ons</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon) => (
            <div
              key={addon.id}
              className="bg-background border border-border rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {addon.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {addon.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleAddOn(addon.id)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    enabledAddOns.includes(addon.id) ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow-sm transition-transform ${
                      enabledAddOns.includes(addon.id)
                        ? "translate-x-4"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">
                  ${isYearly ? addon.price.yearly : addon.price.monthly}
                </span>
                <span className="text-muted-foreground">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Cost Summary */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Cost Summary
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground">
              {plans.find((p) => p.id === selectedPlan)?.name} Plan
            </span>
            <span className="font-medium text-foreground">
              $
              {plans.find((p) => p.id === selectedPlan)
                ? isYearly
                  ? plans.find((p) => p.id === selectedPlan)!.price.yearly
                  : plans.find((p) => p.id === selectedPlan)!.price.monthly
                : 0}
            </span>
          </div>

          {addOns
            .filter((addon) => enabledAddOns.includes(addon.id))
            .map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <span className="text-muted-foreground">{addon.name}</span>
                <span className="text-foreground">
                  ${isYearly ? addon.price.yearly : addon.price.monthly}
                </span>
              </div>
            ))}

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">
                Total {isYearly ? "Yearly" : "Monthly"}
              </span>
              <span className="text-2xl font-bold text-foreground">
                ${calculateTotal()}
              </span>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium">
          Update Plan
        </button>
      </div>

      {/* Recent Bills */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Recent Bills
        </h2>

        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-t border-border">
                    <td className="py-3 px-4 text-foreground">
                      {bill.description}
                    </td>
                    <td className="py-3 px-4 text-foreground font-medium">
                      ${bill.amount}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {bill.dueDate}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bill.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : bill.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bill.status.charAt(0).toUpperCase() +
                          bill.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground capitalize">
                      {bill.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerAdminDashboard() {
  const [activeItem, setActiveItem] = useState("billing");

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex-1 overflow-auto">
        <div className="md:ml-72">
          {activeItem === "billing" && <BillingDashboard />}
          {activeItem === "dashboard" && (
            <div className="p-6">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome to your admin dashboard
              </p>
            </div>
          )}
          {activeItem !== "billing" && activeItem !== "dashboard" && (
            <div className="p-6">
              <h1 className="text-3xl font-bold text-foreground capitalize">
                {activeItem}
              </h1>
              <p className="text-muted-foreground mt-2">
                This section is under development
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerAdminDashboard;
