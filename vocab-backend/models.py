from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class WordList(Base):
    __tablename__ = "word_lists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    words = relationship("Word", back_populates="word_list", cascade="all, delete-orphan")

class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    term = Column(String(255), nullable=False)
    definition = Column(Text, nullable=True)
    example = Column(Text, nullable=True)

    word_list_id = Column(Integer, ForeignKey("word_lists.id"), nullable=False)
    word_list = relationship("WordList", back_populates="words")
