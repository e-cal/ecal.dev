from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml
from mistune import create_markdown


class ContentError(ValueError):
    """Raised when an authored Markdown document is malformed."""


@dataclass(frozen=True)
class MarkdownDocument:
    slug: str
    metadata: dict[str, Any]
    html: str


class ContentStore:
    def __init__(self, directory: Path):
        self.directory = directory
        self.markdown = create_markdown(escape=False, plugins=["url"])

    def load(self, relative_path: str) -> MarkdownDocument:
        path = (self.directory / relative_path).resolve()
        if not path.is_relative_to(self.directory.resolve()) or path.suffix != ".md":
            raise ContentError(f"Invalid content path: {relative_path}")
        if not path.is_file():
            raise ContentError(f"Missing content file: {relative_path}")

        source = path.read_text(encoding="utf-8")
        metadata, body = self._split_frontmatter(source, path)
        return MarkdownDocument(
            slug=path.stem,
            metadata=metadata,
            html=str(self.markdown(body.strip())),
        )

    def load_portfolio(
        self,
        selected_project: str | None = None,
        selected_history: str | None = None,
    ) -> dict[str, Any]:
        home = self.load("home.md")
        about = self.load("about.md")
        history_index = self.load("history.md")
        project_index = self.load("projects.md")

        history = [
            self.load(f"history/{slug}.md")
            for slug in history_index.metadata["entries"]
        ]
        projects = [
            self.load(f"projects/{slug}.md")
            for slug in project_index.metadata["projects"]
        ]
        history_by_slug = {entry.slug: entry for entry in history}
        project_by_slug = {project.slug: project for project in projects}
        if selected_history is not None and selected_history not in history_by_slug:
            raise ContentError(f"Unknown history entry: {selected_history}")
        if selected_project is not None and selected_project not in project_by_slug:
            raise ContentError(f"Unknown project: {selected_project}")

        return {
            "home": home,
            "about": about,
            "history_index": history_index,
            "history": history,
            "selected_history": history_by_slug.get(selected_history),
            "projects": projects,
            "project_index": project_index,
            "selected_project": project_by_slug.get(selected_project),
        }

    @staticmethod
    def _split_frontmatter(source: str, path: Path) -> tuple[dict[str, Any], str]:
        if not source.startswith("---\n"):
            raise ContentError(f"Missing YAML frontmatter in {path}")
        try:
            frontmatter, body = source[4:].split("\n---\n", 1)
        except ValueError as error:
            raise ContentError(f"Unclosed YAML frontmatter in {path}") from error

        metadata = yaml.safe_load(frontmatter)
        if not isinstance(metadata, dict):
            raise ContentError(f"Frontmatter must be a mapping in {path}")
        return metadata, body
