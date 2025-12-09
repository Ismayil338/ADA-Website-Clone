import json
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup


BASE_URL = "https://www.ada.edu.az"
EVENTS_URL = "https://www.ada.edu.az/en/events"
OUTPUT_PATH = Path("data") / "events_items.json"


def fetch_html(url: str) -> str:
    response = requests.get(url, timeout=20)
    response.raise_for_status()
    return response.text


def extract_text(el):
    if not el:
        return None
    text = el.get_text(separator=" ", strip=True)
    return text or None


def parse_events(html: str):
    soup = BeautifulSoup(html, "html.parser")
    items = []

    for card in soup.select("div.grid-item-style-1"):
        link_tag = card.select_one("a.grid-url")
        title_div = card.select_one(".grid-title")
        date_span = card.select_one(".date-and-time .date")
        time_span = card.select_one(".date-and-time .time")
        img_tag = card.select_one(".image img")

        href = urljoin(BASE_URL, link_tag["href"].strip()) if link_tag and link_tag.get("href") else None
        title = extract_text(title_div)
        date_text = extract_text(date_span)
        time_text = extract_text(time_span)
        image_url = urljoin(BASE_URL, img_tag.get("src", "").strip()) if img_tag else None

        items.append(
            {
                "title": title,
                "date": date_text,
                "time": time_text,
                "link": href,
                "image_url": image_url,
            }
        )

    return items


def main():
    all_items = []
    page = 1

    while True:
        page_url = f"{EVENTS_URL}?page={page}"
        html = fetch_html(page_url)
        page_items = parse_events(html)

        if not page_items:
            break

        all_items.extend(page_items)
        page += 1

    data = all_items
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(data)} events to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()

