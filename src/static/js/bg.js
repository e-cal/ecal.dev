const container = document.getElementById("bg");
const app = new PIXI.Application({
    width: container.offsetWidth,
    height: container.offsetHeight,
    backgroundColor: 0x101015,
});
container.appendChild(app.view);

// settings
const nodeSize = 2;
const nodeMinSpeed = 0.05;
const nodeMaxSpeed = 0.1;
const lineWidth = 1;

const maxActivation = 0.5;
const activationDecay = 0.015;
const propagationDecay = activationDecay * 5;
const clickRadius = 50;
const randActivationFreq = 1e-13;

function _numNodes() {
    return Math.floor(app.screen.width * app.screen.height * 0.0008);
}

let numNodes = _numNodes();

let nodes = [];
function spawnNodes(n) {
    console.log("spawning " + n + " nodes");
    for (let i = 0; i < n; i++) {
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
    app.renderer.resize(container.offsetWidth, container.offsetHeight);
    // clear all nodes
    nodes.forEach((node) => {
        node.clear();
    });
    nodes = [];
    numNodes = _numNodes();
    spawnNodes(numNodes);
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

            if (dist < 100) {
                const alpha = Math.max(nodes[i].activation, 0.1);
                lines.lineStyle(lineWidth, 0x6c7086, alpha);
                lines.moveTo(nodes[i].x, nodes[i].y);
                lines.lineTo(nodes[j].x, nodes[j].y);
                if (nodes[i].activation > nodes[j].activation) {
                    nodes[j].activation +=
                        propagationDecay *
                        (nodes[i].activation - nodes[j].activation);
                } else {
                    nodes[i].activation +=
                        propagationDecay *
                        (nodes[j].activation - nodes[i].activation);
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
