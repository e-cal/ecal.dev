from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.config import Config
from src.routes import router

config = Config()


def get_app() -> FastAPI:
    app = FastAPI(**config.fastapi_kwargs)
    app.mount("/static", StaticFiles(directory=config.STATIC_DIR), name="static")
    app.include_router(router)
    return app


app = get_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
