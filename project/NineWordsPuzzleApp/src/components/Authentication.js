import { createContext, useContext } from "react";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useState } from "react";

// How to store state in local storage: https://stackoverflow.com/questions/28314368/how-to-maintain-state-after-a-page-refresh-in-react-js/28314706#28314706

const AuthContext = createContext();

const useAuthContext = () => {
    return useContext(AuthContext);
};


const Authentication = ({children}) => {

    const [alert, setAlert] = useState('');


    const getCurrentUser = () => {
        return UserPool.getCurrentUser();
    };
    
    const getCurrentUserData = () => {
        const promise = new Promise((resolve, reject) => {
            const user = getCurrentUser();
            if(user) {
                user.getSession(async (error, session) => {
                    if(error) {
                        reject(error);
                    }
                    else {
                        const userAttributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((error, attributes) => {
                                if(error) {
                                    console.log(error);
                                    reject(error);
                                }
                                else {
                                    resolve(attributes);
                                }
                            });
                        });
                        resolve({user, ...session, ...userAttributes});
                    }
                });
            }
            else {
                reject();
            }
        });
        return promise;
    };
    
    const authenticate = (username, password) => {
        const promise = new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: username,
                Pool: UserPool
            });
    
            const authDetails = new AuthenticationDetails({
                Username: username,
                Password: password
            });
    
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    localStorage.setItem('jwt', data['idToken']['jwtToken']);
                    console.log(data);
                    setAlert('');
                    resolve(data);
                },
                onFailure: (error) => {
                    setAlert("Incorrect username or password");
                    reject(error)
                },
                newPasswordRequired: (data) => {
                    resolve(data);
                }
            });
        });
        return promise;
    };

    const logout = () => {
        let currentUser = UserPool.getCurrentUser();
        if(currentUser) {
            localStorage.clear();
            currentUser.signOut();
        }
    };

    return (
        <AuthContext.Provider value={{authenticate, getCurrentUser, logout, getCurrentUserData, alert, setAlert}}>
            {children}
        </AuthContext.Provider>
    );
};

export {Authentication, useAuthContext};