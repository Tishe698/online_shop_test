const { Pool } = require('pg');

// Настройки подключения к базе данных
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'online_shop',
    password: 'postgres', // Укажите свой пароль
    port: 5432,
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
