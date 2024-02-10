import ElementCreator from '../../../../util/element-creator.js';
import View from '../../../../util/view.js';
import styles from './popup.module.scss';
import { BasicCanvas } from '../../../container/draw/basic-canvas.js';
import { ClueTop } from '../../../container/draw/clues/clue-top.js';
import { ClueLeft } from '../../../container/draw/clues/clue-left.js';

export class Popup extends View {
    constructor(type) {
        /**
         * @type {import('../../../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'div',
            classNames: [styles.popup],
        };
        super(params);
        this.arrItemsHtmlElement = [];
        this.configureView(type);
        this.draw = new BasicCanvas();
        this.clueTop = new ClueTop();
        this.clueLeft = new ClueLeft();
    }

    configureView() {
        const popup = this.elementCreator.getElement();
        this.menu = new ElementCreator({ tag: 'div', classNames: [styles.menu] }).getElement();

        popup.append(this.menu);
    }
}
