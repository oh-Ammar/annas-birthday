// ===== V6 - COMPLETE BIRTHDAY WEBSITE FOR ANNA =====
// Global State Management
const AppState = {
    giftOpened: false,
    gameActive: false,
    gameScore: 0,
    gameTime: 45, // V6: Increased from 30 to 45 seconds
    gameHearts: [],
    quizCurrentQuestion: 0,
    quizScore: 0,
    quizAnswers: [],
    candlesBlown: 0,
    sectionsViewed: new Set(),
    musicPlaying: false,
    soundsEnabled: false,
    fireworksLaunched: 0,
    photosViewed: new Set(),
    achievementsUnlocked: new Set(),
    balloonsPopped: 0,
    bottleOpened: false,
    envelopeOpened: false,
    currentPhotoIndex: 0,
};

// Simple sound effect system
function playSound(type) {
    if (!soundsEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different sounds
    const sounds = {
        click: {freq: 800, duration: 0.1},
        success: {freq: 880, duration: 0.3},
        pop: {freq: 440, duration: 0.2},
        achievement: {freq: 1000, duration: 0.5},
        heart: {freq: 700, duration: 0.15},
        whoosh: {freq: 300, duration: 0.3},
        firework: {freq: 1047, duration: 0.3}
    };
    
    const sound = sounds[type] || sounds.click;
    
    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';
    
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + sound.duration);
    
    oscillator.start(now);
    oscillator.stop(now + sound.duration);
}

const SoundSystem = {
    playSound: playSound
};

// Simple quiz state (no boss battle)

// Quiz Questions Data
const quizQuestions = [
    {
    question: "Where did we meet?",
    options: ["Through friends", "I don't remember", "Random", "Wild Rift discord"],
    correct: 3
  },
  {
    question: "What happened on our first day?",
    options: ["One game", "We called", "8 hours of texting", "We planned to meet"],
    correct: 2
  },
  {
    question: "What made our connection feel different?",
    options: ["We forced it", "It was natural and just felt right", "We took it slow", "We rushed it"],
    correct: 1
  },
  {
    question: "When were some of our best moments?",
    options: ["During the day", "Playing Until Dawn and Detroit together", "In person only", "Rarely"],
    correct: 1
  },
  {
    question: "What describes us best?",
    options: ["Two people on the same frequency", "Forced connection", "Complicated", "Casual"],
    correct: 0
  }
];

// V6: 8 Reasons Why Anna is Amazing
const reasons = [
    "You found me when I didn't know I was looking for you",
  "The way you made distance feel like nothing",
  "You're genuine and real in a way that's rare",
  "Every conversation with you feels effortless",
  "You make me laugh until my stomach hurts",
  "The way we just click, no forcing required",
  "You inspire me to be better, every single day",
  "Your kindness and authenticity are unmatched"
];

const balloonWishes = [
      "Happy Birthday to my person 💫",
  "Thank you for that first Wild Rift message 🎮",
  "Here's to nights until dawn together 🌙",
  "Distance doesn't change what we are ❤️",
  "You're my rare connection 🌟",
  "Every moment with you is a gift 💕",
  "I'm so grateful you exist 🙏",
  "Happy Birthday, Anna 🎂"
];

// V6: 10 Achievements
const achievements = [
    { id: 'first_click', title: 'The Journey Begins', desc: 'Opened the gift box', icon: '\ud83c\udf81' },
    { id: 'music_lover', title: 'Music Lover', desc: 'Played background music', icon: '\ud83c\udfb5' },
    { id: 'heart_champion', title: 'Heart Champion', desc: 'Scored 35+ in game', icon: '\ud83c\udfae' },
    { id: 'quiz_master', title: 'Quiz Master', desc: 'Perfect quiz score', icon: '\ud83c\udfc6' },
    { id: 'speed_demon', title: 'Perfect Timing', desc: 'Blew all candles in 10s', icon: '\ud83d\udd6f\ufe0f' },
    { id: 'star_gazer', title: 'Star Gazer', desc: 'Clicked constellation', icon: '\u2b50' },
    { id: 'romantic', title: 'Romantic Soul', desc: 'Read all messages', icon: '\ud83d\udc95' },
    { id: 'photographer', title: 'Memory Keeper', desc: 'Viewed gallery', icon: '\ud83d\udcf8' },
    { id: 'explorer', title: 'Curious Explorer', desc: 'Visited all sections', icon: '\ud83d\uddfa\ufe0f' },
    { id: 'completionist', title: 'Completionist', desc: 'Unlocked everything', icon: '\ud83c\udf96\ufe0f' }
];

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Loading Screen
window.addEventListener('load', () => {
    const loadingMessages = [
        "Preparing your surprise... \ud83c\udf81",
        "Getting ready to celebrate you... 🎁",
        "Setting up the stars... ⭐",
        "Remembering all our moments... 💫",
        "Almost ready... 💕",
        "Let's celebrate Anna... 🎂"
    ];
    
    let progress = 0;
    const loadingText = document.querySelector('.loading-text');
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                    initializeApp();
                }, 500);
            }, 500);
        }
        
        const msgIndex = Math.min(Math.floor(progress / 20), loadingMessages.length - 1);
        if (loadingText && loadingMessages[msgIndex]) {
            loadingText.textContent = loadingMessages[msgIndex];
        }
    }, 200);
});

// Initialize Application
function initializeApp() {
    initBackgroundMusicAutoPlay();
    initHeroSection();
    initScrollAnimations();
    initNavigationDots();
    initBackToTop();
    initParticles();
    initMemoryCards();
    initMiniGame();
    initWelcomeMessage();
    initQuiz();
    initVirtualCake();
    initReasons();
    initFinalMessage();
    initCursorTrail();
    initSoundToggle();
    initCountdownTimer();
    initPhotoGallery();
    initMessageBottle();
    initBalloonMessages();
    initLoveLetter();
    initConstellation();
    initRoseGarden();
    initFireworks();
    initParallaxScrolling();
    initAchievementSystem();
    initBackgroundMusic();
    displayAchievements();
    initCharacterStats();
    initLootBox();
    initSavePoint();
    initCreditsAnimation();
}

