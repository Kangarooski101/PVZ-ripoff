const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 100;
const ROWS = 5;
const COLS = 11;

let biomeIndex = 0;
let waveInBiome = 1;
let milk = 150;
let barnHp = 5;
let frame = 0;
let gameOver = false;
let selectedCowType = 'dairy';
let hoverCol = -1;
let hoverRow = -1;

let cows = new Array();
let aliens = new Array();
let projectiles = new Array();
let alienProjectiles = new Array();
let floatingTexts = new Array();

let aliensToSpawn = 0;
let spawnTimer = 0;
let waveCooldown = 180;

const BIOMES = new Array(
    { name: 'Green Pasture', light: '#52b788', dark: '#40916c', waves: 3, boss: 'mothershipBoss', waterCols: new Array() },
    { name: 'Scorched Desert', light: '#e9c46a', dark: '#d4a373', waves: 4, boss: 'warlordBoss', waterCols: new Array() },
    { name: 'River Crossing', light: '#74c69d', dark: '#52b788', waves: 5, boss: 'hydraBoss', waterCols: new Array(5) },
    { name: 'Frozen Tundra', light: '#90e0ef', dark: '#48cae4', waves: 6, boss: 'cryoTitanBoss', waterCols: new Array(4, 7) },
    { name: 'Swamp Marsh', light: '#606c38', dark: '#4a572a', waves: 7, boss: 'plagueQueenBoss', waterCols: new Array(3, 6) },
    { name: 'Volcanic Core', light: '#9b2226', dark: '#6a040f', waves: 8, boss: 'overlordBoss', waterCols: new Array(5, 8) },
    { name: 'Cosmic Void', light: '#3c096c', dark: '#240046', waves: 9, boss: 'galacticEmperorBoss', waterCols: new Array(4, 6, 8) }
);

