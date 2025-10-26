import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import { AdminStatus } from "@/config/variable"

export const StatusFilter = ({ status, setStatus }) => {
  return (
    <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-l-[#D5D5D5] w-[200px] justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 p-4 bg-white hover:bg-white text-[#2B3674] rounded-none shadow-none my-0 text-[14px] font-bold">
            {status ? AdminStatus.find(item => item.label === status)?.value : "-- Trạng thái --"}
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
          <DropdownMenuItem onClick={() => setStatus("")}>-- Trạng thái --</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatus("active")}>Hoạt động</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatus("inactive")}>Tạm dừng</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}