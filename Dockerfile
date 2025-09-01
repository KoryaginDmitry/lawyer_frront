# Используем Node.js для сборки
FROM node:20-alpine AS build

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json / pnpm-lock.yaml / yarn.lock
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем проект для продакшена
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine

# Копируем билд в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем свой конфиг nginx (если есть)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
