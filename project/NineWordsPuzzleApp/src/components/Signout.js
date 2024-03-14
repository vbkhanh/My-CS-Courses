import { useAuthContext } from "./Authentication";
import { useNavigate } from 'react-router-dom';

const Signout = () => {

    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const signOut = (e) => {
        e.preventDefault();
        logout();
        navigate("/signin");
    }

    return (
        <input onClick={signOut} type="submit" className='btn' value="Sign out" />
    );
};

export default Signout;