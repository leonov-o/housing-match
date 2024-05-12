import React from 'react';
import {twMerge} from "tailwind-merge";

export const Button = ({variant, className, children, ...props}) => {
    return (
        <div
            className={twMerge(
                "flex h-15 cursor-pointer items-center justify-center rounded-lg py-2 px-4 text-xl font-medium text-white transition duration-100 font-inter",
                variant === "primary" && "bg-blue-400 hover:bg-blue-500",
                variant === "secondary" && "bg-gray-300 hover:bg-gray-400",
                variant === "destructive" && "bg-red-500 hover:bg-red-900",
                className
            )}
            {...props}>
            {children}
        </div>
    );
};
