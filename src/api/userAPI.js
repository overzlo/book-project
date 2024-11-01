import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
};


export const getUserData = async () => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    console.log("Текущий токен:", token); // Выводим токен для проверки

    if (!token) {
        throw new Error("Токен не найден"); // Обрабатываем случай, когда токен отсутствует
    }

    // Декодируем токен
    const decoded = jwtDecode(token);
    console.log("Декодированный токен:", decoded); // Выводим декодированное содержимое

    const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};


export const addBookToHistory = async (userId, bookId) => {
    const response = await axios.post(`${API_URL}/users/${userId}/history/${bookId}`);
    return response.data;
};

export const getUserHistory = async (userId) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    const response = await axios.get(`${API_URL}/users/${userId}/history`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
};

export const addBookToFavorites = async (userId, bookId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/users/${userId}/favorites/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getFavoriteBooks = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/${userId}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const removeBookFromFavorites = async (userId, bookId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/users/${userId}/favorites/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const getRecommendations = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/${userId}/recommendations`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};