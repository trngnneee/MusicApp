"use client"

import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { HardDeleteButton } from "@/app/components/Admin/Button/HardDeleteButton/HardDeleteButton";
import { RecoveryButton } from "@/app/components/Admin/Button/RecoveryButton/RecoveryButton";

export const MainPage = () => {
  const router = useRouter();
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
    if (!isLogin) return;

    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (role) params.append("role", role);
    if (search) params.append("search", search);
    if (page) params.append("page", page);

    const token = localStorage.getItem("adminToken");
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/trash?${params.toString()}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((data) => {
        setAdminAccountList(data.adminAccountList);
        setRoleList(data.roleList);
        setPagination(data.pagination);
      })
  }, [status, role, search, page, isLogin])

  const handleApplyMulti = () => {
    if (applyMulti && checkList && checkList.length) {

      const finalData = {
        status: applyMulti,
        idList: checkList
      };
      const token = localStorage.getItem("adminToken");
      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/trash/apply-multi`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(finalData),
      })
        .then(res => res.json())
        .then(data => {
          return data;
        })

      toast.promise(promise, {
        loading: "Đang xử lý...",
        success: (data) => {
          setAdminAccountList(adminAccountList.filter((item) => !checkList.includes(item.id)));
          setPagination(prev => ({
            ...prev,
            totalRecord: prev.totalRecord - checkList.length
          }));
          return data.message;
        },
        error: (data) => data.message
      })
    }
    else {
      toast.error('Vui lòng chọn Danh mục hoặc Phần tử cần áp dụng!')
    }
  }

  const handleRecoverySuccess = (id: string) => {
    setAdminAccountList(adminAccountList.filter((item) => item.id != id));
  }
  
  const handleDeleteSuccess = (id: string) => {
    setAdminAccountList(adminAccountList.filter((item) => item.id != id));
  }

  return (
    <>
      {isLogin && userInfo.permission.includes("admin-account-trash") && (
        <>
          <Toaster />
          <Title title={"Thùng rác tài khoản quản trị"} />
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
                  <option value="recovery">Khôi phục</option>
                  <option value="hard-delete">Xóa vĩnh viễn</option>
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
                        <img 
                          src={item.avatar} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                              e.currentTarget.onerror = null; 
                              e.currentTarget.src = "/adminAvatar.png"; 
                            }}
                        />
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
                        <RecoveryButton
                          api={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/trash/recovery/${item.id}`}
                          id={item.id}
                          handleRecoverySuccess={() => handleRecoverySuccess(item.id)}
                        />
                        <HardDeleteButton
                          api={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/setting/admin-account/trash/hard-delete/${item.id}`}
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