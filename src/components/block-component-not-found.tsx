import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, AlertCircle, Home, Search } from "lucide-react";
import React from "react";

export default function BlockComponentNotFound({
  blockId,
}: {
  blockId: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blocks
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="font-semibold">Component Not Found</h1>
              <p className="text-sm text-muted-foreground">
                Block does not exist
              </p>
            </div>
          </div>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/shadcn/ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      {/* Not Found Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight">
                Component Not Found
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The block component{" "}
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                  "{blockId}"
                </code>{" "}
                does not exist in our library.
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 max-w-lg mx-auto">
            <div className="flex items-start gap-3 mb-4">
              <Search className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium mb-2">This could happen if:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• The block ID is misspelled or incorrect</li>
                  <li>• The component hasn't been implemented yet</li>
                  <li>• The block has been moved or renamed</li>
                  <li>• You're using an outdated link</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Browse All Blocks
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#hero">View Hero Blocks</Link>
            </Button>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Looking for a specific component? Check our{" "}
              <Link
                href="/"
                className="text-primary hover:underline font-medium"
              >
                complete block library
              </Link>{" "}
              or{" "}
              <a
                href="https://github.com/shadcn/ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                contribute on GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
