let currentQuestion = null;
let correctEV = 0;
let score = 0;
let currentRound = 1;
let totalRounds = 10;
let soundOn = true;
let difficulty = null;

const clickSound = new Audio("click.mp3");
const successSound = new Audio("success.mp3");

const questions = {
    easy: [
        { question: "You flip a coin. Heads: win $6. Tails: win nothing.", ev: 3, hint: "EV = (0.5 × 6) + (0.5 × 0) = 3" },
        { question: "You find a scratch ticket. 50% chance to win $4.", ev: 2, hint: "EV = (0.5 × 4) + (0.5 × 0) = 2" },
        { question: "You get a $1 lunch bet. 25% chance to win $5, 75% chance $0.", ev: 1.25, hint: "EV = (0.25 × 5) + (0.75 × 0) = 1.25" },
        { question: "A vending machine mystery button gives 80% chance of a $2 drink, 20% chance of $0.", ev: 1.6, hint: "EV = (0.8 × 2) + (0.2 × 0) = 1.6" },
        { question: "Scratch-off: 10% chance to win $15.", ev: 1.5, hint: "EV = (0.1 × 15) + (0.9 × 0) = 1.5" },
        { question: "You flip a coin. Heads: win $5. Tails: win $1.", ev: 3, hint: "EV = (0.5 × 5) + (0.5 × 1) = 3" },
        { question: "You roll a 4-sided die. You win $2 if it's even, $0 if odd.", ev: 1, hint: "Even: 2/4 × $2, Odd: 2/4 × $0 → EV = 1" },
        { question: "Pick a number 1–4. If correct, win $8. Else nothing.", ev: 2, hint: "EV = (1/4 × 8) + (3/4 × 0) = 2" },
        { question: "You spin a wheel: 70% win $1, 30% win $4.", ev: 1.9, hint: "EV = (0.7 × 1) + (0.3 × 4) = 1.9" },
        { question: "Flip 2 coins. You get $2 per head.", ev: 2, hint: "E[#heads]=1 → EV = 1 × 2 = 2" },
        { question: "You flip a coin. Heads: win $2. Tails: win $2.", ev: 2, hint: "EV = (0.5 × 2) + (0.5 × 2) = 2" },
        { question: "You draw a card from 4. One wins $10, others $0.", ev: 2.5, hint: "EV = (1/4 × 10) + (3/4 × 0) = 2.5" },
        { question: "Roll a die. Win $1 per pip.", ev: 3.5, hint: "EV = average(1..6) = 3.5" },
        { question: "Flip a coin. Heads = $3. Tails = $1.", ev: 2, hint: "EV = (0.5 × 3) + (0.5 × 1) = 2" },
        { question: "Mystery snack bag: 50% $2 candy, 50% $1 bar.", ev: 1.5, hint: "EV = (0.5 × 2) + (0.5 × 1) = 1.5" },
        { question: "You guess a number 1–3. Win $6 if right.", ev: 2, hint: "EV = (1/3 × 6) + (2/3 × 0) = 2" },
        { question: "You draw a marble. 25% win $4, 75% nothing.", ev: 1, hint: "EV = (0.25 × 4) + (0.75 × 0) = 1" },
        { question: "Spin wheel: 40% $3, 60% $0.", ev: 1.2, hint: "EV = (0.4 × 3) + (0.6 × 0) = 1.2" },
        { question: "Coin flip. Heads = win $8. Tails = win $0.", ev: 4, hint: "EV = (0.5 × 8) + (0.5 × 0) = 4" },
        { question: "Draw 1 of 5 tickets. One wins $12.", ev: 2.4, hint: "EV = (1/5 × 12) + (4/5 × 0) = 2.4" },
        { question: "Roll a die. If you roll 6, win $12. Otherwise win $0.", ev: 2, hint: "EV = (1/6 × 12) + (5/6 × 0) = 2" },
        { question: "Flip a coin. Heads: win $10. Tails: lose $2.", ev: 4, hint: "EV = (0.5 × 10) + (0.5 × -2) = 4" },
        { question: "Spin: 60% win $2, 40% win $1.", ev: 1.6, hint: "EV = (0.6 × 2) + (0.4 × 1) = 1.6" },
        { question: "Pick 1 of 4 cups. One has $9, others $0.", ev: 2.25, hint: "EV = (1/4 × 9) + (3/4 × 0) = 2.25" },
        { question: "You roll a die. Win $3 if it's 1–2, win $0 otherwise.", ev: 1, hint: "EV = (2/6 × 3) + (4/6 × 0) = 1" },
        { question: "Scratch ticket: 20% win $5, 80% win $0.", ev: 1, hint: "EV = (0.2 × 5) + (0.8 × 0) = 1" }



        // ... (add your other questions with hints)
    ],
    medium: [
        { question: "You enter a raffle for $2. 10% chance to win $20 gift card.", ev: 0, hint: "EV = (0.1 × 20) – 2 = 0" },
        { question: "Mystery box costs $5. 60% $6 item, 30% $10, 10% nothing.", ev: 1.6, hint: "EV = (0.6×6) + (0.3×10) + (0.1×0) – 5 = 1.6" },
        { question: "Spin wheel for $2. 50% win $3, 20% win $5, 30% $0.", ev: 0.5, hint: "EV = (0.5×3) + (0.2×5) + (0.3×0) – 2 = 0.5" },
        { question: "Pay $3 to pull a ticket. 50% win $4, 50% win $0.", ev: -1, hint: "EV = (0.5 × 4) + (0.5 × 0) – 3 = -1" },
        { question: "Spin a prize wheel for $2. 1 in 3 chance to win $6.", ev: 0, hint: "EV = (1/3 × 6) – 2 = 0" },
        { question: "Buy a loot box for $4. 40% win $6, 40% $2, 20% nothing.", ev: -0.8, hint: "EV = (0.4×6 + 0.4×2 + 0.2×0) – 4 = -0.8" },
        { question: "Raffle: Pay $1. 5% win $30.", ev: 0.5, hint: "EV = (0.05 × 30) – 1 = 0.5" },
        { question: "Scratch card: $2 cost. 20% $10, 20% $5, 60% $0.", ev: 1, hint: "EV = (0.2×10 + 0.2×5 + 0.6×0) – 2 = 1" },
        { question: "Pay $2 to flip a coin. Win $5 if heads.", ev: 0.5, hint: "EV = (0.5 × 5) + (0.5 × 0) – 2 = 0.5" },
        { question: "Buy a mystery box for $3. 30% $10, 70% nothing.", ev: 0, hint: "EV = (0.3 × 10) – 3 = 0" },
        { question: "Spend $4 to spin. 60% $5, 40% $0.", ev: -1, hint: "EV = (0.6 × 5) – 4 = -1" },
        { question: "Scratch card $2. 40% $4, 30% $2, 30% $0.", ev: 0.2, hint: "EV = (0.4×4 + 0.3×2 + 0.3×0) – 2 = 0.2" },
        { question: "Buy a token for $1. 20% win $6, 80% $0.", ev: 0.2, hint: "EV = (0.2 × 6) – 1 = 0.2" },
        { question: "Spend $3 on a ticket. 10% $15, 90% $0.", ev: -1.5, hint: "EV = (0.1 × 15) – 3 = -1.5" },
        { question: "Spin: 25% win $8, 25% $4, 50% $0. Cost: $2.", ev: 1, hint: "EV = (0.25×8 + 0.25×4 + 0.5×0) – 2 = 1" },
        { question: "Buy 1 of 5 keys for $2. One opens a $10 prize.", ev: 0, hint: "EV = (1/5 × 10) – 2 = 0" },
        { question: "Spend $2 on candy box. 50% $4, 50% $0.", ev: 0, hint: "EV = (0.5 × 4) – 2 = 0" },
        { question: "Arcade game costs $3. 60% win $4, 40% $0.", ev: -0.6, hint: "EV = (0.6 × 4) – 3 = -0.6" },

        { question: "Pay $3 to roll a die. If it's 1–3 win $6, if it's 4–6 win $0.", ev: 0, hint: "EV = (3/6×6 + 3/6×0) – 3 = 0" },
        { question: "Pay $2. 50% win $7, 50% lose $1.", ev: 1, hint: "EV = (0.5×7 + 0.5×-1) – 2 = 1" },
        { question: "Pay $5. 70% win $8, 30% win $0.", ev: 0.6, hint: "EV = (0.7×8 + 0.3×0) – 5 = 0.6" },
        { question: "Pay $4. 20% win $20, 50% win $5, 30% $0.", ev: 2.5, hint: "EV = (0.2×20 + 0.5×5 + 0.3×0) – 4 = 2.5" },
        { question: "No entry fee. 10% chance to win $15, 90% chance to lose $1.", ev: 0.6, hint: "EV = (0.1×15) + (0.9×-1) = 0.6" },
        { question: "Pay $2. 25% win $12, 25% win $4, 50% $0.", ev: 2, hint: "EV = (0.25×12 + 0.25×4 + 0.5×0) – 2 = 2" }

        // ...
    ],
    hard: [
        { question: "Ring toss $5: 10% chance to win $50.", ev: 0, hint: "EV = (0.1 × 50) – 5 = 0" },
        { question: "Spin a $4 wheel: 25% $0, 25% $2, 25% $6, 25% $12.", ev: 1, hint: "EV = (0.25×0)+(0.25×2)+(0.25×6)+(0.25×12) – 4 = 1" },
        { question: "Goldfish toss $2: 90% $0, 9% $5, 1% $100.", ev: -0.55, hint: "EV = (0.9×0)+(0.09×5)+(0.01×100) – 2 = -0.55" },
        { question: "You pay $5 to spin. 40% win $12, 40% $5, 20% $0.", ev: 1.8, hint: "EV = (0.4×12 + 0.4×5 + 0.2×0) – 5 = 1.8" },
        { question: "Jackpot game: $3 entry. 10% $20, 30% $5, 60% $0.", ev: 0.5, hint: "EV = (0.1×20 + 0.3×5 + 0.6×0) – 3 = 0.5" },
        { question: "Buy-in $4. Win $50 (5%), $10 (20%), $0 (75%).", ev: 0.5, hint: "EV = (0.05×50 + 0.2×10 + 0.75×0) – 4 = 0.5" },
        { question: "Spin a risky wheel for $10. 50% $15, 10% $50, 40% $0.", ev: 0.5, hint: "EV = (0.5×15 + 0.1×50 + 0.4×0) – 10 = 0.5" },
        { question: "Pay $6 to roll a D6. Prize = roll × $2.", ev: 1, hint: "EV = (avg roll 3.5 × 2) – 6 = 1" },
        { question: "Pay $4 to spin. 20% win $15, 30% win $5, 50% $0.", ev: 0.5, hint: "EV = (0.2×15 + 0.3×5 + 0.5×0) – 4 = 0.5" },
        { question: "$3 game. 10% $25, 20% $10, 70% $0.", ev: 1.5, hint: "EV = (0.1×25 + 0.2×10 + 0.7×0) – 3 = 1.5" },
        { question: "Spend $5. 5% $50, 15% $15, 80% $0.", ev: 0.5, hint: "EV = (0.05×50 + 0.15×15 + 0.8×0) – 5 = 0.5" },
        { question: "$6 buy-in. 50% win $8, 25% win $2, 25% $0.", ev: -1.5, hint: "EV = (0.5×8 + 0.25×2 + 0.25×0) – 6 = -1.5" },
        { question: "You pay $10. 10% win $50, 90% nothing.", ev: -5, hint: "EV = (0.1×50 + 0.9×0) – 10 = -5" },
        { question: "Scratch ticket costs $4. 15% $20, 25% $6, 60% $0.", ev: 0.5, hint: "EV = (0.15×20 + 0.25×6 + 0.6×0) – 4 = 0.5" },
        { question: "Buy 1 of 4 tokens for $5. One worth $20.", ev: 0, hint: "EV = (1/4×20) – 5 = 0" },
        { question: "Roll D6 for $3. Prize = roll × $1.", ev: 0.5, hint: "EV = (avg roll 3.5 × 1) – 3 = 0.5" },
        { question: "Mystery box $5. 10% $40, 20% $10, 70% $0.", ev: 1, hint: "EV = (0.1×40 + 0.2×10 + 0.7×0) – 5 = 1" },
        { question: "Spin for $6. 30% $15, 30% $5, 40% $0.", ev: 0, hint: "EV = (0.3×15 + 0.3×5 + 0.4×0) – 6 = 0" },

        { question: "Pay $8. 5% win $200, 15% win $20, 80% $0.", ev: 4, hint: "EV = (0.05×200 + 0.15×20 + 0.8×0) – 8 = 4" },
        { question: "Pay $5. 30% win $30, 50% win $8, 20% lose $10.", ev: 7, hint: "EV = (0.3×30 + 0.5×8 + 0.2×-10) – 5 = 7" },
        { question: "Pay $6. 1% win $500, 9% win $20, 90% $0.", ev: 0.8, hint: "EV = (0.01×500 + 0.09×20 + 0.9×0) – 6 = 0.8" },
        { question: "Pay $4. 40% win $12, 30% win $4, 30% lose $6.", ev: 2.4, hint: "EV = (0.4×12 + 0.3×4 + 0.3×-6) – 4 = 2.4" },
        { question: "Pay $10. 50% win $25, 30% win $5, 20% $0.", ev: 4, hint: "EV = (0.5×25 + 0.3×5 + 0.2×0) – 10 = 4" },
        { question: "Pay $7. 25% win $40, 25% win $10, 50% $0.", ev: 5.5, hint: "EV = (0.25×40 + 0.25×10 + 0.5×0) – 7 = 5.5" }

        // ...
    ]
};

