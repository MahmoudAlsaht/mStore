"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Chevron, DayPicker } from "react-day-picker";
import { arSA } from "date-fns/locale";
import { format } from "date-fns/format";

const NU_LOCALE = "ar-u-nu-arab";

const formatDay = (day) => day.getDate().toLocaleString(NU_LOCALE);

const formatMonthCaption = (date, options) => {
  const y = date.getFullYear().toLocaleString(NU_LOCALE);
  const m = format(date, "LLLL", options);
  return `${m} ${y}`;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      weekStartsOn={6}
      locale={arSA}
      dir="rtl"
      hideWeekdays
      formatters={{
        formatDay,
        formatMonthCaption,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left")
            return <ChevronLeft className="h-4 w-full" {...props} />;
          if (props.orientation === "right")
            return <ChevronRight className="h-4 w-full" {...props} />;
          return <Chevron {...props} />;
        },
      }}
      {...props}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 text-rayanPrimary-dark",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-start",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 text-rayanPrimary-dark hover:bg-rayanPrimary-dark hover:text-slate-50",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 text-rayanPrimary-dark hover:bg-rayanPrimary-dark hover:text-slate-50",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "grid grid-cols-7 gap-1",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-rayanPrimary-dark",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
