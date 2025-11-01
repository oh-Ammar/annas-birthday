// Global State Management
const AppState = {
    giftOpened: false,
    gameActive: false,
    gameScore: 0,
    gameTime: 45,
    gameHearts: [],
    quizCurrentQuestion: 0,
    quizScore: 0,
    quizAnswers: [],
    candlesBlown: 0,
    sectionsViewed: new Set(),
    musicPlaying: false,
    fireworksLaunched: 0,
    photosViewed: new Set(),
    achievementsUnlocked: new Set(),
    balloonsPopped: 0,
    bottleOpened: false,
    envelopeOpened: false,
    currentPhotoIndex: 0,
};

// Sound Effects System
const SoundSystem = {
    playSound: function(type) {
        if (!AppState.musicPlaying) return;
        
        // Create a simple beep/sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different sounds for different actions
        const soundConfig = {
            'pop': { freq: 800, duration: 0.1 },
            'success': { freq: 600, duration: 0.2 },
            'click': { freq: 400, duration: 0.05 },
            'heart': { freq: 700, duration: 0.15 },
            'whoosh': { freq: 300, duration: 0.3 },
        };
        
        const config = soundConfig[type] || soundConfig.click;
        
        oscillator.frequency.setValueAtTime(config.freq, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + config.duration);
    }
};

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



// Reasons Data
const reasons = [
  "Your laugh is literally my favorite sound in the world",
  "The way you make everything feel natural and effortless",
  "How we just clicked without trying",
  "Your creativity and how you view the world is rare",
  "How real and genuine you are, no filters, no pretense",
  "The way we get each other without words",
  "Your kindness runs deeper than anyone I know",
  "Every moment with you feels like coming home"
];


const balloonWishes = [
  "Happy Birthday to the person who changed my life 🎂",
  "Thank you for saying yes to that first game 💕",
  "Every day getting closer to you was a gift ✨",
  "You're my rare connection, my person 🌟",
  "Here's to more until-dawn moments together 🎮",
  "Distance couldn't stop what we built 💖",
  "I'm so grateful you exist 🌹",
  "Happy Birthday, Anna 💫"
];


const stickyWishes = [
  "Happy Birthday to the person who changed my life 🎂",
  "Thank you for saying yes to that first game 💕",
  "Every day getting closer to you was a gift ✨",
  "You're my rare connection, my person 🌟",
  "Here's to more until-dawn moments together 🎮",
  "Distance couldn't stop what we built 💖",
  "I'm so grateful you exist 🌹",
  "Happy Birthday, Anna 💫"
];


const achievements = [
    { id: 'explorer', title: 'Curious Explorer', desc: 'Visited all sections', icon: '🗺️' },
    { id: 'gamer', title: 'Heart Champion', desc: 'Scored 50+ in hearts game', icon: '🎮' },
    { id: 'quizmaster', title: 'Quiz Master', desc: 'Aced all quiz questions', icon: '🏆' },
    { id: 'romantic', title: 'Romantic Soul', desc: 'Read all love messages', icon: '💕' },
    { id: 'photographer', title: 'Memory Keeper', desc: 'Viewed all photos', icon: '📸' },
    { id: 'fireworks', title: 'Celebration Master', desc: 'Launched 10 fireworks', icon: '🎆' },
    { id: 'balloons', title: 'Balloon Popper', desc: 'Popped all balloons', icon: '🎈' },
    { id: 'wishes', title: 'Wish Granter', desc: 'Blew out all candles', icon: '🕯️' },
    { id: 'music_lover', title: 'Music Lover', desc: 'Played background music', icon: '🎵' },
    { id: 'star_gazer', title: 'Star Gazer', desc: 'Interacted with constellation', icon: '⭐' }
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
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        initializeApp();
    }, 2000);
});

// Initialize Application
function initializeApp() {
    initHeroSection();
    initScrollAnimations();
    initNavigationDots();
    initBackToTop();
    initParticles();
    initMemoryCards();
    initMiniGame();
    initBirthdayWishes();
    initQuiz();
    initVirtualCake();
    initReasons();
    initFinalMessage();
    
    // New premium features
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
}

