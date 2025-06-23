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
  CreditCard,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { format, getDate } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

function DateBadge({
  date: rawDate,
  time = false,
  tooltip = true,
}: {
  date: string | Date;
  time?: boolean;
  tooltip?: boolean;
}) {
  const date = getDate(rawDate);
  const month = format(rawDate, "LLL");
  const fullDate = format(rawDate, time ? "PPPP - kk:mm" : "PPPP");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="bg-background/40 flex size-10 shrink-0 cursor-default flex-col items-center justify-center rounded-md border text-center">
            <span className="text-sm font-semibold leading-snug">{date}</span>
            <span className="text-muted-foreground text-xs leading-none">
              {month}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="shadow-md">{fullDate}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface MoneyTransferTransaction {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  destination: {
    name: string;
    accountNumber: string;
    bankName: string;
  };
  paymentDateTime: Date;
  disbursementDateTime: Date | null;
  paymentStatus: "pending" | "processing" | "completed" | "failed";
  disbursementStatus: "pending" | "processing" | "completed" | "failed";
  paymentProcessor: string;
  platformFee: number;
  paymentFee: number;
  disbursementFee: number;
  totalFees: number;
  netAmount: number;
}

const mockData: MoneyTransferTransaction[] = [
  {
    id: "1",
    transactionId: "TXN-2024-001",
    amount: 1000.0,
    currency: "USD",
    destination: {
      name: "John Doe",
      accountNumber: "****1234",
      bankName: "Chase Bank",
    },
    paymentDateTime: new Date("2024-01-15T10:30:00"),
    disbursementDateTime: new Date("2024-01-15T14:45:00"),
    paymentStatus: "completed",
    disbursementStatus: "completed",
    paymentProcessor: "Stripe",
    platformFee: 15.0,
    paymentFee: 2.9,
    disbursementFee: 1.5,
    totalFees: 19.4,
    netAmount: 980.6,
  },
  {
    id: "2",
    transactionId: "TXN-2024-002",
    amount: 750.0,
    currency: "USD",
    destination: {
      name: "Jane Smith",
      accountNumber: "****5678",
      bankName: "Bank of America",
    },
    paymentDateTime: new Date("2024-01-16T09:15:00"),
    disbursementDateTime: null,
    paymentStatus: "completed",
    disbursementStatus: "processing",
    paymentProcessor: "PayPal",
    platformFee: 11.25,
    paymentFee: 2.2,
    disbursementFee: 1.25,
    totalFees: 14.7,
    netAmount: 735.3,
  },
  {
    id: "3",
    transactionId: "TXN-2024-003",
    amount: 2500.0,
    currency: "USD",
    destination: {
      name: "Robert Johnson",
      accountNumber: "****9012",
      bankName: "Wells Fargo",
    },
    paymentDateTime: new Date("2024-01-17T16:20:00"),
    disbursementDateTime: new Date("2024-01-18T11:30:00"),
    paymentStatus: "completed",
    disbursementStatus: "completed",
    paymentProcessor: "Square",
    platformFee: 37.5,
    paymentFee: 7.25,
    disbursementFee: 3.75,
    totalFees: 48.5,
    netAmount: 2451.5,
  },
  {
    id: "4",
    transactionId: "TXN-2024-004",
    amount: 500.0,
    currency: "USD",
    destination: {
      name: "Maria Garcia",
      accountNumber: "****3456",
      bankName: "Citibank",
    },
    paymentDateTime: new Date("2024-01-18T13:45:00"),
    disbursementDateTime: null,
    paymentStatus: "failed",
    disbursementStatus: "pending",
    paymentProcessor: "Stripe",
    platformFee: 7.5,
    paymentFee: 1.45,
    disbursementFee: 0.75,
    totalFees: 9.7,
    netAmount: 490.3,
  },
  {
    id: "5",
    transactionId: "TXN-2024-005",
    amount: 1250.0,
    currency: "USD",
    destination: {
      name: "David Wilson",
      accountNumber: "****7890",
      bankName: "TD Bank",
    },
    paymentDateTime: new Date("2024-01-19T08:30:00"),
    disbursementDateTime: null,
    paymentStatus: "processing",
    disbursementStatus: "pending",
    paymentProcessor: "PayPal",
    platformFee: 18.75,
    paymentFee: 3.63,
    disbursementFee: 1.88,
    totalFees: 24.26,
    netAmount: 1225.74,
  },
];

function StatusBadge({
  status,
  type,
}: {
  status: string;
  type: "payment" | "disbursement";
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          variant: "default",
          className: "bg-green-100 text-green-800 hover:bg-green-100",
        };
      case "processing":
        return {
          icon: Clock,
          variant: "secondary",
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        };
      case "pending":
        return {
          icon: AlertCircle,
          variant: "outline",
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        };
      case "failed":
        return {
          icon: XCircle,
          variant: "destructive",
          className: "bg-red-100 text-red-800 hover:bg-red-100",
        };
      default:
        return { icon: AlertCircle, variant: "outline", className: "" };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant as any}
      className={cn("flex items-center gap-1", config.className)}
    >
      <Icon className="h-3 w-3" />
      <span className="capitalize">{status}</span>
    </Badge>
  );
}

