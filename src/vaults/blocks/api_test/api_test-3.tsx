"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Server, Send, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

interface RconResponse {
  success: boolean;
  response?: string;
  error?: string;
}

interface RconDashboardProps {
  defaultAddress?: string;
  defaultPassword?: string;
  defaultCommand?: string;
}

const RconDashboard = React.forwardRef<HTMLDivElement, RconDashboardProps>(
  (
    {
      defaultAddress = "localhost:25575",
      defaultPassword = "",
      defaultCommand = "list",
    },
    ref
  ) => {
    const [address, setAddress] = React.useState(defaultAddress);
    const [password, setPassword] = React.useState(defaultPassword);
    const [command, setCommand] = React.useState(defaultCommand);
    const [response, setResponse] = React.useState<RconResponse | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const sendRconCommand = async () => {
      if (!address || !password || !command) {
        setResponse({
          success: false,
          error: "Please fill in all fields",
        });
        return;
      }

      setIsLoading(true);
      setResponse(null);

      try {
        // Simulate RCON connection and command execution
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock response based on command
        const mockResponses: Record<string, string> = {
          list: "There are 3 of a max of 20 players online: Steve, Alex, Notch",
          "time query daytime": "The time is 6000",
          "weather query": "It is currently clear",
          difficulty: "The difficulty is Easy",
          seed: "Seed: [1234567890]",
          version:
            "This server is running CraftBukkit version git-Bukkit-1.20.1",
          help: "Available commands: list, time, weather, difficulty, seed, version, say, give, tp, gamemode",
        };

        const mockResponse =
          mockResponses[command.toLowerCase()] ||
          `Command executed: ${command}`;

        setResponse({
          success: true,
          response: mockResponse,
        });
      } catch (error) {
        setResponse({
          success: false,
          error:
            "Failed to connect to RCON server. Please check your connection details.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        sendRconCommand();
      }
    };

    return (
      <div ref={ref} className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Server className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                RCON Admin Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Test and execute RCON commands on your Minecraft server
            </p>
          </div>

          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rcon-address" className="text-sm font-medium">
                  RCON Address
                </Label>
                <Input
                  id="rcon-address"
                  type="text"
                  placeholder="localhost:25575"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Format: hostname:port (e.g., localhost:25575)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rcon-password" className="text-sm font-medium">
                  RCON Password
                </Label>
                <Input
                  id="rcon-password"
                  type="password"
                  placeholder="Enter RCON password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  The password configured in server.properties
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcon-command" className="text-sm font-medium">
                Command
              </Label>
              <div className="flex gap-2">
                <Input
                  id="rcon-command"
                  type="text"
                  placeholder="list"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendRconCommand}
                  disabled={isLoading || !address || !password || !command}
                  className="px-6"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Press Ctrl+Enter to send command quickly
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "list",
                "time query daytime",
                "weather query",
                "difficulty",
              ].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() => setCommand(cmd)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {cmd}
                </Button>
              ))}
            </div>
          </Card>

          {response && (
            <Alert
              variant={response.success ? "default" : "destructive"}
              // @ts-ignore
              icon={
                response.success ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )
              }
              layout="complex"
            >
              <AlertTitle>
                {response.success
                  ? "Command Executed Successfully"
                  : "Command Failed"}
              </AlertTitle>
              <AlertDescription>
                <div className="mt-2">
                  {response.success ? (
                    <Textarea
                      value={response.response || ""}
                      readOnly
                      className="min-h-[100px] font-mono text-sm bg-muted/50"
                    />
                  ) : (
                    <p className="text-sm">{response.error}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Common RCON Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <code className="bg-muted px-1 rounded">list</code> - Show
                online players
              </div>
              <div>
                <code className="bg-muted px-1 rounded">time set day</code> -
                Set time to day
              </div>
              <div>
                <code className="bg-muted px-1 rounded">weather clear</code> -
                Clear weather
              </div>
              <div>
                <code className="bg-muted px-1 rounded">
                  say &lt;message&gt;
                </code>{" "}
                - Broadcast message
              </div>
              <div>
                <code className="bg-muted px-1 rounded">
                  tp &lt;player&gt; &lt;target&gt;
                </code>{" "}
                - Teleport player
              </div>
              <div>
                <code className="bg-muted px-1 rounded">
                  gamemode &lt;mode&gt; &lt;player&gt;
                </code>{" "}
                - Change gamemode
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
);

RconDashboard.displayName = "RconDashboard";

export default function Component() {
  return <RconDashboard />;
}
