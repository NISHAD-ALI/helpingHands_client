import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getProfile } from "../../Api/userApi";
import { userLogout } from "../../Redux/Slices/Auth";
import Loader from "./Loader";

const IsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await getProfile();
                if (res?.response?.data?.message === "User is blocked by admin!" || 
                    res?.response?.data?.message === 'Session has expired, please log in again.') {
                    setIsLoggedIn(false);
                    dispatch(userLogout());
                } else {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                console.log(err);
                setIsLoggedIn(false);
                dispatch(userLogout());
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }

    return <Outlet />;
}

export default IsLoggedIn;
