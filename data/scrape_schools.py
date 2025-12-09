import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

BASE = "https://www.ada.edu.az"
PAGES = {
    "sb_faculty.json": "https://www.ada.edu.az/en/schools/sb",
    "site_faculty.json": "https://www.ada.edu.az/en/schools/site",
}

def fetch(url):
    r = requests.get(url, timeout=15)
    r.raise_for_status()
    return r.text

def parse_faculty(html, page_url):
    soup = BeautifulSoup(html, "html.parser")
    cards = soup.select("div.grid-item-style-2")
    items = []
    for card in cards:
        link = card.select_one("a.grid-url")
        if not link:
            continue
        href = urljoin(BASE, link.get("href", "").strip())
        name = (link.select_one(".grid-title") or {}).get_text(strip=True)
        desc = link.select_one(".grid-description")
        role, dept = None, None
        if desc:
            parts = [p.strip() for p in desc.get_text(separator="\n").split("\n") if p.strip()]
            if parts:
                role = parts[0]
            if len(parts) > 1:
                dept = " ".join(parts[1:])
        img_tag = link.select_one(".image img")
        img_url = urljoin(BASE, img_tag.get("src", "").strip()) if img_tag else None

        items.append({
            "name": name,
            "role": role,
            "department": dept,
            "profile_url": href,
            "image_url": img_url,
            "source_page": page_url,
        })
    return items

def main():
    for outfile, page_url in PAGES.items():
        html = fetch(page_url)
        data = parse_faculty(html, page_url)
        with open(outfile, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(data)} records to {outfile}")

if __name__ == "__main__":
    main()