const COW_LIST = new Array(
    { id: 'tinyCalf', name: 'Tiny Calf', emoji: '🍼', cost: 35, hp: 70, desc: '+15 Milk/4s', role: 'milk', rate: 240, amount: 15 },
    { id: 'dairy', name: 'Dairy Cow', emoji: '🐄', cost: 50, hp: 100, desc: '+25 Milk/5s', role: 'milk', rate: 300, amount: 25 },
    { id: 'hayOx', name: 'Hay Bale Ox', emoji: '🌾', cost: 60, hp: 280, desc: 'Cheap Starter Wall', role: 'wall', thorns: 0.15 },
    { id: 'pebbleCow', name: 'Pebble Spitter', emoji: '🪨', cost: 75, hp: 100, desc: 'Fast Light Shot', role: 'shooter', rate: 65, dmg: 16, speed: 7, color: '#d6ccc2' },
    { id: 'spikyBull', name: 'Spiky Bull', emoji: '🐂', cost: 85, hp: 480, desc: 'Tank + Thorn Dmg', role: 'wall', thorns: 0.5 },
    { id: 'milkShooter', name: 'Milk Shooter', emoji: '🐮', cost: 100, hp: 120, desc: 'Basic Milk Shot', role: 'shooter', rate: 85, dmg: 25, speed: 6, color: '#ffffff' },
    { id: 'stompCalf', name: 'Stomp Calf', emoji: '🐾', cost: 115, hp: 160, desc: 'Ground Pound Push', role: 'pounder', rate: 130, dmg: 28, radius: 130, push: 55 },
    { id: 'boomBovine', name: 'Boom Bovine', emoji: '💣', cost: 125, hp: 90, desc: '3x3 Blast', role: 'bomb', fuse: 65, dmg: 350, radius: 150 },
    { id: 'frostCow', name: 'Frost Cow', emoji: '🧊', cost: 135, hp: 120, desc: 'Slows Aliens', role: 'shooter', rate: 95, dmg: 22, speed: 6, color: '#00b4d8', effect: 'slow' },
    { id: 'medicCow', name: 'Medic Cow', emoji: '🩺', cost: 140, hp: 140, desc: 'Heals 3x3 Herd', role: 'healer', rate: 120, heal: 24 },
    { id: 'viperCow', name: 'Viper Cow', emoji: '🐍', cost: 150, hp: 120, desc: 'Poison Spit', role: 'shooter', rate: 90, dmg: 18, speed: 6, color: '#80ed99', effect: 'poison' },
    { id: 'gatlingCow', name: 'Gatling Calf', emoji: '🔫', cost: 165, hp: 110, desc: 'Rapid Low Dmg', role: 'shooter', rate: 24, dmg: 10, speed: 9, color: '#ffd166' },
    { id: 'goldenCow', name: 'Golden Cow', emoji: '👑', cost: 180, hp: 150, desc: '+60 Milk/5.5s', role: 'milk', rate: 330, amount: 60 },
    { id: 'windCow', name: 'Wind Cow', emoji: '🌪️', cost: 195, hp: 130, desc: 'Full-Row Knockback', role: 'shooter', rate: 190, dmg: 30, speed: 10, color: '#caf0f8', effect: 'rowWind', piercing: true },
    { id: 'sniperBull', name: 'Sniper Bull', emoji: '🎯', cost: 215, hp: 120, desc: 'High Dmg Shot', role: 'shooter', rate: 160, dmg: 125, speed: 13, color: '#ff006e' },
    { id: 'teslaCow', name: 'Tesla Cow', emoji: '⚡', cost: 245, hp: 140, desc: 'Chain Lightning', role: 'shooter', rate: 105, dmg: 40, speed: 8, color: '#c77dff', effect: 'chain' },
    { id: 'ironOx', name: 'Iron Ox', emoji: '🛡️', cost: 270, hp: 1100, desc: 'Heavy Thorn Wall', role: 'wall', thorns: 1.1 },
    { id: 'cyberCow', name: 'Cyber Cow', emoji: '🛸', cost: 300, hp: 180, desc: 'Plasma Rapid', role: 'shooter', rate: 32, dmg: 30, speed: 11, color: '#00f5d4' },
    { id: 'quakeOx', name: 'Earthquake Ox', emoji: '🦏', cost: 320, hp: 420, desc: 'Heavy Slam + Push', role: 'pounder', rate: 115, dmg: 75, radius: 170, push: 75 },
    { id: 'megaBombCow', name: 'Mega Nuke Cow', emoji: '☢️', cost: 340, hp: 110, desc: '5x5 Huge Blast', role: 'bomb', fuse: 135, dmg: 950, radius: 260 },
    { id: 'blizzardCow', name: 'Blizzard Bull', emoji: '❄️', cost: 380, hp: 170, desc: 'Freezes Enemies', role: 'shooter', rate: 125, dmg: 45, speed: 7, color: '#90e0ef', effect: 'freeze' },
    { id: 'diamondCow', name: 'Diamond Cow', emoji: '💎', cost: 430, hp: 200, desc: '+130 Milk/5s', role: 'milk', rate: 300, amount: 130 },
    { id: 'magmaBull', name: 'Magma Bull', emoji: '🌋', cost: 480, hp: 200, desc: 'Splash Fireball', role: 'shooter', rate: 110, dmg: 85, speed: 7, color: '#ff5400', effect: 'splash' },
    { id: 'venomHydraCow', name: 'Venom Hydra', emoji: '🐉', cost: 540, hp: 210, desc: 'Deadly Plague', role: 'shooter', rate: 65, dmg: 45, speed: 8, color: '#38b000', effect: 'superPoison' },
    { id: 'galeForceCow', name: 'Hurricane Cow', emoji: '🌀', cost: 600, hp: 200, desc: 'Full-Row Gale + Slow', role: 'shooter', rate: 170, dmg: 85, speed: 11, color: '#ade8f4', effect: 'superRowWind', piercing: true },
    { id: 'laserMinotaur', name: 'Laser Minotaur', emoji: '🤖', cost: 680, hp: 260, desc: 'Heavy Beam', role: 'shooter', rate: 55, dmg: 75, speed: 14, color: '#ffbe0b' },
    { id: 'obsidianWall', name: 'Obsidian Ox', emoji: '🪨', cost: 750, hp: 2400, desc: 'Titan Spike Wall', role: 'wall', thorns: 2.2 },
    { id: 'railgunCow', name: 'Railgun Cow', emoji: '🔭', cost: 840, hp: 220, desc: '320 Dmg Slug', role: 'shooter', rate: 145, dmg: 320, speed: 16, color: '#f72585' },
    { id: 'astralCow', name: 'Astral Cow', emoji: '🔮', cost: 930, hp: 260, desc: '+280 Milk/5s', role: 'milk', rate: 300, amount: 280 },
    { id: 'stormBringer', name: 'Storm Bringer', emoji: '⛈️', cost: 1050, hp: 260, desc: 'Mega Chain Bolt', role: 'shooter', rate: 75, dmg: 120, speed: 10, color: '#e0aaff', effect: 'chain' },
    { id: 'doomBovine', name: 'Doomsday Cow', emoji: '☄️', cost: 1200, hp: 160, desc: 'Map-Wide Meteor', role: 'bomb', fuse: 180, dmg: 2200, radius: 550 },
    { id: 'hyperGatling', name: 'Hyper Gatling', emoji: '🔥', cost: 1500, hp: 280, desc: 'Ultra Rapid Heavy', role: 'shooter', rate: 14, dmg: 65, speed: 13, color: '#ff9f1c' },
    { id: 'cryoEmperor', name: 'Cryo Emperor', emoji: '🧊', cost: 1700, hp: 300, desc: 'Rapid Ice Freeze', role: 'shooter', rate: 55, dmg: 110, speed: 10, color: '#00f5d4', effect: 'freeze' },
    { id: 'starForgeCow', name: 'Star Forge Cow', emoji: '🌟', cost: 1950, hp: 340, desc: '+550 Milk/5s', role: 'milk', rate: 300, amount: 550 },
    { id: 'chronosCow', name: 'Chronos Cow', emoji: '⏳', cost: 2200, hp: 320, desc: 'Time Freeze + Push', role: 'shooter', rate: 95, dmg: 180, speed: 11, color: '#ffd166', effect: 'superRowWind', piercing: true },
    { id: 'archangelMedic', name: 'Archangel Doc', emoji: '👼', cost: 2500, hp: 95, desc: 'Heals ALL Cows (Fragile)', role: 'globalHealer', rate: 100, heal: 45 },
    { id: 'plasmaTitan', name: 'Plasma Titan', emoji: '🚀', cost: 2900, hp: 420, desc: 'Splash Heavy Cannon', role: 'shooter', rate: 40, dmg: 190, speed: 13, color: '#00bbf9', effect: 'splash' },
    { id: 'quakeTitan', name: 'Quake Titan', emoji: '🌋', cost: 3150, hp: 1200, desc: 'Massive Ground Slam', role: 'pounder', rate: 95, dmg: 280, radius: 240, push: 95 },
    { id: 'voidReaperCow', name: 'Void Reaper', emoji: '🌑', cost: 3400, hp: 450, desc: '550 Dmg Dark Orb', role: 'shooter', rate: 55, dmg: 550, speed: 14, color: '#9d4edd' },
    { id: 'celestialBull', name: 'Celestial Bull', emoji: '🔱', cost: 4000, hp: 5500, desc: 'Godly Thorn Tank', role: 'wall', thorns: 5.5 },
    { id: 'omegaGalaxyCow', name: 'Omega Galaxy', emoji: '🌌', cost: 5000, hp: 600, desc: 'Ultimate Rapid Beam', role: 'shooter', rate: 12, dmg: 220, speed: 16, color: '#ff007f', effect: 'chain' },
    { id: 'supernovaCow', name: 'Supernova Cow', emoji: '💥', cost: 6500, hp: 700, desc: 'Piercing Star Beam', role: 'shooter', rate: 22, dmg: 420, speed: 18, color: '#ffbe0b', piercing: true },
    { id: 'infinityBull', name: 'Infinity Bull', emoji: '♾️', cost: 8000, hp: 12000, desc: 'Immortal Thorn Wall', role: 'wall', thorns: 12.0 },
    { id: 'nebulaBanker', name: 'Nebula Banker', emoji: '🪐', cost: 9000, hp: 800, desc: '+1800 Milk/5s', role: 'milk', rate: 300, amount: 1800 },
    { id: 'chronoGodCow', name: 'Chrono-God Cow', emoji: '👑', cost: 10000, hp: 1000, desc: 'Map-Shatter Rapid', role: 'shooter', rate: 10, dmg: 600, speed: 20, color: '#00f5d4', effect: 'chain' }
);

