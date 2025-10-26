"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BellIcon } from "lucide-react"
import { useState } from "react"

export const NotificationButton = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
  }
  
  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={handleClick}
      aria-label="Notifications"
    >
      <BellIcon size={16} aria-hidden="true" />
      {count >= 0 && (
        <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1 bg-[#2B3674]">
          {count > 99 ? "99+" : count}
        </Badge>
      )}
    </Button>
  )
}