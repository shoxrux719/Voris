# Madaminbek

Портфолио Madaminbek Ikramov на React, TypeScript и Vite.

## Локальный запуск

```bash
npm install
npm run dev
```

## Заявки в Telegram

Форма внизу страницы отправляет имя, фамилию и телефон через серверный маршрут `/api/lead`. Скопируйте `.env.example` в `.env` и заполните `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. Бот должен иметь право публиковать сообщения в указанном канале. Файл `.env` исключён из Git; токен не попадает в браузерную сборку.

Для запуска сайта с рабочей формой на сервере с Node.js:

```bash
npm install
npm run build
npm start
```

Порт по умолчанию — `4173`; можно задать переменную `PORT`. На статическом хостинге для `/api/lead` потребуется отдельная серверная функция.

## Проверка

```bash
npm test
npm run lint
npm run build
```
