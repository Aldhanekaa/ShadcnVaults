"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Sparkles,
  Zap,
  Globe,
  Palette,
  Shield,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  icon: React.ReactNode;
  isMultiple: boolean;
  maxQuantity?: number;
  color: string;
  popular?: boolean;
}

interface CartItem extends AddOn {
  quantity: number;
}

const defaultAddOns: AddOn[] = [
  {
    id: "extra-pages",
    name: "Extra Pages",
    description:
      "Add additional pages to your website with custom layouts and content",
    price: 10,
    unit: "/month per page",
    icon: <Sparkles className="w-5 h-5" />,
    isMultiple: true,
    maxQuantity: 50,
    color: "blue",
    popular: true,
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    description:
      "Connect your own domain name to your website for professional branding",
    price: 15,
    unit: "/month",
    icon: <Globe className="w-5 h-5" />,
    isMultiple: false,
    color: "green",
  },
  {
    id: "premium-templates",
    name: "Premium Templates",
    description: "Access to exclusive premium design templates and themes",
    price: 25,
    unit: "/month",
    icon: <Palette className="w-5 h-5" />,
    isMultiple: false,
    color: "purple",
  },
  {
    id: "ssl-certificates",
    name: "SSL Certificates",
    description: "Secure your website with SSL encryption for each subdomain",
    price: 5,
    unit: "/month per certificate",
    icon: <Shield className="w-5 h-5" />,
    isMultiple: true,
    maxQuantity: 10,
    color: "amber",
  },
  {
    id: "database-storage",
    name: "Database Storage",
    description: "Additional database storage space for your applications",
    price: 8,
    unit: "/month per 10GB",
    icon: <Database className="w-5 h-5" />,
    isMultiple: true,
    maxQuantity: 20,
    color: "red",
  },
  {
    id: "priority-support",
    name: "Priority Support",
    description: "Get priority customer support with faster response times",
    price: 30,
    unit: "/month",
    icon: <Zap className="w-5 h-5" />,
    isMultiple: false,
    color: "orange",
  },
];

function AddOnCard({
  addOn,
  onAddToCart,
  cartItem,
}: {
  addOn: AddOn;
  onAddToCart: (addOn: AddOn, quantity: number) => void;
  cartItem?: CartItem;
}) {
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(
      0,
      Math.min(newQuantity, addOn.maxQuantity || 1)
    );
    setQuantity(clampedQuantity);
    onAddToCart(addOn, clampedQuantity);
  };

  const canIncrease = addOn.isMultiple && quantity < (addOn.maxQuantity || 1);
  const canDecrease = quantity > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card
        className={cn(
          "h-full transition-all duration-300 hover:shadow-lg",
          quantity > 0 && "ring-2 ring-primary ring-offset-2",
          addOn.popular && "border-primary"
        )}
      >
        {addOn.popular && (
          <div className="absolute -top-2 -right-2 z-10">
            <Badge className="bg-primary text-primary-foreground">
              Popular
            </Badge>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-3",
                `bg-${addOn.color}-100 text-${addOn.color}-600 dark:bg-${addOn.color}-900/20 dark:text-${addOn.color}-400`
              )}
            >
              {addOn.icon}
            </div>
          </div>
          <CardTitle className="text-xl font-semibold">{addOn.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {addOn.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">${addOn.price}</span>
              <span className="text-sm text-muted-foreground">
                {addOn.unit}
              </span>
            </div>

            {addOn.isMultiple ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={!canDecrease}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={!canIncrease}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {addOn.maxQuantity && (
                  <p className="text-xs text-muted-foreground">
                    Max: {addOn.maxQuantity}{" "}
                    {addOn.unit.includes("per")
                      ? addOn.unit.split("per")[1].trim()
                      : "units"}
                  </p>
                )}
                {quantity > 0 && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Subtotal:</span>
                      <span className="font-semibold">
                        ${addOn.price * quantity}/month
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  className="w-full"
                  variant={quantity > 0 ? "default" : "outline"}
                  onClick={() => handleQuantityChange(quantity > 0 ? 0 : 1)}
                >
                  {quantity > 0 ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CartSummary({ cartItems }: { cartItems: CartItem[] }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No add-ons selected
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart Summary
        </CardTitle>
        <CardDescription>
          {totalItems} item{totalItems !== 1 ? "s" : ""} selected
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start text-sm"
            >
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                {item.quantity > 1 && (
                  <p className="text-muted-foreground">
                    {item.quantity} × ${item.price}/month
                  </p>
                )}
              </div>
              <span className="font-medium">
                ${item.price * item.quantity}/mo
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total:</span>
            <span>${totalPrice}/month</span>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}

function AddOnsMarketplace({
  title = "Add-Ons Marketplace",
  description = "Enhance your experience with our premium add-ons",
  addOns = defaultAddOns,
}: {
  title?: string;
  description?: string;
  addOns?: AddOn[];
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (addOn: AddOn, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === addOn.id);

      if (quantity === 0) {
        return prevCart.filter((item) => item.id !== addOn.id);
      }

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === addOn.id ? { ...item, quantity } : item
        );
      }

      return [...prevCart, { ...addOn, quantity }];
    });
  };

  const getCartItem = (addOnId: string) => {
    return cart.find((item) => item.id === addOnId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addOns.map((addOn, index) => (
                <motion.div
                  key={addOn.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AddOnCard
                    addOn={addOn}
                    onAddToCart={handleAddToCart}
                    cartItem={getCartItem(addOn.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary cartItems={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddOnsMarketplaceDemo() {
  return <AddOnsMarketplace />;
}
