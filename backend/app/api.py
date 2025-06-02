# backend/app/api.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.scraper import get_profile_data
from app.analyzer import analyze_text

app = FastAPI()

class AnalyzeRequest(BaseModel):
    target: str

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    data = get_profile_data(request.target)

    if "bio" not in data or not data["bio"]:
        raise HTTPException(status_code=404, detail="Profilo non trovato o bio vuota")

    entities = analyze_text(data["bio"])

    return {
        "target": request.target,
        "bio": data["bio"],
        "image": data["image"],
        "source": data["source"],
        "entities": entities
    }