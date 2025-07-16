"use client"

import { Create } from "@/app/components/Admin/Create/Create";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { Trash } from "@/app/components/Admin/Trash/Trash";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth"
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/app/components/Admin/Button/DeleteButton/DeleteButton";
import { Search } from "@/app/components/Admin/Search/Search";
import { SingerFilter } from "./SingerFilter";

export const MainPage = () => {
  const router = useRouter();
  const { isLogin, userInfo } = useAuth();
  const [singerList, setSingerList] = useState<any[]>();
  const [pagination, setPagination] = useState<any>();

  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

  const [idList, setIdList] = useState<string[]>([]);
  const [applyStatus, setApplyStatus] = useState("");

  useEffect(() => {
    if (!isLogin) return;

    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (search) params.append("search", search);
    if (page) params.append("page", page);

    const token = localStorage.getItem("adminToken");
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/list?${params.toString()}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setSingerList(data.singerList);
        setPagination(data.pagination);
      })
  }, [status, startDate, endDate, search, page, isLogin])


  const handleClearFilter = () => {
    setStatus("");
    setStartDate("");
    setEndDate("");
    setSearch("");
    setPage("");
  };

  const handleApplyMulti = () => {
    if (applyStatus && idList && idList.length > 0) {
      const finalData = {
        status: applyStatus,
        idList: idList
      };

      const token = localStorage.getItem("adminToken");
      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/apply-multi`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(finalData)
      })
        .then(res => res.json())
        .then(data => {
          return data;
        })

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => {
          if (data.code == "success") {
            if (applyStatus == "delete") {
              setSingerList(singerList.filter((item) => !idList.includes(item.id)));
              setPagination(prev => ({
                ...prev,
                totalRecord: prev.totalRecord - idList.length
              }));
            }
            else {
              setSingerList(singerList.map((item) => {
                if (idList.includes(item.id)) {
                  return { ...item, status: applyStatus };
                }
                return item;
              }))
            }
          }
          return data.message;
        },
        error: (data) => data.message
      })
    }
    else {
      toast.error("Vui lòng chọn Danh mục hoặc Phần tử cần áp dụng!");
    }
  }

  const handleDeleteSuccess = (id: string) => {
    setSingerList(singerList.filter((item) => item.id != id));
    setPagination(prev => ({
      ...prev,
      totalRecord: prev.totalRecord - 1
    }));
  }

  return (
    <>
      {isLogin && userInfo.permission.includes("singer-view") && (
        <>
          <Toaster />
          <Title title={"Quản lý ca sĩ"} />
          <SingerFilter
            status={status}
            setStatus={setStatus}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleClearFilter={handleClearFilter}
          />
          <div className="flex gap-[20px] mt-[20px] flex-wrap">
            {/* Apply Multi */}
            <ul className="flex flex-row items-center">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  value={applyStatus}
                  onChange={(event) => setApplyStatus(event.target.value)}
                >
                  <option value="">-- Hành động --</option>
                  {userInfo.permission.includes("singer-edit") && (
                    <>
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Tạm dừng</option>
                    </>
                  )}
                  {userInfo.permission.includes("singer-delete") && (
                    <option value="delete">Xóa</option>
                  )}
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
            <div className="flex gap-[20px]">
              {userInfo.permission.includes("singer-create") && (
                <Create link={"/admin/singer/create"} />
              )}
              {userInfo.permission.includes("singer-trash") && (
                <Trash link={"/admin/singer/trash"} />
              )}
            </div>
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-scroll w-full">
            <table className="bg-white w-full min-w-[1000px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">
                    <input
                      type="checkbox"
                      className="translate-y-[2px]"
                      onChange={(event) => {
                        if (event.target.checked) setIdList(singerList.map((item) => item.id));
                        else setIdList([]);
                      }}
                    />
                  </th>
                  <th className="px-[15px] xl:px-[15px] py-[15px] text-left align-middle">Tên ca sĩ</th>
                  <th className="px-[15px] xl:px-[15px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] xl:px-[15px] py-[15px] text-left align-middle">Vị trí</th>
                  <th className="px-[15px] xl:px-[15px] py-[15px] text-left align-middle">Trạng thái</th>
                  <th className="px-[15px] xl:px-[15px] py-[15px] text-left align-middle">Tạo bởi</th>
                  <th className="px-[15px] xl:px-[15px] py-[15px] text-left align-middle">Cập nhật bởi</th>
                  <th className="px-[15px] xl:px-[15px] py-[15px] text-left align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {singerList && singerList.length > 0 && singerList.map((item, index) => (
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
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                      <div className="w-[60px] h-[60px] overflow-hidden">
                        <img 
                          src={item.avatar} 
                          onError={(e) => {
                              e.currentTarget.onerror = null; 
                              e.currentTarget.src = "/adminAvatar.png"; 
                            }} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </th>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                      {item.position}
                    </th>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                      {item.status == "active" ? <Active /> : <Inactive />}
                    </th>
                    <th className="px-[15px] xl:px-[15px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[12px] text-dark">{item.createdBy}</div>
                        <div className="font-[600] text-[10px] text-dark">{item.createdAt}</div>
                      </div>
                    </th>
                    <th className="px-[15px] xl:px-[15px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[12px] text-dark">{item.updatedBy}</div>
                        <div className="font-[600] text-[10px] text-dark">{item.updatedAt}</div>
                      </div>
                    </th>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                      <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                        {userInfo.permission.includes("singer-edit") && (
                          <button
                            className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"
                            onClick={() => router.push(`/admin/singer/edit/${item.id}`)}
                          >
                            <FiEdit />
                          </button>
                        )}
                        {userInfo.permission.includes("singer-delete") && (
                          <DeleteButton
                            api={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/delete/${item.id}`}
                            id={item.id}
                            handleDeleteSuccess={() => handleDeleteSuccess(item.id)}
                          />
                        )}
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
                <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị {pagination.skip + 1} - {pagination.skip + singerList.length} của {pagination.totalRecord}</div>
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