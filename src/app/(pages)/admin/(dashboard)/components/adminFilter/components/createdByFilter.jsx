import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { categoryList } from "@/lib/adminApi/category.api"
import { ChevronDownIcon } from "lucide-react"
import { useEffect, useState } from "react"

export const CreatedByFilter = ({ createdBy, setCreatedBy, show=true }) => {
  if (!show) return null;

  const [adminAccountList, setAdminAccountList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await categoryList();
      if (data.code == "success")
      {
        setAdminAccountList(data.adminAccountList);
      }
    }
    fetchData();
  }, [])
  
  return (
    <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-l-[#D5D5D5] w-[200px] justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 p-4 bg-white hover:bg-white text-[#2B3674] rounded-none shadow-none text-[14px] font-bold">
            {createdBy ? (adminAccountList.find(item => item.id === createdBy)?.fullName || "Người tạo") : "-- Người tạo --"}
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
          <DropdownMenuItem onClick={() => setCreatedBy("")}>-- Người tạo --</DropdownMenuItem>
          {adminAccountList.length > 0 && adminAccountList.map((admin, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => setCreatedBy(admin.id)}
            >
              {admin.fullName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}