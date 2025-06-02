import spacy
import re

nlp = spacy.load("it_core_news_lg")

def extract_dates(text):
    pattern = r'\d{1,2}\s(?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\s\d{4}'
    return re.findall(pattern, text)

def analyze_text(text):
    doc = nlp(text)
    entities = {}

    for ent in doc.ents:
        label = ent.label_
        if label not in entities:
            entities[label] = []
        if ent.text not in entities[label]:
            entities[label].append(ent.text)

    # Se il modello non ha rilevato un entità DATE, eseguo una ragex di fallback per crearmela
    # TODO CONTESTUALIZZARE LE DATE CHE ORA VENGONO BUTTATE ALLA RINFUSA
    if "DATE" not in entities:
        dates = extract_dates(text)
        if dates:
            entities["DATE"] = dates

    return entities