
/* =====================================================
   COWS VS ALIENS: MEGA HERD EDITION
   PART 3 OF 8
   GAME SETUP, VARIABLES, BIOMES AND COW ROSTER
===================================================== */

// ==========================================
// CANVAS SETUP
// ==========================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 100;
const ROWS = 5;
const COLS = 16;

// ==========================================
// GAME VARIABLES
// ==========================================

let biomeIndex = 0;
let waveInBiome = 1;

let milk = 150;
let barnHp = 15;

let frame = 0;
let gameOver = false;

let selectedCowType = 'dairy';

let hoverCol = -1;
let hoverRow = -1;

let cows = [];
let aliens = [];
let projectiles = [];
let alienProjectiles = [];

let floatingTexts = [];
let visualEffects = [];

let aliensToSpawn = 0;
let spawnTimer = 0;
let waveCooldown = 180;

// ==========================================
// GAME SETTINGS
// ==========================================

const MAX_BARN_HP = 15;
const REFUND_PERCENT = 0.5;

const TOTAL_BIOMES = 8;

// ==========================================
// BIOMES
// ==========================================

const BIOMES = [

    {
        name: 'Green Pasture',
        light: '#52b788',
        dark: '#40916c',
        waves: 3,
        boss: 'mothershipBoss',
        waterCols: []
    },

    {
        name: 'Scorched Desert',
        light: '#e9c46a',
        dark: '#d4a373',
        waves: 4,
        boss: 'warlordBoss',
        waterCols: []
    },

    {
        name: 'River Crossing',
        light: '#74c69d',
        dark: '#52b788',
        waves: 5,
        boss: 'hydraBoss',
        waterCols: [7]
    },

    {
        name: 'Frozen Tundra',
        light: '#90e0ef',
        dark: '#48cae4',
        waves: 6,
        boss: 'cryoTitanBoss',
        waterCols: [5, 10]
    },

    {
        name: 'Swamp Marsh',
        light: '#606c38',
        dark: '#4a572a',
        waves: 7,
        boss: 'plagueQueenBoss',
        waterCols: [4, 9, 13]
    },

    {
        name: 'Quantum Rift',
        light: '#480ca8',
        dark: '#3f37c9',
        waves: 8,
        boss: 'shiftStormBoss',
        waterCols: [6, 11]
    },

    {
        name: 'Volcanic Core',
        light: '#9b2226',
        dark: '#6a040f',
        waves: 9,
        boss: 'overlordBoss',
        waterCols: [5, 9, 13]
    },

    {
        name: 'Cosmic Void',
        light: '#3c096c',
        dark: '#240046',
        waves: 10,
        boss: 'galacticEmperorBoss',
        waterCols: [4, 8, 11, 14]
    }

];

// ==========================================
// COW ROSTER - PART 1
// ==========================================

