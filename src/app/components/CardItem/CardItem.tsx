import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CardItem = (props: { item: any }) => {
    const { item } = props;
    return (
        <>
            <Link href={item.link}>
                <div className="flex flex-col">
                    <img
                        src={item.img}
                        className="mb-[10px]"
                    />
                    <div className="text-[14px] font-[700] mb-[10px] text-white">{item.title}</div>
                    <div className="text-[12px] font-[300] text-[#FFFFFF80] line-clamp-1">{item.content}</div>
                </div>
            </Link>
        </>
    );
}