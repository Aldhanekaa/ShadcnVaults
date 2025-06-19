"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  type: "single" | "multiple";
  maxQuantity?: number;
  icon?: React.ReactNode;
  popular?: boolean;
}

interface AddOnItemProps {
  addOn: AddOn;
  quantity: number;
  selected: boolean;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

function AddOnItem({
  addOn,
  quantity,
  selected,
  onToggle,
  onQuantityChange,
}: AddOnItemProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, quantity + delta);
    if (addOn.maxQuantity) {
      onQuantityChange(addOn.id, Math.min(newQuantity, addOn.maxQuantity));
    } else {
      onQuantityChange(addOn.id, newQuantity);
    }
  };

  return (
    <div
      className={cn(
        "relative p-4 border rounded-lg transition-all duration-200",
        selected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50",
        addOn.popular && "ring-2 ring-primary/20"
      )}
    >
      {addOn.popular && (
        <div className="absolute -top-2 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          Popular
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <Checkbox
            checked={selected}
            onChange={() => onToggle(addOn.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              {addOn.icon}
              <h3 className="font-semibold text-foreground">{addOn.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {addOn.description}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg font-bold text-foreground">
                ${addOn.price}
              </span>
              <span className="text-sm text-muted-foreground">
                /{addOn.period}
              </span>
              {addOn.type === "multiple" && (
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  per {addOn.period === "month" ? "page" : "item"}
                </span>
              )}
            </div>
          </div>
        </div>

        {addOn.type === "multiple" && selected && (
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={
                addOn.maxQuantity ? quantity >= addOn.maxQuantity : false
              }
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface AddOnMarketplaceProps {
  addOns?: AddOn[];
  onPurchase?: (selectedAddOns: { addOn: AddOn; quantity: number }[]) => void;
}

export function AddOnMarketplace({
  addOns = [
    {
      id: "1",
      name: "Extra Pages",
      description:
        "Add additional pages to your website with full customization",
      price: 10,
      period: "month",
      type: "multiple",
      maxQuantity: 10,
      icon: <div className="w-5 h-5 bg-blue-500 rounded" />,
      popular: true,
    },
    {
      id: "2",
      name: "Custom Domain",
      description: "Connect your own domain name to your website",
      price: 15,
      period: "month",
      type: "single",
      icon: <div className="w-5 h-5 bg-green-500 rounded" />,
    },
    {
      id: "3",
      name: "Analytics Dashboard",
      description: "Advanced analytics and reporting for your website",
      price: 25,
      period: "month",
      type: "single",
      icon: <div className="w-5 h-5 bg-purple-500 rounded" />,
    },
    {
      id: "4",
      name: "Email Accounts",
      description: "Professional email accounts with your domain",
      price: 5,
      period: "month",
      type: "multiple",
      maxQuantity: 20,
      icon: <div className="w-5 h-5 bg-orange-500 rounded" />,
    },
    {
      id: "5",
      name: "SSL Certificate",
      description: "Secure your website with SSL encryption",
      price: 8,
      period: "month",
      type: "single",
      icon: <div className="w-5 h-5 bg-red-500 rounded" />,
    },
    {
      id: "6",
      name: "Storage Space",
      description: "Additional storage space for your files and media",
      price: 3,
      period: "month",
      type: "multiple",
      maxQuantity: 50,
      icon: <div className="w-5 h-5 bg-cyan-500 rounded" />,
    },
  ],
  onPurchase,
}: AddOnMarketplaceProps) {
  const [selectedAddOns, setSelectedAddOns] = React.useState<
    Record<string, number>
  >({});

  const handleToggle = (id: string) => {
    setSelectedAddOns((prev) => {
      const newSelected = { ...prev };
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        newSelected[id] = 1;
      }
      return newSelected;
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedAddOns((prev) => {
        const newSelected = { ...prev };
        delete newSelected[id];
        return newSelected;
      });
    } else {
      setSelectedAddOns((prev) => ({
        ...prev,
        [id]: quantity,
      }));
    }
  };

  const selectedItems = Object.entries(selectedAddOns).map(([id, quantity]) => {
    const addOn = addOns.find((a) => a.id === id)!;
    return { addOn, quantity };
  });

  const totalCost = selectedItems.reduce((sum, { addOn, quantity }) => {
    return sum + addOn.price * quantity;
  }, 0);

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(selectedItems);
    } else {
      console.log("Selected add-ons:", selectedItems);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Add-Ons Marketplace
        </h1>
        <p className="text-muted-foreground">
          Enhance your experience with our premium add-ons
        </p>
      </div>

      <div className="grid gap-4">
        {addOns.map((addOn) => (
          <AddOnItem
            key={addOn.id}
            addOn={addOn}
            quantity={selectedAddOns[addOn.id] || 0}
            selected={!!selectedAddOns[addOn.id]}
            onToggle={handleToggle}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      {selectedItems.length > 0 && (
        <Card className="sticky bottom-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>

              <div className="space-y-2">
                {selectedItems.map(({ addOn, quantity }) => (
                  <div key={addOn.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{addOn.name}</span>
                      {quantity > 1 && (
                        <span className="text-muted-foreground ml-2">
                          × {quantity}
                        </span>
                      )}
                    </div>
                    <span>${(addOn.price * quantity).toFixed(2)}/month</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalCost.toFixed(2)}/month</span>
              </div>

              <Button onClick={handlePurchase} className="w-full" size="lg">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase Selected Add-ons
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AddOnMarketplaceDemo() {
  return (
    <div className="min-h-screen bg-background">
      <AddOnMarketplace />
    </div>
  );
}
