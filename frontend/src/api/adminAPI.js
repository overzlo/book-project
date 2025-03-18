import axios from 'axios';
import {API_URL_ADMIN} from "../lib/consts";

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL_ADMIN, {
        headers: {Authorization: `Bearer ${token}`}
    });

    return response.data;
};

export const updateUserRole = async (id, role) => {
    const token = localStorage.getItem('token');
    console.log("Отправка запроса для обновления роли:", {id, role});

    const response = await axios.put(`${API_URL_ADMIN}/${id}`, {role}, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
};

export const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL_ADMIN}/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
};