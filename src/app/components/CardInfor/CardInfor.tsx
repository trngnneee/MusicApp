// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CardInfor = (props: {item: any}) => {
    const {item} = props;
    return (
        <>
            <div className="flex items-center gap-[20px]">
                <img
                    src={item.img}
                    className="w-[180px] object-cover"
                />
                <div>
                    <div className="text-[35px] font-[700] text-[#00ADEF] mb-[10px]">{item.title}</div>
                    <div className="text-[14px] font-[300] text-[#EFEEE0]">{item.content}</div>
                </div>
            </div>
        </>
    );
}