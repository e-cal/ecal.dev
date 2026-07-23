from fastapi import APIRouter, HTTPException, Request
from jinja2_fragments.fastapi import Jinja2Blocks

from src.config import Config
from src.content import ContentError, ContentStore

config = Config()
templates = Jinja2Blocks(directory=config.HTML_DIR)
content = ContentStore(config.CONTENT_DIR)
router = APIRouter()


def portfolio_context(
    request: Request,
    active_section: str = "",
    selected_history: str | None = None,
):
    try:
        context = content.load_portfolio(selected_history=selected_history)
    except ContentError as error:
        if selected_history is not None and str(error).startswith(
            "Unknown history entry:"
        ):
            raise HTTPException(
                status_code=404, detail="History entry not found"
            ) from error
        raise
    context.update({"request": request, "active_section": active_section})
    return context


def is_htmx(request: Request) -> bool:
    return request.headers.get("HX-Request") == "true"


@router.get("/", name="index")
def index(request: Request):
    return templates.TemplateResponse("index.html", portfolio_context(request))


@router.get("/about", name="about")
def about(request: Request):
    context = portfolio_context(request, active_section="about")
    template = "sections/about.html" if is_htmx(request) else "index.html"
    return templates.TemplateResponse(template, context)


@router.get("/history", name="history")
def history(request: Request):
    context = portfolio_context(request, active_section="history")
    template = "sections/history.html" if is_htmx(request) else "index.html"
    return templates.TemplateResponse(template, context)


@router.get("/history/{history_entry}", name="history_detail")
def history_detail(request: Request, history_entry: str):
    context = portfolio_context(
        request,
        active_section="history",
        selected_history=history_entry,
    )
    template = "sections/history.html" if is_htmx(request) else "index.html"
    return templates.TemplateResponse(template, context)


@router.get("/projects", name="projects")
def projects(request: Request):
    context = portfolio_context(request, active_section="projects")
    template = "sections/projects.html" if is_htmx(request) else "index.html"
    return templates.TemplateResponse(template, context)


