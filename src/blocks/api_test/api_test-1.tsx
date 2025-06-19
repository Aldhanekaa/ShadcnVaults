"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Terminal,
  Send,
  Loader2,
  Eye,
  EyeOff,
  Server,
  History,
  CheckCircle,
  XCircle,
  Copy,
  Trash2,
  Settings,
  AlertTriangle,
} from "lucide-react";

interface RCONCommand {
  id: string;
  command: string;
  timestamp: Date;
  response?: string;
  status: "success" | "error" | "pending";
  duration?: number;
}

interface RCONConfig {
  address: string;
  port: string;
  password: string;
}

interface ValidationErrors {
  address?: string;
  port?: string;
  password?: string;
  command?: string;
}

const MinecraftRCONDashboard: React.FC = () => {
  const [config, setConfig] = useState<RCONConfig>({
    address: "localhost",
    port: "25575",
    password: "your-rcon-password",
  });

  const [command, setCommand] = useState<string>("list");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<RCONCommand[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [syntaxHighlight, setSyntaxHighlight] = useState<boolean>(true);

  const responseAreaRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  const validateConfig = (): boolean => {
    const errors: ValidationErrors = {};

    if (!config.address.trim()) {
      errors.address = "Server address is required";
    } else if (!/^[\w.-]+$/.test(config.address)) {
      errors.address = "Invalid server address format";
    }

    const portNum = parseInt(config.port);
    if (!config.port.trim()) {
      errors.port = "Port is required";
    } else if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      errors.port = "Port must be between 1 and 65535";
    }

    if (!config.password.trim()) {
      errors.password = "RCON password is required";
    } else if (config.password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }

    if (!command.trim()) {
      errors.command = "Command is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const simulateRCONCommand = async (
    cmd: string
  ): Promise<{ response: string; status: "success" | "error" }> => {
    // Simulate network delay
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 2000 + 500)
    );

    // Simulate different responses based on command
    const responses: Record<string, string> = {
      list: "There are 3 of a max of 20 players online: Steve, Alex, Notch",
      "time query daytime": "The time is 6000",
      "weather clear": "Set the weather to clear",
      "gamemode creative Steve": "Set Steve's game mode to Creative Mode",
      "tp Steve Alex": "Teleported Steve to Alex",
      "give Steve diamond 64": "Gave 64 [Diamond] to Steve",
      ban: "Error: Usage: /ban <player> [reason]",
      invalid: 'Unknown command. Type "/help" for help.',
    };

    const lowerCmd = cmd.toLowerCase();
    let response = responses[lowerCmd] || `Executed: ${cmd}`;
    let status: "success" | "error" = "success";

    // Simulate errors for certain commands
    if (lowerCmd.includes("ban") && lowerCmd.split(" ").length < 2) {
      status = "error";
    } else if (lowerCmd === "invalid" || lowerCmd.includes("unknown")) {
      status = "error";
    } else if (Math.random() < 0.1) {
      // 10% chance of connection error
      response = "Connection timeout - failed to execute command";
      status = "error";
    }

    return { response, status };
  };

  const executeCommand = async () => {
    if (!validateConfig()) return;

    const commandId = Date.now().toString();
    const startTime = Date.now();

    const newCommand: RCONCommand = {
      id: commandId,
      command: command.trim(),
      timestamp: new Date(),
      status: "pending",
    };

    setCommandHistory((prev) => [newCommand, ...prev]);
    setIsLoading(true);

    try {
      const result = await simulateRCONCommand(command.trim());
      const duration = Date.now() - startTime;

      setCommandHistory((prev) =>
        prev.map((cmd) =>
          cmd.id === commandId
            ? {
                ...cmd,
                response: result.response,
                status: result.status,
                duration,
              }
            : cmd
        )
      );

      if (result.status === "success") {
        setIsConnected(true);
      }
    } catch (error) {
      setCommandHistory((prev) =>
        prev.map((cmd) =>
          cmd.id === commandId
            ? {
                ...cmd,
                response: "Failed to connect to server",
                status: "error" as const,
              }
            : cmd
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setCommandHistory([]);
  };

  const copyResponse = (response: string) => {
    navigator.clipboard.writeText(response);
  };

  const formatResponse = (response: string, highlight: boolean) => {
    if (!highlight) return response;

    // Simple syntax highlighting for Minecraft responses
    return response
      .replace(/(\d+)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(Steve|Alex|Notch)/g, '<span class="text-green-400">$1</span>')
      .replace(
        /(Error|Failed|Unknown)/g,
        '<span class="text-red-400">$1</span>'
      )
      .replace(
        /(Success|Gave|Set|Teleported)/g,
        '<span class="text-emerald-400">$1</span>'
      );
  };

  useEffect(() => {
    if (autoScroll && responseAreaRef.current) {
      responseAreaRef.current.scrollTop = 0;
    }
  }, [commandHistory, autoScroll]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      executeCommand();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Minecraft RCON Dashboard
              </h1>
              <p className="text-muted-foreground">
                Execute commands on your Minecraft server
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={isConnected ? "default" : "secondary"}
              className="flex items-center space-x-1"
            >
              <Server className="h-3 w-3" />
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Server Configuration</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Server Address</Label>
                  <Input
                    id="address"
                    value={config.address}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="localhost or IP address"
                    className={validationErrors.address ? "border-red-500" : ""}
                  />
                  {validationErrors.address && (
                    <p className="text-sm text-red-500">
                      {validationErrors.address}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="port">RCON Port</Label>
                  <Input
                    id="port"
                    value={config.port}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, port: e.target.value }))
                    }
                    placeholder="25575"
                    type="number"
                    className={validationErrors.port ? "border-red-500" : ""}
                  />
                  {validationErrors.port && (
                    <p className="text-sm text-red-500">
                      {validationErrors.port}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">RCON Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={config.password}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="Enter RCON password"
                      className={
                        validationErrors.password
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {validationErrors.password && (
                    <p className="text-sm text-red-500">
                      {validationErrors.password}
                    </p>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-scroll">Auto-scroll responses</Label>
                  <Switch
                    id="auto-scroll"
                    checked={autoScroll}
                    onCheckedChange={setAutoScroll}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="syntax-highlight">Syntax highlighting</Label>
                  <Switch
                    id="syntax-highlight"
                    checked={syntaxHighlight}
                    onCheckedChange={setSyntaxHighlight}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Command Execution and Response */}
          <div className="lg:col-span-2 space-y-6">
            {/* Command Input */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Execute Command</h2>
              </div>

              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    ref={commandInputRef}
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Minecraft command (e.g., list, time query daytime)"
                    className={validationErrors.command ? "border-red-500" : ""}
                    disabled={isLoading}
                  />
                  {validationErrors.command && (
                    <p className="text-sm text-red-500 mt-1">
                      {validationErrors.command}
                    </p>
                  )}
                </div>
                <Button
                  onClick={executeCommand}
                  disabled={isLoading || !command.trim()}
                  className="px-6"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="ml-2">
                    {isLoading ? "Executing..." : "Execute"}
                  </span>
                </Button>
              </div>
            </Card>

            {/* Response Area */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">
                    Command History & Responses
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  disabled={commandHistory.length === 0}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>

              <ScrollArea className="h-96" ref={responseAreaRef}>
                {commandHistory.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No commands executed yet</p>
                      <p className="text-sm">
                        Execute a command to see the response here
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {commandHistory.map((cmd) => (
                      <div
                        key={cmd.id}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {cmd.timestamp.toLocaleTimeString()}
                            </Badge>
                            <Badge
                              variant={
                                cmd.status === "success"
                                  ? "default"
                                  : cmd.status === "error"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="flex items-center space-x-1"
                            >
                              {cmd.status === "success" && (
                                <CheckCircle className="h-3 w-3" />
                              )}
                              {cmd.status === "error" && (
                                <XCircle className="h-3 w-3" />
                              )}
                              {cmd.status === "pending" && (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              )}
                              <span className="capitalize">{cmd.status}</span>
                            </Badge>
                            {cmd.duration && (
                              <Badge variant="outline" className="text-xs">
                                {cmd.duration}ms
                              </Badge>
                            )}
                          </div>
                          {cmd.response && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyResponse(cmd.response!)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="bg-muted/50 rounded p-2 font-mono text-sm">
                            <span className="text-muted-foreground">$ </span>
                            <span>{cmd.command}</span>
                          </div>

                          {cmd.response && (
                            <div
                              className={`bg-muted/30 rounded p-2 font-mono text-sm ${
                                cmd.status === "error"
                                  ? "border-l-4 border-red-500"
                                  : "border-l-4 border-green-500"
                              }`}
                            >
                              {syntaxHighlight ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: formatResponse(
                                      cmd.response,
                                      syntaxHighlight
                                    ),
                                  }}
                                />
                              ) : (
                                <span>{cmd.response}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </div>
        </div>

        {/* Quick Commands */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Commands</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              "list",
              "time query daytime",
              "weather clear",
              "gamemode creative Steve",
              "tp Steve Alex",
              "give Steve diamond 64",
            ].map((quickCmd) => (
              <Button
                key={quickCmd}
                variant="outline"
                size="sm"
                onClick={() => setCommand(quickCmd)}
                className="text-xs"
                disabled={isLoading}
              >
                {quickCmd}
              </Button>
            ))}
          </div>
        </Card>

        {/* Connection Status Alert */}
        {!isConnected && commandHistory.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <div>
              <h4 className="font-semibold">Connection Status</h4>
              <p className="text-sm">
                Some commands may have failed. Check your server configuration
                and ensure RCON is enabled.
              </p>
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default MinecraftRCONDashboard;
