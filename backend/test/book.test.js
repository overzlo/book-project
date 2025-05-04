const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Book = require('../models/Book');
jest.mock('../__mocks/authMiddleware');


let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Book.deleteMany();
});

describe('📚 Маршруты книг', () => {
    it('✅ Получение всех книг', async () => {
        await Book.create({ title: 'Книга 1', author: 'Автор', rating: 4 });
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it('✅ Получение книги по ID', async () => {
        const book = await Book.create({ title: 'ID книга', author: 'Автор' });
        const res = await request(app).get(`/api/books/${book._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('ID книга');
    });

    it('❌ Ошибка: книга не найдена', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/books/${fakeId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Книга не найдена');
    });

    it('✅ Поиск книг по названию', async () => {
        await Book.create({ title: 'React для начинающих', author: 'Канат' });
        const res = await request(app).get('/api/books/search?title=react');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toMatch(/react/i);
    });

    it('✅ Поиск книг по автору', async () => {
        await Book.create({ title: 'Тестовая книга', author: 'Иван Иванов' });
        const res = await request(app).get('/api/books/search?author=иван');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it('✅ Обработка ошибок (try/catch): передан некорректный ID', async () => {
        const res = await request(app).get('/api/books/123'); // неправильный ID
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('message', 'Ошибка при получении книги');
    });


    it('✅ Получение отзывов для книги по ID', async () => {
        const book = await Book.create({
            title: 'Книга с отзывами',
            author: 'Автор',
            reviews: [{ user: new mongoose.Types.ObjectId(), comment: 'Отличная книга', rating: 5 }]
        });
        const res = await request(app).get(`/api/books/${book._id}/reviews`);
        expect(res.statusCode).toBe(200);
        expect(res.body.reviews.length).toBe(1);
        expect(res.body.reviews[0].comment).toBe('Отличная книга');
    });

    it('✅ Получение конкретных книг по их ID', async () => {
        const book1 = await Book.create({ title: 'Книга 1', author: 'Автор 1' });
        const book2 = await Book.create({ title: 'Книга 2', author: 'Автор 2' });
        const res = await request(app).post('/api/books/specificBooks').send({ bookIds: [book1._id, book2._id] });
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it('✅ Получение последних книг (по дате)', async () => {
        await Book.create({
            title: 'Старая книга',
            author: 'Автор 1',
            createdAt: new Date('2023-01-01')
        });
        await Book.create({
            title: 'Новая книга',
            author: 'Автор 2',
            createdAt: new Date('2025-01-01')
        });

        const res = await request(app).get('/api/books/latest');
        expect(res.statusCode).toBe(200);
        expect(res.body[0].title).toBe('Новая книга');
    });

    it('✅ Получение топ книг по рейтингу', async () => {
        await Book.create({
            title: 'Книга A',
            author: 'Автор 1',
            rating: 4
        });
        await Book.create({
            title: 'Книга B',
            author: 'Автор 2',
            rating: 5
        });

        const res = await request(app).get('/api/books/top-rated');
        expect(res.statusCode).toBe(200);
        expect(res.body[0].rating).toBe(5);
    });

});

it('✅ Добавление новой книги', async () => {
    const res = await request(app)
        .post('/api/books/add')
        .send({
            title: 'Новая книга',
            author: 'Автор',
            genre: 'Проза',
            description: 'Описание',
            publishedYear: 2024,
            rating: 5,
            coverUrl: 'http://example.com/image.jpg'
        });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Успешное добавление книги!!');

    const books = await Book.find();
    expect(books.length).toBe(1);
    expect(books[0].title).toBe('Новая книга');

    expect(res.body.book.title).toBe('Новая книга');
    expect(res.body.book.author).toBe('Автор');
    expect(res.body.book.genre).toBe('Проза');
    expect(res.body.book.publishedYear).toBe(2024);
    expect(res.body.book.rating).toBe(5);
    expect(res.body.book.coverUrl).toBe('http://example.com/image.jpg');
});


