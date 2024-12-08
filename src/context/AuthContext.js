import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '../api/userAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(null);

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
    };

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };


    const fetchUserData = async () => {
        try {
            const response = await getUserData();
            setRole(response.role);
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUserData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
