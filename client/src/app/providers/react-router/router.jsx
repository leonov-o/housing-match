import {createBrowserRouter} from "react-router-dom";
import {LayoutPage, LoginPage, MainPage, ProfileLayoutPage, ProfilePage, RegistrationPage} from "@/pages";

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
                element: <ProfileLayoutPage/>,
                children: [
                    {
                        path: "/profile",
                        element: <ProfilePage/>
                    },
                    {
                        path: "/profile/housing",
                        element: <div>Housing</div>
                    }
                ]
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

