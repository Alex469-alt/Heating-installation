# Инструкция по настройке EmailJS

## Шаг 1: Регистрация на EmailJS

1. Перейдите на https://www.emailjs.com/
2. Зарегистрируйтесь или войдите в аккаунт
3. Перейдите в Dashboard

## Шаг 2: Создание Email Service

1. В меню выберите **Email Services**
2. Нажмите **Add New Service**
3. Выберите провайдера (Gmail, Outlook, Yandex и т.д.)
4. Следуйте инструкциям для подключения вашего email
5. **Скопируйте Service ID** (например: `service_xxxxxxx`)

## Шаг 3: Создание Email Template

1. В меню выберите **Email Templates**
2. Нажмите **Create New Template**
3. Заполните шаблон:

### Настройки шаблона:

**To Email:** `denis.bakhar@yandex.ru`

**Subject:** `Новая заявка: {{form_type}}`

**Content (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #000000;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f8f8f8;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-radius: 0 0 8px 8px;
        }
        .info-block {
            background-color: #ffffff;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #000000;
            border-radius: 4px;
        }
        .label {
            font-weight: bold;
            color: #000000;
            margin-bottom: 5px;
            display: block;
        }
        .value {
            color: #333;
            font-size: 16px;
        }
        .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Новая заявка с сайта</h2>
    </div>
    <div class="content">
        <div class="info-block">
            <span class="label">Тип заявки:</span>
            <span class="value">{{form_type}}</span>
        </div>
        
        <div class="info-block">
            <span class="label">Имя:</span>
            <span class="value">{{from_name}}</span>
        </div>
        
        <div class="info-block">
            <span class="label">Телефон:</span>
            <span class="value">{{phone}}</span>
        </div>
        
        <div class="info-block">
            <span class="label">Комментарий:</span>
            <span class="value">{{message}}</span>
        </div>
        
        <div class="info-block">
            <span class="label">Дата и время:</span>
            <span class="value">{{date}}</span>
        </div>
    </div>
    <div class="footer">
        <p>Это автоматическое письмо с сайта монтажа отопления</p>
    </div>
</body>
</html>
```

4. **Скопируйте Template ID** (например: `template_xxxxxxx`)

## Шаг 4: Получение Public Key

1. В меню выберите **Account** → **General**
2. Найдите **Public Key** (User ID)
3. **Скопируйте Public Key** (например: `xxxxxxxxxxxxx`)

## Шаг 5: Настройка в коде

1. Откройте файл `script.js`
2. Найдите константу `EMAILJS_CONFIG` (в начале файла)
3. Замените значения:

```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'ваш_service_id',      // Из шага 2
    TEMPLATE_ID: 'ваш_template_id',    // Из шага 3
    PUBLIC_KEY: 'ваш_public_key'       // Из шага 4
};
```

## Шаг 6: Тестирование

1. Откройте сайт в браузере
2. Заполните любую форму заявки
3. Отправьте форму
4. Проверьте почту `denis.bakhar@yandex.ru`
5. Проверьте консоль браузера (F12) на наличие ошибок

## Важные замечания

- EmailJS имеет бесплатный лимит: 200 писем/месяц
- Если лимит превышен, письма не будут отправляться
- Все данные логируются в консоль браузера для отладки
- Если EmailJS не настроен, сайт продолжит работать, но письма не будут отправляться

## Поддержка

Если возникли проблемы:
1. Проверьте консоль браузера (F12 → Console)
2. Убедитесь, что все ID введены правильно
3. Проверьте настройки Email Service в EmailJS Dashboard
4. Убедитесь, что шаблон использует правильные переменные: `{{form_type}}`, `{{from_name}}`, `{{phone}}`, `{{message}}`, `{{date}}`

