export const Title = (props: {title: string, className?: string}) => {
    const {title, className = ""} = props;
    return (
        <>
            <div className={"font-[700] text-[20px] xl:text-[24px] text-white mb-[5px] sm:mb-[20px] " + className}>{title}</div>
        </>
    );
}