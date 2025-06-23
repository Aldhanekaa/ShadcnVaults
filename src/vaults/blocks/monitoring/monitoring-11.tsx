"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Server,
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Globe,
  Users,
  Calendar,
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Eye,
  Download,
  Upload,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Types
interface VPSInstance {
  id: string;
  name: string;
  type: "shared" | "dedicated";
  status: "running" | "stopped" | "maintenance" | "error";
  ipAddress: string;
  domain?: string;
  plan: string;
  cpu: number;
  ram: number;
  storage: number;
  bandwidth: number;
  monthlyPrice: number;
  createdAt: string;
  lastUpdated: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  location: string;
  os: string;
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
  uptime: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Tech Corp",
    phone: "+1234567890",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    company: "Design Studio",
    phone: "+1234567891",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    company: "E-commerce Inc",
    phone: "+1234567892",
    createdAt: "2024-03-10",
  },
];

const mockVPSInstances: VPSInstance[] = [
  {
    id: "vps-001",
    name: "WebStore-Primary",
    type: "dedicated",
    status: "running",
    ipAddress: "192.168.1.100",
    domain: "shop.example.com",
    plan: "Business Pro",
    cpu: 8,
    ram: 32,
    storage: 500,
    bandwidth: 1000,
    monthlyPrice: 299,
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    customerId: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    location: "US-East",
    os: "Ubuntu 22.04",
    cpuUsage: 45,
    ramUsage: 68,
    storageUsage: 32,
    uptime: 99.9,
  },
  {
    id: "vps-002",
    name: "Dev-Environment",
    type: "shared",
    status: "running",
    ipAddress: "192.168.1.101",
    domain: "dev.example.com",
    plan: "Starter",
    cpu: 2,
    ram: 8,
    storage: 100,
    bandwidth: 500,
    monthlyPrice: 49,
    createdAt: "2024-02-20",
    lastUpdated: "2024-02-25",
    customerId: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    location: "EU-West",
    os: "CentOS 8",
    cpuUsage: 23,
    ramUsage: 41,
    storageUsage: 15,
    uptime: 98.5,
  },
  {
    id: "vps-003",
    name: "E-commerce-Main",
    type: "dedicated",
    status: "maintenance",
    ipAddress: "192.168.1.102",
    domain: "store.example.com",
    plan: "Enterprise",
    cpu: 16,
    ram: 64,
    storage: 1000,
    bandwidth: 2000,
    monthlyPrice: 599,
    createdAt: "2024-03-10",
    lastUpdated: "2024-03-15",
    customerId: "3",
    customerName: "Bob Wilson",
    customerEmail: "bob@example.com",
    location: "Asia-Pacific",
    os: "Ubuntu 22.04",
    cpuUsage: 0,
    ramUsage: 0,
    storageUsage: 78,
    uptime: 95.2,
  },
];

