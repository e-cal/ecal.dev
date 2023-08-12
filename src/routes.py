from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from src.config import Config

config = Config()
templates = Jinja2Templates(directory=config.TEMPLATE_DIR)

router = APIRouter()


@router.get("/")
def index(request: Request):
    # return templates.TemplateResponse("shared/_base.html", {"request": request})
    return templates.TemplateResponse("main.html", {"request": request})
