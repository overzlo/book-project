import React from 'react';
import { deleteBook } from '../../api/bookAPI';

const DeleteBook = ({ book, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
            await deleteBook(book._id);
            onDelete(book._id);
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
