## QUESTO LO USO SOLO PER I TEST IN CLI ##

from app.scraper import get_profile_data
from app.analyzer import analyze_text
from pprint import pprint

def main():
    print("=== PoliTracker - Estrazione profilo ===")
    target = input("Inserisci il nome Wikipedia (es. Giorgia Meloni): ")
    profile_data = get_profile_data(target)
    print("\n🔹 BIO:")
    print(profile_data["bio"])

    print("\n🔍 ANALISI ENTITÀ NOMINATE:")
    entities = analyze_text(profile_data["bio"])
    pprint(entities)

if __name__ == "__main__":
    main()