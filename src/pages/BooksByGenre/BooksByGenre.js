import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBooksByGenre } from '../../api/bookAPI';
import {Card, Row, Button} from 'react-bootstrap';
import './BooksByGenre.css'

const BooksByGenrePage = () => {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1); // Текущая страница
    const [totalBooks, setTotalBooks] = useState(0);
    const limit = 20; // Количество книг на странице

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { books, totalBooks } = await getBooksByGenre(genre, page, limit);
                setBooks(books);
                setTotalBooks(totalBooks);
            } catch (error) {
                console.error('Ошибка при загрузке книг по жанру:', error);
            }
        };

        fetchBooks();
    }, [genre, page]);

    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(totalBooks / limit);

    // Обработчики для кнопок "Назад" и "Вперед"
    const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setPage(prev => Math.min(prev + 1, totalPages));

    return (
        <div className='books-by-page-container'>
            <h2 className='title-genre'> {genre}</h2>
            <Row xs={1} md={5} className="g-4">
                {books.map(book => (
                    <Card key={book._id} className='gb-card' >
                        <Link to = {`books/${book._id}`}>
                        <Card.Img variant="top" src={book.coverUrl} alt={`${book.title} center center/cover no-repeat`} />
                        <Card.Body className='gb-card-title'>
                            <Card.Title>{book.title}</Card.Title>
                        </Card.Body>
                        </Link>
                    </Card>
                ))}
            </Row>
            <div className="pagination">
                <Button onClick={handlePrevPage} disabled={page === 1}  variant='outline-dark'>
                    Назад
                </Button>
                <span>Страница {page} из {totalPages}</span>
                <Button onClick={handleNextPage} disabled={page === totalPages} variant='outline-dark'>
                    Вперед
                </Button>
            </div>
        </div>
    );
};

export default BooksByGenrePage;
