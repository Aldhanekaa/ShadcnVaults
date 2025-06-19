"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Server,
  Terminal,
  Play,
  AlertCircle,
  CheckCircle,
  Loader2,
  Copy,
  Eye,
  EyeOff,
  Wifi,
  WifiOff,
  Activity,
} from "lucide-react";

const GlowEffect = ({
  className,
  style,
  colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
  mode = "rotate",
  blur = "medium",
  scale = 1,
  duration = 5,
}: {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?:
    | "rotate"
    | "pulse"
    | "breathe"
    | "colorShift"
    | "flowHorizontal"
    | "static";
  blur?:
    | number
    | "softest"
    | "soft"
    | "medium"
    | "strong"
    | "stronger"
    | "strongest"
    | "none";
  scale?: number;
  duration?: number;
}) => {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: "linear",
  };

  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`,
      ],
      transition: BASE_TRANSITION,
    },
    pulse: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...BASE_TRANSITION,
        repeatType: "mirror",
      },
    },
    breathe: {
      background: [
        ...colors.map(
          (color) =>
            `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
        ),
      ],
      scale: [1 * scale, 1.05 * scale, 1 * scale],
      transition: {
        ...BASE_TRANSITION,
        repeatType: "mirror",
      },
    },
    colorShift: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
      }),
      transition: {
        ...BASE_TRANSITION,
        repeatType: "mirror",
      },
    },
    flowHorizontal: {
      background: colors.map((color) => {
        const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
        return `linear-gradient(to right, ${color}, ${nextColor})`;
      }),
      transition: {
        ...BASE_TRANSITION,
        repeatType: "mirror",
      },
    },
    static: {
      background: `linear-gradient(to right, ${colors.join(", ")})`,
    },
  };

  // @ts-ignore
  const getBlurClass = (blur: typeof blur) => {
    if (typeof blur === "number") {
      return `blur-[${blur}px]`;
    }

    const presets = {
      softest: "blur-sm",
      soft: "blur",
      medium: "blur-md",
      strong: "blur-lg",
      stronger: "blur-xl",
      strongest: "blur-xl",
      none: "blur-none",
    };

    return presets[blur as keyof typeof presets];
  };

  return (
    <motion.div
      style={
        {
          ...style,
          "--scale": scale,
          willChange: "transform",
          backfaceVisibility: "hidden",
        } as React.CSSProperties
      }
      // @ts-ignore
      animate={animations[mode]}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        "scale-[var(--scale)] transform-gpu",
        getBlurClass(blur),
        className
      )}
    />
  );
};

interface RCONResponse {
  success: boolean;
  response?: string;
  error?: string;
  timestamp: Date;
}

interface ConnectionStatus {
  connected: boolean;
  lastPing?: Date;
  latency?: number;
}

