import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Nghe nhạc trực tuyến",
};

export default function RegisterPage() {
  return (
    <>
      <div className="mt-[60px] mx-auto w-[500px]">
        <Title
          title="Đăng Ký Tài Khoản"
          className="text-center"
        />
        <form>
          <div className="mb-[15px]">
            <label
              className="flex gap-[5px] mb-[5px]"
              htmlFor="fullName"
            >
              <div className="text-[14px] font-[600] text-white">Họ Tên</div>
              <div className="text-[red]">*</div>
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Ví dụ: Le Van A"
              className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
            />
          </div>
          <div className="mb-[15px]">
            <label
              className="flex gap-[5px] mb-[5px]"
              htmlFor="email"
            >
              <div className="text-[14px] font-[600] text-white">Email</div>
              <div className="text-[red]">*</div>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ví dụ: levana@gmail.com"
              className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
            />
          </div>
          <div className="mb-[15px]">
            <label
              className="flex gap-[5px] mb-[5px]"
              htmlFor="password"
            >
              <div className="text-[14px] font-[600] text-white">Mật Khẩu</div>
              <div className="text-[red]">*</div>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
            />
          </div>
          <button className="bg-[#00ADEF] w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Đăng nhập</button>
        </form>
      </div>
    </>
  );
}