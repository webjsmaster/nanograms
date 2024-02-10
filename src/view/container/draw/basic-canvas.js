import View from '../../../util/view.js';
import { Store } from '../../../util/store.js';
import styles from './basic-canvas.module.scss';
import { HelperDraw } from './helper-draw/helper-draw.js';
import { getCursorPosition } from '../../../util/get-cursor-position.js';
import Modal from '../../modal/modal.js';
import Timer from '../../../util/timer.js';
import { Sound } from '../../../util/sound.js';
import { LocalStorage } from '../../../util/local-storage.js';
import { ClueTop } from './clues/clue-top.js';
import { ClueLeft } from './clues/clue-left.js';

export class BasicCanvas extends View {
    constructor() {
        /**
         * @type {import('../../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'canvas',
            classNames: [styles.canvas],
        };
        super(params);

        // ======== > singleton < ======== //
        if (BasicCanvas.exists) {
            return BasicCanvas.instance;
        }
        BasicCanvas.instance = this;
        BasicCanvas.exists = true;
        // ======== > singleton < ======== //

        this.canvasHtml = this.elementCreator.getElement();

        this.canvasHtml.addEventListener('mousemove', (e) => this.handlerMove(e));
        this.canvasHtml.addEventListener('mousedown', (e) => this.handlerDown(e));
        this.canvasHtml.addEventListener('mouseup', () => this.handlerUp());
        this.canvasHtml.addEventListener('mouseout', () => this.handlerOut());
        this.canvasHtml.addEventListener('contextmenu', (e) => this.handlerContext(e));

        this.timeout = null;
        this.isMouseDown = false;
        this.currentCell = {
            x: null,
            y: null,
        };
        this.ctx = this.canvasHtml.getContext('2d');
        this.modal = new Modal();
        this.timer = new Timer();
        this.sound = new Sound();
        this.clueTop = new ClueTop();
        this.clueLeft = new ClueLeft();
        this.ls = new LocalStorage();
    }

    writeCanvas() {
        this.canvasHtml.width = Store.getSizeCell() * Store.getSizeGameField().x;
        this.canvasHtml.height = Store.getSizeCell() * Store.getSizeGameField().y;

        this.ctx.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);

        if (Store.getIsDarkTheme()) {
            this.ctx.fillStyle = '#ffffff';
        } else {
            this.ctx.fillStyle = '#8f8f8f';
        }

        this.ctx.fillRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.drawGrid();
    }

    drawGrid() {
        if (Store.getIsDarkTheme()) {
            HelperDraw.drawRect(this.ctx, '#2d3134');
        } else {
            HelperDraw.drawRect(this.ctx, '#ffffff');
        }

        HelperDraw.drawBoldLine(this.ctx);

        Store.getCurrentArrCell()
            .map((arr, y) => arr.map((el, x) => {
                if (el === 1) {
                    if (Store.getIsDarkTheme()) {
                        this.renderActive(x, y, '#8f8f8f');
                    } else {
                        this.renderActive(x, y, '#000000');
                    }
                } else if (el === 2) {
                    this.renderCross(x, y);
                } else if (Store.getIsDarkTheme()) {
                    this.renderActive(x, y, '#2d3134');
                } else {
                    this.renderActive(x, y, '#ffffff');
                }
            }));
    }

    handlerMove(e) {
        if (this.isMouseDown) {
            const {
                x,
                y,
            } = getCursorPosition(e, this.canvasHtml);
            if (this.currentCell.x !== x || this.currentCell.y !== y) {
                clearInterval(this.timeout);
                this.currentCell = {
                    x,
                    y,
                };
                this.sound.playClick();
                if (Store.getIsDarkTheme()) {
                    this.renderActive(x, y, '#8f8f8f');
                } else {
                    this.renderActive(x, y, '#000000');
                }
                Store.setValueItemCurrentArrCell(x, y, 1);

                this.checkingForWinning();
            }
        }
    }

    handlerDown(e) {
        if (e.button !== 0) return;

        if (Store.getIsHelpGame()) {
            this.modal.showModal('newGame', this.handlerClickNewGame.bind(this));
            return;
        }

        if (!Store.getStatusGame()) {
            Store.startGame();
            this.timer.start();
        }

        clearInterval(this.timeout);

        this.sound.playClick();

        this.isMouseDown = true;
        const {
            x,
            y,
        } = getCursorPosition(e, this.canvasHtml);
        this.currentCell = {
            x,
            y,
        };
        if (Store.getValueItemCurrentArrCell(x, y) === 1) {
            if (Store.getIsDarkTheme()) {
                this.renderActive(x, y, '#2d3134');
            } else {
                this.renderActive(x, y, '#ffffff');
            }
            Store.setValueItemCurrentArrCell(x, y, 0);
        } else {
            if (Store.getIsDarkTheme()) {
                this.renderActive(x, y, '#8f8f8f');
            } else {
                this.renderActive(x, y, '#000000');
            }
            Store.setValueItemCurrentArrCell(x, y, 1);
        }

        this.checkingForWinning();
    }

    handlerUp() {
        this.isMouseDown = false;
    }

    handlerOut() {
        this.isMouseDown = false;
    }

    handlerContext(e) {
        e.preventDefault();

        if (!Store.getStatusGame()) {
            Store.startGame();
            this.timer.start();
        }

        const {
            x,
            y,
        } = getCursorPosition(e, this.canvasHtml);
        this.sound.playBomb();
        if (Store.getValueItemCurrentArrCell(x, y) !== 2) {
            if (Store.getIsDarkTheme()) {
                this.renderActive(x, y, '#2d3134');
            } else {
                this.renderActive(x, y, '#ffffff');
            }
            Store.setValueItemCurrentArrCell(x, y, 2);
            this.renderCross(x, y);
        } else if (Store.getValueItemCurrentArrCell(x, y) === 2) {
            if (Store.getIsDarkTheme()) {
                this.renderActive(x, y, '#2d3134');
            } else {
                this.renderActive(x, y, '#ffffff');
            }
            Store.setValueItemCurrentArrCell(x, y, 0);
        }
    }

    renderCross(x, y) {
        HelperDraw.drawCrossLines(this.ctx, x, y);
    }

    renderActive(x, y, color) {
        HelperDraw.drawActiveRect(this.ctx, x, y, color);
        HelperDraw.drawBoldLine(this.ctx);
    }

    checkingForWinning() {
        this.timeout = setTimeout(() => {
            const transformArr = Store.getCurrentArrCell()
                .map((arr) => arr.map((el) => (el === 1 ? el : 0)));
            if ((JSON.stringify(transformArr) === JSON.stringify(Store.getCurrentGame().arrBase)) && Store.getStatusGame()) {
                this.timer.stop();
                this.sound.playWin();
                this.modal.showModal('message', `Поздравляем! Вы выйгрыли! Ваше время:  ${this.timer.getTime()}`);
                Store.setIsHelpGame(true);
                Store.stopGame();
                this.ls.save();
            }
        }, 1000);
    }

    handlerClickNewGame() {
        Store.setCurrentArrCell();
        Store.stopGame();
        Store.setIsHelpGame(false);
        this.writeCanvas();
        this.clueTop.writeCanvasTop();
        this.clueLeft.writeCanvasLeft();
        this.timer.resetTimer();
    }
}
