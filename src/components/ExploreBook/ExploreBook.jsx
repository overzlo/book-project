import { Card, CardFooter, CardGroup } from 'react-bootstrap';
import { getSpecificBooks } from '../../api/bookAPI';
import React, { useEffect, useState } from 'react';
import img from '../../images/tcimage2.jpg'
import './ExploreBook.css'

function ExploreBook() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const specificBookIds = ["67214b97fc78f4dccab49bbc", "67214bf4fc78f4dccab49bc4", "67214c5afc78f4dccab49bc6", "67214cd0fc78f4dccab49bc8"]; // Задаем нужные ID
            const data = await getSpecificBooks(specificBookIds);
            setBooks(data);
        };
        fetchBooks();
    }, []);

    return (
        <section className='exploer'>
            <div className="explore-title"><h3>ОТКРОЙ НОВЫЕ МИРЫ</h3></div>

            <div className="explore-side">
                <div className="explore-right-side">
                    <div className='cards'>
                        {books.map(book => (
                            <div className='card' key={book._id}>
                                <div className='card_img'>
                                    <img src={book.coverUrl} alt={book.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="explore-left-side">
                    <img src={img}></img>
                    <div className='left-side-text'>Книги, которые меняют жизнь! Найдите свою среди миллионов.</div>
                </div>
            </div>


        </section>
        );
}

export default ExploreBook;
