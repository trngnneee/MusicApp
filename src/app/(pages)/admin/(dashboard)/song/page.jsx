import { AdminCreate } from "../components/adminButtonList/adminCreate";
import { AdminTrash } from "../components/adminButtonList/adminTrash";
import { AdminFilter } from "../components/adminFilter/filter";
import { AdminMultipleApply } from "../components/adminMultipleApply/adminMultipleApply";
import { AdminSearch } from "../components/adminSearch/adminSearch";

export default function SongPage() {
  return (
    <>
      <AdminFilter />
      <div className="flex items-center gap-6">
        <AdminMultipleApply />
        <AdminSearch />
        <AdminCreate
          title="Tạo mới"
          link="/admin/category/create"
        />
        <AdminTrash
          title="Thùng rác"
          link="/admin/category/trash"
        />
      </div>
    </>
  )
}