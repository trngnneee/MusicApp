import Link from "next/link";

export const Trash = (props: { link }) => {
  const { link } = props;

  return (
    <>
      <Link href={link}>
        <button className="px-[30px] py-[25px] text-[14px] font-[700] text-[#EF3826] bg-[#ee453648] hover:bg-[#ef372680] rounded-[14px]">
          Thùng rác
        </button>
      </Link>
    </>
  );
}