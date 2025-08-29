# 🛠️ Настройка проекта Shop

## 📋 Требования

- **Операционная система**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **RAM**: минимум 4GB (рекомендуется 8GB)
- **Дисковое пространство**: минимум 2GB
- **Интернет**: для загрузки Docker образов

## 🚀 Пошаговая установка

### Шаг 1: Клонирование проекта
```bash
git clone <repository-url>
cd shop
```

### Шаг 2: Автоматическая установка Docker

#### macOS/Linux:
```bash
# Сделать скрипты исполняемыми
chmod +x *.sh

# Установить Docker
./install-docker.sh
```

#### Windows:
```bash
# Запустить скрипт установки
install-docker.bat
```

### Шаг 3: Запуск проекта

#### macOS/Linux:
```bash
./start.sh
```

#### Windows:
```bash
start.bat
```

## 🔧 Ручная установка Docker

### macOS
1. Установить Homebrew: https://brew.sh/
2. Установить Docker: `brew install docker docker-compose colima`
3. Запустить Colima: `colima start`

### Windows
1. Скачать Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Установить и перезагрузить систему
3. Запустить Docker Desktop

### Ubuntu/Debian
```bash
# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Установить Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🐛 Решение проблем

### Docker не запускается
```bash
# macOS
colima start

# Linux
sudo systemctl start docker
sudo systemctl enable docker

# Windows
# Перезапустить Docker Desktop
```

### Порт занят
```bash
# Проверить занятые порты
lsof -i :3000
lsof -i :5001
lsof -i :5432

# Остановить процессы или изменить порты в docker-compose.yml
```

### Недостаточно памяти
```bash
# Увеличить лимиты Docker
# macOS: Docker Desktop → Settings → Resources
# Linux: изменить /etc/docker/daemon.json
```

### Проблемы с базой данных
```bash
# Пересоздать контейнеры
docker-compose down -v
docker-compose up -d

# Проверить логи
docker-compose logs postgres
```

## 📊 Мониторинг

### Статус сервисов
```bash
docker-compose ps
```

### Логи
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f postgres
```

### Ресурсы
```bash
docker stats
```

## 🧪 Тестирование

### Cypress тесты
```bash
cd client
npm install
npm run cypress:open
```

### API тесты
```bash
# Регистрация
curl -X POST http://localhost:5001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123","name":"Test User"}'

# Вход
curl -X POST http://localhost:5001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123"}'
```

## 🔒 Безопасность

### Переменные окружения
- Создайте файл `config.env` с вашими настройками
- Никогда не коммитьте секретные ключи
- Используйте разные пароли для разработки и продакшена

### Сетевая безопасность
- Docker контейнеры изолированы
- Порт 5432 (PostgreSQL) доступен только локально
- API доступен на порту 5001

## 📚 Дополнительные ресурсы

- [Docker документация](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Cypress](https://docs.cypress.io/)

---

**Создано для изучения автотестирования, SQL и Docker** 🎯
