from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv
import re
import random

app = FastAPI()

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

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

def is_safe_query(query: str) -> bool:
    harmful_patterns = [r'\b(exec|eval|system|subprocess)\b', r'^\s*import\s+', r'\b(os|subprocess|socket)\b']
    return not any(re.search(pattern, query, re.IGNORECASE) for pattern in harmful_patterns)

def generate_confidence_score() -> float:
    return round(random.uniform(0.7, 1.0), 2)  # Simulated confidence score between 70% to 100%

@app.post("/get-subsidy-advice", response_model=Response)
async def get_subsidy_advice(query: Query):
    if not is_safe_query(query.question):
        raise HTTPException(status_code=400, detail="Query contains unsafe content.")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": query.question}]
        )

        return {"advice": response.choices[0].message['content'].strip(), "confidence": generate_confidence_score()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))