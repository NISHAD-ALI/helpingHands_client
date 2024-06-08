import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Navigate, Outlet } from "react-router-dom";

export default function IsLoggedIn() {
    const adminData = useSelector((state: RootState) => state.auth.adminData);
    return (
        adminData ? <Outlet /> : <Navigate to='/admin/login' />
    );
}

