import React, {useEffect, useRef, useState} from 'react';
import {ChevronDownIcon, ChevronUpIcon, ExitIcon, GearIcon, HomeIcon} from "@radix-ui/react-icons";
import {useSelector} from "react-redux";
import {Avatar} from "@/shared/ui/Avatar.jsx";
import {Link} from "react-router-dom";
import {LogoutButton} from "@/features/index.js";

export const UserDropdown = () => {
    const [open, setOpen] = useState(false);
    const {user} = useSelector(state => state.user)
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative z-20" ref={dropdownRef}>
            <div className="w-11 h-9 bg-gray-100 flex justify-center items-center rounded-lg"
                 onClick={() => setOpen(!open)}>
                {open ? <ChevronUpIcon width={20} height={20} className="text-gray-500"/> :
                    <ChevronDownIcon width={20} height={20} className="text-gray-500"/>}
            </div>
            {
                open && (
                    <div className="w-72 h-36 rounded-lg absolute bg-white top-16 -right-8 py-3 space-y-1" onClick={() => setOpen(false)}>
                        <Link to="/profile">
                            <div className="flex items-center space-x-3 h-10 hover:bg-gray-100 px-7 cursor-pointer">
                                <Avatar className="w-8 h-8" src={user.avatar?.imageLink}/>
                                <div className="font-inter font-medium text-xl">Профіль</div>
                            </div>
                        </Link>
                        <Link to="/profile/housing">
                            <div className="flex items-center space-x-3 h-10 hover:bg-gray-100 px-7 cursor-pointer">
                                <div className="w-8 h-8 flex justify-center items-center">
                                    <HomeIcon width={22} height={22}/>
                                </div>
                                <div className="font-inter font-medium text-xl">Мої оголошення</div>
                            </div>
                        </Link>
                        <LogoutButton/>
                    </div>
                )
            }
        </div>
    );
};

