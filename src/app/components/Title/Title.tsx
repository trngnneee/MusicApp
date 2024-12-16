export const Title = (props: {title: string, className?: string}) => {
    const {title, className = ""} = props;
    return (
        <>
            <div className={"font-[700] text-[24px] text-white mb-[20px] " + className}>{title}</div>
        </>
    );
}