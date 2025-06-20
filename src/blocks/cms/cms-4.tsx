"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Database,
  Server,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  MoreHorizontal,
  AlertTriangle,
  FileText,
  HardDrive,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface BackupLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
}

interface DatabaseBackup {
  id: string;
  databaseName: string;
  backupDate: string;
  vpsRegion: string;
  status: "completed" | "failed" | "in-progress" | "scheduled";
  size: string;
  duration: string;
  backupType: "full" | "incremental" | "differential";
  retentionDays: number;
  compressionRatio: string;
  logs: BackupLog[];
  nextScheduled?: string;
}

// Mock data
const mockBackups: DatabaseBackup[] = [
  {
    id: "backup-001",
    databaseName: "production_db",
    backupDate: "2024-01-15T02:00:00Z",
    vpsRegion: "US-East-1",
    status: "completed",
    size: "2.4 GB",
    duration: "12m 34s",
    backupType: "full",
    retentionDays: 30,
    compressionRatio: "65%",
    nextScheduled: "2024-01-16T02:00:00Z",
    logs: [
      {
        id: "log-1",
        timestamp: "2024-01-15T02:00:00Z",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-2",
        timestamp: "2024-01-15T02:05:00Z",
        level: "info",
        message: "Database locked for backup",
      },
      {
        id: "log-3",
        timestamp: "2024-01-15T02:12:34Z",
        level: "success",
        message: "Backup completed successfully",
      },
    ],
  },
  {
    id: "backup-002",
    databaseName: "analytics_db",
    backupDate: "2024-01-15T03:00:00Z",
    vpsRegion: "EU-West-1",
    status: "failed",
    size: "1.8 GB",
    duration: "8m 12s",
    backupType: "incremental",
    retentionDays: 14,
    compressionRatio: "72%",
    nextScheduled: "2024-01-16T03:00:00Z",
    logs: [
      {
        id: "log-4",
        timestamp: "2024-01-15T03:00:00Z",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-5",
        timestamp: "2024-01-15T03:05:00Z",
        level: "warning",
        message: "High memory usage detected",
      },
      {
        id: "log-6",
        timestamp: "2024-01-15T03:08:12Z",
        level: "error",
        message: "Backup failed: Connection timeout",
      },
    ],
  },
  {
    id: "backup-003",
    databaseName: "user_sessions",
    backupDate: "2024-01-15T04:00:00Z",
    vpsRegion: "Asia-Pacific-1",
    status: "in-progress",
    size: "856 MB",
    duration: "5m 23s",
    backupType: "differential",
    retentionDays: 7,
    compressionRatio: "58%",
    logs: [
      {
        id: "log-7",
        timestamp: "2024-01-15T04:00:00Z",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-8",
        timestamp: "2024-01-15T04:03:00Z",
        level: "info",
        message: "Processing table: user_sessions",
      },
    ],
  },
  {
    id: "backup-004",
    databaseName: "inventory_db",
    backupDate: "2024-01-14T02:00:00Z",
    vpsRegion: "US-West-2",
    status: "completed",
    size: "4.2 GB",
    duration: "18m 45s",
    backupType: "full",
    retentionDays: 90,
    compressionRatio: "68%",
    logs: [
      {
        id: "log-9",
        timestamp: "2024-01-14T02:00:00Z",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-10",
        timestamp: "2024-01-14T02:18:45Z",
        level: "success",
        message: "Backup completed successfully",
      },
    ],
  },
];

// Components
const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "text-foreground border border-border",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

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
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
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

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, defaultValue, value, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      data-value={currentValue}
      {...props}
    >
      {React.Children.map(props.children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              value: currentValue,
              onValueChange: handleValueChange,
            } as any)
          : child
      )}
    </div>
  );
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    onValueChange?: (value: string) => void;
    currentValue?: string;
  }
>(({ className, value, onValueChange, currentValue, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      currentValue === value
        ? "bg-background text-foreground shadow-sm"
        : "hover:bg-background/50",
      className
    )}
    onClick={() => onValueChange?.(value)}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    currentValue?: string;
  }
