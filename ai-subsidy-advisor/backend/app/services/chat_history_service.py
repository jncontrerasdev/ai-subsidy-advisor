from app.crud import chat_history as crud
from app.database import SessionLocal
from app.models import Message

def get_chat_history():
    db = SessionLocal()
    try:
        return crud.get_all_messages(db)
    finally:
        db.close()

def save_chat_history(user_message: str, ai_message: str, confidence: float):
    db = SessionLocal()
    try:
        return crud.add_message(db, user_message, ai_message, confidence)
    finally:
        db.close()