// Hero Section - Gift Box
function initHeroSection() {
    const giftBox = document.getElementById('giftBox');
    const startBtn = document.getElementById('startJourneyBtn');
    const heroParticles = document.getElementById('heroParticles');

    createFloatingParticles(heroParticles, ['\u2764\ufe0f', '\u2728', '\u2b50', '\ud83d\udc95', '\ud83c\udf1f'], 20);

    giftBox.addEventListener('click', () => {
        if (!AppState.giftOpened) {
            AppState.giftOpened = true;
            giftBox.classList.add('opening');
            
            SoundSystem.playSound('pop');
            unlockAchievement('first_click');

            createRosePetalBurst(window.innerWidth / 2, window.innerHeight / 2, 100);

            setTimeout(() => {
                giftBox.classList.add('opened');
                startBtn.style.display = 'inline-block';
                

            }, 500);
        }
    });

    startBtn.addEventListener('click', () => {
        SoundSystem.playSound('success');
        // FIXED: Scroll to Memory Cards (flashcards) section
        const memorySection = document.getElementById('memoryLane');
        if (memorySection) {
            memorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Floating Particles
function createFloatingParticles(canvas, particles, count) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particleObjects = [];

    for (let i = 0; i < count; i++) {
        particleObjects.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: randomRange(-0.5, 0.5),
            vy: randomRange(-0.5, 0.5),
            size: randomRange(20, 30),
            emoji: particles[Math.floor(Math.random() * particles.length)],
            opacity: randomRange(0.3, 0.8)
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particleObjects.forEach(p => {
            ctx.globalAlpha = p.opacity;
            ctx.font = `${p.size}px Arial`;
            ctx.fillText(p.emoji, p.x, p.y);

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize with constellation recreation
    window.addEventListener('resize', debounce(() => {
        setupCanvas();
        createBackgroundStars();
        constellationPoints = createANNAConstellation(canvas.width, canvas.height);
        progress = 0; // Reset reveal animation
    }, 250));
}

// Character Stats (RPG-style)
function initCharacterStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !AppState.sectionsViewed.has('character-stats')) {
        AppState.sectionsViewed.add('character-stats');
        setTimeout(() => animateStatBars(), 300); // Add delay
      }
    });
  }, { threshold: 0.3 }); // Lower threshold
  
  const section = document.getElementById('character-stats');
  if (section) observer.observe(section);
}

function animateStatBars() {
  const bars = document.querySelectorAll('.progress-fill-stat');
  if (bars.length === 0) return; // Safety check
  
  bars.forEach((bar, index) => {
    const value = parseInt(bar.getAttribute('data-value')) || 0;
    const finalWidth = Math.min(value / 10, 100); // Ensure max 100%
    
    setTimeout(() => {
      bar.style.transition = 'width 1s ease-out';
      bar.style.width = finalWidth + '%';
      SoundSystem.playSound('success');
    }, index * 300);
  });
}


// Loot Box / Treasure Chest - FIXED: Works on click
function initLootBox() {
  const chest = document.getElementById('treasureChest');
  if (!chest) return;
  
  const lootMessage = document.getElementById('lootMessage');
  const coinParticles = document.getElementById('coinParticles');
  
  const compliments = [
    "You found me on Wild Rift and changed my entire life 💫",
    "The way we clicked was instant and natural 🌟",
    "8 hours of texting on day one and I was already gone 💕",
    "Playing until dawn and detroit with you felt like home ✨",
    "You're my rare connection, my one of a kind 💎",
    "Distance means nothing when you're my person 🌙",
    "Your authenticity is what made me fall for you 💖",
    "No one makes me laugh like you do 😊",
    "You inspire me every single day 🌺",
    "I'm so grateful the universe brought us together ⭐"
  ];
  
  let lastComplimentIndex = -1;
  let clickCount = 0;
  
  chest.addEventListener('click', () => {
    clickCount++;
    chest.classList.remove('opening');
    
    // Force reflow to restart animation
    void chest.offsetWidth;
    chest.classList.add('opening');
    
    SoundSystem.playSound('pop');
    
    // Get random compliment (avoid repeats)
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * compliments.length);
    } while (randomIndex === lastComplimentIndex && compliments.length > 1);
    
    lastComplimentIndex = randomIndex;
    
    setTimeout(() => {
      lootMessage.textContent = compliments[randomIndex];
      lootMessage.style.display = 'block';
      lootMessage.style.opacity = '0';
      
      // Fade in the new compliment
      setTimeout(() => {
        lootMessage.style.transition = 'opacity 0.5s ease';
        lootMessage.style.opacity = '1';
      }, 10);
      
      // Coin particle explosion
      createCoinExplosion(coinParticles);
      
      // Rose petals
      const rect = chest.getBoundingClientRect();
      createRosePetalBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        30
      );
      
      SoundSystem.playSound('achievement');
    }, 400);
  });
}


function createCoinExplosion(container) {
    const coinEmojis = ['🪙', '💰', '💎', '⭐', '✨'];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.textContent = coinEmojis[Math.floor(Math.random() * coinEmojis.length)];
        
        const angle = (Math.PI * 2 * i) / count;
        const distance = randomRange(100, 300);
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        coin.style.left = '50%';
        coin.style.top = '50%';
        coin.style.setProperty('--tx', tx + 'px');
        coin.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(coin);
        
        setTimeout(() => coin.remove(), 1000);
    }
}

// Save Point (Zelda-style) - REAL-TIME TRACKING
function initSavePoint() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !AppState.sectionsViewed.has('save-point')) {
                AppState.sectionsViewed.add('save-point');
                updateSavePointStats();
                createSaveParticles();
            }
        });
    }, { threshold: 0.5 });
    
    const section = document.getElementById('save-point');
    if (section) observer.observe(section);
    
    function updateSavePointStats() {
        // Use the global updateProgressDisplay function
        updateProgressDisplay();
        
        const sectionsCount = AppState.sectionsViewed.size;
        const achievementsCount = AppState.achievementsUnlocked.size;
        
        SoundSystem.playSound('achievement');
        
        // Animate numbers counting up
        animateValue('sectionsVisited', 0, sectionsCount, 1000);
        animateValue('achievementsCount', 0, achievementsCount, 1000);
        animateValue('savedGameScore', 0, AppState.gameScore, 1500);
    }
    
    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);
        if (!element) return;
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = Math.round(end);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }
    
    function createSaveParticles() {
        const container = document.getElementById('saveParticles');
        if (!container) return;
        
        const particleEmojis = ['✨', '⭐', '💫', '🌟'];
        const count = 20;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
                particle.style.position = 'absolute';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.fontSize = randomRange(15, 30) + 'px';
                particle.style.animation = 'saveParticleFade 2s ease-out forwards';
                particle.style.pointerEvents = 'none';
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }
}

