from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_trades(db: Session, user_id: int):
    return db.query(models.Trade).filter(models.Trade.user_id == user_id).all()

def create_trade(db: Session, trade: schemas.TradeCreate, user_id: int):
    db_trade = models.Trade(symbol=trade.symbol, price=trade.price, status="OPEN", user_id=user_id)
    db.add(db_trade)
    db.commit()
    db.refresh(db_trade)
    return db_trade

def update_trade_status(db: Session, trade_id: int, status: str, user_id: int):
    db_trade = db.query(models.Trade).filter(models.Trade.id == trade_id, models.Trade.user_id == user_id).first()
    if not db_trade:
        return None
    db_trade.status = status
    db.commit()
    db.refresh(db_trade)
    return db_trade
