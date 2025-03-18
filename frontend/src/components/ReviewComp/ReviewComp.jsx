import React, { useEffect, useState } from 'react';
import { getUserReviews } from '../../api/userAPI';
import Card from 'react-bootstrap/Card';

const ReviewComp = ({ userId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const reviewsData = await getUserReviews(userId);
                setReviews(reviewsData);
            } catch (error) {
                console.error('Ошибка при загрузке отзывов пользователя:', error);
            }
        };
        fetchUserReviews();
    }, [userId]);

    return (
        <div>
            <h3>Мои отзывы</h3>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <Card key={review._id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{review.book.title}</Card.Title>
                            <Card.Text>{review.comment}</Card.Text>
                            <Card.Text><strong>Рейтинг:</strong> {review.rating}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Вы ещё не оставили отзывы</p>
            )}
        </div>
    );
};

export default ReviewComp;
