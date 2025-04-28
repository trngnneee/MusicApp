import Link from "next/link";

export const Create = (props: {link}) => {
  const { link } = props;
  
  return (
    <>
      <Link href={link}>
        <button className="text-[14px] font-[700] text-white py-[25px] px-[28px] bg-[#4880FF] hover:bg-[#7ca0f6] rounded-[14px]">
          + Tạo mới
        </button>
      </Link>
    </>
  );
}