"use client"

import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit, FiFilter } from "react-icons/fi";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Title } from "@/app/components/Admin/Title/Title";
import { Create } from "@/app/components/Admin/Create/Create";
import { Trash } from "@/app/components/Admin/Trash/Trash";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { FaUndoAlt } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const MainPage = () => {
  const router = useRouter();
  const { isLogin, userInfo } = useAuth();
  const [categoryList, setCategoryList] = useState<any[]>();
  const [adminAccountList, setAdminAccountList] = useState<any[]>();
  const [pagination, setPagination] = useState<any>();

  const [applying, setApplying] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

  const [checkList, setCheckList] = useState<string[]>([]);
  const [applyMulti, setApplyMulti] = useState("");

  const fetchData = () => {
    let query = "";
    if (status) query += `?status=${status}`;
    if (createdBy) query += `?createdBy=${createdBy}`;
    if (startDate) query += `?startDate=${startDate}`;
    if (endDate) query += `?endDate=${endDate}`;
    if (search) query += `?search=${search}`;
    if (page) query += `?page=${page}`;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category/list${query}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then((data) => {
        setCategoryList(data.category);
        setAdminAccountList(data.adminAccountList);
        setPagination(data.pagination);
      })
  }

  useEffect(() => {
    fetchData();
  }, [status, createdBy, startDate, endDate, search, page])

  const handleClearFilter = () => {
    setStatus("");
    setCreatedBy("");
    setStartDate("");
    setEndDate("");
    setSearch("");
    setPage("");
  };

  const handleApplyMulti = () => {
    if (applying) return;
    if (applyMulti && checkList && checkList.length) {
      setApplying(true);

      const finalData = {
        status: applyMulti,
        idList: checkList
      };
      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category/apply-multi`, {
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
            fetchData();
          }
          return data.message;
        },
        error: (data) => data.message
      })
      setApplying(false);
    }
    else {
      toast.error('Vui lòng chọn Danh mục hoặc Phần tử cần áp dụng!')
    }
  }

  const handleDelete = (id) => {
    if (deleting) return;
    setDeleting(true);
    const finalData = {
      id: id
    };
    const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/category/delete`, {
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
          fetchData();
        }
        return data.message;
      },
      error: (data) => data.message
    })
    setDeleting(false);
  }

  return (
    <>
      {isLogin && (
        <>
          <Toaster />
          <Title title="Quản lý danh mục" />
          {/* Filter */}
          <div className="w-full overflow-x-auto">
            <ul className="flex items-center mt-[30px] min-w-[750px] w-fit">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <FiFilter className="text-dark" />
                <div className="text-[14px] font-[700] text-dark">Bộ Lọc</div>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="">Trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  value={createdBy}
                  onChange={(event) => setCreatedBy(event.target.value)}
                >
                  <option value="">Người tạo</option>
                  {adminAccountList && adminAccountList.length && adminAccountList.map((item, index) => (
                    <option key={index} value={item.id}>{item.fullName}</option>
                  ))}
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
                <input
                  type="date"
                  className="text-[12px] font-[700] text-dark outline-none"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
                <span className="text-[14px] font-[700] text-dark outline-none">-</span>
                <input
                  type="date"
                  className="text-[12px] font-[700] text-dark outline-none"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 rounded-r-[14px] flex gap-[12px] items-center bg-white">
                <button
                  className="flex items-center gap-[10px] text-[#EA0234]"
                  onClick={handleClearFilter}
                >
                  <FaUndoAlt />
                  <div className="text-[14px] font-[700]">Xóa bộ lọc</div>
                </button>
              </li>
            </ul>
          </div>
          {/* End Filter */}
          <div className="mt-[20px] flex flex-wrap xl:flex-nowrap items-center gap-[20px]">
            {/* Multiple Aplly */}
            <ul className="flex flex-row items-center">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <select className="text-[14px] font-[700] text-dark outline-none" onChange={(event) => setApplyMulti(event.target.value)}>
                  <option value="">-- Hành động --</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                  <option value="delete">Xóa</option>
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 rounded-r-[14px] flex gap-[12px] items-center bg-white">
                <button
                  className="text-[#EA0234] text-[14px] font-[700]"
                  onClick={handleApplyMulti}
                  disabled={applying}
                >
                  Áp dụng
                </button>
              </li>
            </ul>
            {/* End Multiple Aplly */}
            {/* Search */}
            <div className="flex gap-[15px] p-[25px] w-[366px] bg-white border-[1px] border-[#E2E2E2] rounded-[14px]">
              <IoSearch className="text-[#979797] text-[20px]" />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="text-dark text-[14px] font-[700] flex-1 outline-none translate-y-[1px]"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
            {/* End Search */}
            <div className="flex gap-[20px]">
              <Create link={`/admin/category/create`} />
              <Trash link={"/admin/category/trash"} />
            </div>
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-auto w-full">
            <table className="bg-white w-full min-w-[1000px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">
                    <input
                      type="checkbox"
                      className="translate-y-[2px]"
                      onChange={(event) => {
                        if (event.target.checked) setCheckList(categoryList.map((item) => item.id));
                        else setCheckList([]);
                      }}
                    />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tên danh mục</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Vị trí</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Trạng thái</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tạo bởi</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Cập nhật bởi</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {
                  categoryList && categoryList.length > 0 && categoryList.map((item, index) => (
                    <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]" key={index}>
                      <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                        <input
                          type="checkbox"
                          className="translate-y-[2px]"
                          checked={checkList.includes(item.id)}
                          onChange={() => {
                            setCheckList((prev) => prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id])
                          }}
                        />
                      </th>
                      <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">{item.name}</th>
                      <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                        <div className="w-[60px] h-[60px] overflow-hidden">
                          <img src={item.avatar} className="w-full h-full object-cover" />
                        </div>
                      </th>
                      <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                        {item.position}
                      </th>
                      <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                        {item.status == "active" ? <Active /> : <Inactive />}
                      </th>
                      <th className="px-[15px] xl:px-[25px] py-[8px] text-left align-middle">
                        <div className="flex flex-col items-start">
                          <div className="font-[600] text-[14px] text-dark">{item.createdBy}</div>
                          <div className="font-[600] text-[12px] text-dark">{item.createdAt}</div>
                        </div>
                      </th>
                      <th className="px-[15px] xl:px-[25px] py-[8px] text-left align-middle">
                        <div className="flex flex-col items-start">
                          <div className="font-[600] text-[14px] text-dark">{item.updatedBy}</div>
                          <div className="font-[600] text-[12px] text-dark">{item.updatedAt}</div>
                        </div>
                      </th>
                      <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                        <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                          <button
                            className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"
                            onClick={() => {
                              router.push(`/admin/category/edit/${item.id}`)
                            }}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="px-[16px] py-[11px] text-[#EF3826]"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaRegTrashCan />
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="mt-[20px] flex gap-[20px] items-center">
            {pagination && (
              <>
                <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị {pagination.skip + 1} - {pagination.skip + categoryList.length} của {pagination.totalRecord}</div>
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