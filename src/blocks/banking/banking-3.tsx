"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  Filter,
  Search,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Card components
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

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Input component
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

// Button component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        variant === "outline" &&
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 rounded-md px-3 text-xs",
        size === "lg" && "h-10 rounded-md px-8",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Badge component
const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "success" | "warning" | "destructive" | "secondary";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" &&
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        variant === "success" &&
          "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        variant === "warning" &&
          "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        variant === "destructive" &&
          "border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        variant === "secondary" &&
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

// Types
interface MoneyTransferTransaction {
  id: string;
  amount: number;
  currency: string;
  destination: {
    name: string;
    accountNumber: string;
    bankName: string;
  };
  paymentDate: Date;
  disbursementDate: Date | null;
  paymentStatus: "pending" | "completed" | "failed";
  disbursementStatus: "pending" | "processing" | "completed" | "failed";
  paymentProcessor: string;
  platformFee: number;
  paymentFee: number;
  disbursementFee: number;
  transactionReference: string;
}

interface MoneyTransferListProps {
  transactions?: MoneyTransferTransaction[];
  onViewDetails?: (transactionId: string) => void;
  className?: string;
}

// Default data
const defaultTransactions: MoneyTransferTransaction[] = [
  {
    id: "TXN-001",
    amount: 1500000,
    currency: "IDR",
    destination: {
      name: "John Doe",
      accountNumber: "1234567890",
      bankName: "Bank Central Asia",
    },
    paymentDate: new Date("2024-01-15T10:30:00"),
    disbursementDate: new Date("2024-01-15T10:35:00"),
    paymentStatus: "completed",
    disbursementStatus: "completed",
    paymentProcessor: "Midtrans",
    platformFee: 15000,
    paymentFee: 5000,
    disbursementFee: 2500,
    transactionReference: "REF-001-2024",
  },
  {
    id: "TXN-002",
    amount: 750000,
    currency: "IDR",
    destination: {
      name: "Jane Smith",
      accountNumber: "0987654321",
      bankName: "Bank Mandiri",
    },
    paymentDate: new Date("2024-01-15T14:20:00"),
    disbursementDate: null,
    paymentStatus: "completed",
    disbursementStatus: "processing",
    paymentProcessor: "Xendit",
    platformFee: 7500,
    paymentFee: 3000,
    disbursementFee: 2000,
    transactionReference: "REF-002-2024",
  },
  {
    id: "TXN-003",
    amount: 2250000,
    currency: "IDR",
    destination: {
      name: "Robert Johnson",
      accountNumber: "5678901234",
      bankName: "Bank Negara Indonesia",
    },
    paymentDate: new Date("2024-01-15T16:45:00"),
    disbursementDate: new Date("2024-01-15T16:50:00"),
    paymentStatus: "completed",
    disbursementStatus: "completed",
    paymentProcessor: "OVO",
    platformFee: 22500,
    paymentFee: 7500,
    disbursementFee: 3000,
    transactionReference: "REF-003-2024",
  },
  {
    id: "TXN-004",
    amount: 500000,
    currency: "IDR",
    destination: {
      name: "Sarah Wilson",
      accountNumber: "3456789012",
      bankName: "Bank Rakyat Indonesia",
    },
    paymentDate: new Date("2024-01-15T18:15:00"),
    disbursementDate: null,
    paymentStatus: "failed",
    disbursementStatus: "pending",
    paymentProcessor: "GoPay",
    platformFee: 5000,
    paymentFee: 2500,
    disbursementFee: 1500,
    transactionReference: "REF-004-2024",
  },
];

const MoneyTransferList: React.FC<MoneyTransferListProps> = ({
  transactions = defaultTransactions,
  onViewDetails,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "processing":
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "processing":
        return <Badge variant="default">Processing</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const filteredAndSortedTransactions = React.useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      const matchesSearch =
        transaction.destination.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.transactionReference
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.destination.bankName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        transaction.paymentStatus === statusFilter ||
        transaction.disbursementStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = a.paymentDate.getTime() - b.paymentDate.getTime();
      } else if (sortBy === "amount") {
        comparison = a.amount - b.amount;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleSort = (field: "date" | "amount") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Money Transfer Transactions
          </h2>
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedTransactions.length} transactions
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by recipient, reference, or bank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort("date")}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Date
              <ArrowUpDown className="w-3 h-3" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort("amount")}
              className="flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Amount
              <ArrowUpDown className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAndSortedTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Transaction Info */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {transaction.destination.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {transaction.destination.bankName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Account: {transaction.destination.accountNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {formatCurrency(
                              transaction.amount,
                              transaction.currency
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.transactionReference}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="w-4 h-4" />
                        <span>{transaction.paymentProcessor}</span>
                      </div>
                    </div>

                    {/* Status and Dates */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Payment Status
                          </span>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(transaction.paymentStatus)}
                            {getStatusBadge(transaction.paymentStatus)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Disbursement Status
                          </span>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(transaction.disbursementStatus)}
                            {getStatusBadge(transaction.disbursementStatus)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Payment:
                          </span>
                          <span>{formatDateTime(transaction.paymentDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Disbursement:
                          </span>
                          <span>
                            {formatDateTime(transaction.disbursementDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Fees and Actions */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">
                          Fee Breakdown
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Platform Fee:
                            </span>
                            <span className="font-medium text-green-600">
                              {formatCurrency(
                                transaction.platformFee,
                                transaction.currency
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Payment Fee:
                            </span>
                            <span>
                              {formatCurrency(
                                transaction.paymentFee,
                                transaction.currency
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Disbursement Fee:
                            </span>
                            <span>
                              {formatCurrency(
                                transaction.disbursementFee,
                                transaction.currency
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails?.(transaction.id)}
                        className="w-full flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAndSortedTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Usage example
export default function MoneyTransferDemo() {
  const handleViewDetails = (transactionId: string) => {
    console.log("Viewing details for transaction:", transactionId);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <MoneyTransferList onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
}
