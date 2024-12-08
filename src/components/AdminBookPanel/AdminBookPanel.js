import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../../api/bookAPI'; // Импортируем функцию для получения всех книг
import AddBook from '../AddBook/AddBook';
import EditBook from '../EditBook/EditBook';
import DeleteBook from '../DeleteBook/DeleteBook';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminBookPanel = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null); // Храним выбранную книгу для редактирования

    useEffect(() => {
        const fetchBooks = async () => {
            const allBooks = await getAllBooks(); // Получаем все книги
            setBooks(allBooks);
        };
        fetchBooks();
    }, []);

    const handleDelete = (id) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)); // Обновляем список книг после удаления
    };

    const handleEdit = (book) => {
        setSelectedBook(book); 
    };

    return (
        <Container className="mt-4">
            <AddBook />
            <Row className="mt-4">
                {selectedBook ? (
                    <Col md={12}>
                        <EditBook book={selectedBook} /> {/* Отображаем компонент редактирования */}
                    </Col>
                ) : (
                    books.map((book) => (
                        <Col md={4} key={book._id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Автор:</strong> {book.author}<br />
                                        <strong>Жанр:</strong> {book.genre}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleEdit(book)}>Редактировать</Button>
                                    <Button variant="danger" onClick={() => handleDelete(book._id)} className="ms-2">Удалить</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default AdminBookPanel;
