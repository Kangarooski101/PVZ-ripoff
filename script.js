const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 100;
const ROWS = 5;
const COLS = 9;

let milk = 100;
let wave = 1;
let barnHp = 5;
let frame = 0;
let gameOver = false;
let selectedCowType = 'dairy';

let cows = new Array();
let aliens = new Array();
let projectiles = new Array();
let floatingTexts = new Array();

let aliensToSpawn = 0;
let spawnTimer = 0;
let waveCooldown = 180;

const COW_TYPES = {
    dairy: { emoji: '🐄', cost: 50, hp: 100, rate: 300, timer: 0 },
    milkLauncher: { emoji: '🐮', cost: 100, hp: 120, rate: 90, timer: 0, dmg: 25, speed: 6, color: '#ffffff' },
    bullWall: { emoji: '🐂', cost: 75, hp: 450, rate: 0, timer: 0 },
    plasmaCow: { emoji: '🛸', cost: 200, hp: 150, rate: 35, timer: 0, dmg: 20, speed: 10, color: '#00f5d4' }
};

const ALIEN_TYPES = {
    grunt: { emoji: '👽', hp: 100, speed: 0.6, dmg: 0.4, reward: 25, size: 40 },
    runner: { emoji: '👾', hp: 70, speed: 1.3, dmg: 0.3, reward: 30, size: 38 },
    brute: { emoji: '👹', hp: 300, speed: 0.35, dmg: 0.8, reward: 60, size: 48 },
    mothershipBoss: { emoji: '🛸', hp: 1200, speed: 0.2, dmg: 1.5, reward: 250, size: 65, isBoss: true, bossType: 'spawner' },
    warlordBoss: { emoji: '👾', hp: 1600, speed: 0.3, dmg: 2.0, reward: 400, size: 65, isBoss: true, bossType: 'teleporter' }
};

const milkEl = document.getElementById('milk-count');
const waveEl = document.getElementById('wave-count');
const barnHpEl = document.getElementById('barn-hp');
const shopCards = document.querySelectorAll('.cow-card');
const overlay = document.getElementById('overlay');
const restartBtn = document.getElementById('restart-btn');

shopCards.forEach(card => {
    card.addEventListener('click', () => {
        shopCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedCowType = card.dataset.type;
    });
});

restartBtn.addEventListener('click', resetGame);
canvas.addEventListener('click', (e) => {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    if (cows.some(c => c.col === col && c.row === row)) return;

    const blueprint = COW_TYPES[selectedCowType];
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
            timer: 0
        });
        updateHUD();
    }
});

function startWave(waveNum) {
    aliensToSpawn = 4 + waveNum * 2;
    spawnTimer = 60;
}

function spawnAlien() {
    const row = Math.floor(Math.random() * ROWS);
    let typeKey = 'grunt';

    if (aliensToSpawn === 1 && wave % 5 === 0) {
        typeKey = 'warlordBoss';
    } else if (aliensToSpawn === 1 && wave % 3 === 0) {
        typeKey = 'mothershipBoss';
    } else {
        const rand = Math.random();
        if (wave >= 2 && rand > 0.7) typeKey = 'runner';
        if (wave >= 3 && rand > 0.85) typeKey = 'brute';
    }

    const template = ALIEN_TYPES[typeKey];
    const hpScale = 1 + (wave - 1) * 0.15;

    aliens.push(Object.assign({}, template, {
        typeKey: typeKey,
        row: row,
        x: canvas.width + 40,
        y: row * CELL_SIZE + CELL_SIZE / 2,
        hp: Math.round(template.hp * hpScale),
        maxHp: Math.round(template.hp * hpScale),
        abilityTimer: 0
    }));
}

function addFloatingText(text, x, y, color = '#ffd166') {
    floatingTexts.push({ text: text, x: x, y: y, color: color, life: 45 });
}

