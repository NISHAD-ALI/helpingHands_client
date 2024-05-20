import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
interface RootState {
    auth: {
        userData: string | null;
    };
}

const IsLoggedOut: React.FC = () => {
    const userData = useSelector((state: RootState) => state.auth.userData);

    if (userData) {
        return <Navigate to='/' />;
    } else {
        return <Outlet />;
    }
}

export default IsLoggedOut;