const COW_MAP = {};
COW_LIST.forEach(c => { COW_MAP[c.id] = c; });

const ALIEN_TYPES = {
    grunt: { emoji: '👽', hp: 120, speed: 0.55, dmg: 0.4, reward: 25, size: 38 },
    runner: { emoji: '👾', hp: 85, speed: 1.3, dmg: 0.35, reward: 30, size: 36 },
    brute: { emoji: '👹', hp: 380, speed: 0.35, dmg: 0.85, reward: 65, size: 46 },
    blaster: { emoji: '🔫', hp: 160, speed: 0.45, dmg: 0.3, reward: 50, size: 40, isRanged: true, fireRate: 145, shotDmg: 20 },
    charger: { emoji: '🦏', hp: 240, speed: 1.65, dmg: 1.2, reward: 60, size: 44, isCharger: true },
    ghost: { emoji: '👻', hp: 150, speed: 0.68, dmg: 0.55, reward: 55, size: 40, isGhost: true },
    phaseShifter: { emoji: '🌀', hp: 320, speed: 0.62, dmg: 0.7, reward: 85, size: 42, isPhaseShifter: true },
    juggernaut: { emoji: '🦾', hp: 850, speed: 0.42, dmg: 1.5, reward: 110, size: 52 },
    juggernaut: { emoji: '🦾', hp: 850, speed: 0.42, dmg: 1.5, reward: 110, size: 52 },
    mothershipBoss: { emoji: '🛸', hp: 1500, speed: 0.2, dmg: 1.5, reward: 300, size: 64, isBoss: true, bossType: 'spawner' },
    warlordBoss: { emoji: '🧙', hp: 2400, speed: 0.25, dmg: 1.9, reward: 450, size: 64, isBoss: true, bossType: 'teleporter' },
    hydraBoss: { emoji: '🐙', hp: 3800, speed: 0.22, dmg: 2.2, reward: 650, size: 66, isBoss: true, bossType: 'waterSpawn' },
    cryoTitanBoss: { emoji: '🥶', hp: 5600, speed: 0.2, dmg: 2.5, reward: 900, size: 68, isBoss: true, bossType: 'freezer' },
    plagueQueenBoss: { emoji: '🦂', hp: 8200, speed: 0.24, dmg: 2.8, reward: 1200, size: 68, isBoss: true, bossType: 'venomMist' },
    overlordBoss: { emoji: '🐲', hp: 12000, speed: 0.22, dmg: 3.3, reward: 1600, size: 70, isBoss: true, bossType: 'overlord' },
    galacticEmperorBoss: { emoji: '👾', hp: 18000, speed: 0.25, dmg: 4.0, reward: 2500, size: 74, isBoss: true, bossType: 'emperor' }
};

