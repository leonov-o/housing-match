import {createBrowserRouter} from "react-router-dom";
import {LayoutPage, LoginPage, MainPage, RegistrationPage} from "@/pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage/>,
        children: [
            {
                path: "/",
                element: <MainPage/>
            },
            {
                path: "/profile",
                element: <div>Profile</div>
            },
            {
                path: "/profile/housing",
                element: <div>My Housing</div>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegistrationPage/>
    }
]);

