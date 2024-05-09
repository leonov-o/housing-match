import React from 'react';
import {PersonIcon} from "@radix-ui/react-icons";
import {twMerge} from "tailwind-merge";

export const Avatar = ({src, className, ...props}) => {
    return (
        <div className={twMerge(
            "w-10 h-10 rounded-full overflow-hidden flex justify-center items-center",
            src ? "" : "bg-gray-200",
            className
        )} {...props}>
            {
                src ? <img className="w-full h-full" src={src} alt="avatar"/> : <PersonIcon className="w-1/2 h-1/2" width={22} height={25}/>
            }
        </div>
    );
};
