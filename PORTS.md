# 🔌 Порты проекта Shop

## 📋 Распределение портов

| Сервис | Внешний порт | Внутренний порт | Описание |
|---------|--------------|-----------------|----------|
| **Frontend** | 3000 | 80 | React приложение (Nginx) |
| **Backend** | 5001 | 5000 | Node.js API сервер |
| **Database** | 5432 | 5432 | PostgreSQL |

## 🎯 Почему Backend на порту 5001?

**Порт 5000 часто занят системными сервисами:**
- **macOS**: AirTunes, AirPlay Receiver
- **Windows**: может быть занят другими приложениями
- **Linux**: обычно свободен

**Решение:** Используем порт 5001 для избежания конфликтов

## 🔧 Изменение портов

### Backend порт
```yaml
# docker-compose.yml
server:
  ports:
    - "5001:5000"  # Внешний:Внутренний
```

### Frontend порт
```yaml
# docker-compose.yml
client:
  ports:
    - "3000:80"    # Внешний:Внутренний
```

### Database порт
```yaml
# docker-compose.yml
postgres:
  ports:
    - "5432:5432"  # Внешний:Внутренний
```

## 🌐 URL адреса

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Database**: localhost:5432

## 🚨 Проблемы с портами

### Порт занят
```bash
# Проверить занятые порты
lsof -i :5001
lsof -i :3000
lsof -i :5432

# Остановить процесс
kill -9 <PID>
```

### Изменить порт
```yaml
# docker-compose.yml
server:
  ports:
    - "8080:5000"  # Новый внешний порт
```

## 📱 Тестирование портов

```bash
# Frontend
curl -I http://localhost:3000

# Backend
curl -I http://localhost:5001

# Database
docker-compose exec postgres pg_isready -U postgres
```

---

**Создано для изучения автотестирования, SQL и Docker** 🎯
