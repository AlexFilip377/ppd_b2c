# Подключение Firebase к приложению

Проект: [montesoriai](https://console.firebase.google.com/u/0/project/montesoriai/)

## 1. Что сделать в Firebase Console

### 1.1. Получить конфиг приложения

1. Откройте [настройки проекта](https://console.firebase.google.com/u/0/project/montesoriai/settings/general).
2. Прокрутите до **«Ваши приложения»** → **Добавить приложение** → выберите **Web** (`</>`).
3. Укажите имя (например, `Montesori Mobile`) и зарегистрируйте приложение.
4. Скопируйте объект `firebaseConfig` (apiKey, authDomain, projectId и т.д.).

### 1.2. Authentication (уже включено)

Убедитесь, что в **Authentication → Sign-in method** включён провайдер **Email/Password**.

### 1.3. Firestore Database

1. **Firestore Database** → **Create database**.
2. Режим для разработки: **test mode** (или production + правила ниже).
3. Выберите регион (например, `europe-west`).

### 1.4. Правила безопасности Firestore

**Firestore Database → Rules** — вставьте и опубликуйте:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Тот же текст лежит в файле `firestore.rules` в папке `app`.

### 1.5. Структура данных (создаётся автоматически)

Коллекция: `users`  
Документ: `{uid}` пользователя из Authentication  

Поля:

| Поле | Тип | Описание |
|------|-----|----------|
| email | string | Email |
| name | string | Имя |
| city | string | Город |
| birthDate | string \| null | Дата рождения |
| specialty | string \| null | developer / designer / devops |
| onboardingCompleted | boolean | Пройден ли вводный тест |
| testAnswers | number[] | Ответы на тест |
| levelPercent | number | Уровень в % |

## 2. Что сделать в проекте

### 2.1. Файл `.env`

В папке `app` выполните:

```bash
copy .env.example .env
```

Заполните `.env` значениями из Firebase Console:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=montesoriai.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=montesoriai
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=montesoriai.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

### 2.2. Перезапуск Expo

После создания `.env` обязательно перезапустите сервер:

```bash
npx expo start -c
```

Флаг `-c` очищает кэш, чтобы подтянулись переменные окружения.

## 3. Как это работает в коде

| Файл | Назначение |
|------|------------|
| `src/config/firebase.ts` | Инициализация Firebase, Auth, Firestore |
| `src/services/auth.ts` | Регистрация, вход, профиль в Firestore |
| `firestore.rules` | Правила для копирования в консоль |

- **Регистрация** → Firebase Auth + документ в `users/{uid}`
- **Вход** → Firebase Auth + загрузка профиля из Firestore
- **Сессия** сохраняется на устройстве (AsyncStorage + Firebase Auth)
- **Вводный тест** один раз; флаг `onboardingCompleted` в Firestore

## 4. Проверка

1. Зарегистрируйте новый аккаунт в приложении.
2. В консоли: **Authentication → Users** — появился пользователь.
3. **Firestore → users** — появился документ с тем же uid.
4. Выйдите и войдите снова — должны попасть на главную (если тест пройден).

## 5. Частые ошибки

| Ошибка | Решение |
|--------|---------|
| `Firebase: не заданы переменные в .env` | Создайте `.env` и перезапустите `expo start -c` |
| `permission-denied` в Firestore | Опубликуйте правила из раздела 1.4 |
| `auth/email-already-in-use` | Email уже зарегистрирован |
| Нет интернета | Firebase требует сеть на устройстве/эмуляторе |
