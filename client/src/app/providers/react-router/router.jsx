import {createHashRouter} from "react-router-dom";
import {
    CreateHousingPage,
    HousingPage,
    LayoutPage,
    LoginPage,
    MainPage,
    MyHousingPage,
    ProfileLayoutPage,
    ProfilePage,
    RegistrationPage,
    SearchPage
} from "@/pages";

export const router = createHashRouter([
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
                element: <SearchPage/>
            },
            {
                path: "/housing/:id",
                element: <HousingPage/>
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

