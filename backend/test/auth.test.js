const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');
require('dotenv').config();

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('📌 Регистрация пользователя', () => {
    it('✅ Успешная регистрация нового пользователя', async () => {
        const res = await request(app).post('/api/users/register').send({
            name: 'Канат',
            email: 'kanat@example.com',
            password: '12345678'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Успешная регистрация!!");

        const user = await User.findOne({ email: 'kanat@example.com' });
        expect(user).not.toBeNull();
        expect(user.name).toBe('Канат');
        expect(user.password).not.toBe('12345678');
    });

    it('❌ Ошибка при регистрации с уже существующим email', async () => {
        await new User({
            name: 'Канат',
            email: 'kanat@example.com',
            password: 'хеш'
        }).save();

        const res = await request(app).post('/api/users/register').send({
            name: 'Канат',
            email: 'kanat@example.com',
            password: '12345678'
        });

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Ошибка при регистрации");
    });

    it('❌ Ошибка при отсутствии обязательных данных', async () => {
        const res = await request(app).post('/api/users/register').send({
            email: 'kanat@example.com'
        });

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Ошибка при регистрации");
    });
});

describe('🔐 Авторизация пользователя', () => {
    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash('12345678', 10);
        await new User({
            name: 'Канат',
            email: 'kanat@example.com',
            password: hashedPassword
        }).save();
    });

    it('✅ Успешный вход', async () => {
        const res = await request(app).post('/api/users/login').send({
            email: 'kanat@example.com',
            password: '12345678'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Вход выполнен");
        expect(res.body).toHaveProperty('token');
    });

    it('❌ Вход с неверным паролем', async () => {
        const res = await request(app).post('/api/users/login').send({
            email: 'kanat@example.com',
            password: 'неверныйпароль'
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Неверный пароль");
    });

    it('❌ Вход с несуществующим email', async () => {
        const res = await request(app).post('/api/users/login').send({
            email: 'notfound@example.com',
            password: '12345678'
        });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Пользователь не найден");
    });
});
