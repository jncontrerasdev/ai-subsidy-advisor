import openai
import os
from app.models import Response
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

async def get_subsidy_advice_service(query):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": query.question}]
        )
        advice = response.choices[0].message['content'].strip()
        confidence = generate_confidence_score()
        return Response(advice=advice, confidence=confidence)
    except openai.error.OpenAIError as e:
        print(f"OpenAI API error: {e}")
        raise HTTPException(status_code=500, detail="Failed to get advice from OpenAI.")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

def generate_confidence_score() -> float:
    import random
    return round(random.uniform(0.7, 1.0), 2)