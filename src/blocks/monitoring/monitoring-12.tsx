"use client";

import React, { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Server,
  Plus,
  Edit,
  Trash2,
  Search,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Globe,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface VPSInstance {
  id: string;
  name: string;
  type: "shared" | "dedicated";
  status: "active" | "inactive" | "maintenance" | "error";
  cpu: number;
  ram: number;
  storage: number;
  bandwidth: number;
  ip: string;
  location: string;
  os: string;
  createdAt: string;
  lastUpdated: string;
  monthlyPrice: number;
  customerId: string;
  customerName: string;
  customerEmail: string;
}

interface VPSFormData {
  name: string;
  type: "shared" | "dedicated";
  cpu: number;
  ram: number;
  storage: number;
  bandwidth: number;
  location: string;
  os: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  monthlyPrice: number;
}

// Enhanced Dialog Components
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[101] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-[101] grid max-h-[calc(100%-4rem)] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border bg-background p-6 shadow-lg shadow-black/5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="group absolute right-3 top-3 flex size-7 items-center justify-center rounded-lg outline-offset-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none">
        <Cross2Icon
          width={16}
          height={16}
          strokeWidth={2}
          className="opacity-60 transition-opacity group-hover:opacity-100"
        />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Alert Dialog Components
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
      className
    )}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Label Component
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

// Select Component
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

// Badge Component
const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