const COW_LIST = [

    {
        id: 'tinyCalf',
        name: 'Tiny Calf',
        emoji: '🍼',
        cost: 35,
        hp: 80,
        desc: '+15 Milk/4s',
        role: 'milk',
        rate: 240,
        amount: 15
    },

    {
        id: 'dairy',
        name: 'Dairy Cow',
        emoji: '🐄',
        cost: 50,
        hp: 110,
        desc: '+25 Milk/5s',
        role: 'milk',
        rate: 300,
        amount: 25
    },

    {
        id: 'hayOx',
        name: 'Hay Bale Ox',
        emoji: '🌾',
        cost: 60,
        hp: 320,
        desc: 'Starter Wall',
        role: 'wall',
        thorns: 0.2
    },

    {
        id: 'pebbleCow',
        name: 'Pebble Spitter',
        emoji: '🪨',
        cost: 75,
        hp: 110,
        desc: 'Fast Light Shot',
        role: 'shooter',
        rate: 65,
        dmg: 18,
        speed: 7,
        color: '#d6ccc2'
    },

    {
        id: 'spikyBull',
        name: 'Spiky Bull',
        emoji: '🐂',
        cost: 85,
        hp: 520,
        desc: 'Tank + Thorn Dmg',
        role: 'wall',
        thorns: 0.55
    },

    {
        id: 'milkShooter',
        name: 'Milk Shooter',
        emoji: '🐮',
        cost: 100,
        hp: 130,
        desc: 'Basic Milk Shot',
        role: 'shooter',
        rate: 85,
        dmg: 28,
        speed: 6,
        color: '#ffffff'
    },

    {
        id: 'stompCalf',
        name: 'Stomp Calf',
        emoji: '🐾',
        cost: 115,
        hp: 170,
        desc: 'Ground Pound Push',
        role: 'pounder',
        rate: 130,
        dmg: 32,
        radius: 135,
        push: 55
    },

    {
        id: 'boomBovine',
        name: 'Boom Bovine',
        emoji: '💣',
        cost: 125,
        hp: 100,
        desc: '3x3 Blast',
        role: 'bomb',
        fuse: 65,
        dmg: 380,
        radius: 155
    },

    {
        id: 'frostCow',
        name: 'Frost Cow',
        emoji: '🧊',
        cost: 135,
        hp: 130,
        desc: 'Slows Aliens',
        role: 'shooter',
        rate: 95,
        dmg: 25,
        speed: 6,
        color: '#00b4d8',
        effect: 'slow'
    },

    {
        id: 'medicCow',
        name: 'Medic Cow',
        emoji: '🩺',
        cost: 140,
        hp: 150,
        desc: 'Heals 3x3 Herd',
        role: 'healer',
        rate: 120,
        heal: 26
    },

    {
        id: 'viperCow',
        name: 'Viper Cow',
        emoji: '🐍',
        cost: 150,
        hp: 130,
        desc: 'Poison Spit',
        role: 'shooter',
        rate: 90,
        dmg: 20,
        speed: 6,
        color: '#80ed99',
        effect: 'poison'
    },

    {
        id: 'gatlingCow',
        name: 'Gatling Calf',
        emoji: '🔫',
        cost: 165,
        hp: 120,
        desc: 'Rapid Low Dmg',
        role: 'shooter',
        rate: 24,
        dmg: 11,
        speed: 9,
        color: '#ffd166'
    },

    {
        id: 'goldenCow',
        name: 'Golden Cow',
        emoji: '👑',
        cost: 180,
        hp: 160,
        desc: '+60 Milk/5.5s',
        role: 'milk',
        rate: 330,
        amount: 60
    },

    {
        id: 'windCow',
        name: 'Wind Cow',
        emoji: '🌪️',
        cost: 195,
        hp: 140,
        desc: 'Full-Row Knockback',
        role: 'shooter',
        rate: 190,
        dmg: 32,
        speed: 10,
        color: '#caf0f8',
        effect: 'rowWind',
        piercing: true
    },

    {
        id: 'sniperBull',
        name: 'Sniper Bull',
        emoji: '🎯',
        cost: 215,
        hp: 130,
        desc: 'High Dmg Shot',
        role: 'shooter',
        rate: 160,
        dmg: 135,
        speed: 13,
        color: '#ff006e'
    },

    {
        id: 'cloverCow',
        name: 'Clover Cow',
        emoji: '🍀',
        cost: 230,
        hp: 180,
        desc: '+80 Milk/5s',
        role: 'milk',
        rate: 300,
        amount: 80
    },

    {
        id: 'teslaCow',
        name: 'Tesla Cow',
        emoji: '⚡',
        cost: 245,
        hp: 150,
        desc: 'Chain Lightning',
        role: 'shooter',
        rate: 105,
        dmg: 44,
        speed: 8,
        color: '#c77dff',
        effect: 'chain'
    },

    {
        id: 'acornBull',
        name: 'Acorn Bull',
        emoji: '🌰',
        cost: 260,
        hp: 850,
        desc: 'Bark Thorn Wall',
        role: 'wall',
        thorns: 0.85
    },

    {
        id: 'ironOx',
        name: 'Iron Ox',
        emoji: '🛡️',
        cost: 275,
        hp: 1150,
        desc: 'Heavy Thorn Wall',
        role: 'wall',
        thorns: 1.15
    },

    {
        id: 'mudSlinger',
        name: 'Mud Slinger',
        emoji: '🟤',
        cost: 290,
        hp: 160,
        desc: 'Sticky Slow Blob',
        role: 'shooter',
        rate: 80,
        dmg: 48,
        speed: 7,
        color: '#bc6c25',
        effect: 'slow'
    },

    {
        id: 'cyberCow',
        name: 'Cyber Cow',
        emoji: '🛸',
        cost: 305,
        hp: 190,
        desc: 'Plasma Rapid',
        role: 'shooter',
        rate: 32,
        dmg: 32,
        speed: 11,
        color: '#00f5d4'
    },

    {
        id: 'quakeOx',
        name: 'Earthquake Ox',
        emoji: '🦏',
        cost: 325,
        hp: 440,
        desc: 'Heavy Slam + Push',
        role: 'pounder',
        rate: 115,
        dmg: 80,
        radius: 175,
        push: 75
    },

    {
        id: 'megaBombCow',
        name: 'Mega Nuke Cow',
        emoji: '☢️',
        cost: 345,
        hp: 120,
        desc: '5x5 Huge Blast',
        role: 'bomb',
        fuse: 135,
        dmg: 1050,
        radius: 260
    },

    {
        id: 'cactusBull',
        name: 'Cactus Bull',
        emoji: '🌵',
        cost: 360,
        hp: 980,
        desc: 'High Needle Thorns',
        role: 'wall',
        thorns: 1.8
    },

    {
        id: 'blizzardCow',
        name: 'Blizzard Bull',
        emoji: '❄️',
        cost: 380,
        hp: 180,
        desc: 'Freezes Enemies',
        role: 'shooter',
        rate: 125,
        dmg: 50,
        speed: 7,
        color: '#90e0ef',
        effect: 'freeze'
    },

    {
        id: 'honeyCow',
        name: 'Honeycomb Cow',
        emoji: '🍯',
        cost: 400,
        hp: 210,
        desc: '+110 Milk/5s',
        role: 'milk',
        rate: 300,
        amount: 110
    },

    {
        id: 'nurseHeifer',
        name: 'Nurse Heifer',
        emoji: '💊',
        cost: 415,
        hp: 200,
        desc: 'Fast 3x3 Healing',
        role: 'healer',
        rate: 90,
        heal: 42
    },

    {
        id: 'diamondCow',
        name: 'Diamond Cow',
        emoji: '💎',
        cost: 435,
        hp: 220,
        desc: '+140 Milk/5s',
        role: 'milk',
        rate: 300,
        amount: 140
    },

    {
        id: 'boomerangOx',
        name: 'Boomerang Ox',
        emoji: '🪃',
        cost: 455,
        hp: 190,
        desc: 'Piercing Horn',
        role: 'shooter',
        rate: 95,
        dmg: 68,
        speed: 9,
        color: '#f4a261',
        piercing: true
    },

    {
        id: 'magmaBull',
        name: 'Magma Bull',
        emoji: '🌋',
        cost: 480,
        hp: 210,
        desc: 'Splash Fireball',
        role: 'shooter',
        rate: 110,
        dmg: 90,
        speed: 7,
        color: '#ff5400',
        effect: 'splash'
    },

    {
        id: 'sparkCalf',
        name: 'Spark Calf',
        emoji: '🔋',
        cost: 500,
        hp: 185,
        desc: 'Fast Mini Shock',
        role: 'shooter',
        rate: 55,
        dmg: 38,
        speed: 10,
        color: '#ffd166',
        effect: 'chain'
    },

    {
        id: 'thumperBull',
        name: 'Thumper Bull',
        emoji: '🔨',
        cost: 520,
        hp: 480,
        desc: 'Rapid Ground Slam',
        role: 'pounder',
        rate: 90,
        dmg: 95,
        radius: 165,
        push: 65
    },

    {
        id: 'venomHydraCow',
        name: 'Venom Hydra',
        emoji: '🐉',
        cost: 545,
        hp: 220,
        desc: 'Deadly Plague',
        role: 'shooter',
        rate: 65,
        dmg: 50,
        speed: 8,
        color: '#38b000',
        effect: 'superPoison'
    },

    {
        id: 'breezeHeifer',
        name: 'Breeze Heifer',
        emoji: '🍃',
        cost: 570,
        hp: 195,
        desc: 'Quick Row Gust',
        role: 'shooter',
        rate: 145,
        dmg: 55,
        speed: 11,
        color: '#95d5b2',
        effect: 'rowWind',
        piercing: true
    },

    {
        id: 'galeForceCow',
        name: 'Hurricane Cow',
        emoji: '🌀',
        cost: 600,
        hp: 210,
        desc: 'Full-Row Gale + Slow',
        role: 'shooter',
        rate: 170,
        dmg: 90,
        speed: 11,
        color: '#ade8f4',
        effect: 'superRowWind',
        piercing: true
    }

];

