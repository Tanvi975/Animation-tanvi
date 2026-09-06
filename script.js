const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
const sun = new Image();
const cloud1 = new Image();
const cloud2 = new Image();
const cloud3 = new Image();
const tree = new Image();
const flowers = new Image();
const butterfly = new Image();
const flower1 = new Image();
const flower2 = new Image();
const flower3 = new Image();

background.src = "assets/background.png";
sun.src = "assets/sun.png";

cloud1.src = "assets/cloud.png";
cloud2.src = "assets/cloud.png";
cloud3.src = "assets/cloud.png";
tree.src = "assets/tree.png";
flowers.src = "assets/flowers.png";
butterfly.src = "assets/butterfly.png";
flower1.src = "assets/flower1.png";
flower2.src = "assets/flower2.png";
flower3.src = "assets/flower3.png";

let loadedImages = 0;
let raindrops = [];
let plantGrowth = 0;
let butterflies = [];
let rainOn = true;
let rainTimer = 0;
let sunOpacity = 0;
let cloud1X = 300;
let cloud2X = 600;
let cloud3X = 450;
let cloudOpacity = 1;

function imageLoaded() {
    loadedImages++;

    if (loadedImages === 11) {
        createRain();
        animate();
    }
}

background.onload = imageLoaded;
sun.onload = imageLoaded;
cloud1.onload = imageLoaded;
cloud2.onload = imageLoaded;
cloud3.onload = imageLoaded;
tree.onload = imageLoaded;
flowers.onload = imageLoaded;
butterfly.onload = imageLoaded;
flower1.onload = imageLoaded;
flower2.onload = imageLoaded;
flower3.onload = imageLoaded;


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
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px Arial";
    ctx.fillText("Tap anywhere to see butterflies!", 20, 30);

    if (!rainOn) {
        if (cloudOpacity > 0) {
            cloudOpacity -= 0.005;
        }
        if (sunOpacity < 1) {
            sunOpacity += 0.01;
        }

        ctx.globalAlpha = sunOpacity;
        ctx.drawImage(sun, 50, 50, 130, 120);
        ctx.globalAlpha = 1;
    }
    if (cloudOpacity > 0) {
        ctx.globalAlpha = cloudOpacity;
        ctx.drawImage(cloud1, cloud1X, 70, 160, 96);
        ctx.drawImage(cloud2, cloud2X, 100, 180, 108);
        ctx.drawImage(cloud3, cloud3X, 30, 120, 72);
        ctx.globalAlpha = 1;
    }
    ctx.drawImage(tree, 600, 255, 200, 233);
    ctx.drawImage(flowers, 460, 350, 250, 125);
    ctx.drawImage(flower1, 350, 390, 100, 50);
    ctx.drawImage(flower2, 300, 390, 45, 60);
    ctx.drawImage(flower3, 330, 380, 45, 60);
    ctx.drawImage(flower2, 410, 390, 40, 55);
    ctx.drawImage(flower3, 430, 390, 40, 55);
    ctx.drawImage(flower2, 820, 390, 40, 55);
    ctx.drawImage(flower1, 750, 390, 100, 50);
    ctx.drawImage(butterfly, 480, 380, 30, 40);

    if (plantGrowth === 0) {
        ctx.fillStyle = "#725339";


        ctx.beginPath();
        ctx.ellipse(200, 510, 8, 14, 0, 0, Math.PI * 2);
        ctx.fill();


        ctx.strokeStyle = "#3E2418";
        ctx.stroke();
    }
};


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

function drawSprout() {
    if (plantGrowth > 0) {
        ctx.strokeStyle = "#3b7a3b";
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(200, 510);
        ctx.lineTo(200, 510 - plantGrowth);
        ctx.stroke();

        ctx.fillStyle = "#4f9d4f";

        ctx.beginPath();
        ctx.ellipse(190, 510 - plantGrowth + 10, 12, 6, -0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(210, 510 - plantGrowth + 10, 12, 6, 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(188, 510 - plantGrowth / 2, 14, 7, -0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(212, 510 - plantGrowth / 2, 14, 7, 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function addButterflies(x, y) {
    if (y > 40) {
        y = 400;
    }
    for (let i = 0; i < 3; i++) {
        butterflies.push({
            x: x,
            y: y,
            speedX: -2 + Math.random() * 4,
            speedY: -2 + Math.random() * 4,
            size: 20 + Math.random() * 20,
            life: 180

        });
    }
}

function drawButterflies() {
    for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i];
        ctx.drawImage(butterfly, b.x, b.y, b.size, b.size);

        b.x += b.speedX;
        b.y += b.speedY;
        b.life--;

        if (b.y > 400) {
            b.y = 400;
        }
        if (b.y >= 400 && b.speedY > 0) {
            b.speedY = -b.speedY;
        }

        if (b.life <= 0) {
            butterflies.splice(i, 1);
            i--;
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScene();
    if (rainOn) {
        drawRain();
        cloud1X += 0.4;
        cloud2X += 0.3;
        cloud3X += 0.5;
        rainTimer++;

        if (rainTimer > 300) {
            rainOn = false;
        }
    }
    drawSprout();
    drawButterflies();


    if (plantGrowth < 120) {
        plantGrowth += 0.5;
    }

    requestAnimationFrame(animate);
}
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    addButterflies(x, y);
});


document.getElementById("restart").addEventListener("click", function() {
    plantGrowth = 0;
    butterflies = [];
    rainOn = true;
    rainTimer = 0;
    sunOpacity = 0;
    cloudOpacity = 1;

    cloud1X = 300;
    cloud2X = 600;
    cloud3X = 450;

    document.getElementById("rain").textContent = "Rain ON";
});