function playClick() {
    if (soundOn) clickSound.play();
}

function playSuccess() {
    if (soundOn) successSound.play();
}

function selectDifficulty(level) {
    playClick();
    difficulty = level;
    document.querySelectorAll('.difficulty-button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`${level}Btn`).classList.add('selected');
    document.getElementById("startBtn").disabled = false;
}

function startGame() {
    playClick();
    score = 0;
    currentRound = 1;
    totalRounds = parseInt(document.getElementById("roundCount").value);
    document.getElementById("scoreDisplay").innerText = "Score: 0";
    document.getElementById("roundDisplay").innerText = `Round: 1 / ${totalRounds}`;
    document.getElementById("setup").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    nextQuestion();
}

function toggleSound() {
    soundOn = !soundOn;
    document.getElementById("muteBtn").innerText = soundOn ? "🔊 Sound On" : "🔇 Sound Off";
}

function getRandomQuestion() {
    const pool = questions[difficulty];
    return pool[Math.floor(Math.random() * pool.length)];
}

function nextQuestion() {
    currentQuestion = getRandomQuestion();
    correctEV = currentQuestion.ev;
    document.getElementById("questionText").innerText = currentQuestion.question;
    document.getElementById("evInput").value = '';
    document.getElementById("result").innerText = "Awaiting your answer...";
    document.getElementById("roundDisplay").innerText = `Round: ${currentRound} / ${totalRounds}`;
}

function submitAnswer() {
    playClick();

    const estimate = parseFloat(document.getElementById("evInput").value);

    if (isNaN(estimate)) {
        document.getElementById("result").innerText = "❌ Please enter your EV estimate.";
        return;
    }

    const tolerance = 0.25;
    if (Math.abs(estimate - correctEV) <= tolerance) {
        document.getElementById("result").innerText = `✅ Correct! EV = ${correctEV.toFixed(2)}`;
        score++;
        document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
        playSuccess();
    } else {
        document.getElementById("result").innerText = `❌ Incorrect. EV = ${correctEV.toFixed(2)}`;
    }

    if (currentRound < totalRounds) {
        currentRound++;
        setTimeout(nextQuestion, 2000);
    } else {
        setTimeout(endGame, 2500);
    }
}

function endGame() {
    document.getElementById("gameContainer").innerHTML = `
    <h2>🎉 Game Over!</h2>
    <p>Your final score: ${score} / ${totalRounds}</p>
    <button onclick="location.reload()">🔄 Play Again</button>
  `;
}

function showHint() {
    playClick();
    const hint = currentQuestion?.hint || "Hint: Expected Value = (Probability × Outcome) for all outcomes, minus any cost.";
    document.getElementById("result").innerText = `💡 Hint: ${hint}`;
}
