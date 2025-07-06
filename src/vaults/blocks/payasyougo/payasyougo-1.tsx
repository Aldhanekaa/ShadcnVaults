"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cpu,
  HardDrive,
  Wifi,
  Database,
  Info,
  TrendingUp,
  TrendingDown,
  Zap,
  Check,
  AlertTriangle,
} from "lucide-react";

interface ResourceConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  step: number;
  unit: string;
  pricePerUnit: number;
  description: string;
}

interface PresetConfig {
  id: string;
  name: string;
  description: string;
  badge?: string;
  resources: Record<string, number>;
}

interface PricingBreakdown {
  resource: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface PayAsYouGoPricingProps {
  resources?: ResourceConfig[];
  presets?: PresetConfig[];
  currency?: string;
  billingPeriod?: string;
  onConfigurationChange?: (
    config: Record<string, number>,
    total: number
  ) => void;
  onGetStarted?: (config: Record<string, number>) => void;
  className?: string;
}

const defaultResources: ResourceConfig[] = [
  {
    id: "cpu",
    name: "CPU Cores",
    icon: <Cpu className="w-4 h-4" />,
    min: 1,
    max: 32,
    step: 1,
    unit: "cores",
    pricePerUnit: 0.05,
    description: "Virtual CPU cores for processing power",
  },
  {
    id: "vram",
    name: "VRAM",
    icon: <Database className="w-4 h-4" />,
    min: 1,
    max: 128,
    step: 1,
    unit: "GB",
    pricePerUnit: 0.02,
    description: "Video memory for GPU-intensive tasks",
  },
  {
    id: "bandwidth",
    name: "Bandwidth",
    icon: <Wifi className="w-4 h-4" />,
    min: 10,
    max: 1000,
    step: 10,
    unit: "GB",
    pricePerUnit: 0.01,
    description: "Monthly data transfer allowance",
  },
  {
    id: "storage",
    name: "Storage",
    icon: <HardDrive className="w-4 h-4" />,
    min: 10,
    max: 2000,
    step: 10,
    unit: "GB",
    pricePerUnit: 0.001,
    description: "SSD storage space",
  },
];

const defaultPresets: PresetConfig[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small projects and testing",
    badge: "Popular",
    resources: { cpu: 2, vram: 4, bandwidth: 100, storage: 50 },
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for production workloads",
    badge: "Recommended",
    resources: { cpu: 8, vram: 16, bandwidth: 500, storage: 200 },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Maximum performance for demanding applications",
    resources: { cpu: 16, vram: 64, bandwidth: 1000, storage: 1000 },
  },
];

