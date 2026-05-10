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
          variant="ghost"
          size="sm"
          className={cn(
            // THE UPGRADE: Exact same glass pill styling as the standard date buttons
            "rounded-xl px-4 text-xs font-semibold tracking-wide transition-all duration-300 ml-auto",
            activeRange === "CUSTOM"
              ? "bg-white/15 text-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          )}
          onClick={() => setActiveRange("CUSTOM")}
        >
          <CalendarIcon className="mr-2 h-3.5 w-3.5" />
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

      {/* THE UPGRADE: Deep frosted glass popover with high shadow and border */}
      <PopoverContent 
        className="w-auto p-2 bg-background/90 backdrop-blur-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden relative" 
        align="end"
      >
        {/* Subtle ambient light leak behind the calendar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[60px] pointer-events-none -z-10"></div>
        
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date as DateRange}
          onSelect={(newDate) => {
            setDate(newDate);
            // Only trigger API if both dates are selected
            if (newDate?.from && newDate?.to) {
              const startStr = format(newDate.from, "yyyy-MM-dd");
              const endStr = format(newDate.to, "yyyy-MM-dd");
              setDateRange(startStr, endStr);
            }
          }}
          numberOfMonths={2}
          captionLayout="dropdown"
          startMonth={new Date("01-01-2020")}
          endMonth={new Date()}
          className="relative z-10"
        />
      </PopoverContent>
    </Popover>
  );
};