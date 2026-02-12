// MODIFIED: Updated game data with new sentences about nutrition and health
const gameData = [
    {
        level: 1,
        sentence: "我们要注意饮食均衡。",
        pinyin: "wǒ men yào zhù yì yǐn shí jūn héng。",
        translation: "We need to pay attention to a balanced diet.",
        words: [
            { word: "我们", pinyin: "wǒ men", translation: "we, us" },
            { word: "要", pinyin: "yào", translation: "need to, must" },
            { word: "注意", pinyin: "zhù yì", translation: "pay attention to" },
            { word: "饮食", pinyin: "yǐn shí", translation: "diet" },
            { word: "均衡", pinyin: "jūn héng", translation: "balanced" },
            { word: "。", pinyin: "", translation: "period" }
        ]
    },
    {
        level: 2,
        sentence: "睡眠不足会影响身体健康。",
        pinyin: "shuì mián bù zú huì yǐng xiǎng shēn tǐ jiàn kāng。",
        translation: "Lack of sleep will affect physical health.",
        words: [
            { word: "睡眠", pinyin: "shuì mián", translation: "sleep" },
            { word: "不足", pinyin: "bù zú", translation: "insufficient, lack" },
            { word: "会", pinyin: "huì", translation: "will" },
            { word: "影响", pinyin: "yǐng xiǎng", translation: "affect, influence" },
            { word: "身体", pinyin: "shēn tǐ", translation: "body, physical" },
            { word: "健康", pinyin: "jiàn kāng", translation: "health, healthy" },
            { word: "。", pinyin: "", translation: "period" }
        ]
    },
    {
        level: 3,
        sentence: "牛奶和豆类都含有丰富的蛋白质。",
        pinyin: "niú nǎi hé dòu lèi dōu hán yǒu fēng fù de dàn bái zhì。",
        translation: "Milk and beans both contain rich protein.",
        words: [
            { word: "牛奶", pinyin: "niú nǎi", translation: "milk" },
            { word: "和", pinyin: "hé", translation: "and" },
            { word: "豆类", pinyin: "dòu lèi", translation: "beans, legumes" },
            { word: "都", pinyin: "dōu", translation: "all, both" },
            { word: "含有", pinyin: "hán yǒu", translation: "contain" },
            { word: "丰富", pinyin: "fēng fù", translation: "rich, abundant" },
            { word: "的", pinyin: "de", translation: "of" },
            { word: "蛋白质", pinyin: "dàn bái zhì", translation: "protein" },
            { word: "。", pinyin: "", translation: "period" }
        ]
    },
    {
        level: 4,
        sentence: "早餐多吃全谷类，对身体健康有好处。",
        pinyin: "zǎo cān duō chī quán gǔ lèi, duì shēn tǐ jiàn kāng yǒu hǎo chù。",
        translation: "Eating more whole grains for breakfast is good for physical health.",
        words: [
            { word: "早餐", pinyin: "zǎo cān", translation: "breakfast" },
            { word: "多", pinyin: "duō", translation: "more" },
            { word: "吃", pinyin: "chī", translation: "eat" },
            { word: "全谷类", pinyin: "quán gǔ lèi", translation: "whole grains" },
            { word: "，", pinyin: "", translation: "comma" },
            { word: "对", pinyin: "duì", translation: "to, for" },
            { word: "身体", pinyin: "shēn tǐ", translation: "body, physical" },
            { word: "健康", pinyin: "jiàn kāng", translation: "health, healthy" },
            { word: "有", pinyin: "yǒu", translation: "have" },
            { word: "好处", pinyin: "hǎo chù", translation: "benefit, advantage" },
            { word: "。", pinyin: "", translation: "period" }
        ]
    },
    {
        level: 5,
        sentence: "糙米比白米更有营养。",
        pinyin: "cāo mǐ bǐ bái mǐ gèng yǒu yíng yǎng。",
        translation: "Brown rice is more nutritious than white rice.",
        words: [
            { word: "糙米", pinyin: "cāo mǐ", translation: "brown rice" },
            { word: "比", pinyin: "bǐ", translation: "compared to, than" },
            { word: "白米", pinyin: "bái mǐ", translation: "white rice" },
            { word: "更", pinyin: "gèng", translation: "more, even more" },
            { word: "有", pinyin: "yǒu", translation: "have" },
            { word: "营养", pinyin: "yíng yǎng", translation: "nutrition, nutritious" },
            { word: "。", pinyin: "", translation: "period" }
        ]
    },
    {
        level: 6,
        sentence: "早上我习惯吃麦片配牛奶。",
        pinyin: "zǎo shàng wǒ xí guàn chī mài piàn pèi niú nǎi。",
        translation: "In the morning, I'm used to eating cereal with milk.",
        words: [
            { word: "早上", pinyin: "zǎo shàng", translation: "morning" },
            { word: "我", pinyin: "wǒ", translation: "I, me" },
            { word: "习惯", pinyin: "xí guàn", translation: "be used to, habit" },
            { word: "吃", pinyin: "chī", translation: "eat" },
            { word: "麦片", pinyin: "mài piàn", translation: "cereal, oatmeal" },
            { word: "配", pinyin: "pèi", translation: "pair with, match" },
            { word: "牛奶", pinyin: "niú nǎi", translation: "milk" },
            { word: "。", pinyin: "", translation: "period" }
        ]
    }
];

