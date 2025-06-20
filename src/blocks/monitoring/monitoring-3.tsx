"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Database,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RotateCcw,
  Trash2,
  Eye,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Server,
  HardDrive,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BackupLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  message: string;
}

interface DatabaseBackup {
  id: string;
  databaseName: string;
  backupDate: string;
  backupTime: string;
  vpsRegion: string;
  status: "completed" | "failed" | "in_progress" | "pending";
  size: string;
  duration: string;
  type: "full" | "incremental" | "differential";
  retentionDays: number;
  compression: boolean;
  encryption: boolean;
  logs: BackupLog[];
  downloadUrl?: string;
  nextScheduled?: string;
}

const mockBackups: DatabaseBackup[] = [
  {
    id: "backup-001",
    databaseName: "production-db",
    backupDate: "2024-01-15",
    backupTime: "02:00:00",
    vpsRegion: "us-east-1",
    status: "completed",
    size: "2.4 GB",
    duration: "12m 34s",
    type: "full",
    retentionDays: 30,
    compression: true,
    encryption: true,
    nextScheduled: "2024-01-16 02:00:00",
    logs: [
      {
        id: "log-1",
        timestamp: "2024-01-15 02:00:00",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-2",
        timestamp: "2024-01-15 02:05:30",
        level: "info",
        message: "Database locked for backup",
      },
      {
        id: "log-3",
        timestamp: "2024-01-15 02:12:34",
        level: "info",
        message: "Backup completed successfully",
      },
    ],
  },
  {
    id: "backup-002",
    databaseName: "staging-db",
    backupDate: "2024-01-15",
    backupTime: "03:00:00",
    vpsRegion: "eu-west-1",
    status: "failed",
    size: "0 B",
    duration: "2m 15s",
    type: "incremental",
    retentionDays: 7,
    compression: true,
    encryption: false,
    nextScheduled: "2024-01-16 03:00:00",
    logs: [
      {
        id: "log-4",
        timestamp: "2024-01-15 03:00:00",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-5",
        timestamp: "2024-01-15 03:01:45",
        level: "warning",
        message: "Connection timeout detected",
      },
      {
        id: "log-6",
        timestamp: "2024-01-15 03:02:15",
        level: "error",
        message: "Backup failed: Database connection lost",
      },
    ],
  },
  {
    id: "backup-003",
    databaseName: "analytics-db",
    backupDate: "2024-01-15",
    backupTime: "04:00:00",
    vpsRegion: "ap-southeast-1",
    status: "in_progress",
    size: "1.8 GB",
    duration: "8m 22s",
    type: "differential",
    retentionDays: 14,
    compression: true,
    encryption: true,
    nextScheduled: "2024-01-16 04:00:00",
    logs: [
      {
        id: "log-7",
        timestamp: "2024-01-15 04:00:00",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-8",
        timestamp: "2024-01-15 04:03:12",
        level: "info",
        message: "Processing table: users",
      },
      {
        id: "log-9",
        timestamp: "2024-01-15 04:06:45",
        level: "info",
        message: "Processing table: transactions",
      },
    ],
  },
  {
    id: "backup-004",
    databaseName: "user-db",
    backupDate: "2024-01-14",
    backupTime: "02:00:00",
    vpsRegion: "us-west-2",
    status: "completed",
    size: "856 MB",
    duration: "5m 18s",
    type: "full",
    retentionDays: 30,
    compression: true,
    encryption: true,
    nextScheduled: "2024-01-15 02:00:00",
    logs: [
      {
        id: "log-10",
        timestamp: "2024-01-14 02:00:00",
        level: "info",
        message: "Backup started",
      },
      {
        id: "log-11",
        timestamp: "2024-01-14 02:05:18",
        level: "info",
        message: "Backup completed successfully",
      },
    ],
  },
];

