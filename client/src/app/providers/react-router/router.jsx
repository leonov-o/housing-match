import {createBrowserRouter} from "react-router-dom";
import {
    CreateHousingPage,
    LayoutPage,
    LoginPage,
    MainPage,
    MyHousingPage,
    ProfileLayoutPage,
    ProfilePage,
    RegistrationPage
} from "@/pages";

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
                        element: <MyHousingPage/>
                    },
                    {
                        path: "/profile/housing/create",
                        element: <CreateHousingPage/>
                    },
                    {
                        path: "/profile/housing/create/:id",
                        element: <CreateHousingPage/>
                    }
                ]
            },
            {
                path: "/housing",
                element: <div>Housing Page</div>
            },
            {
                path: "/housing/:id",
                element: <div>housingID</div>
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

