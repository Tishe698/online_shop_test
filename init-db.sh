#!/bin/bash

echo "🗄️ Инициализация базы данных..."

# Ждем, пока PostgreSQL запустится
echo "⏳ Ждем запуска PostgreSQL..."
sleep 15

# Проверяем, что PostgreSQL доступен
echo "🔍 Проверяем доступность PostgreSQL..."
until docker-compose exec postgres pg_isready -U postgres; do
    echo "⏳ PostgreSQL еще не готов, ждем..."
    sleep 2
done

echo "✅ PostgreSQL готов"

# Создаем таблицы
echo "📋 Создаем таблицы..."
docker-compose exec postgres psql -U postgres -d online_shop -c "
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    tokens JSON DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"

# Создаем индексы
echo "🔍 Создаем индексы..."
docker-compose exec postgres psql -U postgres -d online_shop -c "
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_tokens ON users USING GIN(tokens);
"

# Проверяем результат
echo "✅ Проверяем созданные таблицы..."
docker-compose exec postgres psql -U postgres -d online_shop -c "\dt"

echo ""
echo "🎉 База данных инициализирована!"
echo "📋 Теперь можно тестировать API:"
echo "   curl -X POST http://localhost:5001/auth/register -H \"Content-Type: application/json\" -d '{\"username\":\"test@example.com\",\"password\":\"password123\",\"name\":\"Test User\"}'"
