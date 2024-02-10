import View from '../../../../util/view.js';
import { Store } from '../../../../util/store.js';
import { HelperDraw } from '../helper-draw/helper-draw.js';
import { generateArrClues } from '../../../../util/generate-clues.js';

export class ClueLeft extends View {
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
        if (ClueLeft.exists) {
            return ClueLeft.instance;
        }
        ClueLeft.instance = this;
        ClueLeft.exists = true;
        // ======== > singleton < ======== //
        this.canvasHtml = this.elementCreator.getElement();
        this.ctx = this.canvasHtml.getContext('2d');
    }

    writeCanvasLeft() {
        const arrClues = this.getDataCurrentGame().verticalArrClues;
        this.canvasHtml.width = Store.getSizeCell() * arrClues[0].length;
        this.canvasHtml.height = Store.getSizeCell() * Store.getSizeGameField().y;

        HelperDraw.drawRectClue(this.ctx, arrClues);
        HelperDraw.drawBoldLine(this.ctx);
    }

    getDataCurrentGame() {
        const dataCurrentGame = Store.getCurrentGame();
        return generateArrClues(dataCurrentGame.arrBase);
    }
}