const milkEl = document.getElementById('milk-count');
const biomeEl = document.getElementById('biome-name');
const waveEl = document.getElementById('wave-count');
const maxWavesEl = document.getElementById('max-waves');
const barnHpEl = document.getElementById('barn-hp');
const shopBar = document.getElementById('shop-bar');
const overlay = document.getElementById('overlay');
const restartBtn = document.getElementById('restart-btn');

COW_LIST.forEach(cow => {
    const btn = document.createElement('button');
    btn.className = 'cow-card' + (cow.id === selectedCowType ? ' selected' : '');
    btn.dataset.type = cow.id;
    btn.dataset.cost = cow.cost;
    btn.innerHTML = '<span class="emoji">' + cow.emoji + '</span>' +
        '<span class="name">' + cow.name + '</span>' +
        '<span class="cost">' + cow.cost + ' 🥛</span>' +
        '<span class="desc">' + cow.desc + '</span>';

    btn.addEventListener('click', () => {
        document.querySelectorAll('.cow-card').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        selectedCowType = cow.id;
    });
    shopBar.appendChild(btn);
});

restartBtn.addEventListener('click', restartCurrentBiome);

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    hoverCol = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    hoverRow = Math.floor((e.clientY - rect.top) / CELL_SIZE);
});

canvas.addEventListener('mouseleave', () => {
    hoverCol = -1;
    hoverRow = -1;
});

window.addEventListener('keydown', (e) => {
    if (gameOver) return;
    if (e.key === 's' || e.key === 'S') {
        const idx = cows.findIndex(c => c.col === hoverCol && c.row === hoverRow);
        if (idx !== -1) {
            const removedCow = cows[idx];
            const refund = Math.floor(COW_MAP[removedCow.type].cost * 0.5);
            milk += refund;
            addFloatingText('🪏 +' + refund + ' 🥛', removedCow.x, removedCow.y - 20, '#ffd166');
            cows.splice(idx, 1);
            updateHUD();
        }
    }
});

canvas.addEventListener('click', (e) => {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const row = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return;

    if (BIOMES[biomeIndex].waterCols.includes(col)) {
        addFloatingText('🌊 Water! Cannot Place Here', col * CELL_SIZE + 50, row * CELL_SIZE + 50, '#90e0ef');
        return;
    }

    if (cows.some(c => c.col === col && c.row === row)) return;

    const blueprint = COW_MAP[selectedCowType];
    if (milk >= blueprint.cost) {
        milk -= blueprint.cost;
        cows.push({
            type: selectedCowType,
            col: col,
            row: row,
            x: col * CELL_SIZE + CELL_SIZE / 2,
            y: row * CELL_SIZE + CELL_SIZE / 2,
            hp: blueprint.hp,
            maxHp: blueprint.hp,
            timer: 0,
            frozenTimer: 0
        });
        updateHUD();
    }
});

