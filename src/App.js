import { Wrapper } from './view/wrapper.js';
import Modal from './view/modal/modal.js';
import { Store } from './util/store.js';
import Overlay from './view/overlay.js';

export default class App {
    constructor() {
        this.body = document.querySelector('body');
        this.createHtmlElement();
    }

    createHtmlElement() {
        const overlay = new Overlay().getHtmlElement();
        const wrapper = new Wrapper().getHtmlElement();
        const modal = new Modal().getHtmlElement();

        this.body.append(overlay, modal, wrapper);
        Store.setCurrentArrCell();
    }
}
