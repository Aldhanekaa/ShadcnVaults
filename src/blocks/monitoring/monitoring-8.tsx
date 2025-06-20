"use client";

import React, { useState, useEffect } from "react";
import {
  Server,
  Plus,
  Settings,
  Monitor,
  Database,
  Globe,
  Cpu,
  HardDrive,
  MemoryStick,
  Activity,
  Users,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Play,
  Square,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Zap,
  Shield,
  Menu,
  X,
  ChevronLeft,
  Home,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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
  totalSharedInstances: number;
  usedResources: {
    cpu: number;
    ram: number;
    storage: number;
  };
}

interface SharedVPS {
  id: string;
  name: string;
  parentId: string;
  customerId: string;
  customerName: string;
  allocatedCpu: number;
  allocatedRam: number;
  allocatedStorage: number;
  status: "running" | "stopped" | "suspended";
  domain?: string;
  createdAt: string;
}

interface DedicatedVPS {
  id: string;
  name: string;
  parentId: string;
  customerId: string;
  customerName: string;
  cpu: number;
  ram: number;
  storage: number;
  status: "running" | "stopped" | "suspended";
  ipAddress: string;
  domain?: string;
  createdAt: string;
}

const VPSAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set()
  );

  // Sample data
  const [vpsParents, setVpsParents] = useState<VPSParent[]>([
    {
      id: "parent-1",
      name: "US-East-Primary",
      region: "us-east-1",
      cpu: 32,
      ram: 128,
      storage: 2000,
      status: "online",
      ipAddress: "192.168.1.100",
      createdAt: "2024-01-15",
      totalSharedInstances: 8,
      usedResources: { cpu: 24, ram: 96, storage: 1200 },
      sharedVPS: [
        {
          id: "shared-1",
          name: "Store-Alpha",
          parentId: "parent-1",
          customerId: "cust-1",
          customerName: "John Doe",
          allocatedCpu: 4,
          allocatedRam: 8,
          allocatedStorage: 100,
          status: "running",
          domain: "store-alpha.com",
          createdAt: "2024-01-20",
        },
        {
          id: "shared-2",
          name: "Store-Beta",
          parentId: "parent-1",
          customerId: "cust-2",
          customerName: "Jane Smith",
          allocatedCpu: 2,
          allocatedRam: 4,
          allocatedStorage: 50,
          status: "running",
          domain: "store-beta.com",
          createdAt: "2024-01-22",
        },
      ],
      dedicatedVPS: [
        {
          id: "dedicated-1",
          name: "Enterprise-Store",
          parentId: "parent-1",
          customerId: "cust-3",
          customerName: "Acme Corp",
          cpu: 16,
          ram: 64,
          storage: 500,
          status: "running",
          ipAddress: "192.168.1.101",
          domain: "enterprise-store.com",
          createdAt: "2024-01-18",
        },
      ],
    },
    {
      id: "parent-2",
      name: "EU-West-Primary",
      region: "eu-west-1",
      cpu: 24,
      ram: 96,
      storage: 1500,
      status: "online",
      ipAddress: "192.168.2.100",
      createdAt: "2024-01-10",
      totalSharedInstances: 6,
      usedResources: { cpu: 18, ram: 72, storage: 900 },
      sharedVPS: [],
      dedicatedVPS: [],
    },
  ]);

  const [newVPSParent, setNewVPSParent] = useState({
    name: "",
    region: "",
    cpu: 0,
    ram: 0,
    storage: 0,
    ipAddress: "",
  });

  const [newSharedVPS, setNewSharedVPS] = useState({
    name: "",
    parentId: "",
    customerId: "",
    customerName: "",
    allocatedCpu: 0,
    allocatedRam: 0,
    allocatedStorage: 0,
    domain: "",
  });

  const [newDedicatedVPS, setNewDedicatedVPS] = useState({
    name: "",
    parentId: "",
    customerId: "",
    customerName: "",
    cpu: 0,
    ram: 0,
    storage: 0,
    ipAddress: "",
    domain: "",
  });

  const menuItems = [
    { name: "Overview", icon: Home, key: "overview" },
    { name: "VPS Parents", icon: Server, key: "parents" },
    { name: "Shared VPS", icon: Users, key: "shared" },
    { name: "Dedicated VPS", icon: Database, key: "dedicated" },
    { name: "Monitoring", icon: Activity, key: "monitoring" },
    { name: "Settings", icon: Settings, key: "settings" },
  ];

  const regions = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-west-2", label: "US West (Oregon)" },
    { value: "eu-west-1", label: "EU West (Ireland)" },
    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  ];

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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "offline":
      case "stopped":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "maintenance":
      case "suspended":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const toggleParentExpansion = (parentId: string) => {
    setExpandedParents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(parentId)) {
        newSet.delete(parentId);
      } else {
        newSet.add(parentId);
      }
      return newSet;
    });
  };

  const createVPSParent = () => {
    const newParent: VPSParent = {
      id: `parent-${Date.now()}`,
      ...newVPSParent,
      status: "online",
      createdAt: new Date().toISOString().split("T")[0],
      sharedVPS: [],
      dedicatedVPS: [],
      totalSharedInstances: 0,
      usedResources: { cpu: 0, ram: 0, storage: 0 },
    };
    setVpsParents([...vpsParents, newParent]);
    setNewVPSParent({
      name: "",
      region: "",
      cpu: 0,
      ram: 0,
      storage: 0,
      ipAddress: "",
    });
  };

  const createSharedVPS = () => {
    const parentIndex = vpsParents.findIndex(
      (p) => p.id === newSharedVPS.parentId
    );
    if (parentIndex !== -1) {
      const newShared: SharedVPS = {
        id: `shared-${Date.now()}`,
        ...newSharedVPS,
        status: "running",
        createdAt: new Date().toISOString().split("T")[0],
      };

      const updatedParents = [...vpsParents];
      updatedParents[parentIndex].sharedVPS.push(newShared);
      updatedParents[parentIndex].totalSharedInstances += 1;
      updatedParents[parentIndex].usedResources.cpu +=
        newSharedVPS.allocatedCpu;
      updatedParents[parentIndex].usedResources.ram +=
        newSharedVPS.allocatedRam;
      updatedParents[parentIndex].usedResources.storage +=
        newSharedVPS.allocatedStorage;

      setVpsParents(updatedParents);
      setNewSharedVPS({
        name: "",
        parentId: "",
        customerId: "",
        customerName: "",
        allocatedCpu: 0,
        allocatedRam: 0,
        allocatedStorage: 0,
        domain: "",
      });
    }
  };

  const createDedicatedVPS = () => {
    const parentIndex = vpsParents.findIndex(
      (p) => p.id === newDedicatedVPS.parentId
    );
    if (parentIndex !== -1) {
      const newDedicated: DedicatedVPS = {
        id: `dedicated-${Date.now()}`,
        ...newDedicatedVPS,
        status: "running",
        createdAt: new Date().toISOString().split("T")[0],
      };

      const updatedParents = [...vpsParents];
      updatedParents[parentIndex].dedicatedVPS.push(newDedicated);

      setVpsParents(updatedParents);
      setNewDedicatedVPS({
        name: "",
        parentId: "",
        customerId: "",
        customerName: "",
        cpu: 0,
        ram: 0,
        storage: 0,
        ipAddress: "",
        domain: "",
      });
    }
  };

  const filteredParents = vpsParents.filter((parent) => {
    const matchesSearch = parent.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || parent.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const totalStats = {
    totalParents: vpsParents.length,
    totalShared: vpsParents.reduce(
      (sum, parent) => sum + parent.sharedVPS.length,
      0
    ),
    totalDedicated: vpsParents.reduce(
      (sum, parent) => sum + parent.dedicatedVPS.length,
      0
    ),
    onlineParents: vpsParents.filter((p) => p.status === "online").length,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-white shadow-md border border-border md:hidden hover:bg-accent transition-all duration-200"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${sidebarCollapsed ? "w-20" : "w-72"}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Server className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">VPS Admin</h1>
                <p className="text-xs text-muted-foreground">
                  Management Console
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-md hover:bg-accent transition-all duration-200"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }
                  ${sidebarCollapsed ? "justify-center px-2" : ""}
                `}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-72"
        }`}
      >
        {/* Header */}
        <header className="bg-card border-b border-border p-6 ml-16 md:ml-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                VPS Management Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage and monitor your VPS infrastructure
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search VPS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 ml-16 md:ml-0 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Overview Tab */}
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
                      {totalStats.totalParents}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {totalStats.onlineParents} online
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Shared VPS
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalStats.totalShared}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Active instances
                    </p>
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
                    <div className="text-2xl font-bold">
                      {totalStats.totalDedicated}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Standalone instances
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Customers
                    </CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        new Set([
                          ...vpsParents.flatMap((p) =>
                            p.sharedVPS.map((s) => s.customerId)
                          ),
                          ...vpsParents.flatMap((p) =>
                            p.dedicatedVPS.map((d) => d.customerId)
                          ),
                        ]).size
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Unique customers
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest VPS management activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Created new VPS Parent",
                        target: "US-East-Primary",
                        time: "2 hours ago",
                        type: "create",
                      },
                      {
                        action: "Deployed Shared VPS",
                        target: "Store-Alpha",
                        time: "4 hours ago",
                        type: "deploy",
                      },
                      {
                        action: "Updated Dedicated VPS",
                        target: "Enterprise-Store",
                        time: "6 hours ago",
                        type: "update",
                      },
                      {
                        action: "Maintenance completed",
                        target: "EU-West-Primary",
                        time: "1 day ago",
                        type: "maintenance",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "create"
                              ? "bg-green-500"
                              : activity.type === "deploy"
                              ? "bg-blue-500"
                              : activity.type === "update"
                              ? "bg-yellow-500"
                              : "bg-purple-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.target}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* VPS Parents Tab */}
            <TabsContent value="parents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">VPS Parents</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add VPS Parent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New VPS Parent</DialogTitle>
                      <DialogDescription>
                        Set up a new VPS parent server with specified resources.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="parent-name">Server Name</Label>
                        <Input
                          id="parent-name"
                          value={newVPSParent.name}
                          onChange={(e) =>
                            setNewVPSParent({
                              ...newVPSParent,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g., US-East-Primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="parent-region">Region</Label>
                        <Select
                          value={newVPSParent.region}
                          onValueChange={(value) =>
                            setNewVPSParent({ ...newVPSParent, region: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem
                                key={region.value}
                                value={region.value}
                              >
                                {region.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="parent-cpu">CPU Cores</Label>
                          <Input
                            id="parent-cpu"
                            type="number"
                            value={newVPSParent.cpu}
                            onChange={(e) =>
                              setNewVPSParent({
                                ...newVPSParent,
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
                            value={newVPSParent.ram}
                            onChange={(e) =>
                              setNewVPSParent({
                                ...newVPSParent,
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
                            value={newVPSParent.storage}
                            onChange={(e) =>
                              setNewVPSParent({
                                ...newVPSParent,
                                storage: parseInt(e.target.value) || 0,
                              })
                            }
                            placeholder="2000"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="parent-ip">IP Address</Label>
                        <Input
                          id="parent-ip"
                          value={newVPSParent.ipAddress}
                          onChange={(e) =>
                            setNewVPSParent({
                              ...newVPSParent,
                              ipAddress: e.target.value,
                            })
                          }
                          placeholder="192.168.1.100"
                        />
                      </div>
                      <Button onClick={createVPSParent} className="w-full">
                        Create VPS Parent
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {filteredParents.map((parent) => (
                  <Card key={parent.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleParentExpansion(parent.id)}
                            className="p-1 hover:bg-accent rounded"
                          >
                            {expandedParents.has(parent.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <span>{parent.name}</span>
                              <Badge
                                variant={
                                  parent.status === "online"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {parent.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>
                                  {
                                    regions.find(
                                      (r) => r.value === parent.region
                                    )?.label
                                  }
                                </span>
                              </span>
                              <span>{parent.ipAddress}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              CPU Usage
                            </span>
                            <span className="text-sm font-medium">
                              {parent.usedResources.cpu}/{parent.cpu} cores
                            </span>
                          </div>
                          <Progress
                            value={
                              (parent.usedResources.cpu / parent.cpu) * 100
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              RAM Usage
                            </span>
                            <span className="text-sm font-medium">
                              {parent.usedResources.ram}/{parent.ram} GB
                            </span>
                          </div>
                          <Progress
                            value={
                              (parent.usedResources.ram / parent.ram) * 100
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Storage Usage
                            </span>
                            <span className="text-sm font-medium">
                              {parent.usedResources.storage}/{parent.storage} GB
                            </span>
                          </div>
                          <Progress
                            value={
                              (parent.usedResources.storage / parent.storage) *
                              100
                            }
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedParents.has(parent.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <Separator className="my-4" />
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">
                                  Shared VPS Instances (
                                  {parent.sharedVPS.length})
                                </h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add Shared VPS
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Create Shared VPS
                                      </DialogTitle>
                                      <DialogDescription>
                                        Create a new shared VPS instance under{" "}
                                        {parent.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label>VPS Name</Label>
                                        <Input
                                          value={newSharedVPS.name}
                                          onChange={(e) =>
                                            setNewSharedVPS({
                                              ...newSharedVPS,
                                              name: e.target.value,
                                              parentId: parent.id,
                                            })
                                          }
                                          placeholder="Store-Gamma"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Customer ID</Label>
                                          <Input
                                            value={newSharedVPS.customerId}
                                            onChange={(e) =>
                                              setNewSharedVPS({
                                                ...newSharedVPS,
                                                customerId: e.target.value,
                                              })
                                            }
                                            placeholder="cust-123"
                                          />
                                        </div>
                                        <div>
                                          <Label>Customer Name</Label>
                                          <Input
                                            value={newSharedVPS.customerName}
                                            onChange={(e) =>
                                              setNewSharedVPS({
                                                ...newSharedVPS,
                                                customerName: e.target.value,
                                              })
                                            }
                                            placeholder="John Doe"
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-3 gap-4">
                                        <div>
                                          <Label>CPU Cores</Label>
                                          <Input
                                            type="number"
                                            value={newSharedVPS.allocatedCpu}
                                            onChange={(e) =>
                                              setNewSharedVPS({
                                                ...newSharedVPS,
                                                allocatedCpu:
                                                  parseInt(e.target.value) || 0,
                                              })
                                            }
                                            placeholder="2"
                                          />
                                        </div>
                                        <div>
                                          <Label>RAM (GB)</Label>
                                          <Input
                                            type="number"
                                            value={newSharedVPS.allocatedRam}
                                            onChange={(e) =>
                                              setNewSharedVPS({
                                                ...newSharedVPS,
                                                allocatedRam:
                                                  parseInt(e.target.value) || 0,
                                              })
                                            }
                                            placeholder="4"
                                          />
                                        </div>
                                        <div>
                                          <Label>Storage (GB)</Label>
                                          <Input
                                            type="number"
                                            value={
                                              newSharedVPS.allocatedStorage
                                            }
                                            onChange={(e) =>
                                              setNewSharedVPS({
                                                ...newSharedVPS,
                                                allocatedStorage:
                                                  parseInt(e.target.value) || 0,
                                              })
                                            }
                                            placeholder="50"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Domain (Optional)</Label>
                                        <Input
                                          value={newSharedVPS.domain}
                                          onChange={(e) =>
                                            setNewSharedVPS({
                                              ...newSharedVPS,
                                              domain: e.target.value,
                                            })
                                          }
                                          placeholder="store-gamma.com"
                                        />
                                      </div>
                                      <Button
                                        onClick={createSharedVPS}
                                        className="w-full"
                                      >
                                        Create Shared VPS
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              {parent.sharedVPS.length > 0 ? (
                                <div className="grid gap-2">
                                  {parent.sharedVPS.map((shared) => (
                                    <div
                                      key={shared.id}
                                      className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div
                                          className={`w-2 h-2 rounded-full ${getStatusColor(
                                            shared.status
                                          )}`}
                                        />
                                        <div>
                                          <p className="font-medium">
                                            {shared.name}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {shared.customerName} •{" "}
                                            {shared.allocatedCpu}C/
                                            {shared.allocatedRam}GB/
                                            {shared.allocatedStorage}GB
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="outline">
                                          {shared.status}
                                        </Badge>
                                        <Button variant="ghost" size="sm">
                                          <Settings className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                  No shared VPS instances
                                </p>
                              )}

                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">
                                  Dedicated VPS Instances (
                                  {parent.dedicatedVPS.length})
                                </h4>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add Dedicated VPS
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Create Dedicated VPS
                                      </DialogTitle>
                                      <DialogDescription>
                                        Create a new dedicated VPS instance
                                        under {parent.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label>VPS Name</Label>
                                        <Input
                                          value={newDedicatedVPS.name}
                                          onChange={(e) =>
                                            setNewDedicatedVPS({
                                              ...newDedicatedVPS,
                                              name: e.target.value,
                                              parentId: parent.id,
                                            })
                                          }
                                          placeholder="Enterprise-Store-2"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Customer ID</Label>
                                          <Input
                                            value={newDedicatedVPS.customerId}
                                            onChange={(e) =>
                                              setNewDedicatedVPS({
                                                ...newDedicatedVPS,
                                                customerId: e.target.value,
                                              })
                                            }
                                            placeholder="cust-456"
                                          />
                                        </div>
                                        <div>
                                          <Label>Customer Name</Label>
                                          <Input
                                            value={newDedicatedVPS.customerName}
                                            onChange={(e) =>
                                              setNewDedicatedVPS({
                                                ...newDedicatedVPS,
                                                customerName: e.target.value,
                                              })
                                            }
                                            placeholder="Acme Corp"
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-3 gap-4">
                                        <div>
                                          <Label>CPU Cores</Label>
                                          <Input
                                            type="number"
                                            value={newDedicatedVPS.cpu}
                                            onChange={(e) =>
                                              setNewDedicatedVPS({
                                                ...newDedicatedVPS,
                                                cpu:
                                                  parseInt(e.target.value) || 0,
                                              })
                                            }
                                            placeholder="8"
                                          />
                                        </div>
                                        <div>
                                          <Label>RAM (GB)</Label>
                                          <Input
                                            type="number"
                                            value={newDedicatedVPS.ram}
                                            onChange={(e) =>
                                              setNewDedicatedVPS({
                                                ...newDedicatedVPS,
                                                ram:
                                                  parseInt(e.target.value) || 0,
                                              })
                                            }
                                            placeholder="32"
                                          />
                                        </div>
                                        <div>
                                          <Label>Storage (GB)</Label>
                                          <Input
                                            type="number"
                                            value={newDedicatedVPS.storage}
                                            onChange={(e) =>
                                              setNewDedicatedVPS({
                                                ...newDedicatedVPS,
                                                storage:
                                                  parseInt(e.target.value) || 0,
                                              })
                                            }
                                            placeholder="500"
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>IP Address</Label>
                                          <Input
                                            value={newDedicatedVPS.ipAddress}
                                            onChange={(e) =>
                                              setNewDedicatedVPS({
                                                ...newDedicatedVPS,
                                                ipAddress: e.target.value,
                                              })
                                            }
                                            placeholder="192.168.1.102"
                                          />
                                        </div>
                                        <div>
                                          <Label>Domain (Optional)</Label>
                                          <Input
                                            value={newDedicatedVPS.domain}
                                            onChange={(e) =>
                                              setNewDedicatedVPS({
                                                ...newDedicatedVPS,
                                                domain: e.target.value,
                                              })
                                            }
                                            placeholder="enterprise-2.com"
                                          />
                                        </div>
                                      </div>
                                      <Button
                                        onClick={createDedicatedVPS}
                                        className="w-full"
                                      >
                                        Create Dedicated VPS
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              {parent.dedicatedVPS.length > 0 ? (
                                <div className="grid gap-2">
                                  {parent.dedicatedVPS.map((dedicated) => (
                                    <div
                                      key={dedicated.id}
                                      className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div
                                          className={`w-2 h-2 rounded-full ${getStatusColor(
                                            dedicated.status
                                          )}`}
                                        />
                                        <div>
                                          <p className="font-medium">
                                            {dedicated.name}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {dedicated.customerName} •{" "}
                                            {dedicated.cpu}C/{dedicated.ram}GB/
                                            {dedicated.storage}GB •{" "}
                                            {dedicated.ipAddress}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="outline">
                                          {dedicated.status}
                                        </Badge>
                                        <Button variant="ghost" size="sm">
                                          <Settings className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                  No dedicated VPS instances
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Shared VPS Tab */}
            <TabsContent value="shared" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Shared VPS Instances</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shared VPS
                </Button>
              </div>

              <div className="grid gap-4">
                {vpsParents.flatMap((parent) =>
                  parent.sharedVPS.map((shared) => (
                    <Card key={shared.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <span>{shared.name}</span>
                              <Badge
                                variant={
                                  shared.status === "running"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {shared.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              Customer: {shared.customerName} • Parent:{" "}
                              {parent.name}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Square className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {shared.allocatedCpu} cores
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MemoryStick className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {shared.allocatedRam} GB RAM
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {shared.allocatedStorage} GB Storage
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {shared.domain || "No domain"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Dedicated VPS Tab */}
            <TabsContent value="dedicated" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Dedicated VPS Instances
                </h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Dedicated VPS
                </Button>
              </div>

              <div className="grid gap-4">
                {vpsParents.flatMap((parent) =>
                  parent.dedicatedVPS.map((dedicated) => (
                    <Card key={dedicated.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <span>{dedicated.name}</span>
                              <Badge
                                variant={
                                  dedicated.status === "running"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {dedicated.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              Customer: {dedicated.customerName} • Parent:{" "}
                              {parent.name}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Square className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {dedicated.cpu} cores
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MemoryStick className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {dedicated.ram} GB RAM
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {dedicated.storage} GB Storage
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Server className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {dedicated.ipAddress}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {dedicated.domain || "No domain"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring" className="space-y-6">
              <h2 className="text-xl font-semibold">System Monitoring</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Usage Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vpsParents.map((parent) => (
                        <div key={parent.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{parent.name}</span>
                            <Badge
                              variant={
                                parent.status === "online"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {parent.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>CPU</span>
                                <span>
                                  {Math.round(
                                    (parent.usedResources.cpu / parent.cpu) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  (parent.usedResources.cpu / parent.cpu) * 100
                                }
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>RAM</span>
                                <span>
                                  {Math.round(
                                    (parent.usedResources.ram / parent.ram) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  (parent.usedResources.ram / parent.ram) * 100
                                }
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Storage</span>
                                <span>
                                  {Math.round(
                                    (parent.usedResources.storage /
                                      parent.storage) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  (parent.usedResources.storage /
                                    parent.storage) *
                                  100
                                }
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          type: "warning",
                          message: "High CPU usage on US-East-Primary",
                          time: "5 min ago",
                        },
                        {
                          type: "info",
                          message: "Maintenance scheduled for EU-West-Primary",
                          time: "1 hour ago",
                        },
                        {
                          type: "success",
                          message: "Backup completed successfully",
                          time: "2 hours ago",
                        },
                        {
                          type: "error",
                          message: "Failed to start VPS instance",
                          time: "3 hours ago",
                        },
                      ].map((alert, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-accent/50"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              alert.type === "error"
                                ? "bg-red-500"
                                : alert.type === "warning"
                                ? "bg-yellow-500"
                                : alert.type === "success"
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {alert.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {alert.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-xl font-semibold">System Settings</h2>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure general system preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-backup">Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable automatic daily backups
                        </p>
                      </div>
                      <Switch id="auto-backup" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="monitoring">Real-time Monitoring</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable real-time resource monitoring
                        </p>
                      </div>
                      <Switch id="monitoring" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email alerts for system events
                        </p>
                      </div>
                      <Switch id="notifications" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Limits</CardTitle>
                    <CardDescription>
                      Set default resource allocation limits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="max-cpu">Max CPU per Shared VPS</Label>
                        <Input id="max-cpu" type="number" defaultValue="8" />
                      </div>
                      <div>
                        <Label htmlFor="max-ram">
                          Max RAM per Shared VPS (GB)
                        </Label>
                        <Input id="max-ram" type="number" defaultValue="16" />
                      </div>
                      <div>
                        <Label htmlFor="max-storage">
                          Max Storage per Shared VPS (GB)
                        </Label>
                        <Input
                          id="max-storage"
                          type="number"
                          defaultValue="200"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default VPSAdminDashboard;
