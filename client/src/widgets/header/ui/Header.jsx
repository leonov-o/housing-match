import React from 'react';
import {SignIn} from "@/features/index.js";
import {Avatar} from "@/shared/ui/Avatar.jsx";
import {useSelector} from "react-redux";
import {UserDropdown} from "@/widgets/index.js";
import {Link} from "react-router-dom";

export const Header = () => {
    const {isAuth, user} = useSelector(state => state.user);

    return (
        <div className="h-16 w-full px-8 flex justify-between items-center bg-white rounded-lg relative z-10">
            <Link to="/">
                <div className="font-kodchasan font-medium text-2xl text-black">
                    ЖитлоMatch
                </div>
            </Link>
            {
                isAuth
                    ? (
                        <div className="flex items-center space-x-4">
                                <Avatar src={user.avatar?.imageLink}/>
                                <UserDropdown/>
                            </div>
                        )
                        : <SignIn/>
                }
        </div>
    );
};

