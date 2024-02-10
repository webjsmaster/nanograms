import View from '../../../util/view.js';
import styles from './button.module.scss';

export class Button extends View {
    /**
     * @param {string} text
     * @param {function} callback
     */
    constructor(text, callback) {
        /**
         * @type {import('../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'button',
            classNames: [styles.button, 'button'],
            callback: [{ event: 'click', callback }],
            textContent: text,
        };

        super(params);
    }
}
