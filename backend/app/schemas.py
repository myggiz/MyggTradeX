from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class TradeBase(BaseModel):
    symbol: str
    price: float

class TradeCreate(TradeBase):
    pass

class TradeUpdate(BaseModel):
    status: str

class Trade(TradeBase):
    id: int
    status: str
    timestamp: datetime
    user_id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