function StatusBadge({ status }: { status: DatabaseBackup["status"] }) {
  const variants = {
    completed: {
      variant: "default" as const,
      icon: CheckCircle,
      className: "bg-green-100 text-green-800 border-green-200",
    },
    failed: {
      variant: "destructive" as const,
      icon: XCircle,
      className: "bg-red-100 text-red-800 border-red-200",
    },
    in_progress: {
      variant: "secondary" as const,
      icon: Activity,
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    pending: {
      variant: "outline" as const,
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
  };

  const config = variants[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={cn("flex items-center gap-1", config.className)}
    >
      <Icon className="h-3 w-3" />
      {status.replace("_", " ")}
    </Badge>
  );
}

function TypeBadge({ type }: { type: DatabaseBackup["type"] }) {
  const variants = {
    full: "bg-purple-100 text-purple-800 border-purple-200",
    incremental: "bg-blue-100 text-blue-800 border-blue-200",
    differential: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <Badge variant="outline" className={variants[type]}>
      {type}
    </Badge>
  );
}

function LogLevelBadge({ level }: { level: BackupLog["level"] }) {
  const variants = {
    info: "bg-blue-100 text-blue-800 border-blue-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Badge variant="outline" className={cn("text-xs", variants[level])}>
      {level}
    </Badge>
  );
}

interface DatabaseBackupManagerProps {
  backups?: DatabaseBackup[];
}

export function DatabaseBackupManager({
  backups = mockBackups,
}: DatabaseBackupManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [selectedBackup, setSelectedBackup] = useState<DatabaseBackup | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DatabaseBackup | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const filteredBackups = useMemo(() => {
    return backups.filter((backup) => {
      const matchesSearch =
        backup.databaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        backup.vpsRegion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || backup.status === statusFilter;
      const matchesRegion =
        regionFilter === "all" || backup.vpsRegion === regionFilter;

      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [backups, searchTerm, statusFilter, regionFilter]);

  const sortedBackups = useMemo(() => {
    if (!sortConfig.key) return filteredBackups;

    return [...filteredBackups].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortConfig.direction === "asc" ? 1 : -1;
      if (bValue === undefined) return sortConfig.direction === "asc" ? -1 : 1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredBackups, sortConfig]);

  const handleSort = (key: keyof DatabaseBackup) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const uniqueRegions = Array.from(
    new Set(backups.map((backup) => backup.vpsRegion))
  );

  const stats = {
    total: backups.length,
    completed: backups.filter((b) => b.status === "completed").length,
    failed: backups.filter((b) => b.status === "failed").length,
    inProgress: backups.filter((b) => b.status === "in_progress").length,
    totalSize: backups.reduce((acc, backup) => {
      const sizeValue = parseFloat(backup.size.split(" ")[0]);
      const unit = backup.size.split(" ")[1];
      if (unit === "GB") return acc + sizeValue * 1024;
      if (unit === "MB") return acc + sizeValue;
      return acc;
    }, 0),
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Database className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Database Backup Manager</h1>
            <p className="text-muted-foreground">
              Monitor and manage your database backups across all regions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Backups</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold">{stats.failed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-2xl font-bold">
                    {(stats.totalSize / 1024).toFixed(1)} GB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search databases or regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Backup List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>
                Recent database backup operations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("databaseName")}
                    >
                      <div className="flex items-center gap-2">
                        Database
                        {sortConfig.key === "databaseName" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("backupDate")}
                    >
                      <div className="flex items-center gap-2">
                        Date/Time
                        {sortConfig.key === "backupDate" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBackups.map((backup) => (
                    <TableRow
                      key={backup.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedBackup(backup)}
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {backup.databaseName}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <TypeBadge type={backup.type} />
                            {backup.encryption && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-green-50 text-green-700 border-green-200"
                              >
                                Encrypted
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="text-sm">{backup.backupDate}</span>
                            <span className="text-xs text-muted-foreground">
                              {backup.backupTime}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={backup.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{backup.vpsRegion}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {backup.size}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {backup.duration}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBackup(backup);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {backup.status === "completed" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {backup.status === "failed" && (
                            <Button variant="ghost" size="sm">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Backup Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Backup Details</CardTitle>
              <CardDescription>
                {selectedBackup
                  ? `Details for ${selectedBackup.databaseName}`
                  : "Select a backup to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedBackup ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Database:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedBackup.databaseName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Status:
                        </span>
                        <StatusBadge status={selectedBackup.status} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Type:
                        </span>
                        <TypeBadge type={selectedBackup.type} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Region:
                        </span>
                        <span className="text-sm">
                          {selectedBackup.vpsRegion}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Size:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedBackup.size}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Duration:
                        </span>
                        <span className="text-sm">
                          {selectedBackup.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Retention:
                        </span>
                        <span className="text-sm">
                          {selectedBackup.retentionDays} days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Compression:
                        </span>
                        <Badge
                          variant={
                            selectedBackup.compression ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {selectedBackup.compression ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Encryption:
                        </span>
                        <Badge
                          variant={
                            selectedBackup.encryption ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {selectedBackup.encryption ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      {selectedBackup.nextScheduled && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Next Backup:
                          </span>
                          <span className="text-sm">
                            {selectedBackup.nextScheduled}
                          </span>
                        </div>
                      )}
                    </div>
                    {selectedBackup.status === "completed" && (
                      <div className="pt-4 space-y-2">
                        <Button className="w-full" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Backup
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore Database
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="logs" className="space-y-3">
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {selectedBackup.logs.map((log) => (
                        <div
                          key={log.id}
                          className="p-3 border rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <LogLevelBadge level={log.level} />
                            <span className="text-xs text-muted-foreground">
                              {log.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{log.message}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-8">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Select a backup from the list to view details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return <DatabaseBackupManager />;
}
