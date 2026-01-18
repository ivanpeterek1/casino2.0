class Symbol {
    constructor(icon, chance, payout) {
        this.icon = icon;       
        this.chance = chance;   
        this.payout = payout;   
    }
}

const SYMBOLS = [
    new Symbol("🍒", 40, 50),
    new Symbol("🍋", 30, 250),
    new Symbol("🔔", 15, 500),
    new Symbol("⭐", 10, 800),
    new Symbol("💎", 5, 15000)
];
