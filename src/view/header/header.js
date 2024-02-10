import View from '../../util/view.js';
import styles from './header.module.scss';
import { TimerView } from './timer/timer-view.js';
import { Checkbox } from '../ui/checkbox/checkbox.js';
import { Button } from '../ui/button/button.js';
import { Store } from '../../util/store.js';
import { BasicCanvas } from '../container/draw/basic-canvas.js';
import { ClueTop } from '../container/draw/clues/clue-top.js';
import { ClueLeft } from '../container/draw/clues/clue-left.js';
import Timer from '../../util/timer.js';
import { LocalStorage } from '../../util/local-storage.js';
import Modal from '../modal/modal.js';
import { InnerLevel } from '../footer/dropdown/inner/inner-level.js';
import { InnerImage } from '../footer/dropdown/inner/inner-image.js';
import { itemLevelPopupMenu } from '../../util/variables.js';
import { PopupImage } from '../footer/dropdown/popup/popup-image.js';

export class Header extends View {
    constructor() {
        /**
         * @type {import('../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'section',
            classNames: [styles.header],
        };
        super(params);

        this.configureView();
        this.timer = new Timer();
        this.canvas = new BasicCanvas();
        this.clueTop = new ClueTop();
        this.clueLeft = new ClueLeft();
        this.innerImage = new InnerImage();
        this.innerLevel = new InnerLevel();
        this.popupImage = new PopupImage();
    }

    configureView() {
        const header = this.elementCreator.getElement();
        const timer = new TimerView().getHtmlElement();

        const buttonLoad = new Button('Load', () => this.handlerLoadBtn()).getHtmlElement();
        const buttonSave = new Button('Save', () => this.handlerSaveBtn()).getHtmlElement();
        this.checkboxTheme = new Checkbox('theme', (e) => this.handlerCheckboxTheme(e));
        const checkboxSound = new Checkbox('sound', (e) => this.handlerCheckboxSound(e)).getHtmlElement();

        header.append(this.checkboxTheme.getHtmlElement(), buttonSave, timer, buttonLoad, checkboxSound);
    }

    handlerCheckboxTheme(e) {
        const body = document.querySelector('body');
        if (e.target.checked) {
            body.classList.add('dark');
            Store.setDarkTheme();
        } else {
            body.classList.remove('dark');
            Store.setLigthTheme();
        }

        this.rerenderCanvas();
    }

    handlerCheckboxSound(e) {
        Store.setSound(!e.target.checked);
    }

    handlerSaveBtn() {
        if (Store.getStatusGame()) {
            new LocalStorage().saveGame();
        } else {
            new Modal().showModal('message', 'To save, the game must be started!');
        }
    }

    handlerLoadBtn() {
        /**
         * @type {{isDarkTheme: boolean, level: number,currentCell: Array | {x: number, y: number}[], gameId: number, time}} resultLs
         */
        const resultLs = new LocalStorage().loadGame();

        if (resultLs) {
            if (resultLs.isDarkTheme) {
                const body = document.querySelector('body');
                body.classList.add('dark');
                Store.setDarkTheme();
                this.checkboxTheme.setValue(true);
            }
            Store.setCurrentGame(resultLs.gameId);
            Store.setSizeGameField();
            Store.setCurrentArrCell();
            Store.setCurrentArrCell(resultLs.currentCell);
            Store.setLevelGame(resultLs.level);

            this.timer.stop();
            this.timer.resetTimer();
            Store.stopGame();
            this.timer.setTime(resultLs.time);
            this.innerImage.setInput(Store.getCurrentGame().name);
            this.innerLevel.setInput(itemLevelPopupMenu.find((i) => i.size === resultLs.level).value);
            this.popupImage.setItemPopupImage();
            this.rerenderCanvas();
        } else {
            new Modal().showModal('message', 'There are no saved games!');
        }
    }

    rerenderCanvas() {
        this.canvas.writeCanvas();
        this.clueTop.writeCanvasTop();
        this.clueLeft.writeCanvasLeft();
    }
}
