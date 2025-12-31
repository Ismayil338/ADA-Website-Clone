#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os

# Получаем абсолютный путь к директории скрипта
script_dir = os.path.dirname(os.path.abspath(__file__))

# Читаем файлы
programs_path = os.path.join(script_dir, 'data', 'programs_items.json')
db_path = os.path.join(script_dir, 'db.json')

print(f'Читаю программы из: {programs_path}')
with open(programs_path, 'r', encoding='utf-8') as f:
    programs_data = json.load(f)

print(f'Читаю db.json из: {db_path}')
with open(db_path, 'r', encoding='utf-8') as f:
    db_data = json.load(f)

# Преобразуем программы: добавляем id
print('Обрабатываю программы...')
programs_with_ids = []
for index, program in enumerate(programs_data, start=1):
    programs_with_ids.append({
        'id': index,
        'title': program.get('title', ''),
        'school_label': program.get('school_label', ''),
        'level': program.get('level', ''),
        'link': program.get('link', '')
    })

# Добавляем программы в db.json
db_data['programs'] = programs_with_ids

# Сохраняем обновленный db.json
print(f'Сохраняю {len(programs_with_ids)} программ в db.json...')
with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db_data, f, ensure_ascii=False, indent=2)

print(f'✅ Успешно добавлено {len(programs_with_ids)} программ в db.json')
print(f'📊 Всего программ в базе: {len(programs_with_ids)}')

