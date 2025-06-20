"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Database,
  Server,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Eye,
  MoreHorizontal,
  Filter,
  Search,
  RefreshCw,
  Archive,
  Trash2,
  Play,
  Pause,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

interface BackupLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
}

interface DatabaseBackup {
  id: string;
  databaseName: string;
  backupDate: Date;
  vpsRegion: string;
  status: "completed" | "running" | "failed" | "scheduled";
  size: string;
  duration: string;
  retentionDays: number;
  backupType: "full" | "incremental" | "differential";
  compressionRatio: string;
  logs: BackupLog[];
  nextScheduled?: Date;
  errorMessage?: string;
}

const mockBackups: DatabaseBackup[] = [
  {
    id: "backup-001",
    databaseName: "production-db",
    backupDate: new Date("2024-01-15T02:30:00Z"),
    vpsRegion: "us-east-1",
    status: "completed",
    size: "2.4 GB",
    duration: "12m 34s",
    retentionDays: 30,
    backupType: "full",
    compressionRatio: "68%",
    nextScheduled: new Date("2024-01-16T02:30:00Z"),
    logs: [
      {
        id: "log-1",
        timestamp: "02:30:00",
        level: "info",
        message: "Backup process started",
      },
      {
        id: "log-2",
        timestamp: "02:35:12",
        level: "info",
        message: "Database locked for backup",
      },
      {
        id: "log-3",
        timestamp: "02:42:34",
        level: "success",
        message: "Backup completed successfully",
      },
    ],
  },
  {
    id: "backup-002",
    databaseName: "staging-db",
    backupDate: new Date("2024-01-15T01:15:00Z"),
    vpsRegion: "eu-west-1",
    status: "running",
    size: "1.8 GB",
    duration: "8m 45s",
    retentionDays: 14,
    backupType: "incremental",
    compressionRatio: "72%",
    logs: [
      {
        id: "log-4",
        timestamp: "01:15:00",
        level: "info",
        message: "Incremental backup started",
      },
      {
        id: "log-5",
        timestamp: "01:18:23",
        level: "info",
        message: "Analyzing changes since last backup",
      },
      {
        id: "log-6",
        timestamp: "01:23:45",
        level: "info",
        message: "Compressing backup data...",
      },
    ],
  },
  {
    id: "backup-003",
    databaseName: "analytics-db",
    backupDate: new Date("2024-01-14T23:45:00Z"),
    vpsRegion: "ap-southeast-1",
    status: "failed",
    size: "0 GB",
    duration: "2m 15s",
    retentionDays: 7,
    backupType: "full",
    compressionRatio: "0%",
    errorMessage: "Connection timeout to database server",
    logs: [
      {
        id: "log-7",
        timestamp: "23:45:00",
        level: "info",
        message: "Backup process initiated",
      },
      {
        id: "log-8",
        timestamp: "23:46:30",
        level: "warning",
        message: "Database connection unstable",
      },
      {
        id: "log-9",
        timestamp: "23:47:15",
        level: "error",
        message: "Connection timeout - backup failed",
      },
    ],
  },
  {
    id: "backup-004",
    databaseName: "user-data-db",
    backupDate: new Date("2024-01-16T03:00:00Z"),
    vpsRegion: "us-west-2",
    status: "scheduled",
    size: "3.2 GB",
    duration: "15m 20s",
    retentionDays: 90,
    backupType: "full",
    compressionRatio: "65%",
    logs: [],
  },
];

const getStatusColor = (status: DatabaseBackup["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-500/10 text-green-700 border-green-200 dark:text-green-400 dark:border-green-800";
    case "running":
      return "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800";
    case "failed":
      return "bg-red-500/10 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800";
    case "scheduled":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800";
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200 dark:text-gray-400 dark:border-gray-800";
  }
};

