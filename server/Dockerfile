# Базовый образ для Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Открываем порт
EXPOSE 5000

# Запуск сервера
CMD ["node", "server.js"]
