const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 100;
const ROWS = 5;
const COLS = 16;

let biomeIndex = 0;
let waveInBiome = 1;
let milk = 150;
let barnHp = 15;
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
let visualEffects = new Array();

let aliensToSpawn = 0;
let spawnTimer = 0;
let waveCooldown = 180;

const BIOMES = new Array(
    { name: 'Green Pasture', light: '#52b788', dark: '#40916c', waves: 3, boss: 'mothershipBoss', waterCols: new Array() },
    { name: 'Scorched Desert', light: '#e9c46a', dark: '#d4a373', waves: 4, boss: 'warlordBoss', waterCols: new Array() },
    { name: 'River Crossing', light: '#74c69d', dark: '#52b788', waves: 5, boss: 'hydraBoss', waterCols: new Array(7) },
    { name: 'Frozen Tundra', light: '#90e0ef', dark: '#48cae4', waves: 6, boss: 'cryoTitanBoss', waterCols: new Array(5, 10) },
    { name: 'Swamp Marsh', light: '#606c38', dark: '#4a572a', waves: 7, boss: 'plagueQueenBoss', waterCols: new Array(4, 9, 13) },
    { name: 'Quantum Rift', light: '#480ca8', dark: '#3f37c9', waves: 8, boss: 'shiftStormBoss', waterCols: new Array(6, 11) },
    { name: 'Volcanic Core', light: '#9b2226', dark: '#6a040f', waves: 9, boss: 'overlordBoss', waterCols: new Array(5, 9, 13) },
    { name: 'Cosmic Void', light: '#3c096c', dark: '#240046', waves: 10, boss: 'galacticEmperorBoss', waterCols: new Array(4, 8, 11, 14) }
);

