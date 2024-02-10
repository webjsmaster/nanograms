/**
 * @typedef {{
 * tag: string,
 * classNames: Array<string>,
 * textContent?: string,
 * callback?: [{event: string, callback: Function}],
 * attribute?: Array<{id: string, value: string}>,
 * }} ElementParams
 */
export default class ElementCreator {
    /**
     * @param {ElementParams} param
     */
    constructor(param) {
        this.element = null;
        this.createElement(param);
    }

    /**
     * @param {ElementParams} param
     */
    createElement(param) {
        this.element = document.createElement(param.tag);
        this.setClasses(param.classNames);
        this.setTextContent(param.textContent);
        this.setCallback(param.callback);
        this.setAttribute(param.attribute);
    }

    /**
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }

    /**
     * @param{Array<string>} classes
     */
    setClasses(classes) {
        classes.forEach((className) => this.element.classList.add(className));
    }

    /**
     * @param {string}text
     */

    setTextContent(text) {
        this.element.textContent = text;
    }

    /**
     * @param {[{event: string, callback: Function}]} callbacks
     */
    setCallback(callbacks) {
        if (callbacks && callbacks.length > 0) {
            callbacks.forEach((c) => this.element.addEventListener(c.event, (e) => c.callback(e)));
        }
    }

    /**
     * @param {[{id:string, value: string}]} attr
     */
    setAttribute(attr) {
        if (attr) {
            attr.forEach((a) => this.element.setAttribute(a.id, a.value));
        }
    }
}
