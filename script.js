// --- DOM Elements ---
const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const highScoreWpmEl = document.getElementById('high-score-wpm');
const highScoreAccuracyEl = document.getElementById('high-score-accuracy');
const levelEl = document.getElementById('level');
const experienceEl = document.getElementById('experience');
const expProgressEl = document.querySelector('.exp-progress');
const timeButtons = document.querySelectorAll('.time-btn');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const toggleStatsBtn = document.getElementById('toggle-stats-btn');
const typingHistoryEl = document.getElementById('typing-history');
const performanceChartEl = document.getElementById('performance-chart');
const currentStreakEl = document.getElementById('current-streak');
const bestStreakEl = document.getElementById('best-streak');
const toggleKeyboardBtn = document.getElementById('toggle-keyboard-btn');
const virtualKeyboardEl = document.getElementById('virtual-keyboard');
const keyElements = document.querySelectorAll('.key');
const toggleLiveStatsBtn = document.getElementById('toggle-live-stats-btn');
const liveStatElements = document.querySelectorAll('.live-stat');
const exportDataBtn = document.getElementById('export-data-btn');
const importDataBtn = document.getElementById('import-data-btn');
const importFileInput = document.getElementById('import-file-input');
const resetProgressBtn = document.getElementById('reset-progress-btn');

// --- Styles for themes ---
function injectThemeStyles() {
    // Create style element if it doesn't exist
    let styleEl = document.getElementById('theme-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'theme-styles';
        document.head.appendChild(styleEl);
    }

    // CSS for themes
    styleEl.textContent = `
        /* Hacker Theme */
        body.theme_hacker {
            background-color: #000;
            color: inherit;
            position: relative;
            overflow-x: hidden;
        }
        
        body.theme_hacker button {
            background-color: inherit;
            color: inherit;
            border: inherit;
        }
        
        body.theme_hacker button:hover {
            background-color: inherit;
            color: inherit;
        }
        
        body.theme_hacker .stats-container, 
        body.theme_hacker .text-display,
        body.theme_hacker .text-input,
        body.theme_hacker .status-container,
        body.theme_hacker .settings-container {
            background-color: rgba(0, 0, 0, 0.7);
            border: inherit;
            box-shadow: none;
            position: relative;
            z-index: 2;
        }
        
        body.theme_hacker #text-display span.current {
            background-color: inherit;
            color: inherit;
        }
        
        body.theme_hacker #text-display span.correct {
            color: inherit;
        }
        
        body.theme_hacker #text-display span.incorrect {
            color: inherit;
        }
        
        body.theme_hacker .key {
            background-color: inherit;
            color: inherit;
            border: inherit;
        }
        
        body.theme_hacker .key.active {
            background-color: inherit;
            color: inherit;
        }
        
        /* Matrix animation for hacker theme - enhanced with actual falling characters */
        body.theme_hacker::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background-color: #000;
            z-index: -1;
        }

        /* Matrix animation container - added when theme is activated */
        .matrix-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1; /* Changed from 0 to -1 to ensure it's behind all interactive elements */
            overflow: hidden;
            opacity: 0.3;
            -webkit-mask-image: linear-gradient(to bottom, 
                rgba(0,0,0,1) 0%, 
                rgba(0,0,0,1) 40%, 
                rgba(0,0,0,0) 70%);
            mask-image: linear-gradient(to bottom, 
                rgba(0,0,0,1) 0%, 
                rgba(0,0,0,1) 40%, 
                rgba(0,0,0,0) 70%);
            pointer-events: none; /* Add this to ensure clicks pass through the animation layer */
        }
        
        .matrix-column {
            position: absolute;
            top: -100px;
            width: 20px;
            color: #0f0;
            font-family: monospace;
            font-size: 16px;
            text-align: center;
            animation-name: matrix-fall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
        
        @keyframes matrix-fall {
            0% {
                transform: translateY(-100%);
                opacity: 1;
            }
            100% {
                transform: translateY(1000px);
                opacity: 0.5;
            }
        }
        
        /* Sunset Theme */
        body.theme_sunset {
            background: linear-gradient(to bottom, #ff7e5f, #feb47b);
            color: #333;
        }
        
        body.theme_sunset .stats-container, 
        body.theme_sunset .text-display,
        body.theme_sunset .text-input,
        body.theme_sunset .status-container,
        body.theme_sunset .settings-container {
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        
        /* Neon Theme */
        body.theme_neon {
            background-color: #121212;
            color: #fff;
        }
        
        body.theme_neon button {
            background-color: #222;
            color: #0ff;
            border: 1px solid #0ff;
            box-shadow: 0 0 5px #0ff;
        }
        
        body.theme_neon button:hover {
            background-color: #0ff;
            color: #000;
        }
        
        body.theme_neon .stats-container, 
        body.theme_neon .text-display,
        body.theme_neon .text-input,
        body.theme_neon .status-container,
        body.theme_neon .settings-container {
            background-color: #222;
            border: 1px solid #0ff;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        }
        
        body.theme_neon #text-display span.current {
            background-color: #f0f;
            color: #fff;
        }
        
        body.theme_neon #text-display span.correct {
            color: #0f0;
        }
        
        body.theme_neon #text-display span.incorrect {
            color: #f00;
        }
        
        /* Gold Theme */
        body.theme_gold {
            background: linear-gradient(to bottom, #d4af37, #f2d35b);
            color: #333;
        }
        
        body.theme_gold button {
            background-color: #fff;
            color: #a67c00;
            border: 1px solid #a67c00;
        }
        
        body.theme_gold button:hover {
            background-color: #a67c00;
            color: #fff;
        }
        
        body.theme_gold .stats-container, 
        body.theme_gold .text-display,
        body.theme_gold .text-input,
        body.theme_gold .status-container,
        body.theme_gold .settings-container {
            background-color: #fff;
            border: 2px solid #d4af37;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
        }
        
        body.theme_gold #text-display span.current {
            background-color: #d4af37;
            color: #fff;
        }
        
        body.theme_gold #text-display span.correct {
            color: #008000;
        }
        
        body.theme_gold #text-display span.incorrect {
            color: #c00;
        }
        
        body.theme_gold .key {
            background: linear-gradient(to bottom, #f2d35b, #d4af37);
            color: #333;
            border: 1px solid #a67c00;
        }
    `;
}

// --- Text Passages by Difficulty ---
const textPassages = {
    easy: [
        "the quick brown fox jumps over the lazy dog. this sentence contains every letter of the alphabet. testing your typing speed can help you improve your productivity.",
        "artificial intelligence is a field of computer science that aims to create machines that can think and learn like humans. it is advancing rapidly in recent years.",
        "the technological singularity refers to a hypothetical point where technological growth becomes uncontrollable and irreversible. this could lead to unforeseeable changes in human civilization.",
        "quantum computers use quantum bits or qubits that can exist in multiple states at once. this allows them to solve certain problems much faster than regular computers.",
        "neural networks are computing systems inspired by the human brain. they can learn to recognize patterns and make decisions with minimal human intervention.",
        "space exploration has revealed fascinating discoveries about our solar system. mars has polar ice caps and evidence suggests it once had liquid water on its surface.",
        "genetic engineering allows scientists to modify dna. this technology has applications in medicine, agriculture and could help cure genetic diseases in the future.",
        "renewable energy sources like solar and wind power are essential for fighting climate change. they produce electricity without releasing greenhouse gases.",
        "robotics is the interdisciplinary field that combines computer science and engineering. robots are being used in manufacturing, medicine, and space exploration.",
        "virtual reality creates simulated environments that users can interact with. this technology is used in gaming, education and professional training.",
        "biotechnology uses living organisms to develop products. it has applications in medicine, agriculture and environmental conservation efforts worldwide.",
        "nanotechnology involves manipulating matter at the atomic scale. it has potential applications in medicine, electronics and material science.",
        "wireless technology allows devices to communicate without physical connections. wifi, bluetooth and cellular networks are all forms of wireless communication.",
        "machine learning is a subset of artificial intelligence that enables computers to learn without explicit programming. it powers many modern applications.",
        "3d printing creates physical objects from digital models. this technology is revolutionizing manufacturing, medicine and architecture."
    ],
    medium: [
        "The Quick Brown Fox jumps over the lazy dog. This sentence contains EVERY letter of the alphabet. Testing your typing speed can help you improve your Productivity.",
        "Artificial Intelligence represents a profound shift in how humans interact with technology. Machine Learning algorithms can analyze vast amounts of data to identify patterns that humans might miss.",
        "The Technological Singularity is a concept popularized by mathematician Vernor Vinge and futurist Ray Kurzweil. It describes a point where AI surpasses human intelligence, potentially leading to runaway technological growth.",
        "Quantum Computing utilizes the principles of Quantum Mechanics to process information. Unlike classical bits, Qubits can exist in states of 0, 1, or both simultaneously through a property called Superposition.",
        "CRISPR-Cas9 is a revolutionary gene-editing technology that allows scientists to modify DNA sequences with unprecedented precision. It functions like molecular scissors that can cut specific genes.",
        "Neuromorphic Computing aims to design computer systems that mimic the architecture of the human brain. These systems use artificial neural networks to process information more efficiently than traditional computers.",
        "Blockchain Technology creates a distributed ledger system where transactions are recorded across multiple computers. This makes the system resistant to modification and creates transparency.",
        "Dark Matter and Dark Energy comprise about 95% of the universe, yet scientists know very little about them. Dark Matter doesn't interact with light, making it invisible but detectable through gravitational effects.",
        "Augmented Reality overlays digital information onto the physical world. This technology enhances our perception of reality by incorporating computer-generated perceptual information across multiple sensory modalities.",
        "The Internet of Things (IoT) connects everyday physical objects to the internet, enabling them to send and receive data. By 2025, over 75 billion IoT devices are expected to be connected globally.",
        "Fusion Energy research aims to replicate the same nuclear reactions that power the sun. If successfully harnessed, fusion could provide an almost limitless source of clean energy with minimal radioactive waste.",
        "Bioinformatics combines biology, computer science, and statistics to analyze biological data. This interdisciplinary field has accelerated genomic research and personalized medicine development.",
        "Self-driving vehicles use sensors, cameras, and artificial intelligence to navigate without human input. This technology could potentially reduce traffic accidents by eliminating human error.",
        "Cloud Computing delivers computing services over the internet, including servers, storage, databases, and software. This model offers flexible resources and economies of scale for businesses.",
        "Renewable Energy technologies like photovoltaic cells, wind turbines, and hydroelectric systems convert natural resources into sustainable power. Their efficiency continues to improve while costs decrease."
    ],
    hard: [
        "The Quick Brown Fox jumps over the lazy dog! This sentence contains EVERY letter of the alphabet (A-Z). Testing your typing speed can help you improve your Productivity by 25-50%.",
        "Moore's Law (named after Gordon Moore in 1965) predicted that the number of transistors in integrated circuits would double approximately every 2 years. This exponential growth has been a driving force behind the Digital Revolution and may continue until physical limitations are reached at the atomic scale around 2025!",
        "The Technological Singularity represents a hypothetical future point (estimated between 2045-2080) where AI systems become capable of recursive self-improvement, triggering an \"intelligence explosion\" that could lead to the creation of superintelligence far beyond human capability in <24 hours!",
        "Quantum Entanglement, described by Einstein as \"spooky action at a distance,\" occurs when pairs of particles interact in such a way that the quantum state of each particle cannot be described independently of the others, regardless of the distance separating them! This phenomenon is central to quantum computing & cryptography.",
        "CRISPR-Cas9 gene editing technology (discovered in 2012) has revolutionized genetic engineering by allowing scientists to modify DNA sequences with 99.9% precision! Researchers have already used it to treat sickle cell anemia, and it holds promise for addressing 3,000+ genetic disorders.",
        "Neuroplasticity refers to the brain's ability to reorganize itself by forming new neural connections throughout life. This phenomenon allows neurons (nerve cells) to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment @ the synaptic level!",
        "The Global Brain Hypothesis suggests that the Internet is evolving into a nervous system for the planet, connecting billions of humans and computers into a single information processing network that functions similar to a brain! By 2030, over 125 billion devices may be connected to this network.",
        "Nanotechnology manipulates matter at scales of 1-100 nanometers (1nm = 1 billionth of a meter). At this scale, materials exhibit quantum effects & behave differently! Medical nanobots could theoretically patrol our bloodstream by 2040, eliminating diseases & reversing aging at the cellular level.",
        "Neuralink's brain-computer interface technology aims to create a direct connection between the human brain & computers by implanting ~1,024 electrodes (thinner than human hair) into the cerebral cortex! This could potentially cure neurological conditions & eventually allow for the digital transfer of human consciousness by 2050.",
        "Nuclear Fusion research at facilities like ITER (International Thermonuclear Experimental Reactor) aims to create a self-sustaining plasma at 150,000,000°C (10× hotter than the Sun's core)! If successful, 1kg of fusion fuel could generate electricity equivalent to burning 10,000,000kg of fossil fuels with zero carbon emissions.",
        "The James Webb Space Telescope (launched December 25, 2021) can detect objects 100× fainter than Hubble and observe galaxies formed just 200 million years after the Big Bang! Its primary mirror consists of 18 hexagonal gold-plated beryllium segments spanning 6.5 meters—5× larger than Hubble's mirror.",
        "Graphene, a single layer of carbon atoms arranged in a hexagonal lattice, is the thinnest material known (0.345nm thick), yet 200× stronger than steel! It's also an excellent conductor of heat (10× better than copper) & electricity, and has potential applications in electronics, medicine & water filtration.",
        "DeepMind's AlphaFold AI system can predict protein structures with near-experimental accuracy in minutes, solving a 50-year-old grand challenge in biology! This breakthrough could dramatically accelerate drug discovery, potentially reducing development timeframes from years to months for treating diseases affecting >1 billion people.",
        "Solid-state batteries represent the next generation of energy storage, replacing liquid electrolytes with solid materials to achieve 2-10× higher energy density! These batteries could provide electric vehicles with 1,000+ km range, 5-minute charging times & >3,000 charge cycles by 2030.",
        "The Human Connectome Project aims to map all 86 billion neurons & 100 trillion synaptic connections in the human brain! Scientists estimate our brains process 11 million bits per second but we're only consciously aware of 50 bits/sec, meaning 99.9995% of brain activity occurs below our awareness threshold."
    ]
};

