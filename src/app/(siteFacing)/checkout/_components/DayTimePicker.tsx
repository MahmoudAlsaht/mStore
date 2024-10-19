"use client";
import React, { ChangeEventHandler, SetStateAction, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function DayTimePicker({
  selected,
  setSelected,
}: {
  setSelected: React.Dispatch<SetStateAction<Date | undefined>>;
  selected: Date | undefined;
}) {
  const [timeValue, setTimeValue] = useState<string>("11:00");

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      (selected || new Date()).getFullYear(),
      (selected || new Date()).getMonth(),
      (selected || new Date()).getDate(),
      hours,
      minutes,
    );
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date) => {
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelected(newDate);
  };

  return (
    <div>
      <div className="me-1">
        <p className="mb-2 text-rayanWarning-dark">
          اختر وقت من الساعة ال9 صباحاََ حتى ال12 منتصف الليل
        </p>
        <label>
          <input
            className="rounded-sm bg-slate-600 px-3"
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            min="09:00"
            max="00:00"
          />
        </label>
      </div>
      <Calendar
        disabled={{ before: new Date() }}
        hideNavigation
        mode="single"
        required
        selected={selected}
        onSelect={handleDaySelect}
        footer={
          <div>
            التاريخ المختار{" "}
            <span className="text-rayanWarning-dark">
              ({selected ? selected.toLocaleString() : "لا يوجد"})
            </span>
          </div>
        }
      />
    </div>
  );
}
