"use client"

import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
    const router = useRouter();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const fullName = event.target.fullName.value;
        const email = event.target.email.value
        const password = event.target.password.value;

        if (fullName && email && password) {
            createUserWithEmailAndPassword(authFireBase, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        set(ref(dbFirebase, `users/${user.uid}`), {
                            fullName: fullName
                        }).then(() => {
                            router.push("/");
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-[15px]">
                    <label
                        className="flex gap-[5px] mb-[5px]"
                        htmlFor="fullName"
                    >
                        <div className="text-[14px] font-[600] text-white">Họ Tên</div>
                        <div className="text-[red]">*</div>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Ví dụ: Le Van A"
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
                    />
                </div>
                <div className="mb-[15px]">
                    <label
                        className="flex gap-[5px] mb-[5px]"
                        htmlFor="email"
                    >
                        <div className="text-[14px] font-[600] text-white">Email</div>
                        <div className="text-[red]">*</div>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ví dụ: levana@gmail.com"
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
                    />
                </div>
                <div className="mb-[15px]">
                    <label
                        className="flex gap-[5px] mb-[5px]"
                        htmlFor="password"
                    >
                        <div className="text-[14px] font-[600] text-white">Mật Khẩu</div>
                        <div className="text-[red]">*</div>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="px-[16px] py-[14px] rounded-[6px] outline-none w-[500px]"
                    />
                </div>
                <button className="bg-[#00ADEF] w-[500px] text-[white] text-[16px] font-[700] rounded-[6px] py-[14px]">Đăng nhập</button>
            </form>
        </>
    );
}