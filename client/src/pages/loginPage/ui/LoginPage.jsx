import React, {useEffect} from 'react';
import {Input} from "@/shared/ui/Input.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserLogin} from "@/entities/user/model/store/actionCreators.js";

export const LoginPage = () => {
    const {isAuth, isLoading, error} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(`/`)
        }
    }, [isAuth])

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Неправильна адреса електронної пошти")
            .required("Обов'язково"),
        password: Yup.string().min(6, "Мінімальна довжина пароля 6 символів").required("Обов'язково"),

    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            dispatch(fetchUserLogin(values))
        },
    });
    return (
        <div className="bg-[url('./assets/images/login-bg.png')] bg-center flex justify-end h-[100vh]">
            <form className="flex w-1/3 flex-col items-center justify-center bg-white px-16"
                  onSubmit={formik.handleSubmit}>
                <div className="text-4xl font-bold font-montserrat">Вхід</div>
                <div className="font-montserrat mt-2 font-light">Ще не маєте акаунту? <Link to="/register"
                                                                                            className="text-blue-500">Реєстрація</Link>
                </div>
                <div className="mt-6 flex flex-col items-center justify-center">
                    {
                        error && <div className="text-red-600">{error}</div>
                    }
                    <Input type="email" id="email" name="email" placeholder="Email" onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.email}
                           className={clsx(
                               "mt-9 w-96 h-14 text-lg",
                               {
                                   ["border-red-600"]: formik.touched.email && formik.errors.email,
                               }
                           )}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-600">{formik.errors.email}</div>
                    ) : null}
                    <Input type="password" id="password" name="password" placeholder="Пароль"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}
                           className={clsx(
                               "mt-9 w-96 h-14 text-lg",
                               {
                                   ["border-red-600"]: formik.touched.password && formik.errors.password,
                               }
                           )}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-600">{formik.errors.password}</div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="mt-9 flex h-14 w-96 items-center justify-center rounded-lg bg-blue-400 text-2xl font-medium text-white transition duration-300 font-inter hover:bg-blue-500">
                    {
                       isLoading ? "Завантаження..." : "Продовжити"
                    }
                </button>
            </form>
        </div>
    );
};
