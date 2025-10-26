export const Title = ({ title, desc }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-[25px] sm:text-[32px]">{title}</div>
      <div className="font-medium text-[14px] sm:text-[16px] text-[#202224] opacity-[0.8]">{desc}</div>
    </div>
  )
}