import Timer from './timer.js';
import { Store } from './store.js';
import { itemLevelPopupMenu, localItem, localItemGame } from './variables.js';

export class LocalStorage {
    /**
     * @typedef {{level: {}, name: string, time: number, isDarkTheme: boolean, currentCell: [[number]]}} saveGame
     */

    constructor() {
        this.time = new Timer();
    }

    save() {
        const resObj = {
            level: itemLevelPopupMenu.find((i) => i.size === Store.getLevelGame()).value,
            dateToday: this.getDate(),
            name: Store.getCurrentGame().name,
            time: this.time.getValueTime(),
        };

        if (localStorage.getItem(localItem)) {
            const result = JSON.parse(localStorage.getItem(localItem));
            if (result.length > 4) {
                result.shift();
            }
            const writeObj = [...result, resObj];

            localStorage.setItem(localItem, JSON.stringify(writeObj));
        } else {
            localStorage.setItem(localItem, JSON.stringify([resObj]));
        }
    }

    restore() {
        if (localStorage.getItem(localItem)) {
            const dataLs = JSON.parse(localStorage.getItem(localItem));
            dataLs.sort((a, b) => a.time - b.time);
            dataLs.forEach((el) => el.time = this.time.msToTime(el.time));
            return dataLs;
        }
    }

    getDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const time = today.toLocaleTimeString('ru-RU');
        return `${mm}/${dd}/${yyyy} - ${time}`;
    }

    saveGame() {
        /**
         * @type {{gameId: string, isDarkTheme: boolean, level: number, currentCell: {x: number, y: number}[], time}} saveObj
         */
        const saveObj = {
            gameId: Store.getCurrentGame().id,
            level: Store.getLevelGame(),
            time: this.time.getValueTime(),
            isDarkTheme: Store.getIsDarkTheme(),
            currentCell: Store.getCurrentArrCell(),
        };

        localStorage.setItem(localItemGame, JSON.stringify(saveObj));
    }

    loadGame() {
        if (localStorage.getItem(localItemGame)) {
            return JSON.parse(localStorage.getItem(localItemGame));
        }
        return null;
    }
}