export default function PayAsYouGoPricing({
  resources = defaultResources,
  presets = defaultPresets,
  currency = "USD",
  billingPeriod = "hour",
  onConfigurationChange,
  onGetStarted,
  className = "",
}: PayAsYouGoPricingProps) {
  const [configuration, setConfiguration] = useState<Record<string, number>>(
    () => {
      const initial: Record<string, number> = {};
      resources.forEach((resource) => {
        initial[resource.id] = resource.min;
      });
      return initial;
    }
  );

  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [previousTotal, setPreviousTotal] = useState<number>(0);
  const [showComparison, setShowComparison] = useState(false);

  const calculateTotal = useCallback(() => {
    return resources.reduce((total, resource) => {
      const quantity = configuration[resource.id] || resource.min;
      return total + quantity * resource.pricePerUnit;
    }, 0);
  }, [configuration, resources]);

  const getPricingBreakdown = useCallback((): PricingBreakdown[] => {
    return resources.map((resource) => {
      const quantity = configuration[resource.id] || resource.min;
      const total = quantity * resource.pricePerUnit;
      return {
        resource: resource.name,
        quantity,
        unit: resource.unit,
        unitPrice: resource.pricePerUnit,
        total,
      };
    });
  }, [configuration, resources]);

  const total = calculateTotal();
  const breakdown = getPricingBreakdown();

  const handleResourceChange = useCallback(
    (resourceId: string, value: number[]) => {
      setIsCalculating(true);
      setSelectedPreset(null);

      setTimeout(() => {
        setConfiguration((prev) => {
          const newConfig = { ...prev, [resourceId]: value[0] };
          onConfigurationChange?.(newConfig, calculateTotal());
          return newConfig;
        });
        setIsCalculating(false);
      }, 100);
    },
    [onConfigurationChange, calculateTotal]
  );

  const applyPreset = useCallback(
    (preset: PresetConfig) => {
      setIsCalculating(true);
      setPreviousTotal(total);
      setSelectedPreset(preset.id);

      setTimeout(() => {
        setConfiguration(preset.resources);
        setIsCalculating(false);
        setShowComparison(true);
        setTimeout(() => setShowComparison(false), 3000);
      }, 200);
    },
    [total]
  );

  const handleGetStarted = () => {
    onGetStarted?.(configuration);
  };

  const isValidConfiguration = () => {
    return resources.every((resource) => {
      const value = configuration[resource.id];
      return value >= resource.min && value <= resource.max;
    });
  };

  const getSavingsIndicator = () => {
    if (!showComparison || previousTotal === 0) return null;

    const difference = total - previousTotal;
    const isIncrease = difference > 0;

    return (
      <div
        className={`flex items-center gap-1 text-sm ${
          isIncrease ? "text-red-500" : "text-green-500"
        }`}
      >
        {isIncrease ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {isIncrease ? "+" : ""}
        {difference.toFixed(2)} {currency}
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPreset(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <TooltipProvider>
      <div className={`w-full max-w-6xl mx-auto p-6 space-y-6 ${className}`}>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Pay-As-You-Go Pricing
          </h2>
          <p className="text-muted-foreground">
            Scale your resources dynamically and pay only for what you use
          </p>
        </div>

        <Tabs defaultValue="configure" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configure">Configure Resources</TabsTrigger>
            <TabsTrigger value="presets">Quick Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {presets.map((preset) => (
                <Card
                  key={preset.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedPreset === preset.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => applyPreset(preset)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{preset.name}</CardTitle>
                      {preset.badge && (
                        <Badge variant="secondary">{preset.badge}</Badge>
                      )}
                    </div>
                    <CardDescription>{preset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {resource.name}
                          </span>
                          <span>
                            {preset.resources[resource.id]} {resource.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configure" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Resource Configuration
                  </CardTitle>
                  <CardDescription>
                    Adjust sliders to configure your resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resources.map((resource) => (
                    <div key={resource.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {resource.icon}
                          <span className="font-medium">{resource.name}</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{resource.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">
                            {configuration[resource.id]} {resource.unit}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            ${resource.pricePerUnit}/{resource.unit}
                          </div>
                        </div>
                      </div>

                      <Slider
                        value={[configuration[resource.id] || resource.min]}
                        onValueChange={(value) =>
                          handleResourceChange(resource.id, value)
                        }
                        min={resource.min}
                        max={resource.max}
                        step={resource.step}
                        className="w-full"
                        aria-label={`${resource.name} slider`}
                      />

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {resource.min} {resource.unit}
                        </span>
                        <span>
                          {resource.max} {resource.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Breakdown</CardTitle>
                  <CardDescription>
                    Cost per {billingPeriod} in {currency}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isCalculating ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        {breakdown.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <span className="text-sm font-medium">
                                {item.resource}
                              </span>
                              <div className="text-xs text-muted-foreground">
                                {item.quantity} {item.unit} × ${item.unitPrice}
                              </div>
                            </div>
                            <span className="font-semibold">
                              ${item.total.toFixed(3)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total per {billingPeriod}</span>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span>
                              ${total.toFixed(3)} {currency}
                            </span>
                            {getSavingsIndicator()}
                          </div>
                          <div className="text-sm text-muted-foreground font-normal">
                            ~${(total * 24).toFixed(2)}/day
                          </div>
                        </div>
                      </div>

                      {!isValidConfiguration() && (
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            Configuration exceeds resource limits. Please adjust
                            your settings.
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button
                        onClick={handleGetStarted}
                        disabled={!isValidConfiguration() || isCalculating}
                        className="w-full"
                        size="lg"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Get Started with This Configuration
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        No setup fees • Pay only for active usage • Cancel
                        anytime
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
