import React from 'react';
import {ExitIcon} from "@radix-ui/react-icons";
import {useDispatch} from "react-redux";
import {fetchUserLogout} from "@/entities/user/model/index.js";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
        dispatch(fetchUserLogout());
        navigate("/");
    }
    return (
        <div className="flex items-center space-x-3 h-10 hover:bg-gray-100 px-7 cursor-pointer" onClick={handleClick}>
            <div className="w-8 h-8 flex justify-center items-center">
                <ExitIcon width={20} height={20}/>
            </div>
            <div className="font-inter font-medium text-xl">Вийти</div>
        </div>
    );
};
