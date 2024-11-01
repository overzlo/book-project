import React, { useEffect, useState } from 'react';
 // Импортируем компонент для отображения книги
import { getAllBooks } from '../../api/bookAPI'; // Импортируем функцию для получения всех книг
import AddBook from '../AddBook/AddBook';
import EditBook from '../EditBook/EditBook';
import DeleteBook from '../DeleteBook/DeleteBook';
const AdminBookPanel = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null); // Храним выбранную книгу для редактирования

    useEffect(() => {
        const fetchBooks = async () => {
            const allBooks = await getAllBooks(); // Получаем все книги
            setBooks(allBooks);
        };
        fetchBooks();
    }, []);

    const handleDelete = (id) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)); // Обновляем список книг после удаления
    };

    const handleEdit = (book) => {
        setSelectedBook(book); // Устанавливаем выбранную книгу для редактирования
    };

    return (
        <div>
            <h1>Панель администратора</h1>
            <AddBook />
            {selectedBook ? (
                <EditBook book={selectedBook} /> // Отображаем компонент редактирования
            ) : (
                books.map((book) => (
                    <DeleteBook key={book._id} book={book} onDelete={handleDelete} onEdit={handleEdit} />
                ))
            )}
        </div>
    );
};

export default AdminBookPanel;