// Game state variables
let canvas, ctx;
let currentLevel = 0;
let score = 0;
let gameRunning = false;
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let foodItems = [];
let currentWordIndex = 0;
let gridSize = 20;
// MODIFIED: Increased initial game speed (slower) and will progressively increase speed per level
let gameSpeed = 250; // Starting speed - slower than original 150ms
let lastMoveTime = 0;
let canvasWidth, canvasHeight;

// Audio context for sound effects (using Web Audio API)
let audioContext;

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if opened in new tab or iframe
    if (window.self === window.top) {
        document.body.classList.add('fullscreen');
    }
    
    // Initialize canvas
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize audio context
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
    
    // Event listeners
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('retryBtn').addEventListener('click', retryLevel);
    document.getElementById('nextLevelBtn').addEventListener('click', nextLevel);
    document.getElementById('restartGameBtn').addEventListener('click', restartGame);
    document.getElementById('hintBtn').addEventListener('click', toggleHint);
    document.getElementById('audioBtn').addEventListener('click', () => playAudio(gameData[currentLevel].sentence));
    document.getElementById('hintAudioBtn').addEventListener('click', () => playAudio(gameData[currentLevel].sentence));
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
    
    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    canvas.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    canvas.addEventListener('touchend', (e) => {
        if (!gameRunning) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0 && direction.x === 0) {
                nextDirection = { x: 1, y: 0 };
            } else if (dx < 0 && direction.x === 0) {
                nextDirection = { x: -1, y: 0 };
            }
        } else {
            // Vertical swipe
            if (dy > 0 && direction.y === 0) {
                nextDirection = { x: 0, y: 1 };
            } else if (dy < 0 && direction.y === 0) {
                nextDirection = { x: 0, y: -1 };
            }
        }
    });
    
    // Initialize first level
    initLevel();
});

// Resize canvas to fit container
function resizeCanvas() {
    const gamePanel = document.getElementById('gamePanel');
    canvasWidth = gamePanel.clientWidth;
    canvasHeight = gamePanel.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // MODIFIED: Increased grid size for larger text display
    gridSize = Math.floor(Math.min(canvasWidth, canvasHeight) / 15); // Changed from /20 to /15 for larger cells
}

// MODIFIED: Fixed speed calculation - Level 5 and 6 now have the same speed (150ms)
function getGameSpeedForLevel(level) {
    // Level 1: 250ms, Level 2: 225ms, Level 3: 200ms, Level 4: 175ms, Level 5: 150ms, Level 6: 150ms (same as level 5)
    const baseSpeed = 250;
    const speedDecrease = 25; // Decrease by 25ms per level
    const calculatedSpeed = baseSpeed - (level * speedDecrease);
    return Math.max(150, calculatedSpeed); // Minimum speed of 150ms (levels 5 and 6 will both be 150ms)
}

