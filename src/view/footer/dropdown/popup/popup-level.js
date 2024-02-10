import { Popup } from './popup.js';
import { arrCell, itemLevelPopupMenu } from '../../../../util/variables.js';
import ElementCreator from '../../../../util/element-creator.js';
import styles from './popup.module.scss';
import { PopupImage } from './popup-image.js';
import { Store } from '../../../../util/store.js';
import { InnerLevel } from '../inner/inner-level.js';
import { InnerImage } from '../inner/inner-image.js';
import Overlay from '../../../overlay.js';
import Timer from '../../../../util/timer.js';

export class PopupLevel extends Popup {
    constructor() {
        super();

        // ======== > singleton < ======== //
        if (PopupLevel.exists) {
            return PopupLevel.instance;
        }
        PopupLevel.instance = this;
        PopupLevel.exists = true;
        // ======== > singleton < ======== //
        this.popup = this.elementCreator.getElement();
        this.setItemPopup();

        this.innerLevel = new InnerLevel();
        this.innerImage = new InnerImage();
        this.popupImage = new PopupImage();
        this.overlay = new Overlay();
        this.isActive = false;
        this.timer = new Timer();
    }

    setItemPopup() {
        itemLevelPopupMenu.forEach((item) => {
            const i = new ElementCreator({
                tag: 'div',
                classNames: [styles.item],
                textContent: item.value,
                attribute: [{ id: 'data-size', value: item.size }],
                callback: [{ event: 'click', callback: (e) => this.handlerClick(e) }],
            }).getElement();
            this.arrItemsHtmlElement.push(i);
        });

        this.renderItemsInPopup();
    }

    toggleActive() {
        this.isActive ? this.popup.classList.remove(styles.active) : this.popup.classList.add(styles.active);
        this.isActive = !this.isActive;
        if (!this.isActive && !this.popupImage.getStatus()) {
            this.overlay.removeActive();
        }
        this.isActive && this.overlay.setActive();
    }

    removeActive() {
        this.popup.classList.remove(styles.active);
        this.isActive = false;
    }

    removeThisActive() {
        this.popup.classList.remove(styles.active);
        this.isActive = false;
        this.innerLevel.removeActive();
        this.overlay.removeActive();
    }

    renderItemsInPopup() {
        this.arrItemsHtmlElement.map((el) => this.menu.append(el));
    }

    getStatus() {
        return this.isActive;
    }

    handlerClick(e) {
        const size = +e.currentTarget.dataset.size;
        Store.setLevelGame(size);
        const itemsGame = arrCell.filter((dataGame) => dataGame.size === Number(Store.getLevelGame()));
        Store.setCurrentGame(itemsGame[0].id);
        Store.setSizeGameField();
        Store.setCurrentArrCell();
        Store.stopGame();
        Store.setIsHelpGame(false);

        this.popupImage.setItemPopupImage();
        this.innerImage.setInput(itemsGame[0].name);
        this.removeThisActive();
        this.innerLevel.setInput(itemLevelPopupMenu.find((i) => i.size === size).value);
        this.draw.writeCanvas();
        this.clueLeft.writeCanvasLeft();
        this.clueTop.writeCanvasTop();
        this.timer.stop();
        this.timer.resetTimer();
    }
}
