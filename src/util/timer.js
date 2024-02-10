import { TimerView } from '../view/header/timer/timer-view';

export default class Timer {
    constructor() {
        // ======== > singleton < ======== //
        if (Timer.exists) {
            return Timer.instance;
        }
        Timer.instance = this;
        Timer.exists = true;
        // ======== > singleton < ======== //
        this.time = 0;
        this.timeElement = new TimerView();
    }

    start() {
        if (this.timer) return;
        this.timer = setInterval(() => {
            this.time += 1;
            this.timeElement.getHtmlElement().textContent = this.msToTime(this.time);
        }, 1000);
    }

    msToTime(duration) {
        let seconds = Math.floor(duration % 60);
        let minutes = Math.floor((duration / 60) % 60);
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }

    stop() {
        clearInterval(this.timer);
    }

    resetTimer() {
        this.time = 0;
        this.timer = null;
        this.timeElement.getHtmlElement().textContent = this.msToTime(this.time);
    }

    getTime() {
        return this.msToTime(this.time);
    }

    getValueTime() {
        return this.time;
    }

    setTime(value) {
        this.time = value;
        this.timeElement.getHtmlElement().textContent = this.msToTime(value);
    }
}