const COW_LIST = new Array(
    { id: 'tinyCalf', name: 'Tiny Calf', emoji: '🍼', cost: 35, hp: 80, desc: '+15 Milk/4s', role: 'milk', rate: 240, amount: 15 },
    { id: 'dairy', name: 'Dairy Cow', emoji: '🐄', cost: 50, hp: 110, desc: '+25 Milk/5s', role: 'milk', rate: 300, amount: 25 },
    { id: 'hayOx', name: 'Hay Bale Ox', emoji: '🌾', cost: 60, hp: 320, desc: 'Starter Wall', role: 'wall', thorns: 0.2 },
    { id: 'pebbleCow', name: 'Pebble Spitter', emoji: '🪨', cost: 75, hp: 110, desc: 'Fast Light Shot', role: 'shooter', rate: 65, dmg: 18, speed: 7, color: '#d6ccc2' },
    { id: 'spikyBull', name: 'Spiky Bull', emoji: '🐂', cost: 85, hp: 520, desc: 'Tank + Thorn Dmg', role: 'wall', thorns: 0.55 },
    { id: 'milkShooter', name: 'Milk Shooter', emoji: '🐮', cost: 100, hp: 130, desc: 'Basic Milk Shot', role: 'shooter', rate: 85, dmg: 28, speed: 6, color: '#ffffff' },
    { id: 'stompCalf', name: 'Stomp Calf', emoji: '🐾', cost: 115, hp: 170, desc: 'Ground Pound Push', role: 'pounder', rate: 130, dmg: 32, radius: 135, push: 55 },
    { id: 'boomBovine', name: 'Boom Bovine', emoji: '💣', cost: 125, hp: 100, desc: '3x3 Blast', role: 'bomb', fuse: 65, dmg: 380, radius: 155 },
    { id: 'frostCow', name: 'Frost Cow', emoji: '🧊', cost: 135, hp: 130, desc: 'Slows Aliens', role: 'shooter', rate: 95, dmg: 25, speed: 6, color: '#00b4d8', effect: 'slow' },
    { id: 'medicCow', name: 'Medic Cow', emoji: '🩺', cost: 140, hp: 150, desc: 'Heals 3x3 Herd', role: 'healer', rate: 120, heal: 26 },
    { id: 'viperCow', name: 'Viper Cow', emoji: '🐍', cost: 150, hp: 130, desc: 'Poison Spit', role: 'shooter', rate: 90, dmg: 20, speed: 6, color: '#80ed99', effect: 'poison' },
    { id: 'gatlingCow', name: 'Gatling Calf', emoji: '🔫', cost: 165, hp: 120, desc: 'Rapid Low Dmg', role: 'shooter', rate: 24, dmg: 11, speed: 9, color: '#ffd166' },
    { id: 'goldenCow', name: 'Golden Cow', emoji: '👑', cost: 180, hp: 160, desc: '+60 Milk/5.5s', role: 'milk', rate: 330, amount: 60 },
    { id: 'windCow', name: 'Wind Cow', emoji: '🌪️', cost: 195, hp: 140, desc: 'Full-Row Knockback', role: 'shooter', rate: 190, dmg: 32, speed: 10, color: '#caf0f8', effect: 'rowWind', piercing: true },
    { id: 'sniperBull', name: 'Sniper Bull', emoji: '🎯', cost: 215, hp: 130, desc: 'High Dmg Shot', role: 'shooter', rate: 160, dmg: 135, speed: 13, color: '#ff006e' },
    { id: 'cloverCow', name: 'Clover Cow', emoji: '🍀', cost: 230, hp: 180, desc: '+80 Milk/5s', role: 'milk', rate: 300, amount: 80 },
    { id: 'teslaCow', name: 'Tesla Cow', emoji: '⚡', cost: 245, hp: 150, desc: 'Chain Lightning', role: 'shooter', rate: 105, dmg: 44, speed: 8, color: '#c77dff', effect: 'chain' },
    { id: 'acornBull', name: 'Acorn Bull', emoji: '🌰', cost: 260, hp: 850, desc: 'Bark Thorn Wall', role: 'wall', thorns: 0.85 },
    { id: 'ironOx', name: 'Iron Ox', emoji: '🛡️', cost: 275, hp: 1150, desc: 'Heavy Thorn Wall', role: 'wall', thorns: 1.15 },
    { id: 'mudSlinger', name: 'Mud Slinger', emoji: '🟤', cost: 290, hp: 160, desc: 'Sticky Slow Blob', role: 'shooter', rate: 80, dmg: 48, speed: 7, color: '#bc6c25', effect: 'slow' },
    { id: 'cyberCow', name: 'Cyber Cow', emoji: '🛸', cost: 305, hp: 190, desc: 'Plasma Rapid', role: 'shooter', rate: 32, dmg: 32, speed: 11, color: '#00f5d4' },
    { id: 'quakeOx', name: 'Earthquake Ox', emoji: '🦏', cost: 325, hp: 440, desc: 'Heavy Slam + Push', role: 'pounder', rate: 115, dmg: 80, radius: 175, push: 75 },
    { id: 'megaBombCow', name: 'Mega Nuke Cow', emoji: '☢️', cost: 345, hp: 120, desc: '5x5 Huge Blast', role: 'bomb', fuse: 135, dmg: 1050, radius: 260 },
    { id: 'cactusBull', name: 'Cactus Bull', emoji: '🌵', cost: 360, hp: 980, desc: 'High Needle Thorns', role: 'wall', thorns: 1.8 },
    { id: 'blizzardCow', name: 'Blizzard Bull', emoji: '❄️', cost: 380, hp: 180, desc: 'Freezes Enemies', role: 'shooter', rate: 125, dmg: 50, speed: 7, color: '#90e0ef', effect: 'freeze' },
    { id: 'honeyCow', name: 'Honeycomb Cow', emoji: '🍯', cost: 400, hp: 210, desc: '+110 Milk/5s', role: 'milk', rate: 300, amount: 110 },
    { id: 'nurseHeifer', name: 'Nurse Heifer', emoji: '💊', cost: 415, hp: 200, desc: 'Fast 3x3 Healing', role: 'healer', rate: 90, heal: 42 },
    { id: 'diamondCow', name: 'Diamond Cow', emoji: '💎', cost: 435, hp: 220, desc: '+140 Milk/5s', role: 'milk', rate: 300, amount: 140 },
    { id: 'boomerangOx', name: 'Boomerang Ox', emoji: '🪃', cost: 455, hp: 190, desc: 'Piercing Horn', role: 'shooter', rate: 95, dmg: 68, speed: 9, color: '#f4a261', piercing: true },
    { id: 'magmaBull', name: 'Magma Bull', emoji: '🌋', cost: 480, hp: 210, desc: 'Splash Fireball', role: 'shooter', rate: 110, dmg: 90, speed: 7, color: '#ff5400', effect: 'splash' },
    { id: 'sparkCalf', name: 'Spark Calf', emoji: '🔋', cost: 500, hp: 185, desc: 'Fast Mini Shock', role: 'shooter', rate: 55, dmg: 38, speed: 10, color: '#ffd166', effect: 'chain' },
    { id: 'thumperBull', name: 'Thumper Bull', emoji: '🔨', cost: 520, hp: 480, desc: 'Rapid Ground Slam', role: 'pounder', rate: 90, dmg: 95, radius: 165, push: 65 },
    { id: 'venomHydraCow', name: 'Venom Hydra', emoji: '🐉', cost: 545, hp: 220, desc: 'Deadly Plague', role: 'shooter', rate: 65, dmg: 50, speed: 8, color: '#38b000', effect: 'superPoison' },
    { id: 'breezeHeifer', name: 'Breeze Heifer', emoji: '🍃', cost: 570, hp: 195, desc: 'Quick Row Gust', role: 'shooter', rate: 145, dmg: 55, speed: 11, color: '#95d5b2', effect: 'rowWind', piercing: true },
    { id: 'galeForceCow', name: 'Hurricane Cow', emoji: '🌀', cost: 600, hp: 210, desc: 'Full-Row Gale + Slow', role: 'shooter', rate: 170, dmg: 90, speed: 11, color: '#ade8f4', effect: 'superRowWind', piercing: true }
);
COW_LIST.push(
    { id: 'steelRancher', name: 'Steel Rancher', emoji: '⚙️', cost: 625, hp: 1600, desc: 'Reinforced Wall', role: 'wall', thorns: 1.9 },
    { id: 'emberCalf', name: 'Ember Calf', emoji: '🕯️', cost: 650, hp: 205, desc: 'Rapid Fire Sparks', role: 'shooter', rate: 28, dmg: 42, speed: 11, color: '#ff7b00' },
    { id: 'laserMinotaur', name: 'Laser Minotaur', emoji: '🤖', cost: 680, hp: 270, desc: 'Heavy Beam', role: 'shooter', rate: 55, dmg: 85, speed: 14, color: '#ffbe0b' },
    { id: 'glacierOx', name: 'Glacier Ox', emoji: '🏔️', cost: 710, hp: 1850, desc: 'Frost Spike Wall', role: 'wall', thorns: 2.1 },
    { id: 'obsidianWall', name: 'Obsidian Ox', emoji: '🪨', cost: 750, hp: 2500, desc: 'Titan Spike Wall', role: 'wall', thorns: 2.5 },
    { id: 'emeraldCow', name: 'Emerald Cow', emoji: '❇️', cost: 790, hp: 250, desc: '+220 Milk/5s', role: 'milk', rate: 300, amount: 220 },
    { id: 'railgunCow', name: 'Railgun Cow', emoji: '🔭', cost: 840, hp: 230, desc: '350 Dmg Slug', role: 'shooter', rate: 145, dmg: 350, speed: 16, color: '#f72585' },
    { id: 'acidSpitter', name: 'Acid Spitter', emoji: '🧪', cost: 880, hp: 235, desc: 'Splash + Poison', role: 'shooter', rate: 85, dmg: 95, speed: 9, color: '#aacc00', effect: 'poison' },
    { id: 'astralCow', name: 'Astral Cow', emoji: '🔮', cost: 930, hp: 270, desc: '+300 Milk/5s', role: 'milk', rate: 300, amount: 300 },
    { id: 'seismicBull', name: 'Seismic Bull', emoji: '📳', cost: 990, hp: 650, desc: 'Wide Shockwave', role: 'pounder', rate: 105, dmg: 155, radius: 210, push: 80 },
    { id: 'stormBringer', name: 'Storm Bringer', emoji: '⛈️', cost: 1050, hp: 270, desc: 'Mega Chain Bolt', role: 'shooter', rate: 75, dmg: 135, speed: 10, color: '#e0aaff', effect: 'chain' },
    { id: 'frostBiteBull', name: 'Frostbite Bull', emoji: '🌨️', cost: 1120, hp: 275, desc: 'Piercing Ice Shard', role: 'shooter', rate: 95, dmg: 120, speed: 11, color: '#caf0f8', effect: 'freeze', piercing: true },
    { id: 'doomBovine', name: 'Doomsday Cow', emoji: '☄️', cost: 1200, hp: 170, desc: 'Map-Wide Meteor', role: 'bomb', fuse: 180, dmg: 2600, radius: 650 },
    { id: 'twinBarrelCow', name: 'Twin-Barrel Cow', emoji: '🧨', cost: 1300, hp: 280, desc: 'Fast Heavy Shots', role: 'shooter', rate: 36, dmg: 105, speed: 12, color: '#ff595e' },
    { id: 'rubyHeifer', name: 'Ruby Heifer', emoji: '♦️', cost: 1400, hp: 300, desc: '+420 Milk/5s', role: 'milk', rate: 300, amount: 420 },
    { id: 'hyperGatling', name: 'Hyper Gatling', emoji: '🔥', cost: 1500, hp: 300, desc: 'Ultra Rapid Heavy', role: 'shooter', rate: 14, dmg: 75, speed: 13, color: '#ff9f1c' },
    { id: 'cryoEmperor', name: 'Cryo Emperor', emoji: '🧊', cost: 1700, hp: 320, desc: 'Rapid Ice Freeze', role: 'shooter', rate: 55, dmg: 125, speed: 10, color: '#00f5d4', effect: 'freeze' },
    { id: 'starForgeCow', name: 'Star Forge Cow', emoji: '🌟', cost: 1950, hp: 350, desc: '+600 Milk/5s', role: 'milk', rate: 300, amount: 600 },
    { id: 'chronosCow', name: 'Chronos Cow', emoji: '⏳', cost: 2200, hp: 340, desc: 'Time Freeze + Push', role: 'shooter', rate: 95, dmg: 200, speed: 11, color: '#ffd166', effect: 'superRowWind', piercing: true },
    { id: 'archangelMedic', name: 'Archangel Doc', emoji: '👼', cost: 2500, hp: 95, desc: 'Heals ALL Cows (Fragile)', role: 'globalHealer', rate: 100, heal: 55 },
    { id: 'plasmaTitan', name: 'Plasma Titan', emoji: '🚀', cost: 2900, hp: 440, desc: 'Splash Heavy Cannon', role: 'shooter', rate: 40, dmg: 210, speed: 13, color: '#00bbf9', effect: 'splash' },
    { id: 'quakeTitan', name: 'Quake Titan', emoji: '🌋', cost: 3200, hp: 1300, desc: 'Massive Ground Slam', role: 'pounder', rate: 95, dmg: 320, radius: 250, push: 95 },
    { id: 'voidReaperCow', name: 'Void Reaper', emoji: '🌑', cost: 3600, hp: 480, desc: '620 Dmg Dark Orb', role: 'shooter', rate: 55, dmg: 620, speed: 14, color: '#9d4edd' },
    { id: 'celestialBull', name: 'Celestial Bull', emoji: '🔱', cost: 4200, hp: 6000, desc: 'Godly Thorn Tank', role: 'wall', thorns: 6.5 },
    { id: 'omegaGalaxyCow', name: 'Omega Galaxy', emoji: '🌌', cost: 5000, hp: 650, desc: 'Ultimate Rapid Beam', role: 'shooter', rate: 12, dmg: 250, speed: 16, color: '#ff007f', effect: 'chain' },
    { id: 'solarFlareCow', name: 'Solar Flare Cow', emoji: '☀️', cost: 5600, hp: 680, desc: 'Burning Splash Beam', role: 'shooter', rate: 25, dmg: 340, speed: 15, color: '#ffbe0b', effect: 'splash' },
    { id: 'aegisOx', name: 'Aegis Fortress', emoji: '🏰', cost: 6200, hp: 8500, desc: 'Fortress Thorn Wall', role: 'wall', thorns: 9.0 },
    { id: 'supernovaCow', name: 'Supernova Cow', emoji: '💥', cost: 7000, hp: 720, desc: 'Piercing Star Beam', role: 'shooter', rate: 22, dmg: 480, speed: 18, color: '#ffbe0b', piercing: true },
    { id: 'typhoonMonarch', name: 'Typhoon Monarch', emoji: '🌪️', cost: 7800, hp: 750, desc: 'Rapid Full-Row Gale', role: 'shooter', rate: 60, dmg: 390, speed: 15, color: '#90e0ef', effect: 'superRowWind', piercing: true },
    { id: 'infinityBull', name: 'Infinity Bull', emoji: '♾️', cost: 8800, hp: 13500, desc: 'Immortal Thorn Wall', role: 'wall', thorns: 14.0 },
    { id: 'nebulaBanker', name: 'Nebula Banker', emoji: '🪐', cost: 9800, hp: 850, desc: '+2200 Milk/5s', role: 'milk', rate: 300, amount: 2200 },
    { id: 'chronoGodCow', name: 'Chrono-God Cow', emoji: '👑', cost: 11000, hp: 1050, desc: 'Map-Shatter Rapid', role: 'shooter', rate: 10, dmg: 680, speed: 20, color: '#00f5d4', effect: 'chain' },
    { id: 'tectonicColossus', name: 'Tectonic Titan', emoji: '🗿', cost: 12500, hp: 2200, desc: 'Colossal Ground Slam', role: 'pounder', rate: 75, dmg: 850, radius: 300, push: 110 },
    { id: 'seraphimHealer', name: 'Seraphim Doc', emoji: '🕊️', cost: 14000, hp: 180, desc: 'Mega Global Heal', role: 'globalHealer', rate: 75, heal: 140 },
    { id: 'antiMatterCow', name: 'Antimatter Cow', emoji: '⚛️', cost: 16000, hp: 1100, desc: '1400 Dmg Plasma Orb', role: 'shooter', rate: 32, dmg: 1400, speed: 17, color: '#f72585', effect: 'splash' },
    { id: 'hyperionBull', name: 'Hyperion Bull', emoji: '🌞', cost: 18500, hp: 18000, desc: 'Solar Thorn Wall', role: 'wall', thorns: 22.0 },
    { id: 'quasarCannon', name: 'Quasar Cannon', emoji: '🌠', cost: 21000, hp: 1200, desc: 'Piercing Quasar Ray', role: 'shooter', rate: 16, dmg: 950, speed: 20, color: '#00bbf9', piercing: true },
    { id: 'cosmicMint', name: 'Cosmic Mint', emoji: '🏦', cost: 24000, hp: 1300, desc: '+5000 Milk/5s', role: 'milk', rate: 300, amount: 5000 },
    { id: 'abyssalLeviathan', name: 'Abyss Leviathan', emoji: '🐋', cost: 27500, hp: 1400, desc: 'Deep Freeze + Chain', role: 'shooter', rate: 24, dmg: 1250, speed: 16, color: '#48cae4', effect: 'freeze' },
    { id: 'novaBombCow', name: 'Hypernova Bomb', emoji: '💣', cost: 31000, hp: 400, desc: '18,000 Dmg Map Nuke', role: 'bomb', fuse: 150, dmg: 18000, radius: 900 },
    { id: 'vortexSovereign', name: 'Vortex Sovereign', emoji: '🌀', cost: 35000, hp: 1500, desc: 'Extreme Row Knockback', role: 'shooter', rate: 45, dmg: 1600, speed: 18, color: '#caf0f8', effect: 'superRowWind', piercing: true },
    { id: 'titanoboaCow', name: 'Titanoboa Cow', emoji: '🐍', cost: 40000, hp: 1600, desc: 'Lethal Venom Barrage', role: 'shooter', rate: 14, dmg: 1100, speed: 18, color: '#80ed99', effect: 'superPoison' },
    { id: 'adamantiteOx', name: 'Adamantite Ox', emoji: '💎', cost: 46000, hp: 32000, desc: 'Unbreakable Wall', role: 'wall', thorns: 38.0 },
    { id: 'singularityCow', name: 'Singularity Cow', emoji: '🕳️', cost: 53000, hp: 1800, desc: 'Black Hole Chain', role: 'shooter', rate: 12, dmg: 1900, speed: 20, color: '#c77dff', effect: 'chain' },
    { id: 'etherVaultCow', name: 'Ether Vault', emoji: '✨', cost: 60000, hp: 2000, desc: '+12,000 Milk/5s', role: 'milk', rate: 300, amount: 12000 },
    { id: 'worldBreakerOx', name: 'World-Breaker', emoji: '🌍', cost: 68000, hp: 4500, desc: '3500 Dmg Quake Slam', role: 'pounder', rate: 65, dmg: 3500, radius: 360, push: 130 },
    { id: 'oblivionGatling', name: 'Oblivion Gatling', emoji: '💀', cost: 77000, hp: 2200, desc: 'Hyper 2400 Dmg Stream', role: 'shooter', rate: 8, dmg: 2400, speed: 22, color: '#ff0055' },
    { id: 'divineGuardian', name: 'Divine Guardian', emoji: '⚜️', cost: 88000, hp: 55000, desc: 'Divine Thorn Bastion', role: 'wall', thorns: 65.0 },
    { id: 'genesisCow', name: 'Genesis Cow', emoji: '🌈', cost: 100000, hp: 2600, desc: 'Prismatic Splash Beam', role: 'shooter', rate: 10, dmg: 3800, speed: 22, color: '#ffd166', effect: 'splash' },
    { id: 'astralTreasury', name: 'Astral Treasury', emoji: '👑', cost: 115000, hp: 3000, desc: '+28,000 Milk/5s', role: 'milk', rate: 300, amount: 28000 },
    { id: 'apocalypseBull', name: 'Apocalypse Bull', emoji: '☄️', cost: 130000, hp: 3200, desc: 'Piercing Doom Ray', role: 'shooter', rate: 14, dmg: 5500, speed: 24, color: '#ff5400', piercing: true },
    { id: 'eternityMonolith', name: 'Eternity Monolith', emoji: '🗿', cost: 150000, hp: 90000, desc: '90k HP Thorn Titan', role: 'wall', thorns: 110.0 },
    { id: 'zeroPointCow', name: 'Zero-Point Cow', emoji: '❄️', cost: 175000, hp: 3800, desc: 'Absolute Zero Freeze', role: 'shooter', rate: 12, dmg: 6800, speed: 24, color: '#00f5d4', effect: 'freeze' },
    { id: 'galactusBovine', name: 'Galactus Bovine', emoji: '🌌', cost: 200000, hp: 4500, desc: '9500 Dmg Chain Storm', role: 'shooter', rate: 9, dmg: 9500, speed: 25, color: '#e0aaff', effect: 'chain' },
    { id: 'infiniteCoreCow', name: 'Infinite Core', emoji: '💠', cost: 230000, hp: 5000, desc: '+65,000 Milk/5s', role: 'milk', rate: 300, amount: 65000 },
    { id: 'omegaOverlordCow', name: 'Omega Overlord', emoji: '🔱', cost: 265000, hp: 6000, desc: '15,000 Dmg Ultra Beam', role: 'shooter', rate: 8, dmg: 15000, speed: 26, color: '#ff007f', effect: 'splash' },
    { id: 'omegaOverlordCow', name: 'Omega Overlord', emoji: '🔱', cost: 265000, hp: 6000, desc: '15,000 Dmg Ultra Beam', role: 'shooter', rate: 8, dmg: 15000, speed: 26, color: '#ff007f', effect: 'splash' },
    { id: 'celestialEmperor', name: 'Celestial Emperor', emoji: '👼', cost: 300000, hp: 8000, desc: 'Supreme Herd God', role: 'shooter', rate: 6, dmg: 25000, speed: 28, color: '#ffd166', effect: 'chain' }
);