// Track previously used passages to avoid repetition
let lastPassageIndex = {
    easy: -1, 
    medium: -1, 
    hard: -1
};

// --- State Variables ---
let currentPassage = "";
let passageChars = []; // Array of span elements for each character
let currentIndex = 0;
let errors = 0;
let totalTyped = 0;
let startTime;
let intervalId;
let testDuration = 180; // Default: 3 minutes in seconds
let isTestRunning = false;
let level = 1;
let experience = 0;
let experienceNeeded = 100;
let prestigeLevel = 0; // Prestige level (starts at 0)
let lastCalcTime = 0; // Track last time we calculated WPM (for performance)
let correctChars = 0; // Track correctly typed characters
let wordCount = 0; // Track completed words
let difficulty = 'easy'; // Default difficulty
let isDarkMode = false; // Dark mode state
let typingHistory = []; // Store past test results
let performanceChart = null; // Chart.js instance
let filteredChart = null; // Chart for filtered results
let lastWpm = 0; // Last recorded WPM (for real-time chart updates)
let lastCalculatedIndex = 0; // Last position for which we calculated stats
let currentStreak = 0; // Current streak of correctly typed characters
let bestStreak = 0; // Best streak achieved
let lastKeyCorrect = true; // Track if last key was correct
let liveStatsHidden = false; // Track if live stats are hidden
let keyboardVisible = false; // Track keyboard visibility state
let unlockedRewards = []; // Track unlocked rewards
let activeRewards = []; // Track which rewards are currently active
let selectedHistoryFilter = 'all'; // Filter for typing history (all, easy, medium, hard)
let lastTypingTime = 0; // Track last time user typed
let isPaused = false; // Track if timer is paused
let pauseTimeout; // Timeout for pausing the timer
let elapsedTime = 0; // Track elapsed time to account for pauses

// --- Local Storage Keys ---
const HIGH_SCORE_WPM_KEY = 'typingGameHighScoreWpm';
const HIGH_SCORE_ACCURACY_KEY = 'typingGameHighScoreAccuracy';
const LEVEL_KEY = 'typingGameLevel';
const PRESTIGE_LEVEL_KEY = 'typingGamePrestigeLevel';
const EXPERIENCE_KEY = 'typingGameExperience';
const EXPERIENCE_NEEDED_KEY = 'typingGameExperienceNeeded';
const COMPLETED_TESTS_KEY = 'typingGameCompletedTests';
const PREFERRED_TIME_KEY = 'typingGamePreferredTime';
const PREFERRED_DIFFICULTY_KEY = 'typingGamePreferredDifficulty';
const DARK_MODE_KEY = 'typingGameDarkMode';
const TYPING_HISTORY_KEY = 'typingGameHistory';
const BEST_STREAK_KEY = 'typingGameBestStreak';
const LIVE_STATS_HIDDEN_KEY = 'typingGameLiveStatsHidden';
const UNLOCKED_REWARDS_KEY = 'typingGameUnlockedRewards';
const ACTIVE_REWARDS_KEY = 'typingGameActiveRewards';

// Collect all user data keys for export/import
const USER_DATA_KEYS = [
    HIGH_SCORE_WPM_KEY,
    HIGH_SCORE_ACCURACY_KEY,
    LEVEL_KEY,
    PRESTIGE_LEVEL_KEY,
    EXPERIENCE_KEY,
    EXPERIENCE_NEEDED_KEY,
    COMPLETED_TESTS_KEY,
    PREFERRED_TIME_KEY,
    PREFERRED_DIFFICULTY_KEY,
    DARK_MODE_KEY,
    TYPING_HISTORY_KEY,
    BEST_STREAK_KEY,
    LIVE_STATS_HIDDEN_KEY,
    UNLOCKED_REWARDS_KEY,
    ACTIVE_REWARDS_KEY
];

// Define rewards that can be unlocked at different levels
const LEVEL_REWARDS = [
    { level: 2, id: 'confetti', name: 'Celebration Confetti', description: 'Shower of confetti when you complete a test with 90%+ accuracy' },
    { level: 3, id: 'theme_hacker', name: 'Hacker Theme', description: 'Matrix-inspired green-on-black theme' },
    { level: 5, id: 'typing_sounds', name: 'Typing Sounds', description: 'Satisfying keyboard sounds while you type' },
    { level: 7, id: 'theme_sunset', name: 'Sunset Theme', description: 'Warm sunset color palette for your typing experience' },
    { level: 10, id: 'fireworks', name: 'Fireworks Display', description: 'Fireworks animation when you set a new high score' },
    { level: 12, id: 'theme_neon', name: 'Neon Theme', description: 'Vibrant neon colors for a retro cyberpunk feel' },
    { level: 15, id: 'combo_animations', name: 'Combo Animations', description: 'Special effects for typing streaks' },
    { level: 20, id: 'theme_custom', name: 'Custom Themes', description: 'Create and save your own custom color themes' },
    { level: 25, id: 'particle_effects', name: 'Particle Effects', description: 'Characters explode into particles as you type them correctly' },
    { level: 30, id: 'achievement_badges', name: 'Achievement Badges', description: 'Unlock special badges for your accomplishments' }
];

// Define prestige rewards
const PRESTIGE_REWARDS = [
    { level: 1, name: 'XP Boost', description: 'Earn 25% more XP from all typing tests', effect: 'xp_boost_25' },
    { level: 2, name: 'Golden Keyboard', description: 'Exclusive golden keyboard theme', effect: 'theme_gold' },
    { level: 3, name: 'Advanced Statistics', description: 'Unlock detailed typing analysis with heat maps', effect: 'advanced_stats' },
    { level: 5, name: 'Double XP', description: 'Earn 2x XP from all typing tests', effect: 'xp_boost_100' }
];

// Digital pet configurations for different prestige levels
const DIGITAL_PET_STAGES = [
    { 
        level: 0, 
        name: 'Rookie', 
        emoji: '🥚', 
        description: 'Your typing companion is still an egg. Prestige to help it hatch!'
    },
    { 
        level: 1, 
        name: 'Typeling', 
        emoji: '🐣', 
        description: 'Your typing companion has hatched! Keep typing to help it grow.'
    },
    { 
        level: 2, 
        name: 'Word Wizard', 
        emoji: '🐥👑', 
        description: 'Your typing companion has earned its first crown!'
    },
    { 
        level: 3, 
        name: 'Speed Demon', 
        emoji: '🦅💎', 
        description: 'Your companion has grown and earned a diamond!'
    },
    { 
        level: 4, 
        name: 'Typing Master', 
        emoji: '🦉⚜️', 
        description: 'Your companion has evolved into a wise typing master!'
    },
    { 
        level: 5, 
        name: 'Keyboard Legend', 
        emoji: '🐉💎👑', 
        description: 'Your companion has reached legendary status!'
    }
];

// Audio objects for typing sounds
let keySound;
let spaceSound;
let returnSound;
let backspaceSound;
let typingSoundsLoaded = false;

// Preload typing sounds
function loadTypingSounds() {
    // Only load if not already loaded
    if (typingSoundsLoaded) return;
    
    // Create audio objects
    keySound = new Audio();
    spaceSound = new Audio();
    returnSound = new Audio();
    backspaceSound = new Audio();
    
    // Set sources to local hosted sounds or free alternatives
    keySound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-light-key-press-2542.mp3';
    spaceSound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-keyboard-key-presses-2542.mp3';
    returnSound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-keyboard-key-stroke-2535.mp3';
    backspaceSound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-keyboard-tap-2537.mp3';
    
    // Set volume
    keySound.volume = 0.5;
    spaceSound.volume = 0.5;
    returnSound.volume = 0.5;
    backspaceSound.volume = 0.5;
    
    // Preload
    keySound.load();
    spaceSound.load();
    returnSound.load();
    backspaceSound.load();
    
    typingSoundsLoaded = true;
    
    // Test sound to ensure it's loaded and to handle autoplay restrictions
    // This should be called from a user interaction event (like a button click)
    const testSound = keySound.cloneNode();
    testSound.volume = 0.1;  // Lower volume for test sound
    testSound.play().catch(e => {
        console.log("Could not play test sound: ", e);
        // Show notification to user
        showNotification("Click anywhere to enable sounds", "info");
    });
}

// Play typing sound
function playTypingSound(key) {
    // Check if typing sounds are enabled
    if (!activeRewards.includes('typing_sounds')) return;
    
    // Ensure sounds are loaded
    if (!typingSoundsLoaded) {
        loadTypingSounds();
        return;
    }
    
    // Clone audio to allow overlapping sounds
    let soundToPlay;
    
    // Choose appropriate sound based on key
    if (key === ' ') {
        soundToPlay = spaceSound.cloneNode();
    } else if (key === 'Enter') {
        soundToPlay = returnSound.cloneNode();
    } else if (key === 'Backspace') {
        soundToPlay = backspaceSound.cloneNode();
    } else {
        soundToPlay = keySound.cloneNode();
    }
    
    // Play the sound
    soundToPlay.play().catch(e => {
        // Try to handle autoplay restrictions
        if (!document.body.hasAttribute('data-sound-warning-shown')) {
            showNotification("Click anywhere to enable sounds", "info");
            document.body.setAttribute('data-sound-warning-shown', 'true');
        }
    });
}

