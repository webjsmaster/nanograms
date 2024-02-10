import { Inner } from './inner.js';
import styles from './inner.module.scss';
import Overlay from '../../../overlay.js';
import { InnerLevel } from './inner-level.js';
import { PopupLevel } from '../popup/popup-level.js';

export class InnerImage extends Inner {
    constructor() {
        super();
        // ======== > singleton < ======== //
        if (InnerImage.exists) {
            return InnerImage.instance;
        }
        InnerImage.instance = this;
        InnerImage.exists = true;
        // ======== > singleton < ======== //
        this.inner = this.elementCreator.getElement();
        this.innerLevel = new InnerLevel();
        this.popupLevel = new PopupLevel();
        this.isActive = false;
        this.overlay = new Overlay();
    }

    toggleActive() {
        if (this.isActive) {
            this.inner.classList.remove(styles.active);
        } else {
            this.innerLevel.removeActive();
            this.popupLevel.removeActive();
            this.inner.classList.add(styles.active);
        }
        this.isActive = !this.isActive;
    }

    removeActive() {
        this.inner.classList.remove(styles.active);
        this.isActive = false;
    }
}
