import Timer from '../../../util/timer.js';
import View from '../../../util/view.js';
import styles from './timer.module.scss';

export class TimerView extends View {
    constructor() {
        /**
         * @type {import('../../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'div',
            classNames: [styles.timer, 'timer'],
        };
        super(params);

        // ======== > singleton < ======== //
        if (TimerView.exists) {
            return TimerView.instance;
        }
        TimerView.instance = this;
        TimerView.exists = true;
        // ======== > singleton < ======== //

        this.configureView();
        this.timer = new Timer();
    }

    configureView() {
        this.timer = this.elementCreator.getElement();
        this.timer.textContent = '00:00';
    }
}
