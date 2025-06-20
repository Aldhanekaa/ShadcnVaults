"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Plus,
  Settings,
  Activity,
  Users,
  HardDrive,
  Cpu,
  MemoryStick,
  MapPin,
  Play,
  Square,
  Trash2,
  Edit,
  MoreHorizontal,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Database,
  Network,
  Monitor,
  Zap,
  Eye,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
  sharedVPS: SharedVPS[];
  dedicatedVPS: DedicatedVPS[];
  usage: {
    cpu: number;
    ram: number;
    storage: number;
  };
}

interface SharedVPS {
  id: string;
  name: string;
  parentId: string;
  customer: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "running" | "stopped" | "suspended";
  domain?: string;
  createdAt: string;
  usage: {
    cpu: number;
    ram: number;
    storage: number;
  };
}

interface DedicatedVPS {
  id: string;
  name: string;
  customer: string;
  region: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "running" | "stopped" | "suspended";
  ipAddress: string;
  domain?: string;
  createdAt: string;
  usage: {
    cpu: number;
    ram: number;
    storage: number;
  };
}

const mockVPSParents: VPSParent[] = [
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
    sharedVPS: [],
    dedicatedVPS: [],
    usage: { cpu: 65, ram: 78, storage: 45 },
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
    sharedVPS: [],
    dedicatedVPS: [],
    usage: { cpu: 45, ram: 60, storage: 30 },
  },
];

const mockSharedVPS: SharedVPS[] = [
  {
    id: "shared-1",
    name: "WebStore-Alpha",
    parentId: "parent-1",
    customer: "John Doe",
    cpu: 2,
    ram: 4,
    storage: 50,
    status: "running",
    domain: "alpha-store.com",
    createdAt: "2024-02-01",
    usage: { cpu: 35, ram: 60, storage: 25 },
  },
  {
    id: "shared-2",
    name: "WebStore-Beta",
    parentId: "parent-1",
    customer: "Jane Smith",
    cpu: 1,
    ram: 2,
    storage: 25,
    status: "running",
    domain: "beta-store.com",
    createdAt: "2024-02-05",
    usage: { cpu: 20, ram: 40, storage: 15 },
  },
];

const mockDedicatedVPS: DedicatedVPS[] = [
  {
    id: "dedicated-1",
    name: "Enterprise-Store-1",
    customer: "Acme Corp",
    region: "US East (Virginia)",
    cpu: 8,
    ram: 32,
    storage: 500,
    status: "running",
    ipAddress: "203.0.113.10",
    domain: "acme-store.com",
    createdAt: "2024-01-25",
    usage: { cpu: 55, ram: 70, storage: 40 },
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

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    online: "bg-green-500/10 text-green-500 border-green-500/20",
    running: "bg-green-500/10 text-green-500 border-green-500/20",
    offline: "bg-red-500/10 text-red-500 border-red-500/20",
    stopped: "bg-red-500/10 text-red-500 border-red-500/20",
    maintenance: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    suspended: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };

  return (
    <Badge className={cn("border", variants[status as keyof typeof variants])}>
      {status}
    </Badge>
  );
};

