"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const AdminTrash = ({ title, link }) => {
  const router = useRouter();
  return (
    <Button className="mt-5 bg-[#2B3674] hover:bg-[#232c5e] hover:scale-[1.02]" onClick={() => router.push(link)}>
      {title}
    </Button>
  )
}