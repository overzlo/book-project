import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchParams, setSearchParams] = useState({ searchValue: '', searchBy: 'title' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { searchValue, searchBy } = searchParams;
        navigate(`/search?${searchBy}=${searchValue}`);
    };

    return (
        <Form className="d-flex" onSubmit={handleSubmit}>

            <Form.Control
                type="search"
                placeholder="Гарри Поттер"
                name="searchValue"
                value={searchParams.searchValue}
                onChange={handleChange}
                className="me-2"
                aria-label="Search"
            />  <Form.Select
                name="searchBy"
                value={searchParams.searchBy}
                onChange={handleChange}
                className="me-2"
                aria-label="Search by"
            >
                <option value="title">Название</option>
                <option value="author">Автор</option>
                <option value="category">Жанр</option>
            </Form.Select>
            <Button variant="outline-success" type="submit">Поиск</Button>
        </Form>
    );
};

export default SearchBar;
