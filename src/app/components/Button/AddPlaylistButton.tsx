"use client"

import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref,set } from "firebase/database";
import { useEffect, useState } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { CgPlayListRemove } from "react-icons/cg";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddPlayListButton = (props: any) => {    
    const {item} = props;
    const [isActive, setIsActive] = useState(false);
    const [userId, setUserId] = useState(null);
    const [playlist, setPlayList] = useState(null);
    
    useEffect(() => {
        const fetchUserID = () => {
            onAuthStateChanged(authFireBase, (user) => {
                if (user) setUserId(user.uid);
                else setUserId(null);
            })
        }
        fetchUserID();
    }, [])
        
    useEffect(() => {
        const fetchPlayList = async () => {
            const playListRef = ref(dbFirebase, `users/${userId}/playlist`);
            const snapshot = await get(playListRef);
            const data = snapshot.val();
            setPlayList(data);
        }
        if (userId != null) fetchPlayList();
    }, [userId])

    useEffect(() => {
        if (playlist != null && playlist.includes(item.id))
            setIsActive(true);
    }, [playlist])

    const handleAddPlayList = async () => {
        const userId  = authFireBase?.currentUser?.uid;
        if (userId && item.id)
        {
            const userRef = ref(dbFirebase, `/users/${userId}/playlist`);
            get(userRef).then(async (snapshot) => {
                let playlists = snapshot.val() || [];
                if (!playlists.includes(item.id)) {
                    playlists.push(item.id); 
                    setIsActive(true);
                    Swal.fire({
                        title: "Thêm vào danh sách phát!",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
                else 
                {
                    playlists = playlists.filter((playlistId:string) => playlistId !== item.id);
                    setIsActive(false);
                    Swal.fire({
                        title: "Xóa khỏi danh sách phát!",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
                await set(userRef, playlists);
            })
        }
    }
    
    return (
        <>
            <button 
                className="text-[white] p-[5px] sm:p-[8px] text-[10px] sm:text-[15px] rounded-[50%] border-[2px] border-[#fff] hover:bg-[#9d9c9c43]"
                onClick={handleAddPlayList}    
            >
                {isActive ? <div className="text-[#00ADEF]"><CgPlayListRemove /></div> : <CgPlayListAdd />}
            </button>
        </>
    );
}