>(({ className, value, currentValue, ...props }, ref) => {
  if (currentValue !== value) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

// Status components
const StatusIcon = ({ status }: { status: DatabaseBackup["status"] }) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "scheduled":
      return <Calendar className="h-4 w-4 text-yellow-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const StatusBadge = ({ status }: { status: DatabaseBackup["status"] }) => {
  const variants = {
    completed: "bg-green-100 text-green-800 border-green-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    scheduled: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <Badge className={cn("border", variants[status])}>
      <StatusIcon status={status} />
      <span className="ml-1 capitalize">{status.replace("-", " ")}</span>
    </Badge>
  );
};

// Log level components
const LogLevelIcon = ({ level }: { level: BackupLog["level"] }) => {
  switch (level) {
    case "success":
      return <CheckCircle className="h-3 w-3 text-green-500" />;
    case "error":
      return <XCircle className="h-3 w-3 text-red-500" />;
    case "warning":
      return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
    case "info":
    default:
      return <FileText className="h-3 w-3 text-blue-500" />;
  }
};

// Backup card component
const BackupCard = ({ backup }: { backup: DatabaseBackup }) => {
  const [selectedTab, setSelectedTab] = React.useState("overview");

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{backup.databaseName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(backup.backupDate), "PPp")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusBadge status={backup.status} />
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" currentValue={selectedTab}>
              Overview
            </TabsTrigger>
            <TabsTrigger value="details" currentValue={selectedTab}>
              Details
            </TabsTrigger>
            <TabsTrigger value="logs" currentValue={selectedTab}>
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" currentValue={selectedTab}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  Region
                </div>
                <p className="font-medium">{backup.vpsRegion}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <HardDrive className="h-3 w-3 mr-1" />
                  Size
                </div>
                <p className="font-medium">{backup.size}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  Duration
                </div>
                <p className="font-medium">{backup.duration}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Activity className="h-3 w-3 mr-1" />
                  Type
                </div>
                <p className="font-medium capitalize">{backup.backupType}</p>
              </div>
            </div>

            {backup.nextScheduled && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Next backup scheduled:{" "}
                  {format(new Date(backup.nextScheduled), "PPp")}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" currentValue={selectedTab}>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Backup Configuration
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Backup Type:</span>
                      <span className="text-sm font-medium capitalize">
                        {backup.backupType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Retention Period:</span>
                      <span className="text-sm font-medium">
                        {backup.retentionDays} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Compression Ratio:</span>
                      <span className="text-sm font-medium">
                        {backup.compressionRatio}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Infrastructure
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">VPS Region:</span>
                      <span className="text-sm font-medium">
                        {backup.vpsRegion}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Backup Size:</span>
                      <span className="text-sm font-medium">{backup.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Duration:</span>
                      <span className="text-sm font-medium">
                        {backup.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Backup
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs" currentValue={selectedTab}>
            <div className="space-y-2 mt-4 max-h-64 overflow-y-auto">
              {backup.logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50"
                >
                  <LogLevelIcon level={log.level} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{log.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(log.timestamp), "HH:mm:ss")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Main component
const DatabaseBackupDashboard = ({
  backups = mockBackups,
}: {
  backups?: DatabaseBackup[];
}) => {
  const [filter, setFilter] = React.useState<"all" | DatabaseBackup["status"]>(
    "all"
  );

  const filteredBackups = React.useMemo(() => {
    if (filter === "all") return backups;
    return backups.filter((backup) => backup.status === filter);
  }, [backups, filter]);

  const stats = React.useMemo(() => {
    const total = backups.length;
    const completed = backups.filter((b) => b.status === "completed").length;
    const failed = backups.filter((b) => b.status === "failed").length;
    const inProgress = backups.filter((b) => b.status === "in-progress").length;

    return { total, completed, failed, inProgress };
  }, [backups]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Database Backups
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage your database backup operations
          </p>
        </div>
        <Button>
          <Database className="h-4 w-4 mr-2" />
          New Backup
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Backups</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stats.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "failed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("failed")}
        >
          Failed
        </Button>
        <Button
          variant={filter === "in-progress" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("in-progress")}
        >
          In Progress
        </Button>
      </div>

      {/* Backup Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBackups.map((backup) => (
          <BackupCard key={backup.id} backup={backup} />
        ))}
      </div>

      {filteredBackups.length === 0 && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">
            No backups found
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "No database backups have been created yet."
              : `No backups with status "${filter}" found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DatabaseBackupDashboard;
