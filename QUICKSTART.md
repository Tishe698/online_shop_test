# 🚀 Быстрый старт проекта Shop

## 📋 Что нужно для запуска:
- Docker (автоматическая установка через скрипты)
- 5 минут свободного времени

## 🎯 Один клик для запуска:

### macOS/Linux:
```bash
# 1. Сделать скрипты исполняемыми
chmod +x *.sh

# 2. Установить Docker (если не установлен)
./install-docker.sh

# 3. Запустить проект
./start.sh
```

### Windows:
```bash
# 1. Установить Docker (если не установлен)
install-docker.bat

# 2. Запустить проект
start.bat
```

## 🌐 Доступ к приложению:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **База данных**: localhost:5432

## 🧪 Тестирование:
```bash
cd client
npm install
npm run cypress:open
```

## 🛑 Остановка:
```bash
docker-compose down
```

## ❓ Проблемы?
1. Убедитесь, что Docker запущен
2. Проверьте логи: `docker-compose logs`
3. Перезапустите: `docker-compose restart`

---
**Создано для изучения автотестирования, SQL и Docker** 🎯
