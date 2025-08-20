# AngelFerne Messenger - Twitch Bot Dashboard

## 🚀 Быстрый запуск

### ✅ Исправленные проблемы:
- ✅ Добавлены все зависимости @radix-ui для shadcn/ui компонентов
- ✅ Исправлены все импорты с версиями в UI компонентах (select, dropdown-menu, dialog, checkbox, tooltip и др.)
- ✅ Обновлен package.json с совместимыми версиями зависимостей
- ✅ Исправлена система проверки подписок с блокировкой аккаунтов
- ✅ Готов для размещения на Vercel и Netlify без ошибок сборки

### 🔐 Тестовые аккаунты для входа:

| Логин | Пароль | Статус | Описание |
|-------|--------|---------|----------|
| `admin` | `admin` | 👑 Администратор | Полный доступ, управление пользователями |
| `demo` | `demo` | ✅ Активная подписка | Доступ до 31.12.2024 |
| `user` | `user` | ❌ Подписка истекла | Блокировка с 01.01.2024 |
| `expired` | `expired` | 🚫 Старая подписка | Блокировка с 01.12.2023 |

## 🎨 Кастомизация и настройки

### Изменение названия сайта

#### 1. Название в браузере (title)
Файл: `/index.html`
```html
<title>Ваше название сайта</title>
```

#### 2. Название в интерфейсе
Файл: `/components/AngelFerneApp.tsx` (строка ~126)
```jsx
<span className="text-white text-sm">Welcome to <span className="text-red-500">Ваше название</span></span>
```

Файл: `/components/AuthLogin.tsx` (строки ~48-52)
```jsx
<h1 className="text-white text-xl mb-2">
  <span className="text-red-500">Ваше название</span> Messenger
</h1>
```

#### 3. Название в логах
Файл: `/components/AngelFerneApp.tsx` (строка ~287)
```jsx
<p className="text-gray-300">Ваше название v1.0</p>
```

### Изменение логотипа

#### Файл: `/components/AuthLogin.tsx` (строки ~42-46)
```jsx
<div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
    <div className="w-4 h-4 bg-red-600 rounded-sm transform rotate-45"></div>
  </div>
</div>
```

#### Файл: `/components/AngelFerneApp.tsx` (строки ~119-121)
```jsx
<div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
</div>
```

### Изменение цветовой схемы

#### 1. Основные цвета приложения
Файл: `/styles/globals.css`
```css
:root {
  --primary: #030213; /* Основной цвет */
  --destructive: #d4183d; /* Красный цвет (кнопки удаления) */
  /* Измените на свои цвета */
}
```

#### 2. Красные акценты
Найдите и замените во всех компонентах:
- `bg-red-600` → `bg-your-color-600`
- `text-red-500` → `text-your-color-500`
- `border-red-500` → `border-your-color-500`

### Изменение URL и мета-информации

#### 1. Favicon
Замените файл: `/public/logo.svg` (если есть)
В `/index.html`:
```html
<link rel="icon" type="image/svg+xml" href="/your-favicon.svg" />
```

#### 2. Мета-теги
Файл: `/index.html`
```html
<meta name="description" content="Ваше описание сайта" />
<meta property="og:title" content="Ваше название" />
<meta property="og:description" content="Ваше описание" />
```

#### 3. package.json
```json
{
  "name": "your-app-name",
  "description": "Ваше описание",
  "author": "Ваше имя"
}
```

### Настройка домена на Vercel

#### После деплоя:
1. В dashboard Vercel откройте ваш проект
2. Перейдите в `Settings → Domains`
3. Нажмите `Add Domain`
4. Введите ваш домен (например: `mybot.com`)
5. Настройте DNS записи у вашего регистратора:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Настройка аутентификации

#### Добавление новых пользователей
Файл: `/components/AngelFerneApp.tsx` (строки ~60-100)
```jsx
// Добавьте новый блок после существующих
else if (credentials.username === 'newuser' && credentials.password === 'newpass') {
  const userData: User = {
    username: credentials.username,
    subscriptionExpiry: '2024-12-31', // Дата окончания подписки
    isAdmin: false // true для админа
  };
  
  if (isSubscriptionValid(userData.subscriptionExpiry, userData.isAdmin)) {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('angelferne_auth', JSON.stringify(userData));
  } else {
    setAuthError('Срок подписки истёк.');
  }
}
```

### Настройка IRC подключения

#### Формат файла accounts.txt:
```
twitch_nickname,oauth:your_twitch_token,channel_name
bot_account1,oauth:abcd1234efgh5678,streamer_channel
bot_account2,oauth:xyz9876wvu5432,another_channel
```