// Initialize level
function initLevel() {
    const levelData = gameData[currentLevel];
    
    // MODIFIED: Set game speed based on current level
    gameSpeed = getGameSpeedForLevel(currentLevel);
    
    // Update UI
    document.getElementById('currentLevel').textContent = currentLevel + 1;
    document.getElementById('score').textContent = score;
    
    // Update hint panel
    updateHintPanel();
    
    // Reset game state
    currentWordIndex = 0;
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    
    // MODIFIED: Initialize snake at center with first word - each segment stores its own word
    const centerX = Math.floor(canvasWidth / (2 * gridSize));
    const centerY = Math.floor(canvasHeight / (2 * gridSize));
    snake = [{ x: centerX, y: centerY, word: levelData.words[0].word }];
    
    // Place food items (remaining words) randomly
    foodItems = [];
    for (let i = 1; i < levelData.words.length; i++) {
        let pos;
        do {
            pos = {
                x: Math.floor(Math.random() * (canvasWidth / gridSize)),
                y: Math.floor(Math.random() * (canvasHeight / gridSize)),
                word: levelData.words[i].word
            };
        } while (isPositionOccupied(pos));
        foodItems.push(pos);
    }
    
    // Show start button
    document.getElementById('startBtn').classList.remove('hidden');
    
    // Draw initial state
    draw();
}

// Check if position is occupied by snake or other food
function isPositionOccupied(pos) {
    for (let segment of snake) {
        if (segment.x === pos.x && segment.y === pos.y) return true;
    }
    for (let food of foodItems) {
        if (food.x === pos.x && food.y === pos.y) return true;
    }
    return false;
}

// MODIFIED: Start game - Now reads the snake head word immediately after clicking start
function startGame() {
    document.getElementById('startBtn').classList.add('hidden');
    gameRunning = true;
    lastMoveTime = Date.now();
    
    // NEW: Read the snake head word immediately when game starts
    if (snake.length > 0 && snake[0].word) {
        playAudioWithPunctuation(snake[0].word);
    }
    
    gameLoop();
}

// Game loop
function gameLoop() {
    if (!gameRunning) return;
    
    const currentTime = Date.now();
    if (currentTime - lastMoveTime > gameSpeed) {
        update();
        lastMoveTime = currentTime;
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

// MODIFIED: Update game state - Fixed to preserve each segment's word when snake moves
function update() {
    // Update direction
    direction = { ...nextDirection };
    
    // Calculate new head position
    const head = snake[0];
    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
        word: head.word // Keep the head's current word by default
    };
    
    // Check wall collision
    if (newHead.x < 0 || newHead.x >= canvasWidth / gridSize ||
        newHead.y < 0 || newHead.y >= canvasHeight / gridSize) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (segment.x === newHead.x && segment.y === newHead.y) {
            gameOver();
            return;
        }
    }
    
    // Check food collision
    let ateFood = false;
    let eatenWord = null;
    for (let i = 0; i < foodItems.length; i++) {
        if (foodItems[i].x === newHead.x && foodItems[i].y === newHead.y) {
            const levelData = gameData[currentLevel];
            const expectedWord = levelData.words[currentWordIndex + 1].word;
            
            if (foodItems[i].word === expectedWord) {
                // Correct word
                eatenWord = foodItems[i].word;
                
                // MODIFIED: Play audio of the eaten word when snake head touches it
                // NEW: Convert punctuation to spoken Chinese when reading
                playAudioWithPunctuation(eatenWord);
                
                playCorrectSound();
                showFeedback("真棒！", "#4CAF50");
                score++;
                document.getElementById('score').textContent = score;
                currentWordIndex++;
                
                // MODIFIED: Add new segment with the eaten word to the END of the snake
                // This preserves each segment's individual word
                snake.push({ x: -1, y: -1, word: eatenWord }); // Temporary position, will be updated
                foodItems.splice(i, 1);
                
                // Check if level complete
                if (currentWordIndex === levelData.words.length - 1) {
                    levelComplete();
                    return;
                }
                
                ateFood = true;
                break;
            } else {
                // Wrong word
                playWrongSound();
                showFeedback("不对哦", "#ff6b6b");
                // Flash the wrong food item
                flashFood(foodItems[i]);
            }
        }
    }
    
    // MODIFIED: Move snake - preserve each segment's word
    if (ateFood) {
        // When food is eaten, move all segments forward and update the new tail position
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
            // IMPORTANT: Keep each segment's original word, don't copy from previous segment
        }
        snake[0] = newHead;
    } else {
        // Normal movement: shift all segments forward, preserving their words
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
            // IMPORTANT: Keep each segment's original word, don't copy from previous segment
        }
        snake[0] = newHead;
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw grid (optional, for visual reference)
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }
    for (let y = 0; y < canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }
    
    // Draw food items
    foodItems.forEach(food => {
        drawWord(food.x, food.y, food.word, '#FFD700', '#FF6B6B');
    });
    
    // MODIFIED: Draw snake - each segment displays its own word (preserved from when it was added)
    snake.forEach((segment, index) => {
        const color = index === 0 ? '#4CAF50' : '#81C784';
        drawWord(segment.x, segment.y, segment.word, color, 'white');
    });
}

