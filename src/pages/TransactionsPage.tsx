import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useWallets } from "@/hooks/useWallets";
import { useCategories } from "@/hooks/useCategories";
import { type TransactionFilters } from "@/api/transactions";
import { getDateRange } from "@/utils/dateRange";
import { formatCurrency } from "@/utils/Currency";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
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
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRightLeft,
  Wallet,
  Tag,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import AddTransactionDialog from "@/components/transactions/AddTransactionDialog";

export default function TransactionsPage() {
  const { data: user } = useUser();
  const currencyCode = user?.currency || "USD";

  const { wallets } = useWallets();
  const { categories } = useCategories();
  
  const [ date, setDate ] = useState<{ from?: Date , to?: Date } | undefined>();

  // --- STATE MANAGEMENT ---
  // Default to "This Month" and Page 0
  const defaultDateRange = getDateRange("THIS_MONTH");
  const [activeDateFilter, setActiveDateFilter] = useState<string>("THIS_MONTH");

  const [filters, setFilters] = useState<TransactionFilters>({
    page: 0,
    size: 10,
    startDate: defaultDateRange.startDate,
    endDate: defaultDateRange.endDate,
    type: "", // empty string means "All"
    walletId: "",
    categoryId: "",
  });

  // Fetch data using our smart hook
  const { data: pageData, isLoading, isFetching } = useTransactions(filters);

  // --- HANDLERS ---
  const handleDateFilterClick = (
    rangeType: "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS" | "ALL_TIME",
  ) => {
    setActiveDateFilter(rangeType);
    if (rangeType === "ALL_TIME") {
      setFilters({ ...filters, startDate: "", endDate: "", page: 0 });
    } else {
      const dates = getDateRange(rangeType);
      setFilters({
        ...filters,
        startDate: dates.startDate,
        endDate: dates.endDate,
        page: 0,
      });
    }
  };

  const handleFilterChange = (key: keyof TransactionFilters, value: string) => {
    setFilters({ ...filters, [key]: value, page: 0 }); // Always reset to page 0 when filtering
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  // --- RENDER HELPERS ---
  const renderTransactionIcon = (type: string) => {
    if (type === "INCOME")
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      );
    if (type === "EXPENSE")
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <ArrowDownRight className="h-5 w-5" />
        </div>
      );
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <ArrowRightLeft className="h-5 w-5" />
      </div>
    );
  };

  const renderAmount = (amount: number, type: string) => {
    if (type === "INCOME")
      return (
        <span className="font-semibold text-emerald-600">
          +{formatCurrency(amount, currencyCode)}
        </span>
      );
    if (type === "EXPENSE")
      return (
        <span className="font-semibold text-rose-600">
          -{formatCurrency(amount, currencyCode)}
        </span>
      );
    return (
      <span className="font-semibold text-gray-700">
        {formatCurrency(amount, currencyCode)}
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Transactions
          </h1>
          <p className="text-sm text-gray-500">
            View and filter your financial history.
          </p>
        </div>
        <AddTransactionDialog/>
      </div>

      {/* FILTER DASHBOARD */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
        {/* Row 1: Quick Dates & Custom Picker */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
          <span className="text-sm font-medium text-gray-500 mr-2 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Date Range:
          </span>
          {['THIS_MONTH', 'LAST_MONTH', 'LAST_3_MONTHS', 'ALL_TIME'].map((range) => (
            <Button
              key={range}
              variant={activeDateFilter === range ? "default" : "outline"}
              size="sm"
              className={activeDateFilter === range ? "bg-brand-600 hover:bg-brand-700" : "text-gray-600"}
              onClick={() => handleDateFilterClick(range as any)}
            >
              {range.replace(/_/g, ' ')}
            </Button>
          ))}

          {/* CUSTOM DATE RANGE PICKER */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={activeDateFilter === "CUSTOM" ? "default" : "outline"}
                size="sm"
                className={cn(
                  "ml-auto",
                  activeDateFilter === "CUSTOM" ? "bg-brand-600 hover:bg-brand-700" : "text-gray-600"
                )}
                onClick={() => setActiveDateFilter("CUSTOM")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Custom Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                autoFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date as DateRange}
                onSelect={(newDate) => {
                  setDate(newDate);
                  // Only trigger API if both dates are selected
                  if (newDate?.from && newDate?.to) {
                    // Using your exact local-to-UTC logic here!
                    const startStr = format(newDate.from, "yyyy-MM-dd");
                    const endStr = format(newDate.to, "yyyy-MM-dd");
                    setFilters({ 
                        ...filters, 
                        page: 0,
                        startDate: startStr, // The API client will append T00:00:00 and .toISOString()
                        endDate: endStr      // The API client will append T23:59:59.999 and .toISOString()
                    });
                  }
                }}
                numberOfMonths={2}
                captionLayout="dropdown"
                startMonth={new Date("01-01-2020")} // How far back they can go
                endMonth={new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Row 2: Select Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            value={filters.type}
            onValueChange={(val) =>
              handleFilterChange("type", val === "ALL" ? "" : val)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.walletId}
            onValueChange={(val) =>
              handleFilterChange("walletId", val === "ALL" ? "" : val)
            }
          >
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="All Wallets" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Wallets</SelectItem>
              {wallets.map((w) => (
                <SelectItem key={w.id} value={w.id.toString()}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.categoryId}
            onValueChange={(val) =>
              handleFilterChange("categoryId", val === "ALL" ? "" : val)
            }
            disabled={filters.type === "TRANSFER"}
          >
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden relative">
        {/* Subtle loading indicator overlay when fetching new pages/filters */}
        {isFetching && !isLoading && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          </div>
        )}

        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-20"></TableHead>
              <TableHead>Transaction Details</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-gray-500"
                >
                  Loading transactions...
                </TableCell>
              </TableRow>
            ) : pageData?.content.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-gray-500"
                >
                  No transactions found for these filters.
                </TableCell>
              </TableRow>
            ) : (
              pageData?.content.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell>{renderTransactionIcon(tx.type)}</TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">
                      {tx.description ||
                        (tx.type === "TRANSFER" ? "Transfer" : "Untitled")}
                    </p>
                    {tx.type !== "TRANSFER" && tx.categoryName && (
                      <Badge
                        variant="secondary"
                        className="mt-1 text-[10px] font-normal text-gray-500 bg-gray-100"
                      >
                        {tx.categoryName}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">{tx.walletName}</span>
                      {tx.type === "TRANSFER" && tx.targetWalletName && (
                        <>
                          <ArrowRightLeft className="h-3 w-3 text-gray-400" />
                          <span className="font-medium">
                            {tx.targetWalletName}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(tx.transactionDate).toLocaleDateString(
                      undefined,
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </TableCell>
                  <TableCell className="text-right text-base">
                    {renderAmount(tx.amount, tx.type)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* PAGINATION CONTROLS */}
        {pageData && pageData.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Showing page{" "}
              <span className="font-medium text-gray-900">
                {pageData.number + 1}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900">
                {pageData.totalPages}
              </span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= pageData.totalPages - 1}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
