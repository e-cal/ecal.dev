from fastapi import APIRouter, Request, Response
from fastapi.responses import HTMLResponse
from jinja2_fragments.fastapi import Jinja2Blocks
from src.config import Config
from mistune import html

config = Config()
templates = Jinja2Blocks(directory=config.TEMPLATE_DIR)

router = APIRouter()


# @router.get("/")
# def index(request: Request):
#     return templates.TemplateResponse("index.html", {"request": request})
@router.get("/")
def index(request: Request):
    has_visited = request.cookies.get("hasVisited")
    if not has_visited:
        response = templates.TemplateResponse(
            "index.html", {"request": request, "hasVisited": "false"}
        )
        response.set_cookie(key="hasVisited", value="true")
        return response
    else:
        return templates.TemplateResponse(
            "index.html", {"request": request, "hasVisited": "true"}
        )

@router.get("/welcome-close")
def welcome_close(_: Request):
    return HTMLResponse(content="")


def get_page(page: str):
    with open(config.STATIC_DIR / "pages" / f"{page}.md", "r") as f:
        md = f.read()
    return html(md)


@router.get("/home")
def home(request: Request):
    content = get_page("home")
    response = Response(content=content, media_type="text/html")
    response.delete_cookie(key="hasVisited")
    return response


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
    # return get_page("projects")
    return templates.TemplateResponse("projects.html", {"request": request})


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