// --- Functions ---

// Export user data to a JSON file
function exportUserData() {
    // Create object to hold all user data
    const userData = {};
    
    // Collect all data from localStorage
    USER_DATA_KEYS.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) {
            userData[key] = value;
        }
    });
    
    // Convert to JSON string
    const jsonData = JSON.stringify(userData, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Get current date for filename
    const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    // Create temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `typing-progress-${date}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    // Show success message
    showNotification('Progress exported successfully!', 'success');
}

// Import user data from a JSON file
function importUserData(file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        try {
            // Parse the JSON data
            const userData = JSON.parse(event.target.result);
            
            // Validate the data contains at least some expected keys
            if (!validateUserData(userData)) {
                throw new Error('Invalid data format');
            }
            
            // Store the data in localStorage
            Object.keys(userData).forEach(key => {
                if (USER_DATA_KEYS.includes(key)) {
                    localStorage.setItem(key, userData[key]);
                }
            });
            
            // Reload the page to apply imported settings
            showNotification('Progress imported successfully! Reloading...', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch (error) {
            console.error('Error importing data:', error);
            showNotification('Error importing data. Invalid file format.', 'error');
        }
    };
    
    reader.onerror = function() {
        showNotification('Error reading the file.', 'error');
    };
    
    reader.readAsText(file);
}

// Validate imported user data
function validateUserData(data) {
    // Check if data is an object
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    
    // Check if at least some expected keys exist
    const requiredKeys = [LEVEL_KEY, EXPERIENCE_KEY, HIGH_SCORE_WPM_KEY];
    const hasRequiredKeys = requiredKeys.some(key => key in data);
    
    return hasRequiredKeys;
}

// Show a notification message
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Get a random passage from the array based on difficulty, avoiding repetition
function getRandomPassage() {
    const passages = textPassages[difficulty];
    
    // Track available indices (excluding the last used one)
    const availableIndices = [];
    for (let i = 0; i < passages.length; i++) {
        if (i !== lastPassageIndex[difficulty]) {
            availableIndices.push(i);
        }
    }
    
    // Select a random index from available options
    const randomPosition = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices[randomPosition];
    
    // Store this index as the last used for this difficulty
    lastPassageIndex[difficulty] = selectedIndex;
    
    let selectedPassage = passages[selectedIndex];
    
    // Adjust passage length based on test duration
    if (testDuration >= 300) { // 5 minutes
        // Double the passage length for 5 minute tests
        selectedPassage = selectedPassage.repeat(2);
    } else if (testDuration >= 180) { // 3 minutes
        // Use 1.5x passage length for 3 minute tests
        selectedPassage = selectedPassage + ' ' + selectedPassage.substring(0, selectedPassage.length / 2);
    } else if (testDuration <= 30) { // 30 seconds
        // Use shorter passage for 30 second tests
        selectedPassage = selectedPassage.substring(0, selectedPassage.length / 2);
    }
    // 60 seconds (1 minute) uses the default passage length
    
    return selectedPassage;
}

// Format the passage text into individual character spans
function formatPassage(passage) {
    textDisplay.innerHTML = ''; // Clear previous text
    
    // Track words instead of individual characters
    const words = passage.split(/(\s+)/); // Split by whitespace but keep the whitespace
    let lineDiv = document.createElement('div');
    lineDiv.className = 'text-line';
    textDisplay.appendChild(lineDiv);
    
    passageChars = [];
    
    // Process each word as a unit
    words.forEach(word => {
        // Create a word container
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-unit';
        
        // Add space class for whitespace words
        if (/^\s+$/.test(word)) {
            wordSpan.classList.add('space');
        }
        
        // Create individual character spans within the word
        const chars = word.split('');
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
            passageChars.push(charSpan);
        });
        
        // Add the word to the current line
        lineDiv.appendChild(wordSpan);
        
        // Create a new line if we encounter a newline
        if (word.includes('\n')) {
            lineDiv = document.createElement('div');
            lineDiv.className = 'text-line';
            textDisplay.appendChild(lineDiv);
        }
    });
    
    // Highlight the first character
    if (passageChars.length > 0) {
        passageChars[0].classList.add('current');
    }
}

// Throttled update of WPM and Accuracy for better performance
function updateStats() {
    const currentTime = Date.now();
    const elapsedTimeMinutes = (currentTime - startTime) / 1000 / 60;
    
    // Only update stats every 250ms to improve performance
    if (currentTime - lastCalcTime < 250 && isTestRunning) return;
    
    lastCalcTime = currentTime;
    
    if (elapsedTimeMinutes > 0) {
        // WPM Calculation based on correctly typed characters
        // Standard: (characters / 5) / minutes
        const netWpm = Math.max(0, Math.round((correctChars / 5) / elapsedTimeMinutes));
        wpmEl.textContent = netWpm;
        lastWpm = netWpm; // Store for chart
        
        // Accuracy Calculation
        const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100);
        accuracyEl.textContent = Math.max(0, accuracy);
        
        // Update real-time chart if visible
        if (!typingHistoryEl.classList.contains('hidden') && performanceChart) {
            updatePerformanceChart(netWpm);
        }
    } else {
        wpmEl.textContent = 0;
        accuracyEl.textContent = 100;
    }
}

// Update the timer display and end test if time is up
function updateTimer() {
    const currentTime = Date.now();
    let remainingTime;
    
    if (isPaused) {
        // If paused, use the stored elapsed time
        remainingTime = testDuration - Math.floor(elapsedTime / 1000);
    } else {
        // If not paused, calculate elapsed time normally
        const elapsed = currentTime - startTime;
        elapsedTime = elapsed;
        remainingTime = testDuration - Math.floor(elapsed / 1000);
    }
    
    timerEl.textContent = remainingTime;

    if (remainingTime <= 0) {
        endTest();
    }
}

// Load high scores and progression data from localStorage
function loadUserData() {
    // Load high scores
    const highScoreWpm = localStorage.getItem(HIGH_SCORE_WPM_KEY) || 0;
    const highScoreAccuracy = localStorage.getItem(HIGH_SCORE_ACCURACY_KEY) || 0;
    bestStreak = parseInt(localStorage.getItem(BEST_STREAK_KEY) || 0);
    
    // Load progression data
    level = parseInt(localStorage.getItem(LEVEL_KEY) || 1);
    experience = parseInt(localStorage.getItem(EXPERIENCE_KEY) || 0);
    experienceNeeded = parseInt(localStorage.getItem(EXPERIENCE_NEEDED_KEY) || 100);
    prestigeLevel = parseInt(localStorage.getItem(PRESTIGE_LEVEL_KEY) || 0);
    
    // Load unlocked and active rewards
    const savedRewards = localStorage.getItem(UNLOCKED_REWARDS_KEY);
    if (savedRewards) {
        unlockedRewards = JSON.parse(savedRewards);
    }
    
    const savedActiveRewards = localStorage.getItem(ACTIVE_REWARDS_KEY);
    if (savedActiveRewards) {
        activeRewards = JSON.parse(savedActiveRewards);
    } else {
        // Initialize active rewards with all non-theme rewards if first time
        activeRewards = unlockedRewards.filter(id => !id.startsWith('theme_'));
        localStorage.setItem(ACTIVE_REWARDS_KEY, JSON.stringify(activeRewards));
    }
    
    // Inject theme styles
    injectThemeStyles();
    
    // Apply active theme if any
    const activeTheme = activeRewards.find(id => id.startsWith('theme_'));
    if (activeTheme && unlockedRewards.includes(activeTheme)) {
        document.body.classList.add(activeTheme);
    }
    
    // Preload typing sounds if that reward is active
    if (activeRewards.includes('typing_sounds')) {
        loadTypingSounds();
    }
    
    // Add digital pet (always show - starts as egg at level 0)
    addDigitalPet();
    
    // Load preferred time setting
    const preferredTime = localStorage.getItem(PREFERRED_TIME_KEY);
    if (preferredTime) {
        testDuration = parseInt(preferredTime);
        // Update active button
        timeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.time == testDuration) {
                btn.classList.add('active');
            }
        });
    }
    
    // Load preferred difficulty
    const preferredDifficulty = localStorage.getItem(PREFERRED_DIFFICULTY_KEY);
    if (preferredDifficulty) {
        difficulty = preferredDifficulty;
        // Update active button
        difficultyButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.difficulty === difficulty) {
                btn.classList.add('active');
            }
        });
    }
    
    // Load dark mode preference
    isDarkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Load live stats visibility preference
    liveStatsHidden = localStorage.getItem(LIVE_STATS_HIDDEN_KEY) === 'true';
    if (liveStatsHidden) {
        toggleLiveStats();
    }
    
    // Load keyboard visibility preference
    keyboardVisible = localStorage.getItem('keyboardVisible') === 'true';
    if (keyboardVisible && virtualKeyboardEl) {
        virtualKeyboardEl.classList.remove('hidden');
        if (toggleKeyboardBtn) {
            toggleKeyboardBtn.textContent = 'Hide Keyboard';
        }
    }
    
    // Load typing history
    const historyData = localStorage.getItem(TYPING_HISTORY_KEY);
    if (historyData) {
        typingHistory = JSON.parse(historyData);
    }
    
    // Update UI
    if (highScoreWpmEl) highScoreWpmEl.textContent = highScoreWpm;
    if (highScoreAccuracyEl) highScoreAccuracyEl.textContent = highScoreAccuracy;
    if (levelEl) {
        // Add prestige star if applicable
        if (prestigeLevel > 0) {
            levelEl.innerHTML = `<i class="fa-solid fa-star prestige-star"></i> ${level}`;
        } else {
            levelEl.textContent = level;
        }
    }
    if (experienceEl) experienceEl.textContent = `${experience}/${experienceNeeded}`;
    if (timerEl) timerEl.textContent = testDuration;
    if (bestStreakEl) bestStreakEl.textContent = bestStreak;
    
    // Update experience bar
    updateExperienceBar();
    
    // Add rewards button if there are unlockable rewards
    addRewardsButton();
    
    // Check if level >= 30 and show prestige available notification
    if (level >= 30 && prestigeLevel === 0) {
        // Delay notification to avoid overwhelming the user on page load
        setTimeout(() => {
            showPrestigeAvailableNotification();
        }, 5000);
    }
}

// Toggle live stats visibility
function toggleLiveStats() {
    liveStatsHidden = !liveStatsHidden;
    
    // Update UI
    liveStatElements.forEach(el => {
        el.classList.toggle('hidden', liveStatsHidden);
    });
    
    // Update button text
    if (toggleLiveStatsBtn) {
        if (liveStatsHidden) {
            toggleLiveStatsBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Show Live Stats';
        } else {
            toggleLiveStatsBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Live Stats';
        }
    }
    
    // Save preference to localStorage
    localStorage.setItem(LIVE_STATS_HIDDEN_KEY, liveStatsHidden);
}

// Update experience bar width
function updateExperienceBar() {
    if (expProgressEl) {
        const progressPercentage = (experience / experienceNeeded) * 100;
        expProgressEl.style.width = `${progressPercentage}%`;
    }
}

// Toggle between light and dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem(DARK_MODE_KEY, isDarkMode);
    
    // Update chart colors if visible
    if (performanceChart) {
        updateChartColors();
        performanceChart.update();
    }
}

// Update chart colors based on theme
function updateChartColors() {
    if (!performanceChart) return;
    
    const textColor = isDarkMode ? '#e0e0e0' : '#333333';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    performanceChart.options.scales.x.grid.color = gridColor;
    performanceChart.options.scales.x.ticks.color = textColor;
    performanceChart.options.scales.y.grid.color = gridColor;
    performanceChart.options.scales.y.ticks.color = textColor;
    performanceChart.options.plugins.legend.labels.color = textColor;
}

