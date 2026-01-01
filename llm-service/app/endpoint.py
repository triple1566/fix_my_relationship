import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# TODO: implement the endpoint and connect it to Go api gateway
router = APIRouter()

class TranslateRequest(BaseModel):
    input_text: str
    mode: int = 0  # Default mode is 0

class TranslateResponse(BaseModel):
    output_text: str

def run_translation_chain(input_text: str, mode: int) -> str:
    # Dummy translation
    return f"(mode={mode}) {input_text}"

@router.post("/", response_model=TranslateResponse)
async def translate(request: TranslateRequest):
    try:
        translated_text = run_translation_chain(request.input_text, request.mode)
        return TranslateResponse(output_text=translated_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))