// Add CSS animation for save particles
if (!document.querySelector('#saveParticleStyle')) {
    const style = document.createElement('style');
    style.id = 'saveParticleStyle';
    style.textContent = `
        @keyframes saveParticleFade {
            0% {
                opacity: 0;
                transform: scale(0) translateY(0);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) translateY(-30px);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) translateY(-60px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Navigation Dots
function initNavigationDots() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const dots = document.querySelectorAll('.dot');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (sections[index]) {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const updateActiveDot = debounce(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                dots.forEach(d => d.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            }
        });

        updateProgressBar();
    }, 50);

    window.addEventListener('scroll', updateActiveDot);
}

// Progress Bar
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100));

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Particles for various sections
function initParticles() {
    const reasonsParticles = document.getElementById('reasonsParticles');
    const welcomeParticles = document.getElementById('welcomeParticles');
    const countdownParticles = document.getElementById('countdownParticles');
    
    createFloatingParticles(reasonsParticles, ['\u2b50', '\u2728', '\ud83d\udcab', '\ud83c\udf1f'], 15);
    createFloatingParticles(welcomeParticles, ['\ud83c\udf89', '\ud83c\udf88', '\ud83c\udf8a'], 12);
    createFloatingParticles(countdownParticles, ['\u23f0', '\ud83c\udf82', '\ud83c\udf81'], 10);
}

// Memory Cards
function initMemoryCards() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            SoundSystem.playSound('click');
            createSparkleEffect(
                card.getBoundingClientRect().left + card.offsetWidth / 2,
                card.getBoundingClientRect().top + card.offsetHeight / 2,
                10
            );
        });
    });
}

// V6: Mini Game - SLOWER Hearts (1.5-3 speed, 45s, 1100ms spawn)
function initMiniGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('gameStartBtn');
    const restartBtn = document.getElementById('gameRestartBtn');
    const scoreDisplay = document.getElementById('gameScore');
    const timeDisplay = document.getElementById('gameTime');
    const gameOverMessage = document.getElementById('gameOverMessage');

    let animationFrame;
    let gameStartTime = 0;

    function startGame() {
        AppState.gameActive = true;
        AppState.gameScore = 0;
        AppState.gameTime = 45; // V6: 45 seconds
        AppState.gameHearts = [];
        gameStartTime = Date.now();

        startBtn.style.display = 'none';
        gameOverMessage.style.display = 'none';
        scoreDisplay.textContent = '0';
        timeDisplay.textContent = '45';
        
        SoundSystem.playSound('whoosh');

        const timer = setInterval(() => {
            if (!AppState.gameActive) {
                clearInterval(timer);
                return;
            }

            AppState.gameTime--;
            timeDisplay.textContent = AppState.gameTime;

            if (AppState.gameTime <= 0) {
                endGame();
                clearInterval(timer);
            }
        }, 1000);

        // V8: Spawn every 800ms (more hearts, slower fall)
        const spawner = setInterval(() => {
            if (!AppState.gameActive) {
                clearInterval(spawner);
                return;
            }
            spawnHeart();
        }, 800);

        gameLoop();
    }

    function spawnHeart() {
        const MIN_SPACING = 60;
        const maxAttempts = 10;
        let attempts = 0;
        let newX;
        let validPosition = false;

        while (attempts < maxAttempts && !validPosition) {
            newX = Math.random() * (canvas.width - 60) + 30;
            validPosition = true;

            for (let heart of AppState.gameHearts) {
                if (heart.y < 100) {
                    const distance = Math.abs(newX - heart.x);
                    if (distance < MIN_SPACING) {
                        validPosition = false;
                        break;
                    }
                }
            }
            attempts++;
        }

        if (validPosition) {
            const heartColors = ['\u2764\ufe0f', '\ud83d\udc95', '\ud83d\udc96', '\ud83d\udc97'];
            AppState.gameHearts.push({
                x: newX,
                y: -30,
                speed: randomRange(1.5, 2.4), // V8: SLOWER [1.5-2.4] more spawns, slower fall
                size: 30,
                emoji: heartColors[Math.floor(Math.random() * heartColors.length)],
                clicked: false,
                id: Date.now() + Math.random()
            });
        }
    }

    function gameLoop() {
        if (!AppState.gameActive) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        AppState.gameHearts.sort((a, b) => a.y - b.y);

        AppState.gameHearts = AppState.gameHearts.filter(heart => {
            if (heart.clicked) return false;

            heart.y += heart.speed;

            if (heart.y > canvas.height + 50) return false;

            ctx.save();
            ctx.globalAlpha = 0.95;
            ctx.font = `${heart.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(heart.emoji, heart.x, heart.y);
            ctx.restore();

            return true;
        });

        animationFrame = requestAnimationFrame(gameLoop);
    }

    function endGame() {
        AppState.gameActive = false;
        cancelAnimationFrame(animationFrame);

        const elapsedTime = (Date.now() - gameStartTime) / 1000;

        document.getElementById('finalScore').textContent = AppState.gameScore;
        gameOverMessage.style.display = 'block';

        createRosePetalBurst(window.innerWidth / 2, window.innerHeight * 0.6, 60);
        
        // V7: Achievable score requirement (35+ instead of 50+)
        if (AppState.gameScore >= 35) {
            unlockAchievement('heart_champion');
        }
    }

    canvas.addEventListener('click', (e) => {
        if (!AppState.gameActive) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        AppState.gameHearts.forEach(heart => {
            if (heart.clicked) return;

            const distance = Math.sqrt(
                Math.pow(clickX - heart.x, 2) + Math.pow(clickY - heart.y, 2)
            );

            if (distance < heart.size) {
                heart.clicked = true;
                AppState.gameScore++;
                scoreDisplay.textContent = AppState.gameScore;
                
                // Update save point display in real-time
                updateProgressDisplay();

                SoundSystem.playSound('heart');
                createSparkleEffect(e.clientX, e.clientY, 15);
            }
        });
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
}

// Welcome Message - Typewriter Effect
function initWelcomeMessage() {
    const typewriterElement = document.getElementById('typewriterText');
    const message = "Hey Anna, happy birthday to you. I wanted to take a moment to tell you how much you really mean to me. From that first Wild Rift server message to staying up playing story games or wild rift together, you've been such a rare light in my life. I'm grateful for every moment we've shared, even across the distance. Here's to celebrating you today. 💕";
    let index = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !AppState.sectionsViewed.has('welcome')) {
                AppState.sectionsViewed.add('welcome');
                typeWriter();
            }
        });
    }, { threshold: 0.5 });

    const section = document.getElementById('welcomeMessage');
    if (section) observer.observe(section);

    function typeWriter() {
        if (index < message.length) {
            typewriterElement.textContent += message.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
}

// Quiz Section
function initQuiz() {
    loadQuizQuestion();

    document.getElementById('quizRestartBtn').addEventListener('click', () => {
        AppState.quizCurrentQuestion = 0;
        AppState.quizScore = 0;
        AppState.quizAnswers = [];
        document.getElementById('quizResult').style.display = 'none';
        document.getElementById('quizContent').style.display = 'block';
        loadQuizQuestion();
    });
}

function loadQuizQuestion() {
    if (AppState.quizCurrentQuestion >= quizQuestions.length) {
        showQuizResults();
        return;
    }

    const question = quizQuestions[AppState.quizCurrentQuestion];
    const progress = ((AppState.quizCurrentQuestion + 1) / quizQuestions.length) * 100;
    
    document.getElementById('quizProgress').style.width = progress + '%';
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionDiv);
    });
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[AppState.quizCurrentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = selectedIndex === question.correct;

    options[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
    
    SoundSystem.playSound(isCorrect ? 'success' : 'pop');

    if (isCorrect) {
        AppState.quizScore++;
        createHeartExplosion(window.innerWidth / 2, window.innerHeight * 0.6, 30);
    }

    setTimeout(() => {
        AppState.quizCurrentQuestion++;
        loadQuizQuestion();
    }, 1500);
}

function showQuizResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizFinalScore').textContent = AppState.quizScore;

    const messages = [
        "You know Anna so well! FLAWLESS VICTORY! \ud83c\udf1f",
        "Great job! You really pay attention! \ud83d\udc95",
        "Not bad! There's always more to learn! \ud83d\ude0a",
        "Keep getting to know Anna better! \ud83c\udf89"
    ];

    const messageIndex = AppState.quizScore === 5 ? 0 : 
                        AppState.quizScore >= 3 ? 1 : 
                        AppState.quizScore >= 2 ? 2 : 3;

    document.getElementById('quizResultMessage').textContent = messages[messageIndex];

    // V8: VICTORY FANFARE
    createRosePetalBurst(window.innerWidth / 2, window.innerHeight * 0.6, 100);
    createGoldenDustShimmer();
    createHeartExplosion(window.innerWidth / 2, window.innerHeight * 0.6, 50);
    
    if (AppState.quizScore === 5) {
        unlockAchievement('quiz_master');
    }
}

