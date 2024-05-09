import React from 'react';
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

export const SearchButton = () => {
    return (
        <div className="flex justify-center items-center px-4 h-12 rounded-lg bg-blue-400 hover:bg-blue-500 transform duration-200 cursor-pointer text-white font-inter font-medium">
            <MagnifyingGlassIcon width={20} height={20} className="text-white"/>
            <div className="ml-1.5">Пошук</div>
        </div>
    );
};

