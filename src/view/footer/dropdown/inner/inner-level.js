import { Inner } from './inner.js';
import styles from './inner.module.scss';
import Overlay from '../../../overlay.js';
import { InnerImage } from './inner-image.js';
import { PopupImage } from '../popup/popup-image.js';

export class InnerLevel extends Inner {
    constructor() {
        super();
        // ======== > singleton < ======== //
        if (InnerLevel.exists) {
            return InnerLevel.instance;
        }
        InnerLevel.instance = this;
        InnerLevel.exists = true;
        // ======== > singleton < ======== //
        this.inner = this.elementCreator.getElement();
        this.innerImage = new InnerImage();
        this.popupImage = new PopupImage();
        this.isActive = false;
        this.overlay = new Overlay();
    }

    toggleActive() {
        if (this.isActive) {
            this.inner.classList.remove(styles.active);
        } else {
            this.innerImage.removeActive();
            this.popupImage.removeActive();
            this.inner.classList.add(styles.active);
        }

        this.isActive = !this.isActive;
    }

    removeActive() {
        this.inner.classList.remove(styles.active);
        this.isActive = false;
    }
}
