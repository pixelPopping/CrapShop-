import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [isAuth, setAuthState] = useState({

        isAuth: false,
        user: null,
        status: 'pending',
    });

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: logIn,
        logout: logOut,
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);

                setAuthState({
                    isAuth: true,
                    user: {
                        email: decoded.email,
                        roles: decoded.role,
                        id: decoded.sub,
                    },
                    status: 'done',
                });
            } catch (error) {
                console.error("Ongeldige token:", error);
                setAuthState({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        } else {
            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);



    function logIn(token) {
        try{
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            console.log(decoded);

            setAuthState({
                isAuth: true,
                user: {
                    email: decoded.email,
                    id: decoded.sub || decoded.userId,
                    roles: decoded.roles || [decoded.role],
                    projectId: decoded.projectId,
                },
                status: "done",
            });


            console.log('gebruiker is ingelogd')
            navigate('/profiel')
        } catch (error) {
            console.error("Ongeldige token:", error);}
    }

    function logOut() {
        localStorage.removeItem('token');
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('gebruiker is uitgelogd')
        navigate('/')
    }



    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
