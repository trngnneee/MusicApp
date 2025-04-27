import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="bg-[url('/Shape.png')] bg-cover bg-center min-h-[100%] bg-[#4880FF] py-[50px]">
        <div className="bg-white w-[630px] py-[90px] px-[57px] rounded-[24px] mx-auto">
          <div className="text-center mb-[40px]">
            <h1 className="font-[700] text-[32px] mb-[15px] text-dark">Đăng nhập</h1>
            <div className="font-[600] text-[18px] text-dark">Vui lòng nhập email và mật khẩu để tiếp tục</div>
          </div>
          <form className="mb-[30px]">
            <div className="flex flex-col mb-[30px]">
              <label className="font-[600] text-[18px] text-dark mb-[15px]" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Ví dụ: levana@gmail.com" 
                className="bg-[#F1F4F9] w-full p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[18px] font-[600] text-[#A6A6A6]"
              />
            </div>
            <div className="mb-[30px]">
              <label className="font-[600] text-[18px] text-dark mb-[15px]" htmlFor="password">Mật khẩu</label>
              <input 
                type="password" 
                id="password"
                className="bg-[#F1F4F9] w-full p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[18px] font-[600] text-[#A6A6A6]"
              />
            </div>
            <div className="flex justify-between mb-[30px]">
              <div className="flex items-center gap-[12px]">
                <input 
                  type="checkbox"
                  id="remember-password" 
                  className="w-[24px] h-[24px] rounded-[5px] border-[0.6px] border-[#A3A3A3]"
                />
                <label htmlFor="remember-password" className="font-[600] text-[18px] text-dark opacity-[0.6]">Nhớ mật khẩu</label>
              </div>
              <Link href="/admin/forgot-password" className="font-[600] text-[18px] text-dark opacity-[0.6] hover:opacity-[1]">
                Quên mật khẩu?
              </Link>
            </div>
            <button className="w-full py-[14px] bg-[#4880FF] hover:bg-[#638df0] rounded-[8px] font-[700] text-[20px] text-white">
              Đăng nhập
            </button>
          </form>
          <div className="flex gap-[10px] items-center justify-center">
            <div className="font-[600] text-[18px] text-dark opacity-[0.65]">Bạn chưa có tài khoản?</div>
            <Link href="/admin/register" className="font-[700] text-[18px] underline text-[#4880FF]">Tạo tài khoản</Link>
          </div>
        </div>
      </div>
    </>
  );
}