import unittest

from fastapi.testclient import TestClient

from src.main import app


class PortfolioRoutesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_homepage_renders_markdown_portfolio(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertIn("Research,", response.text)
        self.assertIn("I believe great design is invisible.", response.text)
        self.assertEqual(response.text.count('class="project"'), 9)
        self.assertIn("Entropy-Gated Branching", response.text)
        self.assertNotIn("Dotfiles", response.text)
        self.assertNotIn("terminal.ecal.dev", response.text)
        self.assertIn('id="motion-canvas"', response.text)

    def test_htmx_section_request_returns_only_the_fragment(self):
        response = self.client.get("/history", headers={"HX-Request": "true"})

        self.assertEqual(response.status_code, 200)
        self.assertNotIn("<!doctype html>", response.text)
        self.assertIn('<section class="section" id="history">', response.text)
        self.assertEqual(response.text.count('class="timeline-row"'), 4)

    def test_project_cards_render_full_content(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertIn("foundational APIs for PDDL", response.text)
        self.assertIn("selectively expands reasoning sequences", response.text)
        self.assertNotIn("Details +", response.text)
        self.assertEqual(self.client.get("/projects/macq").status_code, 404)

    def test_history_detail_supports_htmx_and_direct_navigation(self):
        fragment = self.client.get("/history/redbit", headers={"HX-Request": "true"})
        page = self.client.get("/history/redbit")

        self.assertIn('<section class="section" id="history">', fragment.text)
        self.assertIn('class="timeline-row is-selected"', fragment.text)
        self.assertIn("AI and machine-learning systems", fragment.text)
        self.assertNotIn("<!doctype html>", fragment.text)
        self.assertEqual(page.status_code, 200)
        self.assertIn("<!doctype html>", page.text)
        self.assertIn('data-active-section="history"', page.text)

    def test_unknown_history_entry_returns_not_found(self):
        response = self.client.get("/history/not-a-history-entry")

        self.assertEqual(response.status_code, 404)

    def test_unknown_project_returns_not_found(self):
        response = self.client.get("/projects/not-a-project")

        self.assertEqual(response.status_code, 404)


if __name__ == "__main__":
    unittest.main()
