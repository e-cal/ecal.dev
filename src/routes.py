import os
from datetime import datetime
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from jinja2_fragments.fastapi import Jinja2Blocks
from mistune import html, create_markdown
from src.config import Config

config = Config()
jinja_blocks = Jinja2Blocks(directory=config.HTML_DIR)

router = APIRouter()


@router.get("/")
def index(request: Request):
    return jinja_blocks.TemplateResponse(
        "index.html",
        {
            "request": request,
            # start page content
            "content": get_page("about"),
        }
    )


@router.get("/welcome-close")
def welcome_close(_: Request):
    return HTMLResponse(content="")


def get_page(page: str) -> str:
    with open(config.STATIC_DIR / "pages" / f"{page}.md", "r") as f:
        md = f.read()
    return html(md)  # type: ignore


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


@router.get("/contact")
def contact(request: Request):
    return get_page("contact")


@router.get("/projects")
def projects(request: Request):
    return get_page("projects")


@router.get("/projects/{project}")
def bci(request: Request, project: str):
    return get_page(f"projects/{project}")


@router.get("/thoughts")
def thoughts(request: Request):
    posts = []
    for post in os.listdir(config.STATIC_DIR / "posts"):
        with open(config.STATIC_DIR / "posts" / post, "r") as f:
            md = f.read()
        for line in md.split("\n"):
            if line.startswith("#"):
                # (title, date, path)
                posts.append(
                    (line.replace("#", "").strip(), os.path.getctime(config.STATIC_DIR / "posts" / post), post)
                )
            break
    posts = [
        # f'{datetime.fromtimestamp(post[1]).strftime("%d %b, %Y")} <a hx-get="thoughts/{post[2]}" hx-target="#post" hx-swap="innerHTML">{post[0]}</a>'
        f'<li><a hx-get="thoughts/{post[2]}" hx-target="#post" hx-swap="innerHTML">{post[0]}</a></li>'
        for post in sorted(posts, key=lambda x: x[1], reverse=True)  # sort by date
    ]

    posts = html("\n" + "\n".join(posts))
    return jinja_blocks.TemplateResponse("thoughts.html", {"request": request, "posts": posts})


@router.get("/thoughts/{post}")
def thought(request: Request, post: str):
    with open(config.STATIC_DIR / "posts" / post, "r") as f:
        md = f.read()
    print(md)
    return html("---\n" + md)


# 404 page any unknown route
@router.get("/{path:path}")
def catch_all(path: str):
    return "404"
