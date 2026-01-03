import json
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

events_path = os.path.join(script_dir, 'data', 'events_items.json')
db_path = os.path.join(script_dir, 'db.json')

print(f'Читаю события из: {events_path}')
with open(events_path, 'r', encoding='utf-8') as f:
    events_data = json.load(f)

print(f'Читаю db.json из: {db_path}')
with open(db_path, 'r', encoding='utf-8') as f:
    db_data = json.load(f)

def get_event_type(event):
    title_lower = event.get('title', '').lower()
    link_lower = event.get('link', '').lower()
    text = f"{title_lower} {link_lower}"
    
    if 'ada school' in text or 'ada məktəb' in text:
        return 'ADA School'
    elif 'alumni' in text:
        return 'Alumni'
    elif 'executive education' in text:
        return 'Executive Education'
    elif 'idd' in text or 'institute for development' in text:
        return 'IDD'
    elif any(keyword in text for keyword in ['admission', 'qeydiyyat', 'melumat sessiyasi', 'info session', 'məlumat', 'açıq qapı', 'open house', 'abituriyent']):
        return 'Admission'
    elif any(keyword in text for keyword in ['student', 'career fair', 'tələbə', 'student life']):
        return 'Student'
    elif any(keyword in text for keyword in ['seminar', 'lecture', 'workshop', 'conference', 'academic', 'research', 'site talks', 'edudialogues']):
        return 'Academic'
    else:
        return 'University'

print('Обрабатываю события...')
events_with_ids = []
for index, event in enumerate(events_data, start=1):
    events_with_ids.append({
        'id': index,
        'title': event.get('title', ''),
        'date': event.get('date'),
        'time': event.get('time'),
        'link': event.get('link', ''),
        'image_url': event.get('image_url'),
        'type': get_event_type(event)
    })

db_data['events'] = events_with_ids

print(f'Сохраняю {len(events_with_ids)} событий в db.json...')
with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db_data, f, ensure_ascii=False, indent=2)

print(f'✅ Успешно добавлено {len(events_with_ids)} событий в db.json')
print(f'📊 Всего событий в базе: {len(events_with_ids)}')