// MODIFIED: Enhanced text visibility with black stroke/outline for better contrast
function drawWord(x, y, word, bgColor, textColor) {
    const pixelX = x * gridSize;
    const pixelY = y * gridSize;
    
    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(pixelX, pixelY, gridSize, gridSize);
    
    // Draw border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(pixelX, pixelY, gridSize, gridSize);
    
    // MODIFIED: Draw text with black stroke for better visibility
    ctx.font = `bold ${gridSize * 0.65}px "Microsoft YaHei", "SimHei", Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw black stroke/outline around text for better contrast
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(word, pixelX + gridSize / 2, pixelY + gridSize / 2);
    
    // Draw the main text
    ctx.fillStyle = textColor;
    ctx.fillText(word, pixelX + gridSize / 2, pixelY + gridSize / 2);
}

// Handle keyboard input
function handleKeyPress(e) {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
    }
}

// Game over
function gameOver() {
    gameRunning = false;
    document.getElementById('gameOverScreen').classList.remove('hidden');
}

// Retry level
function retryLevel() {
    document.getElementById('gameOverScreen').classList.add('hidden');
    initLevel();
}

// Level complete
function levelComplete() {
    gameRunning = false;
    const levelData = gameData[currentLevel];
    
    document.getElementById('completeSentence').textContent = levelData.sentence;
    document.getElementById('completePinyin').textContent = levelData.pinyin;
    document.getElementById('completeTranslation').textContent = levelData.translation;
    
    document.getElementById('levelCompleteScreen').classList.remove('hidden');
}

// Next level
function nextLevel() {
    document.getElementById('levelCompleteScreen').classList.add('hidden');
    currentLevel++;
    
    if (currentLevel >= gameData.length) {
        // MODIFIED: All levels complete - show enhanced completion screen with review
        showAllCompleteScreen();
    } else {
        initLevel();
    }
}

// NEW FUNCTION: Show all complete screen with total score, encouragement, and review section
function showAllCompleteScreen() {
    // Display total score
    document.getElementById('totalScore').textContent = score;
    
    // Generate encouragement message based on score
    const encouragementMessage = getEncouragementMessage(score);
    document.getElementById('encouragementMessage').textContent = encouragementMessage;
    
    // Build review list with all sentences
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';
    
    gameData.forEach((levelData, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Review header with level number and audio button
        const reviewHeader = document.createElement('div');
        reviewHeader.className = 'review-header';
        
        const reviewLevel = document.createElement('div');
        reviewLevel.className = 'review-level';
        reviewLevel.textContent = `第 ${index + 1} 关`;
        
        // Audio button for each sentence
        const reviewAudioBtn = document.createElement('button');
        reviewAudioBtn.className = 'review-audio-btn';
        reviewAudioBtn.textContent = '🔊';
        reviewAudioBtn.title = '听朗读';
        reviewAudioBtn.addEventListener('click', () => playAudio(levelData.sentence));
        
        reviewHeader.appendChild(reviewLevel);
        reviewHeader.appendChild(reviewAudioBtn);
        
        // Sentence
        const reviewSentence = document.createElement('div');
        reviewSentence.className = 'review-sentence';
        reviewSentence.textContent = levelData.sentence;
        
        // Pinyin
        const reviewPinyin = document.createElement('div');
        reviewPinyin.className = 'review-pinyin';
        reviewPinyin.textContent = levelData.pinyin;
        
        // Translation
        const reviewTranslation = document.createElement('div');
        reviewTranslation.className = 'review-translation';
        reviewTranslation.textContent = levelData.translation;
        
        // Append all elements to review item
        reviewItem.appendChild(reviewHeader);
        reviewItem.appendChild(reviewSentence);
        reviewItem.appendChild(reviewPinyin);
        reviewItem.appendChild(reviewTranslation);
        
        reviewList.appendChild(reviewItem);
    });
    
    // Show the all complete screen
    document.getElementById('allCompleteScreen').classList.remove('hidden');
}

// NEW FUNCTION: Generate encouragement message based on total score
function getEncouragementMessage(totalScore) {
    const maxScore = gameData.reduce((sum, level) => sum + level.words.length - 1, 0);
    const percentage = (totalScore / maxScore) * 100;
    
    if (percentage === 100) {
        return "完美！你是真正的华文高手！🌟";
    } else if (percentage >= 90) {
        return "太棒了！你的表现非常出色！👏";
    } else if (percentage >= 80) {
        return "很好！继续保持这个水平！💪";
    } else if (percentage >= 70) {
        return "不错！再接再厉！📚";
    } else {
        return "加油！多练习就会进步的！💪";
    }
}

// Restart game
function restartGame() {
    document.getElementById('allCompleteScreen').classList.add('hidden');
    currentLevel = 0;
    score = 0;
    initLevel();
}

// Toggle hint panel
function toggleHint() {
    const hintContent = document.getElementById('hintContent');
    hintContent.classList.toggle('hidden');
}

// Update hint panel with current level data
function updateHintPanel() {
    const levelData = gameData[currentLevel];
    
    document.getElementById('hintSentence').textContent = levelData.sentence;
    document.getElementById('hintPinyin').textContent = levelData.pinyin;
    document.getElementById('hintTranslation').textContent = levelData.translation;
    
    // Build vocabulary list
    const vocabList = document.getElementById('vocabList');
    vocabList.innerHTML = '';
    
    levelData.words.forEach(wordData => {
        if (wordData.word === '。' || wordData.word === '，') return; // Skip punctuation
        
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocab-item';
        
        const wordDiv = document.createElement('div');
        wordDiv.className = 'vocab-word';
        wordDiv.textContent = wordData.word;
        
        const pinyinDiv = document.createElement('div');
        pinyinDiv.className = 'vocab-pinyin';
        pinyinDiv.textContent = wordData.pinyin;
        
        const translationDiv = document.createElement('div');
        translationDiv.className = 'vocab-translation';
        translationDiv.textContent = wordData.translation;
        
        vocabItem.appendChild(wordDiv);
        vocabItem.appendChild(pinyinDiv);
        vocabItem.appendChild(translationDiv);
        
        vocabList.appendChild(vocabItem);
    });
}

// NEW FUNCTION: Play audio with punctuation converted to Chinese spoken words
// When reading snake body text, "，" is read as "逗号" (comma), "。" is read as "句号" (period)
function playAudioWithPunctuation(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Convert punctuation to spoken Chinese
        let spokenText = text;
        if (text === '，') {
            spokenText = '逗号';
        } else if (text === '。') {
            spokenText = '句号';
        }
        
        const utterance = new SpeechSynthesisUtterance(spokenText);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Speech synthesis not supported');
    }
}

// Play audio (simulated with speech synthesis)
function playAudio(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Speech synthesis not supported');
    }
}

// Play correct sound
function playCorrectSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // C5
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Play wrong sound
function playWrongSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200; // Lower frequency for wrong sound
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Show feedback message
function showFeedback(message, color) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.position = 'absolute';
    feedback.style.top = '50%';
    feedback.style.left = '50%';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.fontSize = '36px';
    feedback.style.fontWeight = 'bold';
    feedback.style.color = color;
    feedback.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    feedback.style.zIndex = '50';
    feedback.style.pointerEvents = 'none';
    feedback.style.animation = 'fadeOut 1s forwards';
    
    document.getElementById('gamePanel').appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 1000);
}

// Flash food item when wrong
function flashFood(food) {
    // This will be handled visually in the next draw cycle
    const originalColor = '#FFD700';
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        flashCount++;
        if (flashCount > 4) {
            clearInterval(flashInterval);
        }
    }, 100);
}

// Add CSS animation for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
    }
`;
document.head.appendChild(style);