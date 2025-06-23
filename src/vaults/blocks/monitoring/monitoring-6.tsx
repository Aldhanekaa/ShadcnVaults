"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Server,
  Plus,
  Settings,
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Globe,
  Users,
  Power,
  PowerOff,
  Trash2,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
} from "lucide-react";

interface VPSParent {
  id: string;
  name: string;
  region: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "online" | "offline" | "maintenance";
  usedCpu: number;
  usedRam: number;
  usedStorage: number;
  sharedVpsCount: number;
  dedicatedVpsCount: number;
  createdAt: string;
}

interface SharedVPS {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "running" | "stopped" | "suspended";
  customerEmail: string;
  domain?: string;
  createdAt: string;
}

interface DedicatedVPS {
  id: string;
  name: string;
  region: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "running" | "stopped" | "suspended";
  customerEmail: string;
  domain?: string;
  createdAt: string;
}

const VPSAdminDashboard = () => {
  const [vpsParents, setVpsParents] = useState<VPSParent[]>([
    {
      id: "1",
      name: "US-East-Parent-01",
      region: "us-east-1",
      cpu: 32,
      ram: 128,
      storage: 2000,
      status: "online",
      usedCpu: 18,
      usedRam: 76,
      usedStorage: 1200,
      sharedVpsCount: 8,
      dedicatedVpsCount: 2,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "EU-West-Parent-01",
      region: "eu-west-1",
      cpu: 24,
      ram: 96,
      storage: 1500,
      status: "online",
      usedCpu: 12,
      usedRam: 48,
      usedStorage: 800,
      sharedVpsCount: 6,
      dedicatedVpsCount: 1,
      createdAt: "2024-01-20",
    },
  ]);

  const [sharedVps, setSharedVps] = useState<SharedVPS[]>([
    {
      id: "s1",
      name: "Shared-Store-01",
      parentId: "1",
      parentName: "US-East-Parent-01",
      cpu: 2,
      ram: 8,
      storage: 100,
      status: "running",
      customerEmail: "customer1@example.com",
      domain: "store1.example.com",
      createdAt: "2024-02-01",
    },
    {
      id: "s2",
      name: "Shared-Store-02",
      parentId: "1",
      parentName: "US-East-Parent-01",
      cpu: 1,
      ram: 4,
      storage: 50,
      status: "running",
      customerEmail: "customer2@example.com",
      domain: "store2.example.com",
      createdAt: "2024-02-03",
    },
  ]);

  const [dedicatedVps, setDedicatedVps] = useState<DedicatedVPS[]>([
    {
      id: "d1",
      name: "Dedicated-Enterprise-01",
      region: "us-east-1",
      cpu: 8,
      ram: 32,
      storage: 500,
      status: "running",
      customerEmail: "enterprise@example.com",
      domain: "enterprise.example.com",
      createdAt: "2024-01-25",
    },
  ]);

  const [activeTab, setActiveTab] = useState("overview");
  const [isCreateParentOpen, setIsCreateParentOpen] = useState(false);
  const [isCreateSharedOpen, setIsCreateSharedOpen] = useState(false);
  const [isCreateDedicatedOpen, setIsCreateDedicatedOpen] = useState(false);

  const [newParent, setNewParent] = useState({
    name: "",
    region: "",
    cpu: 0,
    ram: 0,
    storage: 0,
  });

  const [newShared, setNewShared] = useState({
    name: "",
    parentId: "",
    cpu: 0,
    ram: 0,
    storage: 0,
    customerEmail: "",
    domain: "",
  });

  const [newDedicated, setNewDedicated] = useState({
    name: "",
    region: "",
    cpu: 0,
    ram: 0,
    storage: 0,
    customerEmail: "",
    domain: "",
  });

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
        return <CheckCircle className="h-4 w-4" />;
      case "offline":
      case "stopped":
        return <PowerOff className="h-4 w-4" />;
      case "maintenance":
      case "suspended":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const createVPSParent = () => {
    const parent: VPSParent = {
      id: Date.now().toString(),
      ...newParent,
      status: "online",
      usedCpu: 0,
      usedRam: 0,
      usedStorage: 0,
      sharedVpsCount: 0,
      dedicatedVpsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setVpsParents([...vpsParents, parent]);
    setNewParent({ name: "", region: "", cpu: 0, ram: 0, storage: 0 });
    setIsCreateParentOpen(false);
  };

  const createSharedVPS = () => {
    const shared: SharedVPS = {
      id: Date.now().toString(),
      ...newShared,
      parentName:
        vpsParents.find((p) => p.id === newShared.parentId)?.name || "",
      status: "running",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSharedVps([...sharedVps, shared]);
    setNewShared({
      name: "",
      parentId: "",
      cpu: 0,
      ram: 0,
      storage: 0,
      customerEmail: "",
      domain: "",
    });
    setIsCreateSharedOpen(false);
  };

  const createDedicatedVPS = () => {
    const dedicated: DedicatedVPS = {
      id: Date.now().toString(),
      ...newDedicated,
      status: "running",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setDedicatedVps([...dedicatedVps, dedicated]);
    setNewDedicated({
      name: "",
      region: "",
      cpu: 0,
      ram: 0,
      storage: 0,
      customerEmail: "",
      domain: "",
    });
    setIsCreateDedicatedOpen(false);
  };

  const totalVpsParents = vpsParents.length;
  const totalSharedVps = sharedVps.length;
  const totalDedicatedVps = dedicatedVps.length;
  const totalActiveInstances =
    vpsParents.filter((p) => p.status === "online").length +
    sharedVps.filter((s) => s.status === "running").length +
    dedicatedVps.filter((d) => d.status === "running").length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              VPS Management Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor your VPS infrastructure
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600">
              <Activity className="h-3 w-3 mr-1" />
              {totalActiveInstances} Active
            </Badge>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VPS Parents</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVpsParents}</div>
              <p className="text-xs text-muted-foreground">Physical servers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shared VPS</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSharedVps}</div>
              <p className="text-xs text-muted-foreground">Shared instances</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dedicated VPS
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDedicatedVps}</div>
              <p className="text-xs text-muted-foreground">
                Dedicated instances
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Active
              </CardTitle>
              <Power className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActiveInstances}</div>
              <p className="text-xs text-muted-foreground">Running instances</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="parents">VPS Parents</TabsTrigger>
            <TabsTrigger value="shared">Shared VPS</TabsTrigger>
            <TabsTrigger value="dedicated">Dedicated VPS</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* VPS Parents Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    VPS Parents Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vpsParents.map((parent) => (
                    <div
                      key={parent.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(
                            parent.status
                          )}`}
                        />
                        <div>
                          <p className="font-medium">{parent.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {parent.region}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {parent.sharedVpsCount + parent.dedicatedVpsCount}{" "}
                          instances
                        </p>
                        <p className="text-xs text-muted-foreground">
                          CPU: {Math.round((parent.usedCpu / parent.cpu) * 100)}
                          %
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">
                          New shared VPS created
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Power className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">
                          VPS Parent restarted
                        </p>
                        <p className="text-xs text-muted-foreground">
                          15 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Users className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">
                          Customer deployed webstore
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="parents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">VPS Parents</h2>
              <Dialog
                open={isCreateParentOpen}
                onOpenChange={setIsCreateParentOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add VPS Parent
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New VPS Parent</DialogTitle>
                    <DialogDescription>
                      Add a new physical server to host VPS instances
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="parent-name">Server Name</Label>
                      <Input
                        id="parent-name"
                        value={newParent.name}
                        onChange={(e) =>
                          setNewParent({ ...newParent, name: e.target.value })
                        }
                        placeholder="US-East-Parent-02"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parent-region">Region</Label>
                      <Select
                        value={newParent.region}
                        onValueChange={(value) =>
                          setNewParent({ ...newParent, region: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-east-1">US East 1</SelectItem>
                          <SelectItem value="us-west-1">US West 1</SelectItem>
                          <SelectItem value="eu-west-1">EU West 1</SelectItem>
                          <SelectItem value="ap-southeast-1">
                            Asia Pacific Southeast 1
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="parent-cpu">CPU Cores</Label>
                        <Input
                          id="parent-cpu"
                          type="number"
                          value={newParent.cpu}
                          onChange={(e) =>
                            setNewParent({
                              ...newParent,
                              cpu: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="32"
                        />
                      </div>
                      <div>
                        <Label htmlFor="parent-ram">RAM (GB)</Label>
                        <Input
                          id="parent-ram"
                          type="number"
                          value={newParent.ram}
                          onChange={(e) =>
                            setNewParent({
                              ...newParent,
                              ram: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="128"
                        />
                      </div>
                      <div>
                        <Label htmlFor="parent-storage">Storage (GB)</Label>
                        <Input
                          id="parent-storage"
                          type="number"
                          value={newParent.storage}
                          onChange={(e) =>
                            setNewParent({
                              ...newParent,
                              storage: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="2000"
                        />
                      </div>
                    </div>
                    <Button onClick={createVPSParent} className="w-full">
                      Create VPS Parent
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vpsParents.map((parent) => (
                <Card key={parent.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        {getStatusIcon(parent.status)}
                        <span className="ml-2">{parent.name}</span>
                      </CardTitle>
                      <Badge
                        variant={
                          parent.status === "online" ? "default" : "secondary"
                        }
                      >
                        {parent.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      <Globe className="h-4 w-4 inline mr-1" />
                      {parent.region}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <Cpu className="h-4 w-4 mx-auto text-muted-foreground" />
                        <p className="text-sm font-medium">
                          {parent.cpu} Cores
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {parent.usedCpu} used
                        </p>
                      </div>
                      <div className="space-y-1">
                        <MemoryStick className="h-4 w-4 mx-auto text-muted-foreground" />
                        <p className="text-sm font-medium">{parent.ram} GB</p>
                        <p className="text-xs text-muted-foreground">
                          {parent.usedRam} GB used
                        </p>
                      </div>
                      <div className="space-y-1">
                        <HardDrive className="h-4 w-4 mx-auto text-muted-foreground" />
                        <p className="text-sm font-medium">
                          {parent.storage} GB
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {parent.usedStorage} GB used
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU Usage</span>
                          <span>
                            {Math.round((parent.usedCpu / parent.cpu) * 100)}%
                          </span>
                        </div>
                        <Progress value={(parent.usedCpu / parent.cpu) * 100} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>RAM Usage</span>
                          <span>
                            {Math.round((parent.usedRam / parent.ram) * 100)}%
                          </span>
                        </div>
                        <Progress value={(parent.usedRam / parent.ram) * 100} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Usage</span>
                          <span>
                            {Math.round(
                              (parent.usedStorage / parent.storage) * 100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(parent.usedStorage / parent.storage) * 100}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <p>
                          <strong>{parent.sharedVpsCount}</strong> Shared VPS
                        </p>
                        <p>
                          <strong>{parent.dedicatedVpsCount}</strong> Dedicated
                          VPS
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Shared VPS Instances</h2>
              <Dialog
                open={isCreateSharedOpen}
                onOpenChange={setIsCreateSharedOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Shared VPS
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Shared VPS</DialogTitle>
                    <DialogDescription>
                      Create a shared VPS instance under a parent server
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="shared-name">Instance Name</Label>
                      <Input
                        id="shared-name"
                        value={newShared.name}
                        onChange={(e) =>
                          setNewShared({ ...newShared, name: e.target.value })
                        }
                        placeholder="Shared-Store-03"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shared-parent">Parent Server</Label>
                      <Select
                        value={newShared.parentId}
                        onValueChange={(value) =>
                          setNewShared({ ...newShared, parentId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent server" />
                        </SelectTrigger>
                        <SelectContent>
                          {vpsParents.map((parent) => (
                            <SelectItem key={parent.id} value={parent.id}>
                              {parent.name} ({parent.region})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="shared-cpu">CPU Cores</Label>
                        <Input
                          id="shared-cpu"
                          type="number"
                          value={newShared.cpu}
                          onChange={(e) =>
                            setNewShared({
                              ...newShared,
                              cpu: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shared-ram">RAM (GB)</Label>
                        <Input
                          id="shared-ram"
                          type="number"
                          value={newShared.ram}
                          onChange={(e) =>
                            setNewShared({
                              ...newShared,
                              ram: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="8"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shared-storage">Storage (GB)</Label>
                        <Input
                          id="shared-storage"
                          type="number"
                          value={newShared.storage}
                          onChange={(e) =>
                            setNewShared({
                              ...newShared,
                              storage: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="100"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="shared-customer">Customer Email</Label>
                      <Input
                        id="shared-customer"
                        type="email"
                        value={newShared.customerEmail}
                        onChange={(e) =>
                          setNewShared({
                            ...newShared,
                            customerEmail: e.target.value,
                          })
                        }
                        placeholder="customer@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shared-domain">Domain (Optional)</Label>
                      <Input
                        id="shared-domain"
                        value={newShared.domain}
                        onChange={(e) =>
                          setNewShared({ ...newShared, domain: e.target.value })
                        }
                        placeholder="store.example.com"
                      />
                    </div>
                    <Button onClick={createSharedVPS} className="w-full">
                      Create Shared VPS
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Parent Server</TableHead>
                      <TableHead>Resources</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sharedVps.map((vps) => (
                      <TableRow key={vps.id}>
                        <TableCell className="font-medium">
                          {vps.name}
                        </TableCell>
                        <TableCell>{vps.parentName}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {vps.cpu} CPU • {vps.ram} GB RAM
                            </div>
                            <div className="text-muted-foreground">
                              {vps.storage} GB Storage
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{vps.customerEmail}</TableCell>
                        <TableCell>{vps.domain || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              vps.status === "running" ? "default" : "secondary"
                            }
                          >
                            {vps.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Power className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dedicated" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dedicated VPS Instances</h2>
              <Dialog
                open={isCreateDedicatedOpen}
                onOpenChange={setIsCreateDedicatedOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Dedicated VPS
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Dedicated VPS</DialogTitle>
                    <DialogDescription>
                      Create a standalone dedicated VPS instance
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dedicated-name">Instance Name</Label>
                      <Input
                        id="dedicated-name"
                        value={newDedicated.name}
                        onChange={(e) =>
                          setNewDedicated({
                            ...newDedicated,
                            name: e.target.value,
                          })
                        }
                        placeholder="Dedicated-Enterprise-02"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dedicated-region">Region</Label>
                      <Select
                        value={newDedicated.region}
                        onValueChange={(value) =>
                          setNewDedicated({ ...newDedicated, region: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-east-1">US East 1</SelectItem>
                          <SelectItem value="us-west-1">US West 1</SelectItem>
                          <SelectItem value="eu-west-1">EU West 1</SelectItem>
                          <SelectItem value="ap-southeast-1">
                            Asia Pacific Southeast 1
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dedicated-cpu">CPU Cores</Label>
                        <Input
                          id="dedicated-cpu"
                          type="number"
                          value={newDedicated.cpu}
                          onChange={(e) =>
                            setNewDedicated({
                              ...newDedicated,
                              cpu: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="8"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dedicated-ram">RAM (GB)</Label>
                        <Input
                          id="dedicated-ram"
                          type="number"
                          value={newDedicated.ram}
                          onChange={(e) =>
                            setNewDedicated({
                              ...newDedicated,
                              ram: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="32"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dedicated-storage">Storage (GB)</Label>
                        <Input
                          id="dedicated-storage"
                          type="number"
                          value={newDedicated.storage}
                          onChange={(e) =>
                            setNewDedicated({
                              ...newDedicated,
                              storage: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dedicated-customer">Customer Email</Label>
                      <Input
                        id="dedicated-customer"
                        type="email"
                        value={newDedicated.customerEmail}
                        onChange={(e) =>
                          setNewDedicated({
                            ...newDedicated,
                            customerEmail: e.target.value,
                          })
                        }
                        placeholder="customer@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dedicated-domain">
                        Domain (Optional)
                      </Label>
                      <Input
                        id="dedicated-domain"
                        value={newDedicated.domain}
                        onChange={(e) =>
                          setNewDedicated({
                            ...newDedicated,
                            domain: e.target.value,
                          })
                        }
                        placeholder="enterprise.example.com"
                      />
                    </div>
                    <Button onClick={createDedicatedVPS} className="w-full">
                      Create Dedicated VPS
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Resources</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dedicatedVps.map((vps) => (
                      <TableRow key={vps.id}>
                        <TableCell className="font-medium">
                          {vps.name}
                        </TableCell>
                        <TableCell>{vps.region}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {vps.cpu} CPU • {vps.ram} GB RAM
                            </div>
                            <div className="text-muted-foreground">
                              {vps.storage} GB Storage
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{vps.customerEmail}</TableCell>
                        <TableCell>{vps.domain || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              vps.status === "running" ? "default" : "secondary"
                            }
                          >
                            {vps.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Power className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VPSAdminDashboard;
