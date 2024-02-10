import styles from './container.module.scss';
import View from '../../util/view.js';
import ElementCreator from '../../util/element-creator.js';
import { ClueTop } from './draw/clues/clue-top.js';
import { BasicCanvas } from './draw/basic-canvas.js';
import { ClueLeft } from './draw/clues/clue-left.js';
import { Store } from '../../util/store.js';

export class Container extends View {
    /**
     * @type {HTMLDivElement} gameField
     */
    static gameField = null;

    constructor() {
        /**
         * @type {import('../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'section',
            classNames: [styles.container, 'container-canvas'],
            attribute: [{
                id: 'id',
                value: 'container',
            }],
        };
        super(params);
        // ======== > singleton < ======== //
        if (Container.exists) {
            return Container.instance;
        }
        Container.instance = this;
        Container.exists = true;
        // ======== > singleton < ======== //

        this.configureView();
    }

    configureView() {
        const container = this.elementCreator.getElement();

        this.gameField = new ElementCreator({
            tag: 'div',
            classNames: [styles.gameField, 'game-field'],
        }).getElement();

        Container.gameField = this.gameField;

        const draw = new BasicCanvas();
        const clueTop = new ClueTop();
        const clueLeft = new ClueLeft();

        this.gameField.append(clueTop.getHtmlElement(), clueLeft.getHtmlElement(), draw.getHtmlElement());
        container.append(this.gameField);

        document.addEventListener('DOMContentLoaded', () => {
            draw.writeCanvas();
            clueTop.writeCanvasTop();
            clueLeft.writeCanvasLeft();
        });

        window.addEventListener('resize', (e) => {
            if (e.currentTarget.screen.width < 650) {
                Store.setSizeCell(20);
            } else {
                Store.setSizeCell(30);
            }

            draw.writeCanvas();
            clueTop.writeCanvasTop();
            clueLeft.writeCanvasLeft();
        });
    }
}
