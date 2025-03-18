const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: "Успешная регистрация!!" });
    }
    catch (error) {
        res.status(500).json({ message: "Ошибка!", error })
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Неверный пароль" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Вход выполнен", token });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при входе", error });
    }
});

router.post('/:userId/favorites/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        if (!user.favorites.includes(bookId)) {
            user.favorites.push(bookId);
            await user.save();
            res.json({ message: 'Книга добавлена в избранное' });
        } else res.json({ message: 'Книга уже в избранном' });
    }  
    catch (error){
        res.status(500).json({ message: 'Ошибка при добавлении в избранное', error });
    } 
});

router.post('/:userId/history/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        if (!user.history.includes(bookId)) {
            user.history.push(bookId);
            await user.save();
        }
        res.json({ message: 'Книга добавлена в историю просмотров' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении в историю', error });
    }
});

router.get('/:userId/favorites', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('favorites');
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении избранного', error });
    }
});

router.delete('/:userId/favorites/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        const bookIndex = user.favorites.indexOf(bookId);
        if (bookIndex > -1) {
            user.favorites.splice(bookIndex, 1); 
            await user.save();
            res.json({ message: 'Книга удалена из избранного' });
        } else {
            res.json({ message: 'Книга не найдена в избранном' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении из избранного', error });
    }
});

router.get('/:userId/history', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('history');
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        res.json(user.history);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении истории', error });
    }
});

router.get('/:userId/recommendations', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('favorites').populate('history');
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        const favorites = user.favorites.map(book => book._id);
        const history = user.history.map(book => book._id);

        
        const recommendations = await User.find({ _id: { $ne: userId } })
            .populate('favorites')
            .exec();

        const recommendedBooks = [];

        recommendations.forEach(otherUser => {
            otherUser.favorites.forEach(book => {
                if (!favorites.includes(book._id) && !history.includes(book._id)) {
                    recommendedBooks.push(book);
                }
            });
        });

        const uniqueRecommendations = Array.from(new Set(recommendedBooks.map(b => b._id)))
            .map(id => {
                return recommendedBooks.find(b => b._id.equals(id));
            });

        res.json(uniqueRecommendations);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении рекомендаций', error });
    }
});


router.get('/', verifyToken, adminOnly, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пользователей', error });
    }
});
router.get('/all', verifyToken, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password'); //
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка пользователей', error });
    }
});
router.put('/:id', verifyToken, adminOnly, async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        res.json({ message: 'Роль обновлена', user });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении роли', error });
    }
});
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'Пользователь удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении пользователя', error });
    }
});

router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id); 
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        res.json(user); 
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пользователя', error });
    }
});

router.get('/:userId/reviews', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('reviews');
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        const userReviews = await Review.find({ user: userId }).populate('book');
        res.json(userReviews);

        
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении отзывов', error });
    }
});

module.exports = router;