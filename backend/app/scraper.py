# backend/app/scraper.py

import requests
from bs4 import BeautifulSoup

def get_profile_data(target):
    base_url = "https://it.wikipedia.org/wiki/"
    # wikipedia usa il formato mario_rossi
    url = base_url + target.replace(" ", "_")

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        return {"error": f"Errore nella richiesta: {str(e)}"}

    soup = BeautifulSoup(response.content, "html.parser")

    # Prendo il primo paragrafo utile
    paragraphs = soup.select("p")
    bio = ""
    for p in paragraphs:
        text = p.get_text().strip()
        if len(text) > 50:  # salto paragrafi vuoti o brevi
            bio = text
            break

    # Provo a recuperare anche l'immagine se presente
    img_tag = soup.select_one(".infobox img")
    image_url = f"https:{img_tag['src']}" if img_tag else None

    return {
        "source": url,
        "bio": bio,
        "image": image_url
    }