import { Card, FaceCard, AceCard } from "./Card.js";

export class Deck {
    constructor() {
        this.cards = [];
        this.build();
        this.shuffle();
    }

    build() {
        const suits = ["♠", "♥", "♦", "♣"];
        suits.forEach(suit => {
            for (let i = 2; i <= 10; i++) {
                this.cards.push(new Card(suit, i, i));
            }
            this.cards.push(new FaceCard(suit, "J"));
            this.cards.push(new FaceCard(suit, "Q"));
            this.cards.push(new FaceCard(suit, "K"));
            this.cards.push(new AceCard(suit));
        });
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    draw() {
        return this.cards.pop(); // nikdy se nevrátí → žádná duplicita
    }
}
