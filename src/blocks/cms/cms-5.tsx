"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Database,
  Server,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  Filter,
  Search,
} from "lucide-react";
import { format, getDate } from "date-fns";
import { cn } from "@/lib/utils";

// Button Component
const buttonVariants = {
  default:
    "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
  outline:
    "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-lg px-3 text-xs",
  lg: "h-10 rounded-lg px-8",
  icon: "h-9 w-9",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Badge Component
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      outline: "text-foreground",
      success:
        "border-transparent bg-green-500 text-white shadow hover:bg-green-500/80",
      warning:
        "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-500/80",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

// Card Components
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
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
    className={cn("font-semibold leading-none tracking-tight", className)}
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

// Table Components
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// Date Badge Component
function DateBadge({ date: rawDate }: { date: string | Date }) {
  const date = getDate(rawDate);
  const month = format(rawDate, "LLL");

  return (
    <div className="bg-background/40 flex size-10 shrink-0 cursor-default flex-col items-center justify-center rounded-md border text-center">
      <span className="text-sm font-semibold leading-snug">{date}</span>
      <span className="text-muted-foreground text-xs leading-none">
        {month}
      </span>
    </div>
  );
}

// Types
interface DatabaseBackup {
  id: string;
  database_name: string;
  backup_date: Date;
  backup_time: string;
  vps_region: string;
  status: "success" | "failed" | "in_progress" | "scheduled";
  size: number;
  backup_type: "full" | "incremental" | "differential";
  retention_days: number;
  logs: string[];
  file_path: string;
  checksum: string;
}

// Sample data
const sampleBackups: DatabaseBackup[] = [
  {
    id: "bkp_001",
    database_name: "production_db",
    backup_date: new Date("2024-01-15T02:30:00Z"),
    backup_time: "02:30:00",
    vps_region: "us-east-1",
    status: "success",
    size: 2.4,
    backup_type: "full",
    retention_days: 30,
    logs: [
      "Backup started",
      "Database locked",
      "Backup completed successfully",
    ],
    file_path: "/backups/production_db_20240115_023000.sql.gz",
    checksum: "sha256:a1b2c3d4e5f6",
  },
  {
    id: "bkp_002",
    database_name: "staging_db",
    backup_date: new Date("2024-01-15T01:15:00Z"),
    backup_time: "01:15:00",
    vps_region: "eu-west-1",
    status: "failed",
    size: 0,
    backup_type: "incremental",
    retention_days: 7,
    logs: ["Backup started", "Connection timeout", "Backup failed"],
    file_path: "",
    checksum: "",
  },
  {
    id: "bkp_003",
    database_name: "analytics_db",
    backup_date: new Date("2024-01-14T23:45:00Z"),
    backup_time: "23:45:00",
    vps_region: "ap-southeast-1",
    status: "in_progress",
    size: 1.2,
    backup_type: "differential",
    retention_days: 14,
    logs: ["Backup started", "Processing tables", "50% completed"],
    file_path: "/backups/analytics_db_20240114_234500.sql.gz",
    checksum: "",
  },
  {
    id: "bkp_004",
    database_name: "user_data_db",
    backup_date: new Date("2024-01-16T03:00:00Z"),
    backup_time: "03:00:00",
    vps_region: "us-west-2",
    status: "scheduled",
    size: 0,
    backup_type: "full",
    retention_days: 90,
    logs: ["Backup scheduled"],
    file_path: "",
    checksum: "",
  },
  {
    id: "bkp_005",
    database_name: "inventory_db",
    backup_date: new Date("2024-01-14T22:30:00Z"),
    backup_time: "22:30:00",
    vps_region: "eu-central-1",
    status: "success",
    size: 0.8,
    backup_type: "incremental",
    retention_days: 21,
    logs: [
      "Backup started",
      "Incremental changes detected",
      "Backup completed",
    ],
    file_path: "/backups/inventory_db_20240114_223000.sql.gz",
    checksum: "sha256:f6e5d4c3b2a1",
  },
];

// Status Badge Component
function StatusBadge({ status }: { status: DatabaseBackup["status"] }) {
  const statusConfig = {
    success: {
      variant: "success" as const,
      icon: CheckCircle,
      text: "Success",
    },
    failed: { variant: "destructive" as const, icon: XCircle, text: "Failed" },
    in_progress: {
      variant: "warning" as const,
      icon: RefreshCw,
      text: "In Progress",
    },
    scheduled: {
      variant: "secondary" as const,
      icon: Clock,
      text: "Scheduled",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon
        size={12}
        className={status === "in_progress" ? "animate-spin" : ""}
      />
      {config.text}
    </Badge>
  );
}

// Region Badge Component
function RegionBadge({ region }: { region: string }) {
  const regionNames: Record<string, string> = {
    "us-east-1": "N. Virginia",
    "us-west-2": "Oregon",
    "eu-west-1": "Ireland",
    "eu-central-1": "Frankfurt",
    "ap-southeast-1": "Singapore",
  };

  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Server size={12} />
      {regionNames[region] || region}
    </Badge>
  );
}

// Backup Type Badge Component
function BackupTypeBadge({ type }: { type: DatabaseBackup["backup_type"] }) {
  const typeConfig = {
    full: { color: "bg-blue-500", text: "Full" },
    incremental: { color: "bg-green-500", text: "Incremental" },
    differential: { color: "bg-orange-500", text: "Differential" },
  };

  const config = typeConfig[type];

  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", config.color)} />
      <span className="text-sm text-muted-foreground">{config.text}</span>
    </div>
  );
}