// END OF PART 3
// PART 4 CONTINUES THE COW ROSTER.
// ==========================================
// PART 4 — GAME WORLD, LANES & ALIEN WAVES
// ==========================================

const LANES = 5;
const LANE_HEIGHT = 100;
const GAME_WIDTH = 1600;
const GAME_HEIGHT = 500;

let aliens = [];
let cows = [];
let projectiles = [];
let particles = [];

let gameRunning = true;
let gameOver = false;
let currentWave = 1;
let maxWaves = 3;
let milk = 150;
let barnHP = 15;

let selectedCow = null;
let hoveredCow = null;

let waveTimer = 0;
let alienSpawnTimer = 0;

const laneY = [];

for (let i = 0; i < LANES; i++) {
    laneY.push(i * LANE_HEIGHT);
}

// Alien types
const alienTypes = {
    basic: {
        name: "Basic Alien",
        emoji: "👽",
        hp: 100,
        speed: 0.35,
        damage: 1,
        reward: 15
    },

    fast: {
        name: "Speed Alien",
        emoji: "👾",
        hp: 65,
        speed: 0.8,
        damage: 1,
        reward: 20
    },

    tank: {
        name: "Tank Alien",
        emoji: "👹",
        hp: 350,
        speed: 0.18,
        damage: 2,
        reward: 35
    },

    boss: {
        name: "UFO Commander",
        emoji: "🛸",
        hp: 1200,
        speed: 0.12,
        damage: 5,
        reward: 150
    }
};