const UsageIndicator = ({
  label,
  value,
  max,
  unit,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}
          {unit} / {max}
          {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

const VPSParentCard = ({
  parent,
  onEdit,
  onDelete,
  onViewShared,
  sharedCount,
}: {
  parent: VPSParent;
  onEdit: (parent: VPSParent) => void;
  onDelete: (id: string) => void;
  onViewShared: (parentId: string) => void;
  sharedCount: number;
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Server className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">{parent.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {parent.region}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={parent.status} />
            <Button variant="ghost" size="sm" onClick={() => onEdit(parent)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(parent.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold">{parent.cpu}</div>
            <div className="text-muted-foreground">CPU Cores</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{parent.ram}GB</div>
            <div className="text-muted-foreground">RAM</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{parent.storage}GB</div>
            <div className="text-muted-foreground">Storage</div>
          </div>
        </div>

        <div className="space-y-3">
          <UsageIndicator
            label="CPU"
            value={parent.usage.cpu}
            max={100}
            unit="%"
          />
          <UsageIndicator
            label="RAM"
            value={parent.usage.ram}
            max={100}
            unit="%"
          />
          <UsageIndicator
            label="Storage"
            value={parent.usage.storage}
            max={100}
            unit="%"
          />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>IP: {parent.ipAddress}</span>
          <span>Created: {parent.createdAt}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onViewShared(parent.id)}
        >
          <Users className="h-4 w-4 mr-2" />
          View Shared VPS ({sharedCount})
        </Button>
      </CardFooter>
    </Card>
  );
};

const SharedVPSCard = ({
  vps,
  onEdit,
  onDelete,
  onStart,
  onStop,
}: {
  vps: SharedVPS;
  onEdit: (vps: SharedVPS) => void;
  onDelete: (id: string) => void;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Globe className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">{vps.name}</CardTitle>
              <CardDescription>{vps.customer}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={vps.status} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                vps.status === "running" ? onStop(vps.id) : onStart(vps.id)
              }
            >
              {vps.status === "running" ? (
                <Square className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(vps)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(vps.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold">{vps.cpu}</div>
            <div className="text-muted-foreground">CPU Cores</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{vps.ram}GB</div>
            <div className="text-muted-foreground">RAM</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{vps.storage}GB</div>
            <div className="text-muted-foreground">Storage</div>
          </div>
        </div>

        <div className="space-y-3">
          <UsageIndicator
            label="CPU"
            value={vps.usage.cpu}
            max={100}
            unit="%"
          />
          <UsageIndicator
            label="RAM"
            value={vps.usage.ram}
            max={100}
            unit="%"
          />
          <UsageIndicator
            label="Storage"
            value={vps.usage.storage}
            max={100}
            unit="%"
          />
        </div>

        {vps.domain && (
          <div className="text-sm text-muted-foreground">
            Domain: {vps.domain}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DedicatedVPSCard = ({
  vps,
  onEdit,
  onDelete,
  onStart,
  onStop,
}: {
  vps: DedicatedVPS;
  onEdit: (vps: DedicatedVPS) => void;
  onDelete: (id: string) => void;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Shield className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">{vps.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {vps.region}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={vps.status} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                vps.status === "running" ? onStop(vps.id) : onStart(vps.id)
              }
            >
              {vps.status === "running" ? (
                <Square className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(vps)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(vps.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold">{vps.cpu}</div>
            <div className="text-muted-foreground">CPU Cores</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{vps.ram}GB</div>
            <div className="text-muted-foreground">RAM</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{vps.storage}GB</div>
            <div className="text-muted-foreground">Storage</div>
          </div>
        </div>

        <div className="space-y-3">
          <UsageIndicator
            label="CPU"
            value={vps.usage.cpu}
            max={100}
            unit="%"
          />
          <UsageIndicator
            label="RAM"
            value={vps.usage.ram}
            max={100}
            unit="%"
          />
          <UsageIndicator
            label="Storage"
            value={vps.usage.storage}
            max={100}
            unit="%"
          />
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <div>Customer: {vps.customer}</div>
          <div>IP: {vps.ipAddress}</div>
          {vps.domain && <div>Domain: {vps.domain}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

const CreateVPSParentDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: Omit<VPSParent, "id" | "sharedVPS" | "dedicatedVPS" | "usage">
  ) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    cpu: 8,
    ram: 32,
    storage: 500,
    ipAddress: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: "online" as const,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setFormData({
      name: "",
      region: "",
      cpu: 8,
      ram: 32,
      storage: 500,
      ipAddress: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create VPS Parent</DialogTitle>
          <DialogDescription>
            Create a new VPS parent server that can host multiple shared VPS
            instances.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., US-East-1-Parent"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Region</label>
            <select
              value={formData.region}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, region: e.target.value }))
              }
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">CPU Cores</label>
              <Input
                type="number"
                value={formData.cpu}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cpu: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">RAM (GB)</label>
              <Input
                type="number"
                value={formData.ram}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ram: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Storage (GB)</label>
              <Input
                type="number"
                value={formData.storage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storage: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">IP Address</label>
            <Input
              value={formData.ipAddress}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ipAddress: e.target.value }))
              }
              placeholder="e.g., 192.168.1.100"
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

const CreateSharedVPSDialog = ({
  open,
  onOpenChange,
  onSubmit,
  vpsParents,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<SharedVPS, "id" | "usage">) => void;
  vpsParents: VPSParent[];
}) => {
  const [formData, setFormData] = useState({
    name: "",
    parentId: "",
    customer: "",
    cpu: 2,
    ram: 4,
    storage: 50,
    domain: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: "running" as const,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setFormData({
      name: "",
      parentId: "",
      customer: "",
      cpu: 2,
      ram: 4,
      storage: 50,
      domain: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Shared VPS</DialogTitle>
          <DialogDescription>
            Create a new shared VPS instance under a VPS parent server.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., WebStore-Alpha"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">VPS Parent</label>
            <select
              value={formData.parentId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, parentId: e.target.value }))
              }
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select VPS Parent</option>
              {vpsParents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Customer</label>
            <Input
              value={formData.customer}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, customer: e.target.value }))
              }
              placeholder="Customer name"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">CPU Cores</label>
              <Input
                type="number"
                value={formData.cpu}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cpu: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">RAM (GB)</label>
              <Input
                type="number"
                value={formData.ram}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ram: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Storage (GB)</label>
              <Input
                type="number"
                value={formData.storage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storage: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Domain (Optional)</label>
            <Input
              value={formData.domain}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, domain: e.target.value }))
              }
              placeholder="e.g., example.com"
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
            <Button type="submit">Create Shared VPS</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CreateDedicatedVPSDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<DedicatedVPS, "id" | "usage">) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    customer: "",
    region: "",
    cpu: 8,
    ram: 32,
    storage: 500,
    ipAddress: "",
    domain: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: "running" as const,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setFormData({
      name: "",
      customer: "",
      region: "",
      cpu: 8,
      ram: 32,
      storage: 500,
      ipAddress: "",
      domain: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Dedicated VPS</DialogTitle>
          <DialogDescription>
            Create a new dedicated VPS instance with full server resources.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Enterprise-Store-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Customer</label>
            <Input
              value={formData.customer}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, customer: e.target.value }))
              }
              placeholder="Customer name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Region</label>
            <select
              value={formData.region}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, region: e.target.value }))
              }
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">CPU Cores</label>
              <Input
                type="number"
                value={formData.cpu}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cpu: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">RAM (GB)</label>
              <Input
                type="number"
                value={formData.ram}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ram: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Storage (GB)</label>
              <Input
                type="number"
                value={formData.storage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storage: parseInt(e.target.value),
                  }))
                }
                min="1"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">IP Address</label>
            <Input
              value={formData.ipAddress}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ipAddress: e.target.value }))
              }
              placeholder="e.g., 203.0.113.10"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Domain (Optional)</label>
            <Input
              value={formData.domain}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, domain: e.target.value }))
              }
              placeholder="e.g., example.com"
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

