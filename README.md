# Voris Turobov

Портфолио мобилографа и видеографа Voris Turobov на React, TypeScript и Vite.

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

## Подготовка видеоработ

Исходники находятся в `public/assets/VD`. Скрипт создаёт обложки и MP4-версии 1080p/720p с H.264, AAC и fast start в `public/assets/videos`:

```bash
python -m pip install imageio-ffmpeg
python scripts/prepare-videos.py
```

Список и подписи работ задаются в `src/data/films.ts`. Видео загружается только после выбора работы; сервер поддерживает частичные запросы для перемотки.

## Проверка

```bash
npm test
npm run lint
npm run build
```
