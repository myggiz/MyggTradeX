from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, auth, websocket
from .database import engine
from .dependencies import get_db
from fastapi.middleware.cors import CORSMiddleware
from .websocket import manager
from fastapi import Request


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Trading Platform Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://iot.selfip.net:3000", "http://localhost:3000"],  # allow your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Routes

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db, user)

# Portfolio Endpoints

@app.get("/portfolio", response_model=List[schemas.Trade])
def read_portfolio(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    return crud.get_trades(db, user_id=current_user.id)

@app.post("/portfolio", response_model=schemas.Trade)
def add_trade(trade: schemas.TradeCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    return crud.create_trade(db, trade, user_id=current_user.id)

@app.put("/portfolio/{trade_id}", response_model=schemas.Trade)
def update_trade(trade_id: int, status_update: schemas.TradeUpdate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    trade = crud.update_trade_status(db, trade_id, status_update.status, user_id=current_user.id)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    return trade

# Quotes Endpoint (placeholder)

@app.get("/quotes/{symbol}")
def get_quote(symbol: str):
    # Replace with real market data integration
    return {
        "symbol": symbol,
        "price": 100.0,
        "rsi": 50.0,
        "ema": 99.5,
        "volume": 1000000,
        "timestamp": "2025-07-01T10:00:00Z"
    }

# WebSocket for live alerts

@app.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Message: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# New endpoint to receive alerts from n8n and broadcast to clients

@app.post("/alerts")
async def receive_alert(request: Request):
    payload = await request.json()

    # If n8n sent a list, handle each entry
    if isinstance(payload, list):
        count = 0
        for item in payload:
            message = item.get("message")
            if not message:
                continue
            await manager.broadcast(message)
            count += 1
        return {"status": f"{count} alerts broadcasted"}

    # Otherwise expect a single object
    if not isinstance(payload, dict):
        raise HTTPException(400, "Invalid payload")
    message = payload.get("message")
    if not message:
        raise HTTPException(400, "Missing 'message' field")
    await manager.broadcast(message)
    return {"status": "alert broadcasted"}

