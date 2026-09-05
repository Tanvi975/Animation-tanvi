const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
const sun = new Image();
const cloud1 = new Image();
const cloud2 = new Image();
const tree = new Image();
const flowers = new Image();
const butterfly = new Image();

background.src = "assets/background.png";
sun.src = "assets/sun.png";

cloud1.src = "assets/cloud.png";
cloud2.src = "assets/cloud.png";
tree.src = "assets/tree.png";
flowers.src = "assets/flowers.png";
butterfly.src = "assets/butterfly.png";

let loadedImages = 0;
let raindrops = [];

function imageLoaded() {
    loadedImages++;

    if (loadedImages === 7) {
        createRain();
        animate();
    }
}

background.onload = imageLoaded;
sun.onload = imageLoaded;
cloud1.onload = imageLoaded;
cloud2.onload = imageLoaded;
tree.onload = imageLoaded;
flowers.onload = imageLoaded;
butterfly.onload = imageLoaded;


function createRain() {
    for (let i = 0; i < 100; i++) {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * 300,
            speed: 3 + Math.random() * 3
        });
    }
}

function drawScene() {
    ctx.drawImage(background, 0, 0, 1000, 600);
    ctx.drawImage(sun, 50, 50, 130, 120);
    ctx.drawImage(cloud1, 300, 70, 160, 96);
    ctx.drawImage(cloud2, 600, 100, 180, 108);
    ctx.drawImage(tree, 600, 255, 200, 233);
    ctx.drawImage(flowers, 460, 350, 250, 125);
    ctx.drawImage(butterfly, 480, 380, 30, 40);

    ctx.fillStyle = "#725339";


    ctx.beginPath();
    ctx.ellipse(200, 510, 8, 14, 0, 0, Math.PI * 2);
    ctx.fill();


    ctx.strokeStyle = "#3E2418";
    ctx.stroke();
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScene();
    drawRain();
    requestAnimationFrame(animate);
}


function drawRain() {
    ctx.strokeStyle = "#b8dff2";

    for (let i = 0; i < raindrops.length; i++) {
        const drop = raindrops[i];

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + 10);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
            drop.y = 0;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScene();
    drawRain();

    requestAnimationFrame(animate);
}