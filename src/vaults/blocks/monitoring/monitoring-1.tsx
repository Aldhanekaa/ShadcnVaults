"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  RotateCcw,
  Trash2,
  ChevronDown,
  ChevronRight,
  Calendar,
  Database,
  HardDrive,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  MoreHorizontal,
  Eye,
  RefreshCw,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BackupEntry {
  id: string;
  databaseName: string;
  backupType: "full" | "incremental" | "differential";
  status: "completed" | "failed" | "in-progress" | "pending";
  dateTime: string;
  vpsRegion: string;
  size: string;
  duration: string;
  logs: string[];
  healthScore: number;
}

interface BackupMetrics {
  totalBackups: number;
  successfulBackups: number;
  failedBackups: number;
  totalSize: string;
  avgDuration: string;
  lastBackup: string;
}

const DatabaseBackupDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof BackupEntry>("dateTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedBackups, setSelectedBackups] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const mockBackups: BackupEntry[] = [
    {
      id: "1",
      databaseName: "production_db",
      backupType: "full",
      status: "completed",
      dateTime: "2024-01-15T14:30:00Z",
      vpsRegion: "us-east-1",
      size: "2.4 GB",
      duration: "12m 34s",
      logs: [
        "Backup initiated",
        "Database locked",
        "Data export completed",
        "Backup verified",
      ],
      healthScore: 98,
    },
    {
      id: "2",
      databaseName: "staging_db",
      backupType: "incremental",
      status: "failed",
      dateTime: "2024-01-15T12:15:00Z",
      vpsRegion: "eu-west-1",
      size: "450 MB",
      duration: "3m 21s",
      logs: ["Backup initiated", "Connection timeout", "Retry attempt failed"],
      healthScore: 45,
    },
    {
      id: "3",
      databaseName: "analytics_db",
      backupType: "differential",
      status: "in-progress",
      dateTime: "2024-01-15T16:00:00Z",
      vpsRegion: "ap-south-1",
      size: "1.2 GB",
      duration: "8m 12s",
      logs: ["Backup initiated", "Processing data chunks", "Progress: 65%"],
      healthScore: 85,
    },
    {
      id: "4",
      databaseName: "user_data_db",
      backupType: "full",
      status: "completed",
      dateTime: "2024-01-14T22:00:00Z",
      vpsRegion: "us-west-2",
      size: "5.8 GB",
      duration: "25m 45s",
      logs: [
        "Backup initiated",
        "Database locked",
        "Data export completed",
        "Compression applied",
        "Backup verified",
      ],
      healthScore: 95,
    },
    {
      id: "5",
      databaseName: "logs_db",
      backupType: "incremental",
      status: "pending",
      dateTime: "2024-01-15T18:00:00Z",
      vpsRegion: "eu-central-1",
      size: "0 MB",
      duration: "0s",
      logs: ["Backup scheduled"],
      healthScore: 0,
    },
  ];

  const mockMetrics: BackupMetrics = {
    totalBackups: 156,
    successfulBackups: 142,
    failedBackups: 14,
    totalSize: "2.4 TB",
    avgDuration: "15m 32s",
    lastBackup: "2024-01-15T16:00:00Z",
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "in-progress":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status.replace("-", " ")}</span>
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "full":
        return <Database className="h-4 w-4" />;
      case "incremental":
        return <RefreshCw className="h-4 w-4" />;
      case "differential":
        return <FileText className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const filteredAndSortedBackups = useMemo(() => {
    let filtered = mockBackups.filter((backup) => {
      const matchesSearch =
        backup.databaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        backup.vpsRegion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || backup.status === statusFilter;
      const matchesType =
        typeFilter === "all" || backup.backupType === typeFilter;
      const matchesRegion =
        regionFilter === "all" || backup.vpsRegion === regionFilter;

      return matchesSearch && matchesStatus && matchesType && matchesRegion;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [
    mockBackups,
    searchTerm,
    statusFilter,
    typeFilter,
    regionFilter,
    sortField,
    sortDirection,
  ]);

  const paginatedBackups = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBackups.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedBackups, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedBackups.length / itemsPerPage);

  const handleSort = (field: keyof BackupEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBackups(paginatedBackups.map((backup) => backup.id));
    } else {
      setSelectedBackups([]);
    }
  };

  const handleSelectBackup = (backupId: string, checked: boolean) => {
    if (checked) {
      setSelectedBackups([...selectedBackups, backupId]);
    } else {
      setSelectedBackups(selectedBackups.filter((id) => id !== backupId));
    }
  };

  const toggleRowExpansion = (backupId: string) => {
    if (expandedRows.includes(backupId)) {
      setExpandedRows(expandedRows.filter((id) => id !== backupId));
    } else {
      setExpandedRows([...expandedRows, backupId]);
    }
  };

  const handleBulkAction = async (action: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSelectedBackups([]);

    if (action === "delete") {
      setShowDeleteDialog(false);
    } else if (action === "restore") {
      setShowRestoreDialog(false);
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Database Backup Management
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your database backups
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Backups</p>
                <p className="text-2xl font-bold">{mockMetrics.totalBackups}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockMetrics.successfulBackups}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockMetrics.failedBackups}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold">{mockMetrics.totalSize}</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">{mockMetrics.avgDuration}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (mockMetrics.successfulBackups / mockMetrics.totalBackups) *
                      100
                  )}
                  %
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search databases or regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                    <SelectItem value="incremental">Incremental</SelectItem>
                    <SelectItem value="differential">Differential</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="us-east-1">US East 1</SelectItem>
                    <SelectItem value="us-west-2">US West 2</SelectItem>
                    <SelectItem value="eu-west-1">EU West 1</SelectItem>
                    <SelectItem value="eu-central-1">EU Central 1</SelectItem>
                    <SelectItem value="ap-south-1">AP South 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedBackups.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRestoreDialog(true)}
                  disabled={isLoading}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restore ({selectedBackups.length})
                </Button>
                <Button variant="outline" size="sm" disabled={isLoading}>
                  <Download className="h-4 w-4 mr-2" />
                  Download ({selectedBackups.length})
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete ({selectedBackups.length})
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Backup Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedBackups.length === paginatedBackups.length &&
                        paginatedBackups.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("databaseName")}
                  >
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Database Name
                      {sortField === "databaseName" && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("backupType")}
                  >
                    <div className="flex items-center gap-2">
                      Type
                      {sortField === "backupType" && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("dateTime")}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date & Time
                      {sortField === "dateTime" && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("vpsRegion")}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Region
                      {sortField === "vpsRegion" && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("size")}
                  >
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4" />
                      Size
                      {sortField === "size" && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("duration")}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration
                      {sortField === "duration" && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBackups.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Database className="h-12 w-12 text-muted-foreground" />
                        <p className="text-lg font-medium">No backups found</p>
                        <p className="text-muted-foreground">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBackups.map((backup) => (
                    <React.Fragment key={backup.id}>
                      <TableRow className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <Checkbox
                            checked={selectedBackups.includes(backup.id)}
                            onCheckedChange={(checked) =>
                              handleSelectBackup(backup.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(backup.id)}
                            className="p-0 h-8 w-8"
                          >
                            {expandedRows.includes(backup.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">
                          {backup.databaseName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(backup.backupType)}
                            <span className="capitalize">
                              {backup.backupType}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDateTime(backup.dateTime)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{backup.vpsRegion}</Badge>
                        </TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{backup.duration}</TableCell>
                        <TableCell>{getStatusBadge(backup.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`text-sm font-medium ${getHealthColor(
                                backup.healthScore
                              )}`}
                            >
                              {backup.healthScore}%
                            </div>
                            <Progress
                              value={backup.healthScore}
                              className="w-16 h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Restore
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>

                      {expandedRows.includes(backup.id) && (
                        <TableRow>
                          <TableCell colSpan={11} className="bg-muted/20">
                            <div className="p-4 space-y-3">
                              <h4 className="font-medium">Backup Logs</h4>
                              <div className="space-y-2">
                                {backup.logs.map((log, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-muted-foreground">
                                      {log}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedBackups.length
                )}{" "}
                of {filteredAndSortedBackups.length} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8"
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedBackups.length}{" "}
                backup(s)? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleBulkAction("delete")}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Restore Confirmation Dialog */}
        <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Restore</DialogTitle>
              <DialogDescription>
                Are you sure you want to restore {selectedBackups.length}{" "}
                backup(s)? This will overwrite the current database(s).
              </DialogDescription>
            </DialogHeader>
            <Alert className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This action will replace your current database with the backup
                data. Make sure you have a recent backup before proceeding.
              </AlertDescription>
            </Alert>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRestoreDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleBulkAction("restore")}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Restore
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default DatabaseBackupDashboard;
