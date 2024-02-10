import View from '../../../../util/view.js';
import { Store } from '../../../../util/store.js';
import { HelperDraw } from '../helper-draw/helper-draw.js';
import { generateArrClues } from '../../../../util/generate-clues.js';

export class ClueTop extends View {
    constructor() {
        /**
         * @type {import('../../../../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'canvas',
            classNames: [],
        };
        super(params);
        // ======== > singleton < ======== //
        if (ClueTop.exists) {
            return ClueTop.instance;
        }
        ClueTop.instance = this;
        ClueTop.exists = true;
        // ======== > singleton < ======== //
        this.canvasHtml = this.elementCreator.getElement();
        this.ctx = this.canvasHtml.getContext('2d');
    }

    writeCanvasTop() {
        const arrClues = this.getDataCurrentGame().gorizontalArrClues;
        this.canvasHtml.width = Store.getSizeCell() * Store.getSizeGameField().x;
        this.canvasHtml.height = Store.getSizeCell() * arrClues.length;

        HelperDraw.drawRectClue(this.ctx, arrClues);
        HelperDraw.drawBoldLine(this.ctx);
    }

    getDataCurrentGame() {
        const dataCurrentGame = Store.getCurrentGame();
        return generateArrClues(dataCurrentGame.arrBase);
    }
}