// Create an alien
function spawnAlien(type = "basic", lane = null) {
    if (!gameRunning || gameOver) return;

    const alien = alienTypes[type];

    if (!alien) return;

    const chosenLane = lane === null
        ? Math.floor(Math.random() * LANES)
        : lane;

    aliens.push({
        type: type,
        x: GAME_WIDTH + 50,
        y: chosenLane * LANE_HEIGHT + 50,
        lane: chosenLane,
        hp: alien.hp,
        maxHp: alien.hp,
        speed: alien.speed,
        damage: alien.damage,
        reward: alien.reward,
        attackCooldown: 0,
        emoji: alien.emoji,
        alive: true
    });
}

// Spawn waves
function startWave() {
    if (gameOver) return;

    waveTimer = 0;
    alienSpawnTimer = 0;

    if (currentWave === 1) {
        spawnAlien("basic", 2);
    }

    if (currentWave === 2) {
        spawnAlien("basic", 0);
        spawnAlien("fast", 3);
    }

    if (currentWave === 3) {
        spawnAlien("tank", 2);
        spawnAlien("fast", 1);
        spawnAlien("boss", 4);
    }
}

// Alien movement
function updateAliens(delta) {
    aliens.forEach(alien => {
        if (!alien.alive) return;

        let blockingCow = cows.find(cow =>
            cow.lane === alien.lane &&
            cow.x < alien.x &&
            cow.x + 55 > alien.x - 15 &&
            cow.alive
        );

        if (blockingCow) {
            alien.attackCooldown -= delta;

            if (alien.attackCooldown <= 0) {
                blockingCow.hp -= alien.damage;
                alien.attackCooldown = 60;

                if (blockingCow.hp <= 0) {
                    blockingCow.alive = false;
                }
            }
        } else {
            alien.x -= alien.speed * delta;
        }

        if (alien.x < 35) {
            barnHP -= alien.damage;
            alien.alive = false;

            updateHUD();

            if (barnHP <= 0) {
                endGame(false);
            }
        }
    });

    aliens = aliens.filter(alien => alien.alive);
}

// Alien damage
function damageAlien(alien, damage) {
    if (!alien || !alien.alive) return;

    alien.hp -= damage;

    if (alien.hp <= 0) {
        alien.alive = false;
        milk += alien.reward;

        updateHUD();
    }
}

// Draw aliens
function drawAliens() {
    aliens.forEach(alien => {
        if (!alien.alive) return;

        ctx.font = "38px Arial";
        ctx.textAlign = "center";
        ctx.fillText(alien.emoji, alien.x, alien.y + 12);

        // Health bar
        const barWidth = 45;
        const healthPercent = Math.max(0, alien.hp / alien.maxHp);

        ctx.fillStyle = "#222";
        ctx.fillRect(alien.x - 23, alien.y - 27, barWidth, 6);

        ctx.fillStyle = "#ff4444";
        ctx.fillRect(
            alien.x - 23,
            alien.y - 27,
            barWidth * healthPercent,
            6
        );
    });
}

// ==========================================
// END PART 4
// ==========================================// ==========================================
// PART 5 — COW PLACEMENT & DEFENSE SYSTEM
// ==========================================

