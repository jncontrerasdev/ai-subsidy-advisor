from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.get_subsidy_advice_service import get_subsidy_advice_service
from app.models import Query, Response, ChatMessage, ChatHistory
from typing import List
from app.routers import chat_history_router

app = FastAPI()

# Middleware
app.include_router(chat_history_router.router, prefix="/chat-history")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chat history in-memory storage
chat_history = []

# Routes
@app.post("/get-subsidy-advice", response_model=Response)
async def get_subsidy_advice(query: Query):
    user_message = ChatMessage(text=query.question, sender='user')
    
    # Add user's message to history
    chat_history.append(user_message)

    try:
        response = await get_subsidy_advice_service(query)
        ai_message = ChatMessage(text=response.advice, sender='ai', confidence=response.confidence)
        
        # Add AI's message to history
        chat_history.append(ai_message)

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")

@app.get("/chat-history", response_model=ChatHistory)
async def get_chat_history():
    return ChatHistory(history=chat_history)