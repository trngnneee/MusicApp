export async function categoryList(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/list`); 

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Lấy danh sách danh mục thất bại");
  }

  return data;
}