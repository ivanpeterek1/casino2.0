import { Deck } from "./Deck.js";
import { Player, Dealer } from "./Player.js";

let deck, player, dealer;
let betAmount = 50;
let gameOver = false;

startGame();

/* ---------- SÁZENÍ ---------- */
window.changeBet = function (amount) {
    betAmount += amount;
    if (betAmount < 50) betAmount = 50;
    if (betAmount > 1000) betAmount = 1000;
    document.getElementById("bet").textContent = betAmount;
};

/* ---------- START HRY ---------- */
function startGame() {
    gameOver = false;
    deck = new Deck();
    player = new Player("Hráč");
    dealer = new Dealer("Dealer");

    player.hit(deck.draw());
    player.hit(deck.draw());
    dealer.hit(deck.draw());
    dealer.hit(deck.draw());

    toggleButtons(true);
    document.getElementById("reset").style.display = "none";
    document.getElementById("message").textContent = "";

    render();
}

/* ---------- OVLÁDÁNÍ ---------- */
document.getElementById("hit").onclick = () => {
    if (gameOver) return;

    player.hit(deck.draw());
    render();

    if (player.getScore() > 21) endGame();
};

document.getElementById("stand").onclick = () => {
    if (gameOver) return;

    while (dealer.shouldHit()) {
        dealer.hit(deck.draw());
    }
    endGame();
};

document.getElementById("reset").onclick = startGame;

function endGame() {
    gameOver = true;

    const p = player.getScore();
    const d = dealer.getScore();
    let msg = "Remíza";

    let money = getMoney();

    if (p > 21) {
        msg = "❌ Prohrál jsi";
        setMoney(money - betAmount);
    } else if (d > 21 || p > d) {
        msg = "🎉 Vyhrál jsi";
        setMoney(money + betAmount);
    } else if (p < d) {
        msg = "❌ Prohrál jsi";
        setMoney(money - betAmount);
    }

    document.getElementById("message").textContent = msg;
    document.getElementById("reset").style.display = "inline-block";
    toggleButtons(false);

    render();
}

/* ---------- UI ---------- */
function toggleButtons(active) {
    document.getElementById("hit").disabled = !active;
    document.getElementById("stand").disabled = !active;
}

function render() {
    draw("player-cards", player);
    draw("dealer-cards", dealer);

    document.getElementById("player-score").textContent = player.getScore();
    document.getElementById("dealer-score").textContent = dealer.getScore();
}

function draw(id, who) {
    const el = document.getElementById(id);
    el.innerHTML = "";
    who.hand.forEach(card => {
        el.textContent += card.display + " ";
    });
}
