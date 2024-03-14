import { useState } from "react";
import UserPool from "./UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from "./Authentication";

const Signup = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { alert, setAlert } = useAuthContext();

    const onSubmit = (e) => {
        e.preventDefault();
        
        let userEmail = {
            Name: 'email',
            Value: email
        };

        let attributeList = [];
        let attributeEmail = new CognitoUserAttribute(userEmail);
        attributeList.push(attributeEmail);
        
        UserPool.signUp(username, password, attributeList, null, (error, result) => {
            if(error) {
                let err = error.toString().split(": ");
                setAlert(err[err.length-1]);
                return;
            }
            console.log(result.user);
            setAlert("An account verification link was sent to your email address. Please verify your account before signing in.")
            navigate("/signin");
        });
    }

    return (
        <div>
        <h1>WORD TARGET</h1>
        <form onSubmit={onSubmit}>
            <fieldset>Sign up</fieldset>
            <label>Enter your username: </label>
            <input type="text" placeholder="username..." value={username} onChange={(e) => setUserName(e.target.value)}/><br/>
            <label>Enter your email address: </label>
            <input type="text" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            <label>Enter your password: </label>
            <input type="password" placeholder="password..." value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <h4>{alert}</h4>
            <input className='btn' type="submit" value="Sign Up"/>
            <p onClick={(e) => {e.preventDefault(); setAlert('');}}>Already have an account? <Link to="/signin">Sign In</Link></p>
        </form>
        <br/>
        <div>
            <p>
                The password must have a minimum of eight characters. Additionally, It must have at least one number, uppercase letter, lowercase letter and special character(!,@,#,$,%...). 
            </p>
            <p>
                You need to provide a real email address in order to verify your account and keep contact with us.
            </p>
        </div>
        </div>
    );
};

export default Signup;