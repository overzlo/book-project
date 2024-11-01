import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Для получения параметров маршрута
import { getBookById, updateBook } from '../../api/bookAPI'; // Импортируем функции для получения и обновления книги

const EditBook = () => {
    const { id } = useParams(); // Получаем ID книги из параметров маршрута
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [rating, setRating] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(id); // Получаем книгу по ID
                setTitle(book.title);
                setAuthor(book.author);
                setGenre(book.genre);
                setDescription(book.description);
                setPublishedYear(book.publishedYear);
                setRating(book.rating);
                setCoverUrl(book.coverUrl);
            } catch (error) {
                setError('Ошибка при получении данных книги.');
            }
        };
        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { title, author, genre, description, publishedYear, rating, coverUrl };
            await updateBook(id, updatedData);
            setSuccess('Книга успешно обновлена!');
            setError('');
        } catch (error) {
            setError('Ошибка при обновлении книги. Пожалуйста, проверьте данные.');
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Редактировать книгу</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Автор" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="text" placeholder="Жанр" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <input type="number" placeholder="Год публикации" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} required />
                <input type="number" placeholder="Рейтинг" value={rating} onChange={(e) => setRating(e.target.value)} required />
                <input type="text" placeholder="Ссылка на обложку" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} required />
                <button type="submit">Обновить книгу</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default EditBook;
