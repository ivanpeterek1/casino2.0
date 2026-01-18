let spinning = false;

const machine = new SlotMachine(SYMBOLS);

function pullLever() {
    if (spinning) return;
    spinning = true;

    const lever = document.querySelector(".lever");
    lever.classList.add("pull");

    setTimeout(() => {
        lever.classList.remove("pull");
        spin();
        spinning = false;
    }, 500);
}

function spin() {
    let money = getMoney();
    if (money < 10) {
        setMessage("You don't have enough money");
        spinning = false;
        return;
    }

    money -= 10;
    setMoney(money);

    setMessage("Spining");

    const result = machine.spin();

    const slots = [
        document.getElementById("slot1"),
        document.getElementById("slot2"),
        document.getElementById("slot3")
    ];

    spinReel(slots[0], 700, result[0]);
    spinReel(slots[1], 1100, result[1]);
    spinReel(slots[2], 1500, result[2]);

    setTimeout(() => {
const win = machine.calculateWin(result);

if (win > 0) {
    setMoney(getMoney() + win);
    setMessage(`Win ${win} $`);

    const slots = document.querySelectorAll(".slot");
    slots.forEach(s => s.classList.add("win"));

    setTimeout(() => {
        slots.forEach(s => s.classList.remove("win"));
    }, 2000);

} else {
    setMessage("Try again");
}


        spinning = false;
    }, 1600);
}

function setMessage(text) {
    document.getElementById("message").textContent = text;
}

function spinReel(slotEl, duration, finalSymbol) {
    slotEl.classList.add("spinning");

    const interval = setInterval(() => {
        const random = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        slotEl.textContent = random.icon;
    }, 80);

    setTimeout(() => {
        clearInterval(interval);
        slotEl.classList.remove("spinning");
        slotEl.textContent = finalSymbol.icon;
    }, duration);
}