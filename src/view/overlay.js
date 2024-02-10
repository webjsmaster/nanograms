import View from '../util/view.js';
import styles from './overlay.module.scss';
import { PopupLevel } from './footer/dropdown/popup/popup-level.js';
import { PopupImage } from './footer/dropdown/popup/popup-image.js';
import { InnerLevel } from './footer/dropdown/inner/inner-level.js';
import { InnerImage } from './footer/dropdown/inner/inner-image.js';

export default class Overlay extends View {
    constructor() {
        /**
         * @type {import('../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'div',
            classNames: [styles.overlay],
            callback: [{ event: 'click', callback: () => this.handlerClick() }],
        };

        super(params);
        // ======== > singleton < ======== //
        if (Overlay.exists) {
            return Overlay.instance;
        }
        Overlay.instance = this;
        Overlay.exists = true;
        // ======== > singleton < ======== //

        // Store.setLevelGame(itemLevelPopupMenu[0].size);
        //
        this.popupLevel = new PopupLevel();
        this.popupImage = new PopupImage();
        this.innerImage = new InnerImage();
        this.innerLevel = new InnerLevel();

        // this.popup = new Popup();
    }

    handlerClick() {
        this.popupLevel.removeActive();
        this.popupImage.removeActive();
        this.innerImage.removeActive();
        this.innerLevel.removeActive();
        this.removeActive();
    }

    setActive() {
        this.elementCreator.getElement().classList.add(styles.active);
    }

    removeActive() {
        this.elementCreator.getElement().classList.remove(styles.active);
    }
}
