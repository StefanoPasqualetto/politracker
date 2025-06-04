# backend/app/scraper.py

import requests
from bs4 import BeautifulSoup

def get_profile_data(target):
    base_url = "https://it.wikipedia.org/wiki/"
    formatted = target.strip().replace(" ", "_")
    url = base_url + formatted

    print(f"🌐 URL Wikipedia: {url}")

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"❌ Errore nella richiesta HTTP: {e}")
        return {}

    soup = BeautifulSoup(response.content, "html.parser")
    paragraphs = soup.select("p")

    print(f"📄 Trovati {len(paragraphs)} paragrafi...")

    bio = ""
    for p in paragraphs:
        text = p.get_text().strip()
        print(f"— {text[:60]}...")  # stampa solo i primi 60 caratteri per debug
        if len(text) > 50:
            bio = text
            break

    if not bio:
        print("⚠️ Nessun paragrafo significativo trovato.")
        return {}

    img_tag = soup.select_one(".infobox img")
    image_url = f"https:{img_tag['src']}" if img_tag else None

    return {
        "source": url,
        "bio": bio,
        "image": image_url
    }