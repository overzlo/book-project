import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Импортируйте файл стилей
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/userAPI';

const Register = () => {
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
        <div className="register-container">
            <FaUserPlus className='user-register' />
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    required
                    className="register-input"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="register-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    required
                    className="register-input"
                />
                <button type="submit" className="register-button">Зарегистрироваться</button>
            </form>
            <p className="register-redirect">
                Уже есть аккаунт? <span className="register-link">Войти</span>
            </p>
        </div>
    );
};

export default Register;
