const numbers = Array.from({ length: 37 }, (_, i) => i);

const redNumbers = [
    1,3,5,7,9,12,14,16,18,
    19,21,23,25,27,30,32,34,36
];

let betAmount = 50;
let spinning = false;

function changeBet(amount) {
    betAmount += amount;
    if (betAmount < 50) betAmount = 50;
    if (betAmount > 1000) betAmount = 1000;
    document.getElementById("bet").textContent = betAmount;
}

function spinWheel() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getColor(number) {
    if (number === 0) return "green";
    return redNumbers.includes(number) ? "red" : "black";
}

function placeBet(checkWin, label, multiplier = 2) {
    if (spinning) return;
    spinning = true;

    let money = getMoney();
    if (money < betAmount) {
        setMessage("❌ Nemáš dost peněz!");
        spinning = false;
        return;
    }

    setMoney(money - betAmount);
    setMessage(`🎯 Sázka: ${label}`);

    const result = spinWheel();
    const wheel = document.getElementById("wheel");

    const spins = 5 + Math.floor(Math.random() * 5);
    const angle = spins * 360 + Math.random() * 360;

    wheel.style.transition = "transform 2.8s ease-out";
    wheel.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
        document.querySelector(".number").textContent = result;

        if (checkWin(result)) {
            const win = betAmount * multiplier;
            setMoney(getMoney() + win);
            setMessage(`Výhra ${win} Kč! Padlo ${result}`);
        } else {
            setMessage(`Prohra. Padlo ${result}`);
        }

        spinning = false;
    }, 2800);
}

function betColor(color) {
    placeBet(n => getColor(n) === color, color);
}

function betParity(type) {
    placeBet(
        n => n !== 0 && (n % 2 === (type === "even" ? 0 : 1)),
        type
    );
}

function betNumber() {
    const v = document.getElementById("numberSelect").value;
    if (v === "") return setMessage("Vyber číslo!");
    placeBet(n => n === +v, `Číslo ${v}`, 36);
}

function setMessage(text) {
    document.getElementById("message").textContent = text;
}

const sel = document.getElementById("numberSelect");
for (let i = 0; i <= 36; i++) {
    const o = document.createElement("option");
    o.value = i;
    o.textContent = i;
    sel.appendChild(o);
}

