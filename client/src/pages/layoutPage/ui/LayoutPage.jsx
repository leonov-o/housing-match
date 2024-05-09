import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "@/widgets/index.js";

export const LayoutPage = () => {
    return (
        <div className="">
            <div className="px-40 pt-5">
                <Header/>
            </div>

            <Outlet/>
        </div>
    );
};
