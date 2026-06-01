from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set. Copy .env.example to .env and set DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db_and_seed():
    # Create tables
    from models import WordList, Word
    Base.metadata.create_all(bind=engine)

    # Seed sample data if empty
    db = SessionLocal()
    try:
        existing = db.query(WordList).first()
        if existing:
            return

        list1 = WordList(name="Common Verbs", description="Basic action verbs")
        list1.words = [
            Word(term="run", definition="move at a speed faster than a walk"),
            Word(term="eat", definition="put (food) into the mouth and chew and swallow it"),
        ]

        list2 = WordList(name="Adjectives", description="Describing words")
        list2.words = [
            Word(term="beautiful", definition="pleasing the senses or mind aesthetically"),
            Word(term="quick", definition="moving fast or doing something in a short time"),
        ]

        db.add_all([list1, list2])
        db.commit()
    finally:
        db.close()