// Virtual Cake
function initVirtualCake() {
    const candles = document.querySelectorAll('.candle');
    const wishMessage = document.getElementById('wishMessage');
    const musicNotes = document.getElementById('musicNotes');
    let firstCandleTime = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !AppState.sectionsViewed.has('cake')) {
                AppState.sectionsViewed.add('cake');
                playBirthdaySong();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('virtualCake'));

    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            if (!candle.classList.contains('blown-out')) {
                if (AppState.candlesBlown === 0) {
                    firstCandleTime = Date.now();
                }
                
                candle.classList.add('blown-out');
                AppState.candlesBlown++;
                
                SoundSystem.playSound('whoosh');

                const rect = candle.getBoundingClientRect();
                createSparkleEffect(rect.left + rect.width / 2, rect.top, 20);

                if (AppState.candlesBlown === candles.length) {
                    const elapsedTime = (Date.now() - firstCandleTime) / 1000;
                    
                    setTimeout(() => {
                        wishMessage.style.display = 'block';
                        
                        createRosePetalBurst(window.innerWidth / 2, window.innerHeight * 0.6, 150);
                        createHeartExplosion(window.innerWidth / 2, window.innerHeight * 0.6, 50);
                        createGoldenDustShimmer();
                        
                        unlockAchievement('wishes');
                        
                        if (elapsedTime <= 10) {
                            unlockAchievement('speed_demon');
                        }
                    }, 500);
                }
            }
        });
    });

    function playBirthdaySong() {
        musicNotes.classList.add('playing');
        musicNotes.innerHTML = '<span class="music-note">\ud83c\udfb5</span><span class="music-note">\ud83c\udfb6</span><span class="music-note">\ud83c\udfb5</span>';
    }
}

// Reasons Section
function initReasons() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !AppState.sectionsViewed.has('reasons')) {
                AppState.sectionsViewed.add('reasons');
                displayReasons();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.getElementById('reasons'));

    function displayReasons() {
        const container = document.getElementById('reasonsContainer');
        reasons.forEach((reason, index) => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            card.innerHTML = `
                <div class="reason-number">${index + 1}</div>
                <div class="reason-text">${reason}</div>
            `;
            container.appendChild(card);
        });
    }
}

// Final Message
function initFinalMessage() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !AppState.sectionsViewed.has('final')) {
                AppState.sectionsViewed.add('final');
                startFinalConfetti();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('finalMessage'));

    document.getElementById('celebrateAgainBtn').addEventListener('click', () => {
        SoundSystem.playSound('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            createRosePetalBurst(window.innerWidth / 2, window.innerHeight * 0.3, 60);
            createHeartExplosion(window.innerWidth / 2, window.innerHeight * 0.3, 40);
        }, 800);
    });

    function startFinalConfetti() {
        const duration = 5000;
        const end = Date.now() + duration;

        createRosePetalBurst(window.innerWidth / 2, window.innerHeight / 2, 100);
        createGoldenDustShimmer();
        createFloatingHearts();

        const interval = setInterval(() => {
            if (Date.now() > end) {
                clearInterval(interval);
                return;
            }

            if (Math.random() > 0.7) {
                createRosePetalBurst(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.5,
                    10
                );
            }
        }, 500);
    }
}

// ===== ROMANTIC PARTICLE SYSTEMS =====

function createRosePetalBurst(x, y, count) {
    const colors = ['#DC143C', '#FA003F', '#8B0000', '#FF6B6B'];
    const container = document.body;
    
    for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.style.position = 'fixed';
        petal.style.left = x + 'px';
        petal.style.top = y + 'px';
        petal.style.width = randomRange(20, 40) + 'px';
        petal.style.height = randomRange(25, 45) + 'px';
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.borderRadius = '50% 0 50% 0';
        petal.style.opacity = '0.8';
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '9999';
        petal.style.filter = 'blur(0.5px)';
        
        container.appendChild(petal);
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = randomRange(3, 8);
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - randomRange(2, 5);
        const rotation = randomRange(0, 360);
        const rotationSpeed = randomRange(-5, 5);
        const swayAmount = randomRange(20, 40);
        
        animateRosePetal(petal, vx, vy, rotation, rotationSpeed, swayAmount);
    }
}

function animateRosePetal(petal, vx, vy, rotation, rotationSpeed, swayAmount) {
    let posX = parseFloat(petal.style.left);
    let posY = parseFloat(petal.style.top);
    let currentRotation = rotation;
    let velocityY = vy;
    let velocityX = vx;
    let swayOffset = 0;
    let opacity = 0.8;
    
    function update() {
        velocityY += 0.15;
        velocityX *= 0.98;
        
        posX += velocityX;
        posY += velocityY;
        currentRotation += rotationSpeed;
        swayOffset += 0.1;
        
        const sway = Math.sin(swayOffset) * swayAmount;
        
        petal.style.left = (posX + sway) + 'px';
        petal.style.top = posY + 'px';
        petal.style.transform = `rotate(${currentRotation}deg) rotateX(${Math.sin(swayOffset * 2) * 20}deg)`;
        
        if (posY > window.innerHeight - 100) {
            opacity -= 0.02;
            petal.style.opacity = opacity;
        }
        
        if (posY < window.innerHeight + 100 && opacity > 0) {
            requestAnimationFrame(update);
        } else {
            petal.remove();
        }
    }
    
    update();
}

