import React, { useEffect, useState } from 'react';
import { getTopRatedBooks } from '../../api/bookAPI';
import { Card, CardGroup, CardFooter, Row } from 'react-bootstrap';
import './TopRatedBooks.css'
import { Link } from 'react-router-dom';

const TopRatedBooks = () => {
    const [topBooks, setTopBooks] = useState([]);

    useEffect(() => {
        const fetchTopRatedBooks = async () => {
            try {
                const books = await getTopRatedBooks();
                setTopBooks(books);
            } catch (error) {
                console.error('Ошибка при загрузке популярных книг:', error);
            }
        };

        fetchTopRatedBooks();
    }, []);

    return (
        <section className='popular'>
            <h2>Популярные книги</h2>
            <Row xs={1} md={3} className="g-4">
                {topBooks.map(book => (
                    <Link to={`books/${book._id}`}>

                        <Card key={book._id} className='p_card'>
                            <Card.Img variant="top" src={book.coverUrl} alt={`${book.title} cover`} />
                            <Card.Body>
                                <Card.Title className='p_card-title'>{book.title}</Card.Title>
                            </Card.Body>
                            <Card.Footer >
                                <small className="text-muted">Рейтинг: {book.rating}</small>
                            </Card.Footer>
                        </Card>
                    </Link>

                ))}
            </Row>
        </section>
    );
};

export default TopRatedBooks;
