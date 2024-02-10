/**
 * @typedef {{
 *     tag: string,
 *     classNames: Array<string>,
 * }} ViewParams
 */
import ElementCreator from './element-creator.js';

export default class View {
    /**
     * @param {import('./element-creator').ElementParams} params
     */
    constructor(params) {
        this.elementCreator = this.createView(params);
    }

    /**
     * @returns {HTMLElement}
     */
    getHtmlElement() {
        return this.elementCreator.getElement();
    }

    /**
     * @param {import('./element-creator').ElementParams} params
     * @returns {ElementCreator}
     */
    createView(params) {
        const elementParams = {
            tag: params.tag,
            classNames: params.classNames,
            textContent: params.textContent,
            callback: params.callback,
            attribute: params.attribute,
        };
        return new ElementCreator(elementParams);
    }
}
