const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); 
        res.json(books); 
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении книг', error });
    }
});



router.post('/add', async (req, res) => {
    const { title, author, genre, description, publishedYear, rating, coverUrl } = req.body;
    try {
        const book = new Book({ title, author, genre, description, publishedYear, rating, coverUrl });
        await book.save();
        res.status(201).json({ message: "Успешное добавление книги!!" });
    }
    catch (error) {
        res.status(500).json({ message: "Ошибка!", error })
    }
        res.json(books); 
});

router.put('/:id', verifyToken, adminOnly, async (req, res) => {
    const { title, author, genre, description, publishedYear, rating, coverUrl } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, description, coverImage }, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Книга не найдена' });
        res.json({ message: 'Книга обновлена', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении книги', error });
    }
});
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Книга удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении книги', error });
    }
});


router.get('/search', async (req, res) => {
    const { title, author, category } = req.query;
    try {
        
        let query = {};
        if (title) query.title = { $regex: title, $options: 'i' }; 
        if (author) query.author = { $regex: author, $options: 'i' };
        if (category) query.category = { $regex: category, $options: 'i' }; 

        const books = await Book.find(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при поиске книг', error });
    }
});

router.post('/:bookId/reviews', async (req, res) => {
    const { bookId } = req.params;
    const { userId, rating, comment } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({message: 'Книга не найдена!'})
        
        const review = {user: userId, rating, comment};
        book.reviews.push(review);
        book.updateRating();
        await book.save();
        res.json({message: 'Отзыв добавлен!', review});
    }
    catch(error){
        res.status(500).json({message: 'Ошибка при добавлении отзыва!', error});
    }
});

router.get('/:bookId/reviews', async(req,res) =>{
    const {bookId} = req.params;

    try{
        const book = await Book.findById(bookId).populate('reviews.user', 'name');
        if (!book) return res.status(404).json({message:'Книга  не найдена!'});

        res.json({
            rating : book.rating,
            reviews : book.reviews
        });
    }
    catch(error){
        res.status(500).json({ message: 'Ошибка при получении отзывов', error });
    }
})



router.post('/specificBooks', async (req, res) => {
    const { bookIds } = req.body; 

    try {
        const books = await Book.find({ _id: { $in: bookIds } });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении книг', error });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(10);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении последних книг', error });
    }
});

router.get('/top-rated', async (req, res) => {
    try {
        const topRatedBooks = await Book.find().sort({ rating: -1 }).limit(8); 
        res.json(topRatedBooks);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении популярных книг', error });
    }
});

router.get('/genres', async (req, res) => {
    try {
        const genres = await Book.distinct('genre'); 
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении жанров', error });
    }
});

router.get('/genre/:genre', async (req, res) => {
    const { genre } = req.params;
    const { page = 1, limit = 20 } = req.query; 

    try {
        const books = await Book.find({ genre })
            .skip((page - 1) * limit) 
            .limit(Number(limit));
        const totalBooks = await Book.countDocuments({ genre }); 
        res.json({ books, totalBooks });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении книг по жанру', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении книги', error });
    }
});

export const addReview = async (bookId, userId, rating, comment) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/${bookId}/reviews`, {
        userId,
        rating,
        comment
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
module.exports = router;