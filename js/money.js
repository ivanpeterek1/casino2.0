if (!localStorage.getItem("money")) {
    localStorage.setItem("money", 100);
}


function getMoney() {
    return parseInt(localStorage.getItem("money"));
}

function setMoney(amount) {
    localStorage.setItem("money", amount);
    updateMoneyDisplay();
}

function updateMoneyDisplay() {
    const el = document.getElementById("money");
    if (el) el.textContent = getMoney();
}

updateMoneyDisplay();

function addMoney(amount) {
    let money = getMoney();
    money += amount;
    setMoney(money);
}
