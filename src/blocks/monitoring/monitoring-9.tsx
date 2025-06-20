"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Plus,
  Settings,
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  MapPin,
  Users,
  Monitor,
  Power,
  PowerOff,
  Pause,
  Play,
  Trash2,
  Edit,
  Eye,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Types
interface VPSParent {
  id: string;
  name: string;
  region: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "online" | "offline" | "maintenance";
  ipAddress: string;
  createdAt: string;
  usedCpu: number;
  usedRam: number;
  usedStorage: number;
  sharedVPS: SharedVPS[];
  dedicatedVPS: DedicatedVPS[];
}

interface SharedVPS {
  id: string;
  name: string;
  parentId: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "running" | "stopped" | "suspended";
  customer: string;
  domain?: string;
  createdAt: string;
  usedCpu: number;
  usedRam: number;
  usedStorage: number;
}

interface DedicatedVPS {
  id: string;
  name: string;
  region: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "running" | "stopped" | "suspended";
  customer: string;
  domain?: string;
  ipAddress: string;
  createdAt: string;
  usedCpu: number;
  usedRam: number;
  usedStorage: number;
}

// Sample data
const sampleVPSParents: VPSParent[] = [
  {
    id: "parent-1",
    name: "US-East-1-Parent",
    region: "US East (Virginia)",
    cpu: 32,
    ram: 128,
    storage: 2000,
    status: "online",
    ipAddress: "192.168.1.100",
    createdAt: "2024-01-15",
    usedCpu: 18,
    usedRam: 85,
    usedStorage: 1200,
    sharedVPS: [
      {
        id: "shared-1",
        name: "WebStore-Alpha",
        parentId: "parent-1",
        cpu: 4,
        ram: 16,
        storage: 200,
        status: "running",
        customer: "TechCorp Inc",
        domain: "techcorp-store.com",
        createdAt: "2024-02-01",
        usedCpu: 2.5,
        usedRam: 12,
        usedStorage: 150,
      },
      {
        id: "shared-2",
        name: "WebStore-Beta",
        parentId: "parent-1",
        cpu: 2,
        ram: 8,
        storage: 100,
        status: "running",
        customer: "StartupXYZ",
        domain: "startupxyz.shop",
        createdAt: "2024-02-10",
        usedCpu: 1.2,
        usedRam: 6,
        usedStorage: 75,
      },
    ],
    dedicatedVPS: [],
  },
  {
    id: "parent-2",
    name: "EU-West-1-Parent",
    region: "EU West (Ireland)",
    cpu: 24,
    ram: 96,
    storage: 1500,
    status: "online",
    ipAddress: "192.168.2.100",
    createdAt: "2024-01-20",
    usedCpu: 8,
    usedRam: 32,
    usedStorage: 600,
    sharedVPS: [],
    dedicatedVPS: [],
  },
];

const sampleDedicatedVPS: DedicatedVPS[] = [
  {
    id: "dedicated-1",
    name: "Enterprise-Store-1",
    region: "US West (California)",
    cpu: 16,
    ram: 64,
    storage: 1000,
    status: "running",
    customer: "Enterprise Corp",
    domain: "enterprise-store.com",
    ipAddress: "203.0.113.10",
    createdAt: "2024-01-25",
    usedCpu: 8.5,
    usedRam: 45,
    usedStorage: 650,
  },
  {
    id: "dedicated-2",
    name: "Premium-Shop-2",
    region: "Asia Pacific (Singapore)",
    cpu: 8,
    ram: 32,
    storage: 500,
    status: "stopped",
    customer: "Premium Retail",
    domain: "premium-shop.asia",
    ipAddress: "203.0.113.20",
    createdAt: "2024-02-05",
    usedCpu: 0,
    usedRam: 0,
    usedStorage: 200,
  },
];

const regions = [
  "US East (Virginia)",
  "US West (California)",
  "EU West (Ireland)",
  "EU Central (Frankfurt)",
  "Asia Pacific (Singapore)",
  "Asia Pacific (Tokyo)",
];

// Chart data
const chartConfig = {
  cpu: { label: "CPU", color: "hsl(var(--chart-1))" },
  ram: { label: "RAM", color: "hsl(var(--chart-2))" },
  storage: { label: "Storage", color: "hsl(var(--chart-3))" },
};

