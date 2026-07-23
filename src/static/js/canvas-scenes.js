(() => {
  // Tweak animation behavior here. Time values and units are noted inline.
  const CONFIG = Object.freeze({
    colors: Object.freeze({
      ink: Object.freeze([23, 24, 21]), // Primary line/node color (RGB, 0–255).
      accent: Object.freeze([150, 92, 37]), // Highlight ring/trace color (RGB, 0–255).
    }),
    canvas: Object.freeze({
      maxPixelRatio: 2, // Rendering-resolution cap (device-pixel ratio).
      mobileBreakpoint: 650, // Switch to mobile geometry below this width (CSS px).
      verticalCenter: 0.54, // Hero center as a fraction of canvas height.
    }),
    topology: Object.freeze({
      shellNodeCount: 96, // Nodes placed near the sphere surface.
      innerNodeCount: 46, // Nodes distributed through the sphere interior.
      surfaceNeighbors: 2, // Nearby surface nodes connected to each shell node.
      innerNeighbors: 3, // Nearby interior nodes connected to each inner node.
      neighborPoolSize: 8, // Closest candidates sampled randomly for each connection.
      shellToInnerChance: 0.38, // Chance that a shell node connects into the interior (0–1).
      shellAngleJitter: 0.24, // Maximum random angular offset on the shell (radians).
      shellVerticalJitter: 0.8, // Vertical jitter within each even-distribution cell (cell fraction).
      shellRadiusJitter: 0.075, // Maximum inward shell displacement (sphere radius fraction).
      innerRadiusMin: 0.14, // Minimum inner-node distance from center (sphere radius fraction).
      innerRadiusMax: 0.84, // Maximum inner-node distance from center (sphere radius fraction).
      edgeBaseOpacity: 0.035, // Minimum edge alpha (0–1).
      edgeDepthOpacity: 0.11, // Additional front-to-back edge alpha range (0–1).
      edgeWidth: 0.6, // Connection-line width (CSS px).
      mobileViewportBreakpoint: 900, // Match the page's mobile layout breakpoint (viewport CSS px).
      mobileRadius: 0.36, // Sphere radius on mobile (shortest canvas-side fraction).
      desktopRadius: 0.40, // Sphere radius on desktop (shortest canvas-side fraction).
      mobileCenterX: 0.5, // Horizontal center on mobile (canvas-width fraction).
      desktopCenterX: 0.49, // Horizontal center on desktop (canvas-width fraction).
      mobileCenterY: 0.55, // Sphere center on mobile (canvas-height fraction).
      desktopCenterY: 0.54, // Sphere center on desktop (canvas-height fraction).
      rotationSpeed: 0.000025, // Natural rotation rate around the current spin axis (radians per millisecond).
      pitch: -0.12, // Base vertical tilt (radians).
      pitchDrift: 0.055, // Maximum animated tilt offset (radians).
      pitchDriftSpeed: 0.00013, // Tilt oscillation rate (radians per millisecond).
      hoverRadius: 18, // Maximum cursor distance that selects a node (CSS px).
      selectionFadeIn: 90, // Time for a hovered node to reach full emphasis (milliseconds).
      selectionFadeOut: 320, // Time for a departed node to lose emphasis (milliseconds).
      selectedNodeScale: 2.35, // Selected-node radius multiplier.
      selectedEdgeWidth: 0.7, // Width added to a selected node's connections (CSS px).
      selectedEdgeOpacity: 0.16, // Alpha added to a selected node's connections (0–1).
      connectionDecay: 0.48, // Connection emphasis retained at each additional graph step (0–1).
      dragSensitivity: 0.003, // Sphere rotation per dragged pixel (radians).
      dragRadiusScale: 1, // Draggable radius relative to the rendered sphere radius.
      maxFlickSpeed: 0.0045, // Maximum released angular velocity (radians per millisecond).
      inertiaTime: 950, // Time for a flick to settle back to the natural spin (milliseconds).
    }),
    flow: Object.freeze({
      particleCount: 240, // Maximum concurrent trace heads after the spawn ramp.
      minSpawnBatchSize: 4, // Minimum traces introduced in one batch.
      maxSpawnBatchSize: 12, // Maximum traces introduced in one batch.
      minSpawnInterval: 18, // Shortest delay between spawn batches (animation frames).
      maxSpawnInterval: 54, // Longest delay between spawn batches (animation frames).
      maxTrailPoints: 420, // Maximum stored points per trace.
      minStartDelay: 336, // Earliest tail-erasure start (animation frames).
      maxStartDelay: 1344, // Latest tail-erasure start (animation frames).
      minEraseSpeed: 1.35, // Minimum tail-erasure rate (points per frame).
      maxEraseSpeed: 2.15, // Maximum tail-erasure rate (points per frame).
      minTraceSpeed: 0.42, // Minimum trace-head speed (CSS px per frame).
      maxTraceSpeed: 1.2, // Maximum trace-head speed (CSS px per frame).
      horizontalSpeed: 1.7, // Horizontal velocity multiplier.
      verticalSpeed: 1.35, // Vertical velocity multiplier.
      spawnXPower: 4, // Bias rightward traces toward the left entry side.
      reverseChance: 0, // Chance that a trace enters from the right (0–1).
      accentInterval: 19, // Use the accent color on every Nth trace.
      opacity: 0.3, // Standard trace alpha (0–1).
      accentOpacity: 0.58, // Accent trace alpha (0–1).
      lineWidth: 0.9, // Standard trace width (CSS px).
      accentLineWidth: 1.2, // Accent trace width (CSS px).
      trailBands: 8, // Opacity-gradient sections along each trace.
    }),
    contours: Object.freeze({
      mobileLines: 27, // Contour-line count on mobile.
      desktopLines: 36, // Contour-line count on desktop.
      segments: 150, // Horizontal samples used to build each contour.
      top: 0.035, // Top margin (canvas-height fraction).
      verticalSpan: 0.93, // Height occupied by the contour field (canvas-height fraction).
      broadAmplitude: 14, // Long-wave displacement (CSS px).
      midAmplitude: 4.5, // Mid-frequency displacement (CSS px).
      fineAmplitude: 2, // Fine texture displacement (CSS px).
      basinAmplitude: 14, // Local basin displacement (CSS px).
      accentInterval: 8, // Use the accent color on every Nth contour.
      cursorPhaseStrength: 2.15, // Maximum cursor-directed phase rotation (radians).
      cursorResponseTime: 420, // Time for wave direction to follow the cursor (milliseconds).
      cursorFadeTime: 520, // Time for cursor influence to fade after leaving (milliseconds).
    }),
  });

  const SCENES = Object.freeze({
    topology: Object.freeze({ title: "Memory topology" }),
    flow: Object.freeze({ title: "Parallel flow field" }),
    contours: Object.freeze({ title: "Latent contours" }),
  });
  const MODE_NAMES = Object.freeze(Object.keys(SCENES));
  const TAU = Math.PI * 2;
  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

  const rgba = (color, alpha) => `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
  const randomMode = () => MODE_NAMES[Math.floor(Math.random() * MODE_NAMES.length)];

  const create = (canvas, options = {}) => {
    if (!(canvas instanceof HTMLCanvasElement)) throw new TypeError("CanvasScenes.create requires a canvas");

    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onModeChange = typeof options.onModeChange === "function" ? options.onModeChange : () => {};
    const ink = CONFIG.colors.ink;
    const accent = CONFIG.colors.accent;
    let mode = SCENES[options.initialMode] ? options.initialMode : "topology";
    let width = 0;
    let height = 0;
    let visible = true;
    let frame = 0;

    const topology = CONFIG.topology;
    const topologyNodeCount = topology.shellNodeCount + topology.innerNodeCount;
    const topologyPoints = new Float32Array(topologyNodeCount * 3);
    const projected = new Float32Array(topologyNodeCount * 3);
    const shellVerticalStep = 2 / topology.shellNodeCount;

    for (let index = 0; index < topology.shellNodeCount; index += 1) {
      const baseY = 1 - ((index + 0.5) / topology.shellNodeCount) * 2;
      const y = Math.max(-0.995, Math.min(0.995, baseY + (Math.random() - 0.5) * shellVerticalStep * topology.shellVerticalJitter));
      const ringRadius = Math.sqrt(1 - y * y);
      const angle = GOLDEN_ANGLE * index + (Math.random() - 0.5) * topology.shellAngleJitter;
      const pointRadius = 1 - Math.random() * topology.shellRadiusJitter;
      const offset = index * 3;
      topologyPoints[offset] = Math.cos(angle) * ringRadius * pointRadius;
      topologyPoints[offset + 1] = y * pointRadius;
      topologyPoints[offset + 2] = Math.sin(angle) * ringRadius * pointRadius;
    }

    for (let index = topology.shellNodeCount; index < topologyNodeCount; index += 1) {
      const y = Math.random() * 2 - 1;
      const ringRadius = Math.sqrt(1 - y * y);
      const angle = Math.random() * TAU;
      const pointRadius = topology.innerRadiusMin + Math.cbrt(Math.random()) * (topology.innerRadiusMax - topology.innerRadiusMin);
      const offset = index * 3;
      topologyPoints[offset] = Math.cos(angle) * ringRadius * pointRadius;
      topologyPoints[offset + 1] = y * pointRadius;
      topologyPoints[offset + 2] = Math.sin(angle) * ringRadius * pointRadius;
    }


    const topologyEdgePairs = [];
    const topologyEdgeKeys = new Set();
    const nearestIndices = new Int16Array(topology.neighborPoolSize);
    const nearestDistances = new Float32Array(topology.neighborPoolSize);
    const addTopologyEdge = (start, end) => {
      const low = Math.min(start, end);
      const high = Math.max(start, end);
      const key = low * topologyNodeCount + high;
      if (low === high || topologyEdgeKeys.has(key)) return;
      topologyEdgeKeys.add(key);
      topologyEdgePairs.push(low, high);
    };

    const connectRandomNear = (index, start, end, count) => {
      nearestIndices.fill(-1);
      nearestDistances.fill(Infinity);
      const offset = index * 3;

      for (let candidate = start; candidate < end; candidate += 1) {
        if (candidate === index) continue;
        const candidateOffset = candidate * 3;
        const dx = topologyPoints[offset] - topologyPoints[candidateOffset];
        const dy = topologyPoints[offset + 1] - topologyPoints[candidateOffset + 1];
        const dz = topologyPoints[offset + 2] - topologyPoints[candidateOffset + 2];
        const distance = dx * dx + dy * dy + dz * dz;

        for (let rank = 0; rank < topology.neighborPoolSize; rank += 1) {
          if (distance >= nearestDistances[rank]) continue;
          for (let shift = topology.neighborPoolSize - 1; shift > rank; shift -= 1) {
            nearestIndices[shift] = nearestIndices[shift - 1];
            nearestDistances[shift] = nearestDistances[shift - 1];
          }
          nearestIndices[rank] = candidate;
          nearestDistances[rank] = distance;
          break;
        }
      }

      let available = topology.neighborPoolSize;
      while (available > 0 && nearestIndices[available - 1] < 0) available -= 1;
      for (let connection = 0; connection < count && available > 0; connection += 1) {
        const selectedRank = Math.floor(Math.random() * available);
        addTopologyEdge(index, nearestIndices[selectedRank]);
        for (let shift = selectedRank; shift < available - 1; shift += 1) nearestIndices[shift] = nearestIndices[shift + 1];
        available -= 1;
      }
    };

    for (let index = 0; index < topology.shellNodeCount; index += 1) {
      connectRandomNear(index, 0, topology.shellNodeCount, topology.surfaceNeighbors);
      if (Math.random() < topology.shellToInnerChance) connectRandomNear(index, topology.shellNodeCount, topologyNodeCount, 1);
    }
    for (let index = topology.shellNodeCount; index < topologyNodeCount; index += 1) {
      connectRandomNear(index, topology.shellNodeCount, topologyNodeCount, topology.innerNeighbors);
      connectRandomNear(index, 0, topology.shellNodeCount, 1);
    }
    const topologyEdges = Uint16Array.from(topologyEdgePairs);

    const flow = CONFIG.flow;
    const flowParticles = new Float32Array(flow.particleCount * 4);
    const flowActive = new Uint8Array(flow.particleCount);
    const trailX = new Float32Array(flow.particleCount * flow.maxTrailPoints);
    const trailY = new Float32Array(flow.particleCount * flow.maxTrailPoints);
    const trailStart = new Uint16Array(flow.particleCount);
    const trailCount = new Uint16Array(flow.particleCount);
    const trailAge = new Uint16Array(flow.particleCount);
    const eraseDelay = new Uint16Array(flow.particleCount);
    const eraseSpeed = new Float32Array(flow.particleCount);
    const eraseProgress = new Float32Array(flow.particleCount);
    let flowActiveCount = 0;
    let flowSpawnCountdown = 0;

    const topologySelection = new Float32Array(topologyNodeCount);
    const topologyEdgeSelection = new Float32Array(topologyEdges.length / 2);
    const topologyEdgeTargets = new Float32Array(topologyEdges.length / 2);
    const topologyNodeOrder = new Int16Array(topologyNodeCount);
    const topologyNextOrder = new Uint8Array(topologyNodeCount);
    let topologyEdgeTargetNode = -2;
    const pointer = { x: 0, y: 0, inside: false };
    let selectedTopologyNode = -1;
    let contourCursorX = 0;
    let contourCursorY = 0;
    let contourCursorInfluence = 0;
    const topologyOrientation = new Float64Array([Math.sin(topology.pitch * 0.5), 0, 0, Math.cos(topology.pitch * 0.5)]);
    let spinVelocityX = 0;
    let spinVelocityY = -topology.rotationSpeed;
    let naturalSpinAxisX = 0;
    let naturalSpinAxisY = -1;
    let draggingTopology = false;
    let dragPointerId = null;
    let dragPointerX = 0;
    let dragPointerY = 0;
    let dragPointerTime = 0;
    let dragSpinAxisX = 0;
    let dragSpinAxisY = 0;
    let lastRenderTime = null;
    const resetFlowTrail = (index, x, y) => {
      const offset = index * flow.maxTrailPoints;
      trailStart[index] = 0;
      trailCount[index] = 1;
      trailAge[index] = 0;
      eraseDelay[index] = CONFIG.flow.minStartDelay + Math.floor(Math.random() * (CONFIG.flow.maxStartDelay - CONFIG.flow.minStartDelay + 1));
      eraseSpeed[index] = CONFIG.flow.minEraseSpeed + Math.random() * (CONFIG.flow.maxEraseSpeed - CONFIG.flow.minEraseSpeed);
      eraseProgress[index] = 0;
      trailX[offset] = x;
      trailY[offset] = y;
    };

    const resetFlowParticle = (index, x = Math.pow(Math.random(), flow.spawnXPower) * width, y = Math.random() * height) => {
      const offset = index * 4;
      flowParticles[offset] = x;
      flowParticles[offset + 1] = y;
      flowParticles[offset + 2] = flow.minTraceSpeed + Math.random() * (flow.maxTraceSpeed - flow.minTraceSpeed);
      flowParticles[offset + 3] = Math.random() * TAU;
      if (!flowActive[index]) flowActiveCount += 1;
      flowActive[index] = 1;
      resetFlowTrail(index, x, y);
    };
    const spawnFlowParticleAt = (x, y) => {
      const firstIndex = Math.floor(Math.random() * flow.particleCount);
      for (let offset = 0; offset < flow.particleCount; offset += 1) {
        const index = (firstIndex + offset) % flow.particleCount;
        if (flowActive[index] || trailCount[index] > 0) continue;
        resetFlowParticle(index, x, y);
        return;
      }
      resetFlowParticle(firstIndex, x, y);
    };


    const randomFlowInteger = (minimum, maximum) => minimum + Math.floor(Math.random() * (maximum - minimum + 1));

    const scheduleNextFlowBatch = () => {
      flowSpawnCountdown = randomFlowInteger(flow.minSpawnInterval, flow.maxSpawnInterval);
    };

    const spawnFlowBatch = () => {
      const batchSize = randomFlowInteger(flow.minSpawnBatchSize, flow.maxSpawnBatchSize);
      const firstIndex = Math.floor(Math.random() * flow.particleCount);
      let spawned = 0;
      for (let offset = 0; offset < flow.particleCount && spawned < batchSize; offset += 1) {
        const index = (firstIndex + offset) % flow.particleCount;
        if (flowActive[index] || trailCount[index] > 0) continue;
        resetFlowParticle(index);
        spawned += 1;
      }
      scheduleNextFlowBatch();
    };

    const resetFlow = () => {
      flowActive.fill(0);
      trailCount.fill(0);
      trailAge.fill(0);
      flowActiveCount = 0;
      flowSpawnCountdown = 0;
    };
    const updateTopologyEdgeTargets = () => {
      if (topologyEdgeTargetNode === selectedTopologyNode) return;
      topologyEdgeTargetNode = selectedTopologyNode;
      topologyEdgeTargets.fill(0);
      if (selectedTopologyNode < 0) return;

      topologyNodeOrder.fill(-1);
      topologyNodeOrder[selectedTopologyNode] = 0;
      let order = 0;
      while (true) {
        let foundNextOrder = false;
        topologyNextOrder.fill(0);
        for (let edge = 0; edge < topologyEdges.length; edge += 2) {
          const start = topologyEdges[edge];
          const end = topologyEdges[edge + 1];
          if (topologyNodeOrder[start] === order && topologyNodeOrder[end] < 0) topologyNextOrder[end] = 1;
          if (topologyNodeOrder[end] === order && topologyNodeOrder[start] < 0) topologyNextOrder[start] = 1;
        }
        for (let index = 0; index < topologyNodeCount; index += 1) {
          if (!topologyNextOrder[index] || topologyNodeOrder[index] >= 0) continue;
          topologyNodeOrder[index] = order + 1;
          foundNextOrder = true;
        }
        if (!foundNextOrder) break;
        order += 1;
      }

      for (let edge = 0; edge < topologyEdges.length; edge += 2) {
        const startOrder = topologyNodeOrder[topologyEdges[edge]];
        const endOrder = topologyNodeOrder[topologyEdges[edge + 1]];
        let nearestOrder = topologyNodeCount;
        if (startOrder >= 0) nearestOrder = Math.min(nearestOrder, startOrder);
        if (endOrder >= 0) nearestOrder = Math.min(nearestOrder, endOrder);
        if (nearestOrder < topologyNodeCount) topologyEdgeTargets[edge / 2] = Math.pow(topology.connectionDecay, nearestOrder);
      }
    };
    const rotateTopology = (angleX, angleY) => {
      if (angleX === 0 && angleY === 0) return;
      const halfX = angleX * 0.5;
      const halfY = angleY * 0.5;
      const sinX = Math.sin(halfX);
      const cosX = Math.cos(halfX);
      const sinY = Math.sin(halfY);
      const cosY = Math.cos(halfY);
      const deltaX = sinX * cosY;
      const deltaY = cosX * sinY;
      const deltaZ = sinX * sinY;
      const deltaW = cosX * cosY;
      const currentX = topologyOrientation[0];
      const currentY = topologyOrientation[1];
      const currentZ = topologyOrientation[2];
      const currentW = topologyOrientation[3];
      const nextX = deltaW * currentX + deltaX * currentW + deltaY * currentZ - deltaZ * currentY;
      const nextY = deltaW * currentY - deltaX * currentZ + deltaY * currentW + deltaZ * currentX;
      const nextZ = deltaW * currentZ + deltaX * currentY - deltaY * currentX + deltaZ * currentW;
      const nextW = deltaW * currentW - deltaX * currentX - deltaY * currentY - deltaZ * currentZ;
      const inverseLength = 1 / Math.hypot(nextX, nextY, nextZ, nextW);
      topologyOrientation[0] = nextX * inverseLength;
      topologyOrientation[1] = nextY * inverseLength;
      topologyOrientation[2] = nextZ * inverseLength;
      topologyOrientation[3] = nextW * inverseLength;
    };



    const drawTopology = (time, deltaTime) => {
      context.clearRect(0, 0, width, height);
      const mobile = window.innerWidth <= topology.mobileViewportBreakpoint;
      const radius = Math.min(width, height) * (mobile ? topology.mobileRadius : topology.desktopRadius);
      const centerX = width * (mobile ? topology.mobileCenterX : topology.desktopCenterX);
      const centerY = height * (mobile ? topology.mobileCenterY : topology.desktopCenterY);

      if (!draggingTopology) {
        const settle = 1 - Math.exp(-deltaTime / topology.inertiaTime);
        spinVelocityX += (naturalSpinAxisX * topology.rotationSpeed - spinVelocityX) * settle;
        spinVelocityY += (naturalSpinAxisY * topology.rotationSpeed - spinVelocityY) * settle;
        rotateTopology(spinVelocityX * deltaTime, spinVelocityY * deltaTime);
      }

      const driftPitch = Math.sin(time * topology.pitchDriftSpeed) * topology.pitchDrift;
      const sinPitch = Math.sin(driftPitch);
      const cosPitch = Math.cos(driftPitch);
      const orientationX = topologyOrientation[0];
      const orientationY = topologyOrientation[1];
      const orientationZ = topologyOrientation[2];
      const orientationW = topologyOrientation[3];
      let projectedMeanX = 0;
      let projectedMeanY = 0;

      for (let index = 0; index < topologyNodeCount; index += 1) {
        const offset = index * 3;
        const x = topologyPoints[offset];
        const y = topologyPoints[offset + 1];
        const z = topologyPoints[offset + 2];
        const crossX = 2 * (orientationY * z - orientationZ * y);
        const crossY = 2 * (orientationZ * x - orientationX * z);
        const crossZ = 2 * (orientationX * y - orientationY * x);
        const orientedX = x + orientationW * crossX + orientationY * crossZ - orientationZ * crossY;
        const orientedY = y + orientationW * crossY + orientationZ * crossX - orientationX * crossZ;
        const orientedZ = z + orientationW * crossZ + orientationX * crossY - orientationY * crossX;
        const rotatedY = orientedY * cosPitch - orientedZ * sinPitch;
        const rotatedZ = orientedY * sinPitch + orientedZ * cosPitch;
        const perspective = 1 / (1.88 - rotatedZ * 0.52);
        projected[offset] = centerX + orientedX * radius * perspective * 1.68;
        projected[offset + 1] = centerY + rotatedY * radius * perspective * 1.68;
        projected[offset + 2] = rotatedZ;
        projectedMeanX += projected[offset];
        projectedMeanY += projected[offset + 1];
      }
      const projectedOffsetX = centerX - projectedMeanX / topologyNodeCount;
      const projectedOffsetY = centerY - projectedMeanY / topologyNodeCount;
      for (let index = 0; index < topologyNodeCount; index += 1) {
        const offset = index * 3;
        projected[offset] += projectedOffsetX;
        projected[offset + 1] += projectedOffsetY;
      }

      selectedTopologyNode = -1;
      if (pointer.inside && !draggingTopology) {
        let nearestDistance = topology.hoverRadius * topology.hoverRadius;
        for (let index = 0; index < topologyNodeCount; index += 1) {
          const offset = index * 3;
          const dx = projected[offset] - pointer.x;
          const dy = projected[offset + 1] - pointer.y;
          const distance = dx * dx + dy * dy;
          if (distance >= nearestDistance) continue;
          nearestDistance = distance;
          selectedTopologyNode = index;
        }
      }

      for (let index = 0; index < topologyNodeCount; index += 1) {
        const target = index === selectedTopologyNode ? 1 : 0;
        const duration = target ? topology.selectionFadeIn : topology.selectionFadeOut;
        topologySelection[index] += (target - topologySelection[index]) * (1 - Math.exp(-deltaTime / duration));
      }
      updateTopologyEdgeTargets();

      for (let edge = 0; edge < topologyEdges.length; edge += 2) {
        const edgeIndex = edge / 2;
        const startIndex = topologyEdges[edge];
        const endIndex = topologyEdges[edge + 1];
        const start = startIndex * 3;
        const end = endIndex * 3;
        const depth = (projected[start + 2] + projected[end + 2] + 2) * 0.25;
        const target = topologyEdgeTargets[edgeIndex];
        const duration = target > topologyEdgeSelection[edgeIndex] ? topology.selectionFadeIn : topology.selectionFadeOut;
        topologyEdgeSelection[edgeIndex] += (target - topologyEdgeSelection[edgeIndex]) * (1 - Math.exp(-deltaTime / duration));
        const selection = topologyEdgeSelection[edgeIndex];
        context.strokeStyle = rgba(ink, topology.edgeBaseOpacity + depth * topology.edgeDepthOpacity + selection * topology.selectedEdgeOpacity);
        context.lineWidth = topology.edgeWidth + selection * topology.selectedEdgeWidth;
        context.beginPath();
        context.moveTo(projected[start], projected[start + 1]);
        context.lineTo(projected[end], projected[end + 1]);
        context.stroke();
      }

      for (let index = 0; index < topologyNodeCount; index += 1) {
        const offset = index * 3;
        const depth = (projected[offset + 2] + 1) * 0.5;
        const selection = topologySelection[index];
        const nodeRadius = (1.3 + depth * 2.1) * (1 + selection * (topology.selectedNodeScale - 1));
        context.fillStyle = rgba(ink, 0.24 + depth * 0.68);
        context.beginPath();
        context.arc(projected[offset], projected[offset + 1], nodeRadius, 0, TAU);
        context.fill();
      }
    };

    const drawFlow = (time) => {
      context.clearRect(0, 0, width, height);
      if (flowActiveCount < flow.particleCount) {
        flowSpawnCountdown -= 1;
        if (flowSpawnCountdown <= 0) spawnFlowBatch();
      }
      for (let index = 0; index < flow.particleCount; index += 1) {
        const particleOffset = index * 4;
        const trailOffset = index * flow.maxTrailPoints;
        let start = trailStart[index];
        let count = trailCount[index];

        if (flowActive[index]) {
          const x = flowParticles[particleOffset];
          const y = flowParticles[particleOffset + 1];
          const speed = flowParticles[particleOffset + 2];
          const seed = flowParticles[particleOffset + 3];
          const field = Math.sin(y * 0.009 + time * 0.00024 + seed) * 0.72 + Math.cos(x * 0.006 - time * 0.00018) * 0.42;
          const nextX = x + Math.cos(field) * speed * flow.horizontalSpeed;
          const nextY = y + Math.sin(field) * speed * flow.verticalSpeed;
          if (nextX < -12 || nextX > width + 12 || nextY < -12 || nextY > height + 12) {
            flowActive[index] = 0;
            flowActiveCount -= 1;
          } else {
            flowParticles[particleOffset] = nextX;
            flowParticles[particleOffset + 1] = nextY;
            if (count === flow.maxTrailPoints) {
              start = (start + 1) % flow.maxTrailPoints;
              count -= 1;
            }
            const writeIndex = (start + count) % flow.maxTrailPoints;
            trailX[trailOffset + writeIndex] = nextX;
            trailY[trailOffset + writeIndex] = nextY;
            count += 1;
          }
        }

        trailAge[index] += 1;
        if (trailAge[index] > eraseDelay[index]) {
          eraseProgress[index] += eraseSpeed[index];
          let eraseCount = Math.floor(eraseProgress[index]);
          eraseProgress[index] -= eraseCount;
          while (eraseCount > 0 && count > 1) {
            start = (start + 1) % flow.maxTrailPoints;
            count -= 1;
            eraseCount -= 1;
          }
        }

        if (count <= 1 && trailAge[index] > eraseDelay[index]) {
          if (flowActive[index]) {
            resetFlowTrail(index, flowParticles[particleOffset], flowParticles[particleOffset + 1]);
          } else {
            trailStart[index] = 0;
            trailCount[index] = 0;
          }
          continue;
        }

        trailStart[index] = start;
        trailCount[index] = count;
        const highlighted = index % flow.accentInterval === 0;
        const bandCount = Math.min(flow.trailBands, Math.max(1, count - 1));
        for (let band = 0; band < bandCount; band += 1) {
          const from = 1 + Math.floor((band * (count - 1)) / bandCount);
          const to = 1 + Math.floor(((band + 1) * (count - 1)) / bandCount);
          const previous = (start + from - 1) % flow.maxTrailPoints;
          const progress = (band + 0.5) / bandCount;
          const alpha = (highlighted ? flow.accentOpacity : flow.opacity) * Math.pow(progress, 0.65);
          context.strokeStyle = rgba(highlighted ? accent : ink, alpha);
          context.lineWidth = highlighted ? flow.accentLineWidth : flow.lineWidth;
          context.beginPath();
          context.moveTo(trailX[trailOffset + previous], trailY[trailOffset + previous]);
          for (let segment = from; segment < to; segment += 1) {
            const current = (start + segment) % flow.maxTrailPoints;
            context.lineTo(trailX[trailOffset + current], trailY[trailOffset + current]);
          }
          context.stroke();
        }
      }
    };

    const drawContours = (time, deltaTime) => {
      context.clearRect(0, 0, width, height);
      const contours = CONFIG.contours;
      const cursorTarget = pointer.inside ? 1 : 0;
      const cursorFadeTime = cursorTarget > contourCursorInfluence ? contours.cursorResponseTime : contours.cursorFadeTime;
      contourCursorInfluence += (cursorTarget - contourCursorInfluence) * (1 - Math.exp(-deltaTime / cursorFadeTime));
      if (pointer.inside) {
        const cursorFollow = 1 - Math.exp(-deltaTime / contours.cursorResponseTime);
        contourCursorX += (pointer.x / width - 0.5 - contourCursorX) * cursorFollow;
        contourCursorY += (pointer.y / height - 0.5 - contourCursorY) * cursorFollow;
      }
      const lineCount = width < CONFIG.canvas.mobileBreakpoint ? contours.mobileLines : contours.desktopLines;
      for (let line = 0; line < lineCount; line += 1) {
        const linePosition = line / (lineCount - 1) - 0.5;
        const baseY = height * (contours.top + (line / (lineCount - 1)) * contours.verticalSpan);
        const highlighted = line % contours.accentInterval === 0;
        context.strokeStyle = rgba(highlighted ? accent : ink, highlighted ? 0.28 : 0.19);
        context.lineWidth = highlighted ? 0.9 : 0.65;
        context.beginPath();
        for (let step = 0; step < contours.segments; step += 1) {
          const normalizedX = step / (contours.segments - 1);
          const x = normalizedX * width;
          const horizontalPosition = normalizedX - 0.5;
          const directionalPhase =
            contourCursorInfluence *
            contours.cursorPhaseStrength *
            (contourCursorX * linePosition - contourCursorY * horizontalPosition);
          const broadWave =
            Math.sin(normalizedX * Math.PI * 2.9 + line * 0.25 + time * 0.00013 + directionalPhase) * contours.broadAmplitude;
          const midWave =
            Math.sin(normalizedX * Math.PI * 5.6 - time * 0.00009 + line * 0.07 + directionalPhase * 1.2) * contours.midAmplitude;
          const fineWave =
            Math.sin(normalizedX * Math.PI * 9.8 + time * 0.00005 - line * 0.13 - directionalPhase * 0.55) *
            contours.fineAmplitude;
          const basin =
            Math.sin(normalizedX * Math.PI) *
            Math.sin(line * 0.27 + time * 0.00016 + directionalPhase * 0.6) *
            contours.basinAmplitude;
          const y = baseY + broadWave + midWave + fineWave + basin;

          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      }
    };

    const syncCanvasSize = () => {
      const bounds = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, bounds.width);
      const nextHeight = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, CONFIG.canvas.maxPixelRatio);
      const bitmapWidth = Math.max(1, Math.round(nextWidth * pixelRatio));
      const bitmapHeight = Math.max(1, Math.round(nextHeight * pixelRatio));
      if (width === nextWidth && height === nextHeight && canvas.width === bitmapWidth && canvas.height === bitmapHeight) return false;

      if (draggingTopology) {
        if (dragPointerId !== null && canvas.hasPointerCapture(dragPointerId)) canvas.releasePointerCapture(dragPointerId);
        draggingTopology = false;
        dragPointerId = null;
      }
      width = nextWidth;
      height = nextHeight;
      canvas.width = bitmapWidth;
      canvas.height = bitmapHeight;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      pointer.inside = false;
      resetFlow();
      return true;
    };

    const render = (time) => {
      if (syncCanvasSize()) lastRenderTime = null;
      const deltaTime = lastRenderTime === null ? 16.67 : Math.max(0, Math.min(32, time - lastRenderTime));
      lastRenderTime = time;
      if (mode === "topology") drawTopology(time, deltaTime);
      else if (mode === "flow") drawFlow(time);
      else drawContours(time, deltaTime);
    };

    const resize = () => {
      syncCanvasSize();
      lastRenderTime = null;
      render(reducedMotion ? 9000 : performance.now());
    };
    const updatePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.inside = pointer.x >= 0 && pointer.x <= bounds.width && pointer.y >= 0 && pointer.y <= bounds.height;
    };

    const renderInteractionFrame = () => {
      if (reducedMotion) render(lastRenderTime === null ? 9000 : lastRenderTime + 16.67);
    };

    const onPointerMove = (event) => {
      updatePointer(event);

      if (mode === "contours") {
        renderInteractionFrame();
        return;
      }

      if (draggingTopology && event.pointerId === dragPointerId) {
        const deltaTime = Math.max(1, event.timeStamp - dragPointerTime);
        const deltaX = event.clientX - dragPointerX;
        const deltaY = event.clientY - dragPointerY;
        const angleX = -deltaY * topology.dragSensitivity;
        const angleY = deltaX * topology.dragSensitivity;
        rotateTopology(angleX, angleY);
        let nextSpinVelocityX = angleX / deltaTime;
        let nextSpinVelocityY = angleY / deltaTime;
        const nextSpeed = Math.hypot(nextSpinVelocityX, nextSpinVelocityY);
        if (nextSpeed > topology.maxFlickSpeed) {
          const velocityScale = topology.maxFlickSpeed / nextSpeed;
          nextSpinVelocityX *= velocityScale;
          nextSpinVelocityY *= velocityScale;
        }
        spinVelocityX = spinVelocityX * 0.55 + nextSpinVelocityX * 0.45;
        spinVelocityY = spinVelocityY * 0.55 + nextSpinVelocityY * 0.45;
        const dragDistance = Math.hypot(angleX, angleY);
        if (dragDistance > 0.001) {
          dragSpinAxisX = angleX / dragDistance;
          dragSpinAxisY = angleY / dragDistance;
        }
        dragPointerX = event.clientX;
        dragPointerY = event.clientY;
        dragPointerTime = event.timeStamp;
      }
      renderInteractionFrame();
    };

    const onCanvasClick = (event) => {
      if (event.button !== 0 || mode !== "flow") return;
      updatePointer(event);
      spawnFlowParticleAt(pointer.x, pointer.y);
      renderInteractionFrame();
    };

    const onPointerDown = (event) => {
      if (mode !== "topology" || event.button !== 0) return;
      updatePointer(event);
      const mobile = window.innerWidth <= topology.mobileViewportBreakpoint;
      const radius = Math.min(width, height) * (mobile ? topology.mobileRadius : topology.desktopRadius) * topology.dragRadiusScale;
      const centerX = width * (mobile ? topology.mobileCenterX : topology.desktopCenterX);
      const centerY = height * (mobile ? topology.mobileCenterY : topology.desktopCenterY);
      const distanceX = pointer.x - centerX;
      const distanceY = pointer.y - centerY;
      if (distanceX * distanceX + distanceY * distanceY > radius * radius) return;
      draggingTopology = true;
      dragPointerId = event.pointerId;
      dragPointerX = event.clientX;
      dragPointerY = event.clientY;
      dragPointerTime = event.timeStamp;
      dragSpinAxisX = 0;
      dragSpinAxisY = 0;
      canvas.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const finishTopologyDrag = (event) => {
      if (!draggingTopology || event.pointerId !== dragPointerId) return;
      if (dragSpinAxisX !== 0 || dragSpinAxisY !== 0) {
        naturalSpinAxisX = dragSpinAxisX;
        naturalSpinAxisY = dragSpinAxisY;
      }
      if (event.timeStamp - dragPointerTime > 80) {
        spinVelocityX = naturalSpinAxisX * topology.rotationSpeed;
        spinVelocityY = naturalSpinAxisY * topology.rotationSpeed;
      }
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      draggingTopology = false;
      dragPointerId = null;
      updatePointer(event);
      renderInteractionFrame();
    };

    const onPointerLeave = () => {
      if (!draggingTopology) pointer.inside = false;
      if (mode !== "contours") renderInteractionFrame();
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", finishTopologyDrag);
    canvas.addEventListener("pointercancel", finishTopologyDrag);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onCanvasClick);

    const setMode = (nextMode) => {
      if (!SCENES[nextMode]) return;
      mode = nextMode;
      contourCursorX = 0;
      contourCursorY = 0;
      contourCursorInfluence = 0;
      if (draggingTopology) {
        draggingTopology = false;
        dragPointerId = null;
      }
      lastRenderTime = null;
      context.clearRect(0, 0, width, height);
      if (mode === "flow") resetFlow();
      onModeChange(mode, SCENES[mode]);
      if (reducedMotion) render(9000);
    };

    const animate = (time) => {
      if (visible) render(time);
      frame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    resize();
    onModeChange(mode, SCENES[mode]);
    if (!reducedMotion) frame = requestAnimationFrame(animate);

    return Object.freeze({
      getMode: () => mode,
      setMode,
      destroy: () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", finishTopologyDrag);
        canvas.removeEventListener("pointercancel", finishTopologyDrag);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("click", onCanvasClick);
      },
    });
  };

  window.CanvasScenes = Object.freeze({ CONFIG, SCENES, MODE_NAMES, randomMode, create });
})();
