import View from '../../util/view.js';
import styles from './block-btn.module.scss';
import { Button } from '../ui/button/button.js';
import { LocalStorage } from '../../util/local-storage.js';
import Modal from '../modal/modal.js';
import { GenerateRandomGame } from '../../util/generate-random-game.js';
import { Store } from '../../util/store.js';
import { BasicCanvas } from '../container/draw/basic-canvas.js';
import { ClueTop } from '../container/draw/clues/clue-top.js';
import { ClueLeft } from '../container/draw/clues/clue-left.js';
import Timer from '../../util/timer.js';
import { InnerImage } from '../footer/dropdown/inner/inner-image.js';
import { InnerLevel } from '../footer/dropdown/inner/inner-level.js';
import { itemLevelPopupMenu } from '../../util/variables.js';
import { PopupImage } from '../footer/dropdown/popup/popup-image.js';

export class BlockBtn extends View {
    constructor() {
        /**
         * @type {import('../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'section',
            classNames: [styles.blockBtn],
        };
        super(params);

        this.configureView();
        this.ls = new LocalStorage();
        this.modal = new Modal();
        this.randome = new GenerateRandomGame();
        this.canvas = new BasicCanvas();
        this.clueTop = new ClueTop();
        this.clueLeft = new ClueLeft();
        this.timer = new Timer();
        this.innerImage = new InnerImage();
        this.innerLevel = new InnerLevel();
        this.popupImage = new PopupImage();
    }

    configureView() {
        const block = this.elementCreator.getElement();
        const randomeBtn = new Button('random', this.handlerRandomBtn.bind(this)).getHtmlElement();
        const showResultBtn = new Button('show result', this.handlerShowResultBtn.bind(this)).getHtmlElement();
        const buttonHelp = new Button('Help', this.handlerHelpBtn.bind(this)).getHtmlElement();
        const buttonReset = new Button('Reset', this.handlerResetBtn.bind(this)).getHtmlElement();

        block.append(randomeBtn, showResultBtn, buttonHelp, buttonReset);
    }

    handlerRandomBtn() {
        Store.setIsHelpGame(false);
        const randomeGemeId = this.randome.generate();
        Store.setCurrentGame(randomeGemeId);
        Store.setSizeGameField();
        Store.setCurrentArrCell();
        Store.stopGame();
        Store.setLevelGame(Store.getCurrentGame().size);
        this.innerLevel.setInput(itemLevelPopupMenu.find((i) => i.size === Store.getLevelGame()).value);
        this.innerImage.setInput(Store.getCurrentGame().name);
        this.popupImage.setItemPopupImage();
        this.timer.stop();
        this.timer.resetTimer();
        this.rerenderCanvas();
    }

    handlerShowResultBtn() {
        this.modal.showModal('showResult', this.ls.restore());
    }

    handlerResetBtn() {
        Store.setIsHelpGame(false);
        Store.setCurrentArrCell();
        Store.stopGame();
        this.timer.stop();
        this.timer.resetTimer();
        this.rerenderCanvas();
    }

    handlerHelpBtn() {
        Store.setIsHelpGame(true);
        Store.stopGame();
        this.timer.stop();
        Store.setCurrentArrCell(Store.getCurrentGame().arrBase);
        this.rerenderCanvas();
    }

    rerenderCanvas() {
        this.canvas.writeCanvas();
        this.clueTop.writeCanvasTop();
        this.clueLeft.writeCanvasLeft();
    }
}
