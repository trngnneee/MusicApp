"use client"

import { useState } from "react"
import { StatusFilter } from "./components/statusFilter"
import { Funnel, Trash2 } from "lucide-react";
import { CreatedByFilter } from "./components/createdByFilter";
import { DateFilter } from "./components/dateFilter";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "./components/categoryFilter";

export const AdminFilter = ({ showCreatedBy=true, showCategory=true }) => {
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [date, setDate] = useState({
    from: null,
    to: null,
  });
  const [category, setCategory] = useState("");

  return (
    <div className="bg-white rounded-[14px] border-[0.6px] border-[#D5D5D5] flex items-stretch">
      <div className="flex flex-1 items-center gap-2 p-2 border-r-[0.6px] border-l-[#D5D5D5] w-[200px] justify-center text-[#2B3674]">
        <Funnel />
        <div className="text-[14px] font-bold">Bộ lọc</div>
      </div>

      <StatusFilter
        status={status}
        setStatus={setStatus}
      />

      <CreatedByFilter
        createdBy={createdBy}
        setCreatedBy={setCreatedBy}
        show={showCreatedBy}
      />

      <DateFilter
        date={date}
        setDate={setDate}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
        show={showCategory}
      />

      <div className="flex flex-1 items-center gap-2 w-[200px] justify-center">
        <Button className="flex items-center gap-2 p-4 bg-white hover:bg-white text-red-500 rounded-none shadow-none cursor-pointer text-[14px] font-bold">
          <Trash2 strokeWidth="3"/>
          <div>Xóa bộ lọc</div>
        </Button>
      </div>
    </div>
  )
}