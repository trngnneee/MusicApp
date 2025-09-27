import { PlayMidButton } from "./PlayMid-Button"
import { PlayMidInput } from "./PlayMid_Input";

export const PlayMid = () => {
    return (
        <>
            <div className="flex-0 sm:flex-1 mx-[15px] md:mx-[66px]">
                <PlayMidButton/>
                <PlayMidInput/>
            </div>
        </>
    );
}