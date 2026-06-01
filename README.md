# Mini Project 2 — Vocabulary Learning App

## Overview

This is a full stack CRUD application for learning vocabulary. Users can organize vocabulary into word lists and manage individual word cards.

The app has a Next.js frontend, a FastAPI backend, and a PostgreSQL database.

## Features

* View all word lists
* Create, update, and delete word lists
* View all vocabulary words
* Create, update, and delete words
* Store data in PostgreSQL
* Connect frontend and backend with API requests

## Tech Stack

### Frontend

* Next.js App Router
* TypeScript
* Tailwind CSS
* React useEffect
* NEXT_PUBLIC_API_URL environment variable

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* PostgreSQL
* CORS

## Database Tables

The app uses two related tables:

* `word_lists`
* `words`

One word list can have many words.

## API Endpoints

### Word Lists

* GET `/word-lists`
* GET `/word-lists/{list_id}`
* POST `/word-lists`
* PUT `/word-lists/{list_id}`
* DELETE `/word-lists/{list_id}`

### Words

* GET `/words`
* GET `/words/{word_id}`
* POST `/words`
* PUT `/words/{word_id}`
* DELETE `/words/{word_id}`

## How to Run

### Backend

```bash
cd vocab-backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
docker compose up -d
python -m uvicorn main:app --reload
```

Backend docs:

```text
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd vocab-frontend
npm install
npm run dev
```

Frontend app:

```text
http://localhost:3000
```

## Use Case

This app is useful for students who want to study and organize English vocabulary for school, travel, and daily communication.
