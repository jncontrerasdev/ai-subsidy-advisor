from sqlalchemy.orm import Session
from app.models import Message

def get_all_messages(db: Session):
    return db.query(Message).all()

def add_message(db: Session, user_message: str, ai_message: str, confidence: float):
    db_message = Message(user_message=user_message, ai_message=ai_message, confidence=confidence)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message