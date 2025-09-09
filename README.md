# 🛍️ Online Shop
Учебное веб‑приложение интернет‑магазина, созданное для демонстрации полного цикла разработки, тестирования и контейнеризации. Проект объединяет **React + Node.js + PostgreSQL**, покрыт автотестами и запускается в **Docker**.

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Цели проекта

* Изучение **E2E‑тестирования** с Cypress
* Практика работы с **PostgreSQL** и SQL‑запросами
* Опыт контейнеризации через **Docker** и оркестрацию **Docker Compose**
* Демонстрация DevOps‑подходов (разработка → тесты → развертывание)

## 🚀 Технологический стек

**Frontend**

* React 19
* Material‑UI
* Tailwind CSS
* React Router

**Backend**

* Node.js + Express.js
* PostgreSQL + Sequelize (ORM)
* JWT (аутентификация)
* bcrypt (хеширование паролей)

**Тестирование**

* Cypress (E2E)
* Faker.js (тестовые данные)

**DevOps**

* Docker + Docker Compose
* Nginx (статический фронтенд)

## 🧪 Тестирование с Cypress

* E2E сценарии: регистрация, логин, защищённые маршруты
* Генерация тестовых данных (Faker.js)
* Проверка UI‑компонентов и API

```bash
# Запуск тестов (из папки client)
npm run cypress:open        # GUI
npm run cypress:run         # Headless
```

Подробнее см. в `client/cypress/`.

## 🗄️ Работа с базой данных

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    tokens JSON DEFAULT '[]'
);
```

Подключение:

```bash
docker exec -it online_shop_postgres psql -U postgres -d online_shop
```

## 🐳 Docker

### Архитектура контейнеров

```
┌───────────┐   ┌─────────────┐   ┌────────────┐
│  Client   │   │   Server    │   │  Postgres  │
│ (Nginx)   │◄─►│ (Node.js)   │◄─►│   (DB)     │
│ Port 3000 │   │ Port 5000   │   │ Port 5432  │
└───────────┘   └─────────────┘   └────────────┘
```

### 🚀 Автоматический запуск (рекомендуется)

**macOS/Linux:**
```bash
# 1. Сделать скрипты исполняемыми
chmod +x *.sh

# 2. Установить Docker (если не установлен)
./install-docker.sh

# 3. Запустить проект
./start.sh
```

**Windows:**
```bash
# 1. Установить Docker
install-docker.bat

# 2. Запустить проект
start.bat
```

### 🔧 Ручной запуск

```bash
git clone <repository-url>
cd shop
docker-compose up -d
docker-compose ps
```

👉 **Подробные инструкции см. в [QUICKSTART.md](QUICKSTART.md)**

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5001](http://localhost:5001) *(порт 5000 часто занят системными сервисами)*
* PostgreSQL → localhost:5432

👉 Подробные инструкции и команды — в [DOCKER.md](DOCKER.md)

## 🔧 Локальная разработка

```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm start
```

### Переменные окружения

```env
# Backend (.env)
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=online_shop
JWT_SECRET=your_secret_key

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5001
```

## 📚 API (аутентификация)

* `POST /auth/register` — регистрация
* `POST /auth/login` — вход
* `POST /auth/logout` — выход
* `POST /auth/logout_all` — выход со всех устройств
* `GET /auth/user` — информация о пользователе

Пример:

```bash
curl -X POST http://localhost:5001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123","name":"Test User"}'
```

## 🚀 Развертывание

```bash
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml ps
```

Масштабирование:

```bash
docker-compose up -d --scale server=3
```

## 🤝 Вклад

1. Форкните репозиторий
2. Создайте ветку (`git checkout -b feature/awesome`)
3. Commit + Push
4. Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробности в файле [LICENSE](LICENSE).

Образовательный проект для изучения автотестирования, SQL и Docker.

---
## 📞 Контакты

- **Email**: govard6981@outlook.com
- **Telegram**: @Ivan_tishe
