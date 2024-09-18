from pydantic import BaseModel, Field
from typing import List, Optional
from sqlalchemy import Column, Integer, String, Text, Float
from app.database import Base

class Query(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        description="The question must be a non-empty string",
        example="What are the renewable energy subsidies in the Netherlands?"
    )

class Response(BaseModel):
    advice: str
    confidence: float

class ChatMessage(BaseModel):
    text: str
    sender: str
    confidence: Optional[float] = None

class ChatHistory(BaseModel):
    history: List[ChatMessage]

class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, index=True)
    sender = Column(String(50))
    confidence = Column(Float, nullable=True)