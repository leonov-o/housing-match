import React, {useState} from 'react';
import {twMerge} from "tailwind-merge";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";

export const Input = ({type,  className, ...props}) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <input
                type={type === "password" ? (show ? "text" : "password") : type}
                className={twMerge(
                    "ml-2 h-12 w-64 rounded-lg bg-gray-100 p-4 text-lg text-black font-medium outline-none font-montserrat font-medium",
                    className
                )}
                {...props}
            />
            <div className="absolute top-14 right-4 ">
                {
                    type === "password" && (!show
                        ? <EyeClosedIcon className="text-gray-500" width={20} height={20} onClick={() => setShow(!show)}/>
                        : <EyeOpenIcon className="text-gray-500" width={20} height={20} onClick={() => setShow(!show)}/>)
                }
            </div>
        </div>
    );
}
