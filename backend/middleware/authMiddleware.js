const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Токен не предоставлен.' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Ошибка авторизации' });
    
        console.log("Decoded token:", decoded); 
        const user = await User.findById(decoded.userId);
        console.log('user:', user);
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    
        req.user = user;
        next();
    });
    
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ только для администратора' });
    }
    next();
};

module.exports = { verifyToken, adminOnly };
