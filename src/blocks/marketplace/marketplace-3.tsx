"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Star,
  Globe,
  Palette,
  Shield,
  Zap,
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
  popular?: boolean;
  features: string[];
}

interface SelectedAddOn {
  id: string;
  quantity: number;
}

interface AddOnMarketplaceProps {
  addOns?: AddOn[];
  onSelectionChange?: (selectedAddOns: SelectedAddOn[]) => void;
}

const defaultAddOns: AddOn[] = [
  {
    id: "extra-pages",
    name: "Extra Pages",
    description: "Add additional pages to your website with full customization",
    price: 10,
    period: "month",
    icon: <Plus className="h-5 w-5" />,
    category: "Content",
    isMultiple: true,
    maxQuantity: 50,
    features: ["Full customization", "SEO optimized", "Mobile responsive"],
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    description: "Connect your own domain name to your website",
    price: 15,
    period: "month",
    icon: <Globe className="h-5 w-5" />,
    category: "Domain",
    isMultiple: false,
    popular: true,
    features: [
      "SSL certificate included",
      "DNS management",
      "Email forwarding",
    ],
  },
  {
    id: "premium-templates",
    name: "Premium Templates",
    description: "Access to exclusive premium design templates",
    price: 25,
    period: "month",
    icon: <Palette className="h-5 w-5" />,
    category: "Design",
    isMultiple: false,
    features: ["50+ premium templates", "Regular updates", "Priority support"],
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    description: "Detailed insights and analytics for your website",
    price: 20,
    period: "month",
    icon: <Star className="h-5 w-5" />,
    category: "Analytics",
    isMultiple: false,
    features: ["Real-time data", "Custom reports", "Goal tracking"],
  },
  {
    id: "ssl-certificates",
    name: "SSL Certificates",
    description: "Additional SSL certificates for subdomains",
    price: 5,
    period: "month",
    icon: <Shield className="h-5 w-5" />,
    category: "Security",
    isMultiple: true,
    maxQuantity: 10,
    features: ["256-bit encryption", "Wildcard support", "Auto-renewal"],
  },
  {
    id: "performance-boost",
    name: "Performance Boost",
    description: "Enhanced server resources and CDN acceleration",
    price: 30,
    period: "month",
    icon: <Zap className="h-5 w-5" />,
    category: "Performance",
    isMultiple: false,
    popular: true,
    features: ["Global CDN", "SSD storage", "99.9% uptime"],
  },
];

const AddOnMarketplace: React.FC<AddOnMarketplaceProps> = ({
  addOns = defaultAddOns,
  onSelectionChange,
}) => {
  const [selectedAddOns, setSelectedAddOns] = React.useState<SelectedAddOn[]>(
    []
  );

  const updateSelection = (addOnId: string, quantity: number) => {
    const newSelection = selectedAddOns.filter((item) => item.id !== addOnId);
    if (quantity > 0) {
      newSelection.push({ id: addOnId, quantity });
    }
    setSelectedAddOns(newSelection);
    onSelectionChange?.(newSelection);
  };

  const getQuantity = (addOnId: string) => {
    return selectedAddOns.find((item) => item.id === addOnId)?.quantity || 0;
  };

  const increaseQuantity = (addOn: AddOn) => {
    const currentQuantity = getQuantity(addOn.id);
    const maxQty = addOn.maxQuantity || 999;
    if (currentQuantity < maxQty) {
      updateSelection(addOn.id, currentQuantity + 1);
    }
  };

  const decreaseQuantity = (addOn: AddOn) => {
    const currentQuantity = getQuantity(addOn.id);
    if (currentQuantity > 0) {
      updateSelection(addOn.id, currentQuantity - 1);
    }
  };

  const toggleSingleAddOn = (addOn: AddOn) => {
    const currentQuantity = getQuantity(addOn.id);
    updateSelection(addOn.id, currentQuantity > 0 ? 0 : 1);
  };

  const getTotalCost = () => {
    return selectedAddOns.reduce((total, selected) => {
      const addOn = addOns.find((a) => a.id === selected.id);
      return total + (addOn ? addOn.price * selected.quantity : 0);
    }, 0);
  };

  const categories = Array.from(new Set(addOns.map((addOn) => addOn.category)));

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Add-Ons Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enhance your experience with our premium add-ons. Choose from a
          variety of features to customize your plan.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns
              .filter((addOn) => addOn.category === category)
              .map((addOn) => {
                const quantity = getQuantity(addOn.id);
                const isSelected = quantity > 0;

                return (
                  <Card
                    key={addOn.id}
                    className={`relative transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-primary shadow-lg"
                        : "hover:shadow-md"
                    }`}
                  >
                    {addOn.popular && (
                      <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                        Popular
                      </Badge>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {addOn.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {addOn.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold text-foreground">
                              ${addOn.price}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              /{addOn.period}
                            </span>
                            {addOn.isMultiple && (
                              <Badge variant="outline" className="text-xs">
                                per{" "}
                                {addOn.name.toLowerCase().includes("page")
                                  ? "page"
                                  : "item"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {addOn.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {addOn.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {isSelected && (
                        <>
                          <Separator />
                          <div className="bg-primary/5 p-3 rounded-lg">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">
                                {addOn.isMultiple
                                  ? `Quantity: ${quantity}`
                                  : "Added to cart"}
                              </span>
                              <span className="font-semibold text-foreground">
                                ${addOn.price * quantity}/{addOn.period}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>

                    <CardFooter className="pt-4">
                      {addOn.isMultiple ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => decreaseQuantity(addOn)}
                              disabled={quantity === 0}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => increaseQuantity(addOn)}
                              disabled={quantity >= (addOn.maxQuantity || 999)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant={isSelected ? "secondary" : "default"}
                            size="sm"
                            onClick={() => increaseQuantity(addOn)}
                            disabled={quantity >= (addOn.maxQuantity || 999)}
                          >
                            {isSelected ? "Added" : "Add"}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant={isSelected ? "secondary" : "default"}
                          className="w-full"
                          onClick={() => toggleSingleAddOn(addOn)}
                        >
                          {isSelected ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Added
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      {selectedAddOns.length > 0 && (
        <Card className="sticky bottom-6 bg-background/95 backdrop-blur-sm border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Cart Summary</span>
              <Badge variant="secondary">{selectedAddOns.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedAddOns.map((selected) => {
                const addOn = addOns.find((a) => a.id === selected.id);
                if (!addOn) return null;

                return (
                  <div
                    key={selected.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded bg-primary/10 text-primary">
                        {addOn.icon}
                      </div>
                      <div>
                        <span className="font-medium">{addOn.name}</span>
                        {selected.quantity > 1 && (
                          <span className="text-sm text-muted-foreground ml-2">
                            × {selected.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold">
                      ${addOn.price * selected.quantity}/{addOn.period}
                    </span>
                  </div>
                );
              })}
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>${getTotalCost()}/month</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default function Demo() {
  return (
    <div className="min-h-screen bg-background">
      <AddOnMarketplace />
    </div>
  );
}