function updateHUD() {
    milkEl.textContent = milk;
    waveEl.textContent = wave;
    barnHpEl.textContent = barnHp;

    shopCards.forEach(card => {
        const cost = Number(card.dataset.cost);
        card.classList.toggle('disabled', milk < cost);
    });
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
            spawnTimer = Math.max(45, 130 - wave * 8);
        }
    } else if (aliens.length === 0) {
        waveCooldown--;
        if (waveCooldown <= 0) {
            wave++;
            waveCooldown = 180;
            startWave(wave);
            updateHUD();
        }
    }

    cows.forEach(cow => {
        const stats = COW_TYPES[cow.type];
        cow.timer++;

        if (cow.type === 'dairy' && cow.timer >= stats.rate) {
            milk += 25;
            cow.timer = 0;
            addFloatingText('+25 🥛', cow.x, cow.y - 20);
            updateHUD();
        } else if ((cow.type === 'milkLauncher' || cow.type === 'plasmaCow') && cow.timer >= stats.rate) {
            const alienInRow = aliens.some(a => a.row === cow.row && a.x > cow.x);
            if (alienInRow) {
                projectiles.push({
                    x: cow.x + 25,
                    y: cow.y,
                    row: cow.row,
                    dmg: stats.dmg,
                    speed: stats.speed,
                    color: stats.color
                });
                cow.timer = 0;
            }
        }
    });

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.speed;

        if (p.x > canvas.width) {
            projectiles.splice(i, 1);
            continue;
        }

        for (let j = aliens.length - 1; j >= 0; j--) {
            const a = aliens[j];
            if (a.row === p.row && Math.abs(p.x - a.x) < 25) {
                a.hp -= p.dmg;
                projectiles.splice(i, 1);

                if (a.hp <= 0) {
                    milk += a.reward;
                    addFloatingText('+' + a.reward + ' 🥛', a.x, a.y - 20);
                    aliens.splice(j, 1);
                    updateHUD();
                }
                break;
            }
        }
    }

    for (let i = aliens.length - 1; i >= 0; i--) {
        const a = aliens[i];
        let blocked = false;

        if (a.isBoss) {
            a.abilityTimer++;
            if (a.bossType === 'spawner' && a.abilityTimer >= 360) {
                a.abilityTimer = 0;
                const spawnRow = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.grunt, {
                    typeKey: 'grunt',
                    row: spawnRow,
                    x: a.x - 20,
                    y: spawnRow * CELL_SIZE + CELL_SIZE / 2,
                    maxHp: 100
                }));
                addFloatingText('Reinforcements!', a.x, a.y - 40, '#ff595e');
            } else if (a.bossType === 'teleporter' && a.abilityTimer >= 280) {
                a.abilityTimer = 0;
                a.x = Math.max(120, a.x - 110);
                a.row = Math.floor(Math.random() * ROWS);
                a.y = a.row * CELL_SIZE + CELL_SIZE / 2;
                addFloatingText('WARP!', a.x, a.y - 30, '#c77dff');
            }
        }

        for (let j = cows.length - 1; j >= 0; j--) {
            const c = cows[j];
            if (c.row === a.row && Math.abs(a.x - c.x) < 40) {
                blocked = true;
                c.hp -= a.dmg;
                if (c.hp <= 0) {
                    cows.splice(j, 1);
                }
                break;
            }
        }

        if (!blocked) {
            a.x -= a.speed;
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
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            ctx.fillStyle = (r + c) % 2 === 0 ? '#52b788' : '#40916c';
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    cows.forEach(c => {
        ctx.font = '44px Arial';
        ctx.fillText(COW_TYPES[c.type].emoji, c.x, c.y);

        const hpPct = c.hp / c.maxHp;
        ctx.fillStyle = '#222';
        ctx.fillRect(c.x - 25, c.y + 30, 50, 6);
        ctx.fillStyle = '#06d6a0';
        ctx.fillRect(c.x - 25, c.y + 30, 50 * hpPct, 6);
    });

    projectiles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fill();
    });

    aliens.forEach(a => {
        ctx.font = a.size + 'px Arial';
        ctx.fillText(a.emoji, a.x, a.y);

        const barWidth = a.isBoss ? 70 : 44;
        const hpPct = Math.max(0, a.hp / a.maxHp);
        ctx.fillStyle = '#222';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 12, barWidth, 7);
        ctx.fillStyle = a.isBoss ? '#ffbe0b' : '#ef476f';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 12, barWidth * hpPct, 7);
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

function resetGame() {
    milk = 100;
    wave = 1;
    barnHp = 5;
    cows = new Array();
    aliens = new Array();
    projectiles = new Array();
    floatingTexts = new Array();
    gameOver = false;
    overlay.classList.add('hidden');
    updateHUD();
    startWave(1);
}

updateHUD();
startWave(1);
gameLoop();
