import useAuth from "../hooks/useAuth.jsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Spinner from "./Spinner.jsx";

const RequiredAuth = () => {
    const {auth,loading} = useAuth()
    const localtion = useLocation()
    if (loading){
        return (<Spinner/>);
    }
    return auth?(
        <Outlet/>
    ):(
        <Navigate to="/login" state={{from: localtion}} replace/>
    )
}
export default RequiredAuth
