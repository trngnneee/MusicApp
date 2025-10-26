"use client"

import { usePathname } from "next/navigation"
import { AdminAvatar } from "./components/adminAvatar"
import { AdminTitle } from "./components/adminTitle"
import { BreadCrumb } from "./components/breadcrumb"
import { NotificationButton } from "./components/notificationButton"

export const AdminHeader = () =>{
  const pathname = usePathname();
  const currentFolder = pathname.split("/").filter(Boolean).pop();

  const titleList = [
    {
      label: "category",
      value: "Quản lý danh mục"
    },
    {
      label: "singer",
      value: "Quản lý ca sĩ"
    },
    {
      label: "song",
      value: "Quản lý bài hát"
    },
  ]
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <BreadCrumb />
        <AdminTitle
          title={currentFolder ? (titleList.find(item => item.label === currentFolder)?.value || "Dashboard") : "Dashboard"}
        />
      </div>
      <div className="flex items-center gap-5">
        <NotificationButton />
        <AdminAvatar />
      </div>
    </div>
  )
}