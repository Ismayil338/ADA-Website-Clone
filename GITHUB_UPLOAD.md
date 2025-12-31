# Инструкция по загрузке проекта на GitHub

## Шаг 1: Инициализация Git репозитория
```powershell
git init
```

## Шаг 2: Добавление всех файлов
```powershell
git add .
```

## Шаг 3: Создание первого коммита
```powershell
git commit -m "Initial commit: Events page with filters and pagination"
```

## Шаг 4: Создание репозитория на GitHub
1. Откройте https://github.com в браузере
2. Войдите в свой аккаунт
3. Нажмите на кнопку "+" в правом верхнем углу
4. Выберите "New repository"
5. Введите имя репозитория (например: `final-project-10211_team4`)
6. **НЕ** добавляйте README, .gitignore или лицензию (они уже есть в проекте)
7. Нажмите "Create repository"

## Шаг 5: Подключение к GitHub и отправка кода
После создания репозитория GitHub покажет вам команды. Выполните:

```powershell
git remote add origin https://github.com/ВАШ_USERNAME/final-project-10211_team4.git
git branch -M main
git push -u origin main
```

**Важно:** Замените `ВАШ_USERNAME` на ваш реальный GitHub username!

## Если возникнут проблемы:

### Если нужно настроить имя и email для Git:
```powershell
git config --global user.name "Ваше Имя"
git config --global user.email "ваш@email.com"
```

### Если нужно обновить код после изменений:
```powershell
git add .
git commit -m "Описание изменений"
git push
```

### Если нужно проверить статус:
```powershell
git status
```

