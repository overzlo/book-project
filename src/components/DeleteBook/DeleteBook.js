import React from 'react';
import { deleteBook } from '../../api/bookAPI'; // Импортируем функцию для удаления книги

const DeleteBook = ({ book, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
            await deleteBook(book._id); // Вызываем функцию для удаления книги
            onDelete(book._id); // Уведомляем родительский компонент о том, что книга удалена
        }
    };

    return (
        <div>
            <h3>{book.title}</h3>
            <p>Автор: {book.author}</p>
            <button onClick={handleDelete}>Удалить</button>
        </div>
    );
};

export default DeleteBook;
