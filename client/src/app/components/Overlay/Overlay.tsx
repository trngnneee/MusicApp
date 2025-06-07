"use client"

export const Overlay = () => {
    const handleClick = () => {
        const siderElement = document.querySelector(".sider");
        const overlayElement = document.querySelector(".overlay");
        siderElement.classList.toggle("active");
        overlayElement.classList.toggle("active");
    }
    
    return (
        <>
            <div className="overlay hidden absolute top-0 left-0 bg-[#000000a8] w-full h-full z-[900] cursor-pointer" onClick={handleClick}></div>
        </>
    );
}