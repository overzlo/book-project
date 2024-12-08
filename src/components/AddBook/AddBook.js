import React, { useState } from 'react';
import { addBook } from '../../api/bookAPI'; // Импортируем функцию для добавления книги
import { Form, Button, Alert, Container } from 'react-bootstrap';

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
        <Container className="mt-4">
            <h2 className="text-center">Добавить книгу</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите название книги"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAuthor">
                    <Form.Label>Автор</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите имя автора"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formGenre">
                    <Form.Label>Жанр</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите жанр книги"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Введите описание книги"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPublishedYear">
                    <Form.Label>Год публикации</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Введите год публикации"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formRating">
                    <Form.Label>Рейтинг</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Введите рейтинг книги"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCoverUrl">
                    <Form.Label>Ссылка на обложку</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите ссылку на обложку книги"
                        value={coverUrl}
                        onChange={(e) => setCoverUrl(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Добавить книгу
                </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        </Container>
    );
};

export default AddBook;
