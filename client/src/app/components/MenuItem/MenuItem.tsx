import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MenuItem = (props: any) => {
    const pathname = usePathname();
    const { item, isLogin } = props;

    const router = useRouter();
    return (
        <>
            {(item.isLogin === undefined || item.isLogin === isLogin) && (
                <li className="mb-[10px]">
                    <Button
                        variant="outline"
                        className={`flex items-center hover:text-[#00ADEF] text-white bg-transparent hover:bg-transparent border-none p-0 ${pathname === item.link ? "text-[#00ADEF]" : ""}`}
                        onClick={() => router.push(item.link)}
                    >
                        <span className="text-[12px] xl:text-[20px] mr-[15px]">{item.icon}</span>
                        <span className="font-[700] text-[12px] xl:text-[18px]">{item.title}</span>
                    </Button>
                </li>
            )}
        </>
    );
}