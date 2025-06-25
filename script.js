document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const timerEl = document.getElementById('timer');
    const wpmEl = document.getElementById('wpm');
    const accuracyEl = document.getElementById('accuracy');
    const restartBtn = document.getElementById('restart-btn');
    const levelEl = document.getElementById('level');
    const expProgressEl = document.getElementById('exp-progress');
    const timeButtons = document.querySelectorAll('.time-btn');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');

    // Results Modal Elements
    const resultsOverlay = document.getElementById('results-overlay');
    const resultWpmEl = document.getElementById('result-wpm');
    const resultAccuracyEl = document.getElementById('result-accuracy');
    const resultStreakEl = document.getElementById('result-streak');
    const resultXpEl = document.getElementById('result-xp');
    const nextTestBtn = document.getElementById('next-test-btn');

    // --- State Variables ---
    let currentPassage = "";
    let passageChars = [];
    let currentIndex = 0;
    let errors = 0;
    let totalTyped = 0;
    let startTime;
    let intervalId;
    let testDuration = 180;
    let isTestRunning = false;
    let level = 1;
    let experience = 0;
    let experienceNeeded = 100;
    let difficulty = 'easy';
    let currentStreak = 0;
    let bestStreak = 0;

    // --- Text Passages ---
    const textPassages = {
        easy: [
            "the quick brown fox jumps over the lazy dog. this sentence contains every letter of the alphabet. testing your typing speed can help you improve your productivity.",
            "artificial intelligence is a field of computer science that aims to create machines that can think and learn like humans. it is advancing rapidly in recent years.",
        ],
        medium: [
            "The Quick Brown Fox jumps over the lazy dog. This sentence contains EVERY letter of the alphabet. Testing your typing speed can help you improve your Productivity.",
            "Artificial Intelligence represents a profound shift in how humans interact with technology. Machine Learning algorithms can analyze vast amounts of data to identify patterns that humans might miss.",
        ],
        hard: [
            "The Technological Singularity represents a hypothetical future point (estimated between 2045-2080) where AI systems become capable of recursive self-improvement, triggering an \"intelligence explosion\" that could lead to the creation of superintelligence far beyond human capability in <24 hours!",
            "Quantum Entanglement, described by Einstein as \"spooky action at a distance,\" occurs when pairs of particles interact in such a way that the quantum state of each particle cannot be described independently of the others, regardless of the distance separating them! This phenomenon is central to quantum computing & cryptography.",
        ]
    };

    // --- Core Functions ---

    const getRandomPassage = () => {
        const passages = textPassages[difficulty];
        return passages[Math.floor(Math.random() * passages.length)];
    };

    const formatPassage = () => {
        textDisplay.innerHTML = '';
        passageChars = [];
        currentPassage.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            textDisplay.appendChild(charSpan);
            passageChars.push(charSpan);
        });
        passageChars[0].classList.add('current');
    };

    const updateStats = () => {
        const elapsedTimeMinutes = (Date.now() - startTime) / 60000;
        if (elapsedTimeMinutes > 0) {
            const grossWpm = (totalTyped / 5) / elapsedTimeMinutes;
            const netWpm = Math.round(grossWpm - (errors / elapsedTimeMinutes));
            wpmEl.textContent = Math.max(0, netWpm);

            const accuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errors) / totalTyped) * 100);
            accuracyEl.textContent = `${Math.max(0, accuracy)}%`;
        }
    };

    const updateTimer = () => {
        const remainingTime = testDuration - Math.floor((Date.now() - startTime) / 1000);
        timerEl.textContent = `${remainingTime}s`;
        if (remainingTime <= 0) {
            endTest();
        }
    };

    const startTest = () => {
        if (isTestRunning) return;
        isTestRunning = true;
        startTime = Date.now();
        intervalId = setInterval(() => {
            updateTimer();
            updateStats();
        }, 1000);
        textInput.focus();
    };

    const endTest = () => {
        clearInterval(intervalId);
        isTestRunning = false;
        textInput.disabled = true;

        const finalWpm = parseInt(wpmEl.textContent);
        const finalAccuracy = parseInt(accuracyEl.textContent);
        const expGained = calculateExperienceGain(finalWpm, finalAccuracy);
        addExperience(expGained);

        showResults(finalWpm, finalAccuracy, expGained);
        saveUserData(finalWpm, finalAccuracy);
    };

    const resetTest = () => {
        clearInterval(intervalId);
        isTestRunning = false;
        currentIndex = 0;
        errors = 0;
        totalTyped = 0;
        currentStreak = 0;

        timerEl.textContent = `${testDuration}s`;
        wpmEl.textContent = '0';
        accuracyEl.textContent = '100%';

        textInput.disabled = false;
        textInput.value = '';

        currentPassage = getRandomPassage();
        formatPassage();
        textInput.focus();
    };

    const handleInput = (e) => {
        if (!isTestRunning) {
            startTest();
        }

        const typedValue = textInput.value;
        const targetValue = currentPassage;

        totalTyped = typedValue.length;
        currentIndex = typedValue.length - 1;
        const lastChar = typedValue.slice(-1);
        const targetChar = targetValue[currentIndex];

        passageChars.forEach(span => span.classList.remove('current'));

        if (currentIndex + 1 < passageChars.length) {
            passageChars[currentIndex + 1].classList.add('current');
        }

        if (lastChar === targetChar) {
            passageChars[currentIndex].classList.add('correct');
            passageChars[currentIndex].classList.remove('incorrect');
            currentStreak++;
        } else {
            passageChars[currentIndex].classList.add('incorrect');
            passageChars[currentIndex].classList.remove('correct');
            errors++;
            currentStreak = 0;
        }

        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
        }

        if (typedValue.length === targetValue.length) {
            endTest();
        }
    };

    // --- Progression & Data ---

    const calculateExperienceGain = (wpm, accuracy) => {
        let exp = (wpm * 0.5) + (accuracy * 0.2);
        if (difficulty === 'medium') exp *= 1.5;
        if (difficulty === 'hard') exp *= 2;
        return Math.round(exp);
    };

    const addExperience = (exp) => {
        experience += exp;
        if (experience >= experienceNeeded) {
            level++;
            experience -= experienceNeeded;
            experienceNeeded = Math.round(experienceNeeded * 1.2);
            levelEl.textContent = level;
        }
        updateExperienceBar();
    };

    const updateExperienceBar = () => {
        const progress = (experience / experienceNeeded) * 100;
        expProgressEl.style.width = `${progress}%`;
    };

    const saveUserData = (wpm, accuracy) => {
        localStorage.setItem('typingGameLevel', level);
        localStorage.setItem('typingGameExperience', experience);
        localStorage.setItem('typingGameExpNeeded', experienceNeeded);
        localStorage.setItem('typingGameBestStreak', bestStreak);

        const highScoreWpm = localStorage.getItem('typingGameHighScoreWpm') || 0;
        if (wpm > highScoreWpm) {
            localStorage.setItem('typingGameHighScoreWpm', wpm);
        }
    };

    const loadUserData = () => {
        level = parseInt(localStorage.getItem('typingGameLevel') || '1');
        experience = parseInt(localStorage.getItem('typingGameExperience') || '0');
        experienceNeeded = parseInt(localStorage.getItem('typingGameExpNeeded') || '100');
        bestStreak = parseInt(localStorage.getItem('typingGameBestStreak') || '0');
        const darkMode = localStorage.getItem('typingGameDarkMode') === 'true';

        levelEl.textContent = level;
        if (darkMode) {
            document.body.classList.add('dark-mode');
        }
        updateExperienceBar();
    };

    // --- UI Functions ---

    const showResults = (wpm, accuracy, xp) => {
        resultWpmEl.textContent = wpm;
        resultAccuracyEl.textContent = `${accuracy}%`;
        resultStreakEl.textContent = bestStreak;
        resultXpEl.textContent = `+${xp}`;
        resultsOverlay.classList.add('visible');
    };

    const hideResults = () => {
        resultsOverlay.classList.remove('visible');
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('typingGameDarkMode', document.body.classList.contains('dark-mode'));
    };

    // --- Event Listeners ---

    textInput.addEventListener('input', handleInput);
    restartBtn.addEventListener('click', resetTest);
    nextTestBtn.addEventListener('click', () => {
        hideResults();
        resetTest();
    });

    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isTestRunning) return;
            testDuration = parseInt(button.dataset.time);
            timeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            resetTest();
        });
    });

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isTestRunning) return;
            difficulty = button.dataset.difficulty;
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            resetTest();
        });
    });

    toggleThemeBtn.addEventListener('click', toggleTheme);

    // --- Initial Load ---
    loadUserData();
    resetTest();
});