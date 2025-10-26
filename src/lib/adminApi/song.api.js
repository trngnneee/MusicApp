export const songList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/song/list`); 

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy danh sách bài hát thất bại");
  }

  return data;
}