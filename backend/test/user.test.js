const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // твой express app
const User = require('../models/User');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany();
});


describe('GET /api/users/me', () => {
    it('должен вернуть профиль пользователя', async () => {
        const user = new User({ name: 'Test', email: 'test@mail.com', password: 'hashedpass' });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'testsecret');

        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe(user.email);
    });

    it('должен вернуть 404, если пользователь не найден', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const token = jwt.sign({ userId: fakeId }, process.env.JWT_SECRET || 'testsecret');

        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toMatch(/Пользователь не найден/);
    });
});


describe('PUT /api/users/:id', () => {
    it('должен обновить роль пользователя', async () => {
        const user = await User.create({ name: 'User', email: 'u@mail.com', password: 'pass', role: 'user' });
        const admin = await User.create({ name: 'Admin', email: 'a@mail.com', password: 'pass', role: 'admin' });

        const token = jwt.sign({ userId: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'testsecret');

        const res = await request(app)
            .put(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ role: 'admin' });

        expect(res.statusCode).toBe(200);
        expect(res.body.user.role).toBe('admin');
    });

    it('должен вернуть 404 при несуществующем пользователе', async () => {
        const admin = await User.create({ name: 'Admin', email: 'a@mail.com', password: 'pass', role: 'admin' });
        const token = jwt.sign({ userId: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'testsecret');

        const res = await request(app)
            .put(`/api/users/${new mongoose.Types.ObjectId()}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ role: 'admin' });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toMatch(/не найден/);
    });
});
describe('POST /api/users/:userId/favorites/:bookId', () => {
    it('должен добавить книгу в избранное', async () => {
        const book = await Book.create({ title: 'Book 1', author: 'Author' });
        const user = await User.create({ name: 'User', email: 'test@mail.com', password: '123456' });

        const res = await request(app)
            .post(`/api/users/${user._id}/favorites/${book._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/добавлена в избранное/);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.favorites).toContainEqual(book._id);
    });

    it('должен вернуть сообщение, если книга уже в избранном', async () => {
        const book = await Book.create({ title: 'Book 2', author: 'Author' });
        const user = await User.create({ name: 'User', email: 'test@mail.com', password: '123456', favorites: [book._id] });

        const res = await request(app)
            .post(`/api/users/${user._id}/favorites/${book._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/уже в избранном/);
    });
});
describe('GET /api/users/:userId/favorites', () => {
    it('должен вернуть список избранных книг', async () => {
        const book = await Book.create({ title: 'Book 3', author: 'Author' });
        const user = await User.create({ name: 'User', email: 'test@mail.com', password: '123456', favorites: [book._id] });

        const res = await request(app).get(`/api/users/${user._id}/favorites`);

        expect(res.statusCode).toBe(200);
        expect(res.body[0].title).toBe('Book 3');
    });
});

describe('POST /api/users/:userId/history/:bookId', () => {
    it('должен добавить книгу в историю', async () => {
        const book = await Book.create({ title: 'Book 4', author: 'Author' });
        const user = await User.create({ name: 'User', email: 'test@mail.com', password: '123456' });

        const res = await request(app)
            .post(`/api/users/${user._id}/history/${book._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/добавлена в историю/);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.history).toContainEqual(book._id);
    });
});
describe('GET /api/users/:userId/history', () => {
    it('должен вернуть список книг из истории', async () => {
        const book = await Book.create({ title: 'Book 5', author: 'Author' });
        const user = await User.create({ name: 'User', email: 'test@mail.com', password: '123456', history: [book._id] });

        const res = await request(app).get(`/api/users/${user._id}/history`);

        expect(res.statusCode).toBe(200);
        expect(res.body[0].title).toBe('Book 5');
    });
});

describe('DELETE /api/users/:userId/favorites/:bookId', () => {
    it('должен удалить книгу из избранного', async () => {
        const book = await Book.create({ title: 'Book 6', author: 'Author' });
        const user = await User.create({
            name: 'User',
            email: 'test@mail.com',
            password: '123456',
            favorites: [book._id]
        });

        const res = await request(app)
            .delete(`/api/users/${user._id}/favorites/${book._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/удалена из избранного/);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.favorites).not.toContainEqual(book._id);
    });

    it('должен вернуть сообщение, если книги нет в избранном', async () => {
        const book = await Book.create({ title: 'Book 7', author: 'Author' });
        const user = await User.create({
            name: 'User',
            email: 'test@mail.com',
            password: '123456',
            favorites: []
        });

        const res = await request(app)
            .delete(`/api/users/${user._id}/favorites/${book._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/не найдена в избранном/);
    });
});
