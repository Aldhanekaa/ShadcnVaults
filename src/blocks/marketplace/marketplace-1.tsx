"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingCart, X, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  category: string;
  isMultiple: boolean;
  maxQuantity?: number;
  icon?: string;
}

interface CartItem extends AddOn {
  quantity: number;
}

interface AddOnsMarketplaceProps {
  addOns?: AddOn[];
}

const defaultAddOns: AddOn[] = [
  {
    id: "1",
    name: "Extra Page",
    description: "Add additional pages to your website",
    price: 10,
    period: "month",
    category: "Content",
    isMultiple: true,
    maxQuantity: 50,
    icon: "📄",
  },
  {
    id: "2",
    name: "Custom Domain",
    description: "Connect your own domain name",
    price: 15,
    period: "month",
    category: "Domain",
    isMultiple: false,
    icon: "🌐",
  },
  {
    id: "3",
    name: "SSL Certificate",
    description: "Secure your website with SSL encryption",
    price: 5,
    period: "month",
    category: "Security",
    isMultiple: false,
    icon: "🔒",
  },
  {
    id: "4",
    name: "Email Account",
    description: "Professional email accounts for your domain",
    price: 8,
    period: "month",
    category: "Email",
    isMultiple: true,
    maxQuantity: 20,
    icon: "📧",
  },
  {
    id: "5",
    name: "Analytics Pro",
    description: "Advanced analytics and reporting features",
    price: 25,
    period: "month",
    category: "Analytics",
    isMultiple: false,
    icon: "📊",
  },
  {
    id: "6",
    name: "Storage Upgrade",
    description: "Additional 10GB storage space",
    price: 3,
    period: "month",
    category: "Storage",
    isMultiple: true,
    maxQuantity: 100,
    icon: "💾",
  },
  {
    id: "7",
    name: "Priority Support",
    description: "24/7 priority customer support",
    price: 20,
    period: "month",
    category: "Support",
    isMultiple: false,
    icon: "🎧",
  },
  {
    id: "8",
    name: "Backup Service",
    description: "Daily automated backups",
    price: 12,
    period: "month",
    category: "Security",
    isMultiple: false,
    icon: "💿",
  },
];

function AddOnsMarketplace({ addOns = defaultAddOns }: AddOnsMarketplaceProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(addOns.map((addon) => addon.category))),
  ];

  const filteredAddOns =
    selectedCategory === "All"
      ? addOns
      : addOns.filter((addon) => addon.category === selectedCategory);

  const addToCart = (addOn: AddOn) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === addOn.id);

      if (existingItem) {
        if (
          addOn.isMultiple &&
          (!addOn.maxQuantity || existingItem.quantity < addOn.maxQuantity)
        ) {
          return currentCart.map((item) =>
            item.id === addOn.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return currentCart;
      }

      return [...currentCart, { ...addOn, quantity: 1 }];
    });
  };

  const removeFromCart = (addOnId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== addOnId));
  };

  const updateQuantity = (addOnId: string, delta: number) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id === addOnId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return item;
          if (item.maxQuantity && newQuantity > item.maxQuantity) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const getCartItem = (addOnId: string) => {
    return cart.find((item) => item.id === addOnId);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Add-Ons Marketplace
        </h1>
        <p className="text-muted-foreground">
          Enhance your plan with powerful add-ons
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Add-Ons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAddOns.map((addOn) => {
              const cartItem = getCartItem(addOn.id);
              const isInCart = !!cartItem;
              const canAddMore =
                addOn.isMultiple &&
                (!addOn.maxQuantity ||
                  !cartItem ||
                  cartItem.quantity < addOn.maxQuantity);

              return (
                <motion.div
                  key={addOn.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "group relative p-6 rounded-xl border transition-all duration-200",
                    "bg-background hover:bg-accent/50",
                    "border-border hover:border-border/80",
                    isInCart && "ring-2 ring-primary/20 border-primary/30"
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{addOn.icon}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {addOn.name}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {addOn.category}
                        </span>
                      </div>
                    </div>
                    {!addOn.isMultiple && isInCart && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {addOn.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-foreground">
                        ${addOn.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        per {addOn.period}
                        {addOn.isMultiple && " (each)"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isInCart && addOn.isMultiple && (
                        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(addOn.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">
                            {cartItem?.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(addOn.id, 1)}
                            disabled={!canAddMore}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      )}

                      {!isInCart && (
                        <Button
                          size="sm"
                          onClick={() => addToCart(addOn)}
                          className="gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add
                        </Button>
                      )}

                      {isInCart && !addOn.isMultiple && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(addOn.id)}
                          className="gap-1"
                        >
                          <X className="w-3 h-3" />
                          Remove
                        </Button>
                      )}

                      {isInCart && addOn.isMultiple && canAddMore && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(addOn)}
                          className="gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          More
                        </Button>
                      )}
                    </div>
                  </div>

                  {addOn.maxQuantity && addOn.isMultiple && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Max: {addOn.maxQuantity}{" "}
                      {addOn.maxQuantity === 1 ? "unit" : "units"}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cart Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "w-80 flex flex-col",
            "p-6 rounded-xl",
            "bg-background border border-border",
            "sticky top-6 max-h-[calc(100vh-3rem)]"
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Cart ({totalItems})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
            <AnimatePresence initial={false} mode="popLayout">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-muted-foreground"
                >
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Your cart is empty</p>
                  <p className="text-sm">Add some add-ons to get started</p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          ${item.price}/{item.period}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {item.isMultiple ? (
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={
                              item.maxQuantity
                                ? item.quantity >= item.maxQuantity
                                : false
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Single use
                        </span>
                      )}

                      <span className="text-sm font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {cart.length > 0 && (
            <motion.div layout className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-foreground">
                  Total
                </span>
                <span className="text-xl font-bold text-foreground">
                  ${totalPrice.toFixed(2)}/month
                </span>
              </div>
              <Button className="w-full gap-2">
                <CreditCard className="w-4 h-4" />
                Checkout
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function AddOnsMarketplaceDemo() {
  return <AddOnsMarketplace />;
}
