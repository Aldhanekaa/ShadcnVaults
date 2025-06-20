"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Globe,
  Activity,
  Edit,
  Trash2,
  Eye,
  Search,
  Users,
  Database,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VPSInstance {
  id: string;
  name: string;
  type: "shared" | "dedicated";
  status: "running" | "stopped" | "maintenance" | "error";
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  ipAddress: string;
  location: string;
  os: string;
  customer: string;
  createdAt: string;
  monthlyPrice: number;
  webstoreUrl?: string;
}

interface VPSFormData {
  name: string;
  type: "shared" | "dedicated";
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  location: string;
  os: string;
  customer: string;
  monthlyPrice: string;
  webstoreUrl: string;
}

const VPSAdminUI = () => {
  const [instances, setInstances] = useState<VPSInstance[]>([
    {
      id: "1",
      name: "WebStore-Pro-001",
      type: "dedicated",
      status: "running",
      cpu: "4 vCPU",
      ram: "8 GB",
      storage: "200 GB SSD",
      bandwidth: "10 TB",
      ipAddress: "192.168.1.100",
      location: "US East",
      os: "Ubuntu 22.04",
      customer: "Acme Corp",
      createdAt: "2024-01-15",
      monthlyPrice: 89.99,
      webstoreUrl: "https://acme-store.com",
    },
    {
      id: "2",
      name: "Shared-Store-002",
      type: "shared",
      status: "running",
      cpu: "2 vCPU",
      ram: "4 GB",
      storage: "50 GB SSD",
      bandwidth: "2 TB",
      ipAddress: "192.168.1.101",
      location: "EU West",
      os: "CentOS 8",
      customer: "TechStart Ltd",
      createdAt: "2024-01-20",
      monthlyPrice: 29.99,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "shared" | "dedicated">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "running" | "stopped" | "maintenance" | "error"
  >("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInstance, setEditingInstance] = useState<VPSInstance | null>(
    null
  );
  const [formData, setFormData] = useState<VPSFormData>({
    name: "",
    type: "shared",
    cpu: "",
    ram: "",
    storage: "",
    bandwidth: "",
    location: "",
    os: "",
    customer: "",
    monthlyPrice: "",
    webstoreUrl: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "shared",
      cpu: "",
      ram: "",
      storage: "",
      bandwidth: "",
      location: "",
      os: "",
      customer: "",
      monthlyPrice: "",
      webstoreUrl: "",
    });
  };

  const handleAddInstance = () => {
    const newInstance: VPSInstance = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      status: "running",
      cpu: formData.cpu,
      ram: formData.ram,
      storage: formData.storage,
      bandwidth: formData.bandwidth,
      ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
      location: formData.location,
      os: formData.os,
      customer: formData.customer,
      createdAt: new Date().toISOString().split("T")[0],
      monthlyPrice: parseFloat(formData.monthlyPrice),
      webstoreUrl: formData.webstoreUrl || undefined,
    };

    setInstances([...instances, newInstance]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditInstance = () => {
    if (!editingInstance) return;

    const updatedInstances = instances.map((instance) =>
      instance.id === editingInstance.id
        ? {
            ...instance,
            name: formData.name,
            type: formData.type,
            cpu: formData.cpu,
            ram: formData.ram,
            storage: formData.storage,
            bandwidth: formData.bandwidth,
            location: formData.location,
            os: formData.os,
            customer: formData.customer,
            monthlyPrice: parseFloat(formData.monthlyPrice),
            webstoreUrl: formData.webstoreUrl || undefined,
          }
        : instance
    );

    setInstances(updatedInstances);
    setEditingInstance(null);
    resetForm();
  };

  const handleDeleteInstance = (id: string) => {
    setInstances(instances.filter((instance) => instance.id !== id));
  };

  const openEditDialog = (instance: VPSInstance) => {
    setEditingInstance(instance);
    setFormData({
      name: instance.name,
      type: instance.type,
      cpu: instance.cpu,
      ram: instance.ram,
      storage: instance.storage,
      bandwidth: instance.bandwidth,
      location: instance.location,
      os: instance.os,
      customer: instance.customer,
      monthlyPrice: instance.monthlyPrice.toString(),
      webstoreUrl: instance.webstoreUrl || "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "stopped":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      case "error":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "running":
        return "default";
      case "stopped":
        return "destructive";
      case "maintenance":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredInstances = instances.filter((instance) => {
    const matchesSearch =
      instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || instance.type === filterType;
    const matchesStatus =
      filterStatus === "all" || instance.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: instances.length,
    running: instances.filter((i) => i.status === "running").length,
    shared: instances.filter((i) => i.type === "shared").length,
    dedicated: instances.filter((i) => i.type === "dedicated").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              VPS Instance Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor VPS instances for webstore deployments
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Add New VPS
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New VPS Instance</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Instance Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., WebStore-Pro-001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">VPS Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "shared" | "dedicated") =>
                      setFormData({ ...formData, type: value })
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

                <div className="space-y-2">
                  <Label htmlFor="cpu">CPU</Label>
                  <Input
                    id="cpu"
                    value={formData.cpu}
                    onChange={(e) =>
                      setFormData({ ...formData, cpu: e.target.value })
                    }
                    placeholder="e.g., 4 vCPU"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ram">RAM</Label>
                  <Input
                    id="ram"
                    value={formData.ram}
                    onChange={(e) =>
                      setFormData({ ...formData, ram: e.target.value })
                    }
                    placeholder="e.g., 8 GB"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage">Storage</Label>
                  <Input
                    id="storage"
                    value={formData.storage}
                    onChange={(e) =>
                      setFormData({ ...formData, storage: e.target.value })
                    }
                    placeholder="e.g., 200 GB SSD"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bandwidth">Bandwidth</Label>
                  <Input
                    id="bandwidth"
                    value={formData.bandwidth}
                    onChange={(e) =>
                      setFormData({ ...formData, bandwidth: e.target.value })
                    }
                    placeholder="e.g., 10 TB"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US East">US East</SelectItem>
                      <SelectItem value="US West">US West</SelectItem>
                      <SelectItem value="EU West">EU West</SelectItem>
                      <SelectItem value="EU Central">EU Central</SelectItem>
                      <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="os">Operating System</Label>
                  <Select
                    value={formData.os}
                    onValueChange={(value) =>
                      setFormData({ ...formData, os: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select OS" />
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

                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) =>
                      setFormData({ ...formData, customer: e.target.value })
                    }
                    placeholder="Customer name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.monthlyPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyPrice: e.target.value })
                    }
                    placeholder="29.99"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="webstore">Webstore URL (Optional)</Label>
                  <Input
                    id="webstore"
                    value={formData.webstoreUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, webstoreUrl: e.target.value })
                    }
                    placeholder="https://example-store.com"
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
                <Button onClick={handleAddInstance}>Create VPS Instance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Instances
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total}
                </p>
              </div>
              <Server className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Running
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.running}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Shared VPS
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.shared}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Dedicated VPS
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.dedicated}
                </p>
              </div>
              <Database className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search instances or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={filterType}
              onValueChange={(value: any) => setFilterType(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="shared">Shared VPS</SelectItem>
                <SelectItem value="dedicated">Dedicated VPS</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterStatus}
              onValueChange={(value: any) => setFilterStatus(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
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
        </Card>

        {/* Instances List */}
        <div className="space-y-4">
          {filteredInstances.length === 0 ? (
            <Card className="p-12 text-center">
              <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No VPS instances found
              </h3>
              <p className="text-muted-foreground">
                Create your first VPS instance to get started.
              </p>
            </Card>
          ) : (
            filteredInstances.map((instance) => (
              <Card key={instance.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          getStatusColor(instance.status)
                        )}
                      />
                      <h3 className="text-lg font-semibold text-foreground">
                        {instance.name}
                      </h3>
                      <Badge
                        variant={
                          instance.type === "dedicated"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {instance.type === "dedicated" ? "Dedicated" : "Shared"}
                      </Badge>
                      <Badge variant={getStatusBadgeVariant(instance.status)}>
                        {instance.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">CPU:</span>
                        <span className="font-medium">{instance.cpu}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MemoryStick className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">RAM:</span>
                        <span className="font-medium">{instance.ram}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">{instance.storage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Bandwidth:
                        </span>
                        <span className="font-medium">
                          {instance.bandwidth}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Customer:</span>
                        <span className="font-medium ml-2">
                          {instance.customer}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium ml-2">
                          {instance.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">IP:</span>
                        <span className="font-medium ml-2">
                          {instance.ipAddress}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">OS:</span>
                        <span className="font-medium ml-2">{instance.os}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium ml-2">
                          {instance.createdAt}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium ml-2">
                          ${instance.monthlyPrice}/mo
                        </span>
                      </div>
                    </div>

                    {instance.webstoreUrl && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Webstore:</span>
                        <a
                          href={instance.webstoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {instance.webstoreUrl}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Dialog
                      open={editingInstance?.id === instance.id}
                      onOpenChange={(open) => !open && setEditingInstance(null)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(instance)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit VPS Instance</DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Instance Name</Label>
                            <Input
                              id="edit-name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-type">VPS Type</Label>
                            <Select
                              value={formData.type}
                              onValueChange={(value: "shared" | "dedicated") =>
                                setFormData({ ...formData, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="shared">
                                  Shared VPS
                                </SelectItem>
                                <SelectItem value="dedicated">
                                  Dedicated VPS
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-cpu">CPU</Label>
                            <Input
                              id="edit-cpu"
                              value={formData.cpu}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  cpu: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-ram">RAM</Label>
                            <Input
                              id="edit-ram"
                              value={formData.ram}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  ram: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-storage">Storage</Label>
                            <Input
                              id="edit-storage"
                              value={formData.storage}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  storage: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-bandwidth">Bandwidth</Label>
                            <Input
                              id="edit-bandwidth"
                              value={formData.bandwidth}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bandwidth: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-location">Location</Label>
                            <Select
                              value={formData.location}
                              onValueChange={(value) =>
                                setFormData({ ...formData, location: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="US East">US East</SelectItem>
                                <SelectItem value="US West">US West</SelectItem>
                                <SelectItem value="EU West">EU West</SelectItem>
                                <SelectItem value="EU Central">
                                  EU Central
                                </SelectItem>
                                <SelectItem value="Asia Pacific">
                                  Asia Pacific
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-os">Operating System</Label>
                            <Select
                              value={formData.os}
                              onValueChange={(value) =>
                                setFormData({ ...formData, os: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ubuntu 22.04">
                                  Ubuntu 22.04
                                </SelectItem>
                                <SelectItem value="Ubuntu 20.04">
                                  Ubuntu 20.04
                                </SelectItem>
                                <SelectItem value="CentOS 8">
                                  CentOS 8
                                </SelectItem>
                                <SelectItem value="Debian 11">
                                  Debian 11
                                </SelectItem>
                                <SelectItem value="Windows Server 2022">
                                  Windows Server 2022
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-customer">Customer</Label>
                            <Input
                              id="edit-customer"
                              value={formData.customer}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  customer: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-price">
                              Monthly Price ($)
                            </Label>
                            <Input
                              id="edit-price"
                              type="number"
                              step="0.01"
                              value={formData.monthlyPrice}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  monthlyPrice: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="edit-webstore">
                              Webstore URL (Optional)
                            </Label>
                            <Input
                              id="edit-webstore"
                              value={formData.webstoreUrl}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  webstoreUrl: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setEditingInstance(null)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleEditInstance}>
                            Update Instance
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteInstance(instance.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VPSAdminUI;