// Cow types
const cowTypes = {
    basic: {
        name: "Milk Shooter",
        emoji: "🐄",
        cost: 50,
        hp: 100,
        damage: 25,
        fireRate: 100,
        range: 650,
        description: "Shoots milk at aliens."
    },

    sunflower: {
        name: "Milk Producer",
        emoji: "🌻",
        cost: 75,
        hp: 90,
        production: 25,
        productionRate: 500,
        description: "Produces extra milk."
    },

    wall: {
        name: "Tank Cow",
        emoji: "🐮",
        cost: 75,
        hp: 600,
        description: "Blocks alien attacks."
    },

    sniper: {
        name: "Sniper Cow",
        emoji: "🎯",
        cost: 125,
        hp: 100,
        damage: 100,
        fireRate: 220,
        range: 1400,
        description: "Deals heavy damage."
    },

    explosive: {
        name: "Bomb Cow",
        emoji: "💣",
        cost: 150,
        hp: 100,
        damage: 200,
        range: 150,
        description: "Explodes near aliens."
    },

    rapid: {
        name: "Rapid Cow",
        emoji: "🐂",
        cost: 100,
        hp: 110,
        damage: 12,
        fireRate: 35,
        range: 550,
        description: "Fires milk rapidly."
    }
};

// Create shop cards
function createShop() {
    const shop = document.getElementById("shop-bar");

    if (!shop) return;

    shop.innerHTML = "";

    Object.entries(cowTypes).forEach(([key, cow]) => {
        const card = document.createElement("div");

        card.className = "cow-card";
        card.dataset.type = key;

        card.innerHTML = `
            <div class="emoji">${cow.emoji}</div>
            <div class="name">${cow.name}</div>
            <div class="cost">🥛 ${cow.cost}</div>
            <div class="desc">${cow.description}</div>
        `;

        card.addEventListener("click", () => {
            if (milk < cow.cost) return;

            selectedCow = key;

            document.querySelectorAll(".cow-card").forEach(item => {
                item.classList.remove("selected");
            });

            card.classList.add("selected");
        });

        shop.appendChild(card);
    });
}

// Place a cow
function placeCow(mouseX, mouseY) {
    if (!selectedCow || !gameRunning || gameOver) return;

    const type = cowTypes[selectedCow];

    if (!type || milk < type.cost) return;

    const lane = Math.floor(mouseY / LANE_HEIGHT);

    if (lane < 0 || lane >= LANES) return;

    if (mouseX < 80 || mouseX > GAME_WIDTH - 70) return;

    const snappedX = Math.floor(mouseX / 80) * 80;

    // Prevent overlapping cows
    const occupied = cows.some(cow =>
        cow.alive &&
        cow.lane === lane &&
        Math.abs(cow.x - snappedX) < 60
    );

    if (occupied) return;

    milk -= type.cost;

    const newCow = {
        type: selectedCow,
        name: type.name,
        emoji: type.emoji,
        x: snappedX,
        y: lane * LANE_HEIGHT + 50,
        lane: lane,
        hp: type.hp,
        maxHp: type.hp,
        damage: type.damage || 0,
        fireRate: type.fireRate || 0,
        range: type.range || 0,
        cooldown: 0,
        production: type.production || 0,
        productionRate: type.productionRate || 0,
        productionCooldown: 0,
        alive: true
    };

    cows.push(newCow);

    updateHUD();
}

// Canvas click placement
canvas.addEventListener("click", event => {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    placeCow(mouseX, mouseY);
});

// Cow shooting
function updateCows(delta) {
    cows.forEach(cow => {
        if (!cow.alive) return;

        // Milk production
        if (cow.production > 0) {
            cow.productionCooldown -= delta;

            if (cow.productionCooldown <= 0) {
                milk += cow.production;
                cow.productionCooldown = cow.productionRate;

                updateHUD();
            }
        }

        // Shooting
        if (cow.damage > 0 && cow.fireRate > 0) {
            cow.cooldown -= delta;

            if (cow.cooldown <= 0) {
                const target = aliens.find(alien =>
                    alien.alive &&
                    alien.lane === cow.lane &&
                    alien.x > cow.x &&
                    alien.x - cow.x <= cow.range
                );

                if (target) {
                    projectiles.push({
                        x: cow.x + 25,
                        y: cow.y - 5,
                        target: target,
                        speed: 7,
                        damage: cow.damage,
                        alive: true
                    });

                    cow.cooldown = cow.fireRate;
                }
            }
        }
    });

    cows = cows.filter(cow => cow.alive);
}

