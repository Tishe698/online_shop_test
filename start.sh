#!/bin/bash

echo "🚀 Запуск проекта Shop..."

# Проверяем, установлен ли Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен!"
    echo "📋 Запустите скрипт установки:"
    echo "   chmod +x install-docker.sh && ./install-docker.sh"
    exit 1
fi

# Проверяем, запущен ли Docker
if ! docker info &> /dev/null; then
    echo "❌ Docker не запущен!"
    echo "📋 Запустите Docker Desktop или Colima:"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "   colima start"
    else
        echo "   sudo systemctl start docker"
    fi
    exit 1
fi

echo "✅ Docker работает"

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down

# Запускаем проект
echo "🚀 Запускаем проект..."
docker-compose up -d

# Ждем запуска
echo "⏳ Ждем запуска сервисов..."
sleep 10

# Проверяем статус
echo "🔍 Проверяем статус сервисов..."
docker-compose ps

echo ""
echo "🎉 Проект запущен!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5001"
echo "🗄️  Database: localhost:5432"
echo ""
echo "📋 Полезные команды:"
echo "   docker-compose logs -f          # Просмотр логов"
echo "   docker-compose down             # Остановка проекта"
echo "   docker-compose restart          # Перезапуск"
echo ""
echo "🧪 Для запуска тестов:"
echo "   cd client && npm run cypress:open"
