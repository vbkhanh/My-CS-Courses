import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./Authentication";

const PrivateRoute = () => {

    const { getCurrentUser } = useAuthContext();
    
    return getCurrentUser() ? <Outlet /> : <Navigate to="/signin"/>
   
};

export default PrivateRoute;