function createHeartExplosion(x, y, count) {
    const emojis = ['\u2764\ufe0f', '\ud83d\udc95', '\ud83d\udc96', '\ud83d\udc97', '\ud83d\udc93', '\ud83d\udc9e'];
    const container = document.body;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = randomRange(15, 35) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.opacity = '0';
        
        container.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = randomRange(2, 6);
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - randomRange(1, 3);
        
        animateHeart(heart, vx, vy);
    }
}

function animateHeart(heart, vx, vy) {
    let posX = parseFloat(heart.style.left);
    let posY = parseFloat(heart.style.top);
    let velocityY = vy;
    let velocityX = vx;
    let scale = 0.5;
    let opacity = 0;
    let rotation = 0;
    let phase = 'fadeIn';
    
    function update() {
        if (phase === 'fadeIn') {
            opacity += 0.05;
            scale += 0.05;
            if (opacity >= 1) phase = 'float';
        } else if (phase === 'float') {
            velocityY += 0.1;
            velocityX *= 0.99;
            
            posX += velocityX;
            posY += velocityY;
            rotation += 2;
            
            if (posY > window.innerHeight - 200) phase = 'fadeOut';
        } else if (phase === 'fadeOut') {
            opacity -= 0.03;
            scale -= 0.02;
        }
        
        heart.style.left = posX + 'px';
        heart.style.top = posY + 'px';
        heart.style.opacity = opacity;
        heart.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        
        if (opacity > 0 && posY < window.innerHeight + 50) {
            requestAnimationFrame(update);
        } else {
            heart.remove();
        }
    }
    
    update();
}

function createSparkleEffect(x, y, count) {
    const container = document.body;
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '\u2728';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = randomRange(10, 20) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.opacity = '1';
        sparkle.style.filter = 'drop-shadow(0 0 5px #FFD700)';
        
        container.appendChild(sparkle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = randomRange(2, 5);
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        animateSparkle(sparkle, vx, vy);
    }
}

function animateSparkle(sparkle, vx, vy) {
    let posX = parseFloat(sparkle.style.left);
    let posY = parseFloat(sparkle.style.top);
    let opacity = 1;
    let scale = 1;
    let life = 0;
    
    function update() {
        life++;
        posX += vx;
        posY += vy;
        
        opacity = 0.5 + Math.sin(life * 0.2) * 0.5;
        scale = 0.8 + Math.sin(life * 0.15) * 0.2;
        
        sparkle.style.left = posX + 'px';
        sparkle.style.top = posY + 'px';
        sparkle.style.opacity = opacity * (1 - life / 60);
        sparkle.style.transform = `scale(${scale}) rotate(${life * 10}deg)`;
        
        if (life < 60) {
            requestAnimationFrame(update);
        } else {
            sparkle.remove();
        }
    }
    
    update();
}

function createGoldenDustShimmer() {
    const container = document.body;
    const count = 200;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const dust = document.createElement('div');
            dust.style.position = 'fixed';
            dust.style.left = Math.random() * window.innerWidth + 'px';
            dust.style.top = '-10px';
            dust.style.width = randomRange(2, 5) + 'px';
            dust.style.height = randomRange(2, 5) + 'px';
            dust.style.background = '#FFD700';
            dust.style.borderRadius = '50%';
            dust.style.opacity = randomRange(0.3, 0.8);
            dust.style.pointerEvents = 'none';
            dust.style.zIndex = '9999';
            dust.style.boxShadow = '0 0 5px #FFD700';
            
            container.appendChild(dust);
            animateGoldenDust(dust);
        }, i * 10);
    }
}

function animateGoldenDust(dust) {
    let posY = -10;
    let posX = parseFloat(dust.style.left);
    const speed = randomRange(0.5, 2);
    const sway = randomRange(10, 30);
    let offset = Math.random() * Math.PI * 2;
    
    function update() {
        posY += speed;
        offset += 0.05;
        
        dust.style.top = posY + 'px';
        dust.style.left = (posX + Math.sin(offset) * sway) + 'px';
        
        if (posY < window.innerHeight) {
            requestAnimationFrame(update);
        } else {
            dust.remove();
        }
    }
    
    update();
}

function createFloatingHearts() {
    const container = document.body;
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = '\ud83d\udc95';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.bottom = '-50px';
        heart.style.fontSize = randomRange(20, 40) + 'px';
        heart.style.opacity = randomRange(0.2, 0.5);
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        
        container.appendChild(heart);
        animateFloatingHeart(heart);
    }
}

function animateFloatingHeart(heart) {
    let posY = window.innerHeight;
    let posX = parseFloat(heart.style.left);
    const speed = randomRange(0.3, 0.8);
    const sway = randomRange(20, 50);
    let offset = Math.random() * Math.PI * 2;
    let scale = 1;
    
    function update() {
        posY -= speed;
        offset += 0.02;
        scale = 1 + Math.sin(offset * 2) * 0.1;
        
        heart.style.bottom = (window.innerHeight - posY) + 'px';
        heart.style.left = (posX + Math.sin(offset) * sway) + 'px';
        heart.style.transform = `scale(${scale})`;
        
        if (posY > -100) {
            requestAnimationFrame(update);
        } else {
            heart.remove();
        }
    }
    
    update();
}

// ===== NEW PREMIUM FEATURES =====

function initCursorTrail() {
    if ('ontouchstart' in window) return;
    
    const trail = document.getElementById('cursorTrail');
    let lastTime = 0;
    const throttleDelay = 50;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttleDelay) return;
        lastTime = now;
        
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.textContent = ['\u2764\ufe0f', '\u2728', '\ud83d\udc96', '\ud83d\udc95'][Math.floor(Math.random() * 4)];
        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        
        trail.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    });
}

// SIMPLE WORKING MUSIC SYSTEM
let soundsEnabled = true;
let musicStarted = false;

function initBackgroundMusicAutoPlay() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const soundToggle = document.getElementById('soundToggle');
    
    if (!music) {
        console.error('Music element not found');
        return;
    }
    
    music.volume = 0.12;
    
    // Try to start on first interaction
    const startMusic = () => {
        if (!musicStarted) {
            music.play().catch(e => console.log('Music play blocked:', e));
            musicStarted = true;
            if (musicToggle) musicToggle.classList.add('active');
        }
    };
    
    document.addEventListener('click', startMusic, {once: true});
    
    // Music toggle
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicToggle.classList.add('active');
                musicStarted = true;
                unlockAchievement('music_lover');
            } else {
                music.pause();
                musicToggle.classList.remove('active');
            }
        });
    }
    
    // Sound toggle
    if (soundToggle) {
        soundToggle.classList.add('active'); // Start as on
        soundToggle.addEventListener('click', () => {
            soundsEnabled = !soundsEnabled;
            if (soundsEnabled) {
                soundToggle.classList.add('active');
            } else {
                soundToggle.classList.remove('active');
            }
        });
    }
}