const columns: ColumnDef<MoneyTransferTransaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Transaction ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("transactionId")}</div>
    ),
  },
  {
    accessorKey: "paymentDateTime",
    header: "Payment Date",
    cell: ({ row }) => (
      <DateBadge date={row.getValue("paymentDateTime")} time />
    ),
  },
  {
    accessorKey: "disbursementDateTime",
    header: "Disbursement Date",
    cell: ({ row }) => {
      const date = row.getValue("disbursementDateTime") as Date | null;
      return date ? (
        <DateBadge date={date} time />
      ) : (
        <span className="text-muted-foreground text-sm">Pending</span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const currency = row.original.currency;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const destination = row.getValue(
        "destination"
      ) as MoneyTransferTransaction["destination"];
      return (
        <div className="space-y-1">
          <div className="font-medium">{destination.name}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Building className="h-3 w-3" />
            {destination.bankName}
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {destination.accountNumber}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("paymentStatus")} type="payment" />
    ),
  },
  {
    accessorKey: "disbursementStatus",
    header: "Disbursement Status",
    cell: ({ row }) => (
      <StatusBadge
        status={row.getValue("disbursementStatus")}
        type="disbursement"
      />
    ),
  },
  {
    accessorKey: "paymentProcessor",
    header: "Payment Processor",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("paymentProcessor")}</span>
      </div>
    ),
  },
  {
    accessorKey: "fees",
    header: "Fees Breakdown",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-1 cursor-help">
                <div className="text-sm font-medium">
                  ${transaction.totalFees.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Platform: ${transaction.platformFee.toFixed(2)}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="space-y-1">
              <div>Platform Fee: ${transaction.platformFee.toFixed(2)}</div>
              <div>Payment Fee: ${transaction.paymentFee.toFixed(2)}</div>
              <div>
                Disbursement Fee: ${transaction.disbursementFee.toFixed(2)}
              </div>
              <div className="border-t pt-1 font-medium">
                Total: ${transaction.totalFees.toFixed(2)}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "netAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Net Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const netAmount = parseFloat(row.getValue("netAmount"));
      const currency = row.original.currency;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(netAmount);

      return <div className="font-medium text-green-600">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(transaction.transactionId)
              }
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Download receipt</DropdownMenuItem>
            <DropdownMenuItem>Refund transaction</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function MoneyTransferTransactionTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: mockData,
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

  const totalAmount = mockData.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const totalFees = mockData.reduce(
    (sum, transaction) => sum + transaction.totalFees,
    0
  );
  const totalPlatformFees = mockData.reduce(
    (sum, transaction) => sum + transaction.platformFee,
    0
  );

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Money Transfer Transactions</CardTitle>
          <CardDescription>
            Detailed view of all money transfer transactions with payment and
            disbursement tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Volume</div>
              <div className="text-2xl font-bold">
                $
                {totalAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">
                Platform Revenue
              </div>
              <div className="text-2xl font-bold text-green-600">
                $
                {totalPlatformFees.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Fees</div>
              <div className="text-2xl font-bold">
                $
                {totalFees.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center py-4 gap-4">
            <Input
              placeholder="Filter by transaction ID..."
              value={
                (table
                  .getColumn("transactionId")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("transactionId")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
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
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
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
        </CardContent>
      </Card>
    </div>
  );
}

export default MoneyTransferTransactionTable;
