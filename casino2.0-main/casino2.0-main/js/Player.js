export class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    hit(card) {
        this.hand.push(card);
    }

    getScore() {
        let score = 0;
        let aces = 0;

        this.hand.forEach(card => {
            score += card.value;
            if (card.label === "A") aces++;
        });

        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }

        return score;
    }
}

export class Dealer extends Player {
    shouldHit() {
        return this.getScore() < 17;
    }
}
