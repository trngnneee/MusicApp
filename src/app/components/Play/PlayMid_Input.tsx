"use client"

export const PlayMidInput = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event: any) => {
        const elementTotal = event.target;
        const value = parseInt(elementTotal.value);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const elementPlayAudio: any = document.querySelector(".play-audio");
        const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
        elementAudio.currentTime = value;
    }
    
    return (
        <>
            <div className="relative inner-time">
                <div className="h-[4px] w-[80%] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[13px] inner-time-current"></div>
                <input
                    type="range"
                    min={0}
                    max={0}
                    defaultValue={80}
                    className="w-full h-[4px] bg-[#FFFFFF0A] appearance-none rounded-[50px] cursor-pointer range-sm inner-time-total"
                    onChange={handleChange}
                />
            </div>
        </>
    );
}