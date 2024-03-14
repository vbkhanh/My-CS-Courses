import { useState } from "react";
import { useAuthContext } from "./Authentication";
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { authenticate, alert, setAlert } = useAuthContext();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = await authenticate(username, password);
            navigate("/");
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
        <h1>WORD TARGET</h1>
        <form onSubmit={onSubmit}>
            <fieldset>Sign in</fieldset>
            <label>Enter your username: </label>
            <input type="text" placeholder="your username..." value={username} onChange={(e) => setUserName(e.target.value)}/><br/>
            <label>Enter your password: </label>
            <input type="password" placeholder="your password..." value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <h4>{alert}</h4>
            <input className='btn' type="submit" value="Sign In"/>
            <p onClick={(e) => {e.preventDefault(); setAlert('');}}>New to Target Word? <Link to="/signup">Sign Up</Link></p>
        </form>
        </div>
    );
};

export default Signin;