const VPSAdminDashboard = () => {
  const [vpsParents, setVpsParents] = useState<VPSParent[]>(mockVPSParents);
  const [sharedVPS, setSharedVPS] = useState<SharedVPS[]>(mockSharedVPS);
  const [dedicatedVPS, setDedicatedVPS] =
    useState<DedicatedVPS[]>(mockDedicatedVPS);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  const [createParentOpen, setCreateParentOpen] = useState(false);
  const [createSharedOpen, setCreateSharedOpen] = useState(false);
  const [createDedicatedOpen, setCreateDedicatedOpen] = useState(false);

  const handleCreateVPSParent = (
    data: Omit<VPSParent, "id" | "sharedVPS" | "dedicatedVPS" | "usage">
  ) => {
    const newParent: VPSParent = {
      ...data,
      id: `parent-${Date.now()}`,
      sharedVPS: [],
      dedicatedVPS: [],
      usage: {
        cpu: Math.floor(Math.random() * 50),
        ram: Math.floor(Math.random() * 50),
        storage: Math.floor(Math.random() * 50),
      },
    };
    setVpsParents((prev) => [...prev, newParent]);
  };

  const handleCreateSharedVPS = (data: Omit<SharedVPS, "id" | "usage">) => {
    const newSharedVPS: SharedVPS = {
      ...data,
      id: `shared-${Date.now()}`,
      usage: {
        cpu: Math.floor(Math.random() * 50),
        ram: Math.floor(Math.random() * 50),
        storage: Math.floor(Math.random() * 50),
      },
    };
    setSharedVPS((prev) => [...prev, newSharedVPS]);
  };

  const handleCreateDedicatedVPS = (
    data: Omit<DedicatedVPS, "id" | "usage">
  ) => {
    const newDedicatedVPS: DedicatedVPS = {
      ...data,
      id: `dedicated-${Date.now()}`,
      usage: {
        cpu: Math.floor(Math.random() * 50),
        ram: Math.floor(Math.random() * 50),
        storage: Math.floor(Math.random() * 50),
      },
    };
    setDedicatedVPS((prev) => [...prev, newDedicatedVPS]);
  };

  const handleDeleteVPSParent = (id: string) => {
    setVpsParents((prev) => prev.filter((p) => p.id !== id));
    setSharedVPS((prev) => prev.filter((s) => s.parentId !== id));
  };

  const handleDeleteSharedVPS = (id: string) => {
    setSharedVPS((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDeleteDedicatedVPS = (id: string) => {
    setDedicatedVPS((prev) => prev.filter((d) => d.id !== id));
  };

  const handleStartVPS = (id: string, type: "shared" | "dedicated") => {
    if (type === "shared") {
      setSharedVPS((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "running" } : s))
      );
    } else {
      setDedicatedVPS((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "running" } : d))
      );
    }
  };

  const handleStopVPS = (id: string, type: "shared" | "dedicated") => {
    if (type === "shared") {
      setSharedVPS((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "stopped" } : s))
      );
    } else {
      setDedicatedVPS((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "stopped" } : d))
      );
    }
  };

  const getSharedVPSForParent = (parentId: string) => {
    return sharedVPS.filter((s) => s.parentId === parentId);
  };

  const filteredVPSParents = vpsParents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSharedVPS = selectedParentId
    ? getSharedVPSForParent(selectedParentId)
    : sharedVPS.filter(
        (vps) =>
          vps.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vps.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const filteredDedicatedVPS = dedicatedVPS.filter(
    (vps) =>
      vps.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vps.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vps.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    vpsParents: vpsParents.length,
    sharedVPS: sharedVPS.length,
    dedicatedVPS: dedicatedVPS.length,
    totalCustomers: new Set([
      ...sharedVPS.map((s) => s.customer),
      ...dedicatedVPS.map((d) => d.customer),
    ]).size,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">VPS Management Dashboard</h1>
              <p className="text-muted-foreground">
                Manage and monitor your VPS infrastructure
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vps-parents">VPS Parents</TabsTrigger>
            <TabsTrigger value="shared-vps">Shared VPS</TabsTrigger>
            <TabsTrigger value="dedicated-vps">Dedicated VPS</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    VPS Parents
                  </CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.vpsParents}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Physical servers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Shared VPS
                  </CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.sharedVPS}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shared instances
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dedicated VPS
                  </CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.dedicatedVPS}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dedicated instances
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.totalCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active customers
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          WebStore-Alpha started
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Plus className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New VPS Parent created
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          High CPU usage detected
                        </p>
                        <p className="text-xs text-muted-foreground">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall CPU Usage</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Network I/O</span>
                        <span>32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vps-parents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search VPS Parents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button onClick={() => setCreateParentOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add VPS Parent
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVPSParents.map((parent) => (
                <VPSParentCard
                  key={parent.id}
                  parent={parent}
                  onEdit={() => {}}
                  onDelete={handleDeleteVPSParent}
                  onViewShared={(parentId) => {
                    setSelectedParentId(parentId);
                    setActiveTab("shared-vps");
                  }}
                  sharedCount={getSharedVPSForParent(parent.id).length}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared-vps" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search Shared VPS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                {selectedParentId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedParentId(null)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filter
                  </Button>
                )}
              </div>
              <Button onClick={() => setCreateSharedOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Shared VPS
              </Button>
            </div>

            {selectedParentId && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Showing Shared VPS for:{" "}
                  <strong>
                    {vpsParents.find((p) => p.id === selectedParentId)?.name}
                  </strong>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSharedVPS.map((vps) => (
                <SharedVPSCard
                  key={vps.id}
                  vps={vps}
                  onEdit={() => {}}
                  onDelete={handleDeleteSharedVPS}
                  onStart={(id) => handleStartVPS(id, "shared")}
                  onStop={(id) => handleStopVPS(id, "shared")}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dedicated-vps" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search Dedicated VPS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button onClick={() => setCreateDedicatedOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Dedicated VPS
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDedicatedVPS.map((vps) => (
                <DedicatedVPSCard
                  key={vps.id}
                  vps={vps}
                  onEdit={() => {}}
                  onDelete={handleDeleteDedicatedVPS}
                  onStart={(id) => handleStartVPS(id, "dedicated")}
                  onStop={(id) => handleStopVPS(id, "dedicated")}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateVPSParentDialog
        open={createParentOpen}
        onOpenChange={setCreateParentOpen}
        onSubmit={handleCreateVPSParent}
      />

      <CreateSharedVPSDialog
        open={createSharedOpen}
        onOpenChange={setCreateSharedOpen}
        onSubmit={handleCreateSharedVPS}
        vpsParents={vpsParents}
      />

      <CreateDedicatedVPSDialog
        open={createDedicatedOpen}
        onOpenChange={setCreateDedicatedOpen}
        onSubmit={handleCreateDedicatedVPS}
      />
    </div>
  );
};

export default VPSAdminDashboard;
