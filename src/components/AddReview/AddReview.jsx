import React, { useState } from 'react';
import { addReview } from '../../api/bookAPI';

const AddReview = ({ bookId, userId, onReviewAdded }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = await addReview(bookId, userId, rating, comment);
            setRating(1);
            setComment('');
            onReviewAdded(reviewData.review); // Обновляем отзывы на странице книги
        } catch (error) {
            console.error('Ошибка при добавлении отзыва:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Рейтинг:
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[1, 2, 3, 4, 5].map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </label>
            <label>
                Комментарий:
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>
            <button type="submit">Добавить отзыв</button>
        </form>
    );
};

export default AddReview;
