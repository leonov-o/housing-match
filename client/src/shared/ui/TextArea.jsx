import React from 'react';
import {twMerge} from "tailwind-merge";

export const TextArea = ({label, className, ...props}) => {
    return (
        <div className="relative">
            {
                label && <div className="text-lg font-semibold font-montserrat ml-3 mb-1.5">{label}</div>
            }
            <textarea
                className={twMerge(
                    "h-12 w-64 rounded-lg bg-gray-100 p-4 text-lg text-black font-medium outline-none font-montserrat",
                    className
                )}
                {...props}
            />
        </div>
    );
};
