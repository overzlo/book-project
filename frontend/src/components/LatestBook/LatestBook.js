import React, { useEffect, useState } from 'react';
import { getLatestBooks } from '../../api/bookAPI';
import { Card, CardGroup, CardFooter, Row } from 'react-bootstrap';
import './LatestBook.css'
import { Link } from 'react-router-dom';
const LatestBooks = () => {
    const [latestBooks, setLatestBooks] = useState([]);

    useEffect(() => {
        const fetchLatestBooks = async () => {
            const data = await getLatestBooks();
            setLatestBooks(data);
        };
        fetchLatestBooks();
    }, []);

    return (
        <section className="latest-books">
            <h2>НОВОЕ ПОСТУПЛЕНИЕ</h2>
            <Row xs={1} md={5} className="g-4">               
                 {latestBooks.map(book => (
                <Link to ={`books/${book._id}`}>
                <Card key={book._id} className='lb-card'>
                    <Card.Img variant="top" src={book.coverUrl} alt={book.title} />
                    <CardFooter className='lb-card-footer'>{book.title}</CardFooter>
                </Card>
                </Link>
            ))}
            </Row>
            </section>
    );
};

export default LatestBooks;
