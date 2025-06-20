"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Smartphone,
  ArrowRight,
  Shield,
} from "lucide-react";
import { useState } from "react";

export const metadata = {
  id: "login-7",
  name: "Two-Factor Login",
  description: "Login form with two-factor authentication",
  link: "/block/login-7",
};

export function LoginBlock7() {
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("2fa");
  };

  if (step === "2fa") {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <Card className="w-full max-w-md border-2 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CardTitle className="text-2xl font-bold">
                  Two-Factor Authentication
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Required
                </Badge>
              </div>
              <CardDescription className="text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <Label className="text-center block">Authentication Code</Label>
                <div className="flex gap-2 justify-center">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-bold"
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full gap-2">
                Verify & Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <Separator />

            <div className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive a code?
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">
                  Resend Code
                </Button>
                <Button variant="outline" size="sm">
                  Use Backup Code
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Button variant="ghost" onClick={() => setStep("login")}>
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md border-2 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-2xl font-bold">
                Secure Sign In
              </CardTitle>
              <Badge variant="outline" className="text-xs gap-1">
                <Shield className="h-3 w-3" />
                2FA
              </Badge>
            </div>
            <CardDescription className="text-muted-foreground">
              Enhanced security with two-factor authentication
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2">
              Continue to 2FA
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Enhanced Security</p>
                <p className="text-xs text-muted-foreground">
                  Your account is protected with two-factor authentication for
                  maximum security.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Need help?{" "}
            <Button variant="link" className="px-0 font-medium">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
