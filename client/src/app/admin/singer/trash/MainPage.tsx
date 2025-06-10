"use client"

import { MultipleApplyTrash } from "@/app/components/Admin/MultipleApply/MultipleApplyTrash";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";
import { toast } from "sonner";
import { IoSearch } from "react-icons/io5";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();
  const [trashList, setTrashList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>("");

  const [idList, setIdList] = useState([]);
  const [applyMultiStatus, setApplyMultiStatus] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

  const fetchData = () => {
    let query = "";

    if (page) query += `?page=${page}`;
    if (search) query += `?search=${search}`;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/list${query}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          setTrashList(data.trashList);
          setPagination(data.pagination);
        }
      })
  }

  useEffect(() => {
    fetchData();
  }, [page, search])

  const handleApplyMulti = () => {
    if (idList && idList.length && applyMultiStatus) {
      const finalData = {
        status: applyMultiStatus,
        idList: idList
      };

      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/apply-multi`, {
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
    }
    else {
      toast.error("Vui lòng chọn Ca sĩ hoặc Phần tử cần áp dụng!");
    }
  }

  const handleRecovery = (id) => {
    const finalData = {
      id: id
    };

    const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/recovery`, {
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
  }

  const handleHardDelete = (id) => {
    const finalData = {
      id: id
    };

    const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/singer/trash/hard-delete`, {
      method: "DELETE",
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
  }

  return (
    <>
      {isLogin && (
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
                        if (event.target.checked) setIdList(trashList.map((item) => item.id));
                        else setIdList([]);
                      }}
                    />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tên bài hát</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Vị trí</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Trạng thái</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tạo bởi</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Cập nhật bởi</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Hành động</th>
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
                    <th className="px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">{item.name}</th>
                    <th className="px-[32px] py-[8px] text-left align-middle">
                      <div className="w-[60px] h-[60px] overflow-hidden">
                        <img src={item.avatar} className="w-full h-full object-cover" />
                      </div>
                    </th>
                    <th className="px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                      {item.position}
                    </th>
                    <th className="px-[32px] py-[8px] text-left align-middle">
                      <Active />
                    </th>
                    <th className="px-[32px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[14px] text-dark">{item.createdBy}</div>
                        <div className="font-[600] text-[12px] text-dark">{item.createdAt}</div>
                      </div>
                    </th>
                    <th className="px-[32px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[14px] text-dark">{item.updatedBy}</div>
                        <div className="font-[600] text-[12px] text-dark">{item.updatedAt}</div>
                      </div>
                    </th>
                    <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                      <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                        <button
                          className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"
                          onClick={() => handleRecovery(item.id)}
                        >
                          <RiResetLeftFill />
                        </button>
                        <button
                          className="px-[16px] py-[11px] text-[#EF3826]"
                          onClick={() => handleHardDelete(item.id)}
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