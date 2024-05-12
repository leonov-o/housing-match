import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "@/widgets/index.js";

export const LayoutPage = () => {
    return (
        <div className="bg-[url('./assets/images/main-page-bg.png')] bg-no-repeat bg-top">
            <div className="px-40 pt-5">
                <Header/>
            </div>

            <Outlet/>
        </div>
    );
};
