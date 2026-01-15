class SlotMachine {
    constructor(symbols) {
        this.symbols = symbols;
    }

    spin() {
        return [
            this.getRandomSymbol(),
            this.getRandomSymbol(),
            this.getRandomSymbol()
        ];
    }

    getRandomSymbol() {
        const totalChance = this.symbols.reduce((sum, s) => sum + s.chance, 0);
        let rand = Math.random() * totalChance;

        for (let symbol of this.symbols) {
            rand -= symbol.chance;
            if (rand <= 0) return symbol;
        }
    }

    calculateWin(result) {
        const [a, b, c] = result;

        if (a.icon === b.icon && b.icon === c.icon) {
            return a.payout;
        }
        return 0;
    }
}