// Toggle typing history chart
function toggleTypingHistory() {
    typingHistoryEl.classList.toggle('hidden');
    
    if (!typingHistoryEl.classList.contains('hidden')) {
        toggleStatsBtn.textContent = 'Hide Typing History';
        initializePerformanceChart();
    } else {
        toggleStatsBtn.textContent = 'Show Typing History';
    }
}

// Initialize the performance chart with difficulty filters
function initializePerformanceChart() {
    if (!performanceChartEl) return;
    
    // Clean up previous chart
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    // Create filter buttons if they don't exist
    createHistoryFilters();
    
    // Get filtered history based on current selection
    const filteredHistory = filterTypingHistory(selectedHistoryFilter);
    
    // Prepare data - limit to last 10 filtered tests
    const recentTests = filteredHistory.slice(-10);
    const labels = recentTests.map((_, index) => `Test ${index + 1}`);
    const wpmData = recentTests.map(test => test.wpm);
    const accuracyData = recentTests.map(test => test.accuracy);
    
    // Chart text color based on theme
    const textColor = isDarkMode ? '#e0e0e0' : '#333333';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    // Create chart
    performanceChart = new Chart(performanceChartEl, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'WPM',
                    data: wpmData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Accuracy %',
                    data: accuracyData,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.2)',
                    tension: 0.3,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        footer: function(tooltipItems) {
                            const index = tooltipItems[0].dataIndex;
                            const test = recentTests[index];
                            return `Difficulty: ${test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                },
                y: {
                    min: 0,
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    },
                    title: {
                        display: true,
                        text: 'WPM',
                        color: textColor
                    }
                },
                y1: {
                    min: 0,
                    max: 100,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: textColor
                    },
                    title: {
                        display: true,
                        text: 'Accuracy %',
                        color: textColor
                    }
                }
            }
        }
    });
}

// Create filter buttons for typing history
function createHistoryFilters() {
    // Check if filters already exist
    if (document.getElementById('history-filters')) return;
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.id = 'history-filters';
    filterContainer.className = 'history-filters';
    
    // Create filter buttons
    filterContainer.innerHTML = `
        <span>Filter by:</span>
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="easy">Easy</button>
        <button class="filter-btn" data-filter="medium">Medium</button>
        <button class="filter-btn" data-filter="hard">Hard</button>
    `;
    
    // Insert before chart
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartContainer.parentNode.insertBefore(filterContainer, chartContainer);
        
        // Add event listeners to filter buttons
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleHistoryFilterChange);
        });
    }
}

// Filter typing history by difficulty
function filterTypingHistory(filter) {
    if (filter === 'all') {
        return typingHistory;
    } else {
        return typingHistory.filter(test => test.difficulty === filter);
    }
}

// Handle history filter button click
function handleHistoryFilterChange(e) {
    const newFilter = e.target.dataset.filter;
    if (newFilter === selectedHistoryFilter) return;
    
    // Update active button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === newFilter) {
            btn.classList.add('active');
        }
    });
    
    // Update selected filter
    selectedHistoryFilter = newFilter;
    
    // Reinitialize chart with filtered data
    initializePerformanceChart();
}

// Update performance chart in real-time
function updatePerformanceChart(wpm) {
    if (!performanceChart) return;
    
    // Add current test data point if not already added
    if (performanceChart.data.labels[performanceChart.data.labels.length - 1] !== 'Current') {
        performanceChart.data.labels.push('Current');
        performanceChart.data.datasets[0].data.push(wpm);
        performanceChart.data.datasets[1].data.push(parseInt(accuracyEl.textContent));
    } else {
        // Update current test data
        const lastIndex = performanceChart.data.datasets[0].data.length - 1;
        performanceChart.data.datasets[0].data[lastIndex] = wpm;
        performanceChart.data.datasets[1].data[lastIndex] = parseInt(accuracyEl.textContent);
    }
    
    performanceChart.update('none'); // Update with minimal animation for performance
}

// Save high scores and progression data to localStorage
function saveUserData(wpm, accuracy) {
    // Save high scores if better than previous
    const currentHighScoreWpm = localStorage.getItem(HIGH_SCORE_WPM_KEY) || 0;
    const currentHighScoreAccuracy = localStorage.getItem(HIGH_SCORE_ACCURACY_KEY) || 0;
    
    if (wpm > currentHighScoreWpm) {
        localStorage.setItem(HIGH_SCORE_WPM_KEY, wpm);
        if (highScoreWpmEl) highScoreWpmEl.textContent = wpm;
    }
    
    if (accuracy > currentHighScoreAccuracy) {
        localStorage.setItem(HIGH_SCORE_ACCURACY_KEY, accuracy);
        if (highScoreAccuracyEl) highScoreAccuracyEl.textContent = accuracy;
    }
    
    // Track completed tests
    const completedTests = parseInt(localStorage.getItem(COMPLETED_TESTS_KEY) || 0) + 1;
    localStorage.setItem(COMPLETED_TESTS_KEY, completedTests);
    
    // Save test result to history
    const testResult = {
        date: new Date().toISOString(),
        wpm: wpm,
        accuracy: accuracy,
        duration: testDuration,
        difficulty: difficulty
    };
    
    typingHistory.push(testResult);
    
    // Keep only the last 50 tests
    if (typingHistory.length > 50) {
        typingHistory = typingHistory.slice(-50);
    }
    
    localStorage.setItem(TYPING_HISTORY_KEY, JSON.stringify(typingHistory));
    
    // Update experience and level
    addExperience(calculateExperienceGain(wpm, accuracy));
}

// Calculate experience gain based on performance and difficulty
function calculateExperienceGain(wpm, accuracy) {
    // Base experience from WPM
    let expGain = Math.floor(wpm / 2);
    
    // Bonus experience from accuracy
    if (accuracy >= 98) {
        expGain += 30; // Perfect or near-perfect accuracy bonus
    } else if (accuracy >= 95) {
        expGain += 20; // Great accuracy bonus
    } else if (accuracy >= 90) {
        expGain += 10; // Good accuracy bonus
    }
    
    // Difficulty modifier
    switch (difficulty) {
        case 'medium':
            expGain = Math.floor(expGain * 1.5); // 50% more experience
            break;
        case 'hard':
            expGain = Math.floor(expGain * 2); // Double experience
            break;
    }
    
    // Time duration modifier
    switch (testDuration) {
        case 300: // 5 minutes
            expGain = Math.floor(expGain * 2); // Double experience
            break;
        case 180: // 3 minutes
            expGain = Math.floor(expGain * 1.5); // 50% more experience
            break;
        case 60: // 1 minute
            expGain = Math.floor(expGain * 1.2); // 20% more experience
            break;
        // 30 seconds uses the base XP
    }
    
    // Streak bonus
    if (currentStreak >= 100) {
        expGain += 50; // Massive streak bonus
    } else if (currentStreak >= 50) {
        expGain += 30; // Large streak bonus
    } else if (currentStreak >= 25) {
        expGain += 20; // Medium streak bonus
    } else if (currentStreak >= 10) {
        expGain += 10; // Small streak bonus
    }
    
    // Apply prestige XP boost if applicable
    if (prestigeLevel >= 1 && prestigeLevel < 5) {
        // 25% XP boost (Prestige 1)
        expGain = Math.floor(expGain * 1.25);
    } else if (prestigeLevel >= 5) {
        // 100% XP boost (Prestige 5)
        expGain = Math.floor(expGain * 2);
    }
    
    return expGain;
}

// Add experience and handle level up
function addExperience(expPoints) {
    experience += expPoints;
    
    // Check for level up
    if (experience >= experienceNeeded) {
        levelUp();
    }
    
    // Update localStorage and UI
    localStorage.setItem(EXPERIENCE_KEY, experience);
    if (experienceEl) experienceEl.textContent = `${experience}/${experienceNeeded}`;
    
    // Update experience bar
    updateExperienceBar();
}

// Handle level up
function levelUp() {
    level++;
    experience -= experienceNeeded;
    
    // Check if level has reached level 30 (instead of 100)
    if (level > 30) {
        // Offer prestige
        offerPrestige();
        return;
    }
    
    // Increase experience needed for next level
    experienceNeeded = Math.floor(experienceNeeded * 1.2); // Increase experience needed for next level
    
    // Save to localStorage
    localStorage.setItem(LEVEL_KEY, level);
    localStorage.setItem(EXPERIENCE_NEEDED_KEY, experienceNeeded);
    
    // Update UI
    if (levelEl) levelEl.textContent = level;
    
    // Show level up notification
    showLevelUpNotification();
    
    // Check for rewards unlocked at this level
    checkForUnlockedRewards();
    
    // Offer prestige if level >= 30
    if (level >= 30) {
        showPrestigeAvailableNotification();
    }
}

// Show level up notification
function showLevelUpNotification() {
    const notification = document.createElement('div');
    notification.classList.add('level-up-notification');
    notification.textContent = `Level Up! You are now level ${level}!`;
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 1000);
    }, 3000);
}

// Start the typing test
function startTest() {
    if (isTestRunning) return; // Prevent multiple starts

    isTestRunning = true;
    startTime = Date.now();
    lastTypingTime = Date.now();
    isPaused = false;
    elapsedTime = 0;
    
    intervalId = setInterval(() => {
        if (!isPaused) {
            updateTimer();
            updateStats(); // Update stats periodically during the test
        }
    }, 1000);

    // Ensure input is focused when test starts
    textInput.focus();
}

// End the typing test
function endTest() {
    clearInterval(intervalId);
    isTestRunning = false;
    textInput.disabled = true; // Disable input after test ends
    
    // Calculate final stats one last time for accuracy
    updateStats();
    
    // Get final stats
    const finalWpm = parseInt(wpmEl.textContent);
    const finalAccuracy = parseInt(accuracyEl.textContent);
    
    // Save data to localStorage
    saveUserData(finalWpm, finalAccuracy);
    
    // Reset scroll position to top to avoid scrolling issues
    if (textDisplay) {
        textDisplay.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    }
    
    // Optionally show results more prominently or provide feedback
    showTestResults(finalWpm, finalAccuracy);
    
    restartBtn.focus(); // Focus restart button
}

// Show test results
function showTestResults(wpm, accuracy) {
    // Create results overlay
    const resultsOverlay = document.createElement('div');
    resultsOverlay.classList.add('results-overlay');
    
    // Get high scores for comparison
    const highScoreWpm = localStorage.getItem(HIGH_SCORE_WPM_KEY) || 0;
    const highScoreAccuracy = localStorage.getItem(HIGH_SCORE_ACCURACY_KEY) || 0;
    
    // Check if this is a new high score
    const isNewWpmRecord = wpm > highScoreWpm;
    const isNewAccuracyRecord = accuracy > highScoreAccuracy;
    const isNewStreakRecord = currentStreak > bestStreak;
    
    // Calculate experience gained
    const expGained = calculateExperienceGain(wpm, accuracy);
    
    // Get time duration bonus text
    let timeBonusText = '';
    if (testDuration === 300) {
        timeBonusText = ' (2x bonus)';
    } else if (testDuration === 180) {
        timeBonusText = ' (1.5x bonus)';
    } else if (testDuration === 60) {
        timeBonusText = ' (1.2x bonus)';
    }
    
    // Get streak bonus text
    let streakBonusText = '';
    if (currentStreak >= 100) {
        streakBonusText = ' (+50 XP bonus)';
    } else if (currentStreak >= 50) {
        streakBonusText = ' (+30 XP bonus)';
    } else if (currentStreak >= 25) {
        streakBonusText = ' (+20 XP bonus)';
    } else if (currentStreak >= 10) {
        streakBonusText = ' (+10 XP bonus)';
    }
    
    // Create content
    resultsOverlay.innerHTML = `
        <div class="results-content">
            <h2>Test Results</h2>
            <div class="result-item">
                <span>WPM:</span> <span>${wpm} ${isNewWpmRecord ? '🏆 New Record!' : ''}</span>
            </div>
            <div class="result-item">
                <span>Accuracy:</span> <span>${accuracy}% ${isNewAccuracyRecord ? '🏆 New Record!' : ''}</span>
            </div>
            <div class="result-item">
                <span>Difficulty:</span> <span>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
            </div>
            <div class="result-item">
                <span>Time Duration:</span> <span>${testDuration} seconds${timeBonusText}</span>
            </div>
            <div class="result-item">
                <span>Best Streak:</span> <span>${currentStreak} ${isNewStreakRecord ? '🏆 New Record!' : ''}${streakBonusText}</span>
            </div>
            <div class="result-item">
                <span>Experience Gained:</span> <span>+${expGained}</span>
            </div>
            <div class="level-progress">
                <span>Level ${level}: </span>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(experience / experienceNeeded) * 100}%"></div>
                </div>
                <span>${experience}/${experienceNeeded}</span>
            </div>
            <div class="result-buttons">
                <button id="next-test-btn">Next Test <span class="keyboard-shortcut">(Enter)</span></button>
                <button id="close-results">Close Results <span class="keyboard-shortcut">(Esc)</span></button>
            </div>
        </div>
    `;
    
    document.body.appendChild(resultsOverlay);
    
    // Add event listener to close button
    document.getElementById('close-results').addEventListener('click', () => {
        resultsOverlay.remove();
    });
    
    // Add event listener to next test button
    const nextTestBtn = document.getElementById('next-test-btn');
    nextTestBtn.addEventListener('click', () => {
        resultsOverlay.remove();
        
        // Ensure text display is scrolled to top before resetting
        if (textDisplay) {
            textDisplay.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        }
        
        resetTest();
    });
    
    // Function to handle keyboard shortcuts
    const handleResultsKeydown = (e) => {
        if (e.key === 'Enter') {
            nextTestBtn.click();
            document.removeEventListener('keydown', handleResultsKeydown);
        } else if (e.key === 'Escape') {
            document.getElementById('close-results').click();
            document.removeEventListener('keydown', handleResultsKeydown);
        }
    };
    
    // Add global keyboard shortcut event listener
    document.addEventListener('keydown', handleResultsKeydown);
    
    // Remove keyboard listener when overlay is removed
    const cleanupListener = () => {
        document.removeEventListener('keydown', handleResultsKeydown);
        resultsOverlay.removeEventListener('transitionend', cleanupListener);
    };
    
    // Listen for overlay removal
    resultsOverlay.addEventListener('transitionend', cleanupListener);
    
    // Check for criteria to show special effects
    if (isNewWpmRecord && activeRewards.includes('fireworks')) {
        createFireworks();
    } else if (accuracy >= 90 && activeRewards.includes('confetti')) {
        createConfetti();
    }
}

// Handle difficulty button clicks
function handleDifficultyButtonClick(e) {
    if (isTestRunning) return; // Don't change difficulty during a test
    
    const newDifficulty = e.target.dataset.difficulty;
    if (newDifficulty) {
        // Update active button
        difficultyButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update difficulty
        difficulty = newDifficulty;
        
        // Save preference to localStorage
        localStorage.setItem(PREFERRED_DIFFICULTY_KEY, newDifficulty);
        
        // Reset test with new difficulty
        resetTest();
    }
}

// Handle time button clicks
function handleTimeButtonClick(e) {
    if (isTestRunning) return; // Don't change time during a test
    
    const newTime = parseInt(e.target.dataset.time);
    if (newTime) {
        // Update active button
        timeButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update test duration
        testDuration = newTime;
        timerEl.textContent = testDuration;
        
        // Save preference to localStorage
        localStorage.setItem(PREFERRED_TIME_KEY, newTime);
        
        // Reset test to update text length based on new duration
        resetTest();
    }
}

// Reset the test to its initial state
function resetTest() {
    clearInterval(intervalId); // Clear any existing timer
    isTestRunning = false;
    currentIndex = 0;
    errors = 0;
    totalTyped = 0;
    correctChars = 0;
    wordCount = 0;
    lastCalcTime = 0;
    lastCalculatedIndex = 0;
    currentStreak = 0;
    lastKeyCorrect = true;
    timerEl.textContent = testDuration;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;
    if (currentStreakEl) currentStreakEl.textContent = 0;
    textInput.disabled = false;
    textInput.value = ''; // Clear the hidden input

    // Reset all key styling
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('correct', 'incorrect', 'active');
    });

    // Load and format a new passage
    currentPassage = getRandomPassage();
    formatPassage(currentPassage);
    
    // Reset scroll position to top
    if (textDisplay) {
        textDisplay.scrollTo({
            top: 0,
            behavior: 'instant' // Use instant instead of smooth for immediate scroll
        });
    }

    // Focus the input field to be ready
    textInput.focus();
}

// Create key press visual feedback
function createKeyPressEffect(key) {
    // Animate the key on virtual keyboard
    animateKey(key);
    
    if (key === ' ') key = 'Space';
    
    // Check if key element exists
    const keyElement = document.querySelector(`[data-key="${key}"]`);
    if (!keyElement) return;
    
    // Create highlight effect
    const highlight = document.createElement('div');
    highlight.classList.add('key-highlight');
    
    // Position highlight over the key
    const keyRect = keyElement.getBoundingClientRect();
    highlight.style.width = `${keyRect.width}px`;
    highlight.style.height = `${keyRect.height}px`;
    highlight.style.left = `${keyRect.left}px`;
    highlight.style.top = `${keyRect.top}px`;
    
    document.body.appendChild(highlight);
    
    // Remove after animation completes
    setTimeout(() => highlight.remove(), 500);
}

// Mark key as correct or incorrect on virtual keyboard
function updateKeyStatus(key, isCorrect) {
    const keyLower = key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${keyLower}"]`);
    
    if (!keyElement) return;
    
    // Remove previous status
    keyElement.classList.remove('correct', 'incorrect');
    
    // Add new status
    if (isCorrect) {
        keyElement.classList.add('correct');
    } else {
        keyElement.classList.add('incorrect');
    }
    
    // Clear status after a delay
    setTimeout(() => {
        keyElement.classList.remove('correct', 'incorrect');
    }, 500);
}