const getStatusIcon = (status: DatabaseBackup["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "running":
      return <RefreshCw className="w-4 h-4 animate-spin" />;
    case "failed":
      return <AlertCircle className="w-4 h-4" />;
    case "scheduled":
      return <Clock className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getLogLevelColor = (level: BackupLog["level"]) => {
  switch (level) {
    case "success":
      return "text-green-600 dark:text-green-400";
    case "warning":
      return "text-yellow-600 dark:text-yellow-400";
    case "error":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-blue-600 dark:text-blue-400";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
};

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
};

interface LogViewerProps {
  logs: BackupLog[];
  isOpen: boolean;
  onClose: () => void;
}

const LogViewer: React.FC<LogViewerProps> = ({ logs, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold">Backup Logs</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2 font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">No logs available</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 py-1">
                  <span className="text-muted-foreground text-xs w-20 flex-shrink-0">
                    {log.timestamp}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium w-16 flex-shrink-0",
                      getLogLevelColor(log.level)
                    )}
                  >
                    [{log.level.toUpperCase()}]
                  </span>
                  <span className="text-foreground">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DatabaseBackupManager: React.FC = () => {
  const [backups, setBackups] = useState<DatabaseBackup[]>(mockBackups);
  const [selectedBackup, setSelectedBackup] = useState<DatabaseBackup | null>(
    null
  );
  const [showLogs, setShowLogs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const filteredBackups = backups.filter((backup) => {
    const matchesSearch = backup.databaseName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || backup.status === statusFilter;
    const matchesRegion =
      regionFilter === "all" || backup.vpsRegion === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const regions = Array.from(new Set(backups.map((b) => b.vpsRegion)));
  const statuses = Array.from(new Set(backups.map((b) => b.status)));

  const handleViewLogs = (backup: DatabaseBackup) => {
    setSelectedBackup(backup);
    setShowLogs(true);
  };

  const handleStartBackup = (backupId: string) => {
    setBackups((prev) =>
      prev.map((backup) =>
        backup.id === backupId
          ? { ...backup, status: "running" as const }
          : backup
      )
    );
  };

  const handleStopBackup = (backupId: string) => {
    setBackups((prev) =>
      prev.map((backup) =>
        backup.id === backupId
          ? {
              ...backup,
              status: "failed" as const,
              errorMessage: "Backup cancelled by user",
            }
          : backup
      )
    );
  };

  const stats = {
    total: backups.length,
    completed: backups.filter((b) => b.status === "completed").length,
    running: backups.filter((b) => b.status === "running").length,
    failed: backups.filter((b) => b.status === "failed").length,
    scheduled: backups.filter((b) => b.status === "scheduled").length,
  };

  return (
    <div className="w-full space-y-6 p-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Database Backups
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor your database backup operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Database className="w-4 h-4 mr-2" />
            New Backup
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Backups</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Database className="w-8 h-8 text-muted-foreground" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.completed}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Running</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.running}
              </p>
            </div>
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.scheduled}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search databases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Backup Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Database</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Backup</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Next Scheduled</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBackups.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{backup.databaseName}</p>
                      <p className="text-sm text-muted-foreground">
                        Retention: {backup.retentionDays} days
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("gap-1", getStatusColor(backup.status))}
                  >
                    {getStatusIcon(backup.status)}
                    {backup.status.charAt(0).toUpperCase() +
                      backup.status.slice(1)}
                  </Badge>
                  {backup.errorMessage && (
                    <p className="text-xs text-red-600 mt-1">
                      {backup.errorMessage}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm">
                        {formatRelativeTime(backup.backupDate)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(backup.backupDate)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{backup.vpsRegion}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">{backup.size}</p>
                    <p className="text-xs text-muted-foreground">
                      {backup.compressionRatio} compressed
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{backup.backupType}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{backup.duration}</span>
                </TableCell>
                <TableCell>
                  {backup.nextScheduled ? (
                    <div>
                      <p className="text-sm">
                        {formatRelativeTime(backup.nextScheduled)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(backup.nextScheduled)}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not scheduled
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewLogs(backup)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {backup.status === "completed" && (
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                    {backup.status === "scheduled" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartBackup(backup.id)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    {backup.status === "running" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStopBackup(backup.id)}
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48" align="end">
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Log Viewer Modal */}
      <LogViewer
        logs={selectedBackup?.logs || []}
        isOpen={showLogs}
        onClose={() => setShowLogs(false)}
      />
    </div>
  );
};

export default function DatabaseBackupDemo() {
  return (
    <div className="min-h-screen bg-background">
      <DatabaseBackupManager />
    </div>
  );
}
