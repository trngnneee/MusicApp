"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AdminStatus, AdminTrashStatus } from "@/config/variable"
import { ChevronDownIcon, LayoutList, Trash2 } from "lucide-react"
import { useState } from "react"

export const AdminMultipleApply = ({ trash=false }) => {
  const [status, setStatus] = useState("");
  let statusList = [];
  if (!trash) statusList = AdminStatus;
  else statusList = AdminTrashStatus;
  
  return (
    <div className="bg-white rounded-[14px] border-[0.6px] border-[#D5D5D5] flex items-stretch w-1/3 mt-5">
      <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-l-[#D5D5D5] w-[200px] justify-center p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2 bg-white hover:bg-white text-[#2B3674] rounded-none shadow-none text-[14px] font-bold">
              {status ? statusList.find(item => item.label === status)?.value : "-- Trạng thái --"}
              <ChevronDownIcon
                className="-me-1 opacity-60"
                size={16}
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
            <DropdownMenuItem onClick={() => setStatus("")}>-- Trạng thái --</DropdownMenuItem>
            {statusList.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setStatus(item.label)}
              >
                {item.value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-1 items-center gap-2 w-[200px] justify-center">
        <Button className="flex items-center gap-4 bg-white hover:bg-white text-[#2B3674] rounded-none shadow-none cursor-pointer text-[14px] font-bold">
          <LayoutList strokeWidth={3} />
          <div>Áp dụng</div>
        </Button>
      </div>
    </div>
  )
}