import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { getGenres } from '../../api/bookAPI';
import { useNavigate } from 'react-router-dom';

const GenreDropdown = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreList = await getGenres();
                setGenres(genreList);
            } catch (error) {
                console.error('Ошибка при загрузке жанров:', error);
            }
        };
        
        fetchGenres();
    }, []);

    const handleGenreSelect = (genre) => {
        navigate(`/genre/${genre}`); // Переход на страницу с выбранным жанром
    };

    return (
        <NavDropdown title="Жанры" id="navbarScrollingDropdown">
            {genres.map((genre, index) => (
                <NavDropdown.Item 
                    key={index} 
                    onClick={() => handleGenreSelect(genre)}
                >
                    {genre}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
};

export default GenreDropdown;
