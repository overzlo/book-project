import React, { useState } from 'react';
import { addBook } from '../../api/bookAPI'; // Импортируем функцию для добавления книги

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [rating, setRating] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookData = { title, author, genre, description, publishedYear, rating, coverUrl };
            await addBook(bookData);
            setSuccess('Книга успешно добавлена!');
            setError('');
            // Сброс полей формы
            setTitle('');
            setAuthor('');
            setGenre('');
            setDescription('');
            setPublishedYear('');
            setRating('');
            setCoverUrl('');
        } catch (error) {
            setError('Ошибка при добавлении книги. Пожалуйста, проверьте данные.');
            setSuccess('');
            console.error("Ошибка:", error);
        }
    };

    return (
        <div>
            <h2>Добавить книгу</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Автор" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="text" placeholder="Жанр" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <input type="number" placeholder="Год публикации" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} required />
                <input type="number" placeholder="Рейтинг" value={rating} onChange={(e) => setRating(e.target.value)} required />
                <input type="text" placeholder="Ссылка на обложку" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} required />
                <button type="submit">Добавить книгу</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AddBook;
