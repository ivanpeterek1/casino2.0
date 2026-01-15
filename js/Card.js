export class Card {
    constructor(suit, value, label) {
        this.suit = suit;
        this.value = value;
        this.label = label;
    }

    get display() {
        return `${this.label}${this.suit}`;
    }
}

export class FaceCard extends Card {
    constructor(suit, label) {
        super(suit, 10, label);
    }
}

export class AceCard extends Card {
    constructor(suit) {
        super(suit, 11, "A");
    }
}
