"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

export default function PricingBlock1() {
  const features = [
    { name: "Custom Domain", basic: true, pro: true },
    { name: "SSL Certificate", basic: true, pro: true },
    { name: "Basic Analytics", basic: true, pro: true },
    { name: "Email Support", basic: true, pro: true },
    { name: "Advanced Analytics", basic: false, pro: true },
    { name: "Priority Support", basic: false, pro: true },
    { name: "Team Collaboration", basic: false, pro: true },
    { name: "API Access", basic: false, pro: true },
    { name: "Custom Integrations", basic: false, pro: true },
    { name: "White-label Solution", basic: false, pro: true },
  ];

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose the Right Plan for You
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Compare our plans and find the perfect fit for your needs and
            budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div>
                <CardTitle className="text-2xl">Basic</CardTitle>
                <p className="text-muted-foreground">
                  Perfect for getting started
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">$9</div>
                <div className="text-muted-foreground">per month</div>
              </div>
              <Button className="w-full">Get Started</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.basic ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span
                      className={feature.basic ? "" : "text-muted-foreground"}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="px-4 py-1">Most Popular</Badge>
            </div>
            <CardHeader className="text-center space-y-4">
              <div>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <p className="text-muted-foreground">For growing businesses</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">$29</div>
                <div className="text-muted-foreground">per month</div>
              </div>
              <Button className="w-full">Start Free Trial</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.pro ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span
                      className={feature.pro ? "" : "text-muted-foreground"}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We offer enterprise plans with advanced
            features.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
