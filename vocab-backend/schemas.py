from pydantic import BaseModel
from typing import List, Optional

class WordBase(BaseModel):
    term: str
    definition: Optional[str] = None
    example: Optional[str] = None

class WordCreate(WordBase):
    word_list_id: int

class WordUpdate(BaseModel):
    term: Optional[str] = None
    definition: Optional[str] = None
    example: Optional[str] = None

class WordResponse(WordBase):
    id: int
    word_list_id: int

    class Config:
        orm_mode = True

class WordListBase(BaseModel):
    name: str
    description: Optional[str] = None

class WordListCreate(WordListBase):
    pass

class WordListUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class WordListResponse(WordListBase):
    id: int
    words: List[WordResponse] = []

    class Config:
        orm_mode = True
