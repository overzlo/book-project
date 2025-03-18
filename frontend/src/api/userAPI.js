import axios from 'axios';
import {API_URL_USER} from "../lib/consts";


export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL_USER}/users/register`, userData);
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL_USER}/users/login`, { email, password });
    return response.data;
};

export const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Токен не найден");
    }

    const response = await axios.get(`${API_URL_USER}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};


export const addBookToHistory = async (userId, bookId) => {
    const response = await axios.post(`${API_URL_USER}/users/${userId}/history/${bookId}`);
    return response.data;
};

export const getUserHistory = async (userId) => {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`${API_URL_USER}/users/${userId}/history`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addBookToFavorites = async (userId, bookId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL_USER}/users/${userId}/favorites/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getFavoriteBooks = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL_USER}/users/${userId}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const removeBookFromFavorites = async (userId, bookId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL_USER}/users/${userId}/favorites/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
export const getRecommendations = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL_USER}/users/${userId}/recommendations`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getUserReviews = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL_USER}/users/${userId}/reviews`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении отзывов пользователя:', error);
        throw error;
    }
};