// Handle user input with optimized performance
function handleInput(event) {
    // Cancel any pending pause
    clearTimeout(pauseTimeout);
    
    // If timer was paused, resume it
    if (isPaused) {
        resumeTimer();
    }
    
    // Update last typing time
    lastTypingTime = Date.now();
    
    // Set a timeout to pause the timer if no typing activity
    // Only set the timeout if we're actively in a test
    if (isTestRunning && currentIndex > 0) {
        pauseTimeout = setTimeout(() => {
            // Double-check that we're still in a test and there's been no typing
            const inactiveTime = Date.now() - lastTypingTime;
            if (isTestRunning && inactiveTime >= 3000 && !isPaused) {
                pauseTimer();
            }
        }, 3000); // Pause after 3 seconds of inactivity
    }
    
    // Start the timer on the very first valid input
    if (!isTestRunning && textInput.value.length > 0) {
        startTest();
    }

    if (!isTestRunning && textInput.value.length === 0) {
        // Ignore input if test hasn't started and input is empty (e.g., just pressing shift)
        return;
    }
    if (!isTestRunning) return; // Don't process input if timer started but test logic isn't ready

    const typedValue = textInput.value;
    const lastChar = typedValue[typedValue.length - 1]; // Get the last character typed
    
    // Play typing sound for the last character typed
    if (lastChar && activeRewards.includes('typing_sounds')) {
        playTypingSound(lastChar);
    }
    
    // Animate virtual keyboard
    if (lastChar && !virtualKeyboardEl.classList.contains('hidden')) {
        animateKey(lastChar);
    }

    // Check if a space was typed (completed word)
    if (lastChar === ' ') {
        wordCount++;
    }

    // Clear previous highlighting
    passageChars.forEach(span => span.classList.remove('correct', 'incorrect', 'current'));

    let currentErrors = 0;
    let currentTypedCount = 0;
    let currentCorrectChars = 0;
    
    // Track if the last typed character was correct
    let lastCharCorrect = true;
    
    // Store current position for smooth scrolling
    let currentCharElement = null;

    // Iterate through the typed value and compare with the passage
    for (let i = 0; i < passageChars.length; i++) {
        const charSpan = passageChars[i];
        const typedChar = typedValue[i];

        if (typedChar == null) { // If we haven't typed this far yet
            charSpan.classList.remove('correct', 'incorrect');
            if (i === typedValue.length) {
                // This is the next character to be typed
                charSpan.classList.add('current');
                currentCharElement = charSpan;
            }
        } else {
            currentTypedCount++;
            const isCorrect = typedChar === charSpan.textContent;
            
            if (isCorrect) {
                charSpan.classList.add('correct');
                charSpan.classList.remove('incorrect');
                currentCorrectChars++;
                
                // Update virtual keyboard
                if (i === currentIndex) {
                    updateKeyStatus(typedChar, true);
                    lastCharCorrect = true;
                }
            } else {
                charSpan.classList.add('incorrect');
                charSpan.classList.remove('correct');
                currentErrors++;
                
                // Update virtual keyboard
                if (i === currentIndex) {
                    updateKeyStatus(typedChar, false);
                    lastCharCorrect = false;
                }
            }
        }
    }
    
    // Improved smooth scrolling for text display
    if (currentCharElement) {
        // Get the container dimensions
        const container = textDisplay;
        const containerRect = container.getBoundingClientRect();
        
        // Find the parent word-unit of the current character
        const wordUnit = currentCharElement.closest('.word-unit');
        
        // Get positions
        const elementRect = currentCharElement.getBoundingClientRect();
        const wordRect = wordUnit ? wordUnit.getBoundingClientRect() : elementRect;
        
        // Calculate if element is near the edge of visible area
        const isNearBottom = elementRect.bottom > containerRect.bottom - 50;
        const isNearTop = elementRect.top < containerRect.top + 50;
        
        // Scroll only when approaching boundaries, not on every character
        if (isNearBottom || isNearTop) {
            // Calculate the center position to scroll to
            const lineHeight = parseInt(window.getComputedStyle(currentCharElement).lineHeight) || 
                               elementRect.height * 1.8;
            
            // Get the coordinates of the current element using word-unit if available
            const elementTop = wordUnit ? wordUnit.offsetTop : currentCharElement.offsetTop;
            
            // Create a buffer to keep text better positioned (show 2 lines above cursor)
            const scrollBuffer = lineHeight * 2;
            
            // Scroll to position that keeps enough context visible
            const scrollPosition = Math.max(0, elementTop - scrollBuffer);
            
            // Use smooth scrolling with a specific behavior for better performance
            container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // If this is a new character typed (not backspace)
    if (typedValue.length > currentIndex) {
        // Update streak based on correctness of the last character
        updateStreak(lastCharCorrect);
    }

    currentIndex = typedValue.length; // Update the overall index
    errors = currentErrors;
    totalTyped = currentTypedCount;
    correctChars = currentCorrectChars;

    // Check if test is completed by typing the whole passage
    if (currentIndex === currentPassage.length) {
        endTest();
    }

    updateStats(); // Update WPM/Accuracy on input events
}

// Toggle virtual keyboard
function toggleKeyboard() {
    keyboardVisible = !keyboardVisible;
    virtualKeyboardEl.classList.toggle('hidden', !keyboardVisible);
    
    if (keyboardVisible) {
        toggleKeyboardBtn.textContent = 'Hide Keyboard';
    } else {
        toggleKeyboardBtn.textContent = 'Show Keyboard';
    }
    
    // Save keyboard visibility preference to localStorage
    localStorage.setItem('keyboardVisible', keyboardVisible);
}

// Add key press animation to virtual keyboard
function animateKey(key) {
    const keyLower = key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${keyLower}"]`);
    
    if (keyElement) {
        // Add active class for animation
        keyElement.classList.add('active');
        
        // Remove active class after animation
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 100);
    }
}

// Update streak counter
function updateStreak(isCorrect) {
    if (isCorrect) {
        // If previous key was also correct, increment streak
        if (lastKeyCorrect) {
            currentStreak++;
        } else {
            // Reset streak if previous key was wrong
            currentStreak = 1;
        }
        lastKeyCorrect = true;
    } else {
        // Reset streak on error
        currentStreak = 0;
        lastKeyCorrect = false;
    }
    
    // Update UI
    if (currentStreakEl) {
        currentStreakEl.textContent = currentStreak;
    }
    
    // Update best streak if current is higher
    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        if (bestStreakEl) {
            bestStreakEl.textContent = bestStreak;
        }
        localStorage.setItem(BEST_STREAK_KEY, bestStreak);
    }
}

