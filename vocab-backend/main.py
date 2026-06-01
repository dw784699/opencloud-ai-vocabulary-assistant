from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import get_db, init_db_and_seed
import models
import schemas

app = FastAPI(title="Vocabulary Learning API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db_and_seed()


### Word List Endpoints

@app.get("/word-lists", response_model=List[schemas.WordListResponse])
def read_word_lists(db: Session = Depends(get_db)):
    lists = db.query(models.WordList).all()
    return lists


@app.get("/word-lists/{list_id}", response_model=schemas.WordListResponse)
def read_word_list(list_id: int, db: Session = Depends(get_db)):
    wl = db.query(models.WordList).filter(models.WordList.id == list_id).first()
    if not wl:
        raise HTTPException(status_code=404, detail="Word list not found")
    return wl


@app.post("/word-lists", response_model=schemas.WordListResponse)
def create_word_list(payload: schemas.WordListCreate, db: Session = Depends(get_db)):
    wl = models.WordList(name=payload.name, description=payload.description)
    db.add(wl)
    db.commit()
    db.refresh(wl)
    return wl


@app.put("/word-lists/{list_id}", response_model=schemas.WordListResponse)
def update_word_list(list_id: int, payload: schemas.WordListUpdate, db: Session = Depends(get_db)):
    wl = db.query(models.WordList).filter(models.WordList.id == list_id).first()
    if not wl:
        raise HTTPException(status_code=404, detail="Word list not found")
    if payload.name is not None:
        wl.name = payload.name
    if payload.description is not None:
        wl.description = payload.description
    db.commit()
    db.refresh(wl)
    return wl


@app.delete("/word-lists/{list_id}")
def delete_word_list(list_id: int, db: Session = Depends(get_db)):
    wl = db.query(models.WordList).filter(models.WordList.id == list_id).first()
    if not wl:
        raise HTTPException(status_code=404, detail="Word list not found")
    db.delete(wl)
    db.commit()
    return {"detail": "deleted"}


### Word Endpoints

@app.get("/words", response_model=List[schemas.WordResponse])
def read_words(db: Session = Depends(get_db)):
    words = db.query(models.Word).all()
    return words


@app.get("/words/{word_id}", response_model=schemas.WordResponse)
def read_word(word_id: int, db: Session = Depends(get_db)):
    w = db.query(models.Word).filter(models.Word.id == word_id).first()
    if not w:
        raise HTTPException(status_code=404, detail="Word not found")
    return w


@app.post("/words", response_model=schemas.WordResponse)
def create_word(payload: schemas.WordCreate, db: Session = Depends(get_db)):
    wl = db.query(models.WordList).filter(models.WordList.id == payload.word_list_id).first()
    if not wl:
        raise HTTPException(status_code=400, detail="word_list_id does not exist")
    w = models.Word(term=payload.term, definition=payload.definition, example=payload.example, word_list_id=payload.word_list_id)
    db.add(w)
    db.commit()
    db.refresh(w)
    return w


@app.put("/words/{word_id}", response_model=schemas.WordResponse)
def update_word(word_id: int, payload: schemas.WordUpdate, db: Session = Depends(get_db)):
    w = db.query(models.Word).filter(models.Word.id == word_id).first()
    if not w:
        raise HTTPException(status_code=404, detail="Word not found")
    if payload.term is not None:
        w.term = payload.term
    if payload.definition is not None:
        w.definition = payload.definition
    if payload.example is not None:
        w.example = payload.example
    db.commit()
    db.refresh(w)
    return w


@app.delete("/words/{word_id}")
def delete_word(word_id: int, db: Session = Depends(get_db)):
    w = db.query(models.Word).filter(models.Word.id == word_id).first()
    if not w:
        raise HTTPException(status_code=404, detail="Word not found")
    db.delete(w)
    db.commit()
    return {"detail": "deleted"}