// Card Components
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// VPS Form Component
const VPSForm: React.FC<{
  initialData?: Partial<VPSFormData>;
  onSubmit: (data: VPSFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}> = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState<VPSFormData>({
    name: initialData?.name || "",
    type: initialData?.type || "shared",
    cpu: initialData?.cpu || 1,
    ram: initialData?.ram || 1,
    storage: initialData?.storage || 20,
    bandwidth: initialData?.bandwidth || 100,
    location: initialData?.location || "",
    os: initialData?.os || "",
    customerId: initialData?.customerId || "",
    customerName: initialData?.customerName || "",
    customerEmail: initialData?.customerEmail || "",
    monthlyPrice: initialData?.monthlyPrice || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof VPSFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Instance Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Production Server 1"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">VPS Type</Label>
          <Select
            id="type"
            value={formData.type}
            onChange={(e) =>
              handleChange("type", e.target.value as "shared" | "dedicated")
            }
            required
          >
            <option value="shared">Shared VPS</option>
            <option value="dedicated">Dedicated VPS</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpu">CPU Cores</Label>
          <Input
            id="cpu"
            type="number"
            min="1"
            max="32"
            value={formData.cpu}
            onChange={(e) => handleChange("cpu", parseInt(e.target.value))}
            required
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
            onChange={(e) => handleChange("ram", parseInt(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storage">Storage (GB)</Label>
          <Input
            id="storage"
            type="number"
            min="10"
            max="2000"
            value={formData.storage}
            onChange={(e) => handleChange("storage", parseInt(e.target.value))}
            required
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
              handleChange("bandwidth", parseInt(e.target.value))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select
            id="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
          >
            <option value="">Select Location</option>
            <option value="us-east-1">US East (Virginia)</option>
            <option value="us-west-2">US West (Oregon)</option>
            <option value="eu-west-1">Europe (Ireland)</option>
            <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
            <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="os">Operating System</Label>
          <Select
            id="os"
            value={formData.os}
            onChange={(e) => handleChange("os", e.target.value)}
            required
          >
            <option value="">Select OS</option>
            <option value="ubuntu-20.04">Ubuntu 20.04 LTS</option>
            <option value="ubuntu-22.04">Ubuntu 22.04 LTS</option>
            <option value="centos-7">CentOS 7</option>
            <option value="centos-8">CentOS 8</option>
            <option value="debian-10">Debian 10</option>
            <option value="debian-11">Debian 11</option>
            <option value="windows-server-2019">Windows Server 2019</option>
            <option value="windows-server-2022">Windows Server 2022</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerId">Customer ID</Label>
          <Input
            id="customerId"
            value={formData.customerId}
            onChange={(e) => handleChange("customerId", e.target.value)}
            placeholder="e.g., CUST-001"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => handleChange("customerName", e.target.value)}
            placeholder="e.g., John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerEmail">Customer Email</Label>
          <Input
            id="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => handleChange("customerEmail", e.target.value)}
            placeholder="e.g., john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyPrice">Monthly Price ($)</Label>
          <Input
            id="monthlyPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.monthlyPrice}
            onChange={(e) =>
              handleChange("monthlyPrice", parseFloat(e.target.value))
            }
            placeholder="e.g., 29.99"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Instance" : "Create Instance"}
        </Button>
      </div>
    </form>
  );
};

// Status Badge Component
const StatusBadge: React.FC<{ status: VPSInstance["status"] }> = ({
  status,
}) => {
  const statusConfig = {
    active: { variant: "default" as const, icon: CheckCircle, text: "Active" },
    inactive: {
      variant: "secondary" as const,
      icon: XCircle,
      text: "Inactive",
    },
    maintenance: {
      variant: "outline" as const,
      icon: Clock,
      text: "Maintenance",
    },
    error: {
      variant: "destructive" as const,
      icon: AlertTriangle,
      text: "Error",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {config.text}
    </Badge>
  );
};

// Main VPS Admin Component
const VPSAdminUI: React.FC = () => {
  const [instances, setInstances] = useState<VPSInstance[]>([
    {
      id: "vps-001",
      name: "Production Web Server",
      type: "dedicated",
      status: "active",
      cpu: 4,
      ram: 8,
      storage: 100,
      bandwidth: 1000,
      ip: "192.168.1.100",
      location: "us-east-1",
      os: "ubuntu-22.04",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      monthlyPrice: 89.99,
      customerId: "CUST-001",
      customerName: "Acme Corp",
      customerEmail: "admin@acme.com",
    },
    {
      id: "vps-002",
      name: "Development Server",
      type: "shared",
      status: "active",
      cpu: 2,
      ram: 4,
      storage: 50,
      bandwidth: 500,
      ip: "192.168.1.101",
      location: "us-west-2",
      os: "ubuntu-20.04",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-18",
      monthlyPrice: 29.99,
      customerId: "CUST-002",
      customerName: "TechStart Inc",
      customerEmail: "dev@techstart.com",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "shared" | "dedicated">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | VPSInstance["status"]
  >("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingInstance, setEditingInstance] = useState<VPSInstance | null>(
    null
  );
  const [deletingInstance, setDeletingInstance] = useState<VPSInstance | null>(
    null
  );

  const filteredInstances = instances.filter((instance) => {
    const matchesSearch =
      instance.name.toLowerCase().includes(search.toLowerCase()) ||
      instance.customerName.toLowerCase().includes(search.toLowerCase()) ||
      instance.ip.includes(search);
    const matchesType = filterType === "all" || instance.type === filterType;
    const matchesStatus =
      filterStatus === "all" || instance.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateInstance = (data: VPSFormData) => {
    const newInstance: VPSInstance = {
      id: `vps-${Date.now()}`,
      ...data,
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setInstances((prev) => [...prev, newInstance]);
    setIsCreateDialogOpen(false);
  };

  const handleEditInstance = (data: VPSFormData) => {
    if (!editingInstance) return;

    setInstances((prev) =>
      prev.map((instance) =>
        instance.id === editingInstance.id
          ? {
              ...instance,
              ...data,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : instance
      )
    );
    setEditingInstance(null);
  };

  const handleDeleteInstance = () => {
    if (!deletingInstance) return;

    setInstances((prev) =>
      prev.filter((instance) => instance.id !== deletingInstance.id)
    );
    setDeletingInstance(null);
  };

  const stats = {
    total: instances.length,
    active: instances.filter((i) => i.status === "active").length,
    shared: instances.filter((i) => i.type === "shared").length,
    dedicated: instances.filter((i) => i.type === "dedicated").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              VPS Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor VPS instances for your customers
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Instance
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Instances
              </CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.active}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shared VPS</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.shared}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dedicated VPS
              </CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.dedicated}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search instances, customers, or IP addresses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="all">All Types</option>
                <option value="shared">Shared VPS</option>
                <option value="dedicated">Dedicated VPS</option>
              </Select>

              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
                <option value="error">Error</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Instances Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      Instance
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Resources
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Price</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstances.map((instance) => (
                    <tr
                      key={instance.id}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{instance.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {instance.ip}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">
                            {instance.customerName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {instance.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            instance.type === "dedicated"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {instance.type === "dedicated"
                            ? "Dedicated"
                            : "Shared"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={instance.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm space-y-1">
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
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {instance.location}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">
                          ${instance.monthlyPrice}/mo
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingInstance(instance)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeletingInstance(instance)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredInstances.length === 0 && (
                <div className="text-center py-12">
                  <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No instances found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Create Instance Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New VPS Instance</DialogTitle>
              <DialogDescription>
                Configure a new VPS instance for your customer. Fill in all
                required details.
              </DialogDescription>
            </DialogHeader>
            <VPSForm
              onSubmit={handleCreateInstance}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Instance Dialog */}
        <Dialog
          open={!!editingInstance}
          onOpenChange={() => setEditingInstance(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit VPS Instance</DialogTitle>
              <DialogDescription>
                Update the configuration for {editingInstance?.name}.
              </DialogDescription>
            </DialogHeader>
            {editingInstance && (
              <VPSForm
                initialData={editingInstance}
                onSubmit={handleEditInstance}
                onCancel={() => setEditingInstance(null)}
                isEditing
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deletingInstance}
          onOpenChange={() => setDeletingInstance(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                VPS instance "{deletingInstance?.name}" and remove all
                associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteInstance}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Instance
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VPSAdminUI;
