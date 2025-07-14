"use client"

import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HardDeleteButton } from "@/app/components/Admin/Button/HardDeleteButton/HardDeleteButton";
import { RecoveryButton } from "@/app/components/Admin/Button/RecoveryButton/RecoveryButton";
import Swal from "sweetalert2";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();
  const [trashList, setTrashList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>("");

  const [idList, setIdList] = useState([]);
  const [applyMultiStatus, setApplyMultiStatus] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    if (!isLogin) return

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page);

    const token = localStorage.getItem("adminToken");
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/list?${params.toString()}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          setTrashList(data.trashList);
          setPagination(data.pagination);
        }
      })
  }, [page, search, isLogin])

  const handleApplyMulti = () => {
    if (idList && idList.length && applyMultiStatus) {
      const finalData = {
        status: applyMultiStatus,
        idList: idList
      };

      if (applyMultiStatus == "hard-delete") {
        Swal.fire({
          title: "Xác nhận xóa?",
          text: "Hành động này không thể hoàn tác!",
          showDenyButton: true,
          confirmButtonText: "Xóa",
          denyButtonText: `Hủy`
        }).then((result) => {
          if (result.isConfirmed) {
            const token = localStorage.getItem("adminToken");
            const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/apply-multi`, {
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
                if (data.code == "success") {
                  setTrashList(trashList.filter((item) => !idList.includes(item.id)));
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
        })
      }
      else {
        const token = localStorage.getItem("adminToken");
        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/apply-multi`, {
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
            if (data.code == "success") {
              setTrashList(trashList.filter((item) => !idList.includes(item.id)));
              setPagination(prev => ({
                ...prev,
                totalRecord: prev.totalRecord - idList.length
              }));
            }
            return data.message;
          },
          error: (data) => data.message
        })
      }
    }
    else {
      toast.error("Vui lòng chọn Ca sĩ hoặc Phần tử cần áp dụng!");
    }
  }

  const handleRecoverySuccess = (id: string) => {
    setTrashList(trashList.filter((item) => item.id != id));
    setPagination(prev => ({
      ...prev,
      totalRecord: prev.totalRecord - 1
    }));
  }

  const handleDeleteSuccess = (id: string) => {
    setTrashList(trashList.filter((item) => item.id != id));
    setPagination(prev => ({
      ...prev,
      totalRecord: prev.totalRecord - 1
    }));
  }

  return (
    <>
      {isLogin && userInfo.permission.includes("singer-trash") && (
        <>
          <Title title={"Thùng rác"} />
          <div className="flex gap-[20px] mt-[30px] flex-wrap">
            {/* Apply Multi */}
            <ul className="flex items-center">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  onChange={(event) => setApplyMultiStatus(event.target.value)}
                  value={applyMultiStatus}
                >
                  <option value="">-- Hành động --</option>
                  <option value="recovery">Phục hồi</option>
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
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-scroll w-full">
            <table className="bg-white w-full min-w-[1000px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[32px] py-[15px] text-left align-middle">
                    <input
                      type="checkbox"
                      className="translate-y-[2px]"
                      onChange={(event) => {
                        if (event.target.checked) setIdList(trashList.map((item) => item.id));
                        else setIdList([]);
                      }}
                    />
                  </th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Tên ca sĩ</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Vị trí</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Trạng thái</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Tạo bởi</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Cập nhật bởi</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {trashList && trashList.length > 0 && trashList.map((item, index) => (
                  <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]" key={index}>
                    <th className="px-[32px] py-[8px] text-left align-middle">
                      <input
                        type="checkbox"
                        className="translate-y-[2px]"
                        checked={idList.includes(item.id)}
                        onChange={() => {
                          setIdList((prev) => prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id])
                        }}
                      />
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">{item.name}</th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      <div className="w-[60px] h-[60px] overflow-hidden">
                        <img src={item.avatar} className="w-full h-full object-cover" />
                      </div>
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                      {item.position}
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      {item.status == "active" ? <Active /> : <Inactive />}
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[12px] text-dark">{item.createdBy}</div>
                        <div className="font-[600] text-[10px] text-dark">{item.createdAt}</div>
                      </div>
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[12px] text-dark">{item.updatedBy}</div>
                        <div className="font-[600] text-[10px] text-dark">{item.updatedAt}</div>
                      </div>
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                        <RecoveryButton
                          api={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/recovery/${item.id}`}
                          id={item.id}
                          handleRecoverySuccess={() => handleRecoverySuccess(item.id)}
                        />
                        <HardDeleteButton
                          api={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/hard-delete/${item.id}`}
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
            <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị {pagination.skip + 1} - {pagination.skip + trashList.length} của {pagination.totalRecord}</div>
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
          </div>
        </>
      )}
    </>
  );
}