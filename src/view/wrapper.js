import View from '../util/view.js';
import styles from './wrapper.module.scss';
import { Container } from './container/container.js';
import { Header } from './header/header.js';
import { Footer } from './footer/footer.js';
import '../../theme.scss';
import { BlockBtn } from './block-btn/block-btn.js';

export class Wrapper extends View {
    constructor() {
        /**
         * @type {import('../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'div',
            classNames: [styles.wrapper, 'wrapper'],
        };
        super(params);
        // ======== > singleton < ======== //
        if (Wrapper.exists) {
            return Wrapper.instance;
        }
        Wrapper.instance = this;
        Wrapper.exists = true;
        // ======== > singleton < ======== //
        this.configureView();
    }

    configureView() {
        const wrapper = this.elementCreator.getElement();
        const container = new Container().getHtmlElement();
        const header = new Header().getHtmlElement();
        const blockBtn = new BlockBtn().getHtmlElement();
        const footer = new Footer().getHtmlElement();

        wrapper.append(header, footer, container, blockBtn);
    }
}
