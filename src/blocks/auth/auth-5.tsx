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
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useState } from "react";

export const metadata = {
  id: "login-5",
  name: "Forgot Password",
  description: "Password reset form with email verification",
  link: "/block/login-5",
};

export function LoginBlock5() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <Card className="w-full max-w-md border-2 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                We've sent a password reset link to your email address
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  We sent an email to:
                </p>
                <p className="font-medium">{email}</p>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>Click the link in the email to reset your password.</p>
                <p>If you don't see the email, check your spam folder.</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEmailSent(false)}
              >
                Try Different Email
              </Button>

              <Button variant="link" className="w-full">
                Resend Email
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
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
            <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              No worries, we'll send you reset instructions
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Send Reset Instructions
            </Button>
          </form>

          <div className="text-center">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