// Draw cows
function drawCows() {
    cows.forEach(cow => {
        if (!cow.alive) return;

        ctx.font = "38px Arial";
        ctx.textAlign = "center";
        ctx.fillText(cow.emoji, cow.x + 25, cow.y + 12);

        // Health bar
        const percent = Math.max(0, cow.hp / cow.maxHp);

        ctx.fillStyle = "#222";
        ctx.fillRect(cow.x + 2, cow.y - 25, 45, 6);

        ctx.fillStyle = "#44dd66";
        ctx.fillRect(cow.x + 2, cow.y - 25, 45 * percent, 6);
    });
}

// ==========================================
// END PART 5
// ==========================================// ==========================================
// PART 6 — PROJECTILES, COMBAT & REFUNDS
// ==========================================

// Update projectiles
function updateProjectiles(delta) {
    projectiles.forEach(projectile => {
        if (!projectile.alive) return;

        const target = projectile.target;

        // Target no longer exists
        if (!target || !target.alive) {
            projectile.alive = false;
            return;
        }

        const dx = target.x - projectile.x;
        const dy = target.y - projectile.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 18) {
            damageAlien(target, projectile.damage);

            createParticles(
                projectile.x,
                projectile.y,
                "#a8eaff",
                5
            );

            projectile.alive = false;
            return;
        }

        const speed = projectile.speed * delta;

        projectile.x += (dx / distance) * speed;
        projectile.y += (dy / distance) * speed;
    });

    projectiles = projectiles.filter(projectile => projectile.alive);
}

// Draw projectiles
function drawProjectiles() {
    projectiles.forEach(projectile => {
        if (!projectile.alive) return;

        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, 8, 0, Math.PI * 2);

        ctx.fillStyle = "#a8eaff";
        ctx.shadowColor = "#55ccff";
        ctx.shadowBlur = 12;

        ctx.fill();

        ctx.shadowBlur = 0;
    });
}

// Explosion system
function createExplosion(x, y, radius, damage) {
    aliens.forEach(alien => {
        if (!alien.alive) return;

        const distance = Math.hypot(
            alien.x - x,
            alien.y - y
        );

        if (distance <= radius) {
            damageAlien(alien, damage);
        }
    });

    createParticles(x, y, "#ff9933", 25);
}

// Particle creation
function createParticles(x, y, color, amount) {
    for (let i = 0; i < amount; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            life: 30 + Math.random() * 20,
            color: color,
            size: 2 + Math.random() * 5
        });
    }
}

// Update particles
function updateParticles(delta) {
    particles.forEach(particle => {
        particle.x += particle.vx * delta / 16;
        particle.y += particle.vy * delta / 16;
        particle.life -= delta / 16;
    });

    particles = particles.filter(particle => particle.life > 0);
}

// Draw particles
function drawParticles() {
    particles.forEach(particle => {
        ctx.globalAlpha = Math.min(1, particle.life / 30);

        ctx.fillStyle = particle.color;

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });

    ctx.globalAlpha = 1;
}

// Refund cow with S key
function refundCow() {
    if (!hoveredCow || !hoveredCow.alive) return;

    const cow = hoveredCow;
    const originalType = cowTypes[cow.type];

    if (!originalType) return;

    const refund = Math.floor(originalType.cost * 0.5);

    milk += refund;

    cow.alive = false;

    createParticles(
        cow.x + 25,
        cow.y,
        "#ffd166",
        12
    );

    hoveredCow = null;

    updateHUD();
}

// Keyboard controls
document.addEventListener("keydown", event => {
    if (event.key.toLowerCase() === "s") {
        refundCow();
    }
});

// Track mouse position over cows
canvas.addEventListener("mousemove", event => {
    const rect = canvas.getBoundingClientRect();

    const mouseX =
        (event.clientX - rect.left) *
        (canvas.width / rect.width);

    const mouseY =
        (event.clientY - rect.top) *
        (canvas.height / rect.height);

    hoveredCow = cows.find(cow =>
        cow.alive &&
        mouseX >= cow.x &&
        mouseX <= cow.x + 50 &&
        mouseY >= cow.y - 35 &&
        mouseY <= cow.y + 20
    ) || null;

    canvas.style.cursor = hoveredCow ? "pointer" : "crosshair";
});

