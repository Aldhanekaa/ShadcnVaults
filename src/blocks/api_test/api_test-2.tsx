"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Server,
  Terminal,
  Send,
  CheckCircle,
  XCircle,
  Loader2,
  Settings,
} from "lucide-react";

interface RCONConfig {
  address: string;
  password: string;
  command: string;
}

interface RCONResponse {
  success: boolean;
  response: string;
  timestamp: Date;
}

function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit && onSubmit(e);
  };

  return (
    <form
      className={cn(
        "w-full relative max-w-xl mx-auto bg-background dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 border border-border",
        value && "bg-muted"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-foreground h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          animating && "text-transparent dark:text-transparent"
        )}
      />

      <button
        disabled={!value}
        type="submit"
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-muted bg-primary dark:bg-primary dark:disabled:bg-muted transition duration-200 flex items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-foreground h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="dark:text-zinc-500 text-sm sm:text-base font-normal text-muted-foreground pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

const RCONAdminDashboard = () => {
  const [config, setConfig] = useState<RCONConfig>({
    address: "localhost:25575",
    password: "",
    command: "",
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [responses, setResponses] = useState<RCONResponse[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connected" | "error"
  >("disconnected");

  const commandPlaceholders = [
    "/list - Show online players",
    "/time set day - Set time to day",
    "/weather clear - Clear weather",
    "/gamemode creative @a - Set all to creative",
    "/tp player1 player2 - Teleport players",
    "/give @p diamond 64 - Give diamonds",
    "/ban player reason - Ban a player",
    "/whitelist add player - Add to whitelist",
  ];

  // Simulate RCON connection and command execution
  const executeRCONCommand = async () => {
    if (!config.address || !config.password || !config.command) {
      return;
    }

    setIsConnecting(true);
    setConnectionStatus("connected");

    try {
      // Simulate network delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 2000)
      );

      // Simulate different responses based on command
      let simulatedResponse = "";
      const cmd = config.command.toLowerCase();

      if (cmd.includes("/list")) {
        simulatedResponse =
          "There are 3 of a max of 20 players online: Steve, Alex, Notch";
      } else if (cmd.includes("/time")) {
        simulatedResponse = "Set the time to 1000";
      } else if (cmd.includes("/weather")) {
        simulatedResponse = "Changed the weather to clear";
      } else if (cmd.includes("/gamemode")) {
        simulatedResponse = "Set Steve's game mode to Creative Mode";
      } else if (cmd.includes("/tp")) {
        simulatedResponse = "Teleported Steve to Alex";
      } else if (cmd.includes("/give")) {
        simulatedResponse = "Gave 64 [Diamond] to Steve";
      } else if (cmd.includes("/ban")) {
        simulatedResponse = "Banned player from the server";
      } else if (cmd.includes("/whitelist")) {
        simulatedResponse = "Added player to the whitelist";
      } else if (cmd.includes("/help")) {
        simulatedResponse =
          "Available commands: /list, /time, /weather, /gamemode, /tp, /give, /ban, /whitelist";
      } else {
        simulatedResponse = `Command executed: ${config.command}`;
      }

      // Randomly simulate some failures
      const success = Math.random() > 0.1;

      const response: RCONResponse = {
        success,
        response: success
          ? simulatedResponse
          : "Error: Connection timeout or invalid command",
        timestamp: new Date(),
      };

      setResponses((prev) => [response, ...prev].slice(0, 10)); // Keep last 10 responses
      setConfig((prev) => ({ ...prev, command: "" }));
    } catch (error) {
      setConnectionStatus("error");
      const response: RCONResponse = {
        success: false,
        response: "Failed to connect to RCON server",
        timestamp: new Date(),
      };
      setResponses((prev) => [response, ...prev].slice(0, 10));
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeRCONCommand();
  };

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig((prev) => ({ ...prev, command: e.target.value }));
  };

  const clearResponses = () => {
    setResponses([]);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <Server className="text-primary" />
            RCON Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Test and execute RCON commands for your Minecraft server
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Server Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">RCON Address</Label>
                  <Input
                    id="address"
                    placeholder="localhost:25575"
                    value={config.address}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">RCON Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter RCON password"
                    value={config.password}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      connectionStatus === "connected" && "bg-green-500",
                      connectionStatus === "disconnected" && "bg-gray-400",
                      connectionStatus === "error" && "bg-red-500"
                    )}
                  />
                  <span className="text-sm text-muted-foreground">
                    {connectionStatus === "connected" && "Connected"}
                    {connectionStatus === "disconnected" && "Disconnected"}
                    {connectionStatus === "error" && "Connection Error"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Command Interface */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Command Interface
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>RCON Command</Label>
                  <PlaceholdersAndVanishInput
                    placeholders={commandPlaceholders}
                    onChange={handleCommandChange}
                    onSubmit={handleCommandSubmit}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={executeRCONCommand}
                    disabled={
                      isConnecting ||
                      !config.address ||
                      !config.password ||
                      !config.command
                    }
                    className="flex items-center gap-2"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isConnecting ? "Executing..." : "Execute Command"}
                  </Button>

                  {responses.length > 0 && (
                    <Button variant="outline" onClick={clearResponses}>
                      Clear History
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response History */}
        {responses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Response History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {responses.map((response, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {response.success ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <Badge
                          variant={response.success ? "default" : "destructive"}
                        >
                          {response.success ? "Success" : "Error"}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {response.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-sm">{response.response}</code>
                    </div>
                    {index < responses.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Commands */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "/list",
                "/time set day",
                "/weather clear",
                "/gamemode creative @a",
                "/tp @p spawn",
                "/give @p diamond 64",
                "/whitelist list",
                "/help",
              ].map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, command: cmd }))
                  }
                  className="text-xs"
                >
                  {cmd}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RCONAdminDashboard;
