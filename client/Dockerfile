# Базовый образ
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY .. .

# Сборка приложения
RUN npm run build

# Используем Nginx для раздачи готового приложения
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
