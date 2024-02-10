import View from '../../../util/view.js';
import './content.scss';
import ElementCreator from '../../../util/element-creator';
import Modal from '../modal';
import { BasicCanvas } from '../../container/draw/basic-canvas.js';
import { ClueTop } from '../../container/draw/clues/clue-top.js';
import { ClueLeft } from '../../container/draw/clues/clue-left.js';
import Timer from '../../../util/timer.js';

export default class Content extends View {
    constructor() {
        /**
         * @type {ElementParams} params
         */
        const params = {
            tag: 'div',
            classNames: ['modal__content'],
        };
        super(params);
        this.configureView();

        this.modal = new Modal();
        this.canvas = new BasicCanvas();
        this.clueTop = new ClueTop();
        this.clueLeft = new ClueLeft();
        this.timer = new Timer();
    }

    configureView() {
        const content = this.elementCreator.getElement();
        this.wrapperBtn = new ElementCreator({ tag: 'div', classNames: ['modal__wrapper-btn'] }).getElement();
        const button = new ElementCreator({
            tag: 'button',
            classNames: ['modal__cls-btn'],
            callback: [{ event: 'click', callback: () => this.handleClick() }],
            textContent: 'Close',
        });
        this.wrapperBtn.append(button.getElement());
        content.append(this.wrapperBtn);
    }

    handleClick() {
        this.modal.setStatus(!this.modal.getStatus());
    }

    setContent(text) {
        this.removeContent();
        const message = new ElementCreator({ tag: 'div', textContent: text, classNames: ['modal__message'] });
        this.elementCreator.getElement().prepend(message.getElement());
    }

    setResult(data) {
        this.removeContent();
        const title = new ElementCreator({ tag: 'li', classNames: ['modal__list-item'] }).getElement();
        const id = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: 'N/n' }).getElement();
        const size = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: 'Size' }).getElement();
        const date = new ElementCreator({ tag: 'div', classNames: ['modal__item-date'], textContent: 'Date' }).getElement();
        const name = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: 'Name' }).getElement();
        const time = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: 'Time' }).getElement();
        title.append(id, date, size, name, time);

        const result = new ElementCreator({ tag: 'ul', classNames: ['modal__result-list'] }).getElement();
        const message = new ElementCreator({ tag: 'div', textContent: 'No games have been played yet', classNames: ['modal__message'] }).getElement();

        if (!!data && data.length) {
            result.append(title);
            data.map((d, i) => result.append(this.createItemList(d, i)));
        } else {
            this.elementCreator.getElement().prepend(message);
        }
        this.elementCreator.getElement().prepend(result);
    }

    createItemList(itemData, index) {
        const item = new ElementCreator({ tag: 'li', classNames: ['modal__list-item'] }).getElement();
        const id = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: `${index + 1}.` }).getElement();
        const time = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: itemData.time }).getElement();
        const date = new ElementCreator({ tag: 'div', classNames: ['modal__item-date'], textContent: itemData.dateToday }).getElement();
        const name = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: itemData.name }).getElement();
        const level = new ElementCreator({ tag: 'div', classNames: ['modal__item'], textContent: itemData.level }).getElement();
        item.append(id, date, level, name, time);
        return item;
    }

    setNewGame(callback) {
        this.removeContent();
        const message = new ElementCreator({ tag: 'div', textContent: 'Want to start a new game?', classNames: ['modal__message'] });
        const button = new ElementCreator({
            tag: 'button',
            classNames: ['modal__ok-btn'],
            textContent: 'Ok',
            callback: [{ event: 'click', callback: () => this.handleClickOk(callback) }],
        });
        this.wrapperBtn.append(button.getElement());
        this.elementCreator.getElement().prepend(message.getElement());
    }

    handleClickOk(callback) {
        callback();
        this.modal.setStatus(false);
    }

    removeContent() {
        const checkChildNode = this.elementCreator.getElement().querySelector('.modal__result-list');
        const checkChildNode1 = this.elementCreator.getElement().querySelector('.modal__ok-btn');
        const checkChildNode2 = this.elementCreator.getElement().querySelector('.modal__message');
        if (this.elementCreator.getElement().contains(checkChildNode)) {
            this.elementCreator.getElement().removeChild(checkChildNode);
        }

        if (this.wrapperBtn.contains(checkChildNode1)) {
            this.wrapperBtn.removeChild(checkChildNode1);
        }

        if (this.elementCreator.getElement().contains(checkChildNode2)) {
            this.elementCreator.getElement().removeChild(checkChildNode2);
        }
    }
}