function initBackgroundMusic() {
    // Already handled in initBackgroundMusicAutoPlay
}

function initSoundToggle() {
    // Already handled in initBackgroundMusicAutoPlay
}

// V6: Enhanced Countdown Timer
function initCountdownTimer() {
    // REMOVED: Countdown timer completely removed per user request
}

function initPhotoGallery() {
  const thumbnails = document.querySelectorAll('.photo-thumbnail');
  const modal = document.getElementById('photoModal') || createPhotoModal();
  const closeBtn = modal.querySelector('.photo-modal-close');
  const modalImg = modal.querySelector('.photo-modal-content img');
  
  // Create modal if it doesn't exist
  function createPhotoModal() {
    const m = document.createElement('div');
    m.id = 'photoModal';
    m.className = 'photo-modal';
    m.innerHTML = `
      <span class="photo-modal-close">&times;</span>
      <div class="photo-modal-content">
        <img src="" alt="Full view" />
      </div>
    `;
    document.body.appendChild(m);
    return m;
  }
  
  // Open modal on thumbnail click
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const img = thumb.querySelector('img');
      const fullImageSrc = img.getAttribute('data-full') || img.src;
      
      modalImg.src = fullImageSrc;
      modal.classList.add('active');
      AppState.photosViewed.add(fullImageSrc);
      SoundSystem.playSound('click');
      
      // Check achievement
      if (AppState.photosViewed.size >= 5) {
        unlockAchievement('photographer');
      }
    });
  });
  
  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}


function initMessageBottle() {
    const bottle = document.getElementById('messageBottleItem');
    const messageScroll = document.getElementById('messageScroll');
    const wavesCanvas = document.getElementById('bottleWaves');
    
    if (wavesCanvas) {
        const ctx = wavesCanvas.getContext('2d');
        wavesCanvas.width = wavesCanvas.offsetWidth;
        wavesCanvas.height = wavesCanvas.offsetHeight;
        
        let offset = 0;
        function drawWaves() {
            ctx.clearRect(0, 0, wavesCanvas.width, wavesCanvas.height);
            ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
            
            ctx.beginPath();
            ctx.moveTo(0, wavesCanvas.height);
            
            for (let x = 0; x < wavesCanvas.width; x++) {
                const y = Math.sin((x + offset) * 0.02) * 20 + wavesCanvas.height / 2;
                ctx.lineTo(x, y);
            }
            
            ctx.lineTo(wavesCanvas.width, wavesCanvas.height);
            ctx.fill();
            
            offset += 2;
            requestAnimationFrame(drawWaves);
        }
        drawWaves();
    }
    
    bottle.addEventListener('click', () => {
        if (!AppState.bottleOpened) {
            AppState.bottleOpened = true;
            bottle.classList.add('opening');
            
            // FIXED: Only award romantic achievement, NOT explorer
            
            SoundSystem.playSound('pop');
            
            createSparkleEffect(
                bottle.getBoundingClientRect().left + bottle.offsetWidth / 2,
                bottle.getBoundingClientRect().top,
                30
            );
            
            setTimeout(() => {
                messageScroll.style.display = 'block';
                unlockAchievement('romantic');
            }, 800);
        }
    });
}

function initBalloonMessages() {
    const container = document.getElementById('balloonsContainer');
    const colors = ['#FF6B6B', '#FFB6C1', '#FFD700', '#87CEEB', '#98D8C8', '#F7B7A3', '#EA5F89', '#9B59B6'];
    
    balloonWishes.forEach((wish, index) => {
        const balloonItem = document.createElement('div');
        balloonItem.className = 'balloon-item';
        
        const balloonShape = document.createElement('div');
        balloonShape.className = 'balloon-shape';
        balloonShape.style.background = colors[index % colors.length];
        
        const balloonString = document.createElement('div');
        balloonString.className = 'balloon-string';
        
        const balloonWish = document.createElement('div');
        balloonWish.className = 'balloon-wish';
        balloonWish.textContent = wish;
        
        balloonItem.appendChild(balloonWish);
        balloonItem.appendChild(balloonShape);
        balloonItem.appendChild(balloonString);
        container.appendChild(balloonItem);
        
        balloonItem.addEventListener('click', () => {
            if (!balloonItem.classList.contains('popped')) {
                balloonItem.classList.add('popped');
                AppState.balloonsPopped++;
                
                SoundSystem.playSound('pop');
                
                const rect = balloonShape.getBoundingClientRect();
                createSparkleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
                
                if (AppState.balloonsPopped === balloonWishes.length) {
                    unlockAchievement('balloons');
                }
            }
        });
    });
}

function initLoveLetter() {
    const envelope = document.getElementById('envelopeItem');
    const letterContent = document.getElementById('letterContent');
    
    envelope.addEventListener('click', () => {
        if (!AppState.envelopeOpened) {
            AppState.envelopeOpened = true;
            envelope.classList.add('opening');
            
            SoundSystem.playSound('whoosh');
            
            createRosePetalBurst(
                envelope.getBoundingClientRect().left + envelope.offsetWidth / 2,
                envelope.getBoundingClientRect().top + envelope.offsetHeight / 2,
                40
            );
            
            setTimeout(() => {
                letterContent.style.display = 'block';
            }, 1000);
        }
    });
}

