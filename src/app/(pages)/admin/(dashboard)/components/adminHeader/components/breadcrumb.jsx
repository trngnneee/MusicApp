"use client";

import { HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const BreadCrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const visibleSegments = pathSegments.filter((segment) => segment !== "admin");

  if (visibleSegments.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="py-2">
        <BreadcrumbItem className="flex items-center gap-1 text-[#2B3674]">
          <BreadcrumbLink href="/">
            <HomeIcon size={16} aria-hidden="true" />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem className="flex items-center gap-1 text-[#2B3674]">
          <span className="">Admin</span>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {visibleSegments.map((segment, index) => {
          const isLast = index === visibleSegments.length - 1;
          const label = decodeURIComponent(segment);

          return (
            <div key={segment} className="flex items-center gap-1">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize text-[#2B3674] font-medium">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="capitalize text-[#A3AED0] cursor-default">
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
