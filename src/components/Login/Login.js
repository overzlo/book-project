import React, { useState } from 'react';
import { getUserData, loginUser } from '../../api/userAPI';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { FaUserClock } from "react-icons/fa";
import './Login.css';
const Login = () => {
    const { login } = useAuth(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.token);
            login(data.token);
            const userData = await getUserData(); 
            setRole(userData.role); 
            navigate('/user/profile');

        } catch (error) {
            setError("Ошибка при входе: Неверные учетные данные.");
            console.error("Ошибка при входе:", error);
        }
    };


    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <FaUserClock className='user-login'/>
            <h2>Вход в систему</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Войти</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="register-redirect">
                Нет аккаунта? <span onClick={handleRegisterRedirect} className="register-link">Зарегистрируйтесь</span>
            </p>
        </div>
    );
};

export default Login;
