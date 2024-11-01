// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userAPI';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            localStorage.setItem('token', response.token); // Сохраняем токен
            alert('Вход выполнен!');
            navigate('/UserDashboard'); // Переход на страницу пользователя
        } catch (error) {
            alert('Ошибка входа. Попробуйте снова.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Вход</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginPage;
