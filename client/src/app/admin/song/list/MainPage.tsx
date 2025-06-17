"use client"

import { Create } from "@/app/components/Admin/Create/Create";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { Trash } from "@/app/components/Admin/Trash/Trash";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";
import { FiEdit, FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaUndoAlt } from "react-icons/fa";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/app/components/Admin/Button/DeleteButton/DeleteButton";
import { Search } from "@/app/components/Admin/Search/Search";

export const MainPage = () => {
  const router = useRouter();
  const { isLogin, userInfo } = useAuth();
  const [songList, setSongList] = useState<any[]>([]);
  const [adminAccountList, setAdminAccountList] = useState<any[]>([]);
  const [categoryTree, setCategoryTree] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>();

  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

  const [idList, setIdList] = useState([]);
  const [applyMultiStatus, setApplyMultiStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (createdBy) params.append("createdBy", createdBy);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (page) params.append("page", page);

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/song/list?${params.toString()}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then((data) => {
        setSongList(data.songList);
        setAdminAccountList(data.adminAccountList);
        setCategoryTree(data.categoryTree);
        setPagination(data.pagination);
      })
  }, [status, createdBy, startDate, endDate, category, search, page]);

  const renderOption = (categoryTree: any[], level = 0) => {
    return categoryTree.map((category, index) => (
      <React.Fragment key={index}>
        <option value={category.id}>
          {`${'--'.repeat(level + 1)} ${category.name}`}
        </option>
        {category.children && category.children.length && renderOption(category.children, level + 1)}
      </React.Fragment>
    ))
  };

  const handleClearFilter = () => {
    setStatus("");
    setCreatedBy("");
    setStartDate("");
    setEndDate("");
    setCategory("");
  }

  const handleApplyMulti = () => {
    if (idList && idList.length && applyMultiStatus) {
      const finalData = {
        status: applyMultiStatus,
        idList: idList
      };

      const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/song/apply-multi`, {
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
            if (applyMultiStatus == "delete") {
              setSongList(songList.filter((item) => !idList.includes(item.id)));
              setPagination(prev => ({
                ...prev,
                totalRecord: prev.totalRecord - 1
              }));
            }
            else {
              setSongList(songList.map((item) => {
                if (idList.includes(item.id)) {
                  return { ...item, status: applyMultiStatus };
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
    setSongList(songList.filter((item) => item.id != id));
    setPagination(prev => ({
      ...prev,
      totalRecord: prev.totalRecord - 1
    }));
  }

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Quản lý bài hát"} />
          {/* Filter */}
          <div className="w-full overflow-x-auto">
            <ul className="flex items-center mt-[30px] min-w-[900px] w-fit">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <FiFilter className="text-dark" />
                <div className="text-[14px] font-[700] text-dark truncate">Bộ Lọc</div>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  onChange={(event) => setStatus(event.target.value)}
                  value={status}
                >
                  <option value="">Trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  onChange={(event) => setCreatedBy(event.target.value)}
                  value={createdBy}
                >
                  <option value="">Người tạo</option>
                  {adminAccountList && adminAccountList.length > 0 && adminAccountList.map((item, index) => (
                    <option value={item.id} key={index}>{item.fullName}</option>
                  ))}
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[15px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
                <input
                  type="date"
                  className="text-[12px] font-[700] text-dark outline-none"
                  onChange={(event) => setStartDate(event.target.value)}
                  value={startDate}
                />
                <span className="text-[14px] font-[700] text-dark outline-none">-</span>
                <input
                  type="date"
                  className="text-[12px] font-[700] text-dark outline-none"
                  onChange={(event) => setEndDate(event.target.value)}
                  value={endDate}
                />
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[15px] border-[0.6px] border-[#D5D5D5] border-l-0 flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  onChange={(event) => setCategory(event.target.value)}
                  value={category}
                >
                  <option value="">Danh mục</option>
                  {categoryTree && categoryTree.length > 0 && renderOption(categoryTree)}
                </select>
              </li>
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[15px] border-[0.6px] border-[#D5D5D5] border-l-0 rounded-r-[14px] flex gap-[12px] items-center bg-white">
                <button
                  className="flex items-center gap-[10px] text-[#EA0234] truncate"
                  onClick={handleClearFilter}
                >
                  <FaUndoAlt />
                  <div className="text-[14px] font-[700]">Xóa bộ lọc</div>
                </button>
              </li>
            </ul>
          </div>
          {/* End Filter */}
          <div className="flex gap-[20px] mt-[15px] flex-wrap">
            {/* Apply Multi */}
            <ul className="flex flex-row items-center">
              <li className="py-[15px] xl:py-[26px] px-[15px] xl:px-[24px] border-[0.6px] border-[#D5D5D5] rounded-l-[14px] flex gap-[12px] items-center bg-white">
                <select
                  className="text-[14px] font-[700] text-dark outline-none"
                  value={applyMultiStatus}
                  onChange={(event) => setApplyMultiStatus(event.target.value)}
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
            <Search
              onSearchChange={setSearch}
            />
            <div className="flex gap-[20px]">
              <Create link={"/admin/song/create"} />
              <Trash link={"/admin/song/trash"} />
            </div>
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-auto w-full">
            <table className="bg-white w-full min-w-[1200px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[32px] py-[15px] text-left align-middle">
                    <input
                      type="checkbox"
                      className="translate-y-[2px]"
                      onChange={(event) => {
                        if (event.target.checked) setIdList(songList.map((item) => item.id));
                        else setIdList([]);
                      }}
                    />
                  </th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Tên bài hát</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Ca sĩ</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Danh mục</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Trạng thái</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Tạo bởi</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Cập nhật bởi</th>
                  <th className="px-[15px] py-[15px] text-left align-middle">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {songList && songList.length > 0 && songList.map((item, index) => (
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
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark w-[200px]">
                      {item.name}
                    </th>
                    <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle">
                      <div className="w-[60px] h-[60px] overflow-hidden">
                        <img src={item.avatar} className="w-full h-full object-cover" />
                      </div>
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">
                      {item.singerList && item.singerList.length > 0 && item.singerList.map((singer: string, index: number) => (
                        <div className="font-[600] text-[12px] text-dark truncate" key={index}>{singer}</div>
                      ))}
                    </th>
                    <th className="px-[15px] xl:px-[20px] py-[8px] text-left align-middle font-[600] text-[12px] text-dark">
                      {item.categoryName}
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      {item.status == "active" ? <Active /> : <Inactive />}
                    </th>
                    <th className="px-[10px] xl:px-[10px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[12px] text-dark">{item.createdBy}</div>
                        <div className="font-[600] text-[10px] text-dark">{item.createdAt}</div>
                      </div>
                    </th>
                    <th className="px-[10px] xl:px-[10px] py-[8px] text-left align-middle">
                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-[12px] text-dark">{item.updatedBy}</div>
                        <div className="font-[600] text-[10px] text-dark">{item.updatedAt}</div>
                      </div>
                    </th>
                    <th className="px-[15px] py-[8px] text-left align-middle">
                      <div className="bg-[#FAFBFD] border-[0.6px] border-[#D5D5D5] rounded-[8px] w-[100px]">
                        <button
                          className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"
                          onClick={() => { router.push(`/admin/song/edit/${item.id}`) }}
                        >
                          <FiEdit />
                        </button>
                        <DeleteButton
                          api={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/song/delete/${item.id}`}
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
                <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị {pagination.skip + 1} - {pagination.skip + songList.length} của {pagination.totalRecord}</div>
                <div className="border-[0.6px] border-[#D5D5D5] rounded-[8px]">
                  <select
                    className="px-[14px] py-[6px] rounded-[8px] outline-none text-[14px] font-[600] text-dark opacity-[0.6]"
                    onChange={(event) => setPage(event.target.value)}
                  >
                    {[...Array(pagination.totalPage)].map((_, i) => (
                      <option key={i} value={i + 1}>Trang {i + 1}</option>
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