import { Popup } from './popup.js';
import { arrCell } from '../../../../util/variables.js';
import ElementCreator from '../../../../util/element-creator.js';
import styles from './popup.module.scss';
import { Store } from '../../../../util/store.js';
import { InnerImage } from '../inner/inner-image.js';
import Overlay from '../../../overlay.js';
import { PopupLevel } from './popup-level.js';
import { InnerLevel } from '../inner/inner-level.js';
import Timer from '../../../../util/timer.js';

export class PopupImage extends Popup {
    constructor() {
        super();
        // ======== > singleton < ======== //
        if (PopupImage.exists) {
            return PopupImage.instance;
        }
        PopupImage.instance = this;
        PopupImage.exists = true;
        // ======== > singleton < ======== //
        // this.popup = this.elementCreator.getElement();
        this.setItemPopupImage();

        this.popup = this.elementCreator.getElement();
        this.innerImage = new InnerImage();
        this.innerLevel = new InnerLevel();
        this.overlay = new Overlay();
        this.isActive = false;
        this.popupLevel = new PopupLevel();
        this.timer = new Timer();
    }

    setItemPopupImage() {
        this.menu.replaceChildren();
        this.arrItemsHtmlElement = [];
        /**
         * @type {typeArrGame[]} dataGame
         */
        const itemsGame = arrCell.filter((dataGame) => dataGame.size === Number(Store.getLevelGame()));

        itemsGame.forEach((item) => {
            const $item = new ElementCreator({
                tag: 'div',
                classNames: [styles.item],
                attribute: [{ id: 'data-id', value: item.id }],
                callback: [{ event: 'click', callback: (e) => this.handlerClick(e) }],
            }).getElement();

            const title = new ElementCreator({ tag: 'div', classNames: [styles.title], textContent: item.name }).getElement();
            const poster = new ElementCreator({ tag: 'img', classNames: [styles.poster], attribute: [{ id: 'src', value: item.poster }] }).getElement();

            $item.append(poster, title);
            this.arrItemsHtmlElement.push($item);
        });
        this.renderItemsInPopupImage();
    }

    renderItemsInPopupImage() {
        this.arrItemsHtmlElement.map((el) => this.menu.append(el));
    }

    toggleActive() {
        this.isActive ? this.popup.classList.remove(styles.active) : this.popup.classList.add(styles.active);
        this.isActive = !this.isActive;
        this.isActive && this.overlay.setActive();
        !this.isActive && !this.popupLevel.getStatus() && this.overlay.removeActive();
    }

    removeActive() {
        this.popup.classList.remove(styles.active);
        this.isActive = false;
    }

    removeThisActive() {
        this.popup.classList.remove(styles.active);
        this.isActive = false;
        this.innerImage.removeActive();
        this.overlay.removeActive();
    }

    getStatus() {
        return this.isActive;
    }

    handlerClick(e) {
        const takeGame = Store.getGameArr().find((game) => +game.id === +e.currentTarget.dataset.id);
        Store.setCurrentGame(takeGame.id);
        Store.setCurrentArrCell();
        Store.setIsHelpGame(false);
        Store.stopGame();

        this.removeThisActive();
        this.innerImage.setInput(takeGame.name);
        this.draw.writeCanvas();
        this.clueLeft.writeCanvasLeft();
        this.clueTop.writeCanvasTop();
        this.timer.stop();
        this.timer.resetTimer();
    }
}
