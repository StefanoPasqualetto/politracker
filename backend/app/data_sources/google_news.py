import os
import requests
from dotenv import load_dotenv

load_dotenv()

GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")
BASE_URL = "https://gnews.io/api/v4/search"

def get_google_news_results(query: str, max_results: int = 10):
    params = {
        "q": query,
        "lang": "it",
        "country": "it",
        "max": max_results,
        "sortby": "publishedAt",
        "token": GNEWS_API_KEY
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"[GNews] Errore richiesta: {e}")
        return []

    data = response.json()
    if "articles" not in data:
        print("[GNews] Nessun articolo trovato")
        return []

    return [
        {
            "title": article["title"],
            "link": article["url"],
            "snippet": article.get("description", ""),
            "publishedAt": article.get("publishedAt", "")
        }
        for article in data["articles"]
    ]