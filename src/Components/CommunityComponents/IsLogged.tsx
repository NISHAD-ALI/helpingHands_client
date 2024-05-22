import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Navigate, Outlet } from "react-router-dom";

export default function IsLoggedIn() {
    const communityData = useSelector((state: RootState) => state.auth.communityData);
    return (
        communityData ? <Outlet /> : <Navigate to='/community/login' />
    );
}

