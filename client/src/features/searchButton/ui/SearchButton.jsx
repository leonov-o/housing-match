import React from 'react';
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Button} from "@/shared/ui/Button.jsx";

export const SearchButton = ({...props}) => {
    return (
        <Button variant="primary" className="px-4 text-xl" {...props}>
            <MagnifyingGlassIcon width={25} height={25} className="text-white"/>
            <div className="ml-1.5">Пошук</div>
        </Button>
    );
};