const RCONDashboard = () => {
  const [rconAddress, setRconAddress] = useState("localhost:25575");
  const [password, setPassword] = useState("");
  const [command, setCommand] = useState("list");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<RCONResponse[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
  });
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "list",
    "time query daytime",
    "weather query",
    "difficulty",
  ]);

  const simulateRCONRequest = async (
    address: string,
    pass: string,
    cmd: string
  ): Promise<RCONResponse> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const mockResponses: Record<string, string> = {
      list: "There are 3 of a max of 20 players online: Steve, Alex, Notch",
      "time query daytime": "The time is 6000",
      "weather query": "The weather is clear",
      difficulty: "The difficulty is Easy",
      version:
        "This server is running Paper version git-Paper-387 (MC: 1.20.1)",
      "whitelist list":
        "There are 5 whitelisted players: Steve, Alex, Notch, Herobrine, Jeb_",
      help: "Available commands: list, time, weather, difficulty, version, whitelist, ban, kick, tp, give",
    };

    if (Math.random() < 0.1) {
      return {
        success: false,
        error: "Connection timeout - server may be offline",
        timestamp: new Date(),
      };
    }

    const response =
      mockResponses[cmd.toLowerCase()] || `Command executed: ${cmd}`;

    return {
      success: true,
      response,
      timestamp: new Date(),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rconAddress || !password || !command) return;

    setIsLoading(true);
    setConnectionStatus({
      connected: true,
      lastPing: new Date(),
      latency: Math.floor(Math.random() * 100) + 20,
    });

    try {
      const result = await simulateRCONRequest(rconAddress, password, command);
      setResponses((prev) => [result, ...prev].slice(0, 10));

      if (!commandHistory.includes(command)) {
        setCommandHistory((prev) => [command, ...prev].slice(0, 10));
      }
    } catch (error) {
      setResponses((prev) =>
        [
          {
            success: false,
            error: "Failed to connect to RCON server",
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 10)
      );
      setConnectionStatus({ connected: false });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GlowEffect
        colors={["#0ea5e9", "#8b5cf6", "#06b6d4", "#3b82f6"]}
        mode="breathe"
        blur="strongest"
        className="opacity-20"
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Terminal className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                RCON Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Test and manage your Minecraft server remotely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-6">
                    <Server className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Server Connection</h2>
                    <Badge
                      variant={
                        connectionStatus.connected ? "default" : "secondary"
                      }
                      className="ml-auto"
                    >
                      {connectionStatus.connected ? (
                        <>
                          <Wifi className="w-3 h-3 mr-1" /> Connected
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-3 h-3 mr-1" /> Disconnected
                        </>
                      )}
                    </Badge>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">RCON Address</Label>
                        <Input
                          id="address"
                          placeholder="localhost:25575"
                          value={rconAddress}
                          onChange={(e) => setRconAddress(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter RCON password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-background/50 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="command">Command</Label>
                      <div className="flex gap-2">
                        <Input
                          id="command"
                          placeholder="Enter Minecraft command (e.g., list, time query daytime)"
                          value={command}
                          onChange={(e) => setCommand(e.target.value)}
                          className="bg-background/50 flex-1"
                        />
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="px-6"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                          {isLoading ? "Executing..." : "Execute"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>

              <Card className="p-6 relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold">Command Response</h3>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {responses.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Terminal className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No commands executed yet</p>
                        <p className="text-sm">
                          Execute a command to see the response here
                        </p>
                      </div>
                    ) : (
                      responses.map((response, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "p-4 rounded-lg border relative group",
                            response.success
                              ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                              : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {response.success ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(response.timestamp)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                  onClick={() =>
                                    copyToClipboard(
                                      response.response || response.error || ""
                                    )
                                  }
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                              <Textarea
                                value={
                                  response.response || response.error || ""
                                }
                                readOnly
                                className={cn(
                                  "min-h-[60px] resize-none border-0 p-0 bg-transparent focus-visible:ring-0",
                                  response.success
                                    ? "text-green-800 dark:text-green-200"
                                    : "text-red-800 dark:text-red-200"
                                )}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                <div className="relative">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-blue-600" />
                    Quick Commands
                  </h3>
                  <div className="space-y-2">
                    {[
                      { cmd: "list", desc: "List online players" },
                      { cmd: "time query daytime", desc: "Get current time" },
                      { cmd: "weather query", desc: "Check weather" },
                      { cmd: "difficulty", desc: "Get difficulty" },
                      { cmd: "version", desc: "Server version" },
                      { cmd: "whitelist list", desc: "Show whitelist" },
                    ].map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto p-3"
                        onClick={() => setCommand(item.cmd)}
                      >
                        <div>
                          <div className="font-mono text-sm text-primary">
                            {item.cmd}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.desc}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                <div className="relative">
                  <h3 className="text-lg font-semibold mb-4">
                    Connection Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        variant={
                          connectionStatus.connected ? "default" : "secondary"
                        }
                      >
                        {connectionStatus.connected
                          ? "Connected"
                          : "Disconnected"}
                      </Badge>
                    </div>
                    {connectionStatus.connected && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Latency
                          </span>
                          <span className="text-sm font-mono">
                            {connectionStatus.latency}ms
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Last Ping
                          </span>
                          <span className="text-sm font-mono">
                            {connectionStatus.lastPing
                              ? formatTimestamp(connectionStatus.lastPing)
                              : "N/A"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>

              {commandHistory.length > 0 && (
                <Card className="p-6 relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
                  <div className="relative">
                    <h3 className="text-lg font-semibold mb-4">
                      Command History
                    </h3>
                    <div className="space-y-1">
                      {commandHistory.slice(0, 5).map((cmd, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start font-mono text-sm h-8"
                          onClick={() => setCommand(cmd)}
                        >
                          {cmd}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RCONDashboard;
