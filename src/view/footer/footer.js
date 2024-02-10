import View from '../../util/view.js';
import styles from './footer.module.scss';
import { Dropdown } from './dropdown/dropdown.js';

export class Footer extends View {
    constructor() {
        /**
         * @type {import('../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'section',
            classNames: [styles.footer],
        };
        super(params);

        this.configureView();
    }

    configureView() {
        //
        // footer.append(checkboxTheme, checkboxSound);

        const footer = this.elementCreator.getElement();
        // const timer = new TimerView().getHtmlElement();
        const dropdown1 = new Dropdown('level').getHtmlElement();
        const dropdown2 = new Dropdown('image').getHtmlElement();

        footer.append(dropdown1, dropdown2);
    }
}