const VPSAdminDashboard = () => {
  const [vpsInstances, setVpsInstances] =
    useState<VPSInstance[]>(mockVPSInstances);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInstance, setEditingInstance] = useState<VPSInstance | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState("overview");

  // Form state for adding/editing VPS
  const [formData, setFormData] = useState({
    name: "",
    type: "shared" as "shared" | "dedicated",
    customerId: "",
    plan: "",
    cpu: 2,
    ram: 8,
    storage: 100,
    bandwidth: 500,
    monthlyPrice: 49,
    location: "US-East",
    os: "Ubuntu 22.04",
    domain: "",
    ipAddress: "",
  });

  // Filter instances
  const filteredInstances = vpsInstances.filter((instance) => {
    const matchesSearch =
      instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.ipAddress.includes(searchTerm);
    const matchesType = filterType === "all" || instance.type === filterType;
    const matchesStatus =
      filterStatus === "all" || instance.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      running: "bg-green-100 text-green-800 border-green-200",
      stopped: "bg-red-100 text-red-800 border-red-200",
      maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
      error: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      running: <CheckCircle className="w-3 h-3" />,
      stopped: <XCircle className="w-3 h-3" />,
      maintenance: <AlertCircle className="w-3 h-3" />,
      error: <XCircle className="w-3 h-3" />,
    };

    return (
      <Badge
        className={cn(
          "flex items-center gap-1",
          variants[status as keyof typeof variants]
        )}
      >
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      type: "shared",
      customerId: "",
      plan: "",
      cpu: 2,
      ram: 8,
      storage: 100,
      bandwidth: 500,
      monthlyPrice: 49,
      location: "US-East",
      os: "Ubuntu 22.04",
      domain: "",
      ipAddress: "",
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.customerId) return;

    const customer = customers.find((c) => c.id === formData.customerId);
    if (!customer) return;

    const newInstance: VPSInstance = {
      id: editingInstance ? editingInstance.id : `vps-${Date.now()}`,
      ...formData,
      status: "stopped" as const,
      ipAddress:
        formData.ipAddress || `192.168.1.${Math.floor(Math.random() * 255)}`,
      createdAt: editingInstance
        ? editingInstance.createdAt
        : new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      customerName: customer.name,
      customerEmail: customer.email,
      cpuUsage: 0,
      ramUsage: 0,
      storageUsage: 0,
      uptime: 100,
    };

    if (editingInstance) {
      setVpsInstances((prev) =>
        prev.map((instance) =>
          instance.id === editingInstance.id ? newInstance : instance
        )
      );
    } else {
      setVpsInstances((prev) => [...prev, newInstance]);
    }

    setIsAddDialogOpen(false);
    setEditingInstance(null);
    resetForm();
  };

  // Handle edit
  const handleEdit = (instance: VPSInstance) => {
    setEditingInstance(instance);
    setFormData({
      name: instance.name,
      type: instance.type,
      customerId: instance.customerId,
      plan: instance.plan,
      cpu: instance.cpu,
      ram: instance.ram,
      storage: instance.storage,
      bandwidth: instance.bandwidth,
      monthlyPrice: instance.monthlyPrice,
      location: instance.location,
      os: instance.os,
      domain: instance.domain || "",
      ipAddress: instance.ipAddress,
    });
    setIsAddDialogOpen(true);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setVpsInstances((prev) => prev.filter((instance) => instance.id !== id));
  };

  // Handle status change
  const handleStatusChange = (id: string, newStatus: VPSInstance["status"]) => {
    setVpsInstances((prev) =>
      prev.map((instance) =>
        instance.id === id
          ? {
              ...instance,
              status: newStatus,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : instance
      )
    );
  };

  // Calculate stats
  const stats = {
    total: vpsInstances.length,
    running: vpsInstances.filter((i) => i.status === "running").length,
    stopped: vpsInstances.filter((i) => i.status === "stopped").length,
    maintenance: vpsInstances.filter((i) => i.status === "maintenance").length,
    totalRevenue: vpsInstances.reduce((sum, i) => sum + i.monthlyPrice, 0),
    sharedInstances: vpsInstances.filter((i) => i.type === "shared").length,
    dedicatedInstances: vpsInstances.filter((i) => i.type === "dedicated")
      .length,
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            VPS Management Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor VPS instances for webstore deployments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add VPS Instance
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingInstance ? "Edit VPS Instance" : "Add New VPS Instance"}
              </DialogTitle>
              <DialogDescription>
                Configure the VPS instance settings for webstore deployment
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Instance Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g., WebStore-Primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">VPS Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "shared" | "dedicated") =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shared">Shared VPS</SelectItem>
                      <SelectItem value="dedicated">Dedicated VPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer *</Label>
                  <Select
                    value={formData.customerId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, customerId: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} ({customer.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan Name</Label>
                  <Input
                    id="plan"
                    value={formData.plan}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, plan: e.target.value }))
                    }
                    placeholder="e.g., Business Pro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain (Optional)</Label>
                  <Input
                    id="domain"
                    value={formData.domain}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        domain: e.target.value,
                      }))
                    }
                    placeholder="e.g., shop.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ipAddress">IP Address</Label>
                  <Input
                    id="ipAddress"
                    value={formData.ipAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ipAddress: e.target.value,
                      }))
                    }
                    placeholder="Auto-generated if empty"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpu">CPU Cores</Label>
                  <Input
                    id="cpu"
                    type="number"
                    min="1"
                    max="32"
                    value={formData.cpu}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cpu: parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ram">RAM (GB)</Label>
                  <Input
                    id="ram"
                    type="number"
                    min="1"
                    max="128"
                    value={formData.ram}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ram: parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Input
                    id="storage"
                    type="number"
                    min="10"
                    max="2000"
                    value={formData.storage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        storage: parseInt(e.target.value) || 10,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bandwidth">Bandwidth (GB/month)</Label>
                  <Input
                    id="bandwidth"
                    type="number"
                    min="100"
                    max="10000"
                    value={formData.bandwidth}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bandwidth: parseInt(e.target.value) || 100,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, location: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US-East">US East</SelectItem>
                      <SelectItem value="US-West">US West</SelectItem>
                      <SelectItem value="EU-West">EU West</SelectItem>
                      <SelectItem value="EU-Central">EU Central</SelectItem>
                      <SelectItem value="Asia-Pacific">Asia Pacific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="os">Operating System</Label>
                  <Select
                    value={formData.os}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, os: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ubuntu 22.04">Ubuntu 22.04</SelectItem>
                      <SelectItem value="Ubuntu 20.04">Ubuntu 20.04</SelectItem>
                      <SelectItem value="CentOS 8">CentOS 8</SelectItem>
                      <SelectItem value="Debian 11">Debian 11</SelectItem>
                      <SelectItem value="Windows Server 2022">
                        Windows Server 2022
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Monthly Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.monthlyPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      monthlyPrice: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.customerId}
              >
                {editingInstance ? "Update Instance" : "Create Instance"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Instances
            </CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.sharedInstances} shared, {stats.dedicatedInstances}{" "}
              dedicated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.running}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.stopped} stopped, {stats.maintenance} maintenance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.total} active instances
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>VPS Instances</CardTitle>
          <CardDescription>
            Manage and monitor all VPS instances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, customer, or IP address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="shared">Shared VPS</SelectItem>
                <SelectItem value="dedicated">Dedicated VPS</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Instances Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instance</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstances.map((instance) => (
                  <TableRow key={instance.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{instance.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {instance.ipAddress}
                          {instance.domain && (
                            <div className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {instance.domain}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {instance.customerName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {instance.customerEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          instance.type === "dedicated"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {instance.type === "dedicated" ? "Dedicated" : "Shared"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={instance.status} />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Cpu className="w-3 h-3" />
                          {instance.cpu} cores
                        </div>
                        <div className="flex items-center gap-1">
                          <MemoryStick className="w-3 h-3" />
                          {instance.ram}GB RAM
                        </div>
                        <div className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {instance.storage}GB
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>CPU</span>
                            <span>{instance.cpuUsage}%</span>
                          </div>
                          <Progress value={instance.cpuUsage} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>RAM</span>
                            <span>{instance.ramUsage}%</span>
                          </div>
                          <Progress value={instance.ramUsage} className="h-1" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${instance.monthlyPrice}/mo
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {instance.plan}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(instance)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </DropdownMenuItem>
                            {instance.status === "running" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(instance.id, "stopped")
                                }
                              >
                                <PowerOff className="w-4 h-4 mr-2" />
                                Stop
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(instance.id, "running")
                                }
                              >
                                <Power className="w-4 h-4 mr-2" />
                                Start
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(instance.id, "maintenance")
                              }
                            >
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Maintenance
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(instance.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInstances.length === 0 && (
            <div className="text-center py-8">
              <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No VPS instances found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterType !== "all" || filterStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first VPS instance"}
              </p>
              {!searchTerm &&
                filterType === "all" &&
                filterStatus === "all" && (
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add VPS Instance
                  </Button>
                )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VPSAdminDashboard;
