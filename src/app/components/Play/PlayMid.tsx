import { PlayMidButton } from "./PlayMid-Button"
import { PlayMidInput } from "./PlayMid_Input";

export const PlayMid = () => {
    return (
        <>
            <div className="flex-1 mx-[66px]">
                <PlayMidButton/>
                <PlayMidInput/>
            </div>
        </>
    );
}