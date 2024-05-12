import React from 'react';
import {twMerge} from "tailwind-merge";

export const Tag = ({tag, className}) => {
    return (
        <div className={twMerge(
            "p-2 h-7 flex justify-center items-center bg-blue-400 text-white text-xs font-inter font-light rounded-lg shadow",
            className
        )}>
            {tag}
        </div>
    );
};