// CONSTELLATION CANVAS - SPELLS ANNA CORRECTLY
class ConstellationCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        this.isMobile = window.innerWidth < 768;
        this.scale = this.isMobile ? 0.5 : 1;
        
        this.bgStars = this.createBgStars();
        this.constellationStars = this.createANNAStars();
        
        this.animate();
        
        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
            this.isMobile = window.innerWidth < 768;
            this.scale = this.isMobile ? 0.5 : 1;
            this.constellationStars = this.createANNAStars();
        });
        
        this.canvas.addEventListener('click', () => {
            playSound('success');
            unlockAchievement('star_gazer');
        });
    }
    
    createBgStars() {
        const stars = [];
        const count = this.isMobile ? 30 : 60;
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                r: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                speed: Math.random() * 0.02
            });
        }
        return stars;
    }
    
    createANNAStars() {
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const spacing = 140 * this.scale;
        const h = 80 * this.scale;
        const w = 50 * this.scale;
        
        const startX = cx - spacing * 1.5;
        
        const stars = [];
        
        // Letter A (index 0-4)
        const a1x = startX;
        stars.push(
            {x: a1x + w/2, y: cy - h/2, r: 5*this.scale, letter: 'A'},    // 0: top
            {x: a1x, y: cy + h/2, r: 5*this.scale, letter: 'A'},          // 1: bottom left
            {x: a1x + w, y: cy + h/2, r: 5*this.scale, letter: 'A'},      // 2: bottom right
            {x: a1x + w*0.3, y: cy, r: 4*this.scale, letter: 'A'},        // 3: crossbar left
            {x: a1x + w*0.7, y: cy, r: 4*this.scale, letter: 'A'}         // 4: crossbar right
        );
        
        // Letter N (index 5-9)
        const n1x = startX + spacing;
        stars.push(
            {x: n1x, y: cy - h/2, r: 5*this.scale, letter: 'N'},          // 5: top left
            {x: n1x, y: cy + h/2, r: 5*this.scale, letter: 'N'},          // 6: bottom left
            {x: n1x + w, y: cy - h/2, r: 5*this.scale, letter: 'N'},      // 7: top right
            {x: n1x + w, y: cy + h/2, r: 5*this.scale, letter: 'N'},      // 8: bottom right
            {x: n1x + w/2, y: cy, r: 4*this.scale, letter: 'N'}           // 9: middle (diagonal)
        );
        
        // Letter N (index 10-14)
        const n2x = startX + spacing * 2;
        stars.push(
            {x: n2x, y: cy - h/2, r: 5*this.scale, letter: 'N'},          // 10: top left
            {x: n2x, y: cy + h/2, r: 5*this.scale, letter: 'N'},          // 11: bottom left
            {x: n2x + w, y: cy - h/2, r: 5*this.scale, letter: 'N'},      // 12: top right
            {x: n2x + w, y: cy + h/2, r: 5*this.scale, letter: 'N'},      // 13: bottom right
            {x: n2x + w/2, y: cy, r: 4*this.scale, letter: 'N'}           // 14: middle
        );
        
        // Letter A (index 15-19)
        const a2x = startX + spacing * 3;
        stars.push(
            {x: a2x + w/2, y: cy - h/2, r: 5*this.scale, letter: 'A'},    // 15: top
            {x: a2x, y: cy + h/2, r: 5*this.scale, letter: 'A'},          // 16: bottom left
            {x: a2x + w, y: cy + h/2, r: 5*this.scale, letter: 'A'},      // 17: bottom right
            {x: a2x + w*0.3, y: cy, r: 4*this.scale, letter: 'A'},        // 18: crossbar left
            {x: a2x + w*0.7, y: cy, r: 4*this.scale, letter: 'A'}         // 19: crossbar right
        );
        
        return stars;
    }
    
    drawConnections() {
        this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
        this.ctx.lineWidth = 2 * this.scale;
        this.ctx.shadowBlur = 10 * this.scale;
        this.ctx.shadowColor = '#FFD700';
        
        // A connections (0-4)
        this.line(0, 1); // top to bottom left
        this.line(0, 2); // top to bottom right
        this.line(3, 4); // crossbar
        
        // N connections (5-9)
        this.line(5, 6); // left vertical
        this.line(7, 8); // right vertical
        this.line(5, 9); // top left to middle
        this.line(9, 8); // middle to bottom right
        
        // N connections (10-14)
        this.line(10, 11); // left vertical
        this.line(12, 13); // right vertical
        this.line(10, 14); // top left to middle
        this.line(14, 13); // middle to bottom right
        
        // A connections (15-19)
        this.line(15, 16); // top to bottom left
        this.line(15, 17); // top to bottom right
        this.line(18, 19); // crossbar
        
        this.ctx.shadowBlur = 0;
    }
    
    line(idx1, idx2) {
        const s1 = this.constellationStars[idx1];
        const s2 = this.constellationStars[idx2];
        this.ctx.beginPath();
        this.ctx.moveTo(s1.x, s1.y);
        this.ctx.lineTo(s2.x, s2.y);
        this.ctx.stroke();
    }
    
    animate() {
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background stars
        this.bgStars.forEach(s => {
            s.opacity += s.speed * (Math.random() > 0.5 ? 1 : -1);
            s.opacity = Math.max(0.2, Math.min(0.7, s.opacity));
            
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        // Draw constellation stars
        this.constellationStars.forEach(s => {
            // Glow
            const grad = this.ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
            grad.addColorStop(0, 'rgba(255, 215, 0, 1)');
            grad.addColorStop(0.5, 'rgba(255, 215, 0, 0.5)');
            grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
            this.ctx.fillStyle = grad;
            this.ctx.fill();
            
            // Star
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize constellation when page loads
function initConstellation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !AppState.sectionsViewed.has('constellation-init')) {
                AppState.sectionsViewed.add('constellation-init');
                new ConstellationCanvas('constellationCanvas');
            }
        });
    }, { threshold: 0.3 });
    
    const section = document.getElementById('constellation');
    if (section) observer.observe(section);
}

function initRoseGarden() {
    const container = document.getElementById('rosesContainer');
    const roseCount = 12;
    const roseColors = ['\ud83c\udf39', '\ud83c\udfba', '\ud83c\udf37', '\ud83c\udf3c', '\ud83c\udf38'];
    
    for (let i = 0; i < roseCount; i++) {
        const roseItem = document.createElement('div');
        roseItem.className = 'rose-item';
        
        const roseFlower = document.createElement('div');
        roseFlower.className = 'rose-flower';
        roseFlower.textContent = roseColors[i % roseColors.length];
        
        const roseStem = document.createElement('div');
        roseStem.className = 'rose-stem';
        
        roseItem.appendChild(roseFlower);
        roseItem.appendChild(roseStem);
        container.appendChild(roseItem);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('bloomed');
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.rose-item').forEach(rose => {
        observer.observe(rose);
    });
}