// Hero Section - Gift Box
function initHeroSection() {
    const giftBox = document.getElementById('giftBox');
    const startBtn = document.getElementById('startJourneyBtn');
    const heroParticles = document.getElementById('heroParticles');

    // Hero Particles
    createFloatingParticles(heroParticles, ['❤️', '✨', '⭐', '💕', '🌟'], 20);

    giftBox.addEventListener('click', () => {
        if (!AppState.giftOpened) {
            AppState.giftOpened = true;
            giftBox.classList.add('opening');
            
            SoundSystem.playSound('pop');

            // Rose petal burst explosion
            createRosePetalBurst(window.innerWidth / 2, window.innerHeight / 2, 100);

            setTimeout(() => {
                giftBox.classList.add('opened');
                startBtn.style.display = 'inline-block';
                
                // Show countdown timer
                setTimeout(() => {
                    const timer = document.getElementById('countdownTimer');
                    if (timer) {
                        timer.style.display = 'block';
                    }
                }, 1000);
            }, 500);
        }
    });

    startBtn.addEventListener('click', () => {
        SoundSystem.playSound('success');
        document.getElementById('memoryLane').scrollIntoView({ behavior: 'smooth' });
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

    window.addEventListener('resize', debounce(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }, 250));
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
            sections[index].scrollIntoView({ behavior: 'smooth' });
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
    createFloatingParticles(reasonsParticles, ['⭐', '✨', '💫', '🌟'], 15);
}

// Memory Cards - FIXED
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

// Mini Game - Heart Catching
function initMiniGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('gameStartBtn');
    const restartBtn = document.getElementById('gameRestartBtn');
    const scoreDisplay = document.getElementById('gameScore');
    const timeDisplay = document.getElementById('gameTime');
    const gameOverMessage = document.getElementById('gameOverMessage');

    let animationFrame;

    function startGame() {
        AppState.gameActive = true;
        AppState.gameScore = 0;
        AppState.gameTime = 45;
        AppState.gameHearts = [];

        startBtn.style.display = 'none';
        gameOverMessage.style.display = 'none';
        scoreDisplay.textContent = '0';
        timeDisplay.textContent = '45';
        
        SoundSystem.playSound('whoosh');

        // Start timer
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

        // Start spawning hearts (SLOWER - 1100ms instead of 800ms)
        const spawner = setInterval(() => {
            if (!AppState.gameActive) {
                clearInterval(spawner);
                return;
            }
            spawnHeart();
        }, 1100);

        gameLoop();
    }

    function spawnHeart() {
        const MIN_SPACING = 60; // Minimum horizontal spacing between hearts
        const maxAttempts = 10;
        let attempts = 0;
        let newX;
        let validPosition = false;

        // Try to find a position that doesn't overlap with existing hearts
        while (attempts < maxAttempts && !validPosition) {
            newX = Math.random() * (canvas.width - 60) + 30;
            validPosition = true;

            // Check against all existing hearts
            for (let heart of AppState.gameHearts) {
                // Only check hearts that are near the top (within spawning area)
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

        // Only spawn if we found a valid position
        if (validPosition) {
            const heartColors = ['❤️', '💕', '💖', '💗'];
            AppState.gameHearts.push({
                x: newX,
                y: -30,
                speed: randomRange(1.5, 3), // SLOWER: [1.5-3] instead of [2-4]
                size: 30,
                emoji: heartColors[Math.floor(Math.random() * heartColors.length)],
                clicked: false,
                id: Date.now() + Math.random() // Unique identifier
            });
        }
    }

    function gameLoop() {
        if (!AppState.gameActive) return;

        // Clear canvas completely
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sort hearts by y position (furthest back first) for proper layering
        AppState.gameHearts.sort((a, b) => a.y - b.y);

        // Draw and update hearts
        AppState.gameHearts = AppState.gameHearts.filter(heart => {
            if (heart.clicked) return false;

            heart.y += heart.speed;

            // Remove hearts that fall off screen
            if (heart.y > canvas.height + 50) return false;

            // Draw heart with proper spacing and size
            ctx.save();
            ctx.globalAlpha = 0.95; // Slight transparency
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

        document.getElementById('finalScore').textContent = AppState.gameScore;
        gameOverMessage.style.display = 'block';

        // Confetti celebration
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
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

                // Sound effect
                SoundSystem.playSound('heart');
                
                // Visual feedback with sparkles
                createSparkleEffect(e.clientX, e.clientY, 15);
                
                // Check for achievement
                if (AppState.gameScore >= 50) {
                    unlockAchievement('gamer');
                }
            }
        });
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
}

// Birthday Wishes - Typewriter Effect
function initBirthdayWishes() {
    const typewriterElement = document.getElementById('typewriterText');
    const message = "Hey Anna, happy birthday to you. I wanted to take a moment to tell you how much you really mean to me. From that first Wild Rift server message to staying up playing story games or wild rift together, you've been such a rare light in my life. I'm grateful for every moment we've shared, even across the distance. Here's to celebrating you today. 💕";
    let index = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !AppState.sectionsViewed.has('wishes')) {
                AppState.sectionsViewed.add('wishes');
                typeWriter();
                initBalloons();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('birthdayWishes'));

    function typeWriter() {
        if (index < message.length) {
            typewriterElement.textContent += message.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
}

// Floating Balloons
function initBalloons() {
    const canvas = document.getElementById('balloonCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const balloons = [];

    for (let i = 0; i < 10; i++) {
        balloons.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 200,
            speed: randomRange(0.5, 1.5),
            emoji: ['🎈', '🎉', '🎊'][Math.floor(Math.random() * 3)],
            size: randomRange(25, 35)
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balloons.forEach(balloon => {
            ctx.font = `${balloon.size}px Arial`;
            ctx.fillText(balloon.emoji, balloon.x, balloon.y);

            balloon.y -= balloon.speed;

            if (balloon.y < -50) {
                balloon.y = canvas.height + 50;
                balloon.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
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
        "You know Anna so well! 🌟",
        "Great job! You really pay attention! 💕",
        "Not bad! There's always more to learn! 😊",
        "Keep getting to know Anna better! 🎉"
    ];

    const messageIndex = AppState.quizScore === 5 ? 0 : 
                        AppState.quizScore >= 3 ? 1 : 
                        AppState.quizScore >= 2 ? 2 : 3;

    document.getElementById('quizResultMessage').textContent = messages[messageIndex];

    createRosePetalBurst(window.innerWidth / 2, window.innerHeight * 0.6, 80);
    
    if (AppState.quizScore === 5) {
        unlockAchievement('quizmaster');
    }
}

// Virtual Cake
function initVirtualCake() {
    const candles = document.querySelectorAll('.candle');
    const wishMessage = document.getElementById('wishMessage');
    const musicNotes = document.getElementById('musicNotes');

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
                candle.classList.add('blown-out');
                AppState.candlesBlown++;
                
                SoundSystem.playSound('whoosh');

                const rect = candle.getBoundingClientRect();
                createSparkleEffect(rect.left + rect.width / 2, rect.top, 20);

                if (AppState.candlesBlown === candles.length) {
                    setTimeout(() => {
                        wishMessage.style.display = 'block';
                        
                        createRosePetalBurst(window.innerWidth / 2, window.innerHeight * 0.6, 150);
                        createHeartExplosion(window.innerWidth / 2, window.innerHeight * 0.6, 50);
                        createGoldenDustShimmer();
                        
                        unlockAchievement('wishes');
                    }, 500);
                }
            }
        });
    });

    function playBirthdaySong() {
        musicNotes.classList.add('playing');
        musicNotes.innerHTML = '<span class="music-note">🎵</span><span class="music-note">🎶</span><span class="music-note">🎵</span>';
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

            // Continuous romantic particle effects
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

// Rose Petal Burst
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
        velocityY += 0.15; // gravity
        velocityX *= 0.98; // air resistance
        
        posX += velocityX;
        posY += velocityY;
        currentRotation += rotationSpeed;
        swayOffset += 0.1;
        
        // Sway side to side
        const sway = Math.sin(swayOffset) * swayAmount;
        
        petal.style.left = (posX + sway) + 'px';
        petal.style.top = posY + 'px';
        petal.style.transform = `rotate(${currentRotation}deg) rotateX(${Math.sin(swayOffset * 2) * 20}deg)`;
        
        // Fade out near bottom
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

// Heart Particle Explosion
function createHeartExplosion(x, y, count) {
    const colors = ['#DC143C', '#FA003F', '#FFB6C1', '#FFD700'];
    const emojis = ['❤️', '💕', '💖', '💗', '💓', '💞'];
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
            if (opacity >= 1) {
                phase = 'float';
            }
        } else if (phase === 'float') {
            velocityY += 0.1;
            velocityX *= 0.99;
            
            posX += velocityX;
            posY += velocityY;
            rotation += 2;
            
            if (posY > window.innerHeight - 200) {
                phase = 'fadeOut';
            }
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

// Sparkle Cascade
function createSparkleEffect(x, y, count) {
    const container = document.body;
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
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
        
        // Twinkle effect
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

// Golden Dust Shimmer
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

// Floating Hearts Background
function createFloatingHearts() {
    const container = document.body;
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
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

// Cursor Trail Effect
function initCursorTrail() {
    if ('ontouchstart' in window) return; // Skip on touch devices
    
    const trail = document.getElementById('cursorTrail');
    let lastTime = 0;
    const throttleDelay = 50;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttleDelay) return;
        lastTime = now;
        
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.textContent = ['❤️', '✨', '💖', '💕'][Math.floor(Math.random() * 4)];
        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        
        trail.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    });
}

// Background Music System
function initBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const toggle = document.getElementById('soundToggle');
    const soundIcon = toggle.querySelector('.sound-icon');
    
    if (bgMusic) {
        bgMusic.volume = 0.3;
    }
    
    toggle.addEventListener('click', () => {
        if (!AppState.musicPlaying) {
            if (bgMusic) {
                bgMusic.play().catch(err => console.log('Audio play failed:', err));
            }
            AppState.musicPlaying = true;
            toggle.classList.add('playing');
            soundIcon.textContent = '🔊';
            
            unlockAchievement('music_lover');
        } else {
            if (bgMusic) {
                bgMusic.pause();
            }
            AppState.musicPlaying = false;
            toggle.classList.remove('playing');
            soundIcon.textContent = '🔇';
        }
    });
}

// Countdown Timer
function initCountdownTimer() {
    const timer = document.getElementById('countdownTimer');
    const days = document.getElementById('countdownDays');
    const hours = document.getElementById('countdownHours');
    const minutes = document.getElementById('countdownMinutes');
    const seconds = document.getElementById('countdownSeconds');
    
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let nextBirthday = new Date(currentYear, 0, 1); // January 1st (update as needed)
        
        if (now > nextBirthday) {
            nextBirthday = new Date(currentYear + 1, 0, 1);
        }
        
        const diff = nextBirthday - now;
        
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        days.textContent = d;
        hours.textContent = h;
        minutes.textContent = m;
        seconds.textContent = s;
    }
    
    // Show timer after gift opens
    setTimeout(() => {
        if (AppState.giftOpened) {
            timer.style.display = 'block';
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    }, 3000);
}

// Photo Gallery with Lightbox
function initPhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    const photos = [
        'https://via.placeholder.com/600x600/DC143C/FFFFFF?text=Memory+1',
        'https://via.placeholder.com/600x600/FA003F/FFFFFF?text=Memory+2',
        'https://via.placeholder.com/600x600/FF6B6B/FFFFFF?text=Memory+3',
        'https://via.placeholder.com/600x600/FFB6C1/FFFFFF?text=Memory+4',
        'https://via.placeholder.com/600x600/FFD700/FFFFFF?text=Memory+5',
        'https://via.placeholder.com/600x600/DC143C/FFFFFF?text=Memory+6'
    ];
    
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            AppState.currentPhotoIndex = index;
            lightboxImage.src = photos[index];
            lightbox.classList.add('active');
            AppState.photosViewed.add(index);
            
            if (AppState.photosViewed.size === photos.length) {
                unlockAchievement('photographer');
            }
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    prevBtn.addEventListener('click', () => {
        AppState.currentPhotoIndex = (AppState.currentPhotoIndex - 1 + photos.length) % photos.length;
        lightboxImage.src = photos[AppState.currentPhotoIndex];
        AppState.photosViewed.add(AppState.currentPhotoIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        AppState.currentPhotoIndex = (AppState.currentPhotoIndex + 1) % photos.length;
        lightboxImage.src = photos[AppState.currentPhotoIndex];
        AppState.photosViewed.add(AppState.currentPhotoIndex);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// Message in a Bottle
function initMessageBottle() {
    const bottle = document.getElementById('messageBottleItem');
    const messageScroll = document.getElementById('messageScroll');
    const wavesCanvas = document.getElementById('bottleWaves');
    
    // Animate waves
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

// Balloon Messages
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

// Love Letter
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

// Interactive Constellation - ENHANCED VERSION with 120+ stars spelling ANNA
function initConstellation() {
    const canvas = document.getElementById('constellationCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const backgroundStars = [];
    const shootingStars = [];
    const starCount = 120; // Increased from 100
    
    // Create background stars
    for (let i = 0; i < starCount; i++) {
        backgroundStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            brightness: Math.random() * 0.7 + 0.3,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            twinkleDirection: Math.random() > 0.5 ? 1 : -1
        });
    }
    
    // Spell out "ANNA" with constellation stars
    const constellationPoints = createANNAConstellation(canvas.width, canvas.height);
    
    let revealed = false;
    let progress = 0;
    let interacted = false;
    let rotationAngle = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !revealed) {
                revealed = true;
                revealConstellation();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(canvas);
    
    // Mouse interaction
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if clicked near a constellation star
        constellationPoints.forEach(point => {
            const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
            if (distance < 30) {
                createStarBurst(point.x, point.y);
                SoundSystem.playSound('success');
                if (!interacted) {
                    interacted = true;
                    unlockAchievement('star_gazer');
                }
            }
        });
        
        // Create shooting star on any click
        createShootingStar();
    });
    
    function createANNAConstellation(width, height) {
        const points = [];
        const centerX = width / 2;
        const centerY = height / 2;
        const letterSpacing = 80;
        const scale = 0.8;
        
        // Letter A (first)
        const a1StartX = centerX - letterSpacing * 1.5;
        points.push(
            { x: a1StartX, y: centerY + 30 * scale, letter: 'A1' },
            { x: a1StartX + 15 * scale, y: centerY - 30 * scale, letter: 'A1' },
            { x: a1StartX + 30 * scale, y: centerY + 30 * scale, letter: 'A1' },
            { x: a1StartX + 7 * scale, y: centerY + 5 * scale, letter: 'A1' },
            { x: a1StartX + 23 * scale, y: centerY + 5 * scale, letter: 'A1' }
        );
        
        // Letter N (first)
        const n1StartX = centerX - letterSpacing * 0.5;
        points.push(
            { x: n1StartX, y: centerY + 30 * scale, letter: 'N1' },
            { x: n1StartX, y: centerY - 30 * scale, letter: 'N1' },
            { x: n1StartX + 30 * scale, y: centerY + 30 * scale, letter: 'N1' },
            { x: n1StartX + 30 * scale, y: centerY - 30 * scale, letter: 'N1' }
        );
        
        // Letter N (second)
        const n2StartX = centerX + letterSpacing * 0.5;
        points.push(
            { x: n2StartX, y: centerY + 30 * scale, letter: 'N2' },
            { x: n2StartX, y: centerY - 30 * scale, letter: 'N2' },
            { x: n2StartX + 30 * scale, y: centerY + 30 * scale, letter: 'N2' },
            { x: n2StartX + 30 * scale, y: centerY - 30 * scale, letter: 'N2' }
        );
        
        // Letter A (second)
        const a2StartX = centerX + letterSpacing * 1.5;
        points.push(
            { x: a2StartX, y: centerY + 30 * scale, letter: 'A2' },
            { x: a2StartX + 15 * scale, y: centerY - 30 * scale, letter: 'A2' },
            { x: a2StartX + 30 * scale, y: centerY + 30 * scale, letter: 'A2' },
            { x: a2StartX + 7 * scale, y: centerY + 5 * scale, letter: 'A2' },
            { x: a2StartX + 23 * scale, y: centerY + 5 * scale, letter: 'A2' }
        );
        
        return points;
    }
    
    function createShootingStar() {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            vx: randomRange(3, 6),
            vy: randomRange(2, 4),
            life: 1,
            trailLength: 30
        });
    }
    
    function createStarBurst(x, y) {
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            shootingStars.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * 3,
                vy: Math.sin(angle) * 3,
                life: 1,
                trailLength: 15,
                isBurst: true
            });
        }
    }
    
    function revealConstellation() {
        function animate() {
            // Clear with slight fade for trails
            ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Very slow rotation
            rotationAngle += 0.0002;
            
            // Draw background stars with twinkling
            backgroundStars.forEach(star => {
                star.brightness += star.twinkleSpeed * star.twinkleDirection;
                if (star.brightness > 1) {
                    star.brightness = 1;
                    star.twinkleDirection = -1;
                } else if (star.brightness < 0.3) {
                    star.brightness = 0.3;
                    star.twinkleDirection = 1;
                }
                
                const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 2);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Animate constellation reveal
            if (progress < 1) {
                progress += 0.005; // Slower reveal
            }
            
            // Draw constellation with glow
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            constellationPoints.forEach((point, i) => {
                const revealThreshold = i / constellationPoints.length;
                if (progress > revealThreshold) {
                    const starProgress = Math.min(1, (progress - revealThreshold) * 10);
                    
                    // Rotate constellation very slowly
                    const rotatedX = centerX + (point.x - centerX) * Math.cos(rotationAngle) - (point.y - centerY) * Math.sin(rotationAngle);
                    const rotatedY = centerY + (point.x - centerX) * Math.sin(rotationAngle) + (point.y - centerY) * Math.cos(rotationAngle);
                    
                    // Pulsing glow effect
                    const pulse = Math.sin(Date.now() * 0.002 + i) * 0.3 + 0.7;
                    
                    // Draw star with multiple layers for glow
                    ctx.shadowBlur = 30 * pulse;
                    ctx.shadowColor = '#FFD700';
                    
                    // Outer glow
                    const gradient = ctx.createRadialGradient(rotatedX, rotatedY, 0, rotatedX, rotatedY, 15);
                    gradient.addColorStop(0, `rgba(255, 215, 0, ${starProgress * pulse})`);
                    gradient.addColorStop(0.5, `rgba(255, 215, 0, ${starProgress * pulse * 0.5})`);
                    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(rotatedX, rotatedY, 15, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Core star
                    ctx.fillStyle = `rgba(255, 255, 255, ${starProgress})`;
                    ctx.beginPath();
                    ctx.arc(rotatedX, rotatedY, 4 * pulse, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.shadowBlur = 0;
                    
                    // Draw connecting lines
                    if (i < constellationPoints.length - 1) {
                        const nextPoint = constellationPoints[i + 1];
                        const nextRotatedX = centerX + (nextPoint.x - centerX) * Math.cos(rotationAngle) - (nextPoint.y - centerY) * Math.sin(rotationAngle);
                        const nextRotatedY = centerY + (nextPoint.x - centerX) * Math.sin(rotationAngle) + (nextPoint.y - centerY) * Math.cos(rotationAngle);
                        
                        // Only connect stars within same letter or between letters
                        if (point.letter === nextPoint.letter || 
                            (point.letter === 'A1' && i === 4) || 
                            (point.letter === 'N1' && i === 8) ||
                            (point.letter === 'N2' && i === 12)) {
                            
                            const lineProgress = Math.min(1, (progress - revealThreshold - 0.05) * 20);
                            if (lineProgress > 0) {
                                ctx.strokeStyle = `rgba(255, 215, 0, ${lineProgress * 0.6})`;
                                ctx.lineWidth = 2;
                                ctx.shadowBlur = 10;
                                ctx.shadowColor = '#FFD700';
                                ctx.beginPath();
                                ctx.moveTo(rotatedX, rotatedY);
                                ctx.lineTo(nextRotatedX, nextRotatedY);
                                ctx.stroke();
                                ctx.shadowBlur = 0;
                            }
                        }
                    }
                }
            });
            
            // Draw and update shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                
                // Draw trail
                ctx.strokeStyle = `rgba(255, 255, 255, ${star.life * 0.8})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x - star.vx * star.trailLength, star.y - star.vy * star.trailLength);
                ctx.stroke();
                
                // Draw star head
                ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Update position
                star.x += star.vx;
                star.y += star.vy;
                star.life -= 0.02;
                
                // Remove dead stars
                if (star.life <= 0 || star.x > canvas.width || star.y > canvas.height) {
                    shootingStars.splice(i, 1);
                }
            }
            
            // Occasionally spawn shooting stars
            if (Math.random() < 0.01 && shootingStars.length < 3) {
                createShootingStar();
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Handle resize
    window.addEventListener('resize', debounce(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }, 250));
}

// Rose Garden
function initRoseGarden() {
    const container = document.getElementById('rosesContainer');
    const roseCount = 12;
    const roseColors = ['🌹', '🌺', '🌷', '🌼', '🌸'];
    
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

// Fireworks System - SLOWER & MORE DRAMATIC
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
        if (e.target.closest('.lightbox, button, .memory-card, .quiz-option, .candle, .balloon-item, .envelope, .bottle')) {
            return;
        }
        
        launchFirework(e.clientX, e.clientY);
        AppState.fireworksLaunched++;
        
        SoundSystem.playSound('whoosh');
        
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
            velocity: 3.5, // SLOWER: was 8, now 3.5
            exploded: false,
            color: colors[Math.floor(Math.random() * colors.length)],
            trail: []
        });
    }
    
    function createParticles(x, y, color) {
        const particleCount = 80; // More particles
        
        // Create explosion pulse effect
        createExplosionPulse(x, y, color);
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = randomRange(1.5, 5); // Slower spread
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                maxLife: randomRange(2, 3.5), // LONGER life: 2-3.5 seconds
                color: color,
                size: randomRange(2, 4),
                gravity: randomRange(0.03, 0.06)
            });
        }
        
        SoundSystem.playSound('pop');
    }
    
    function createExplosionPulse(x, y, color) {
        trails.push({
            x: x,
            y: y,
            radius: 5,
            maxRadius: 80,
            life: 1,
            color: color
        });
    }
    
    function animate() {
        // Only continue if there are fireworks, particles, or trails
        if (fireworks.length === 0 && particles.length === 0 && trails.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isAnimating = false;
            canvas.style.opacity = '0';
            return;
        }
        
        // Clear canvas with slight fade for better trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw explosion pulses
        for (let i = trails.length - 1; i >= 0; i--) {
            const trail = trails[i];
            
            // Draw expanding ring
            ctx.strokeStyle = trail.color;
            ctx.globalAlpha = trail.life * 0.5;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            trail.radius += 3;
            trail.life -= 0.02;
            
            if (trail.life <= 0 || trail.radius > trail.maxRadius) {
                trails.splice(i, 1);
            }
        }
        
        // Update fireworks with LONGER TRAILS
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const fw = fireworks[i];
            
            if (!fw.exploded) {
                // Store trail positions
                fw.trail.push({ x: fw.x, y: fw.y });
                if (fw.trail.length > 30) { // Longer trail (was implicit)
                    fw.trail.shift();
                }
                
                // Draw trail with gradient
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
                
                // Draw main rocket with glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = fw.color;
                ctx.fillStyle = fw.color;
                ctx.beginPath();
                ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                
                // Add sparkles to rocket
                if (Math.random() < 0.3) {
                    ctx.fillStyle = '#FFD700';
                    ctx.globalAlpha = 0.7;
                    ctx.beginPath();
                    ctx.arc(
                        fw.x + randomRange(-5, 5),
                        fw.y + randomRange(-5, 5),
                        2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
                
                fw.y -= fw.velocity;
                fw.velocity *= 0.985; // Gradual slowdown for more dramatic arc
                
                if (fw.y <= fw.targetY || fw.velocity < 0.5) {
                    fw.exploded = true;
                    createParticles(fw.x, fw.y, fw.color);
                    fireworks.splice(i, 1);
                }
            }
        }
        
        // Update particles with LONGER FADE
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Draw particle with trail
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            
            // Draw subtle trail line
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = p.life * 0.3;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity; // Gentler gravity
            p.vx *= 0.985; // Less air resistance for longer flight
            p.life -= 0.005; // SLOWER fade: was 0.015, now 0.005 (3x longer)
            
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

// Parallax Scrolling
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

// Achievement System
function unlockAchievement(id) {
    if (AppState.achievementsUnlocked.has(id)) return;
    
    AppState.achievementsUnlocked.add(id);
    const achievement = achievements.find(a => a.id === id);
    
    if (!achievement) return;
    
    SoundSystem.playSound('success');
    
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
    
    // Check for explorer achievement
    if (AppState.sectionsViewed.size >= 8) {
        setTimeout(() => unlockAchievement('explorer'), 1000);
    }
}

function initAchievementSystem() {
    // Track section views
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                AppState.sectionsViewed.add(sectionId);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (canvas.id === 'gameCanvas') return; // Skip game canvas
        if (canvas.id === 'fireworksCanvas') {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    });
}, 250));