import React, { useEffect, useState } from 'react';
import { getFavoriteBooks, removeBookFromFavorites } from '../../api/userAPI';
import Card from 'react-bootstrap/Card';
import './FavComponent.css'; // Импортируем файл стилей
import { CiBookmarkRemove } from "react-icons/ci";

const FavComponent = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoriteBooks = await getFavoriteBooks(userId);
                setFavorites(favoriteBooks);
            } catch (error) {
                console.error('Ошибка при получении избранных книг:', error);
            }
        };

        fetchFavorites();
    }, [userId]);
    const handleRemoveFromFavorites = async (bookId) => {
        await removeBookFromFavorites(userId, bookId);
        setFavorites(favorites.filter(book => book._id !== bookId));
    };

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">Избранные книги</h2>
            <div className="favorites-card-group">
                {favorites.map(book => (
                    <Card key={book._id} className="favorites-card">
                        <Card.Img variant="top" src={book.coverUrl} alt={`${book.title} cover`} className="favorites-card-img" />
                        <Card.Body>
                            <Card.Title className="favorites-card-title">{book.title}</Card.Title>
                        </Card.Body>
                        <CiBookmarkRemove onClick={() => handleRemoveFromFavorites(book._id)} className='remove'>
                            Удалить из избранного
                        </CiBookmarkRemove>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FavComponent;
