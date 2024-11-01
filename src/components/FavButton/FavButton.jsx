import React, { useState } from 'react';
import { addBookToFavorites } from '../../api/userAPI';
import { MdFavoriteBorder } from "react-icons/md";
import './FavButton.css'
const FavButton = ({ userId, bookId }) => {
    const [message, setMessage] = useState('');

    const handleAddToFavorites = async () => {
        try {
            const response = await addBookToFavorites(userId, bookId);
            setMessage(response.message);
        } catch (error) {
            setMessage('Ошибка при добавлении в избранное');
        }
    };

    return (
        <div>
            <MdFavoriteBorder
                className="favic"
                style={{ height: '100px', width: '100px', cursor: 'pointer' }}
                onClick={handleAddToFavorites}
            />

        </div>
    );
};

export default FavButton;
