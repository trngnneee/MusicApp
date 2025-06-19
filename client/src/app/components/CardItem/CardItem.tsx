import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CardItem = (props: { item: any }) => {
    const { item } = props;
    return (
        <>
            <Link href={item.link}>
                <div className="flex flex-col">
                    <div className="w-full h-[200px] overflow-hidden mb-[10px] rounded-[10px]">
                        <img
                            src={item.avatar}
                            className="mb-[10px] w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-[12px] md:text-[14px] font-[700] mb-[5px] md:mb-[8px] text-white">{item.name}</div>
                    <div className="text-[10px] md:text-[12px] font-[300] text-[#FFFFFF80] line-clamp-1">{item.description}</div>
                </div>
            </Link>
        </>
    );
}