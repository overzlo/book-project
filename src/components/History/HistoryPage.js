import React, { useEffect, useState } from 'react';
import { getUserHistory } from '../../api/userAPI'; 
import { getUserData } from '../../api/userAPI'; 
import './History.css'; // Импортируем файл стилей

const HistoryPage = () => {
    const [history, setHistory] = useState([]); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(); 
                setUser(userData);
                
                const userHistory = await getUserHistory(userData._id); 
                setHistory(userHistory);
            } catch (error) {
                console.error('Ошибка при загрузке истории пользователя:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="history-container">
            <h2 className="history-title">История просмотренных книг</h2>
            <ul className="history-list">
                {history.length > 0 ? (
                    <div className="history-scrollable">
                        {history.map(book => (
                            <li key={book._id} className="history-item">{book.title}</li>
                        ))}
                    </div>
                ) : (
                    <li className="history-item">История пуста</li>
                )}
            </ul>
        </div>
    );
};

export default HistoryPage;
