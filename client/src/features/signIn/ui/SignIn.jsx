import React from 'react';
import {Link} from "react-router-dom";

export const SignIn = () => {
    return (
        <Link to="/login">
            <div
                className="flex justify-center items-center px-4 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transform duration-200 cursor-pointer text-gray-600 font-inter font-medium">
                Увійти
            </div>
        </Link>

    );
};
