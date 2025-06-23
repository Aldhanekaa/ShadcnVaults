"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  Calendar,
  DollarSign,
  CreditCard,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

// Utility function
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Badge component
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        pending: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Status Badge component
const statusBadgeVariants = cva(
  "inline-flex items-center gap-x-2.5 rounded-full bg-background px-2.5 py-1.5 text-xs border",
  {
    variants: {
      status: {
        success: "",
        error: "",
        default: "",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  leftLabel: string;
  rightLabel: string;
}

function StatusBadge({
  className,
  status,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftLabel,
  rightLabel,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
        {LeftIcon && (
          <LeftIcon
            className={cn(
              "-ml-0.5 size-4 shrink-0",
              status === "success" && "text-emerald-600 dark:text-emerald-500",
              status === "error" && "text-red-600 dark:text-red-500"
            )}
          />
        )}
        {leftLabel}
      </span>
      <span className="h-4 w-px bg-border" />
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        {RightIcon && <RightIcon className="-ml-0.5 size-4 shrink-0" />}
        {rightLabel}
      </span>
    </span>
  );
}

// Data Table Types
export type DataTableColumn<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
};

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  className?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  showPagination?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
};

// Data Table Component
function DataTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  searchable = true,
  searchPlaceholder = "Search transactions...",
  itemsPerPage = 10,
  showPagination = true,
  striped = false,
  hoverable = true,
  bordered = true,
  compact = false,
  loading = false,
  emptyMessage = "No transactions found",
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );

  // Filter data based on search and column filters
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Global search
    if (search) {
      filtered = filtered.filter((row) =>
        columns.some((column) => {
          const value = row[column.key];
          return value?.toString().toLowerCase().includes(search.toLowerCase());
        })
      );
    }

    // Column filters
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((row) => {
          const rowValue = row[key as keyof T];
          return rowValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      }
    });

    return filtered;
  }, [data, search, columnFilters, columns]);

  // Sort data
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

  // Pagination
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, showPagination]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleColumnFilter = (key: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const clearColumnFilter = (key: string) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  if (loading) {
    return (
      <div className={cn("w-full bg-background rounded-lg border", className)}>
        <div className="animate-pulse p-6">
          {searchable && <div className="mb-6 h-11 bg-muted rounded-lg"></div>}
          <div className="border border-border overflow-hidden rounded-lg">
            <div className="bg-muted/30 h-14"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 border-t border-border bg-background"
              ></div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="h-4 bg-muted rounded w-48"></div>
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-muted rounded-lg"></div>
              <div className="h-9 w-9 bg-muted rounded-lg"></div>
              <div className="h-9 w-9 bg-muted rounded-lg"></div>
              <div className="h-9 w-16 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full bg-background rounded-lg",
        bordered && "border border-border",
        className
      )}
    >
      {/* Search and Filters */}
      {searchable && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 border-b border-border">
          <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div
        className={cn(
          "overflow-hidden",
          searchable ? "rounded-b-lg" : "rounded-lg"
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-muted/30">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "text-left font-medium text-muted-foreground bg-muted/30",
                      compact ? "px-4 py-3" : "px-6 py-4",
                      column.sortable &&
                        "cursor-pointer hover:bg-muted/50 transition-colors",
                      column.width && `w-[${column.width}]`
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    <div className="flex items-center justify-between">
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
                      {column.filterable && (
                        <div className="relative">
                          <Filter className="h-3 w-3 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    {/* Column Filter */}
                    {column.filterable && (
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Filter..."
                          value={columnFilters[String(column.key)] || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              String(column.key),
                              e.target.value
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="w-full px-3 py-1.5 text-xs border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                        />
                        {columnFilters[String(column.key)] && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearColumnFilter(String(column.key));
                            }}
                            className="absolute right-2 top-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-background">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className={cn(
                      "text-center text-muted-foreground bg-background",
                      compact ? "px-4 py-12" : "px-6 py-16"
                    )}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-4xl">💸</div>
                      <div className="font-medium">{emptyMessage}</div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "border-t border-border bg-background transition-colors",
                      striped && index % 2 === 0 && "bg-muted/20",
                      hoverable && "hover:bg-muted/30",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn(
                          "text-sm text-foreground",
                          compact ? "px-4 py-3" : "px-6 py-4"
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-background border-t border-border">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-input rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const pageNumber =
                  currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

                if (pageNumber < 1 || pageNumber > totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={cn(
                      "px-3 py-2 text-sm border border-input rounded-lg hover:bg-muted transition-colors",
                      currentPage === pageNumber &&
                        "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    )}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-input rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Transaction interface
interface MoneyTransferTransaction {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  destination: string;
  destinationType: "bank" | "wallet" | "card";
  paymentDate: string;
  disbursementDate: string;
  paymentStatus: "completed" | "pending" | "failed";
  disbursementStatus: "completed" | "pending" | "failed";
  paymentProcessor: string;
  platformFee: number;
  paymentFee: number;
  disbursementFee: number;
  netAmount: number;
  description?: string;
}

// Status rendering function
const renderStatus = (status: string) => {
  const statusConfig = {
    completed: {
      variant: "success" as const,
      icon: CheckCircle,
      label: "Completed",
    },
    pending: { variant: "pending" as const, icon: Clock, label: "Pending" },
    failed: { variant: "destructive" as const, icon: XCircle, label: "Failed" },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

// Currency formatter
const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Date formatter
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Main component
function MoneyTransferTransactionList() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<MoneyTransferTransaction | null>(null);

  // Sample data
  const transactions: MoneyTransferTransaction[] = [
    {
      id: "1",
      transactionId: "TXN-2024-001",
      amount: 1500.0,
      currency: "USD",
      destination: "**** **** **** 1234",
      destinationType: "card",
      paymentDate: "2024-01-15T10:30:00Z",
      disbursementDate: "2024-01-15T11:45:00Z",
      paymentStatus: "completed",
      disbursementStatus: "completed",
      paymentProcessor: "Stripe",
      platformFee: 15.0,
      paymentFee: 2.5,
      disbursementFee: 1.0,
      netAmount: 1481.5,
      description: "Salary payment",
    },
    {
      id: "2",
      transactionId: "TXN-2024-002",
      amount: 750.0,
      currency: "USD",
      destination: "wallet@example.com",
      destinationType: "wallet",
      paymentDate: "2024-01-14T14:20:00Z",
      disbursementDate: "2024-01-14T14:25:00Z",
      paymentStatus: "completed",
      disbursementStatus: "pending",
      paymentProcessor: "PayPal",
      platformFee: 7.5,
      paymentFee: 1.25,
      disbursementFee: 0.75,
      netAmount: 740.5,
      description: "Freelance payment",
    },
    {
      id: "3",
      transactionId: "TXN-2024-003",
      amount: 2000.0,
      currency: "USD",
      destination: "Bank of America ****5678",
      destinationType: "bank",
      paymentDate: "2024-01-13T09:15:00Z",
      disbursementDate: "",
      paymentStatus: "failed",
      disbursementStatus: "failed",
      paymentProcessor: "Square",
      platformFee: 20.0,
      paymentFee: 3.0,
      disbursementFee: 2.0,
      netAmount: 1975.0,
      description: "Refund payment",
    },
    {
      id: "4",
      transactionId: "TXN-2024-004",
      amount: 500.0,
      currency: "USD",
      destination: "**** **** **** 9876",
      destinationType: "card",
      paymentDate: "2024-01-12T16:45:00Z",
      disbursementDate: "2024-01-12T17:00:00Z",
      paymentStatus: "completed",
      disbursementStatus: "completed",
      paymentProcessor: "Adyen",
      platformFee: 5.0,
      paymentFee: 1.0,
      disbursementFee: 0.5,
      netAmount: 493.5,
      description: "Bonus payment",
    },
    {
      id: "5",
      transactionId: "TXN-2024-005",
      amount: 1200.0,
      currency: "USD",
      destination: "crypto@wallet.com",
      destinationType: "wallet",
      paymentDate: "2024-01-11T12:30:00Z",
      disbursementDate: "",
      paymentStatus: "pending",
      disbursementStatus: "pending",
      paymentProcessor: "Coinbase",
      platformFee: 12.0,
      paymentFee: 2.0,
      disbursementFee: 1.5,
      netAmount: 1184.5,
      description: "Investment return",
    },
  ];

  const columns: DataTableColumn<MoneyTransferTransaction>[] = [
    {
      key: "transactionId",
      header: "Transaction ID",
      sortable: true,
      filterable: true,
      width: "150px",
      render: (value) => (
        <div className="font-mono text-sm font-medium">{value}</div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      width: "120px",
      render: (value, row) => (
        <div className="font-semibold">
          {formatCurrency(value, row.currency)}
        </div>
      ),
    },
    {
      key: "destination",
      header: "Destination",
      filterable: true,
      width: "200px",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {row.destinationType === "bank" && (
            <Building className="h-4 w-4 text-blue-500" />
          )}
          {row.destinationType === "card" && (
            <CreditCard className="h-4 w-4 text-green-500" />
          )}
          {row.destinationType === "wallet" && (
            <DollarSign className="h-4 w-4 text-purple-500" />
          )}
          <span className="truncate">{value}</span>
        </div>
      ),
    },
    {
      key: "paymentDate",
      header: "Payment Date",
      sortable: true,
      width: "180px",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{formatDate(value)}</span>
        </div>
      ),
    },
    {
      key: "disbursementDate",
      header: "Disbursement Date",
      sortable: true,
      width: "180px",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{value ? formatDate(value) : "N/A"}</span>
        </div>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      filterable: true,
      width: "140px",
      render: (value) => renderStatus(value),
    },
    {
      key: "disbursementStatus",
      header: "Disbursement Status",
      filterable: true,
      width: "160px",
      render: (value) => renderStatus(value),
    },
    {
      key: "paymentProcessor",
      header: "Processor",
      filterable: true,
      width: "120px",
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "platformFee",
      header: "Platform Fee",
      sortable: true,
      width: "120px",
      render: (value, row) => (
        <div className="text-sm font-medium text-green-600">
          +{formatCurrency(value, row.currency)}
        </div>
      ),
    },
    {
      key: "netAmount",
      header: "Net Amount",
      sortable: true,
      width: "120px",
      render: (value, row) => (
        <div className="font-semibold text-blue-600">
          {formatCurrency(value, row.currency)}
        </div>
      ),
    },
    {
      key: "id",
      header: "Actions",
      width: "80px",
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTransaction(row);
          }}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          <Eye className="h-4 w-4 text-muted-foreground" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Money Transfer Transactions
        </h1>
        <p className="text-muted-foreground">
          Track and manage all money transfer transactions with detailed payment
          and disbursement information.
        </p>
      </div>

      <DataTable
        data={transactions}
        columns={columns}
        searchable
        searchPlaceholder="Search by transaction ID, destination, or processor..."
        itemsPerPage={10}
        showPagination
        hoverable
        bordered
        onRowClick={(row) => setSelectedTransaction(row)}
        className="shadow-sm"
      />

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Transaction Details</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Transaction Info</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Transaction ID
                      </label>
                      <div className="font-mono text-sm">
                        {selectedTransaction.transactionId}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Amount
                      </label>
                      <div className="text-lg font-semibold">
                        {formatCurrency(
                          selectedTransaction.amount,
                          selectedTransaction.currency
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Destination
                      </label>
                      <div className="flex items-center gap-2">
                        {selectedTransaction.destinationType === "bank" && (
                          <Building className="h-4 w-4 text-blue-500" />
                        )}
                        {selectedTransaction.destinationType === "card" && (
                          <CreditCard className="h-4 w-4 text-green-500" />
                        )}
                        {selectedTransaction.destinationType === "wallet" && (
                          <DollarSign className="h-4 w-4 text-purple-500" />
                        )}
                        {selectedTransaction.destination}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Payment Processor
                      </label>
                      <div>
                        <Badge variant="outline">
                          {selectedTransaction.paymentProcessor}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Status & Timing</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Payment Status
                      </label>
                      <div>
                        {renderStatus(selectedTransaction.paymentStatus)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Disbursement Status
                      </label>
                      <div>
                        {renderStatus(selectedTransaction.disbursementStatus)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Payment Date
                      </label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {formatDate(selectedTransaction.paymentDate)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Disbursement Date
                      </label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {selectedTransaction.disbursementDate
                          ? formatDate(selectedTransaction.disbursementDate)
                          : "Pending"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Fee Breakdown</h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span>Original Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        selectedTransaction.amount,
                        selectedTransaction.currency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Platform Fee (Revenue):</span>
                    <span className="font-medium">
                      +
                      {formatCurrency(
                        selectedTransaction.platformFee,
                        selectedTransaction.currency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Payment Fee:</span>
                    <span className="font-medium">
                      -
                      {formatCurrency(
                        selectedTransaction.paymentFee,
                        selectedTransaction.currency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Disbursement Fee:</span>
                    <span className="font-medium">
                      -
                      {formatCurrency(
                        selectedTransaction.disbursementFee,
                        selectedTransaction.currency
                      )}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-semibold">
                    <span>Net Amount:</span>
                    <span className="text-blue-600">
                      {formatCurrency(
                        selectedTransaction.netAmount,
                        selectedTransaction.currency
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {selectedTransaction.description && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    {selectedTransaction.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoneyTransferTransactionList;
