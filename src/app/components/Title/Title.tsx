export const Title = (props: {title: string}) => {
    const {title} = props;
    return (
        <>
            <div className="font-[700] text-[24px] text-white mb-[20px]">{title}</div>
        </>
    );
}