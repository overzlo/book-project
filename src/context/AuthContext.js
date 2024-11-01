import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '../api/userAPI';
 // Импортируем функцию для получения данных пользователя

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(null); // Добавляем состояние для роли

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
    };

    const login = (newToken) => {
        setToken(newToken); // Устанавливаем токен
        localStorage.setItem('token', newToken); // Сохраняем в localStorage
    };
    

    const fetchUserData = async () => {
        try {
            const response = await getUserData(); // Получаем данные пользователя
            setRole(response.role); // Устанавливаем роль
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUserData(); // Получаем данные пользователя при загрузке
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
