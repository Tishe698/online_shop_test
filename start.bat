@echo off
echo 🚀 Запуск проекта Shop...

echo.
echo 📋 Проверяем Docker...

docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker не установлен!
    echo 📋 Запустите install-docker.bat для установки
    pause
    exit /b 1
)

echo ✅ Docker установлен

echo.
echo 🚀 Запускаем проект...
docker-compose up -d

echo.
echo ⏳ Ждем запуска сервисов...
timeout /t 10 /nobreak >nul

echo.
echo 🔍 Проверяем статус сервисов...
docker-compose ps

echo.
echo 🎉 Проект запущен!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5001
echo 🗄️  Database: localhost:5432
echo.
echo 📋 Полезные команды:
echo    docker-compose logs -f          # Просмотр логов
echo    docker-compose down             # Остановка проекта
echo    docker-compose restart          # Перезапуск
echo.
echo 🧪 Для запуска тестов:
echo    cd client ^&^& npm run cypress:open
echo.
pause