// Bomb Cow behavior
function updateExplosiveCows() {
    cows.forEach(cow => {
        if (!cow.alive || cow.type !== "explosive") return;

        const target = aliens.find(alien =>
            alien.alive &&
            alien.lane === cow.lane &&
            Math.abs(alien.x - cow.x) < 90
        );

        if (target) {
            createExplosion(
                cow.x + 25,
                cow.y,
                150,
                cow.damage
            );

            cow.alive = false;
        }
    });

    cows = cows.filter(cow => cow.alive);
}

// ==========================================
// END PART 6
// ==========================================// ==========================================
// PART 7 — MAIN GAME LOOP & BATTLEFIELD
// ==========================================

// Game timing
let lastFrameTime = 0;
let animationFrame = null;
let waveComplete = false;
let waveDelay = 0;
let aliensSpawned = 0;

// Wave configuration
const waveSettings = {
    1: {
        count: 8,
        interval: 2200,
        types: ["basic"]
    },

    2: {
        count: 15,
        interval: 1700,
        types: ["basic", "fast"]
    },

    3: {
        count: 22,
        interval: 1300,
        types: ["basic", "fast", "tank", "boss"]
    }
};

// Battlefield background
function drawBattlefield() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Background
    ctx.fillStyle = "#77b85b";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Five lanes
    for (let i = 0; i < LANES; i++) {
        const y = i * LANE_HEIGHT;

        ctx.fillStyle = i % 2 === 0
            ? "#83c96b"
            : "#70b75a";

        ctx.fillRect(0, y, GAME_WIDTH, LANE_HEIGHT);

        // Lane borders
        ctx.strokeStyle = "rgba(40, 90, 35, 0.3)";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(0, y + LANE_HEIGHT);
        ctx.lineTo(GAME_WIDTH, y + LANE_HEIGHT);
        ctx.stroke();

        // Grass decorations
        for (let x = 40; x < GAME_WIDTH; x += 120) {
            ctx.fillStyle = "rgba(30, 100, 30, 0.12)";
            ctx.fillRect(
                x + (i % 2) * 40,
                y + 15,
                3,
                12
            );
        }
    }

    // Barn
    ctx.fillStyle = "#a65e32";
    ctx.fillRect(0, 0, 65, GAME_HEIGHT);

    ctx.fillStyle = "#713b23";
    ctx.fillRect(0, 0, 65, GAME_HEIGHT);

    ctx.font = "35px Arial";
    ctx.textAlign = "center";

    for (let i = 0; i < LANES; i++) {
        ctx.fillText("🏠", 32, i * LANE_HEIGHT + 58);
    }

    // Right-side alien entrance
    ctx.fillStyle = "rgba(80, 20, 100, 0.12)";
    ctx.fillRect(1510, 0, 90, GAME_HEIGHT);
}

// Grid preview
function drawPlacementPreview() {
    if (!selectedCow || gameOver) return;

    const type = cowTypes[selectedCow];

    if (!type) return;

    if (milk < type.cost) return;

    const mouse = lastMousePosition;

    if (!mouse) return;

    const lane = Math.floor(mouse.y / LANE_HEIGHT);

    if (lane < 0 || lane >= LANES) return;

    const snappedX = Math.floor(mouse.x / 80) * 80;

    const occupied = cows.some(cow =>
        cow.alive &&
        cow.lane === lane &&
        Math.abs(cow.x - snappedX) < 60
    );

    ctx.globalAlpha = 0.4;

    ctx.font = "38px Arial";
    ctx.textAlign = "center";

    ctx.fillStyle = occupied ? "#ff4444" : "#ffffff";

    ctx.fillText(
        type.emoji,
        snappedX + 25,
        lane * LANE_HEIGHT + 62
    );

    ctx.globalAlpha = 1;
}

// Mouse tracking for placement preview
let lastMousePosition = null;

canvas.addEventListener("mousemove", event => {
    const rect = canvas.getBoundingClientRect();

    lastMousePosition = {
        x: (event.clientX - rect.left) *
            (canvas.width / rect.width),

        y: (event.clientY - rect.top) *
            (canvas.height / rect.height)
    };
});