const COW_MAP = {};
COW_LIST.forEach(c => { COW_MAP[c.id] = c; });

const ALIEN_TYPES = {
    grunt: { emoji: '👽', hp: 180, speed: 0.55, dmg: 0.45, reward: 30, size: 38 },
    runner: { emoji: '👾', hp: 130, speed: 1.32, dmg: 0.4, reward: 35, size: 36 },
    brute: { emoji: '👹', hp: 580, speed: 0.36, dmg: 0.95, reward: 75, size: 46 },
    blaster: { emoji: '🔫', hp: 250, speed: 0.46, dmg: 0.35, reward: 60, size: 40, isRanged: true, fireRate: 140, shotDmg: 24 },
    charger: { emoji: '🦏', hp: 390, speed: 1.7, dmg: 1.3, reward: 75, size: 44, isCharger: true },
    ghost: { emoji: '👻', hp: 240, speed: 0.7, dmg: 0.6, reward: 65, size: 40, isGhost: true },
    phaseShifter: { emoji: '🌀', hp: 520, speed: 0.64, dmg: 0.8, reward: 100, size: 42, isPhaseShifter: true },
    electroPulser: { emoji: '⚡', hp: 640, speed: 0.5, dmg: 0.75, reward: 125, size: 44, isElectroPulser: true, pulseRate: 190, pulseDmg: 35 },
    juggernaut: { emoji: '🦾', hp: 1450, speed: 0.44, dmg: 1.7, reward: 150, size: 52 },
    mothershipBoss: { emoji: '🛸', hp: 2600, speed: 0.2, dmg: 1.6, reward: 380, size: 64, isBoss: true, bossType: 'spawner' },
    warlordBoss: { emoji: '🧙', hp: 4800, speed: 0.25, dmg: 2.0, reward: 600, size: 64, isBoss: true, bossType: 'teleporter' },
    hydraBoss: { emoji: '🐙', hp: 8500, speed: 0.22, dmg: 2.4, reward: 950, size: 66, isBoss: true, bossType: 'waterSpawn' },
    cryoTitanBoss: { emoji: '🥶', hp: 15000, speed: 0.2, dmg: 2.8, reward: 1400, size: 68, isBoss: true, bossType: 'freezer' },
    plagueQueenBoss: { emoji: '🦂', hp: 26000, speed: 0.24, dmg: 3.2, reward: 2200, size: 68, isBoss: true, bossType: 'venomMist' },
    shiftStormBoss: { emoji: '🌩️', hp: 45000, speed: 0.26, dmg: 3.6, reward: 3500, size: 70, isBoss: true, isPhaseShifter: true, bossType: 'shiftAura' },
    overlordBoss: { emoji: '🐲', hp: 75000, speed: 0.22, dmg: 4.2, reward: 5500, size: 72, isBoss: true, bossType: 'overlord' },
    galacticEmperorBoss: { emoji: '👾', hp: 130000, speed: 0.25, dmg: 5.0, reward: 9000, size: 76, isBoss: true, bossType: 'emperor' }
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
        '<span class="cost">' + cow.cost.toLocaleString() + ' 🥛</span>' +
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
            addFloatingText('🪏 +' + refund.toLocaleString() + ' 🥛', removedCow.x, removedCow.y - 20, '#ffd166');
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
    aliensToSpawn = 6 + (biomeIndex * 5) + (waveInBiome * 2);
    spawnTimer = 50;
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
            typeKey = rand > 0.72 ? 'runner' : 'grunt';
        } else {
            if (biomeIndex >= 2 && rand > 0.90) typeKey = 'juggernaut';
            else if (biomeIndex >= 2 && rand > 0.80) typeKey = 'electroPulser';
            else if (biomeIndex >= 2 && rand > 0.70) typeKey = 'phaseShifter';
            else if (rand > 0.59) typeKey = 'ghost';
            else if (rand > 0.47) typeKey = 'charger';
            else if (rand > 0.35) typeKey = 'blaster';
            else if (rand > 0.21) typeKey = 'brute';
            else if (rand > 0.10) typeKey = 'runner';
        }
    }

    const template = ALIEN_TYPES[typeKey];
    const hpScale = Math.pow(1.48, biomeIndex) * (1 + (waveInBiome - 1) * 0.18);
    const speedScale = 1 + (biomeIndex * 0.09);

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