// Logs Modal Component
function LogsModal({
  logs,
  isOpen,
  onClose,
}: {
  logs: string[];
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Backup Logs</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XCircle size={16} />
          </Button>
        </div>
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{index + 1}.</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Database Backup Management Component
function DatabaseBackupManager() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedLogs, setSelectedLogs] = React.useState<string[]>([]);
  const [isLogsModalOpen, setIsLogsModalOpen] = React.useState(false);

  const columns: ColumnDef<DatabaseBackup>[] = [
    {
      accessorKey: "database_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Database
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Database size={16} className="text-muted-foreground" />
          <span className="font-medium">{row.getValue("database_name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "backup_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <DateBadge date={row.getValue("backup_date")} />
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {format(row.getValue("backup_date"), "MMM dd, yyyy")}
            </span>
            <span className="text-xs text-muted-foreground">
              {row.original.backup_time}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "vps_region",
      header: "Region",
      cell: ({ row }) => <RegionBadge region={row.getValue("vps_region")} />,
    },
    {
      accessorKey: "backup_type",
      header: "Type",
      cell: ({ row }) => <BackupTypeBadge type={row.getValue("backup_type")} />,
    },
    {
      accessorKey: "size",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const size = row.getValue("size") as number;
        return size > 0 ? `${size.toFixed(1)} GB` : "-";
      },
    },
    {
      accessorKey: "retention_days",
      header: "Retention",
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("retention_days")} days</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const backup = row.original;

        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedLogs(backup.logs);
                setIsLogsModalOpen(true);
              }}
              className="h-8 w-8"
            >
              <Eye size={14} />
            </Button>
            {backup.status === "success" && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download size={14} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sampleBackups,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const stats = React.useMemo(() => {
    const total = sampleBackups.length;
    const successful = sampleBackups.filter(
      (b) => b.status === "success"
    ).length;
    const failed = sampleBackups.filter((b) => b.status === "failed").length;
    const totalSize = sampleBackups.reduce((acc, b) => acc + b.size, 0);

    return { total, successful, failed, totalSize };
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Database Backups
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor your database backup operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Database size={16} className="mr-2" />
            New Backup
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.successful}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.failed}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalSize.toFixed(1)} GB
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search databases..."
            value={
              (table.getColumn("database_name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("database_name")
                ?.setFilterValue(event.target.value)
            }
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No backups found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Logs Modal */}
      <LogsModal
        logs={selectedLogs}
        isOpen={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
      />
    </div>
  );
}

export default function Component() {
  return <DatabaseBackupManager />;
}
