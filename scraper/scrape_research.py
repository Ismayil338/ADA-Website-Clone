import json
from pathlib import Path
from typing import List, Dict, Optional
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup


BASE_URL = "https://www.ada.edu.az"
RESEARCH_URL = "https://www.ada.edu.az/en/academics/research"
OUTPUT_PATH = Path("data") / "research_items.json"


def fetch_html(url: str) -> str:
    response = requests.get(url, timeout=20)
    response.raise_for_status()
    return response.text


def extract_text(element) -> Optional[str]:
    if not element:
        return None
    text = element.get_text(separator=" ", strip=True)
    return text or None


def parse_research_items(html: str) -> List[Dict[str, Optional[str]]]:
    soup = BeautifulSoup(html, "html.parser")
    items = []

    for card in soup.select("div.filtered-item"):
        link_tag = card.select_one("a.program-result-item")
        title_span = card.select_one("div.title span")
        author_div = card.select_one("div.level")
        school_span = card.select_one("div.title .position-absolute")

        href = urljoin(BASE_URL, link_tag["href"].strip()) if link_tag and link_tag.get("href") else None
        title = extract_text(title_span)
        author = extract_text(author_div)
        school = extract_text(school_span)
        items.append(
            {
                "title": title,
                "author": author,
                "school_label": school,
                "link": href,
            }
        )

    return items


def main() -> None:
    html = fetch_html(RESEARCH_URL)
    data = parse_research_items(html)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(data)} items to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()

