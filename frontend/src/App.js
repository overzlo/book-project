// src/App.js
import React, { useState } from 'react'; // Убедитесь, что useState импортирован
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import UserProfile from './components/UserProfile/UserProfile';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from './pages/HomePage/HomePage';
import BooksByGenrePage from './pages/BooksByGenre/BooksByGenre';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import SearchPage from './pages/SearchPage/SearchPage';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';

function App() {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element = {<HomePage/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login  setToken={setToken}/>} />  
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/user/profile/books/:id" element={<BookDetailPage />} />
                <Route path="/admin/profile" element={<AdminPanel />} />
                <Route path="/genre/:genre" element={<BooksByGenrePage />} />
                <Route path="/genre/:genre/books/:id" element={<BookDetailPage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
