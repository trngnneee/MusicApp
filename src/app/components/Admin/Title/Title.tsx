export const Title = (props: {title, className?}) => {
  const { title, className="" } = props;
  
  return (
    <>
      <div className={"font-[700] text-[32px] text-dark " + className}>{title}</div>
    </>
  );
}