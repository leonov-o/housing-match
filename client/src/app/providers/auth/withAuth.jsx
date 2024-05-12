import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserRefresh, userSlice} from "@/entities/user/model";

export const withCheckAuth = (Component) => (props) => {
    const {setLoading} = userSlice.actions;
    const {isAuth} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token') && !isAuth) {
            dispatch(fetchUserRefresh())
        }else {
            dispatch(setLoading(false))
        }
    }, [dispatch]);

    return <Component {...props} />;
};
