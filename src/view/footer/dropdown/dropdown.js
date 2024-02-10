import View from '../../../util/view.js';
import styles from './dropdown.module.scss';
import { itemLevelPopupMenu } from '../../../util/variables.js';
import { PopupLevel } from './popup/popup-level.js';
import { PopupImage } from './popup/popup-image.js';
import { Store } from '../../../util/store.js';
import { InnerLevel } from './inner/inner-level.js';
import { InnerImage } from './inner/inner-image.js';

export class Dropdown extends View {
    /**
     * @typedef {'level' | 'image'} TypeDropdown
     */

    /**
     * @param {TypeDropdown} type
     */
    constructor(type) {
        if (!(type === 'level' || type === 'image')) {
            throw Error('Параметр в dropdown задан не верно!');
        }
        /**
         * @type {import('../../../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'div',
            classNames: [styles.dropdown],
        };
        super(params);

        this.type = type;

        Store.setLevelGame(itemLevelPopupMenu[0].size);

        if (type === 'level') {
            this.configureViewLevel();
        } else if (type === 'image') {
            this.configureViewImage();
        }
        // this.isActive = false;
    }

    handlerClick() {
        this.popup.toggleActive();
        this.inner.toggleActive();
    }

    configureViewImage() {
        const dropdown = this.elementCreator.getElement();
        this.popup = new PopupImage();
        this.inner = new InnerImage();

        this.inner.setInput(Store.getCurrentGame().name);
        this.inner.setEventListenerIsShow(() => this.handlerClick());
        dropdown.append(this.inner.getHtmlElement(), this.popup.getHtmlElement());
    }

    configureViewLevel() {
        const dropdown = this.elementCreator.getElement();
        this.popup = new PopupLevel();
        this.inner = new InnerLevel();

        this.inner.setInput(itemLevelPopupMenu[0].value);
        this.inner.setEventListenerIsShow(() => this.handlerClick());
        dropdown.append(this.inner.getHtmlElement(), this.popup.getHtmlElement());
    }
}
