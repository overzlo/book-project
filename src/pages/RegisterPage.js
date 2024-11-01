// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userAPI';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            alert('Регистрация успешна!');
            navigate('/login'); // Переход на страницу входа после регистрации
        } catch (error) {
            alert('Ошибка регистрации. Попробуйте снова.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Регистрация</h2>
            <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default RegisterPage;
