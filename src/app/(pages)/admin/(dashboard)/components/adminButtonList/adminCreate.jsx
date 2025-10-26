"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation"

export const AdminCreate = ({ title, link }) => {
  const router = useRouter();
  return (
    <Button variant="outline" className="aspect-square max-sm:p-0 mt-5 hover:scale-[1.02]" onClick={() => router.push(link)}>
      <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
      <span className="max-sm:sr-only">{title}</span>
    </Button>
  )
}