// Reset all user progress
function resetProgress() {
    // Create custom confirmation dialog
    const confirmOverlay = document.createElement('div');
    confirmOverlay.classList.add('confirm-overlay');
    
    confirmOverlay.innerHTML = `
        <div class="confirm-dialog">
            <h3>Reset Progress</h3>
            <p>Are you sure you want to reset all your progress?</p>
            <p class="warning-text">This will permanently delete:</p>
            <ul>
                <li>Your level (currently ${level})</li>
                <li>All experience points</li>
                <li>High scores and records</li>
                <li>Typing history and statistics</li>
                <li>Your personal preferences</li>
            </ul>
            <p class="warning-text">This action cannot be undone!</p>
            <div class="confirm-buttons">
                <button id="cancel-reset" class="cancel-btn">Cancel</button>
                <button id="confirm-reset" class="danger-btn">Yes, Reset Everything</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmOverlay);
    
    // Add click event to close when clicking outside the dialog
    confirmOverlay.addEventListener('click', (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === confirmOverlay) {
            confirmOverlay.remove();
        }
    });
    
    // Add event listeners to buttons
    document.getElementById('cancel-reset').addEventListener('click', () => {
        confirmOverlay.remove();
    });
    
    document.getElementById('confirm-reset').addEventListener('click', () => {
        // Clear all user data from localStorage
        USER_DATA_KEYS.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Also clear keyboard visibility as it's stored separately
        localStorage.removeItem('keyboardVisible');
        
        // Reset state variables
        level = 1;
        experience = 0;
        experienceNeeded = 100;
        typingHistory = [];
        
        // Reset UI
        if (levelEl) levelEl.textContent = level;
        if (experienceEl) experienceEl.textContent = `${experience}/${experienceNeeded}`;
        if (highScoreWpmEl) highScoreWpmEl.textContent = 0;
        if (highScoreAccuracyEl) highScoreAccuracyEl.textContent = 0;
        if (bestStreakEl) bestStreakEl.textContent = 0;
        
        // Update progress bar
        updateExperienceBar();
        
        // Reset chart if visible
        if (!typingHistoryEl.classList.contains('hidden') && performanceChart) {
            initializePerformanceChart();
        }
        
        // Restart test
        resetTest();
        
        // Show notification
        showNotification('Progress reset successfully!', 'info');
        
        // Remove the confirmation dialog
        confirmOverlay.remove();
    });
}

// Check for newly unlocked rewards at current level
function checkForUnlockedRewards() {
    let newlyUnlocked = [];
    
    // Get rewards that should be unlocked at current level
    LEVEL_REWARDS.forEach(reward => {
        if (level >= reward.level && !unlockedRewards.includes(reward.id)) {
            unlockedRewards.push(reward.id);
            // Automatically add to active rewards if it's not a theme
            if (!reward.id.startsWith('theme_')) {
                activeRewards.push(reward.id);
            }
            newlyUnlocked.push(reward);
        }
    });
    
    // Save updated unlocked rewards to localStorage
    localStorage.setItem(UNLOCKED_REWARDS_KEY, JSON.stringify(unlockedRewards));
    localStorage.setItem(ACTIVE_REWARDS_KEY, JSON.stringify(activeRewards));
    
    // If there are newly unlocked rewards, show notification
    if (newlyUnlocked.length > 0) {
        showRewardsUnlocked(newlyUnlocked);
    }
}

// Show notification for newly unlocked rewards
function showRewardsUnlocked(rewards) {
    const rewardsOverlay = document.createElement('div');
    rewardsOverlay.classList.add('rewards-overlay');
    
    let rewardsHTML = `
        <div class="rewards-dialog">
            <h3>${rewards.length > 1 ? 'New Rewards Unlocked!' : 'New Reward Unlocked!'}</h3>
            <div class="rewards-list">
    `;
    
    rewards.forEach(reward => {
        rewardsHTML += `
            <div class="reward-item unlocked">
                <div class="reward-icon"><i class="fa-solid fa-gift"></i></div>
                <div class="reward-details">
                    <h4>${reward.name}</h4>
                    <p>${reward.description}</p>
                </div>
                <button class="toggle-reward-btn" data-reward="${reward.id}">Activate</button>
            </div>
        `;
    });
    
    rewardsHTML += `
            </div>
            <button id="view-all-rewards" class="rewards-button">View All Rewards</button>
            <button id="close-rewards" class="rewards-button">Continue <span class="keyboard-shortcut">(Enter)</span></button>
        </div>
    `;
    
    rewardsOverlay.innerHTML = rewardsHTML;
    document.body.appendChild(rewardsOverlay);
    
    // Add click event to close when clicking outside the dialog
    rewardsOverlay.addEventListener('click', (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === rewardsOverlay) {
            rewardsOverlay.remove();
        }
    });
    
    // Add confetti effect for reward unlock
    createConfetti();
    
    // Add event listener to close button
    const closeButton = document.getElementById('close-rewards');
    closeButton.addEventListener('click', () => {
        rewardsOverlay.remove();
    });
    
    // Function to handle keyboard shortcuts
    const handleRewardsKeydown = (e) => {
        if (e.key === 'Enter') {
            // Trigger the continue button
            closeButton.click();
            document.removeEventListener('keydown', handleRewardsKeydown);
        } else if (e.key === 'Escape') {
            closeButton.click();
            document.removeEventListener('keydown', handleRewardsKeydown);
        }
    };
    
    // Add global keyboard shortcut event listener
    document.addEventListener('keydown', handleRewardsKeydown);
    
    // Remove keyboard listener when overlay is removed
    const cleanupListener = () => {
        document.removeEventListener('keydown', handleRewardsKeydown);
        rewardsOverlay.removeEventListener('transitionend', cleanupListener);
    };
    
    // Listen for overlay removal
    rewardsOverlay.addEventListener('transitionend', cleanupListener);
    
    // Add event listeners to toggle buttons
    const toggleButtons = rewardsOverlay.querySelectorAll('.toggle-reward-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', toggleReward);
    });
    
    // Add event listener to view all rewards button
    document.getElementById('view-all-rewards').addEventListener('click', () => {
        rewardsOverlay.remove();
        showAllRewards();
    });
}

// Toggle a reward on or off
function toggleReward(e) {
    e.stopPropagation(); // Prevent event bubbling
    
    const rewardId = e.target.dataset.reward;
    const isCurrentlyActive = activeRewards.includes(rewardId);
    
    if (isCurrentlyActive) {
        // Remove from active rewards
        activeRewards = activeRewards.filter(id => id !== rewardId);
        e.target.textContent = 'Activate';
        e.target.classList.remove('active');
        e.target.closest('.reward-item').classList.remove('active');
    } else {
        // Add to active rewards
        activeRewards.push(rewardId);
        e.target.textContent = 'Deactivate';
        e.target.classList.add('active');
        e.target.closest('.reward-item').classList.add('active');
        
        // If it's a theme, apply it immediately
        if (rewardId.startsWith('theme_')) {
            applyTheme(rewardId);
        }
        
        // If it's typing sounds, preload the sounds
        if (rewardId === 'typing_sounds') {
            loadTypingSounds();
        }
    }
    
    // Save active rewards to localStorage
    localStorage.setItem(ACTIVE_REWARDS_KEY, JSON.stringify(activeRewards));
    
    // Show notification
    showNotification(`Reward ${isCurrentlyActive ? 'deactivated' : 'activated'}. Applying changes...`, 'info');
    
    // Refresh the page after a short delay to apply changes
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Apply theme based on unlocked rewards
function applyTheme(themeId) {
    // Check if theme is unlocked
    if (!unlockedRewards.includes(themeId)) return;
    
    // Remove any existing theme classes
    document.body.classList.remove('theme-hacker', 'theme-sunset', 'theme-neon', 'theme-gold');
    
    // Get current active theme (if any)
    const currentTheme = activeRewards.find(id => id.startsWith('theme_'));
    
    // If trying to activate a theme that's already active, just return
    if (currentTheme === themeId) return;
    
    // If there's a different theme currently active, deactivate it
    if (currentTheme && currentTheme !== themeId) {
        activeRewards = activeRewards.filter(id => id !== currentTheme);
    }
    
    // Add the new theme to active rewards if it's not being deactivated
    if (!activeRewards.includes(themeId)) {
        activeRewards.push(themeId);
    }
    
    // Apply the theme class
    document.body.classList.add(themeId);
    
    // If the hacker theme is being applied, create the matrix animation
    if (themeId === 'theme_hacker') {
        createMatrixAnimation();
    } else {
        // Remove any existing matrix animation
        removeMatrixAnimation();
    }
    
    // Save active rewards
    localStorage.setItem(ACTIVE_REWARDS_KEY, JSON.stringify(activeRewards));
}

// Create the Matrix animation effect
function createMatrixAnimation() {
    // Remove any existing matrix animation
    removeMatrixAnimation();
    
    // Create animation container
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-animation';
    document.body.appendChild(matrixContainer);
    
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate number of columns based on window width
    const columnCount = Math.floor(windowWidth / 20);
    
    // Create falling text columns
    for (let i = 0; i < columnCount; i++) {
        createMatrixColumn(matrixContainer, i * 20, windowHeight);
    }
    
    // Store reference to container
    window.matrixContainer = matrixContainer;
    
    // Find the typing area position and adjust mask if needed
    adjustMatrixMask();
    
    // Listen for window resize to adjust mask
    window.addEventListener('resize', adjustMatrixMask);
}

// Create a single matrix column
function createMatrixColumn(container, xPos, windowHeight) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    
    // Position horizontally
    column.style.left = `${xPos}px`;
    
    // Random character count
    const charCount = 5 + Math.floor(Math.random() * 15);
    
    // Fill with random binary digits
    for (let i = 0; i < charCount; i++) {
        const char = document.createElement('div');
        char.textContent = Math.random() > 0.5 ? '1' : '0';
        char.style.opacity = (1 - (i / charCount)).toFixed(2);
        column.appendChild(char);
    }
    
    // Set random animation duration
    const duration = 2 + Math.random() * 6;
    column.style.animationDuration = `${duration}s`;
    
    // Set random delay
    const delay = Math.random() * 5;
    column.style.animationDelay = `${delay}s`;
    
    // Add to container
    container.appendChild(column);
    
    // Remove and recreate when animation completes
    setTimeout(() => {
        if (container.parentNode) {
            container.removeChild(column);
            createMatrixColumn(container, xPos, windowHeight);
        }
    }, (duration + delay) * 1000);
}

// Adjust the matrix mask based on typing area position
function adjustMatrixMask() {
    // Only proceed if matrix container exists
    if (!window.matrixContainer) return;
    
    // Find the text display element
    const textDisplay = document.getElementById('text-display');
    if (!textDisplay) return;
    
    // Get the position of the text display
    const rect = textDisplay.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate where the mask should start fading out (just above the text display)
    const startFade = Math.max(0, (rect.top / windowHeight) * 100 - 10); // 10% above text display
    const endFade = Math.min(100, (rect.top / windowHeight) * 100 + 5);  // 5% below top of text display
    
    // Apply the gradient mask
    window.matrixContainer.style.maskImage = `linear-gradient(to bottom, 
        rgba(0,0,0,1) 0%, 
        rgba(0,0,0,1) ${startFade}%, 
        rgba(0,0,0,0) ${endFade}%)`;
    
    window.matrixContainer.style.webkitMaskImage = `linear-gradient(to bottom, 
        rgba(0,0,0,1) 0%, 
        rgba(0,0,0,1) ${startFade}%, 
        rgba(0,0,0,0) ${endFade}%)`;
}

// Remove matrix animation
function removeMatrixAnimation() {
    if (window.matrixContainer && window.matrixContainer.parentNode) {
        window.matrixContainer.parentNode.removeChild(window.matrixContainer);
    }
}

// Apply active theme when page loads
function applyActiveThemeOnLoad() {
    // Check if there's an active theme
    const activeTheme = activeRewards.find(id => id.startsWith('theme_'));
    if (activeTheme && unlockedRewards.includes(activeTheme)) {
        // Apply theme
        document.body.classList.add(activeTheme);
        
        // If it's the hacker theme, create matrix animation
        if (activeTheme === 'theme_hacker') {
            // Delay matrix creation slightly to ensure DOM is ready
            setTimeout(createMatrixAnimation, 500);
        }
    }
    
    // Add digital pet if user has prestiged
    if (prestigeLevel > 0) {
        addDigitalPet();
    }
}

// Show notification that prestige is available
function showPrestigeAvailableNotification() {
    if (prestigeLevel > 0) return; // Don't show if already prestiged
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification prestige-notification`;
    notification.innerHTML = `
        <i class="fa-solid fa-star"></i> Prestige available at level 30!
        <button id="view-prestige-info" class="mini-btn">Learn More</button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Add event listener to learn more button
    document.getElementById('view-prestige-info').addEventListener('click', () => {
        notification.remove();
        showPrestigeInfoDialog();
    });
    
    // Remove after delay
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('visible');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 10000);
}

// Show prestige info dialog
function showPrestigeInfoDialog() {
    // Create dialog overlay
    const infoOverlay = document.createElement('div');
    infoOverlay.classList.add('prestige-overlay');
    
    // Create content
    infoOverlay.innerHTML = `
        <div class="prestige-dialog">
            <h3>Prestige System</h3>
            <p>Reach level 30 to unlock the Prestige system and earn powerful permanent bonuses!</p>
            
            <div class="prestige-levels">
                ${PRESTIGE_REWARDS.map(reward => `
                    <div class="prestige-level-item ${prestigeLevel >= reward.level ? 'unlocked' : 'locked'}">
                        <div class="prestige-level-icon">
                            <i class="fa-solid fa-star"></i>
                            <span>${reward.level}</span>
                        </div>
                        <div class="prestige-level-details">
                            <h4>${reward.name}</h4>
                            <p>${reward.description}</p>
                        </div>
                        ${prestigeLevel >= reward.level ? '<div class="reward-status">Unlocked</div>' : ''}
                    </div>
                `).join('')}
            </div>
            
            <p class="prestige-note">Each time you prestige, you'll reset to level 1 but keep all your unlocked rewards and gain powerful new abilities!</p>
            
            <button id="close-prestige-info" class="rewards-button">Close</button>
        </div>
    `;
    
    document.body.appendChild(infoOverlay);
    
    // Add click event to close when clicking outside the dialog
    infoOverlay.addEventListener('click', (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === infoOverlay) {
            infoOverlay.remove();
        }
    });
    
    // Add event listener to close button
    document.getElementById('close-prestige-info').addEventListener('click', () => {
        infoOverlay.remove();
    });
}

// Offer prestige when reaching max level
function offerPrestige() {
    // Create prestige overlay
    const prestigeOverlay = document.createElement('div');
    prestigeOverlay.classList.add('prestige-overlay');
    
    // Get next prestige level
    const nextPrestigeLevel = prestigeLevel + 1;
    
    // Find rewards for next prestige level
    const prestigeReward = PRESTIGE_REWARDS.find(r => r.level === nextPrestigeLevel) || 
                          {name: 'Prestige Master', description: 'You have reached the highest prestige level'};
    
    // Create prestige content
    prestigeOverlay.innerHTML = `
        <div class="prestige-dialog">
            <h3>Prestige Available!</h3>
            <div class="prestige-icon">
                <i class="fa-solid fa-star"></i>
                <span>${nextPrestigeLevel}</span>
            </div>
            <p>You've reached level 30! Ready to ascend to the next level of mastery?</p>
            
            <div class="prestige-reward">
                <h4>Unlock at Prestige ${nextPrestigeLevel}:</h4>
                <div class="reward-item unlocked">
                    <div class="reward-icon"><i class="fa-solid fa-award"></i></div>
                    <div class="reward-details">
                        <h4>${prestigeReward.name}</h4>
                        <p>${prestigeReward.description}</p>
                    </div>
                </div>
            </div>
            
            <div class="prestige-warning">
                <p><i class="fa-solid fa-triangle-exclamation"></i> You will reset to level 1, but keep:</p>
                <ul>
                    <li>All unlocked rewards and themes</li>
                    <li>Your typing history and statistics</li>
                    <li>Your prestige level and benefits</li>
                </ul>
            </div>
            
            <div class="prestige-buttons">
                <button id="cancel-prestige" class="cancel-btn">Not Yet</button>
                <button id="confirm-prestige" class="prestige-btn">Prestige Now</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(prestigeOverlay);
    
    // Add click event to close when clicking outside the dialog
    prestigeOverlay.addEventListener('click', (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === prestigeOverlay) {
            prestigeOverlay.remove();
        }
    });
    
    // Add event listeners to buttons
    document.getElementById('cancel-prestige').addEventListener('click', () => {
        prestigeOverlay.remove();
    });
    
    document.getElementById('confirm-prestige').addEventListener('click', () => {
        // Perform prestige
        performPrestige();
        prestigeOverlay.remove();
    });
}

