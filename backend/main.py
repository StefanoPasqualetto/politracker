## QUESTO LO USO SOLO PER I TEST IN CLI ##

from app.scraper import get_profile_data
from app.analyzer import analyze_text
from pprint import pprint

from app.data_sources.google_news import get_google_news_results

def main():
    print("=== PoliTracker - Estrazione profilo ===")
    target = input("Inserisci il nome Wikipedia (es. Giorgia Meloni): ")
    profile_data = get_profile_data(target)

    if not profile_data or "bio" not in profile_data:
        print(f"❌ Nessuna bio trovata per '{target}' su Wikipedia.")
        return

    print("\n🔹 BIO:")
    print(profile_data["bio"])

    print("\n🔍 ANALISI ENTITÀ NOMINATE:")
    entities = analyze_text(profile_data["bio"])
    pprint(entities)

    print("🔹 GOOGLE NEWS:")
    for news in get_google_news_results(target):
        print(f"📰 {news['title']}")
        print(f"🔗 {news['link']}")
        if news['snippet']:
            print(f"📌 {news['snippet']}")
        print()

if __name__ == "__main__":
    main()