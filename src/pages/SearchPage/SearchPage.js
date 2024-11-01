import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBooksBySearch } from '../../api/bookAPI'; // Assuming this function already exists
import { Container, ListGroup, Spinner } from 'react-bootstrap';

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
            <h2>Результаты поиска</h2>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ListGroup>
                    {books.length > 0 ? (
                        books.map(book => (
                            <ListGroup.Item key={book._id}>
                                <h5>{book.title}</h5>
                                <p><strong>Автор:</strong> {book.author}</p>
                                <p><strong>Жанр:</strong> {book.genre}</p>
                                <p>{book.description}</p>
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
