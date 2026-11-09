const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 100;
const ROWS = 5;
const COLS = 9;

let milk = 100;
let wave = 1;
let barnHp = 50;
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
function update() {
    if (gameOver) return;
    frame++;

    // Passive Milk Generation
    if (frame % 300 === 0) {
        milk += 25;
        addFloatingText('+25 🥛', 80, 40);
        updateHUD();
    }

    // Wave & Biome Progression
    if (aliensToSpawn > 0) {
        spawnTimer--;
        if (spawnTimer <= 0) {
            spawnAlien();
            aliensToSpawn--;
            spawnTimer = Math.max(40, 125 - (biomeIndex * 12) - (waveInBiome * 6));
        }
    } else if (aliens.length === 0) {
        waveCooldown--;
        if (waveCooldown <= 0) {
            waveCooldown = 180;
            if (waveInBiome < 3) {
                waveInBiome++;
                startWave();
                updateHUD();
            } else {
                // Advance to next Biome after defeating Biome Boss!
                biomeIndex = (biomeIndex + 1) % BIOMES.length;
                waveInBiome = 1;
                milk += 150;
                barnHp = Math.min(5, barnHp + 2);
                addFloatingText('NEW BIOME: ' + BIOMES[biomeIndex].name + ' (+150 🥛)', 450, 250, '#00f5d4');
                startWave();
                updateHUD();
            }
        }
    }

    // Update Cows
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
                    effect: stats.effect || null
                });
                cow.timer = 0;
            }
        } else if (stats.role === 'healer' && cow.timer >= stats.rate) {
            cow.timer = 0;
            cows.forEach(ally => {
                if (Math.abs(ally.col - cow.col) <= 1 && Math.abs(ally.row - cow.row) <= 1) {
                    ally.hp = Math.min(ally.maxHp, ally.hp + stats.heal);
                }
            });
            addFloatingText('💚 Heal', cow.x, cow.y - 20, '#80ed99');
        } else if (stats.role === 'bomb' && cow.timer >= stats.fuse) {
            aliens.forEach(a => {
                if (Math.abs(a.row - cow.row) <= 1 && Math.abs(a.x - cow.x) <= 150) {
                    a.hp -= stats.dmg;
                }
            });
            addFloatingText('💥 BOOM!', cow.x, cow.y, '#ff595e');
            cows.splice(i, 1);
        }
    }

    // Update Cow Projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.speed;

        if (p.x > canvas.width) {
            projectiles.splice(i, 1);
            continue;
        }

        for (let j = aliens.length - 1; j >= 0; j--) {
            const a = aliens[j];
            if (a.row === p.row && Math.abs(p.x - a.x) < 28) {
                a.hp -= p.dmg;
                if (p.effect === 'slow') a.slowTimer = 180;
                if (p.effect === 'poison') a.poisonTimer = 240;
                if (p.effect === 'chain') {
                    aliens.forEach(other => {
                        if (other !== a && Math.abs(other.x - a.x) < 120 && Math.abs(other.row - a.row) <= 1) {
                            other.hp -= Math.round(p.dmg * 0.6);
                        }
                    });
                }
                projectiles.splice(i, 1);
                break;
            }
        }
    }

    // Update Alien Projectiles
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

    // Update Aliens & Unique Bosses
    for (let i = aliens.length - 1; i >= 0; i--) {
        const a = aliens[i];

        if (a.poisonTimer > 0) {
            a.poisonTimer--;
            if (frame % 30 === 0) a.hp -= 12;
        }

        if (a.hp <= 0) {
            milk += a.reward;
            addFloatingText('+' + a.reward + ' 🥛', a.x, a.y - 20);
            aliens.splice(i, 1);
            updateHUD();
            continue;
        }

        // Ranged Alien Shooting
        if (a.isRanged && a.x < canvas.width - 60) {
            a.abilityTimer++;
            if (a.abilityTimer >= a.fireRate && cows.some(c => c.row === a.row && c.x < a.x)) {
                a.abilityTimer = 0;
                alienProjectiles.push({ x: a.x - 20, y: a.y, row: a.row, dmg: a.shotDmg, speed: 5 });
            }
        }

        // Boss Special Mechanics
        if (a.isBoss) {
            a.abilityTimer++;
            if (a.bossType === 'spawner' && a.abilityTimer >= 360) {
                a.abilityTimer = 0;
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.grunt, { typeKey: 'grunt', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 110, slowTimer: 0, poisonTimer: 0 }));
                addFloatingText('Reinforcements!', a.x, a.y - 40, '#ff595e');
            } else if (a.bossType === 'teleporter' && a.abilityTimer >= 520) {
                // Higher cooldown on Warlord Boss warp as requested!
                a.abilityTimer = 0;
                a.x = Math.max(150, a.x - 95);
                a.row = Math.floor(Math.random() * ROWS);
                a.y = a.row * CELL_SIZE + CELL_SIZE / 2;
                addFloatingText('WARP!', a.x, a.y - 35, '#c77dff');
            } else if (a.bossType === 'freezer' && a.abilityTimer >= 420 && cows.length > 0) {
                a.abilityTimer = 0;
                const target = cows[Math.floor(Math.random() * cows.length)];
                target.frozenTimer = 210;
                addFloatingText('❄️ FROZEN!', target.x, target.y - 25, '#90e0ef');
            } else if (a.bossType === 'overlord' && a.abilityTimer >= 380) {
                a.abilityTimer = 0;
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.charger, { typeKey: 'charger', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 210, slowTimer: 0, poisonTimer: 0 }));
                addFloatingText('🔥 STAMPEDE!', a.x, a.y - 40, '#ff9f1c');
            }
        }

        // Collision with Cows (Ghost phases right through!)
        let blocked = false;
        if (!a.isGhost) {
            for (let j = cows.length - 1; j >= 0; j--) {
                const c = cows[j];
                if (c.row === a.row && Math.abs(a.x - c.x) < 40) {
                    blocked = true;
                    // Charger deals burst slam damage on first impact
                    if (a.isCharger && !a.charged) {
                        c.hp -= 90;
                        a.charged = true;
                        a.speed = 0.55;
                        addFloatingText('💥 SLAM!', c.x, c.y - 20, '#ff595e');
                    } else {
                        c.hp -= a.dmg;
                    }
                    // Spiky Bull reflects thorn damage while being hit!
                    const cowStats = COW_MAP[c.type];
                    if (cowStats.thorns) {
                        a.hp -= cowStats.thorns;
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
            a.x -= currentSpeed;
        }

        // Reached Barn
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
            ctx.fillStyle = (r + c) % 2 === 0 ? theme.light : theme.dark;
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw Cows
    cows.forEach(c => {
        ctx.font = '42px Arial';
        ctx.fillText(COW_MAP[c.type].emoji, c.x, c.y);

        if (c.frozenTimer > 0) {
            ctx.fillStyle = 'rgba(144, 224, 239, 0.5)';
            ctx.fillRect(c.x - 28, c.y - 28, 56, 56);
        }

        const hpPct = Math.max(0, c.hp / c.maxHp);
        ctx.fillStyle = '#222';
        ctx.fillRect(c.x - 25, c.y + 30, 50, 6);
        ctx.fillStyle = '#06d6a0';
        ctx.fillRect(c.x - 25, c.y + 30, 50 * hpPct, 6);
    });

    // Draw Cow Projectiles
    projectiles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Alien Projectiles
    alienProjectiles.forEach(ap => {
        ctx.fillStyle = '#ff0055';
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, 6, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Aliens
    aliens.forEach(a => {
        ctx.save();
        if (a.isGhost) ctx.globalAlpha = 0.65;
        ctx.font = a.size + 'px Arial';
        ctx.fillText(a.emoji, a.x, a.y);
        ctx.restore();

        // Status tint indicators
        if (a.slowTimer > 0) {
            ctx.fillStyle = '#00b4d8';
            ctx.fillText('❄️', a.x - 18, a.y - 18);
        }
        if (a.poisonTimer > 0) {
            ctx.fillStyle = '#80ed99';
            ctx.fillText('☠️', a.x + 18, a.y - 18);
        }

        const barWidth = a.isBoss ? 72 : 44;
        const hpPct = Math.max(0, a.hp / a.maxHp);
        ctx.fillStyle = '#222';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 12, barWidth, 7);
        ctx.fillStyle = a.isBoss ? '#ffbe0b' : '#ef476f';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 12, barWidth * hpPct, 7);
    });

    // Draw Floating Texts
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

// Restarts ONLY the current biome instead of resetting to Biome 1!
function restartCurrentBiome() {
    waveInBiome = 1;
    milk = 150 + (biomeIndex * 75);
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
