import { Metadata } from "next";
import { Title } from "./components/Title/Title";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Trang chủ",
    description: "Nghe nhạc trực tuyến",
};

export default function NotFoundPage() {
    return (
        <>
            <div className="text-center">
                <Title
                    title="404 Not Found"
                    className="text-center mt-[200px] text-[50px]"
                />
                <Link href="/">
                    <button className="bg-[#ddd] py-[5px] px-[20px] rounded-[10px] font-[500] text-[20px]">Trở về trang chủ</button>
                </Link>
            </div>
        </>
    );
}