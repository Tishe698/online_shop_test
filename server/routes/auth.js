const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');

const router = express.Router();

const secretKey = 'your_secret_key'; // Секретный ключ для генерации токенов

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

        const { username, password, name } = req.body;

        try {
            const existingUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.query(
                'INSERT INTO users (username, password, name, tokens) VALUES ($1, $2, $3, $4) RETURNING id, username, name',
                [username, hashedPassword, name, []]
            );

            res.status(201).json(newUser.rows[0]);
        } catch (err) {
            console.error('Ошибка регистрации:', err);
            res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
        }
    }
);

// Вход пользователя
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Получение пользователя
        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await db.query(userQuery, [username]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        const user = userResult.rows[0];

        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        // Генерация токена
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

        // Инициализация массива токенов
        let currentTokens = user.tokens || [];
        if (!Array.isArray(currentTokens)) {
            currentTokens = [];
        }

        // Лог текущих токенов
        console.log('Текущие токены до обновления:', currentTokens);

        // Добавление нового токена
        currentTokens.push(token);

        // Преобразование массива токенов в строку JSON
        const tokensJson = JSON.stringify(currentTokens);

        // Обновление массива токенов в базе данных
        await db.query('UPDATE users SET tokens = $1 WHERE id = $2', [tokensJson, user.id]);

        console.log('Текущие токены после добавления:', currentTokens);

        res.status(200).json({ message: 'Вход выполнен успешно', token });
    } catch (err) {
        console.error('Ошибка входа:', err);
        res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
    }
});


// Middleware для проверки токенов
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        const userQuery = 'SELECT * FROM users WHERE id = $1';
        const userResult = await db.query(userQuery, [decoded.id]);

        if (
            userResult.rows.length === 0 ||
            !(userResult.rows[0].tokens || []).includes(token)
        ) {
            return res.status(401).json({ error: 'Токен недействителен' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error('Ошибка проверки токена:', err);
        return res.status(401).json({ error: 'Неверный или истёкший токен' });
    }
};

// Выход из текущей сессии
router.post('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        const userQuery = 'SELECT * FROM users WHERE id = $1';
        const userResult = await db.query(userQuery, [decoded.id]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Пользователь не найден' });
        }

        const currentTokens = userResult.rows[0].tokens.filter((t) => t !== token);
        await db.query('UPDATE users SET tokens = $1 WHERE id = $2', [currentTokens, decoded.id]);

        res.status(200).json({ message: 'Вы успешно вышли из системы' });
    } catch (err) {
        console.error('Ошибка выхода:', err);
        res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
    }
});

// Выход из всех сессий
router.post('/logout_all', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        await db.query('UPDATE users SET tokens = $1 WHERE id = $2', [[], decoded.id]);

        res.status(200).json({ message: 'Вы вышли изо всех устройств' });
    } catch (err) {
        console.error('Ошибка выхода из всех сессий:', err);
        res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
    }
});
// Получение информации о текущем пользователе
router.get('/user', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовка Authorization

    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        // Проверяем токен
        const decoded = jwt.verify(token, secretKey);

        // Ищем пользователя в базе данных
        const userQuery = 'SELECT id, username, name FROM users WHERE id = $1';
        const userResult = await db.query(userQuery, [decoded.id]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // Возвращаем информацию о пользователе
        const user = userResult.rows[0];
        res.status(200).json({ id: user.id, username: user.username, name: user.name });
    } catch (err) {
        console.error('Ошибка проверки токена:', err);
        res.status(401).json({ error: 'Неверный или истёкший токен' });
    }
});


module.exports = router;
