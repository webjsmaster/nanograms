import bomb from '../assets/sounds/bomb.mp3';
import click from '../assets/sounds/click.mp3';
import win from '../assets/sounds/win.mp3';
import { Store } from './store.js';

export class Sound {
    constructor() {
        this.bomb = new Audio(`${bomb}`);
        this.click = new Audio(`${click}`);
        this.win = new Audio(`${win}`);
    }

    playBomb() {
        this.bomb.currentTime = 0;
        return Store.getStatusSound() && this.bomb.play();
    }

    playClick() {
        this.click.currentTime = 0;
        return Store.getStatusSound() && this.click.play();
    }

    playWin() {
        return Store.getStatusSound() && this.win.play();
    }
}