function addVisualEffect(type, x, y, x2, y2, radius, color, life = 18) {
    visualEffects.push({ type: type, x: x, y: y, x2: x2, y2: y2, radius: radius, color: color, life: life, maxLife: life });
}

function updateHUD() {
    milkEl.textContent = milk.toLocaleString();
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
        const oldX = alien.x;
        const oldY = alien.y;
        let newRow = Math.floor(Math.random() * ROWS);
        if (newRow === alien.row) newRow = (newRow + 1) % ROWS;
        alien.row = newRow;
        alien.y = alien.row * CELL_SIZE + CELL_SIZE / 2;
        addVisualEffect('bolt', oldX, oldY, alien.x, alien.y, 0, '#c77dff', 16);
        addVisualEffect('ring', alien.x, alien.y, 0, 0, 42, '#c77dff', 14);
        addFloatingText('🌀 SHIFT!', alien.x, alien.y - 25, '#c77dff');
    }
}
function update() {
    if (gameOver) return;
    frame++;

    if (frame % 300 === 0) {
        milk += 25 + (biomeIndex * 15);
        addFloatingText('+' + (25 + biomeIndex * 15) + ' 🥛', 80, 40);
        updateHUD();
    }

    if (aliensToSpawn > 0) {
        spawnTimer--;
        if (spawnTimer <= 0) {
            spawnAlien();
            aliensToSpawn--;
            spawnTimer = Math.max(28, 115 - (biomeIndex * 9) - (waveInBiome * 4));
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
                milk += 250 + (biomeIndex * 200);
                barnHp = Math.min(15, barnHp + 3);

                const newWaterCols = BIOMES[biomeIndex].waterCols;
                for (let k = cows.length - 1; k >= 0; k--) {
                    if (newWaterCols.includes(cows[k].col)) {
                        milk += COW_MAP[cows[k].type].cost;
                        cows.splice(k, 1);
                    }
                }

                addFloatingText('NEW BIOME: ' + BIOMES[biomeIndex].name + ' (Herd Kept!)', 800, 250, '#00f5d4');
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
            addVisualEffect('ring', cow.x, cow.y, 0, 0, 45, '#ffd166', 18);
            addFloatingText('+' + stats.amount.toLocaleString() + ' 🥛', cow.x, cow.y - 20);
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
                if (stats.effect === 'rowWind' || stats.effect === 'superRowWind') {
                    addVisualEffect('windWave', cow.x + 20, cow.y, 0, 0, 50, '#caf0f8', 22);
                }
                cow.timer = 0;
            }
        } else if (stats.role === 'pounder' && cow.timer >= stats.rate) {
            const nearby = aliens.filter(a => Math.abs(a.x - cow.x) <= stats.radius && Math.abs(a.y - cow.y) <= stats.radius);
            if (nearby.length > 0) {
                cow.timer = 0;
                addVisualEffect('shockwave', cow.x, cow.y, 0, 0, stats.radius, '#f4a261', 20);
                nearby.forEach(a => {
                    damageAlien(a, stats.dmg);
                    a.x = Math.min(canvas.width - 20, a.x + stats.push);
                });
                addFloatingText('💥 POUND!', cow.x, cow.y - 25, '#f4a261');
            }
        } else if (stats.role === 'healer' && cow.timer >= stats.rate) {
            cow.timer = 0;
            addVisualEffect('ring', cow.x, cow.y, 0, 0, 140, '#80ed99', 22);
            cows.forEach(ally => {
                if (Math.abs(ally.col - cow.col) <= 1 && Math.abs(ally.row - cow.row) <= 1) {
                    ally.hp = Math.min(ally.maxHp, ally.hp + stats.heal);
                }
            });
            addFloatingText('💚 Heal', cow.x, cow.y - 20, '#80ed99');
        } else if (stats.role === 'globalHealer' && cow.timer >= stats.rate) {
            cow.timer = 0;
            addVisualEffect('ring', cow.x, cow.y, 0, 0, 450, '#ffd166', 25);
            cows.forEach(ally => {
                ally.hp = Math.min(ally.maxHp, ally.hp + stats.heal);
                addVisualEffect('ring', ally.x, ally.y, 0, 0, 35, '#80ed99', 15);
            });
            addFloatingText('👼 Herd Heal!', cow.x, cow.y - 20, '#ffd166');
        } else if (stats.role === 'bomb' && cow.timer >= stats.fuse) {
            addVisualEffect('explosion', cow.x, cow.y, 0, 0, stats.radius, '#ff595e', 26);
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

                if (p.effect === 'slow') {
                    a.slowTimer = 180;
                    addVisualEffect('ring', a.x, a.y, 0, 0, 34, '#00b4d8', 12);
                }
                if (p.effect === 'freeze') {
                    a.freezeTimer = 110;
                    addVisualEffect('ring', a.x, a.y, 0, 0, 42, '#90e0ef', 16);
                }
                if (p.effect === 'poison') a.poisonTimer = 240;
                if (p.effect === 'superPoison') a.poisonTimer = 420;
                if (p.effect === 'rowWind') {
                    a.x = Math.min(canvas.width - 20, a.x + 175);
                    addVisualEffect('windWave', a.x - 60, a.y, 0, 0, 40, '#caf0f8', 14);
                    addFloatingText('💨 GUST!', a.x, a.y - 20, '#caf0f8');
                }
                if (p.effect === 'superRowWind') {
                    a.x = Math.min(canvas.width - 20, a.x + 265);
                    a.slowTimer = 180;
                    addVisualEffect('windWave', a.x - 80, a.y, 0, 0, 52, '#90e0ef', 16);
                    addFloatingText('🌀 GALE!', a.x, a.y - 20, '#90e0ef');
                }
                if (p.effect === 'splash') {
                    addVisualEffect('explosion', a.x, a.y, 0, 0, 110, '#ff5400', 16);
                    aliens.forEach(other => {
                        if (other !== a && Math.abs(other.x - a.x) < 110 && Math.abs(other.row - a.row) <= 1) {
                            damageAlien(other, Math.round(p.dmg * 0.65));
                        }
                    });
                }
                if (p.effect === 'chain') {
                    aliens.forEach(other => {
                        if (other !== a && Math.abs(other.x - a.x) < 155 && Math.abs(other.row - a.row) <= 1) {
                            addVisualEffect('bolt', a.x, a.y, other.x, other.y, 0, '#c77dff', 14);
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
            if (frame % 30 === 0) damageAlien(a, 24);
        }

        if (a.hp <= 0) {
            milk += a.reward;
            addFloatingText('+' + a.reward.toLocaleString() + ' 🥛', a.x, a.y - 20);
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
                alienProjectiles.push({ x: a.x - 20, y: a.y, row: a.row, dmg: a.shotDmg, speed: 5.5 });
            }
        }

        if (a.isElectroPulser && a.x < canvas.width - 80) {
            a.abilityTimer++;
            if (a.abilityTimer >= a.pulseRate && cows.length > 0) {
                a.abilityTimer = 0;
                const nearbyCows = cows.filter(c => Math.abs(c.x - a.x) < 380);
                if (nearbyCows.length > 0) {
                    let prevX = a.x;
                    let prevY = a.y;
                    const targets = nearbyCows.slice(0, 4);
                    targets.forEach(target => {
                        addVisualEffect('bolt', prevX, prevY, target.x, target.y, 0, '#00f5d4', 18);
                        target.hp -= a.pulseDmg * (1 + biomeIndex * 0.25);
                        prevX = target.x;
                        prevY = target.y;
                    });
                    addFloatingText('⚡ PULSE SCATTER!', a.x, a.y - 30, '#00f5d4');
                    for (let k = cows.length - 1; k >= 0; k--) {
                        if (cows[k].hp <= 0) cows.splice(k, 1);
                    }
                }
            }
        }

        if (a.isBoss) {
            a.abilityTimer++;

            if (a.bossType === 'shiftAura' && frame % 30 === 0) {
                cows.forEach(c => {
                    if (Math.abs(c.x - a.x) <= 170 && Math.abs(c.y - a.y) <= 170) {
                        c.hp -= 28;
                        addVisualEffect('bolt', a.x, a.y, c.x, c.y, 0, '#00f5d4', 12);
                    }
                });
                for (let k = cows.length - 1; k >= 0; k--) {
                    if (cows[k].hp <= 0) cows.splice(k, 1);
                }
            }

            if (a.bossType === 'spawner' && a.abilityTimer >= 360) {
                a.abilityTimer = 0;
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.grunt, { typeKey: 'grunt', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 180, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
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
                aliens.push(Object.assign({}, ALIEN_TYPES.ghost, { typeKey: 'ghost', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 350, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
                addFloatingText('🌊 TIDE SURGE!', a.x, a.y - 40, '#48cae4');
            } else if (a.bossType === 'freezer' && a.abilityTimer >= 480 && cows.length > 0) {
                a.abilityTimer = 0;
                addVisualEffect('shockwave', a.x, a.y, 0, 0, 350, '#90e0ef', 24);
                for (let k = 0; k < 2; k++) {
                    const target = cows[Math.floor(Math.random() * cows.length)];
                    target.frozenTimer = 120;
                    addFloatingText('❄️ FROZEN (2s)!', target.x, target.y - 25, '#90e0ef');
                }
            } else if (a.bossType === 'venomMist' && a.abilityTimer >= 360) {
                a.abilityTimer = 0;
                addVisualEffect('explosion', a.x, a.y, 0, 0, 450, '#80ed99', 24);
                cows.forEach(c => { c.hp -= 35; });
                addFloatingText('☠️ TOXIC CLOUD!', a.x, a.y - 40, '#80ed99');
            } else if (a.bossType === 'overlord' && a.abilityTimer >= 380) {
                a.abilityTimer = 0;
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.charger, { typeKey: 'charger', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 900, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
                addFloatingText('🔥 STAMPEDE!', a.x, a.y - 40, '#ff9f1c');
            } else if (a.bossType === 'emperor' && a.abilityTimer >= 420) {
                a.abilityTimer = 0;
                if (cows.length > 0) {
                    const target = cows[Math.floor(Math.random() * cows.length)];
                    target.frozenTimer = 120;
                }
                const r = Math.floor(Math.random() * ROWS);
                aliens.push(Object.assign({}, ALIEN_TYPES.juggernaut, { typeKey: 'juggernaut', row: r, x: a.x - 20, y: r * CELL_SIZE + 50, maxHp: 3500, slowTimer: 0, freezeTimer: 0, poisonTimer: 0 }));
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
                        c.hp -= 130;
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

    for (let i = visualEffects.length - 1; i >= 0; i--) {
        visualEffects[i].life--;
        if (visualEffects[i].life <= 0) visualEffects.splice(i, 1);
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
        ctx.strokeStyle = 'rgba(255, 209, 102, 0.85)';
        ctx.lineWidth = 3;
        ctx.strokeRect(hoverCol * CELL_SIZE + 2, hoverRow * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    }
}

function drawVisualEffects() {
    visualEffects.forEach(fx => {
        const alpha = Math.max(0, fx.life / fx.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;

        if (fx.type === 'ring' || fx.type === 'shockwave') {
            const currentR = fx.type === 'shockwave' ? fx.radius * (1 - alpha * 0.6) : fx.radius;
            ctx.strokeStyle = fx.color;
            ctx.lineWidth = fx.type === 'shockwave' ? 5 : 3;
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, currentR, 0, Math.PI * 2);
            ctx.stroke();
        } else if (fx.type === 'explosion') {
            ctx.fillStyle = fx.color;
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.radius * (1 - alpha * 0.3), 0, Math.PI * 2);
            ctx.fill();
        } else if (fx.type === 'bolt') {
            ctx.strokeStyle = fx.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(fx.x, fx.y);
            const midX = (fx.x + fx.x2) / 2 + (Math.random() * 24 - 12);
            const midY = (fx.y + fx.y2) / 2 + (Math.random() * 24 - 12);
            ctx.lineTo(midX, midY);
            ctx.lineTo(fx.x2, fx.y2);
            ctx.stroke();
        } else if (fx.type === 'windWave') {
            ctx.strokeStyle = fx.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(fx.x, fx.y, fx.radius, -Math.PI / 3, Math.PI / 3);
            ctx.stroke();
        }

        ctx.restore();
    });
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
        ctx.arc(p.x, p.y, p.piercing ? 10 : 7, 0, Math.PI * 2);
        ctx.fill();
    });

    alienProjectiles.forEach(ap => {
        ctx.fillStyle = '#ff0055';
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, 6, 0, Math.PI * 2);
        ctx.fill();
    });

    aliens.forEach(a => {
        if (a.bossType === 'shiftAura') {
            ctx.save();
            ctx.strokeStyle = 'rgba(0, 245, 212, 0.45)';
            ctx.fillStyle = 'rgba(0, 245, 212, 0.12)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(a.x, a.y, 170, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

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

        const barWidth = a.isBoss ? 76 : 44;
        const hpPct = Math.max(0, a.hp / a.maxHp);
        ctx.fillStyle = '#222';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 14, barWidth, 7);
        ctx.fillStyle = a.isBoss ? '#ffbe0b' : '#ef476f';
        ctx.fillRect(a.x - barWidth / 2, a.y - a.size / 2 - 14, barWidth * hpPct, 7);
    });

    drawVisualEffects();

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
    milk = 150 + (biomeIndex * 200);
    barnHp = 15;
    cows = new Array();
    aliens = new Array();
    projectiles = new Array();
    alienProjectiles = new Array();
    floatingTexts = new Array();
    visualEffects = new Array();
    gameOver = false;
    overlay.classList.add('hidden');
    updateHUD();
    startWave();
}

updateHUD();
startWave();
gameLoop();

