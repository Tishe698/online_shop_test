const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Подключение библиотеки JWT
const { body, validationResult } = require('express-validator');
const db = require('../config/db');

const router = express.Router();

const secretKey = 'your_secret_key'; // Секретный ключ для генерации токенов

// Функция для приведения первой буквы к нижнему регистру
const normalizeFirstLetter = (email) => {
    if (!email) return email;
    return email.charAt(0).toLowerCase() + email.slice(1);
};

// Регистрация пользователя
router.post(
    '/register',
    [
        body('username').isEmail().withMessage('Email должен быть корректным'),
        body('password').isLength({ min: 8 }).withMessage('Пароль должен быть минимум 8 символов'),
        body('name').notEmpty().withMessage('Имя обязательно'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { username, password, name } = req.body;

        try {
            // Преобразуем первую букву email в нижний регистр
            username = normalizeFirstLetter(username);

            // Проверка существующего пользователя
            const existingUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
            }

            // Хэшируем пароль
            const hashedPassword = await bcrypt.hash(password, 10);

            // Вставляем пользователя в базу
            const newUser = await db.query(
                'INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING id, username, name',
                [username, hashedPassword, name]
            );

            res.status(200).json(newUser.rows[0]);
        } catch (err) {
            console.error('Ошибка регистрации:', err);
            res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
        }
    }
);

// Вход пользователя
router.post(
    '/login',
    [
        body('username').isEmail().withMessage('Имя пользователя должно быть в формате email'),
        body('password').notEmpty().withMessage('Пароль обязателен'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { username, password } = req.body;

        try {
            // Преобразуем первую букву email в нижний регистр
            username = normalizeFirstLetter(username);

            const userQuery = `SELECT * FROM users WHERE username = '${username}'`;
            const userResult = await db.query(userQuery);
            if (userResult.rows.length === 0) {
                return res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
            }

            const user = userResult.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
            }

            // Генерация токена
            const token = jwt.sign(
                { id: user.id, username: user.username }, // Payload токена
                secretKey, // Секретный ключ
                { expiresIn: '1h' } // Время жизни токена
            );

            res.status(200).json({ message: 'Вход выполнен успешно', token });
        } catch (err) {
            console.error('Ошибка входа:', err);
            res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
        }
    }
);

// Получение имени пользователя
router.get('/user', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовков

    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        // Декодируем токен
        const decoded = jwt.verify(token, secretKey);

        // Получаем информацию о пользователе из базы
        const userQuery = 'SELECT name FROM users WHERE id = $1';
        const userResult = await db.query(userQuery, [decoded.id]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        res.status(200).json({ name: userResult.rows[0].name });
    } catch (err) {
        console.error('Ошибка проверки токена:', err);
        res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
    }
});

module.exports = router;

