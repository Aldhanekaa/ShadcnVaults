"use client";
import React, { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Server,
  Plus,
  Settings,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Power,
  PowerOff,
  Trash2,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface VPSInstance {
  id: string;
  name: string;
  type: "shared" | "dedicated";
  status: "running" | "stopped" | "maintenance" | "error";
  customer: string;
  plan: string;
  cpu: number;
  ram: number;
  storage: number;
  bandwidth: number;
  ipAddress: string;
  location: string;
  createdAt: string;
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
  uptime: string;
}

interface NewVPSForm {
  name: string;
  type: "shared" | "dedicated";
  customer: string;
  plan: string;
  cpu: number;
  ram: number;
  storage: number;
  bandwidth: number;
  location: string;
  autoBackup: boolean;
  notes: string;
}

const VPSAdminDashboard: React.FC = () => {
  const [instances, setInstances] = useState<VPSInstance[]>([
    {
      id: "vps-001",
      name: "WebStore-Primary",
      type: "dedicated",
      status: "running",
      customer: "John Doe Store",
      plan: "Premium",
      cpu: 4,
      ram: 8,
      storage: 200,
      bandwidth: 1000,
      ipAddress: "192.168.1.100",
      location: "US-East",
      createdAt: "2024-01-15",
      cpuUsage: 45,
      ramUsage: 62,
      storageUsage: 78,
      uptime: "99.9%",
    },
    {
      id: "vps-002",
      name: "ECommerce-Dev",
      type: "shared",
      status: "running",
      customer: "Tech Solutions Inc",
      plan: "Standard",
      cpu: 2,
      ram: 4,
      storage: 100,
      bandwidth: 500,
      ipAddress: "192.168.1.101",
      location: "EU-West",
      createdAt: "2024-01-20",
      cpuUsage: 23,
      ramUsage: 41,
      storageUsage: 34,
      uptime: "99.5%",
    },
    {
      id: "vps-003",
      name: "Store-Backup",
      type: "shared",
      status: "stopped",
      customer: "Small Business Co",
      plan: "Basic",
      cpu: 1,
      ram: 2,
      storage: 50,
      bandwidth: 250,
      ipAddress: "192.168.1.102",
      location: "US-West",
      createdAt: "2024-02-01",
      cpuUsage: 0,
      ramUsage: 0,
      storageUsage: 12,
      uptime: "98.2%",
    },
  ]);

  const [newVPS, setNewVPS] = useState<NewVPSForm>({
    name: "",
    type: "shared",
    customer: "",
    plan: "",
    cpu: 1,
    ram: 2,
    storage: 50,
    bandwidth: 250,
    location: "",
    autoBackup: false,
    notes: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<VPSInstance | null>(
    null
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "stopped":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      case "error":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-4 w-4" />;
      case "stopped":
        return <PowerOff className="h-4 w-4" />;
      case "maintenance":
        return <Clock className="h-4 w-4" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Power className="h-4 w-4" />;
    }
  };

  const handleCreateVPS = () => {
    const newInstance: VPSInstance = {
      id: `vps-${String(instances.length + 1).padStart(3, "0")}`,
      name: newVPS.name,
      type: newVPS.type,
      status: "running",
      customer: newVPS.customer,
      plan: newVPS.plan,
      cpu: newVPS.cpu,
      ram: newVPS.ram,
      storage: newVPS.storage,
      bandwidth: newVPS.bandwidth,
      ipAddress: `192.168.1.${103 + instances.length}`,
      location: newVPS.location,
      createdAt: new Date().toISOString().split("T")[0],
      cpuUsage: Math.floor(Math.random() * 50),
      ramUsage: Math.floor(Math.random() * 60),
      storageUsage: Math.floor(Math.random() * 40),
      uptime: "100%",
    };

    setInstances([...instances, newInstance]);
    setNewVPS({
      name: "",
      type: "shared",
      customer: "",
      plan: "",
      cpu: 1,
      ram: 2,
      storage: 50,
      bandwidth: 250,
      location: "",
      autoBackup: false,
      notes: "",
    });
    setIsDialogOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: "running" | "stopped") => {
    setInstances(
      instances.map((instance) =>
        instance.id === id ? { ...instance, status: newStatus } : instance
      )
    );
  };

  const handleDeleteInstance = (id: string) => {
    setInstances(instances.filter((instance) => instance.id !== id));
  };

  const totalInstances = instances.length;
  const runningInstances = instances.filter(
    (i) => i.status === "running"
  ).length;
  const totalCPU = instances.reduce((sum, i) => sum + i.cpu, 0);
  const totalRAM = instances.reduce((sum, i) => sum + i.ram, 0);

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
              Manage and monitor VPS instances for webstore deployments
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New VPS
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New VPS Instance</DialogTitle>
                <DialogDescription>
                  Configure a new VPS instance for webstore deployment
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Instance Name</Label>
                    <Input
                      id="name"
                      value={newVPS.name}
                      onChange={(e) =>
                        setNewVPS({ ...newVPS, name: e.target.value })
                      }
                      placeholder="e.g., WebStore-Primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">VPS Type</Label>
                    <Select
                      value={newVPS.type}
                      onValueChange={(value: "shared" | "dedicated") =>
                        setNewVPS({ ...newVPS, type: value })
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
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input
                      id="customer"
                      value={newVPS.customer}
                      onChange={(e) =>
                        setNewVPS({ ...newVPS, customer: e.target.value })
                      }
                      placeholder="Customer or company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan</Label>
                    <Select
                      value={newVPS.plan}
                      onValueChange={(value) =>
                        setNewVPS({ ...newVPS, plan: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpu">CPU Cores</Label>
                    <Select
                      value={String(newVPS.cpu)}
                      onValueChange={(value) =>
                        setNewVPS({ ...newVPS, cpu: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Core</SelectItem>
                        <SelectItem value="2">2 Cores</SelectItem>
                        <SelectItem value="4">4 Cores</SelectItem>
                        <SelectItem value="8">8 Cores</SelectItem>
                        <SelectItem value="16">16 Cores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ram">RAM (GB)</Label>
                    <Select
                      value={String(newVPS.ram)}
                      onValueChange={(value) =>
                        setNewVPS({ ...newVPS, ram: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 GB</SelectItem>
                        <SelectItem value="4">4 GB</SelectItem>
                        <SelectItem value="8">8 GB</SelectItem>
                        <SelectItem value="16">16 GB</SelectItem>
                        <SelectItem value="32">32 GB</SelectItem>
                        <SelectItem value="64">64 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storage">Storage (GB)</Label>
                    <Select
                      value={String(newVPS.storage)}
                      onValueChange={(value) =>
                        setNewVPS({ ...newVPS, storage: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 GB</SelectItem>
                        <SelectItem value="100">100 GB</SelectItem>
                        <SelectItem value="200">200 GB</SelectItem>
                        <SelectItem value="500">500 GB</SelectItem>
                        <SelectItem value="1000">1 TB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bandwidth">Bandwidth (GB/month)</Label>
                    <Select
                      value={String(newVPS.bandwidth)}
                      onValueChange={(value) =>
                        setNewVPS({ ...newVPS, bandwidth: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="250">250 GB</SelectItem>
                        <SelectItem value="500">500 GB</SelectItem>
                        <SelectItem value="1000">1 TB</SelectItem>
                        <SelectItem value="2000">2 TB</SelectItem>
                        <SelectItem value="0">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={newVPS.location}
                    onValueChange={(value) =>
                      setNewVPS({ ...newVPS, location: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US-East">
                        US East (Virginia)
                      </SelectItem>
                      <SelectItem value="US-West">
                        US West (California)
                      </SelectItem>
                      <SelectItem value="EU-West">EU West (Ireland)</SelectItem>
                      <SelectItem value="EU-Central">
                        EU Central (Frankfurt)
                      </SelectItem>
                      <SelectItem value="Asia-Pacific">
                        Asia Pacific (Singapore)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoBackup"
                    checked={newVPS.autoBackup}
                    onCheckedChange={(checked) =>
                      setNewVPS({ ...newVPS, autoBackup: checked })
                    }
                  />
                  <Label htmlFor="autoBackup">Enable automatic backups</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={newVPS.notes}
                    onChange={(e) =>
                      setNewVPS({ ...newVPS, notes: e.target.value })
                    }
                    placeholder="Additional notes or requirements..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateVPS}
                    disabled={
                      !newVPS.name ||
                      !newVPS.customer ||
                      !newVPS.plan ||
                      !newVPS.location
                    }
                  >
                    Create VPS Instance
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Instances
              </CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInstances}</div>
              <p className="text-xs text-muted-foreground">
                {runningInstances} running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total CPU Cores
              </CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCPU}</div>
              <p className="text-xs text-muted-foreground">
                Across all instances
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total RAM</CardTitle>
              <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRAM} GB</div>
              <p className="text-xs text-muted-foreground">Memory allocated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Customers
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(instances.map((i) => i.customer)).size}
              </div>
              <p className="text-xs text-muted-foreground">Unique customers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="instances" className="space-y-4">
          <TabsList>
            <TabsTrigger value="instances">VPS Instances</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="instances" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>VPS Instances</CardTitle>
                <CardDescription>
                  Manage all VPS instances and their configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instance</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Resources</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instances.map((instance) => (
                      <TableRow key={instance.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{instance.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {instance.id}
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
                            {instance.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(
                                instance.status
                              )}`}
                            />
                            <span className="capitalize">
                              {instance.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {instance.customer}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {instance.plan}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {instance.cpu} CPU • {instance.ram}GB RAM
                            </div>
                            <div className="text-muted-foreground">
                              {instance.storage}GB Storage
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{instance.location}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {instance.ipAddress}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedInstance(instance)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(
                                  instance.id,
                                  instance.status === "running"
                                    ? "stopped"
                                    : "running"
                                )
                              }
                            >
                              {instance.status === "running" ? (
                                <PowerOff className="h-4 w-4" />
                              ) : (
                                <Power className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteInstance(instance.id)}
                            >
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

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instances
                .filter((i) => i.status === "running")
                .map((instance) => (
                  <Card key={instance.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{instance.name}</CardTitle>
                      <CardDescription>{instance.customer}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU Usage</span>
                          <span>{instance.cpuUsage}%</span>
                        </div>
                        <Progress value={instance.cpuUsage} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>RAM Usage</span>
                          <span>{instance.ramUsage}%</span>
                        </div>
                        <Progress value={instance.ramUsage} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Storage Usage</span>
                          <span>{instance.storageUsage}%</span>
                        </div>
                        <Progress
                          value={instance.storageUsage}
                          className="h-2"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-muted-foreground">
                          Uptime
                        </span>
                        <Badge variant="outline">{instance.uptime}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Instance Details Dialog */}
        {selectedInstance && (
          <Dialog
            open={!!selectedInstance}
            onOpenChange={() => setSelectedInstance(null)}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedInstance.name} Details</DialogTitle>
                <DialogDescription>
                  Detailed information about this VPS instance
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Instance ID</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.id}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Type</Label>
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedInstance.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Customer</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.customer}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Plan</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.plan}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">IP Address</Label>
                    <p className="text-sm text-muted-foreground font-mono">
                      {selectedInstance.ipAddress}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium">CPU</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.cpu} cores
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">RAM</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.ram} GB
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Storage</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.storage} GB
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Bandwidth</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedInstance.bandwidth} GB
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedInstance.createdAt}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default VPSAdminDashboard;
