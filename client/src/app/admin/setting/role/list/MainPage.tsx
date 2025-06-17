"use client"

import { DeleteButton } from "@/app/components/Admin/Button/DeleteButton/DeleteButton";
import { Create } from "@/app/components/Admin/Create/Create";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast, Toaster } from "sonner";

export const MainPage = () => {
  const router = useRouter();
  const { isLogin, userInfo } = useAuth();
  const [roleList, setRoleList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

  const [idList, setIdList] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page);

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/role/list?${params.toString()}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then((data) => {
        setRoleList(data.roleList);
        setPagination(data.pagination);
      })
  }, [search, page])

  const handleApplyMulti = () => {
    if (status && idList && idList.length) {
      const finalData = {
        status: status,
        idList: idList
      };
      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/role/apply-multi`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData),
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          return data;
        })

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => {
          if (data.code == "success") {
            setRoleList(roleList.filter((item) => !idList.includes(item.id)));
            setPagination(prev => ({
              ...prev,
              totalRecord: prev.totalRecord - 1
            }));
          }
          return data.message;
        },
        error: (data) => data.message
      })
    }
    else {
      toast.error('Vui lòng chọn Danh mục hoặc Phần tử cần áp dụng!')
    }
  }

  const handleDeleteSuccess = (id: string) => {
    setRoleList(roleList.filter((item) => item.id != id));
  }

  return (
    <>
      {isLogin && (
        <>
          <Toaster />
          <Title title={"Nhóm quyền"} />
          <div className="mt-[30px] flex gap-[20px] flex-wrap">
            {/* Apply Multi */}
            <ul className="flex flex-row items-center">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="">-- Hành động --</option>
                  <option value="delete">Xóa</option>
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 rounded-r-[14px] flex gap-[12px] items-center bg-white">
                <button
                  className="text-[#EA0234] text-[14px] font-[700]"
                  onClick={handleApplyMulti}
                >
                  Áp dụng
                </button>
              </li>
            </ul>
            {/* End Apply Multi */}
            <Search
              onSearchChange={setSearch}
            />
            <Create link={"/admin/setting/role/create"} />
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-auto w-full">
            <table className="bg-white w-full min-w-[600px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">
                    <input
                      type="checkbox"
                      className="translate-y-[2px]"
                      onChange={(event) => {
                        if (event.target.checked) setIdList(roleList.map((item) => item.id));
                        else setIdList([]);
                      }}
                    />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tên nhóm quyền</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Mô tả ngắn</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {roleList && roleList.length > 0 && roleList.map((item, index) => (
                  <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]" key={index}>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                      <input
                        type="checkbox"
                        className="translate-y-[2px]"
                        checked={idList.includes(item.id)}
                        onChange={() => {
                          setIdList((prev) => prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id])
                        }}
                      />
                    </th>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">{item.name}</th>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">{item.description}</th>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                      <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                        <button
                          className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"
                          onClick={() => router.push(`/admin/setting/role/edit/${item.id}`)}
                        >
                          <FiEdit />
                        </button>
                        <DeleteButton
                          api={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/role/delete/${item.id}`}
                          id={item.id}
                          handleDeleteSuccess={() => handleDeleteSuccess(item.id)}
                        />
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-[20px] flex gap-[20px] items-center">
            {pagination && (
              <>
                <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị {pagination.skip + 1} - {pagination.skip + roleList.length} của {pagination.totalRecord}</div>
                <div className="border-[0.6px] border-[#D5D5D5] rounded-[8px]">
                  <select
                    className="px-[14px] py-[6px] rounded-[8px] outline-none text-[14px] font-[600] text-dark opacity-[0.6]"
                    onChange={(event) => setPage(event.target.value)}
                  >
                    {[...Array(pagination.totalPage)].map((_, i) => (
                      <option value={i + 1} key={i}>Trang {i + 1}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}