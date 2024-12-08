import React, { useEffect, useState } from 'react';
import { getUserData } from '../../api/userAPI';
import HistoryPage from '../History/HistoryPage';
import FavoritesPage from '../FavComponent/FavComponent';
import './UserProfile.css'; // Импортируем файл стилей
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings } from "react-icons/md";
import Recommendations from '../Recommendations/Recommendations';
import ReviewComp from '../ReviewComp/ReviewComp';

const UserProfile = ({ token }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData(token);
            setUser(data);
        };
        fetchUserData();
    }, [token]);

    return (
        <div className="user-profile-container">
            {user ? (
                <div className="user-profile-content">
                    <h1 className="user-profile-title">Профиль пользователя {user.name}</h1>
                    <FaRegUserCircle className='logo-user' />
                    <div className="user-info">
                        <p><strong>Email:</strong> {user.email}</p>
                        {user.role === 'admin' && (
                            <p>
                                <Link to="/admin/profile" className='link-admin'>Перейти в админскую панель <MdAdminPanelSettings /></Link>
                            </p>
                        )}
                    </div>
                    <HistoryPage userId={user._id} />
                    <FavoritesPage userId={user._id} />
                    <Recommendations userId={user._id} />
                    <ReviewComp userId={user._id} />
                </div>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default UserProfile;
