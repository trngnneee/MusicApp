"use client"

import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"

export const DateFilter = ({ date, setDate }) => {
  return (
    <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-l-[#D5D5D5] w-[200px] justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 p-4 bg-white hover:bg-white text-[#2B3674] rounded-none shadow-none my-0 text-[14px] font-bold">
            {date.from && date.to
              ? `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`
              : "-- Chọn khoảng ngày --"
            }
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}