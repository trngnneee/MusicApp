"use client";
import { useState } from "react"
import { addDays } from "date-fns"

import { Calendar } from "@/components/ui/calendar"

export default function Component() {
  const today = new Date()
  const [date, setDate] = useState({
    from: today,
    to: addDays(today, 25),
  })

  return (
    <div>
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        pagedNavigation
        showOutsideDays={false}
        className="rounded-md border p-2"
        classNames={{
          months: "gap-8",
          month:
            "relative first-of-type:before:hidden before:absolute max-sm:before:inset-x-2 max-sm:before:h-px max-sm:before:-top-2 sm:before:inset-y-2 sm:before:w-px before:bg-border sm:before:-left-4",
        }} />
      <p
        className="mt-4 text-center text-xs text-muted-foreground"
        role="region"
        aria-live="polite">
        Two months calendar -{" "}
        <a
          className="underline hover:text-foreground"
          href="https://daypicker.dev/"
          target="_blank"
          rel="noopener nofollow">
          React DayPicker
        </a>
      </p>
    </div>
  );
}