function startWave() {
    aliensToSpawn = 5 + (biomeIndex * 4) + (waveInBiome * 2);
    spawnTimer = 55;
}

function spawnAlien() {
    const row = Math.floor(Math.random() * ROWS);
    const currentBiome = BIOMES[biomeIndex];
    let typeKey = 'grunt';

    if (waveInBiome === currentBiome.waves && aliensToSpawn === 1) {
        typeKey = currentBiome.boss;
    } else {
        const rand = Math.random();
        if (biomeIndex === 0 && waveInBiome === 1) {
            typeKey = rand > 0.75 ? 'runner' : 'grunt';
        } else {
            if (biomeIndex >= 2 && rand > 0.89) typeKey = 'juggernaut';
            else if (biomeIndex >= 2 && rand > 0.78) typeKey = 'phaseShifter';
            else if (rand > 0.67) typeKey = 'ghost';
            else if (rand > 0.54) typeKey = 'charger';
            else if (rand > 0.41) typeKey = 'blaster';
            else if (rand > 0.26) typeKey = 'brute';
            else if (rand > 0.13) typeKey = 'runner';
        }
    }

    const template = ALIEN_TYPES[typeKey];
    const hpScale = 1 + (biomeIndex * 0.55) + ((waveInBiome - 1) * 0.15);
    const speedScale = 1 + (biomeIndex * 0.08);

    aliens.push(Object.assign({}, template, {
        typeKey: typeKey,
        row: row,
        x: canvas.width + 40,
        y: row * CELL_SIZE + CELL_SIZE / 2,
        speed: template.speed * speedScale,
        hp: Math.round(template.hp * hpScale),
        maxHp: Math.round(template.hp * hpScale),
        abilityTimer: 0,
        slowTimer: 0,
        freezeTimer: 0,
        poisonTimer: 0,
        charged: false
    }));
}

function addFloatingText(text, x, y, color = '#ffd166') {
    floatingTexts.push({ text: text, x: x, y: y, color: color, life: 45 });
}

function updateHUD() {
    milkEl.textContent = milk;
    biomeEl.textContent = BIOMES[biomeIndex].name;
    waveEl.textContent = waveInBiome;
    maxWavesEl.textContent = BIOMES[biomeIndex].waves;
    barnHpEl.textContent = barnHp;

    document.querySelectorAll('.cow-card').forEach(card => {
        const cost = Number(card.dataset.cost);
        card.classList.toggle('disabled', milk < cost);
    });
}
function damageAlien(alien, amount) {
    alien.hp -= amount;
    if (alien.isPhaseShifter && alien.hp > 0) {
        let newRow = Math.floor(Math.random() * ROWS);
        if (newRow === alien.row) newRow = (newRow + 1) % ROWS;
        alien.row = newRow;
        alien.y = alien.row * CELL_SIZE + CELL_SIZE / 2;
        addFloatingText('🌀 SHIFT!', alien.x, alien.y - 25, '#c77dff');
    }
}

