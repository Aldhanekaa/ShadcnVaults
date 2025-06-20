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
import { Separator } from "@/components/ui/separator";
import { Github, Mail, Chrome, Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";

export const metadata = {
  id: "login-2",
  name: "Social Login",
  description: "Login form with social authentication options",
  link: "/block/login-2",
};

export function LoginBlock2() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-muted/20 p-4">
      <Card className="w-full max-w-md border-2 shadow-2xl bg-white/95 dark:bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose your preferred sign-in method
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full gap-3 h-12 border-2 hover:border-blue-300"
            >
              <Chrome className="h-5 w-5 text-blue-500" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full gap-3 h-12 border-2 hover:border-gray-400"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-12"
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
                  className="pl-10 pr-10 h-12"
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

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Button variant="link" className="text-sm text-muted-foreground">
              Forgot your password?
            </Button>
            <div className="text-sm text-muted-foreground">
              New to our platform?{" "}
              <Button variant="link" className="px-0 font-medium text-blue-600">
                Create an account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
