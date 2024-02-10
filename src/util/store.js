import { arrCell } from './variables';

export class Store {
    static #sizeGameField = { x: 5, y: 5 };
    static #currentArrCell = new Array(Store.getSizeGameField().x);
    static #arrGames = arrCell;
    static #currentGame = 0;
    static #isGame = false;
    static #sizeCell = 30;
    static #levelGame = 5;
    static #darkTheme = false;
    static #isSound = true;
    static $isHelpGame = false;

    /**
     * @param {boolean} status
     */
    static setSound(status) {
        this.#isSound = status;
    }

    static setIsHelpGame(status) {
        this.$isHelpGame = status;
    }

    static getStatusSound() {
        return this.#isSound;
    }

    static getIsHelpGame() {
        return this.$isHelpGame;
    }

    static setDarkTheme() {
        this.#darkTheme = true;
    }

    static setLigthTheme() {
        this.#darkTheme = false;
    }

    static getIsDarkTheme() {
        return this.#darkTheme;
    }

    static setSizeCell(size) {
        this.#sizeCell = size;
    }

    static getSizeCell() {
        return this.#sizeCell;
    }

    static setSizeGameField() {
        Store.#sizeGameField = {
            x: Store.getCurrentGame().arrBase.length,
            y: Store.getCurrentGame().arrBase[0].length,
        };
    }

    static getSizeGameField() {
        return Store.#sizeGameField;
    }

    static setCurrentArrCell(arr) {
        if (arr && Array.isArray(arr)) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    Store.setValueItemCurrentArrCell(j, i, arr[i][j]);
                }
            }
        } else {
            Store.#currentArrCell = [[]];
            for (let i = 0; i < this.getSizeGameField().y; i++) {
                Store.#currentArrCell[i] = new Array(this.getSizeGameField().x).fill(0);
            }
        }
    }

    static getCurrentArrCell() {
        return Store.#currentArrCell;
    }

    static setValueItemCurrentArrCell(x, y, count) {
        Store.#currentArrCell[y][x] = count;
    }

    static getValueItemCurrentArrCell(x, y) {
        return Store.#currentArrCell[y][x];
    }

    static getGameArr() {
        return Store.#arrGames;
    }

    static getGameForId(id) {
        return Store.#arrGames.find((el) => el.id === id);
    }

    static startGame() {
        this.#isGame = true;
    }

    static stopGame() {
        this.#isGame = false;
    }

    static getStatusGame() {
        return this.#isGame;
    }

    static getCurrentGame() {
        return Store.#arrGames.find((el) => +el.id === Store.#currentGame);
    }

    static setCurrentGame(id) {
        this.#currentGame = id;
    }

    static setLevelGame(level) {
        this.#levelGame = level;
    }

    static getLevelGame() {
        return this.#levelGame;
    }
}
