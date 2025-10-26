import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { songList } from "@/lib/adminApi/song.api";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const CategoryFilter = ({ category, setCategory, show = true }) => {
  if (!show) return null;

  const [categoryTree, setCategoryTree] = useState([]);
  const [selectedName, setSelectedName] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await songList();
        setCategoryTree(data.categoryTree);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };
    fetchData();
  }, []);

  const renderOption = (tree, level = 0, onSelect) => {
    return tree.map((item) => (
      <div key={item.id}>
        <DropdownMenuItem
          onClick={() => onSelect?.(item.id, item.name)}
          className="cursor-pointer"
        >
          {`${"—".repeat(level)} ${item.name}`}
        </DropdownMenuItem>

        {item.children?.length > 0 &&
          renderOption(item.children, level + 1, onSelect)}
      </div>
    ));
  };

  const handleSelect = (id, name) => {
    setCategory(id);
    setSelectedName(name);
  };

  useEffect(() => {
    if (!category) {
      setSelectedName("");
      return;
    }

    const findCategoryName = (tree, id) => {
      for (const node of tree) {
        if (node.id === id) return node.name;
        if (node.children?.length) {
          const found = findCategoryName(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const foundName = findCategoryName(categoryTree, category);
    if (foundName) setSelectedName(foundName);
  }, [category, categoryTree]);

  return (
    <div className="flex flex-1 items-center gap-2 border-r-[0.6px] border-l-[#D5D5D5] w-[200px] justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2 p-4 bg-white hover:bg-white text-[#2B3674] rounded-none shadow-none text-[14px] font-bold">
            {selectedName || "-- Danh mục --"}
            <ChevronDownIcon
              className="-me-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">
          <DropdownMenuItem onClick={() => handleSelect("", "")}>
            -- Danh mục --
          </DropdownMenuItem>
          {renderOption(categoryTree, 0, handleSelect)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};