// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CardInfor = (props: { item: any }) => {
    const { item } = props;
    return (
        <>
            <div className="flex items-center gap-[20px]">
                <img
                    src={item.avatar}
                    className="w-[120px] md:w-[180px] object-cover"
                    onError={(e) => {
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = "/adminAvatar.png"; 
                    }}
                />
                <div>
                    <div className="text-[16px] sm:text-[24px] lg:text-[35px] font-[700] text-[#00ADEF] mb-[10px]">{item.name}</div>
                    <div className="text-[8px] sm:text-[10px] lg:text-[14px] font-[300] text-[#EFEEE0]">{item.description}</div>
                    <div className="text-[8px] sm:text-[10px] lg:text-[14px] font-[300] text-[#EFEEE0]">{item.singer && item.singer.length && item.singer.join(", ")}</div>
                </div>
            </div>
        </>
    );
}