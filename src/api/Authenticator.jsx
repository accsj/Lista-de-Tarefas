import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const useCheckAuthentication = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const jwtCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));

            if (jwtCookie) {
                const jwt = jwtCookie.split('=')[1];
                try {
                    const decodedToken = jwtDecode(jwt); 
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp > currentTime) {
                        return true;
                    } else {
                        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        return false;
                    }
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    return false;
                }
            } else {
                return false;
            }
        };

        const fetchAuthentication = async () => {
            const isAuthenticated = await checkAuthentication();
            setAuthenticated(isAuthenticated);
        };

        fetchAuthentication();
    }, []);
    
    return authenticated;
};

export default useCheckAuthentication;
