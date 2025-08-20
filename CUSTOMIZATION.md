# 🎨 Руководство по кастомизации AngelFerne Messenger

## 🔧 Быстрые изменения

### 1. Изменить название сайта
**Файлы для изменения:**
- `/index.html` → строка 6: `<title>Новое название</title>`
- `/components/AuthLogin.tsx` → строка 50: `<span className="text-red-500">Новое название</span>`
- `/components/AngelFerneApp.tsx` → строка 126: `Welcome to <span className="text-red-500">Новое название</span>`

### 2. Изменить цвета
**Основной цвет (красный) заменить на свой:**

Найдите и замените во ВСЕХ файлах:
- `bg-red-600` → `bg-blue-600` (или любой другой)
- `text-red-500` → `text-blue-500`
- `border-red-500` → `border-blue-500`
- `hover:bg-red-700` → `hover:bg-blue-700`

**Быстрая замена через поиск:**
1. Ctrl+H во всем проекте
2. Найти: `red-`
3. Заменить на: `blue-` (или ваш цвет)

### 3. Добавить нового пользователя
**Файл:** `/components/AngelFerneApp.tsx` (после строки 102)

```jsx
// Новый пользователь
else if (credentials.username === 'ваш_логин' && credentials.password === 'ваш_пароль') {
  const userData: User = {
    username: credentials.username,
    subscriptionExpiry: '2025-12-31', // Дата окончания подписки
    isAdmin: false // true = админ, false = обычный пользователь
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

### 4. Изменить домен на Vercel
1. Зайдите в Vercel Dashboard
2. Откройте ваш проект
3. Settings → Domains
4. Add Domain → введите ваш домен
5. Настройте DNS у регистратора домена

## 🎯 Подробная кастомизация

### Изменение логотипа
**Замените иконку-ромб на свою:**

`/components/AuthLogin.tsx` (строки 42-46):
```jsx
<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
  {/* Вместо ромба можете вставить свою иконку */}
  <YourCustomIcon className="w-8 h-8 text-white" />
</div>
```

### Кастомные цвета через CSS
**Файл:** `/styles/globals.css`
```css
:root {
  --primary: #1e40af; /* Ваш основной цвет */
  --destructive: #dc2626; /* Цвет для кнопок удаления */
  --accent: #3b82f6; /* Акцентный цвет */
}
```

### Настройка Twitch интеграции
**Создайте файл accounts.txt:**
```
ваш_twitch_бот,oauth:ваш_токен_здесь,канал_для_бота
второй_аккаунт,oauth:другой_токен,другой_канал
```

**Получить токен:**
1. https://twitchapps.com/tmi/
2. Connect → Разрешить
3. Скопировать токен

### Отключение ненужных функций
**Скрыть viewbot:**
В `/components/TwitchBot.tsx` закомментируйте блок (строки ~170-200):
```jsx
{/* Viewbot Controls */}
{/* 
<div className="bg-gray-800 rounded-lg p-4">
  ... весь блок viewbot
</div>
*/}
```

## 📱 Адаптация под мобильные

### Упростить интерфейс для мобильных
В `/components/AngelFerneApp.tsx` добавьте проверку:
```jsx
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

Затем используйте условную отрисовку:
```jsx
{isMobile ? <MobileLayout /> : <DesktopLayout />}
```

## 🔐 Настройка безопасности

### Добавить капчу (опционально)
Установите пакет:
```bash
npm install react-google-recaptcha
```

В `/components/AuthLogin.tsx`:
```jsx
import ReCAPTCHA from "react-google-recaptcha";

// В форме добавьте:
<ReCAPTCHA
  sitekey="ваш_ключ_сайта"
  onChange={(value) => setCaptcha(value)}
/>
```

### Изменить время сессии
В `/components/AngelFerneApp.tsx` добавьте таймер:
```jsx
useEffect(() => {
  const sessionTimer = setTimeout(() => {
    handleLogout();
    setAuthError('Сессия истекла');
  }, 60 * 60 * 1000); // 1 час

  return () => clearTimeout(sessionTimer);
}, []);
```

## 🌍 Мультиязычность

### Добавить поддержку английского
Создайте файл `/locales/en.json`:
```json
{
  "welcome": "Welcome to",
  "login": "Login",
  "password": "Password",
  "loginButton": "Sign In"
}
```

В компонентах используйте:
```jsx
import en from '../locales/en.json';

const t = (key) => en[key] || key;

// Использование:
<span>{t('welcome')} <span className="text-red-500">{siteName}</span></span>
```

## 🚀 Автоматизация деплоя

### GitHub Actions
Создайте файл `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📊 Аналитика

### Добавить Google Analytics
В `/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🎨 Темы оформления

### Светлая тема
В `/styles/globals.css` добавьте:
```css
.light-theme {
  --background: #ffffff;
  --foreground: #000000;
  --card: #f8f9fa;
  /* ... другие переменные */
}
```

### Переключатель темы
```jsx
const [theme, setTheme] = useState('dark');

const toggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
  document.documentElement.className = theme === 'dark' ? 'light-theme' : '';
};
```

---

**💡 Совет:** Тестируйте каждое изменение локально перед деплоем!