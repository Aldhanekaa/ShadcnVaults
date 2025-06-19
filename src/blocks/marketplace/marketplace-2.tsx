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
import {
  Plus,
  Minus,
  Check,
  Star,
  Zap,
  Globe,
  Shield,
  BarChart3,
} from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  period: "month" | "year";
  icon: React.ReactNode;
  category: string;
  isMultiple: boolean;
  maxQuantity?: number;
  popular?: boolean;
  features: string[];
}

interface CartItem {
  addOnId: string;
  quantity: number;
}

const AddOnsMarketplace: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addOns: AddOn[] = [
    {
      id: "extra-pages",
      name: "Extra Pages",
      description: "Add additional pages to your website",
      price: 10,
      period: "month",
      icon: <Plus className="w-5 h-5" />,
      category: "Content",
      isMultiple: true,
      maxQuantity: 50,
      features: ["Custom page design", "SEO optimization", "Mobile responsive"],
    },
    {
      id: "custom-domain",
      name: "Custom Domain",
      description: "Connect your own domain name",
      price: 15,
      period: "month",
      icon: <Globe className="w-5 h-5" />,
      category: "Domain",
      isMultiple: false,
      popular: true,
      features: [
        "Free SSL certificate",
        "Domain management",
        "DNS configuration",
      ],
    },
    {
      id: "analytics-pro",
      name: "Analytics Pro",
      description: "Advanced analytics and reporting",
      price: 25,
      period: "month",
      icon: <BarChart3 className="w-5 h-5" />,
      category: "Analytics",
      isMultiple: false,
      features: ["Advanced metrics", "Custom reports", "Data export"],
    },
    {
      id: "premium-support",
      name: "Premium Support",
      description: "Priority customer support",
      price: 20,
      period: "month",
      icon: <Shield className="w-5 h-5" />,
      category: "Support",
      isMultiple: false,
      features: ["24/7 support", "Phone support", "Dedicated account manager"],
    },
    {
      id: "storage-boost",
      name: "Storage Boost",
      description: "Additional storage space (10GB per unit)",
      price: 5,
      period: "month",
      icon: <Zap className="w-5 h-5" />,
      category: "Storage",
      isMultiple: true,
      maxQuantity: 20,
      features: [
        "10GB additional storage",
        "Automatic backups",
        "CDN acceleration",
      ],
    },
  ];

  const getCartItem = (addOnId: string): CartItem | undefined => {
    return cart.find((item) => item.addOnId === addOnId);
  };

  const updateQuantity = (addOnId: string, quantity: number) => {
    const addOn = addOns.find((a) => a.id === addOnId);
    if (!addOn) return;

    if (quantity <= 0) {
      setCart(cart.filter((item) => item.addOnId !== addOnId));
      return;
    }

    if (!addOn.isMultiple && quantity > 1) return;
    if (addOn.maxQuantity && quantity > addOn.maxQuantity) return;

    const existingItem = cart.find((item) => item.addOnId === addOnId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.addOnId === addOnId ? { ...item, quantity } : item
        )
      );
    } else {
      setCart([...cart, { addOnId, quantity }]);
    }
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => {
      const addOn = addOns.find((a) => a.id === item.addOnId);
      return total + (addOn ? addOn.price * item.quantity : 0);
    }, 0);
  };

  const categories = Array.from(new Set(addOns.map((addon) => addon.category)));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Add-Ons Marketplace
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enhance your experience with our premium add-ons. Choose from a
            variety of features to customize your plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {categories.map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addOns
                    .filter((addon) => addon.category === category)
                    .map((addon) => {
                      const cartItem = getCartItem(addon.id);
                      const quantity = cartItem?.quantity || 0;

                      return (
                        <Card
                          key={addon.id}
                          className="relative border-border hover:shadow-lg transition-shadow"
                        >
                          {addon.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                              <Star className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}

                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                {addon.icon}
                              </div>
                              <div>
                                <CardTitle className="text-lg">
                                  {addon.name}
                                </CardTitle>
                                <CardDescription>
                                  {addon.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-foreground">
                                  ${addon.price}
                                  <span className="text-sm text-muted-foreground">
                                    /{addon.period}
                                  </span>
                                  {addon.isMultiple && (
                                    <span className="text-sm text-muted-foreground ml-1">
                                      per unit
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {addon.isMultiple ? (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          updateQuantity(addon.id, quantity - 1)
                                        }
                                        disabled={quantity === 0}
                                      >
                                        <Minus className="w-4 h-4" />
                                      </Button>
                                      <span className="w-8 text-center font-medium">
                                        {quantity}
                                      </span>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          updateQuantity(addon.id, quantity + 1)
                                        }
                                        disabled={
                                          addon.maxQuantity
                                            ? quantity >= addon.maxQuantity
                                            : false
                                        }
                                      >
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      variant={
                                        quantity > 0 ? "default" : "outline"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        updateQuantity(
                                          addon.id,
                                          quantity > 0 ? 0 : 1
                                        )
                                      }
                                    >
                                      {quantity > 0 ? (
                                        <>
                                          <Check className="w-4 h-4 mr-1" />
                                          Added
                                        </>
                                      ) : (
                                        "Add to Cart"
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium text-sm text-foreground">
                                  Features:
                                </h4>
                                <ul className="space-y-1">
                                  {addon.features.map((feature, index) => (
                                    <li
                                      key={index}
                                      className="text-sm text-muted-foreground flex items-center gap-2"
                                    >
                                      <Check className="w-3 h-3 text-primary" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {addon.maxQuantity && addon.isMultiple && (
                                <p className="text-xs text-muted-foreground">
                                  Maximum {addon.maxQuantity} units
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6 border-border">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your selected add-ons</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No add-ons selected
                    </p>
                  ) : (
                    <>
                      {cart.map((item) => {
                        const addon = addOns.find((a) => a.id === item.addOnId);
                        if (!addon) return null;

                        return (
                          <div
                            key={item.addOnId}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {addon.name}
                              </p>
                              {addon.isMultiple && (
                                <p className="text-xs text-muted-foreground">
                                  Quantity: {item.quantity}
                                </p>
                              )}
                            </div>
                            <p className="font-medium">
                              ${addon.price * item.quantity}/{addon.period}
                            </p>
                          </div>
                        );
                      })}

                      <Separator />

                      <div className="flex justify-between items-center font-bold">
                        <span>Total</span>
                        <span>${getTotalPrice()}/month</span>
                      </div>

                      <Button className="w-full" size="lg">
                        Proceed to Checkout
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOnsMarketplace;
