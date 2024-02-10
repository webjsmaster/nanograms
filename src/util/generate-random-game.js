import { Store } from './store.js';

export class GenerateRandomGame {
    constructor() {
        this.arrGame = Store.getGameArr();
    }

    generate() {
        return Math.floor(Math.random() * (this.arrGame.length));
    }
}