// Perform prestige - reset level but keep rewards
function performPrestige() {
    // Increment prestige level
    prestigeLevel++;
    
    // Reset level and experience
    level = 1;
    experience = 0;
    experienceNeeded = 100;
    
    // Save to localStorage
    localStorage.setItem(PRESTIGE_LEVEL_KEY, prestigeLevel);
    localStorage.setItem(LEVEL_KEY, level);
    localStorage.setItem(EXPERIENCE_KEY, experience);
    localStorage.setItem(EXPERIENCE_NEEDED_KEY, experienceNeeded);
    
    // Show prestige celebration
    showPrestigeCelebration();
    
    // Update UI
    if (levelEl) levelEl.textContent = level;
    if (experienceEl) experienceEl.textContent = `${experience}/${experienceNeeded}`;
    
    // Update experience bar
    updateExperienceBar();
    
    // Reset test
    resetTest();
}

// Show prestige celebration
function showPrestigeCelebration() {
    // Create prestige celebration overlay
    const celebrationOverlay = document.createElement('div');
    celebrationOverlay.classList.add('prestige-celebration');
    
    // Find the reward for this prestige level
    const reward = PRESTIGE_REWARDS.find(r => r.level === prestigeLevel) || 
                 {name: 'Prestige Master', description: 'You have reached the highest prestige level'};
    
    // Get pet stage based on prestige level
    const petStage = DIGITAL_PET_STAGES.find(stage => stage.level === prestigeLevel) || 
                    DIGITAL_PET_STAGES[DIGITAL_PET_STAGES.length - 1];
    
    celebrationOverlay.innerHTML = `
        <div class="celebration-dialog">
            <h2>Prestige ${prestigeLevel} Achieved!</h2>
            <div class="prestige-badge">
                <i class="fa-solid fa-star"></i>
                <span>${prestigeLevel}</span>
            </div>
            
            <div class="digital-pet-evolution">
                <div class="pet-container" style="background-color: ${petStage.color}20; border: 2px solid ${petStage.color};">
                    <div class="pet-emoji">${petStage.emoji}</div>
                    <div class="pet-info">
                        <h3>${petStage.name}</h3>
                        <p>${petStage.description}</p>
                    </div>
                </div>
            </div>
            
            <div class="prestige-unlocked">
                <h3>Unlocked:</h3>
                <div class="reward-item unlocked">
                    <div class="reward-icon"><i class="fa-solid fa-award"></i></div>
                    <div class="reward-details">
                        <h4>${reward.name}</h4>
                        <p>${reward.description}</p>
                    </div>
                </div>
            </div>
            <button id="continue-after-prestige" class="rewards-button">Continue</button>
        </div>
    `;
    
    document.body.appendChild(celebrationOverlay);
    
    // Create style element if it doesn't exist
    let styleEl = document.getElementById('pet-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'pet-styles';
        document.head.appendChild(styleEl);
    }
    
    // CSS for pet widget
    styleEl.textContent = `
        .digital-pet-evolution {
            margin: 20px 0;
        }
        
        .pet-container {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .pet-emoji {
            font-size: 30px;
            margin-right: 10px;
            animation: bounce 2s infinite;
        }
        
        .pet-info {
            flex: 1;
        }
        
        .pet-info h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    `;
    
    // Add click event to close when clicking outside the dialog
    celebrationOverlay.addEventListener('click', (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === celebrationOverlay) {
            celebrationOverlay.remove();
        }
    });
    
    // Create fireworks/confetti effect
    createFireworks();
    createConfetti();
    
    // Add event listener to continue button
    document.getElementById('continue-after-prestige').addEventListener('click', () => {
        celebrationOverlay.remove();
        
        // After closing the prestige celebration, add pet to UI
        setTimeout(addDigitalPet, 500);
    });
}

// Create confetti effect
function createConfetti() {
    // Check if confetti reward is active
    if (!activeRewards.includes('confetti')) return;
    
    const confettiCount = 200;
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        container.remove();
    }, 10000); // Remove confetti after 10 seconds
}

// Create fireworks effect
function createFireworks() {
    // Check if fireworks reward is active
    if (!activeRewards.includes('fireworks')) return;
    
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);
    
    // Create multiple fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = 20 + (Math.random() * 60) + '%';
            firework.style.top = 20 + (Math.random() * 40) + '%';
            fireworksContainer.appendChild(firework);
            
            // Create particles for this firework
            const particleCount = 30;
            const particleColors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'];
            
            for (let j = 0; j < particleCount; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
                particle.style.setProperty('--angle', Math.random() * 360 + 'deg');
                particle.style.setProperty('--distance', Math.random() * 5 + 5 + 'vmin');
                firework.appendChild(particle);
            }
            
            // Remove this firework after animation completes
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 300);
    }
    
    // Remove container after all fireworks complete
    setTimeout(() => {
        fireworksContainer.remove();
    }, 5000);
}

// Add rewards button to the UI
function addRewardsButton() {
    // Check if button already exists
    if (document.getElementById('view-rewards-btn')) return;
    
    // Create rewards button
    const rewardsBtn = document.createElement('button');
    rewardsBtn.id = 'view-rewards-btn';
    rewardsBtn.title = 'View Unlockable Rewards';
    rewardsBtn.innerHTML = '<i class="fa-solid fa-trophy"></i>';
    
    // Add event listener
    rewardsBtn.addEventListener('click', showAllRewards);
    
    // Find a good place to add the button (next to the reset button)
    const levelInfo = document.querySelector('.level-info');
    if (levelInfo) {
        levelInfo.appendChild(rewardsBtn);
    }
}

