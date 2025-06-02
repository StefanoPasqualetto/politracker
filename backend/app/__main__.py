# backend/app/__main__.py
## PER IL SERVER FASTAPI ED ESPORRE DATI
## PER avviarlo in CLI => python -m app
## in 127.0.0.1:8000/docs troverò i miei endpoint

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="127.0.0.1", port=8000, reload=True)