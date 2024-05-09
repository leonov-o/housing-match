import React, {useEffect} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const ProfileLayoutPage = () => {
    const {isAuth, isLoading, user} = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth && !isLoading) {
            navigate("/login");
        }
    }, [isAuth, isLoading]);

    return (
        <div className="mt-36 mx-40 p-6 bg-white rounded-t-2xl h-[76vh]">
            {
                !user.is_activated && (
                    <div className="bg-yellow-100 p-4 rounded-lg mb-5 text-inter text-yellow-600">
                        <div className="font-medium ">
                            Увага! Ваш обліковий запис ще не активовано.
                        </div>
                        <div className="font-normal">
                            Для завершення реєстрації та активації облікового запису, будь ласка, перевірте свою електронну пошту та перейдіть за посиланням, яке ми відправили.
                        </div>
                    </div>
                )
            }
            <div className="flex">
                <div className="w-1/4 border-r-gray-400 border-r-2 font-inter font-medium text-xl">
                    <Link to="/profile">
                        <div
                            className="px-7 h-10 hover:bg-gray-200 transition duration-300 flex items-center rounded-l-lg cursor-pointer">Профіль
                        </div>
                    </Link>
                    <Link to="/profile/housing">
                        <div
                            className="px-7 h-10 hover:bg-gray-200 transition duration-300 flex items-center rounded-l-lg cursor-pointer">Мої
                            оголошення
                        </div>
                    </Link>
                    <div
                        className="text-red-400 px-7 h-10 hover:bg-gray-200 transition duration-300 flex items-center rounded-l-lg cursor-pointer">Видалити
                        акаунт</div>
                </div>
                <div className="flex flex-grow justify-center p-4">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};