// Show all rewards (both locked and unlocked)
function showAllRewards() {
    const rewardsOverlay = document.createElement('div');
    rewardsOverlay.classList.add('rewards-overlay');
    
    let rewardsHTML = `
        <div class="rewards-dialog all-rewards">
            <h3>Rewards & Unlockables</h3>
            <p>Level up to unlock special features and themes!</p>
            <div class="rewards-list">
    `;
    
    LEVEL_REWARDS.forEach(reward => {
        const isUnlocked = unlockedRewards.includes(reward.id);
        const isActive = activeRewards.includes(reward.id);
        
        rewardsHTML += `
            <div class="reward-item ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}">
                <div class="reward-level">Level ${reward.level}</div>
                <div class="reward-icon">
                    ${isUnlocked ? '<i class="fa-solid fa-unlock"></i>' : '<i class="fa-solid fa-lock"></i>'}
                </div>
                <div class="reward-details">
                    <h4>${reward.name}</h4>
                    <p>${reward.description}</p>
                </div>
                ${isUnlocked ? 
                    `<div class="reward-controls">
                        <button class="toggle-reward-btn ${isActive ? 'active' : ''}" data-reward="${reward.id}">
                            ${isActive ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>` : 
                    '<div class="reward-status locked">Locked</div>'}
            </div>
        `;
    });
    
    rewardsHTML += `
            </div>
            <button id="close-all-rewards" class="rewards-button">Close</button>
        </div>
    `;
    
    rewardsOverlay.innerHTML = rewardsHTML;
    document.body.appendChild(rewardsOverlay);
    
    // Add click event to close when clicking outside the dialog
    rewardsOverlay.addEventListener('click', (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === rewardsOverlay) {
            rewardsOverlay.remove();
        }
    });
    
    // Add event listener to close button
    document.getElementById('close-all-rewards').addEventListener('click', () => {
        rewardsOverlay.remove();
    });
    
    // Add event listeners to toggle buttons
    const toggleButtons = rewardsOverlay.querySelectorAll('.toggle-reward-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', toggleReward);
    });
}

// Add event listener for direct key events to catch backspace/enter
document.addEventListener('keydown', function(e) {
    // Only play sounds if input is focused and typing sounds are enabled
    if (document.activeElement === textInput && activeRewards.includes('typing_sounds')) {
        // Check for special keys
        if (e.key === 'Backspace' || e.key === 'Enter') {
            playTypingSound(e.key);
        }
    }
});

// --- Event Listeners ---
textInput.addEventListener('input', handleInput);
restartBtn.addEventListener('click', resetTest);

// Add event listeners to time buttons
timeButtons.forEach(button => {
    button.addEventListener('click', handleTimeButtonClick);
});

// Add event listeners to difficulty buttons
difficultyButtons.forEach(button => {
    button.addEventListener('click', handleDifficultyButtonClick);
});

// Add event listener to theme toggle button
if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', toggleDarkMode);
}

// Add event listener to stats toggle button
if (toggleStatsBtn) {
    toggleStatsBtn.addEventListener('click', toggleTypingHistory);
}

// Add event listener to keyboard toggle button
if (toggleKeyboardBtn) {
    toggleKeyboardBtn.addEventListener('click', toggleKeyboard);
}

// Add event listener to live stats toggle button
if (toggleLiveStatsBtn) {
    toggleLiveStatsBtn.addEventListener('click', toggleLiveStats);
}

// Add event listener to export data button
if (exportDataBtn) {
    exportDataBtn.addEventListener('click', exportUserData);
}

// Add event listener to import data button
if (importDataBtn) {
    importDataBtn.addEventListener('click', () => {
        importFileInput.click();
    });
}

// Add event listener to file input
if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            importUserData(file);
        }
    });
}

// Optional: Allow focusing the input easily by clicking anywhere
document.body.addEventListener('click', (e) => {
    // Don't focus if clicking buttons or the typing history section
    if (
        e.target.tagName.toLowerCase() === 'button' || 
        typingHistoryEl.contains(e.target) ||
        e.target.closest('.results-overlay') ||
        virtualKeyboardEl.contains(e.target)
    ) {
        return;
    }
    
    if(!textInput.disabled){ // Only focus if not disabled
        textInput.focus();
    }
});

// Add event listener to reset progress button
if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', resetProgress);
}

// --- Initial Setup ---
loadUserData(); // Load user data from localStorage
resetTest(); // Initialize the test when the script loads
loadUserData(); // Load user data from localStorage
resetTest(); // Initialize the test when the script loads

// Apply active theme and initialize digital pet when the page is fully loaded
window.addEventListener('load', function() {
    // Apply active theme
    const activeTheme = activeRewards.find(id => id.startsWith('theme_'));
    if (activeTheme && unlockedRewards.includes(activeTheme)) {
        // Apply theme
        document.body.classList.add(activeTheme);
        
        // If it's the hacker theme, create matrix animation
        if (activeTheme === 'theme_hacker') {
            // Delay matrix creation slightly to ensure DOM is ready
            setTimeout(createMatrixAnimation, 500);
        }
    }
    
    // Add digital pet (always show, start with egg if prestigeLevel is 0)
    addDigitalPet();
});

// Add digital pet widget to the page
function addDigitalPet() {
    // Check if pet widget already exists
    if (document.getElementById('digital-pet-widget')) {
        updateDigitalPet();
        return;
    }
    
    // Create pet widget container
    const petWidget = document.createElement('div');
    petWidget.id = 'digital-pet-widget';
    petWidget.className = 'digital-pet-widget';
    
    // Get pet stage based on prestige level
    const petStage = DIGITAL_PET_STAGES.find(stage => stage.level === prestigeLevel) || DIGITAL_PET_STAGES[0];
    
    petWidget.innerHTML = `
        <div class="pet-container">
            <div class="pet-emoji">${petStage.emoji}</div>
            <div class="pet-info">
                <h3>${petStage.name}</h3>
                <div class="pet-prestige-level">Prestige: ${prestigeLevel}</div>
            </div>
        </div>
    `;
    
    // Add click handler to show pet details
    petWidget.addEventListener('click', () => {
        // Create modal for pet details
        const petModal = document.createElement('div');
        petModal.className = 'pet-details-modal';
        
        // Get next evolution if available
        let nextEvolution = '';
        if (prestigeLevel < DIGITAL_PET_STAGES.length - 1) {
            const nextStage = DIGITAL_PET_STAGES.find(stage => stage.level === prestigeLevel + 1);
            if (nextStage) {
                nextEvolution = `
                    <div class="next-evolution">
                        <h4>Next Evolution</h4>
                        <div class="evolution-preview">
                            <div class="pet-emoji">${nextStage.emoji}</div>
                            <div class="evolution-info">
                                <h4>${nextStage.name}</h4>
                                <p>${nextStage.description}</p>
                                <div class="requirement">Requires Prestige ${nextStage.level}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        
        petModal.innerHTML = `
            <div class="pet-details-content">
                <h3>Your Typing Companion</h3>
                <div class="current-pet">
                    <div class="pet-emoji large">${petStage.emoji}</div>
                    <div class="pet-details">
                        <h4>${petStage.name}</h4>
                        <p>${petStage.description}</p>
                        <div class="pet-prestige-level">Prestige Level: ${prestigeLevel}</div>
                    </div>
                </div>
                ${nextEvolution}
                <button id="close-pet-details">Close</button>
            </div>
        `;
        
        document.body.appendChild(petModal);
        
        // Add style for modal if not already exists
        let styleEl = document.getElementById('pet-styles');
        if (styleEl) {
            styleEl.textContent += `
                .pet-details-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                
                .pet-details-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }
                
                .current-pet {
                    display: flex;
                    align-items: center;
                    margin: 20px 0;
                    padding: 15px;
                    border-radius: 10px;
                    background-color: rgba(0,0,0,0.05);
                }
                
                .pet-emoji.large {
                    font-size: 60px;
                }
                
                .next-evolution {
                    margin-top: 20px;
                    padding: 15px;
                    border-radius: 10px;
                    border: 1px dashed #999;
                    background-color: rgba(0,0,0,0.02);
                }
                
                .evolution-preview {
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                }
                
                .evolution-info {
                    margin-left: 15px;
                }
                
                body.dark-mode .pet-details-content {
                    background-color: #333;
                    color: #eee;
                }
                
                #close-pet-details {
                    display: block;
                    margin: 20px auto 0;
                    padding: 8px 20px;
                    background-color: #444;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                
                #close-pet-details:hover {
                    background-color: #222;
                }
                
                body.dark-mode #close-pet-details {
                    background-color: #555;
                }
                
                body.dark-mode #close-pet-details:hover {
                    background-color: #777;
                }
            `;
        }
        
        // Add event listener to close modal
        petModal.addEventListener('click', (e) => {
            if (e.target === petModal || e.target.id === 'close-pet-details') {
                petModal.remove();
            }
        });
    });
    
    // Append to page - find a good spot (near the level info)
    const levelInfo = document.querySelector('.level-info');
    if (levelInfo) {
        levelInfo.parentNode.insertBefore(petWidget, levelInfo.nextSibling);
    } else {
        // Fallback - add at the top of the page
        const firstElement = document.body.firstChild;
        document.body.insertBefore(petWidget, firstElement);
    }
    
    // Add styles for pet widget
    addPetStyles();
}

// Update digital pet appearance based on prestige level
function updateDigitalPet() {
    const petWidget = document.getElementById('digital-pet-widget');
    if (!petWidget) return;
    
    // Get pet stage based on prestige level
    const petStage = DIGITAL_PET_STAGES.find(stage => stage.level === prestigeLevel) || DIGITAL_PET_STAGES[0];
    
    // Update the widget HTML
    petWidget.innerHTML = `
        <div class="pet-container">
            <div class="pet-emoji">${petStage.emoji}</div>
            <div class="pet-info">
                <h3>${petStage.name}</h3>
                <div class="pet-prestige-level">Prestige: ${prestigeLevel}</div>
            </div>
        </div>
    `;
}

// Add CSS styles for pet widget
function addPetStyles() {
    // Create style element if it doesn't exist
    let styleEl = document.getElementById('pet-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'pet-styles';
        document.head.appendChild(styleEl);
    }
    
    // CSS for pet widget
    styleEl.textContent = `
        .digital-pet-widget {
            position: relative;
            margin: 10px 0;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .digital-pet-widget:hover {
            transform: scale(1.05);
        }
        
        .pet-container {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.05);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .pet-emoji {
            font-size: 30px;
            margin-right: 10px;
            animation: bounce 2s infinite;
        }
        
        .pet-info {
            flex: 1;
        }
        
        .pet-info h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
        }
        
        .pet-prestige-level {
            font-size: 12px;
            opacity: 0.8;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    `;
}

// Pause the timer
function pauseTimer() {
    if (!isPaused && isTestRunning) {
        isPaused = true;
        
        // Check if a pause indicator already exists
        const existingIndicator = document.getElementById('pause-indicator');
        if (existingIndicator) {
            return; // Don't create another one if one already exists
        }
        
        // Show pause indicator
        const pauseIndicator = document.createElement('div');
        pauseIndicator.id = 'pause-indicator';
        pauseIndicator.classList.add('pause-indicator');
        pauseIndicator.innerHTML = '<i class="fas fa-pause"></i> Paused (type to resume)';
        document.body.appendChild(pauseIndicator);
        
        // Apply fade-in animation
        setTimeout(() => {
            pauseIndicator.classList.add('visible');
        }, 10);
    }
}

// Resume the timer
function resumeTimer() {
    if (isPaused && isTestRunning) {
        isPaused = false;
        
        // Remove pause indicator with a fade-out animation
        const pauseIndicator = document.getElementById('pause-indicator');
        if (pauseIndicator) {
            pauseIndicator.classList.remove('visible');
            // Wait for fade-out animation to complete before removing
            setTimeout(() => {
                if (pauseIndicator && pauseIndicator.parentNode) {
                    pauseIndicator.remove();
                }
            }, 300); // 300ms matches CSS transition time
        }
    }
}