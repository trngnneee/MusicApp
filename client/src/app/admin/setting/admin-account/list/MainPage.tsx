"use client"

import { Create } from "@/app/components/Admin/Create/Create";
import { MultipleApply } from "@/app/components/Admin/MultipleApply/MultipleApply";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit, FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { FaUndoAlt } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { IoSearch } from "react-icons/io5";
import { Trash } from "@/app/components/Admin/Trash/Trash";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  const [adminAccountList, setAdminAccountList] = useState<any[]>();
  const [roleList, setRoleList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>();

  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

  const [checkList, setCheckList] = useState<string[]>([]);
  const [applyMulti, setApplyMulti] = useState("");

  useEffect(() => {
    let query = "";
    if (status) query += `?status=${status}`;
    if (role) query += `?role=${role}`
    if (search) query += `?search=${search}`;
    if (page) query += `?page=${page}`;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/list${query}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then((data) => {
        setAdminAccountList(data.adminAccountList);
        setRoleList(data.roleList);
        setPagination(data.pagination);
      })
  }, [status, role, search, page])

  const handleClearFilter = () => {
    setStatus("");
    setRole("");
  }

  const handleApplyMulti = () => {
    if (applyMulti && checkList && checkList.length) {

      const finalData = {
        status: applyMulti,
        idList: checkList
      };
      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/apply-multi`, {
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
            if (applyMulti == "delete") {
              setAdminAccountList(adminAccountList.filter((item) => !checkList.includes(item.id)));
              setPagination(prev => ({
                ...prev,
                totalRecord: prev.totalRecord - 1
              }));
            }
            else {
              setAdminAccountList(adminAccountList.map((item) => {
                if (checkList.includes(item.id)) {
                  return { ...item, status: applyMulti };
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
      toast.error('Vui lòng chọn Danh mục hoặc Phần tử cần áp dụng!')
    }
  }

  const handleDelete = (id: string) => {
    const finalData = {
      id: id
    };
    const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/delete`, {
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
          setAdminAccountList(adminAccountList.filter((item) => item.id !== id));
          setPagination(prev => ({
            ...prev,
            totalRecord: prev.totalRecord - 1
          }))
        }
        return data.message;
      },
      error: (data) => data.message
    })
  }

  return (
    <>
      {isLogin && (
        <>
          <Toaster />
          <Title title={"Tài khoản quản trị"} />
          {/* Filter */}
          <div className="w-full overflow-x-auto">
            <ul className="flex items-center mt-[30px] min-w-[900px] w-fit">
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
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="">Nhóm quyền</option>
                  {roleList && roleList.length > 0 && roleList.map((item, index) => (
                    <option value={item.id} key={index}>{item.name}</option>
                  ))}
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 rounded-r-[14px] flex gap-[12px] items-center bg-white">
                <button
                  className="flex items-center gap-[10px] text-[#EA0234]"
                >
                  <FaUndoAlt />
                  <div className="text-[14px] font-[700]" onClick={handleClearFilter}>Xóa bộ lọc</div>
                </button>
              </li>
            </ul>
          </div>
          {/* End Filter */}
          <div className="flex gap-[20px] sm:gap-[30px] mt-[15px] flex-wrap">
            {/* Apply Multi */}
            <ul className="flex flex-row items-center">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  value={applyMulti}
                  onChange={(event) => setApplyMulti(event.target.value)}
                >
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
                >
                  Áp dụng
                </button>
              </li>
            </ul>
            {/* End Apply Multi */}
            {/* Search */}
            <div className="flex gap-[15px] p-[25px] w-[366px] bg-white border-[1px] border-[#E2E2E2] rounded-[14px]">
              <IoSearch className="text-[#979797] text-[20px]" />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="text-[#979797] text-[14px] font-[700] flex-1 outline-none translate-y-[1px]"
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    const target = event.target as HTMLInputElement;
                    setSearch(target.value);
                  }
                }}
              />
            </div>
            {/* End Search */}
            <div className="flex gap-[10px]">
              <Create link={"/admin/setting/admin-account/create"} />
            </div>
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-auto w-full">
            <table className="bg-white w-full min-w-[1000px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[10px] py-[15px] text-left align-middle">
                    <input
                      type="checkbox"
                      className="translate-y-[2px]"
                      onChange={(event) => {
                        if (event.target.checked) setCheckList(adminAccountList.map((item) => item.id));
                        else setCheckList([]);
                      }}
                    />
                  </th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Họ tên</th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Email</th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Số điện thoại</th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Nhóm quyền</th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Chức vụ</th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Trạng thái</th>
                  <th className="px-[15px] py-[15px] text-left text-[16px] align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {adminAccountList && adminAccountList.length > 0 && adminAccountList.map((item, index) => (
                  <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]" key={index}>
                    <th className="px-[10px] py-[8px] text-left align-middle">
                      <input
                        type="checkbox"
                        className="translate-y-[2px]"
                        checked={checkList.includes(item.id)}
                        onChange={() => {
                          setCheckList((prev) => prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id])
                        }}
                      />
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[12px] text-dark">{item.fullName}</th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      <div className="w-[60px] h-[60px] overflow-hidden">
                        <img src={item.avatar} className="w-full h-full object-cover" />
                      </div>
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[12px] text-dark">{item.email}</th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[12px] text-dark">{item.phone}</th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[12px] text-dark">
                      {item.role}
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[12px] text-dark">{item.jobPosition}</th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      {item.status == "active" ? <Active /> : <Inactive />}
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                        <button className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"><FiEdit /></button>
                        <button 
                          className="px-[16px] py-[11px] text-[#EF3826]"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaRegTrashCan />
                        </button>
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
                <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị {pagination.skip + 1} - {pagination.skip + adminAccountList.length} của {pagination.totalRecord}</div>
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