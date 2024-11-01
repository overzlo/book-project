import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../api/bookAPI';
import { addBookToHistory, getUserData } from '../../api/userAPI';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FavButton from '../../components/FavButton/FavButton';
import './BookDetailPage.css';

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await getBookById(id);
                setBook(bookData);

                const userData = await getUserData();
                setUser(userData);
                await addBookToHistory(userData._id, id);
            } catch (error) {
                console.error('Ошибка при загрузке книги:', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) return <div>Загрузка...</div>;

    return (
        <Container className="my-4">
            <Row className="align-items-stretch">
                <Col md={6}>
                    <Card className="book-card">
                        <Card.Img variant="top" src={book.coverUrl} alt={`${book.title} cover`} className="book-image" />
                        {user && <FavButton className="favIcon" userId={user._id} bookId={book._id} />}
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="book-details-card h-150">
                        <Card.Body>
                            <Card.Title className="book-title">{book.title}</Card.Title>
                            <Card.Text className='text-descr'>{book.description}</Card.Text>
                            <Card.Text><strong>Автор:</strong> {book.author}</Card.Text>
                            <Card.Text><strong>Жанр:</strong> {book.genre}</Card.Text>
                            <Card.Text><strong>Год публикации:</strong> {book.publishedYear}</Card.Text>
                            <Card.Text><strong>Рейтинг:</strong> {book.rating}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetailPage;
