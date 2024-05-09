import {RouterProvider} from "react-router-dom";
import {router, withStore} from "@/app/providers";
import {withCheckAuth} from "@/app/providers/auth/withAuth.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchTags} from "@/entities/tag/index.js";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTags())
    }, [])

    return (
        <RouterProvider router={router}/>
    )
}

export default withStore(withCheckAuth(App));
