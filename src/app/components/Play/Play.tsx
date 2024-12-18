import { PlayLeft } from "./PlayLeft";
import { PlayMid } from "./PlayMid";
import { PlayRight } from "./PlayRight";

export const Play = () => {
    return (
        <>
            <div className="bg-[#212121] fixed bottom-0 left-0 z-[999] py-[20px] w-[100%] border-t-[1px] border-t-solid border-[#494949] hidden play-audio">
                <audio className="hidden inner-audio">
                    <source src="/"/>
                </audio>
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left */}
                    <PlayLeft/>
                    {/* Mid */}
                    <PlayMid/>
                    {/* Right */}
                    <PlayRight/>
                </div>
            </div>
        </>
    );
}