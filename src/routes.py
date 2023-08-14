from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from jinja2_fragments.fastapi import Jinja2Blocks
from src.config import Config

config = Config()
templates = Jinja2Blocks(directory=config.TEMPLATE_DIR)

router = APIRouter()


@router.get("/")
def index(request: Request):
    return templates.TemplateResponse("main.html", {"request": request})


@router.get("/welcome-close")
def welcome_close(_: Request):
    return HTMLResponse(content="")


@router.get("/welcome-portfolio")
def welcome_portfolio(_: Request):
    return HTMLResponse(
        content='<div class="htmx-added:opacity-0 opacity-100 transition-opacity duration-500">portfolio</div>'
    )