const generateMetricsData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    cpu: Math.floor(Math.random() * 100),
    ram: Math.floor(Math.random() * 100),
    storage: Math.floor(Math.random() * 100),
  }));
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "running":
        return "bg-green-500";
      case "offline":
      case "stopped":
        return "bg-red-500";
      case "maintenance":
      case "suspended":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "running":
        return <CheckCircle className="w-3 h-3" />;
      case "offline":
      case "stopped":
        return <PowerOff className="w-3 h-3" />;
      case "maintenance":
      case "suspended":
        return <Clock className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
};

// Resource usage component
const ResourceUsage = ({
  used,
  total,
  label,
  unit,
}: {
  used: number;
  total: number;
  label: string;
  unit: string;
}) => {
  const percentage = (used / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {used}
          {unit} / {total}
          {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="text-xs text-muted-foreground text-right">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

// VPS Parent Card
const VPSParentCard = ({
  parent,
  onEdit,
  onDelete,
}: {
  parent: VPSParent;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const metricsData = generateMetricsData();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{parent.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {parent.region}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={parent.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExpanded(!expanded)}>
                  <Eye className="w-4 h-4 mr-2" />
                  {expanded ? "Collapse" : "Expand"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResourceUsage
            used={parent.usedCpu}
            total={parent.cpu}
            label="CPU"
            unit=" cores"
          />
          <ResourceUsage
            used={parent.usedRam}
            total={parent.ram}
            label="RAM"
            unit=" GB"
          />
          <ResourceUsage
            used={parent.usedStorage}
            total={parent.storage}
            label="Storage"
            unit=" GB"
          />
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Separator />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Resource Usage (24h)
                  </h4>
                  <ChartContainer config={chartConfig} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={metricsData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="cpu"
                          stackId="1"
                          stroke="var(--color-cpu)"
                          fill="var(--color-cpu)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="ram"
                          stackId="1"
                          stroke="var(--color-ram)"
                          fill="var(--color-ram)"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP Address:</span>
                      <span className="font-mono">{parent.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{parent.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shared VPS:</span>
                      <span>{parent.sharedVPS.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Dedicated VPS:
                      </span>
                      <span>{parent.dedicatedVPS.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {parent.sharedVPS.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Shared VPS Instances
                  </h4>
                  <div className="grid gap-3">
                    {parent.sharedVPS.map((vps) => (
                      <div
                        key={vps.id}
                        className="p-3 border rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{vps.name}</span>
                            <StatusBadge status={vps.status} />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {vps.customer}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">CPU: </span>
                            <span>
                              {vps.usedCpu}/{vps.cpu} cores
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">RAM: </span>
                            <span>
                              {vps.usedRam}/{vps.ram} GB
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Storage:{" "}
                            </span>
                            <span>
                              {vps.usedStorage}/{vps.storage} GB
                            </span>
                          </div>
                        </div>
                        {vps.domain && (
                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground">
                              Domain:{" "}
                            </span>
                            <span className="font-mono">{vps.domain}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// Dedicated VPS Card
const DedicatedVPSCard = ({
  vps,
  onEdit,
  onDelete,
}: {
  vps: DedicatedVPS;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const metricsData = generateMetricsData();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">{vps.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {vps.region}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={vps.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExpanded(!expanded)}>
                  <Eye className="w-4 h-4 mr-2" />
                  {expanded ? "Collapse" : "Expand"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResourceUsage
            used={vps.usedCpu}
            total={vps.cpu}
            label="CPU"
            unit=" cores"
          />
          <ResourceUsage
            used={vps.usedRam}
            total={vps.ram}
            label="RAM"
            unit=" GB"
          />
          <ResourceUsage
            used={vps.usedStorage}
            total={vps.storage}
            label="Storage"
            unit=" GB"
          />
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Separator />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Resource Usage (24h)
                  </h4>
                  <ChartContainer config={chartConfig} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metricsData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="cpu"
                          stroke="var(--color-cpu)"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="ram"
                          stroke="var(--color-ram)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span>{vps.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP Address:</span>
                      <span className="font-mono">{vps.ipAddress}</span>
                    </div>
                    {vps.domain && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Domain:</span>
                        <span className="font-mono">{vps.domain}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{vps.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// Add VPS Parent Dialog
const AddVPSParentDialog = ({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (
    parent: Omit<
      VPSParent,
      | "id"
      | "usedCpu"
      | "usedRam"
      | "usedStorage"
      | "sharedVPS"
      | "dedicatedVPS"
    >
  ) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    cpu: "",
    ram: "",
    storage: "",
    ipAddress: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      region: formData.region,
      cpu: parseInt(formData.cpu),
      ram: parseInt(formData.ram),
      storage: parseInt(formData.storage),
      status: "online",
      ipAddress: formData.ipAddress,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setFormData({
      name: "",
      region: "",
      cpu: "",
      ram: "",
      storage: "",
      ipAddress: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New VPS Parent</DialogTitle>
          <DialogDescription>
            Create a new VPS parent server that can host multiple shared VPS
            instances.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Server Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., US-East-1-Parent"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select
              value={formData.region}
              onValueChange={(value) =>
                setFormData({ ...formData, region: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu">CPU Cores</Label>
              <Input
                id="cpu"
                type="number"
                value={formData.cpu}
                onChange={(e) =>
                  setFormData({ ...formData, cpu: e.target.value })
                }
                placeholder="32"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ram">RAM (GB)</Label>
              <Input
                id="ram"
                type="number"
                value={formData.ram}
                onChange={(e) =>
                  setFormData({ ...formData, ram: e.target.value })
                }
                placeholder="128"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage">Storage (GB)</Label>
              <Input
                id="storage"
                type="number"
                value={formData.storage}
                onChange={(e) =>
                  setFormData({ ...formData, storage: e.target.value })
                }
                placeholder="2000"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipAddress">IP Address</Label>
            <Input
              id="ipAddress"
              value={formData.ipAddress}
              onChange={(e) =>
                setFormData({ ...formData, ipAddress: e.target.value })
              }
              placeholder="192.168.1.100"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create VPS Parent</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Add Dedicated VPS Dialog
const AddDedicatedVPSDialog = ({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (
    vps: Omit<DedicatedVPS, "id" | "usedCpu" | "usedRam" | "usedStorage">
  ) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    cpu: "",
    ram: "",
    storage: "",
    customer: "",
    domain: "",
    ipAddress: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      region: formData.region,
      cpu: parseInt(formData.cpu),
      ram: parseInt(formData.ram),
      storage: parseInt(formData.storage),
      status: "running",
      customer: formData.customer,
      domain: formData.domain || undefined,
      ipAddress: formData.ipAddress,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setFormData({
      name: "",
      region: "",
      cpu: "",
      ram: "",
      storage: "",
      customer: "",
      domain: "",
      ipAddress: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Dedicated VPS</DialogTitle>
          <DialogDescription>
            Create a new dedicated VPS instance for a customer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">VPS Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Enterprise-Store-1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) =>
                setFormData({ ...formData, customer: e.target.value })
              }
              placeholder="Customer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select
              value={formData.region}
              onValueChange={(value) =>
                setFormData({ ...formData, region: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu">CPU Cores</Label>
              <Input
                id="cpu"
                type="number"
                value={formData.cpu}
                onChange={(e) =>
                  setFormData({ ...formData, cpu: e.target.value })
                }
                placeholder="16"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ram">RAM (GB)</Label>
              <Input
                id="ram"
                type="number"
                value={formData.ram}
                onChange={(e) =>
                  setFormData({ ...formData, ram: e.target.value })
                }
                placeholder="64"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage">Storage (GB)</Label>
              <Input
                id="storage"
                type="number"
                value={formData.storage}
                onChange={(e) =>
                  setFormData({ ...formData, storage: e.target.value })
                }
                placeholder="1000"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain (Optional)</Label>
            <Input
              id="domain"
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
              placeholder="example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipAddress">IP Address</Label>
            <Input
              id="ipAddress"
              value={formData.ipAddress}
              onChange={(e) =>
                setFormData({ ...formData, ipAddress: e.target.value })
              }
              placeholder="203.0.113.10"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Dedicated VPS</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Admin UI Component
const VPSAdminUI = () => {
  const [vpsParents, setVpsParents] = useState<VPSParent[]>(sampleVPSParents);
  const [dedicatedVPS, setDedicatedVPS] =
    useState<DedicatedVPS[]>(sampleDedicatedVPS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("parents");
  const [showAddParentDialog, setShowAddParentDialog] = useState(false);
  const [showAddDedicatedDialog, setShowAddDedicatedDialog] = useState(false);

  const handleAddVPSParent = (
    parentData: Omit<
      VPSParent,
      | "id"
      | "usedCpu"
      | "usedRam"
      | "usedStorage"
      | "sharedVPS"
      | "dedicatedVPS"
    >
  ) => {
    const newParent: VPSParent = {
      ...parentData,
      id: `parent-${Date.now()}`,
      usedCpu: 0,
      usedRam: 0,
      usedStorage: 0,
      sharedVPS: [],
      dedicatedVPS: [],
    };
    setVpsParents([...vpsParents, newParent]);
  };

  const handleAddDedicatedVPS = (
    vpsData: Omit<DedicatedVPS, "id" | "usedCpu" | "usedRam" | "usedStorage">
  ) => {
    const newVPS: DedicatedVPS = {
      ...vpsData,
      id: `dedicated-${Date.now()}`,
      usedCpu: 0,
      usedRam: 0,
      usedStorage: 0,
    };
    setDedicatedVPS([...dedicatedVPS, newVPS]);
  };

  const filteredParents = vpsParents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDedicated = dedicatedVPS.filter(
    (vps) =>
      vps.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vps.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vps.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    parents: vpsParents.length,
    dedicated: dedicatedVPS.length,
    shared: vpsParents.reduce(
      (acc, parent) => acc + parent.sharedVPS.length,
      0
    ),
    totalCpu:
      vpsParents.reduce((acc, parent) => acc + parent.cpu, 0) +
      dedicatedVPS.reduce((acc, vps) => acc + vps.cpu, 0),
    totalRam:
      vpsParents.reduce((acc, parent) => acc + parent.ram, 0) +
      dedicatedVPS.reduce((acc, vps) => acc + vps.ram, 0),
    totalStorage:
      vpsParents.reduce((acc, parent) => acc + parent.storage, 0) +
      dedicatedVPS.reduce((acc, vps) => acc + vps.storage, 0),
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              VPS Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor your VPS infrastructure for webstore
              deployments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">VPS Parents</p>
                  <p className="text-2xl font-bold">{totalStats.parents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Dedicated VPS</p>
                  <p className="text-2xl font-bold">{totalStats.dedicated}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Shared VPS</p>
                  <p className="text-2xl font-bold">{totalStats.shared}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total CPU</p>
                  <p className="text-2xl font-bold">{totalStats.totalCpu}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MemoryStick className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total RAM</p>
                  <p className="text-2xl font-bold">{totalStats.totalRam}GB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Storage</p>
                  <p className="text-2xl font-bold">
                    {totalStats.totalStorage}GB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search VPS instances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="parents" className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                VPS Parents
              </TabsTrigger>
              <TabsTrigger
                value="dedicated"
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Dedicated VPS
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Shared VPS
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              {activeTab === "parents" && (
                <Button onClick={() => setShowAddParentDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add VPS Parent
                </Button>
              )}
              {activeTab === "dedicated" && (
                <Button onClick={() => setShowAddDedicatedDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Dedicated VPS
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="parents" className="space-y-4">
            <div className="grid gap-4">
              {filteredParents.map((parent) => (
                <VPSParentCard
                  key={parent.id}
                  parent={parent}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dedicated" className="space-y-4">
            <div className="grid gap-4">
              {filteredDedicated.map((vps) => (
                <DedicatedVPSCard
                  key={vps.id}
                  vps={vps}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="space-y-4">
            <div className="grid gap-4">
              {vpsParents.map((parent) =>
                parent.sharedVPS.map((vps) => (
                  <Card key={vps.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <Monitor className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {vps.name}
                            </CardTitle>
                            <CardDescription>
                              Parent: {parent.name} • Customer: {vps.customer}
                            </CardDescription>
                          </div>
                        </div>
                        <StatusBadge status={vps.status} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ResourceUsage
                          used={vps.usedCpu}
                          total={vps.cpu}
                          label="CPU"
                          unit=" cores"
                        />
                        <ResourceUsage
                          used={vps.usedRam}
                          total={vps.ram}
                          label="RAM"
                          unit=" GB"
                        />
                        <ResourceUsage
                          used={vps.usedStorage}
                          total={vps.storage}
                          label="Storage"
                          unit=" GB"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <AddVPSParentDialog
          open={showAddParentDialog}
          onOpenChange={setShowAddParentDialog}
          onAdd={handleAddVPSParent}
        />

        <AddDedicatedVPSDialog
          open={showAddDedicatedDialog}
          onOpenChange={setShowAddDedicatedDialog}
          onAdd={handleAddDedicatedVPS}
        />
      </div>
    </div>
  );
};

export default VPSAdminUI;
