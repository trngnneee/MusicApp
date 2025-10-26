import { Input } from "@/components/ui/input"
import { ArrowRightIcon, SearchIcon } from "lucide-react"

export const AdminSearch = () => {
  return (
    <div className="mt-5 w-1/3">
      <div className="relative">
        <Input
          id="search"
          className="peer ps-9 pe-9 bg-white"
          placeholder="Search..."
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}