import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchUserRefresh} from "@/entities/user/model";

export const withCheckAuth = (Component) => (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUserRefresh())
        }
    }, [dispatch]);

    return <Component {...props} />;
};
