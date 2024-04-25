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
    has_visited = request.cookies.get("hasVisited")
    if not has_visited:
        response = jinja_blocks.TemplateResponse(
            "index.html",
            {
                "request": request,
                "content": get_page("home"),
                "hasVisited": "false",
            },
        )
        response.set_cookie(key="hasVisited", value="true")
    else:
        response = jinja_blocks.TemplateResponse(
            "index.html",
            {
                "request": request,
                "content": get_page("home"),
                "hasVisited": "true",
            },
        )
    return response


@router.get("/welcome-close")
def welcome_close(_: Request):
    return HTMLResponse(content="")


def get_page(page: str):
    with open(config.STATIC_DIR / "pages" / f"{page}.md", "r") as f:
        md = f.read()
    return html(md)

def bordered_page(page: str):
    return f"""
<div style="
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 0 1em 0.5em 1em;
">
    {get_page(page)}
</div>"""


@router.get("/home")
def home(request: Request):
    content = get_page("home")
    response = HTMLResponse(content=content)
    response.delete_cookie(key="hasVisited")
    return response


@router.get("/about")
def about(request: Request):
    return bordered_page("about")


@router.get("/thoughts")
def thoughts(request: Request):
    return bordered_page("thoughts")


@router.get("/contact")
def contact(request: Request):
    return bordered_page("contact")


@router.get("/projects")
def projects(request: Request):
    # return get_page("projects")
    return jinja_blocks.TemplateResponse("projects.html", {"request": request})


@router.get("/projects/bci")
def bci(request: Request):
    return get_page("projects/bci")


@router.get("/projects/macq")
def macq(request: Request):
    return get_page("projects/macq")


@router.get("/projects/nnfs")
def nnfs(request: Request):
    return get_page("projects/nnfs")


@router.get("/projects/praxis")
def praxis(request: Request):
    return get_page("projects/praxis")
