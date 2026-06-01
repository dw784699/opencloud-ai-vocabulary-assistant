# Vocab Backend

FastAPI backend for Mini Project 2: Vocabulary Learning App.

Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres URL.
2. Create a virtual environment and install dependencies:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Run

```powershell
uvicorn main:app --reload
```