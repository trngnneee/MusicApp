"use client"
import { authFireBase, dbFirebase } from "@/app/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export const HeartButton = (props: any) => {
    const {item} = props;
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        onAuthStateChanged(authFireBase, (user) => {
            if (user)
            {
                const userId = user.uid;
                const wishlist = item.wishlist;
                if (wishlist)
                {
                    if (wishlist[userId])
                    {
                        setIsActive(true);
                    }
                }
            }
        })
    }, [])

    const handleClick = () => {
        const userId  = authFireBase?.currentUser?.uid;
        if (userId && item.id)
        {
            const songRef = ref(dbFirebase, `/songs/${item.id}`);
            runTransaction(songRef, (song) => {
                if (song) {
                  if (song.wishlist && song.wishlist[userId]) {
                    song.wishlist[userId] = null;
                    setIsActive(false);
                  } else {
                    if (!song.wishlist) {
                      song.wishlist = {};
                    }
                    song.wishlist[userId] = true;
                    setIsActive(true);
                  }
                }
                return song;
              });
        }
    }

    return (
        <>
            <button 
                className="text-[white] rounded-[50%] p-[8px] text-[20px]"
                onClick={handleClick}
            >
                {isActive ? (<FaHeart />) : (<FaRegHeart />)}
            </button>
        </>
    );
}