from pathlib import Path
from typing import Any

from fastapi.responses import HTMLResponse
from typing import Any

APP_DIR = Path(__file__).resolve().parent


class Config():

    APP_DIR: Path = APP_DIR

    STATIC_DIR: Path = APP_DIR / 'static'
    HTML_DIR: Path = APP_DIR / 'html'

    FASTAPI_PROPERTIES: dict[str, Any] = {
        "title": "ecal.dev",
        "description": "Ethan Callanan's Portfolio",
        "version": "0.0.1",
        "default_response_class": HTMLResponse,
    }

    DISABLE_DOCS: bool = True

    @property
    def fastapi_kwargs(self) -> dict[str, Any]:
        """Creates dictionary of values to pass to FastAPI app
        as **kwargs.

        Returns:
            dict: This can be unpacked as **kwargs to pass to FastAPI app.
        """
        fastapi_kwargs = self.FASTAPI_PROPERTIES
        if self.DISABLE_DOCS:
            fastapi_kwargs.update(
                {
                    "openapi_url": None,
                    "openapi_prefix": None,
                    "docs_url": None,
                    "redoc_url": None,
                }
            )
        return fastapi_kwargs
