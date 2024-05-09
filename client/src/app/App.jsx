import {RouterProvider} from "react-router-dom";
import {router, withStore} from "@/app/providers";
import {withCheckAuth} from "@/app/providers/auth/withAuth.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTags} from "@/entities/tag/index.js";

function App() {
    const {isLoading} = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTags())
    }, [])

    if(isLoading) return null

    return (
        <RouterProvider router={router}/>
    )
}

export default withStore(withCheckAuth(App));
