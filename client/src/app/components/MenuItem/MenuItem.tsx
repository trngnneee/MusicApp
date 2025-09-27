import Link from "next/link";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MenuItem = (props: any) => {
    const pathname = usePathname();
    const {item, isLogin} = props;
    return (
        <>
            {(item.isLogin === undefined || item.isLogin === isLogin) && (
                <li className="mb-[15px] sm:mb-[30px]">
                    <Link
                        href={item.link}
                        className={`flex items-center hover:text-[#00ADEF] transition ${pathname === item.link ? "text-[#00ADEF]" : "text-white"}`}
                    >
                        <span className="text-[12px] xl:text-[20px] mr-[15px]">{item.icon}</span>
                        <span className="font-[700] text-[12px] xl:text-[18px]">{item.title}</span>
                    </Link>
                </li>
            )}
        </>
    );
}