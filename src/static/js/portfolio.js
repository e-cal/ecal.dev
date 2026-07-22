(() => {
  const SCENE_INTERVAL = 30_000; // ms
  const FADE_DURATION = 1_200; // ms

  const initializeCanvasScene = () => {
    const canvas = document.getElementById("motion-canvas");
    const motion = canvas?.parentElement;
    const headline = document.querySelector(".hero h1");
    if (!canvas || !motion || typeof CanvasScenes === "undefined") return;

    let activeCanvas = canvas;
    let engine;
    let transitioning = false;
    const updateSceneDetails = (targetCanvas, mode, scene) => {
      targetCanvas.setAttribute("aria-label", scene.title);
      targetCanvas.style.touchAction = mode === "topology" ? "none" : "pan-y";
      const label = document.querySelector(".figure-label");
      if (label) {
        const index = String(CanvasScenes.MODE_NAMES.indexOf(mode) + 1).padStart(2, "0");
        label.textContent = `Fig. ${index}`;
      }
    };
    engine = CanvasScenes.create(activeCanvas, {
      initialMode: "topology",
      onModeChange: (mode, scene) => updateSceneDetails(activeCanvas, mode, scene),
    });

    const transitionToNextScene = () => {
      if (transitioning) return;
      const currentIndex = CanvasScenes.MODE_NAMES.indexOf(engine.getMode());
      const nextIndex = (currentIndex + 1) % CanvasScenes.MODE_NAMES.length;
      const nextMode = CanvasScenes.MODE_NAMES[nextIndex];
      const incomingCanvas = document.createElement("canvas");
      incomingCanvas.className = "scene-incoming";
      incomingCanvas.setAttribute("aria-hidden", "true");
      motion.append(incomingCanvas);
      const incomingEngine = CanvasScenes.create(incomingCanvas, {
        initialMode: nextMode,
      });

      transitioning = true;
      window.requestAnimationFrame(() => {
        activeCanvas.classList.add("is-transitioning-out");
        incomingCanvas.classList.add("is-transitioning-in");
      });
      window.setTimeout(() => {
        engine.destroy();
        activeCanvas.remove();
        activeCanvas = incomingCanvas;
        activeCanvas.id = "motion-canvas";
        activeCanvas.classList.remove("scene-incoming", "is-transitioning-in");
        activeCanvas.removeAttribute("aria-hidden");
        engine = incomingEngine;
        updateSceneDetails(activeCanvas, nextMode, CanvasScenes.SCENES[nextMode]);
        window.canvasScene = engine;
        transitioning = false;
      }, FADE_DURATION);
    };

    headline?.addEventListener("click", transitionToNextScene);
    headline?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      transitionToNextScene();
    });
    window.setInterval(transitionToNextScene, SCENE_INTERVAL);
    window.canvasScene = engine;
  };

  const scrollToActiveSection = () => {
    const section = document.body.dataset.activeSection;
    if (!section) return;
    requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView());
  };

  const setHistoryEntryExpanded = (row, expanded) => {
    const entry = row.querySelector("[data-history-entry]");
    const detail = row.querySelector(".timeline-detail");
    row.classList.toggle("is-selected", expanded);
    entry.setAttribute("aria-expanded", String(expanded));
    detail.setAttribute("aria-hidden", String(!expanded));
    detail.inert = !expanded;
  };

  const expandHistoryEntry = (entry) => {
    const row = entry.closest(".timeline-row");
    document.querySelectorAll(".timeline-row.is-selected").forEach((selectedRow) => {
      if (selectedRow !== row) setHistoryEntryExpanded(selectedRow, false);
    });
    setHistoryEntryExpanded(row, true);
  };

  const syncHistoryEntryWithLocation = () => {
    const entry = [...document.querySelectorAll("[data-history-entry]")].find(
      (candidate) => new URL(candidate.href).pathname === window.location.pathname
    );
    if (entry) {
      expandHistoryEntry(entry);
      return;
    }
    document
      .querySelectorAll(".timeline-row.is-selected")
      .forEach((row) => setHistoryEntryExpanded(row, false));
  };

  document.addEventListener("DOMContentLoaded", () => {
    initializeCanvasScene();
    scrollToActiveSection();
  });

  window.addEventListener("popstate", syncHistoryEntryWithLocation);

  document.addEventListener("click", (event) => {
    const closeProjectButton = event.target.closest("[data-close-project]");
    if (closeProjectButton) {
      document.getElementById("project-detail")?.replaceChildren();
      if (window.location.pathname.startsWith("/projects/")) {
        window.history.pushState({}, "", "/projects");
      }
      return;
    }

    const historyEntry = event.target.closest("[data-history-entry]");
    if (historyEntry) {
      event.preventDefault();
      const row = historyEntry.closest(".timeline-row");
      const isExpanded = row.classList.contains("is-selected");
      setHistoryEntryExpanded(row, !isExpanded);
      if (!isExpanded) {
        expandHistoryEntry(historyEntry);
        window.history.pushState({}, "", historyEntry.href);
      } else {
        window.history.pushState({}, "", "/history");
      }
      return;
    }

  });
})();
