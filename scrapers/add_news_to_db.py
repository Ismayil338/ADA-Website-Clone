#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os

# Получаем абсолютный путь к директории скрипта
script_dir = os.path.dirname(os.path.abspath(__file__))

# Читаем файлы
news_path = os.path.join(script_dir, 'data', 'news_items.json')
db_path = os.path.join(script_dir, 'db.json')

print(f'Читаю новости из: {news_path}')
with open(news_path, 'r', encoding='utf-8') as f:
    news_data = json.load(f)

print(f'Читаю db.json из: {db_path}')
with open(db_path, 'r', encoding='utf-8') as f:
    db_data = json.load(f)

# Преобразуем новости: добавляем id
print('Обрабатываю новости...')
news_with_ids = []
for index, news in enumerate(news_data, start=1):
    news_with_ids.append({
        'id': index,
        'title': news.get('title', ''),
        'category': news.get('category', ''),
        'link': news.get('link', ''),
        'image_url': news.get('image_url')
    })

# Добавляем новости в db.json
db_data['news'] = news_with_ids

# Сохраняем обновленный db.json
print(f'Сохраняю {len(news_with_ids)} новостей в db.json...')
with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db_data, f, ensure_ascii=False, indent=2)

print(f'✅ Успешно добавлено {len(news_with_ids)} новостей в db.json')
print(f'📊 Всего новостей в базе: {len(news_with_ids)}')

