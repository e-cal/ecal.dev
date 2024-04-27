from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from jinja2_fragments.fastapi import Jinja2Blocks
from mistune import html
from src.config import Config

config = Config()
jinja_blocks = Jinja2Blocks(directory=config.HTML_DIR)

router = APIRouter()


@router.get("/")
def index(request: Request):
    return jinja_blocks.TemplateResponse("index.html", {"request": request, "content": get_page("home")})


@router.get("/welcome-close")
def welcome_close(_: Request):
    return HTMLResponse(content="")


def get_page(page: str):
    with open(config.STATIC_DIR / "pages" / f"{page}.md", "r") as f:
        md = f.read()
    return html(md)


@router.get("/home")
def home(request: Request):
    return get_page("home")

@router.get("/home-reset")
def home_reset(request: Request):
    return f"""<script>
    localStorage.removeItem("visited");
    location.reload(true);
</script>
{get_page("home")}
"""


@router.get("/about")
def about(request: Request):
    return get_page("about")


@router.get("/thoughts")
def thoughts(request: Request):
    return get_page("thoughts")


@router.get("/contact")
def contact(request: Request):
    return get_page("contact")


@router.get("/projects")
def projects(request: Request):
    return get_page("projects")


@router.get("/projects/{project}")
def bci(request: Request, project: str):
    return get_page(f"projects/{project}")
