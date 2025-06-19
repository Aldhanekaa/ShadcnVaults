"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Minus,
  Check,
  Star,
  Zap,
  Globe,
  Shield,
  Palette,
  BarChart,
} from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  icon: React.ReactNode;
  category: string;
  isMultiple: boolean;
  maxQuantity?: number;
  features: string[];
  popular?: boolean;
}

interface SelectedAddOn extends AddOn {
  quantity: number;
}

interface AddOnCardProps {
  addOn: AddOn;
  selectedQuantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

interface AddOnsMarketplaceProps {
  addOns?: AddOn[];
  onPurchase?: (selectedAddOns: SelectedAddOn[]) => void;
}

const NumericInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}> = ({ value, onChange, min = 0, max = 10, disabled = false }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center border border-border rounded-lg bg-background">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className="h-8 w-8 p-0 hover:bg-muted"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <div className="flex-1 text-center py-1 px-2 text-sm font-medium min-w-[2rem]">
        {value}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className="h-8 w-8 p-0 hover:bg-muted"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

const AddOnCard: React.FC<AddOnCardProps> = ({
  addOn,
  selectedQuantity,
  onQuantityChange,
}) => {
  const isSelected = selectedQuantity > 0;

  const handleToggle = () => {
    if (addOn.isMultiple) {
      onQuantityChange(addOn.id, selectedQuantity > 0 ? 0 : 1);
    } else {
      onQuantityChange(addOn.id, selectedQuantity > 0 ? 0 : 1);
    }
  };

  return (
    <Card
      className={cn(
        "relative transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
    >
      {addOn.popular && (
        <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
          Popular
        </Badge>
      )}

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">{addOn.icon}</div>
            <div>
              <h3 className="font-semibold text-foreground">{addOn.name}</h3>
              <p className="text-sm text-muted-foreground">{addOn.category}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="font-bold text-lg text-foreground">
              ${addOn.price}
            </div>
            <div className="text-sm text-muted-foreground">/{addOn.period}</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {addOn.description}
        </p>

        <div className="space-y-2 mb-4">
          {addOn.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-3 w-3 text-green-500" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          {addOn.isMultiple ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantity:</span>
              <NumericInput
                value={selectedQuantity}
                onChange={(value) => onQuantityChange(addOn.id, value)}
                min={0}
                max={addOn.maxQuantity || 10}
              />
            </div>
          ) : (
            <Button
              variant={isSelected ? "default" : "outline"}
              onClick={handleToggle}
              className="w-full"
            >
              {isSelected ? "Remove" : "Add to Cart"}
            </Button>
          )}
        </div>

        {addOn.isMultiple && selectedQuantity > 0 && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>Subtotal:</span>
              <span className="font-semibold">
                ${(addOn.price * selectedQuantity).toFixed(2)}/{addOn.period}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OrderSummary: React.FC<{
  selectedAddOns: SelectedAddOn[];
  onPurchase: () => void;
}> = ({ selectedAddOns, onPurchase }) => {
  const total = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price * addOn.quantity,
    0
  );
  const monthlyItems = selectedAddOns.filter(
    (addOn) => addOn.period === "month"
  );
  const yearlyItems = selectedAddOns.filter((addOn) => addOn.period === "year");

  if (selectedAddOns.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-6">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4">
          {selectedAddOns.map((addOn) => (
            <div
              key={addOn.id}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <div className="font-medium">{addOn.name}</div>
                {addOn.quantity > 1 && (
                  <div className="text-muted-foreground">
                    Qty: {addOn.quantity}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-medium">
                  ${(addOn.price * addOn.quantity).toFixed(2)}
                </div>
                <div className="text-muted-foreground">/{addOn.period}</div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {monthlyItems.length > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Monthly Total:</span>
            <span className="font-bold">
              $
              {monthlyItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
              /month
            </span>
          </div>
        )}

        {yearlyItems.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Yearly Total:</span>
            <span className="font-bold">
              $
              {yearlyItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
              /year
            </span>
          </div>
        )}

        <Button onClick={onPurchase} className="w-full" size="lg">
          Purchase Add-ons
        </Button>
      </CardContent>
    </Card>
  );
};

const AddOnsMarketplace: React.FC<AddOnsMarketplaceProps> = ({
  addOns = defaultAddOns,
  onPurchase,
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>(
    {}
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const getSelectedAddOnsList = (): SelectedAddOn[] => {
    return addOns
      .filter((addOn) => selectedAddOns[addOn.id] > 0)
      .map((addOn) => ({
        ...addOn,
        quantity: selectedAddOns[addOn.id],
      }));
  };

  const handlePurchase = () => {
    const selected = getSelectedAddOnsList();
    onPurchase?.(selected);
  };

  const categories = Array.from(new Set(addOns.map((addOn) => addOn.category)));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Add-ons Marketplace
        </h1>
        <p className="text-muted-foreground">
          Enhance your experience with our premium add-ons and extensions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns
                  .filter((addOn) => addOn.category === category)
                  .map((addOn) => (
                    <AddOnCard
                      key={addOn.id}
                      addOn={addOn}
                      selectedQuantity={selectedAddOns[addOn.id] || 0}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            selectedAddOns={getSelectedAddOnsList()}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
};

const defaultAddOns: AddOn[] = [
  {
    id: "extra-pages",
    name: "Extra Pages",
    description:
      "Add additional pages to your website with full customization options.",
    price: 10,
    period: "month",
    icon: <Plus className="h-4 w-4" />,
    category: "Website Features",
    isMultiple: true,
    maxQuantity: 20,
    features: [
      "Full page customization",
      "SEO optimization",
      "Mobile responsive",
    ],
    popular: true,
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    description:
      "Connect your own domain name to your website for a professional look.",
    price: 15,
    period: "month",
    icon: <Globe className="h-4 w-4" />,
    category: "Website Features",
    isMultiple: false,
    features: [
      "SSL certificate included",
      "DNS management",
      "Email forwarding",
    ],
  },
  {
    id: "premium-support",
    name: "Premium Support",
    description:
      "Get priority support with dedicated assistance and faster response times.",
    price: 25,
    period: "month",
    icon: <Shield className="h-4 w-4" />,
    category: "Support & Services",
    isMultiple: false,
    features: [
      "24/7 priority support",
      "Phone support",
      "Dedicated account manager",
    ],
  },
  {
    id: "design-templates",
    name: "Premium Templates",
    description:
      "Access to our premium template library with exclusive designs.",
    price: 5,
    period: "month",
    icon: <Palette className="h-4 w-4" />,
    category: "Design & Customization",
    isMultiple: true,
    maxQuantity: 10,
    features: [
      "50+ premium templates",
      "Regular updates",
      "Commercial license",
    ],
  },
  {
    id: "analytics-pro",
    name: "Advanced Analytics",
    description:
      "Detailed insights and analytics for your website performance.",
    price: 20,
    period: "month",
    icon: <BarChart className="h-4 w-4" />,
    category: "Analytics & Insights",
    isMultiple: false,
    features: ["Real-time analytics", "Custom reports", "Goal tracking"],
    popular: true,
  },
  {
    id: "speed-boost",
    name: "Performance Boost",
    description: "Optimize your website speed with CDN and caching solutions.",
    price: 12,
    period: "month",
    icon: <Zap className="h-4 w-4" />,
    category: "Performance",
    isMultiple: false,
    features: ["Global CDN", "Advanced caching", "Image optimization"],
  },
];

export default function AddOnsMarketplaceDemo() {
  const handlePurchase = (selectedAddOns: SelectedAddOn[]) => {
    console.log("Purchasing add-ons:", selectedAddOns);
    alert(`Purchasing ${selectedAddOns.length} add-on(s)!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <AddOnsMarketplace onPurchase={handlePurchase} />
    </div>
  );
}
