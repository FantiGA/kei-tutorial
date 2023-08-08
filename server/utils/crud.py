"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-08-07 23:02:23
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/crud.py
"""

import time
from sqlalchemy.orm import Session

from . import models, schemas


def get_games(db: Session):
    return db.query(models.Game).all()


def get_game(db: Session, game_id: int):
    return db.query(models.Game).filter(models.Game.game_id == game_id).first()


# def create_record(db: Session, record: schemas.RecordCreate):
#     db_record = models.Record(
#         username=record.username,
#         level=record.level,
#         create_time=time.strftime(r"%Y-%m-%d %H:%M:%S", time.localtime()),
#     )
#     db.add(db_record)
#     db.commit()
#     db.refresh(db_record)
#     return db_record


# def create_step(db: Session, step: schemas.StepCreate, record_id: int):
#     db_step = models.Step(**step.model_dump(), record_id=record_id)
#     db.add(db_step)
#     db.commit()
#     db.refresh(db_step)
#     return db_step