function update() {
    if (gameOver) return;
    frame++;

    if (frame % 300 === 0) {
        milk += 25;
        addFloatingText('+25 🥛', 80, 40);
        updateHUD();
    }

    if (aliensToSpawn > 0) {
        spawnTimer--;
        if (spawnTimer <= 0) {
            spawnAlien();
            aliensToSpawn--;
            spawnTimer = Math.max(32, 120 - (biomeIndex * 10) - (waveInBiome * 5));
        }
    } else if (aliens.length === 0) {
        waveCooldown--;
        if (waveCooldown <= 0) {
            waveCooldown = 180;
            const totalWaves = BIOMES[biomeIndex].waves;
            if (waveInBiome < totalWaves) {
                waveInBiome++;
                startWave();
                updateHUD();
            } else {
                biomeIndex = (biomeIndex + 1) % BIOMES.length;
                waveInBiome = 1;
                milk += 200 + (biomeIndex * 100);
                barnHp = Math.min(5, barnHp + 2);

                const newWaterCols = BIOMES[biomeIndex].waterCols;
                for (let k = cows.length - 1; k >= 0; k--) {
                    if (newWaterCols.includes(cows[k].col)) {
                        milk += COW_MAP[cows[k].type].cost;
                        cows.splice(k, 1);
                    }
                }

                addFloatingText('NEW BIOME: ' + BIOMES[biomeIndex].name + ' (Herd Kept!)', 550, 250, '#00f5d4');
                startWave();
                updateHUD();
            }
        }
    }

    for (let i = cows.length - 1; i >= 0; i--) {
        const cow = cows[i];
        const stats = COW_MAP[cow.type];

        if (cow.frozenTimer > 0) {
            cow.frozenTimer--;
            continue;
        }

        cow.timer++;

        if (stats.role === 'milk' && cow.timer >= stats.rate) {
            milk += stats.amount;
            cow.timer = 0;
            addFloatingText('+' + stats.amount + ' 🥛', cow.x, cow.y - 20);
            updateHUD();
        } else if (stats.role === 'shooter' && cow.timer >= stats.rate) {
            const alienInRow = aliens.some(a => a.row === cow.row && a.x > cow.x);
            if (alienInRow) {
                projectiles.push({
                    x: cow.x + 25,
                    y: cow.y,
                    row: cow.row,
                    dmg: stats.dmg,
                    speed: stats.speed,
                    color: stats.color,
                    effect: stats.effect || null,
                    piercing: stats.piercing || false,
                    hitIds: new Array()
                });
                cow.timer = 0;
            }
        } else if (stats.role === 'pounder' && cow.timer >= stats.rate) {
            const nearby = aliens.filter(a => Math.abs(a.x - cow.x) <= stats.radius && Math.abs(a.y - cow.y) <= stats.radius);
            if (nearby.length > 0) {
                cow.timer = 0;
                nearby.forEach(a => {
                    damageAlien(a, stats.dmg);
                    a.x = Math.min(canvas.width - 20, a.x + stats.push);
                });
                addFloatingText('💥 POUND!', cow.x, cow.y - 25, '#f4a261');
            }
        } else if (stats.role === 'healer' && cow.timer >= stats.rate) {
            cow.timer = 0;
            cows.forEach(ally => {
                if (Math.abs(ally.col - cow.col) <= 1 && Math.abs(ally.row - cow.row) <= 1) {
                    ally.hp = Math.min(ally.maxHp, ally.hp + stats.heal);
                }
            });
            addFloatingText('💚 Heal', cow.x, cow.y - 20, '#80ed99');
        } else if (stats.role === 'globalHealer' && cow.timer >= stats.rate) {
            cow.timer = 0;
            cows.forEach(ally => {
                ally.hp = Math.min(ally.maxHp, ally.hp + stats.heal);
            });
            addFloatingText('👼 Herd Heal!', cow.x, cow.y - 20, '#ffd166');
        } else if (stats.role === 'bomb' && cow.timer >= stats.fuse) {
            aliens.forEach(a => {
                if (Math.abs(a.x - cow.x) <= stats.radius && Math.abs(a.y - cow.y) <= stats.radius) {
                    damageAlien(a, stats.dmg);
                }
            });
            addFloatingText('💥 BOOM!', cow.x, cow.y, '#ff595e');
            cows.splice(i, 1);
        }
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.speed;

        if (p.x > canvas.width) {
            projectiles.splice(i, 1);
            continue;
        }

        for (let j = aliens.length - 1; j >= 0; j--) {
            const a = aliens[j];
            if (p.hitIds.includes(a)) continue;

            if (a.row === p.row && Math.abs(p.x - a.x) < 28) {
                p.hitIds.push(a);
                damageAlien(a, p.dmg);

                if (p.effect === 'slow') a.slowTimer = 180;
                if (p.effect === 'freeze') a.freezeTimer = 110;
                if (p.effect === 'poison') a.poisonTimer = 240;
                if (p.effect === 'superPoison') a.poisonTimer = 420;
                if (p.effect === 'rowWind') {
                    a.x = Math.min(canvas.width - 20, a.x + 165);
                    addFloatingText('💨 GUST!', a.x, a.y - 20, '#caf0f8');
                }
                if (p.effect === 'superRowWind') {
                    a.x = Math.min(canvas.width - 20, a.x + 250);
                    a.slowTimer = 180;
                    addFloatingText('🌀 GALE!', a.x, a.y - 20, '#90e0ef');
                }
                if (p.effect === 'splash') {
                    aliens.forEach(other => {
                        if (other !== a && Math.abs(other.x - a.x) < 110 && Math.abs(other.row - a.row) <= 1) {
                            damageAlien(other, Math.round(p.dmg * 0.65));
                        }
                    });
                }
                if (p.effect === 'chain') {
                    aliens.forEach(other => {
                        if (other !== a && Math.abs(other.x - a.x) < 140 && Math.abs(other.row - a.row) <= 1) {
                            damageAlien(other, Math.round(p.dmg * 0.6));
                        }
                    });
                }

                if (!p.piercing) {
                    projectiles.splice(i, 1);
                    break;
                }
            }
        }
    }

    for (let i = alienProjectiles.length - 1; i >= 0; i--) {
        const ap = alienProjectiles[i];
        ap.x -= ap.speed;
        if (ap.x < 0) {
            alienProjectiles.splice(i, 1);
            continue;
        }
        for (let j = cows.length - 1; j >= 0; j--) {
            const c = cows[j];
            if (c.row === ap.row && Math.abs(ap.x - c.x) < 28) {
                c.hp -= ap.dmg;
                if (c.hp <= 0) cows.splice(j, 1);
                alienProjectiles.splice(i, 1);
                break;
            }
        }
    }
    for (let i = aliens.length - 1; i >= 0; i--) {
        const a = aliens[i];

        if (a.poisonTimer > 0) {
            a.poisonTimer--;
            if (frame % 30 === 0) damageAlien(a, 18);
        }

        if (a.hp <= 0) {
            milk += a.reward;
            addFloatingText('+' + a.reward + ' 🥛', a.x, a.y - 20);
            aliens.splice(i, 1);
            updateHUD();
            continue;
        }

        if (a.freezeTimer > 0) {
            a.freezeTimer--;
            continue;
        }

        if (a.isRanged && a.x < canvas.width - 60) {
            a.abilityTimer++;
            if (a.abilityTimer >= a.fireRate && cows.some(c => c.row === a.row && c.x < a.x)) {
                a.abilityTimer = 0;
                alienProjectiles.push({ x: a.x - 20, y: a.y, row: a.row, dmg: a.shotDmg, speed: 5 });
            }
        }

        if (a.isBoss) {
            a.abilityTimer++;
            if (a.bossType === 'spawner' && a.abilityTimer >= 360) {
                a.abilityTimer = 0;
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.grunt, { typeKey: 'grunt', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 120, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
                addFloatingText('Reinforcements!', a.x, a.y - 40, '#ff595e');
            } else if (a.bossType === 'teleporter' && a.abilityTimer >= 520) {
                a.abilityTimer = 0;
                a.x = Math.max(150, a.x - 95);
                a.row = Math.floor(Math.random() * ROWS);
                a.y = a.row * CELL_SIZE + CELL_SIZE / 2;
                addFloatingText('WARP!', a.x, a.y - 35, '#c77dff');
            } else if (a.bossType === 'waterSpawn' && a.abilityTimer >= 380) {
                a.abilityTimer = 0;
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.ghost, { typeKey: 'ghost', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 220, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
                addFloatingText('🌊 TIDE SURGE!', a.x, a.y - 40, '#48cae4');
            } else if (a.bossType === 'freezer' && a.abilityTimer >= 480 && cows.length > 0) {
                a.abilityTimer = 0;
                for (let k = 0; k < 2; k++) {
                    const target = cows[Math.floor(Math.random() * cows.length)];
                    target.frozenTimer = 120;
                    addFloatingText('❄️ FROZEN (2s)!', target.x, target.y - 25, '#90e0ef');
                }
            } else if (a.bossType === 'venomMist' && a.abilityTimer >= 360) {
                a.abilityTimer = 0;
                cows.forEach(c => { c.hp -= 25; });
                addFloatingText('☠️ TOXIC CLOUD!', a.x, a.y - 40, '#80ed99');
            } else if (a.bossType === 'overlord' && a.abilityTimer >= 380) {
                a.abilityTimer = 0;
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.charger, { typeKey: 'charger', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 450, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
                addFloatingText('🔥 STAMPEDE!', a.x, a.y - 40, '#ff9f1c');
            } else if (a.bossType === 'emperor' && a.abilityTimer >= 420) {
                a.abilityTimer = 0;
                if (cows.length > 0) {
                    const target = cows[Math.floor(Math.random() * cows.length)];
                    target.frozenTimer = 120;
                }
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.juggernaut, { typeKey: 'juggernaut', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 1500, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
                addFloatingText('🌌 VOID SUMMON!', a.x, a.y - 45, '#e0aaff');
            }
        }

        let blocked = false;
        if (!a.isGhost) {
            for (let j = cows.length - 1; j >= 0; j--) {
                const c = cows[j];
                if (c.row === a.row && Math.abs(a.x - c.x) < 40) {
                    blocked = true;
                    if (a.isCharger && !a.charged) {
                        c.hp -= 110;
                        a.charged = true;
                        a.speed *= 0.45;
                        addFloatingText('💥 SLAM!', c.x, c.y - 20, '#ff595e');
                    } else {
                        c.hp -= a.dmg;
                    }
                    const cowStats = COW_MAP[c.type];
                    if (cowStats.thorns) {
                        damageAlien(a, cowStats.thorns);
                    }
                    if (c.hp <= 0) cows.splice(j, 1);
                    break;
                }
            }
        }

        if (!blocked) {
            let currentSpeed = a.speed;
            if (a.slowTimer > 0) {
                a.slowTimer--;
                currentSpeed *= 0.45;
            }
            const currentCol = Math.floor(a.x / CELL_SIZE);
            a.isJumpingWater = BIOMES[biomeIndex].waterCols.includes(currentCol);
            if (a.isJumpingWater) {
                currentSpeed *= 1.85;
            }
            a.x -= currentSpeed;
        }

        if (a.x < 10) {
            barnHp -= a.isBoss ? 3 : 1;
            aliens.splice(i, 1);
            updateHUD();

            if (barnHp <= 0) {
                gameOver = true;
                overlay.classList.remove('hidden');
            }
        }
    }

    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        floatingTexts[i].y -= 0.7;
        floatingTexts[i].life--;
        if (floatingTexts[i].life <= 0) floatingTexts.splice(i, 1);
    }
}

function drawGrid() {
    const theme = BIOMES[biomeIndex];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const isWater = theme.waterCols.includes(c);
            if (isWater) {
                ctx.fillStyle = (r + c) % 2 === 0 ? '#0077b6' : '#023e8a';
            } else {
                ctx.fillStyle = (r + c) % 2 === 0 ? theme.light : theme.dark;
            }
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);

            if (isWater) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                ctx.font = '20px Arial';
                ctx.fillText('🌊', c * CELL_SIZE + 50, r * CELL_SIZE + 50);
            }
        }
    }

    if (hoverCol >= 0 && hoverCol < COLS && hoverRow >= 0 && hoverRow < ROWS) {
        ctx.strokeStyle = 'rgba(255, 209, 102, 0.8)';
        ctx.lineWidth = 3;
        ctx.strokeRect(hoverCol * CELL_SIZE + 2, hoverRow * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    drawGrid();

    cows.forEach(c => {
        ctx.font = '42px Arial';
        ctx.fillText(COW_MAP[c.type].emoji, c.x, c.y);

        if (c.frozenTimer > 0) {
            ctx.fillStyle = 'rgba(144, 224, 239, 0.55)';
            ctx.fillRect(c.x - 28, c.y - 28, 56, 56);
            ctx.font = '20px Arial';
            ctx.fillText('❄️', c.x, c.y - 24);
        }

        const hpPct = Math.max(0, c.hp / c.maxHp);
        ctx.fillStyle = '#222';
        ctx.fillRect(c.x - 25, c.y + 30, 50, 6);
        ctx.fillStyle = '#06d6a0';
        ctx.fillRect(c.x - 25, c.y + 30, 50 * hpPct, 6);
    });

    projectiles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.piercing ? 9 : 7, 0, Math.PI * 2);
        ctx.fill();
    });

    alienProjectiles.forEach(ap => {
        ctx.fillStyle = '#ff0055';
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, 6, 0, Math.PI * 2);
        ctx.fill();
    });

    aliens.forEach(a => {
        ctx.save();
        if (a.isGhost) ctx.globalAlpha = 0.65;
        const jumpOffset = a.isJumpingWater ? -18 : 0;
        ctx.font = a.size + 'px Arial';
        ctx.fillText(a.emoji, a.x, a.y + jumpOffset);
        ctx.restore();

        if (a.slowTimer > 0) {
            ctx.fillText('❄️', a.x - 18, a.y - 18);
        }
        if (a.freezeTimer > 0) {
            ctx.fillText('🧊', a.x, a.y - 22);
        }
        if (a.poisonTimer > 0) {
            ctx.fillText('☠️', a.x + 18, a.y - 18);
        }

        const barWidth = a.isBoss ? 72 : 44;
        const hpPct = Math.max(0, a.hp / a.maxHp);
        ctx.fillStyle = '#222';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 14, barWidth, 7);
        ctx.fillStyle = a.isBoss ? '#ffbe0b' : '#ef476f';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 14, barWidth * hpPct, 7);
    });

    floatingTexts.forEach(ft => {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, ft.x, ft.y);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function restartCurrentBiome() {
    waveInBiome = 1;
    milk = 150 + (biomeIndex * 125);
    barnHp = 5;
    cows = new Array();
    aliens = new Array();
    projectiles = new Array();
    alienProjectiles = new Array();
    floatingTexts = new Array();
    gameOver = false;
    overlay.classList.add('hidden');
    updateHUD();
    startWave();
}

updateHUD();
startWave();
gameLoop();
