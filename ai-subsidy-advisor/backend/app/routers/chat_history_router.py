from fastapi import APIRouter
from app.services.chat_history_service import get_chat_history, save_chat_history
from app.models import Message

router = APIRouter()

@router.get("/get-chat-history")
async def fetch_chat_history():
    messages = get_chat_history()
    return {"messages": [message.to_dict() for message in messages]}

@router.post("/save-chat-history")
async def save_chat_history_route(user_message: str, ai_message: str, confidence: float):
    saved_message = save_chat_history(user_message, ai_message, confidence)
    return {"message": saved_message.to_dict()}