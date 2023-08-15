const container = document.getElementById("bg");
const app = new PIXI.Application({
    width: container.offsetWidth,
    height: container.offsetHeight,
    backgroundColor: 0x101015,
});
container.appendChild(app.view);

// settings
let area;
let numNodes;
let nodeSize;
let nodeMinSpeed;
let nodeMaxSpeed;
let lineWidth;
let maxActivation;
let activationDecay;
let propagationDecay;
let clickRadius;
let connectRadius;
let randActivationFreq;
function _config() {
    area = app.screen.width * app.screen.height;

    numNodes = Math.min(Math.sqrt(area), 1000);
    // nodeSize = _nodeSize();
    nodeSize = area < 800000 ? 2 : 3;

    console.log(area, nodeSize);

    nodeMinSpeed = area * 1e-7;
    nodeMaxSpeed = nodeMinSpeed * 2;
    lineWidth = nodeSize / 2;
    maxActivation = 0.5;
    // activationDecay = Math.sqrt(area) * 2e-5;
    activationDecay = area * 3e-8;
    propagationDecay = Math.sqrt(area) * 2e-4;
    if (propagationDecay > 0.25)
        propagationDecay = 0.25 + (Math.sqrt(area) * 2e-4 - 0.25) / 2;

    clickRadius = Math.sqrt(area) * 0.07;
    connectRadius = clickRadius;
    randActivationFreq = 1e-13;

    if (false)
        console.log(
            `area: ${area}\nnumNodes: ${numNodes}\nnodeSize: ${nodeSize}\nnodeMinSpeed: ${nodeMinSpeed}\nnodeMaxSpeed: ${nodeMaxSpeed}\nlineWidth: ${lineWidth}\nmaxActivation: ${maxActivation}\nactivationDecay: ${activationDecay}\npropagationDecay: ${propagationDecay}\nclickRadius: ${clickRadius}\nconnectRadius: ${connectRadius}\nrandActivationFreq: ${randActivationFreq}`,
        );
}
_config();

let nodes = [];
function spawnNodes() {
    for (let i = 0; i < numNodes; i++) {
        const node = new PIXI.Graphics();
        node.beginFill(0x6c7086);
        node.drawCircle(0, 0, nodeSize);
        node.endFill();
        node.x = Math.random() * app.screen.width;
        node.y = Math.random() * app.screen.height;

        const speed =
            Math.random() * (nodeMaxSpeed - nodeMinSpeed) + nodeMinSpeed;
        const xdir = Math.random() < 0.5 ? -1 : 1;
        const ydir = Math.random() < 0.5 ? -1 : 1;
        node.vx = speed * xdir;
        node.vy = speed * ydir;

        node.activation = 0;
        app.stage.addChild(node);
        nodes.push(node);
    }
}

window.addEventListener("resize", () => {
    nodes.forEach((node) => node.clear());
    nodes = [];
    app.renderer.resize(container.offsetWidth, container.offsetHeight);
    _config();
    spawnNodes();
});

spawnNodes(numNodes);

app.ticker.minFPS = 60;
app.ticker.maxFPS = 60;

const lines = new PIXI.Graphics();
app.stage.addChild(lines);

let randActivationChance = 0;
app.ticker.add(() => {
    lines.clear();

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].activation > 0) nodes[i].activation -= activationDecay;

        if (Math.random() < randActivationChance) {
            nodes[i].activation = maxActivation;
            randActivationChance = 0;
        } else {
            randActivationChance += numNodes * randActivationFreq;
        }

        // Redraw
        nodes[i].clear();
        const alpha = Math.max(nodes[i].activation, 0.1);
        nodes[i].beginFill(0x6c7086, alpha);
        nodes[i].drawCircle(0, 0, nodeSize);
        nodes[i].endFill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectRadius) {
                const alpha = Math.max(nodes[i].activation, 0.1);
                lines.lineStyle(lineWidth, 0x6c7086, alpha);
                lines.moveTo(nodes[i].x, nodes[i].y);
                lines.lineTo(nodes[j].x, nodes[j].y);
                if (nodes[i].activation > nodes[j].activation) {
                    nodes[j].activation +=
                        propagationDecay *
                        (nodes[i].activation - nodes[j].activation);
                    if (nodes[j].activation > maxActivation)
                        nodes[j].activation = maxActivation;
                } else {
                    nodes[i].activation +=
                        propagationDecay *
                        (nodes[j].activation - nodes[i].activation);
                    if (nodes[i].activation > maxActivation)
                        nodes[i].activation = maxActivation;
                }
            }
        }

        // Update positions
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > app.screen.width)
            nodes[i].vx = -nodes[i].vx;
        if (nodes[i].y < 0 || nodes[i].y > app.screen.height)
            nodes[i].vy = -nodes[i].vy;
    }
});

app.view.addEventListener("click", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    nodes.forEach((node) => {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < clickRadius) node.activation = maxActivation;
    });
});
