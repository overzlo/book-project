import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBooksBySearch } from '../../api/bookAPI';
import { Container, ListGroup, Spinner, Card } from 'react-bootstrap';

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const title = query.get('title');
    const author = query.get('author');
    const category = query.get('category');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooksBySearch({ title, author, category });
                setBooks(booksData);
            } catch (error) {
                console.error('Ошибка при загрузке книг:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [title, author, category]);

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Результаты поиска</h2>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ListGroup>
                    {books.length > 0 ? (
                        books.map(book => (
                            <ListGroup.Item key={book._id} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <strong>Автор:</strong> {book.author} | <strong>Жанр:</strong> {book.genre}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            {book.description.length > 150 ? `${book.description.slice(0, 150)}...` : book.description}
                                        </Card.Text>
                                        <Card.Link href={`/books/${book._id}`} className="btn btn-primary">Подробнее</Card.Link>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item className="text-center">
                            <p>Книги не найдены.</p>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            )}
        </Container>
    );
};

export default SearchPage;