// Wave spawning
function updateWaveSystem(delta) {
    if (gameOver || !gameRunning) return;

    const settings = waveSettings[currentWave];

    if (!settings) {
        if (aliens.length === 0) {
            endGame(true);
        }

        return;
    }

    if (aliensSpawned < settings.count) {
        alienSpawnTimer -= delta;

        if (alienSpawnTimer <= 0) {
            const type = settings.types[
                Math.floor(Math.random() * settings.types.length)
            ];

            const lane = Math.floor(Math.random() * LANES);

            spawnAlien(type, lane);

            aliensSpawned++;
            alienSpawnTimer = settings.interval;
        }
    }

    // Check wave completion
    if (
        aliensSpawned >= settings.count &&
        aliens.length === 0
    ) {
        waveDelay += delta;

        if (waveDelay >= 3000) {
            if (currentWave < maxWaves) {
                currentWave++;

                aliensSpawned = 0;
                waveDelay = 0;
                alienSpawnTimer = 1000;

                updateHUD();
            } else {
                endGame(true);
            }
        }
    }
}

// Main rendering
function drawGame() {
    drawBattlefield();
    drawCows();
    drawAliens();
    drawProjectiles();
    drawParticles();
    drawPlacementPreview();
}

// Main update
function updateGame(delta) {
    if (!gameRunning || gameOver) return;

    updateWaveSystem(delta);
    updateAliens(delta);
    updateCows(delta);
    updateProjectiles(delta);
    updateExplosiveCows();
    updateParticles(delta);
}

// Main animation loop
function gameLoop(timestamp) {
    if (!gameRunning || gameOver) return;

    const delta = Math.min(
        timestamp - lastFrameTime || 16,
        50
    );

    lastFrameTime = timestamp;

    updateGame(delta);
    drawGame();

    animationFrame = requestAnimationFrame(gameLoop);
}

// Start game engine
function startGameEngine() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }

    lastFrameTime = 0;
    gameRunning = true;
    gameOver = false;

    animationFrame = requestAnimationFrame(gameLoop);
}

// ==========================================
// END PART 7
// ==========================================// ==========================================
// PART 8 — FINAL INTEGRATION
// ==========================================

// HUD elements
const milkDisplay = document.getElementById("milk-count");
const biomeDisplay = document.getElementById("biome-name");
const waveDisplay = document.getElementById("wave-count");
const maxWavesDisplay = document.getElementById("max-waves");
const barnDisplay = document.getElementById("barn-hp");

const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlaySub = document.getElementById("overlay-sub");
const restartButton = document.getElementById("restart-btn");

// Update HUD
function updateHUD() {
    milkDisplay.textContent = milk;
    biomeDisplay.textContent = "Green Pasture";
    waveDisplay.textContent = currentWave;
    maxWavesDisplay.textContent = maxWaves;
    barnDisplay.textContent = Math.max(0, barnHP);

    document.querySelectorAll(".cow-card").forEach(card => {
        const type = cowTypes[card.dataset.type];

        if (!type) return;

        card.classList.toggle("disabled", milk < type.cost);
    });
}

// End game
function endGame(won) {
    if (gameOver) return;

    gameOver = true;
    gameRunning = false;

    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }

    overlay.classList.remove("hidden");

    if (won) {
        overlayTitle.textContent = "🏆 Victory!";
        overlaySub.textContent =
            "You defended the barn and defeated the alien invasion!";
        restartButton.textContent = "Play Again";
    } else {
        overlayTitle.textContent = "👽 Barn Overrun!";
        overlaySub.textContent =
            "The aliens broke through your defenses!";
        restartButton.textContent = "Retry Current Biome";
    }
}

// Restart game
function restartGame() {
    milk = 150;
    barnHP = 15;

    currentWave = 1;
    aliensSpawned = 0;

    waveTimer = 0;
    waveDelay = 0;
    alienSpawnTimer = 1000;

    cows = [];
    aliens = [];
    projectiles = [];
    particles = [];

    selectedCow = null;
    hoveredCow = null;

    document.querySelectorAll(".cow-card").forEach(card => {
        card.classList.remove("selected");
    });

    overlay.classList.add("hidden");

    updateHUD();

    startGameEngine();
}

// Restart button
restartButton.addEventListener("click", restartGame);

// Keyboard shortcuts
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        selectedCow = null;

        document.querySelectorAll(".cow-card").forEach(card => {
            card.classList.remove("selected");
        });
    }
});

// Initialize game
function initializeGame() {
    createShop();

    updateHUD();

    drawGame();

    startGameEngine();
}

// Wait for page to load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGame);
} else {
    initializeGame();
}

// ==========================================
// END PART 8 — GAME COMPLETE
// ==========================================
