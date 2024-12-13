# Базовый образ для сборки React
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем React-приложение
RUN npm run build

# Используем Nginx для раздачи готового приложения
FROM nginx:stable-alpine

# Копируем пользовательскую конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
