import React, { useState } from 'react';
import { addReview } from '../../api/bookAPI';
import { Form, Button, Alert } from 'react-bootstrap';

const AddReview = ({ bookId, userId, onReviewAdded }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = await addReview(bookId, userId, rating, comment);
            setRating(1);
            setComment('');
            setSuccess(true);
            setError('');
            onReviewAdded(reviewData.review);
        } catch (error) {
            setError('Ошибка при добавлении отзыва. Попробуйте снова.');
            console.error('Ошибка при добавлении отзыва:', error);
        }
    };

    return (
        <div className="mt-4">
            <h4>Добавить отзыв</h4>
            {success && <Alert variant="success">Отзыв успешно добавлен!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formRating">
                    <Form.Label>Рейтинг:</Form.Label>
                    <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        {[1, 2, 3, 4, 5].map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formComment">
                    <Form.Label>Комментарий:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>
                <Button  variant="outline-success" type="submit">
                    Добавить отзыв
                </Button>
            </Form>
        </div>
    );
};

export default AddReview;