#### Получение Twitch OAuth токена:
1. Идите на https://twitchapps.com/tmi/
2. Нажмите "Connect"
3. Авторизуйтесь через Twitch
4. Скопируйте токен (начинается с `oauth:`)

### Изменение функциональности

#### Отключение viewbot функции:
Файл: `/components/TwitchBot.tsx`
Закомментируйте секцию "Viewbot Controls" (строки ~200-230)

#### Добавление новых команд бота:
Файл: `/components/TwitchIRC.tsx`
В методе `handleMessage` добавьте обработку команд:
```jsx
if (message.startsWith('!')) {
  // Обработка команд бота
  const command = message.split(' ')[0];
  switch(command) {
    case '!hello':
      this.sendMessage(channel, 'Привет!');
      break;
    // Добавьте свои команды
  }
}
```

## 📦 Размещение на хостинге

### Vercel (Рекомендуется)
1. Скачайте проект из Figma Make
2. Создайте репозиторий на GitHub
3. Загрузите все файлы в репозиторий
4. Подключите GitHub к Vercel
5. Vercel автоматически определит настройки

### Netlify (Альтернатива)
1. Загрузите проект в GitHub
2. Подключите репозиторий к Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Настройки сборки
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Node.js version: 18+
- ✅ Install command: `npm install`

## 🔧 Решение проблем

### ❌ Ошибки при сборке
**Все ошибки исправлены:**
- ✅ @radix-ui/react-select версии убраны
- ✅ @radix-ui/react-dropdown-menu версии убраны
- ✅ class-variance-authority версии убраны
- ✅ lucide-react версии убраны
- ✅ Все UI компоненты обновлены

### Белый экран после деплоя
1. Проверьте консоль браузера (F12)
2. Убедитесь что все файлы загружены
3. Проверьте правильность путей в vite.config.js

### 404 при переходе по ссылкам
1. Убедитесь что vercel.json настроен для SPA
2. Проверьте конфигурацию маршрутизации

## 🤖 Функциональность

### Twitch Bot
- ✅ Реальное IRC подключение к Twitch
- ✅ Отправка сообщений в чат
- ✅ Накрутка онлайна (viewbot)
- ✅ Автоотправка сообщений
- ✅ Консоль логов с цветовой индикацией

### Управление пользователями (только для админов)
- ✅ Регистрация новых пользователей
- ✅ Генерация ключей доступа
- ✅ Управление подписками
- ✅ Блокировка/разблокировка аккаунтов

### Система подписок
- ✅ Автоматическая проверка срока подписки
- ✅ Блокировка истекших аккаунтов
- ✅ Админы имеют бессрочный доступ
- ✅ Уведомления об истечении подписки

## 🛠️ Технические детали

### Структура проекта
```
├── components/
│   ├── AngelFerneApp.tsx      # Основное приложение
│   ├── AuthLogin.tsx          # Система авторизации
│   ├── TwitchBot.tsx          # Twitch бот интерфейс
│   ├── TwitchIRC.tsx          # IRC подключение
│   ├── UserRegistration.tsx   # Управление пользователями
│   └── ui/                    # Shadcn/ui компоненты (исправлено)
├── styles/globals.css         # Tailwind V4 стили
├── package.json              # Зависимости (исправлено)
├── vite.config.js            # Конфигурация Vite
└── vercel.json               # Конфигурация Vercel
```

### Зависимости
- React 18 + TypeScript
- Tailwind CSS v4
- Shadcn/ui компоненты (исправлены импорты)
- Lucide React иконки
- WebSocket для IRC

## 📊 Мониторинг

Приложение включает:
- Консоль логов в реальном времени
- Статистику отправленных сообщений
- Мониторинг подключений
- Системные уведомления

## 🔐 Безопасность

- Проверка подписок при каждом входе
- Автоматическое отключение истекших аккаунтов
- Сохранение сессии в localStorage
- Валидация токенов и разрешений

## 💡 Дополнительные возможности

После базовой настройки вы можете:
- Интегрировать с реальной базой данных
- Добавить Push-уведомления
- Расширить аналитику
- Создать API для внешних интеграций
- Добавить поддержку множественных каналов

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в консоли браузера
2. Убедитесь в правильности настроек
3. Проверьте статус Twitch API
4. Обратитесь к администратору системы

---

**🎉 Ваш AngelFerne Messenger готов к размещению на Vercel без ошибок сборки!**