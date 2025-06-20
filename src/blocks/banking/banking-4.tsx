"use client";

import * as React from "react";
import { useState, useMemo } from "react";
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
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

// Utility function
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Badge component
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white",
        warning: "border-transparent bg-yellow-500 text-white",
        pending: "border-transparent bg-blue-500 text-white",
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

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (search) {
      filtered = filtered.filter((row) =>
        columns.some((column) => {
          const value = row[column.key];
          return value?.toString().toLowerCase().includes(search.toLowerCase());
        })
      );
    }

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
      <div className={cn("w-full bg-card rounded-2xl", className)}>
        <div className="animate-pulse p-6">
          {searchable && <div className="mb-6 h-11 bg-muted rounded-2xl"></div>}
          <div className="border border-border overflow-hidden">
            <div className="bg-muted/30 h-14"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 border-t border-border bg-card"
              ></div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="h-4 bg-muted rounded w-48"></div>
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-muted rounded-2xl"></div>
              <div className="h-9 w-9 bg-muted rounded-2xl"></div>
              <div className="h-9 w-9 bg-muted rounded-2xl"></div>
              <div className="h-9 w-16 bg-muted rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full bg-card rounded-2xl",
        bordered && "border border-border",
        className
      )}
    >
      {searchable && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-border">
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
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-2xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden bg-muted/30",
          searchable ? "rounded-b-2xl" : "rounded-2xl"
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
            <tbody className="bg-card">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className={cn(
                      "text-center text-muted-foreground bg-card",
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
                      "border-t border-border bg-card transition-colors",
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

      {showPagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border-t border-border">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-input rounded-2xl hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                      "px-3 py-2 text-sm border border-input rounded-2xl hover:bg-muted transition-colors",
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
              className="px-3 py-2 text-sm border border-input rounded-2xl hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
}

// Money Transfer Transaction List Component
function MoneyTransferTransactionList() {
  const [loading, setLoading] = useState(false);

  // Sample data with default values
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
    },
    {
      id: "2",
      transactionId: "TXN-2024-002",
      amount: 750.0,
      currency: "USD",
      destination: "john.doe@wallet.com",
      destinationType: "wallet",
      paymentDate: "2024-01-14T14:20:00Z",
      disbursementDate: "2024-01-14T15:30:00Z",
      paymentStatus: "completed",
      disbursementStatus: "pending",
      paymentProcessor: "PayPal",
      platformFee: 7.5,
      paymentFee: 1.25,
      disbursementFee: 0.75,
      netAmount: 740.5,
    },
    {
      id: "3",
      transactionId: "TXN-2024-003",
      amount: 2250.0,
      currency: "USD",
      destination: "Bank of America ****5678",
      destinationType: "bank",
      paymentDate: "2024-01-13T09:15:00Z",
      disbursementDate: "",
      paymentStatus: "completed",
      disbursementStatus: "failed",
      paymentProcessor: "Square",
      platformFee: 22.5,
      paymentFee: 3.75,
      disbursementFee: 2.25,
      netAmount: 2221.5,
    },
    {
      id: "4",
      transactionId: "TXN-2024-004",
      amount: 500.0,
      currency: "USD",
      destination: "**** **** **** 9876",
      destinationType: "card",
      paymentDate: "2024-01-12T16:45:00Z",
      disbursementDate: "2024-01-12T17:20:00Z",
      paymentStatus: "pending",
      disbursementStatus: "pending",
      paymentProcessor: "Adyen",
      platformFee: 5.0,
      paymentFee: 0.85,
      disbursementFee: 0.5,
      netAmount: 493.65,
    },
    {
      id: "5",
      transactionId: "TXN-2024-005",
      amount: 3200.0,
      currency: "USD",
      destination: "crypto.wallet@blockchain.com",
      destinationType: "wallet",
      paymentDate: "2024-01-11T12:00:00Z",
      disbursementDate: "2024-01-11T13:15:00Z",
      paymentStatus: "completed",
      disbursementStatus: "completed",
      paymentProcessor: "Coinbase",
      platformFee: 32.0,
      paymentFee: 5.4,
      disbursementFee: 3.2,
      netAmount: 3159.4,
    },
  ];

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="w-3 h-3" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="pending" className="gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDestinationIcon = (type: string) => {
    switch (type) {
      case "bank":
        return <Building className="w-4 h-4" />;
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "wallet":
        return <DollarSign className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const columns: DataTableColumn<MoneyTransferTransaction>[] = [
    {
      key: "transactionId",
      header: "Transaction ID",
      sortable: true,
      filterable: true,
      render: (value) => (
        <div className="font-mono text-sm font-medium">{value}</div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (value, row) => (
        <div className="font-semibold text-lg">
          {formatCurrency(value, row.currency)}
        </div>
      ),
    },
    {
      key: "destination",
      header: "Destination",
      filterable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {getDestinationIcon(row.destinationType)}
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground capitalize">
              {row.destinationType}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "paymentDate",
      header: "Payment Date",
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{formatDateTime(value)}</span>
        </div>
      ),
    },
    {
      key: "disbursementDate",
      header: "Disbursement Date",
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{formatDateTime(value)}</span>
        </div>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      filterable: true,
      render: (value, row) => (
        <StatusBadge
          leftIcon={
            value === "completed"
              ? CheckCircle
              : value === "pending"
              ? Clock
              : XCircle
          }
          rightIcon={ArrowUpRight}
          leftLabel="Payment"
          rightLabel={value}
          status={
            value === "completed"
              ? "success"
              : value === "failed"
              ? "error"
              : "default"
          }
        />
      ),
    },
    {
      key: "disbursementStatus",
      header: "Disbursement Status",
      filterable: true,
      render: (value, row) => (
        <StatusBadge
          leftIcon={
            value === "completed"
              ? CheckCircle
              : value === "pending"
              ? Clock
              : XCircle
          }
          rightIcon={ArrowDownRight}
          leftLabel="Disbursement"
          rightLabel={value}
          status={
            value === "completed"
              ? "success"
              : value === "failed"
              ? "error"
              : "default"
          }
        />
      ),
    },
    {
      key: "paymentProcessor",
      header: "Processor",
      filterable: true,
      render: (value) => (
        <Badge variant="outline" className="gap-1">
          <CreditCard className="w-3 h-3" />
          {value}
        </Badge>
      ),
    },
    {
      key: "platformFee",
      header: "Platform Fee",
      sortable: true,
      render: (value, row) => (
        <div className="text-green-600 font-medium">
          +{formatCurrency(value, row.currency)}
        </div>
      ),
    },
    {
      key: "paymentFee",
      header: "Payment Fee",
      sortable: true,
      render: (value, row) => (
        <div className="text-red-600 font-medium">
          -{formatCurrency(value, row.currency)}
        </div>
      ),
    },
    {
      key: "disbursementFee",
      header: "Disbursement Fee",
      sortable: true,
      render: (value, row) => (
        <div className="text-red-600 font-medium">
          -{formatCurrency(value, row.currency)}
        </div>
      ),
    },
    {
      key: "netAmount",
      header: "Net Amount",
      sortable: true,
      render: (value, row) => (
        <div className="font-bold text-lg text-primary">
          {formatCurrency(value, row.currency)}
        </div>
      ),
    },
  ];

  const handleRowClick = (transaction: MoneyTransferTransaction) => {
    console.log("Transaction details:", transaction);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Money Transfer Transactions
        </h1>
        <p className="text-muted-foreground">
          Detailed view of all money transfer transactions including payment and
          disbursement status, fees, and revenue data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">
              Total Volume
            </span>
          </div>
          <div className="text-2xl font-bold mt-1">
            {formatCurrency(transactions.reduce((sum, t) => sum + t.amount, 0))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">
              Platform Revenue
            </span>
          </div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            {formatCurrency(
              transactions.reduce((sum, t) => sum + t.platformFee, 0)
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-muted-foreground">
              Total Fees Paid
            </span>
          </div>
          <div className="text-2xl font-bold mt-1 text-red-600">
            {formatCurrency(
              transactions.reduce(
                (sum, t) => sum + t.paymentFee + t.disbursementFee,
                0
              )
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">
              Success Rate
            </span>
          </div>
          <div className="text-2xl font-bold mt-1">
            {Math.round(
              (transactions.filter((t) => t.paymentStatus === "completed")
                .length /
                transactions.length) *
                100
            )}
            %
          </div>
        </div>
      </div>

      <DataTable
        data={transactions}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search by transaction ID, destination, or processor..."
        itemsPerPage={10}
        showPagination={true}
        hoverable={true}
        loading={loading}
        onRowClick={handleRowClick}
        emptyMessage="No money transfer transactions found"
      />
    </div>
  );
}

export default MoneyTransferTransactionList;
