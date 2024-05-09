import React from 'react';
import {PersonIcon} from "@radix-ui/react-icons";
import {twMerge} from "tailwind-merge";

export const Avatar = ({src, className}) => {
    return (
        <div className={twMerge(
            "w-10 h-10 rounded-full overflow-hidden flex justify-center items-center",
            src ? "" : "bg-gray-200",
            className
        )}>
            {
                src ? <img className="w-full h-full" src={src} alt="avatar"/> : <PersonIcon className="w-max h-max" width={22} height={25}/>
            }
        </div>
    );
};
