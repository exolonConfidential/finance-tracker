import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";

interface Props {
  activeRange: string;
  setActiveRange: (range: "CUSTOM") => void;
  setDateRange: (startDate: string, endDate: string) => void;
}

export const CustomDatePicker = ({
  activeRange,
  setActiveRange,
  setDateRange,
}: Props) => {
  const [date, setDate] = useState<{ from?: Date; to?: Date } | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={activeRange === "CUSTOM" ? "default" : "outline"}
          size="sm"
          className={cn(
            "ml-auto",
            activeRange === "CUSTOM"
              ? "bg-brand-600 hover:bg-brand-700"
              : "text-gray-600",
          )}
          onClick={() => setActiveRange("CUSTOM")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
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
              setDateRange(startStr, endStr);
            }
          }}
          numberOfMonths={2}
          captionLayout="dropdown"
          startMonth={new Date("01-01-2020")} // How far back they can go
          endMonth={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};