// V6: SLOWER & MORE DRAMATIC Fireworks (1.8s launch, 2.5s trail, 3.5s explosion)
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fireworks = [];
    const particles = [];
    const trails = [];
    let isAnimating = false;
    
    document.addEventListener('click', (e) => {
        // V7: Disable fireworks during hearts game
        if (AppState.gameActive) {
            return;
        }
        
        if (e.target.closest('.lightbox, button, .memory-card, .quiz-option, .candle, .balloon-item, .envelope, .bottle')) {
            return;
        }
        
        launchFirework(e.clientX, e.clientY);
        AppState.fireworksLaunched++;
        
        SoundSystem.playSound('firework');
        
        if (!isAnimating) {
            isAnimating = true;
            canvas.style.opacity = '1';
            animate();
        }
        
        if (AppState.fireworksLaunched >= 10) {
            unlockAchievement('fireworks');
        }
    });
    
    function launchFirework(targetX, targetY) {
        const colors = ['#DC143C', '#FFD700', '#FF6B6B', '#FFB6C1', '#87CEEB', '#98D8C8'];
        fireworks.push({
            x: targetX,
            y: window.innerHeight,
            targetY: targetY,
            startY: window.innerHeight,
            velocity: 6.5, // FASTER: 6.5 for 0.8s launch time
            exploded: false,
            color: colors[Math.floor(Math.random() * colors.length)],
            trail: []
        });
    }
    
    function createParticles(x, y, color) {
        const particleCount = 80;
        
        createExplosionPulse(x, y, color);
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = randomRange(2, 6); // Faster spread for dynamic effect
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                maxLife: randomRange(1.5, 2), // 1.5s explosion duration
                color: color,
                size: randomRange(2, 4),
                gravity: randomRange(0.05, 0.08) // Faster fall
            });
        }
        
        SoundSystem.playSound('pop');
    }
    
    function createExplosionPulse(x, y, color) {
        trails.push({
            x: x,
            y: y,
            radius: 5,
            maxRadius: 100,
            life: 1,
            color: color
        });
    }
    
    function animate() {
        if (fireworks.length === 0 && particles.length === 0 && trails.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isAnimating = false;
            canvas.style.opacity = '0';
            return;
        }
        
        // TRANSPARENT background - NO dimming
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = trails.length - 1; i >= 0; i--) {
            const trail = trails[i];
            
            ctx.strokeStyle = trail.color;
            ctx.globalAlpha = trail.life * 0.5;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            trail.radius += 4;
            trail.life -= 0.025;
            
            if (trail.life <= 0 || trail.radius > trail.maxRadius) {
                trails.splice(i, 1);
            }
        }
        
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const fw = fireworks[i];
            
            if (!fw.exploded) {
                fw.trail.push({ x: fw.x, y: fw.y });
                if (fw.trail.length > 20) { // 1s trail visible
                    fw.trail.shift();
                }
                
                for (let j = 0; j < fw.trail.length; j++) {
                    const point = fw.trail[j];
                    const alpha = (j / fw.trail.length) * 0.8;
                    ctx.fillStyle = fw.color;
                    ctx.globalAlpha = alpha;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
                
                ctx.shadowBlur = 20;
                ctx.shadowColor = fw.color;
                ctx.fillStyle = fw.color;
                ctx.beginPath();
                ctx.arc(fw.x, fw.y, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                
                if (Math.random() < 0.4) {
                    ctx.fillStyle = '#FFD700';
                    ctx.globalAlpha = 0.8;
                    ctx.beginPath();
                    ctx.arc(
                        fw.x + randomRange(-6, 6),
                        fw.y + randomRange(-6, 6),
                        2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
                
                fw.y -= fw.velocity;
                fw.velocity *= 0.96; // Faster deceleration
                
                if (fw.y <= fw.targetY || fw.velocity < 1) {
                    fw.exploded = true;
                    createParticles(fw.x, fw.y, fw.color);
                    fireworks.splice(i, 1);
                }
            }
        }
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = p.life * 0.3;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.life -= 0.015; // 1.5s fade duration
            
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', debounce(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, 250));
}

function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.particles-canvas');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.3;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

// V6: Enhanced Achievement System with Display
function displayAchievements() {
    const grid = document.getElementById('achievementsGrid');
    
    achievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = 'achievement-item';
        item.id = `achievement-${achievement.id}`;
        item.innerHTML = `
            <div class="achievement-item-icon">${achievement.icon}</div>
            <div class="achievement-item-title">${achievement.title}</div>
            <div class="achievement-item-desc">${achievement.desc}</div>
        `;
        grid.appendChild(item);
    });
}

function unlockAchievement(id) {
    if (AppState.achievementsUnlocked.has(id)) return;
    
    AppState.achievementsUnlocked.add(id);
    const achievement = achievements.find(a => a.id === id);
    
    if (!achievement) return;
    
    SoundSystem.playSound('achievement');
    
    // Update progress display immediately
    updateProgressDisplay();
    
    const achievementItem = document.getElementById(`achievement-${id}`);
    if (achievementItem) {
        achievementItem.classList.add('unlocked');
    }
    
    const container = document.getElementById('achievementContainer');
    const achievementEl = document.createElement('div');
    achievementEl.className = 'achievement';
    achievementEl.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-content">
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-desc">${achievement.desc}</div>
        </div>
    `;
    
    container.appendChild(achievementEl);
    
    createSparkleEffect(window.innerWidth - 150, 100, 20);
    
    setTimeout(() => {
        achievementEl.style.opacity = '0';
        achievementEl.style.transform = 'translateX(100%)';
        setTimeout(() => achievementEl.remove(), 500);
    }, 4000);
    
    if (AppState.sectionsViewed.size >= 10) {
        setTimeout(() => unlockAchievement('explorer'), 1000);
    }
    
    if (AppState.achievementsUnlocked.size === achievements.length - 1) {
        setTimeout(() => unlockAchievement('completionist'), 2000);
    }
}

// REAL-TIME Progress Tracking with IntersectionObserver - FIXED
function initAchievementSystem() {
    // Track ALL sections with IDs (18 total)
    const sections = document.querySelectorAll('section[id]');
    const totalSections = 18;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                const sectionId = entry.target.id;
                
                // Only add if not already tracked
                if (!AppState.sectionsViewed.has(sectionId)) {
                    AppState.sectionsViewed.add(sectionId);
                    
                    // Update ALL displays in real-time
                    updateProgressDisplay();
                    
                    // Check for explorer achievement
                    if (AppState.sectionsViewed.size === totalSections) {
                        unlockAchievement('explorer');
                    }
                }
            }
        });
    }, { threshold: 0.5, rootMargin: '0px' });
    
    sections.forEach(section => observer.observe(section));
}

// Update progress display - called whenever sections/achievements change
function updateProgressDisplay() {
    const sectionsEl = document.getElementById('sectionsVisited');
    const achievementsEl = document.getElementById('achievementsCount');
    const scoreEl = document.getElementById('savedGameScore');
    
    if (sectionsEl) {
        sectionsEl.textContent = AppState.sectionsViewed.size;
    }
    
    if (achievementsEl) {
        achievementsEl.textContent = AppState.achievementsUnlocked.size;
    }
    
    if (scoreEl) {
        scoreEl.textContent = AppState.gameScore;
    }
}

// Credits Animation - Only start when section visible
function initCreditsAnimation() {
    const creditsSection = document.getElementById('credits');
    if (!creditsSection) return;
    
    const creditsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const creditsScroll = document.querySelector('.credits-scroll');
                if (creditsScroll && !creditsScroll.classList.contains('animating')) {
                    creditsScroll.classList.add('animating');
                }
                creditsObserver.unobserve(creditsSection);
            }
        });
    }, { threshold: 0.3 });
    
    creditsObserver.observe(creditsSection);
}

window.addEventListener('resize', debounce(() => {
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (canvas.id === 'gameCanvas') return;
        if (canvas.id === 'fireworksCanvas') {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    });
}, 250));
