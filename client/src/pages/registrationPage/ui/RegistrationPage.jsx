import React, {useEffect} from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {Input} from "@/shared/ui/Input.jsx";
import clsx from "clsx";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserLogin, fetchUserRegistration} from "@/entities/user/model/store/actionCreators.js";

export const RegistrationPage = () => {
    const {isAuth, isLoading, error} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(`/`)
        }
    }, [isAuth])

    const initialValues = {
        name: "",
        surname: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Обов'язково"),
        surname: Yup.string().required("Обов'язково"),
        email: Yup.string()
            .email("Неправильна адреса електронної пошти")
            .required("Обов'язково"),
        password: Yup.string().min(6, "Мінімальна довжина пароля 6 символів").required("Обов'язково"),

    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            dispatch(fetchUserRegistration(values))
        },
    });
    return (
        <div className="bg-[url('./assets/images/login-bg.png')] bg-center flex justify-end h-[100vh]">
            <form className="flex w-1/3 flex-col items-center justify-center bg-white px-16"
                  onSubmit={formik.handleSubmit}>
                <div className="text-4xl font-bold font-montserrat">Реєстрація</div>
                <div className="font-montserrat mt-2 font-light">Вже маєте акаунт? <Link to="/login" className="text-blue-500">Вхід</Link>
                </div>
                <div className="mt-6 flex flex-col items-center justify-center">
                    <Input type="text" id="name" name="name" placeholder="І'мя" onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.name}
                           className={clsx(
                               "mt-9 w-96 h-14 text-lg",
                               {
                                   ["border-red-600"]: formik.touched.name && formik.errors.name,
                               }
                           )}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-600">{formik.errors.name}</div>
                    ) : null}
                    <Input type="text" id="surname" name="surname" placeholder="Прізвище" onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.surname}
                           className={clsx(
                               "mt-9 w-96 h-14 text-lg",
                               {
                                   ["border-red-600"]: formik.touched.surname && formik.errors.surname,
                               }
                           )}
                    />
                    {formik.touched.surname && formik.errors.surname ? (
                        <div className="text-red-600">{formik.errors.surname}</div>
                    ) : null}
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
                    Продовжити
                </button>
            </form>
        </div>
    );
};
