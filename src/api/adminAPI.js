// src/api/adminAPI.js
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/users'; // убедитесь, что этот путь совпадает

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
};

export const updateUserRole = async (id, role) => {
    const token = localStorage.getItem('token');
    console.log("Отправка запроса для обновления роли:", { id, role });

    const response = await axios.put(`${API_URL}/${id}`, { role }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};