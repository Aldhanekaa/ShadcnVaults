"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Globe,
  Settings,
  Users,
  Activity,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface VPSInstance {
  id: string;
  name: string;
  type: "shared" | "dedicated";
  status: "running" | "stopped" | "maintenance" | "error";
  ip: string;
  domain?: string;
  cpu: number;
  ram: number;
  storage: number;
  bandwidth: number;
  location: string;
  os: string;
  createdAt: string;
  lastUpdated: string;
  monthlyPrice: number;
  customerEmail: string;
  customerName: string;
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
  monthlyPrice: number;
  customerEmail: string;
  customerName: string;
  domain?: string;
}

type VPSFormErrors = {
  [K in keyof VPSFormData]?: string;
};

// Enhanced Select Component
const Select = ({
  value,
  onValueChange,
  children,
  placeholder,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-start text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/20"
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-input bg-popover shadow-lg"
          >
            <div className="p-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SelectItem = ({
  value,
  onSelect,
  children,
}: {
  value: string;
  onSelect: (value: string) => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
  >
    {children}
  </button>
);

// Input Component
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
  }
>(({ className, type, label, error, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90":
            variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90":
            variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

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

// Badge Component
const Badge = ({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80":
            variant === "default",
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80":
            variant === "destructive",
          "text-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
};

// Dialog Components
const Dialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={() => onOpenChange(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg"
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

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

const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const DialogContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-4 py-4", className)} {...props} />
);

// Data Table Component
const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  onRowClick,
}: {
  data: T[];
  columns: Array<{
    key: keyof T;
    header: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
  }>;
  searchable?: boolean;
  onRowClick?: (row: T) => void;
}) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      columns.some((column) => {
        const value = row[column.key];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, columns]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="w-full bg-card rounded-lg border">
      {searchable && (
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search VPS instances..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "text-left font-medium text-muted-foreground px-6 py-4",
                    column.sortable && "cursor-pointer hover:bg-muted/50"
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {column.header}
                    </span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3",
                            sortConfig.key === column.key &&
                              sortConfig.direction === "asc"
                              ? "text-primary"
                              : "text-muted-foreground/40"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 -mt-1",
                            sortConfig.key === column.key &&
                              sortConfig.direction === "desc"
                              ? "text-primary"
                              : "text-muted-foreground/40"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  "border-t border-border hover:bg-muted/30 transition-colors",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 text-sm">
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main VPS Admin Component
const VPSAdminUI = () => {
  const [vpsInstances, setVpsInstances] = useState<VPSInstance[]>([
    {
      id: "vps-001",
      name: "WebStore-Primary",
      type: "dedicated",
      status: "running",
      ip: "192.168.1.100",
      domain: "shop.example.com",
      cpu: 4,
      ram: 8,
      storage: 100,
      bandwidth: 1000,
      location: "US-East",
      os: "Ubuntu 22.04",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      monthlyPrice: 89.99,
      customerEmail: "john@example.com",
      customerName: "John Doe",
    },
    {
      id: "vps-002",
      name: "WebStore-Dev",
      type: "shared",
      status: "stopped",
      ip: "192.168.1.101",
      cpu: 2,
      ram: 4,
      storage: 50,
      bandwidth: 500,
      location: "EU-West",
      os: "CentOS 8",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-18",
      monthlyPrice: 29.99,
      customerEmail: "jane@example.com",
      customerName: "Jane Smith",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVPS, setSelectedVPS] = useState<VPSInstance | null>(null);
  const [formData, setFormData] = useState<VPSFormData>({
    name: "",
    type: "shared",
    cpu: 1,
    ram: 1,
    storage: 20,
    bandwidth: 100,
    location: "",
    os: "",
    monthlyPrice: 0,
    customerEmail: "",
    customerName: "",
    domain: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<VPSFormErrors>>({});

  const validateForm = (data: VPSFormData): boolean => {
    const errors: Partial<VPSFormErrors> = {};

    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.location.trim()) errors.location = "Location is required";
    if (!data.os.trim()) errors.os = "Operating System is required";
    if (!data.customerEmail.trim())
      errors.customerEmail = "Customer email is required";
    if (!data.customerName.trim())
      errors.customerName = "Customer name is required";
    if (data.monthlyPrice <= 0)
      errors.monthlyPrice = "Price must be greater than 0";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddVPS = () => {
    if (!validateForm(formData)) return;

    const newVPS: VPSInstance = {
      id: `vps-${Date.now()}`,
      ...formData,
      status: "stopped",
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setVpsInstances((prev) => [...prev, newVPS]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditVPS = () => {
    if (!selectedVPS || !validateForm(formData)) return;

    setVpsInstances((prev) =>
      prev.map((vps) =>
        vps.id === selectedVPS.id
          ? {
              ...vps,
              ...formData,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : vps
      )
    );
    setIsEditDialogOpen(false);
    setSelectedVPS(null);
    resetForm();
  };

  const handleDeleteVPS = (id: string) => {
    setVpsInstances((prev) => prev.filter((vps) => vps.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setVpsInstances((prev) =>
      prev.map((vps) =>
        vps.id === id
          ? {
              ...vps,
              status: vps.status === "running" ? "stopped" : "running",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : vps
      )
    );
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "shared",
      cpu: 1,
      ram: 1,
      storage: 20,
      bandwidth: 100,
      location: "",
      os: "",
      monthlyPrice: 0,
      customerEmail: "",
      customerName: "",
      domain: "",
    });
    setFormErrors({});
  };

  const openEditDialog = (vps: VPSInstance) => {
    setSelectedVPS(vps);
    setFormData({
      name: vps.name,
      type: vps.type,
      cpu: vps.cpu,
      ram: vps.ram,
      storage: vps.storage,
      bandwidth: vps.bandwidth,
      location: vps.location,
      os: vps.os,
      monthlyPrice: vps.monthlyPrice,
      customerEmail: vps.customerEmail,
      customerName: vps.customerName,
      domain: vps.domain || "",
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: VPSInstance["status"]) => {
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

  const getStatusIcon = (status: VPSInstance["status"]) => {
    switch (status) {
      case "running":
        return <Power className="h-4 w-4" />;
      case "stopped":
        return <PowerOff className="h-4 w-4" />;
      case "maintenance":
        return <Settings className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const columns = [
    {
      key: "name" as keyof VPSInstance,
      header: "Name",
      sortable: true,
      render: (value: string, row: VPSInstance) => (
        <div className="flex items-center gap-3">
          <div
            className={cn("w-2 h-2 rounded-full", getStatusColor(row.status))}
          />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{row.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "type" as keyof VPSInstance,
      header: "Type",
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === "dedicated" ? "default" : "secondary"}>
          {value === "dedicated" ? "Dedicated" : "Shared"}
        </Badge>
      ),
    },
    {
      key: "status" as keyof VPSInstance,
      header: "Status",
      sortable: true,
      render: (value: string, row: VPSInstance) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(row.status)}
          <span className="capitalize">{value}</span>
        </div>
      ),
    },
    {
      key: "customerName" as keyof VPSInstance,
      header: "Customer",
      sortable: true,
      render: (value: string, row: VPSInstance) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">
            {row.customerEmail}
          </div>
        </div>
      ),
    },
    {
      key: "ip" as keyof VPSInstance,
      header: "IP Address",
      render: (value: string, row: VPSInstance) => (
        <div>
          <div className="font-mono text-sm">{value}</div>
          {row.domain && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {row.domain}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "cpu" as keyof VPSInstance,
      header: "Resources",
      render: (value: number, row: VPSInstance) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs">
            <Cpu className="h-3 w-3" />
            {row.cpu} vCPU
          </div>
          <div className="flex items-center gap-1 text-xs">
            <MemoryStick className="h-3 w-3" />
            {row.ram} GB RAM
          </div>
          <div className="flex items-center gap-1 text-xs">
            <HardDrive className="h-3 w-3" />
            {row.storage} GB
          </div>
        </div>
      ),
    },
    {
      key: "location" as keyof VPSInstance,
      header: "Location",
      sortable: true,
    },
    {
      key: "monthlyPrice" as keyof VPSInstance,
      header: "Price",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">${value.toFixed(2)}/mo</span>
      ),
    },
    {
      key: "actions" as keyof VPSInstance,
      header: "Actions",
      render: (value: any, row: VPSInstance) => (
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatus(row.id);
            }}
            className="h-8 w-8"
          >
            {row.status === "running" ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              openEditDialog(row);
            }}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteVPS(row.id);
            }}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const VPSForm = ({
    onSubmit,
    submitLabel,
  }: {
    onSubmit: () => void;
    submitLabel: string;
  }) => (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="VPS Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="e.g., WebStore-Primary"
          error={formErrors.name}
        />
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            VPS Type
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                type: value as "shared" | "dedicated",
              }))
            }
            placeholder="Select type"
          >
            <SelectItem
              value="shared"
              onSelect={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  type: value as "shared" | "dedicated",
                }))
              }
            >
              Shared VPS
            </SelectItem>
            <SelectItem
              value="dedicated"
              onSelect={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  type: value as "shared" | "dedicated",
                }))
              }
            >
              Dedicated VPS
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Customer Name"
          value={formData.customerName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, customerName: e.target.value }))
          }
          placeholder="John Doe"
          error={formErrors.customerName}
        />
        <Input
          label="Customer Email"
          type="email"
          value={formData.customerEmail}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, customerEmail: e.target.value }))
          }
          placeholder="john@example.com"
          error={formErrors.customerEmail}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Input
          label="CPU (vCores)"
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
        <Input
          label="RAM (GB)"
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
        <Input
          label="Storage (GB)"
          type="number"
          min="10"
          max="2000"
          value={formData.storage}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              storage: parseInt(e.target.value) || 20,
            }))
          }
        />
        <Input
          label="Bandwidth (GB)"
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Location
          </label>
          <Select
            value={formData.location}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, location: value }))
            }
            placeholder="Select location"
          >
            <SelectItem
              value="US-East"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
            >
              US East (Virginia)
            </SelectItem>
            <SelectItem
              value="US-West"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
            >
              US West (California)
            </SelectItem>
            <SelectItem
              value="EU-West"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
            >
              EU West (Ireland)
            </SelectItem>
            <SelectItem
              value="Asia-Pacific"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
            >
              Asia Pacific (Singapore)
            </SelectItem>
          </Select>
          {formErrors.location && (
            <p className="text-sm text-destructive">{formErrors.location}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Operating System
          </label>
          <Select
            value={formData.os}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, os: value }))
            }
            placeholder="Select OS"
          >
            <SelectItem
              value="Ubuntu 22.04"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, os: value }))
              }
            >
              Ubuntu 22.04 LTS
            </SelectItem>
            <SelectItem
              value="Ubuntu 20.04"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, os: value }))
              }
            >
              Ubuntu 20.04 LTS
            </SelectItem>
            <SelectItem
              value="CentOS 8"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, os: value }))
              }
            >
              CentOS 8
            </SelectItem>
            <SelectItem
              value="Debian 11"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, os: value }))
              }
            >
              Debian 11
            </SelectItem>
            <SelectItem
              value="Windows Server 2022"
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, os: value }))
              }
            >
              Windows Server 2022
            </SelectItem>
          </Select>
          {formErrors.os && (
            <p className="text-sm text-destructive">{formErrors.os}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Domain (Optional)"
          value={formData.domain}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, domain: e.target.value }))
          }
          placeholder="shop.example.com"
        />
        <Input
          label="Monthly Price ($)"
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
          placeholder="29.99"
          error={formErrors.monthlyPrice}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit}>{submitLabel}</Button>
      </div>
    </div>
  );

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
              Manage and monitor VPS instances for webstore deployments
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add VPS Instance
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total VPS</p>
                  <p className="text-2xl font-bold">{vpsInstances.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Running</p>
                  <p className="text-2xl font-bold">
                    {
                      vpsInstances.filter((vps) => vps.status === "running")
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Customers</p>
                  <p className="text-2xl font-bold">
                    {new Set(vpsInstances.map((vps) => vps.customerEmail)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Monthly Revenue</p>
                  <p className="text-2xl font-bold">
                    $
                    {vpsInstances
                      .reduce((sum, vps) => sum + vps.monthlyPrice, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* VPS Table */}
        <Card>
          <CardHeader>
            <CardTitle>VPS Instances</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              data={vpsInstances}
              columns={columns}
              searchable={true}
              onRowClick={(vps) => openEditDialog(vps)}
            />
          </CardContent>
        </Card>

        {/* Add VPS Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogHeader>
            <DialogTitle>Add New VPS Instance</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <VPSForm onSubmit={handleAddVPS} submitLabel="Create VPS" />
          </DialogContent>
        </Dialog>

        {/* Edit VPS Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogHeader>
            <DialogTitle>Edit VPS Instance</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <VPSForm onSubmit={handleEditVPS} submitLabel="Update VPS" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VPSAdminUI;
