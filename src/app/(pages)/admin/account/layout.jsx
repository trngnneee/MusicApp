export default function AdminAccountLayout({ children }) {
  return (
    <>
      <div
        className="bg-[url(/account_feature.svg)] w-full h-full bg-[#4880FF] bg-no-repeat bg-center bg-cover"
      >
        <div className="container mx-auto flex justify-center items-center min-h-screen">
          {children}
        </div>
      </div>
    </>
  );
}