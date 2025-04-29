import { Title } from "@/app/components/Admin/Title/Title";

export default function ProfileResetPassword() {
  return (
    <>
      <Title title={"Thông tin cá nhân"} />
      <div className="mt-[30px]">
        <form className="bg-white border-[0.3px] border-[#B9B9B9] rounded-[14px] p-[20px] sm:p-[50px]">
          <div className="flex flex-col sm:flex-row gap-[15px] sm:gap-[30px] w-full mb-[30px]">
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Mật khẩu mới</label>
              <input type="password" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
            <div className="w-full sm:w-[48%]">
              <label className="text-[14px] font-[600px] text-dark mb-[11px] block">Xác nhận mật khẩu mới</label>
              <input type="password" className="w-full py-[18px] px-[23px] text-[14px] font-[500] outline-none bg-[#F5F6FA] rounded-[4px] border-[0.6px] border-[#D5D5D5]" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="px-[50px] sm:px-[98px] py-[16px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[12px] font-[700] text-[18px] text-white text-center mx-auto">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </>
  );
}