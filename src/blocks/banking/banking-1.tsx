"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  DollarSign,
  CreditCard,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface MoneyTransferTransaction {
  id: string;
  amount: number;
  currency: string;
  destination: {
    name: string;
    account: string;
    bank?: string;
  };
  payment: {
    paidAt: Date;
    status: "completed" | "pending" | "failed";
    processor: string;
    fee: number;
  };
  disbursement: {
    processedAt: Date | null;
    status: "completed" | "pending" | "failed" | "processing";
    fee: number;
  };
  platformFee: number;
  totalFees: number;
  netAmount: number;
}

const MoneyTransferDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<MoneyTransferTransaction | null>(null);

  const mockTransactions: MoneyTransferTransaction[] = [
    {
      id: "TXN-001",
      amount: 1500.0,
      currency: "USD",
      destination: {
        name: "John Smith",
        account: "****1234",
        bank: "Chase Bank",
      },
      payment: {
        paidAt: new Date("2024-01-15T10:30:00"),
        status: "completed",
        processor: "Stripe",
        fee: 45.0,
      },
      disbursement: {
        processedAt: new Date("2024-01-15T11:15:00"),
        status: "completed",
        fee: 25.0,
      },
      platformFee: 30.0,
      totalFees: 100.0,
      netAmount: 1400.0,
    },
    {
      id: "TXN-002",
      amount: 750.0,
      currency: "USD",
      destination: {
        name: "Maria Garcia",
        account: "****5678",
        bank: "Bank of America",
      },
      payment: {
        paidAt: new Date("2024-01-15T14:20:00"),
        status: "completed",
        processor: "PayPal",
        fee: 22.5,
      },
      disbursement: {
        processedAt: null,
        status: "processing",
        fee: 15.0,
      },
      platformFee: 15.0,
      totalFees: 52.5,
      netAmount: 697.5,
    },
    {
      id: "TXN-003",
      amount: 2200.0,
      currency: "USD",
      destination: {
        name: "David Wilson",
        account: "****9012",
        bank: "Wells Fargo",
      },
      payment: {
        paidAt: new Date("2024-01-14T16:45:00"),
        status: "failed",
        processor: "Square",
        fee: 66.0,
      },
      disbursement: {
        processedAt: null,
        status: "pending",
        fee: 35.0,
      },
      platformFee: 44.0,
      totalFees: 145.0,
      netAmount: 2055.0,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-600",
      },
      pending: {
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-600",
      },
      processing: {
        variant: "outline" as const,
        icon: AlertCircle,
        color: "text-blue-600",
      },
      failed: {
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.destination.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      transaction.payment.status === statusFilter ||
      transaction.disbursement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Money Transfer Transactions
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your transfer transactions
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Volume
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    $4,450.00
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Platform Revenue
                  </p>
                  <p className="text-2xl font-bold text-foreground">$89.00</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Fees
                  </p>
                  <p className="text-2xl font-bold text-foreground">$297.50</p>
                </div>
                <CreditCard className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Transactions
                  </p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by transaction ID or recipient name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Disbursement Status</TableHead>
                    <TableHead>Platform Fee</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {transaction.destination.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.destination.account} •{" "}
                            {transaction.destination.bank}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Net: {formatCurrency(transaction.netAmount)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(transaction.payment.status)}
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(transaction.payment.paidAt)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(transaction.disbursement.status)}
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(
                              transaction.disbursement.processedAt
                            )}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-green-600">
                          {formatCurrency(transaction.platformFee)}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <Card className="fixed inset-4 z-50 bg-background border shadow-lg overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                Transaction Details - {selectedTransaction.id}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTransaction(null)}
              >
                Close
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      {getStatusBadge(selectedTransaction.payment.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Paid At:</span>
                      <span>
                        {formatDateTime(selectedTransaction.payment.paidAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processor:</span>
                      <span>{selectedTransaction.payment.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Fee:
                      </span>
                      <span>
                        {formatCurrency(selectedTransaction.payment.fee)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Disbursement Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Disbursement Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      {getStatusBadge(selectedTransaction.disbursement.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Processed At:
                      </span>
                      <span>
                        {formatDateTime(
                          selectedTransaction.disbursement.processedAt
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Disbursement Fee:
                      </span>
                      <span>
                        {formatCurrency(selectedTransaction.disbursement.fee)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Financial Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Transfer Amount:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(selectedTransaction.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Platform Fee:
                      </span>
                      <span className="text-green-600 font-medium">
                        {formatCurrency(selectedTransaction.platformFee)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Fee:
                      </span>
                      <span className="text-red-600">
                        {formatCurrency(selectedTransaction.payment.fee)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Disbursement Fee:
                      </span>
                      <span className="text-red-600">
                        {formatCurrency(selectedTransaction.disbursement.fee)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Fees:</span>
                      <span className="text-red-600 font-medium">
                        {formatCurrency(selectedTransaction.totalFees)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Net Amount:</span>
                      <span className="font-bold text-lg">
                        {formatCurrency(selectedTransaction.netAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Destination Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Destination Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Recipient Name:
                    </span>
                    <span>{selectedTransaction.destination.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account:</span>
                    <span>{selectedTransaction.destination.account}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank:</span>
                    <span>{selectedTransaction.destination.bank}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MoneyTransferDashboard;
