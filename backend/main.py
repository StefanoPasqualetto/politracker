# backend/main.py

from app.scraper import get_profile_data
from pprint import pprint

def main():
    target = input("Inserisci il nome del politico o username: ")
    profile_data = get_profile_data(target)
    pprint(profile_data)

if __name__ == "__main__":
    main()