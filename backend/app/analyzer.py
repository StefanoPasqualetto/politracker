import spacy
import re

nlp = spacy.load("it_core_news_lg")

def extract_dates_with_context(text):
    pattern = r'\d{1,2}\s(?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\s\d{4}'
    matches = re.finditer(pattern, text)

    results = []
    for match in matches:
        date = match.group()
        start = match.start()
        # Trova una frase attorno alla data (grezza, ma funziona)
        context = text[max(0, start - 120): start + 120]
        results.append({
            "entity": date,
            "context": context.strip()
        })

    return results

def analyze_text(text):
    doc = nlp(text)
    entities = {}

    for sent in doc.sents:
        for ent in sent.ents:
            label = ent.label_
            if label not in entities:
                entities[label] = []

            # Evita duplicati
            if not any(e["entity"] == ent.text for e in entities[label]):
                entities[label].append({
                    "entity": ent.text,
                    "context": sent.text.strip()
                })

    # Fallback sulle DATE se non rilevate
    if "DATE" not in entities or not entities["DATE"]:
        fallback_dates = extract_dates_with_context(text)
        if fallback_dates:
            entities["DATE"] = fallback_dates

    return entities