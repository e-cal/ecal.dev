(() => {
  const SCENE_INTERVAL = 30_000; // ms
  const FADE_DURATION = 1_200; // ms

  const initializeCanvasScene = () => {
    const canvas = document.getElementById("motion-canvas");
    const motion = canvas?.parentElement;
    const headline = document.querySelector(".hero h1");
    const figureLabel = document.querySelector(".figure-label");
    if (!canvas || !motion || typeof CanvasScenes === "undefined") return;

    let activeCanvas = canvas;
    let engine;
    let transitioning = false;
    let sceneTimer;
    const resetSceneTimer = () => {
      window.clearInterval(sceneTimer);
      sceneTimer = window.setInterval(transitionToNextScene, SCENE_INTERVAL);
    };
    const updateSceneDetails = (targetCanvas, mode, scene) => {
      targetCanvas.setAttribute("aria-label", scene.title);
      targetCanvas.style.touchAction = mode === "topology" ? "none" : "pan-y";
      if (figureLabel) {
        const index = String(CanvasScenes.MODE_NAMES.indexOf(mode) + 1).padStart(2, "0");
        figureLabel.textContent = `Fig. ${index}`;
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
        figureLabel?.classList.add("is-transitioning");
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
        window.requestAnimationFrame(() => figureLabel?.classList.remove("is-transitioning"));
        window.canvasScene = engine;
        transitioning = false;
      }, FADE_DURATION);
    };

    headline?.addEventListener("click", () => {
      resetSceneTimer();
      transitionToNextScene();
    });
    headline?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      resetSceneTimer();
      transitionToNextScene();
    });
    resetSceneTimer();
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
    entry.querySelector(".timeline-action-label").textContent = expanded
      ? "Close"
      : "More";
  };

  const expandHistoryEntry = (entry) => {
    const row = entry.closest(".timeline-row");
    document.querySelectorAll(".timeline-row.is-selected").forEach((selectedRow) => {
      if (selectedRow !== row) setHistoryEntryExpanded(selectedRow, false);
    });
    setHistoryEntryExpanded(row, true);
  };

  const syncRailMetrics = () => {
    const rail = document.querySelector(".rail");
    if (!rail) return;
    document.documentElement.style.setProperty("--rail-width", `${rail.offsetWidth}px`);
    document.documentElement.style.setProperty("--rail-height", `${rail.offsetHeight}px`);
  };

  const initializeSectionNavigation = () => {
    const navLinks = [...document.querySelectorAll("[data-scroll-target]")];
    if (!navLinks.length) return;

    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.scrollTarget === id);
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById(link.dataset.scrollTarget)?.scrollIntoView();
        setActiveLink(link.dataset.scrollTarget);
      });
    });

    const targets = navLinks
      .map((link) => document.getElementById(link.dataset.scrollTarget))
      .filter(Boolean);

    if (targets.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible.length) setActiveLink(visible[0].target.id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      targets.forEach((target) => observer.observe(target));
    }

    setActiveLink(document.body.dataset.activeSection || "top");
  };

  document.addEventListener("DOMContentLoaded", () => {
    syncRailMetrics();
    initializeCanvasScene();
    initializeSectionNavigation();
    scrollToActiveSection();
  });

  window.addEventListener("resize", syncRailMetrics);
  document.fonts?.ready.then(syncRailMetrics);

  document.addEventListener("click", (event) => {
    const historyEntry = event.target.closest("[data-history-entry]");
    if (historyEntry) {
      event.preventDefault();
      const row = historyEntry.closest(".timeline-row");
      if (row.classList.contains("is-selected")) {
        setHistoryEntryExpanded(row, false);
      } else {
        expandHistoryEntry(historyEntry);
      }
      return;
    }

  });
})();
