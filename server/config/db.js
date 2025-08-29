const { Pool } = require('pg');

// Настройки подключения к базе данных
const pool = new Pool({
    user: process.env.DATABASE_USER || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DATABASE_NAME || 'online_shop',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    port: process.env.DATABASE_PORT || 5432,
    application_name: 'utf8', // Указывает на поддержку UTF-8
});

// Обработка ошибок подключения
pool.on('error', (err) => {
    console.error('Ошибка в подключении к базе данных:', err);
    process.exit(-1);
});

// Экспорт функции для выполнения запросов
module.exports = {
    query: (text, params) => pool.query(text, params),
};
