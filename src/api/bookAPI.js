import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books'; // Убедитесь, что URL правильный

export const addBook = async (bookData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/add`, bookData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateBook = async (id, bookData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, bookData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteBook = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Пример функции для получения всех книг
export const getAllBooks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getBookById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const getSpecificBooks = async (bookIds) => {
    const response = await axios.post(`${API_URL}/specificBooks`, { bookIds });
    return response.data;
};

export const getLatestBooks = async () => {
    const response = await axios.get(`${API_URL}/latest`);
    return response.data;
};

export const getTopRatedBooks = async () => {
    const response = await axios.get(`${API_URL}/top-rated`);
    return response.data;
};

// Получение всех уникальных жанров
export const getGenres = async () => {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
};

export const getBooksByGenre = async (genre, page = 1, limit = 20) => {
    const response = await axios.get(`${API_URL}/genre/${genre}`, {
        params: { page, limit },
    });
    return response.data;
};


export const getBooksBySearch = async ({ title, author, category }) => {
    const response = await axios.get(`${API_URL}/search`, {
        params: { title, author, category }
    });
    return response.data;
};

