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
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Info,
  Calculator,
  Zap,
  Users,
  Database,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface PricingTier {
  name: string;
  basePrice: number;
  unitPrice: number;
  includedUnits: number;
  features: string[];
}

interface PricingConfig {
  usage: number;
  tier: string;
  billingPeriod: "monthly" | "yearly";
  addOns: {
    priority: boolean;
    analytics: boolean;
    support: boolean;
  };
}

interface PricingBreakdown {
  basePrice: number;
  usagePrice: number;
  addOnPrice: number;
  discount: number;
  total: number;
  savings: number;
}

const PayAsYouGoPricing: React.FC = () => {
  const [config, setConfig] = useState<PricingConfig>({
    usage: 1000,
    tier: "starter",
    billingPeriod: "monthly",
    addOns: {
      priority: false,
      analytics: false,
      support: false,
    },
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [breakdown, setBreakdown] = useState<PricingBreakdown>({
    basePrice: 0,
    usagePrice: 0,
    addOnPrice: 0,
    discount: 0,
    total: 0,
    savings: 0,
  });

  const pricingTiers: Record<string, PricingTier> = {
    starter: {
      name: "Starter",
      basePrice: 29,
      unitPrice: 0.05,
      includedUnits: 500,
      features: ["Basic API Access", "Email Support", "Standard SLA"],
    },
    professional: {
      name: "Professional",
      basePrice: 99,
      unitPrice: 0.03,
      includedUnits: 2000,
      features: [
        "Advanced API Access",
        "Priority Support",
        "Enhanced SLA",
        "Custom Integrations",
      ],
    },
    enterprise: {
      name: "Enterprise",
      basePrice: 299,
      unitPrice: 0.02,
      includedUnits: 10000,
      features: [
        "Full API Access",
        "24/7 Support",
        "Premium SLA",
        "Custom Integrations",
        "Dedicated Manager",
      ],
    },
  };

  const addOnPricing = {
    priority: { monthly: 19, yearly: 190 },
    analytics: { monthly: 39, yearly: 390 },
    support: { monthly: 59, yearly: 590 },
  };

  const calculatePricing = (newConfig: PricingConfig): PricingBreakdown => {
    const tier = pricingTiers[newConfig.tier];
    const basePrice = tier.basePrice;

    const excessUsage = Math.max(0, newConfig.usage - tier.includedUnits);
    const usagePrice = excessUsage * tier.unitPrice;

    let addOnPrice = 0;
    if (newConfig.addOns.priority)
      addOnPrice += addOnPricing.priority[newConfig.billingPeriod];
    if (newConfig.addOns.analytics)
      addOnPrice += addOnPricing.analytics[newConfig.billingPeriod];
    if (newConfig.addOns.support)
      addOnPrice += addOnPricing.support[newConfig.billingPeriod];

    const subtotal = basePrice + usagePrice + addOnPrice;
    const yearlyDiscount =
      newConfig.billingPeriod === "yearly" ? subtotal * 0.2 : 0;
    const total = subtotal - yearlyDiscount;
    const monthlySavings =
      newConfig.billingPeriod === "yearly" ? yearlyDiscount / 12 : 0;

    return {
      basePrice,
      usagePrice,
      addOnPrice,
      discount: yearlyDiscount,
      total,
      savings: monthlySavings,
    };
  };

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const newBreakdown = calculatePricing(config);
      setBreakdown(newBreakdown);
      setIsCalculating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [config]);

  const updateConfig = (updates: Partial<PricingConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateAddOn = (
    addOn: keyof PricingConfig["addOns"],
    value: boolean
  ) => {
    setConfig((prev) => ({
      ...prev,
      addOns: { ...prev.addOns, [addOn]: value },
    }));
  };

  const currentTier = pricingTiers[config.tier];
  const usagePercentage = Math.min(
    (config.usage / (currentTier.includedUnits * 2)) * 100,
    100
  );

  return (
    <TooltipProvider>
      <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Pay-As-You-Go Pricing
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize your plan with real-time pricing. Only pay for what you
            use with transparent, flexible pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tier Selection */}
            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Choose Your Tier
                </CardTitle>
                <CardDescription>
                  Select the plan that best fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        config.tier === key
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:shadow-sm"
                      }`}
                      onClick={() => updateConfig({ tier: key })}
                    >
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">
                          {tier.name}
                        </h3>
                        <p className="text-2xl font-bold text-primary">
                          ${tier.basePrice}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tier.includedUnits.toLocaleString()} units included
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${tier.unitPrice}/unit after
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Configuration */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Usage Volume
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Estimate your monthly API calls or data processing units
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Monthly Usage</Label>
                    <Badge variant="outline" className="text-sm">
                      {config.usage.toLocaleString()} units
                    </Badge>
                  </div>
                  <Slider
                    value={[config.usage]}
                    onValueChange={([value]) => updateConfig({ usage: value })}
                    max={50000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100</span>
                    <span>50,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usage vs Included</span>
                    <span
                      className={
                        config.usage > currentTier.includedUnits
                          ? "text-orange-500"
                          : "text-green-500"
                      }
                    >
                      {config.usage > currentTier.includedUnits
                        ? "Over limit"
                        : "Within limit"}
                    </span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {currentTier.includedUnits.toLocaleString()} units included
                    in {currentTier.name} plan
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Billing Period */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Billing Period
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={config.billingPeriod}
                  onValueChange={(value: "monthly" | "yearly") =>
                    updateConfig({ billingPeriod: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Billing</SelectItem>
                    <SelectItem value="yearly">
                      <div className="flex items-center gap-2">
                        Yearly Billing
                        <Badge variant="secondary" className="text-xs">
                          Save 20%
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Add-ons
                </CardTitle>
                <CardDescription>
                  Enhance your plan with additional features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "priority" as const,
                    name: "Priority Processing",
                    description: "Faster API response times",
                  },
                  {
                    key: "analytics" as const,
                    name: "Advanced Analytics",
                    description: "Detailed usage insights and reporting",
                  },
                  {
                    key: "support" as const,
                    name: "Premium Support",
                    description: "24/7 phone and chat support",
                  },
                ].map((addOn) => (
                  <div
                    key={addOn.key}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={addOn.key}
                          className="font-medium cursor-pointer"
                        >
                          {addOn.name}
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          +${addOnPricing[addOn.key][config.billingPeriod]}/
                          {config.billingPeriod === "yearly" ? "year" : "month"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {addOn.description}
                      </p>
                    </div>
                    <Switch
                      id={addOn.key}
                      checked={config.addOns[addOn.key]}
                      onCheckedChange={(checked) =>
                        updateAddOn(addOn.key, checked)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-6">
            <Card className="border-border bg-card sticky top-6">
              <CardHeader>
                <CardTitle className="text-center">Pricing Summary</CardTitle>
                {config.billingPeriod === "yearly" && (
                  <Badge variant="secondary" className="mx-auto">
                    20% Annual Discount Applied
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {isCalculating ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Calculating...
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">
                          Base Plan ({currentTier.name})
                        </span>
                        <span className="text-sm font-medium">
                          ${breakdown.basePrice}
                        </span>
                      </div>

                      {breakdown.usagePrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm">
                            Additional Usage (
                            {(
                              config.usage - currentTier.includedUnits
                            ).toLocaleString()}{" "}
                            units)
                          </span>
                          <span className="text-sm font-medium">
                            ${breakdown.usagePrice.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {breakdown.addOnPrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm">Add-ons</span>
                          <span className="text-sm font-medium">
                            ${breakdown.addOnPrice}
                          </span>
                        </div>
                      )}

                      {breakdown.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span className="text-sm">Annual Discount (20%)</span>
                          <span className="text-sm font-medium">
                            -${breakdown.discount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ${breakdown.total.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        per{" "}
                        {config.billingPeriod === "yearly" ? "year" : "month"}
                      </p>

                      {config.billingPeriod === "yearly" &&
                        breakdown.savings > 0 && (
                          <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                            <p className="text-sm text-green-700 dark:text-green-300">
                              You save ${breakdown.savings.toFixed(2)}/month
                            </p>
                          </div>
                        )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">
                        Included Features:
                      </h4>
                      <div className="space-y-2">
                        {currentTier.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className="w-full group"
                      size="lg"
                      disabled={isCalculating}
                    >
                      Get Started - ${breakdown.total.toFixed(2)}/
                      {config.billingPeriod === "yearly" ? "year" : "month"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-border bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Need Help?</h4>
                    <p className="text-xs text-muted-foreground">
                      Our pricing calculator helps you estimate costs based on
                      your usage. Contact our sales team for custom enterprise
                      pricing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PayAsYouGoPricing;
