import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../../api/userAPI';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Recommendations.css';

const Recommendations = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const recommendedBooks = await getRecommendations(userId);
                setRecommendations(recommendedBooks.slice(0, 5)); // Ограничиваем до 5 рекомендаций
            } catch (error) {
                console.error('Ошибка при загрузке рекомендаций:', error);
            }
        };

        fetchRecommendations();
    }, [userId]);

    return (
        <div className="recommendations-container">
            <h2 className="recommendations-title">Рекомендуем!</h2>
            {recommendations.length > 0 ? (
                <CardGroup className="recommendations-card-group">
                    {recommendations.map(book => (
                        <Card key={book._id} className="recommendations-card">
                            <Card.Img variant="top" src={book.coverUrl} alt={`${book.title} cover`} />
                        </Card>
                    ))}
                </CardGroup>
            ) : (
                <p className="no-recommendations">На данный момент нет рекомендаций</p>
            )}
        </div>
    );
};

export default Recommendations;
