import axios from 'axios';
import {API_URL_BOOK} from "../lib/consts";

export const addBook = async (bookData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL_BOOK}/add`, bookData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateBook = async (id, bookData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL_BOOK}/${id}`, bookData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteBook = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL_BOOK}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllBooks = async () => {
    const response = await axios.get(API_URL_BOOK);
    return response.data;
};

export const getBookById = async (id) => {
    const response = await axios.get(`${API_URL_BOOK}/${id}`);
    return response.data;
};

export const getSpecificBooks = async (bookIds) => {
    const response = await axios.post(`${API_URL_BOOK}/specificBooks`, {bookIds});
    return response.data;
};

export const getLatestBooks = async () => {
    const response = await axios.get(`${API_URL_BOOK}/latest`);
    return response.data;
};

export const getTopRatedBooks = async () => {
    const response = await axios.get(`${API_URL_BOOK}/top-rated`);
    return response.data;
};

export const getGenres = async () => {
    const response = await axios.get(`${API_URL_BOOK}/genres`);
    return response.data;
};

export const getBooksByGenre = async (genre, page = 1, limit = 20) => {
    const response = await axios.get(`${API_URL_BOOK}/genre/${genre}`, {
        params: {page, limit},
    });
    return response.data;
};


export const getBooksBySearch = async ({title, author, category}) => {
    const response = await axios.get(`${API_URL_BOOK}/search`, {
        params: {title, author, category}
    });
    return response.data;
};

export const addReview = async (bookId, userId, rating, comment) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL_BOOK}/${bookId}/reviews`, {
        userId,
        rating,
        comment
    }, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};