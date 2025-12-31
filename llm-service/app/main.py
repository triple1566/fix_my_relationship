from fastapi import FastAPI
from .router import router as process_router
#dev server startup: uvicorn main:app --host localhost --port 8000 --reload

app = FastAPI()

app.include_router(process_router)

# @app.get("router's address goes here") decorator function
# is equivalent to Golang's http.ServeMux.HandleFunc
# where root() is the equivalent to 
# body of the actual handler function
@app.get("/")
async def root():
    return {"message": "Hello world"}