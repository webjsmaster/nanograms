import { Store } from '../../../../util/store';

export class HelperDraw {
    static x = Store.getSizeGameField().x;
    static y = Store.getSizeGameField().y;
    static size = Store.getSizeCell();
    static width = Store.getSizeGameField().x * Store.getSizeCell();
    static height = Store.getSizeGameField().y * Store.getSizeCell();

    /**
     * @param {HTMLCanvasElement} ctx
     * @param {string} color
     */
    static drawRect(ctx, color) {
        this.x = Store.getSizeGameField().x;
        this.y = Store.getSizeGameField().y;
        this.size = Store.getSizeCell();
        this.width = Store.getSizeGameField().x * Store.getSizeCell();
        this.height = Store.getSizeGameField().y * Store.getSizeCell();

        for (let h = 0; h < this.y; h += 1) {
            for (let w = 0; w < this.x; w += 1) {
                ctx.fillStyle = color;
                ctx.fillRect(w * this.size, h * this.size, this.size - 1, this.size - 1);
            }
        }
    }

    /**
     * @param {HTMLCanvasElement} ctx
     */
    static drawBoldLine(ctx) {
        const countBlock = HelperDraw.x * HelperDraw.y;
        const { size } = HelperDraw;
        const width = HelperDraw.x * size;
        const height = HelperDraw.y * size;

        if (Store.getIsDarkTheme()) {
            ctx.strokeStyle = '#ffffff';
        } else {
            ctx.strokeStyle = '#8f8f8f';
        }

        for (let i = 0; i < countBlock + 1; i += 5) {
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(0, i * size);
            ctx.lineTo(width, i * size);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i * size, 0);
            ctx.lineTo(i * size, height);
            ctx.stroke();
        }
    }

    /**
     * @param {HTMLCanvasElement} ctx
     * @param {string} color
     */
    static drawActiveRect(ctx, x, y, color) {
        const { size } = HelperDraw;
        ctx.fillStyle = color;
        ctx.fillRect(x * size, y * size, size - 1, size - 1);
    }

    static drawRectClue(ctx, arrValue) {
        const darkTheme = Store.getIsDarkTheme();
        const { size } = HelperDraw;
        for (let h = 0; h < arrValue.length; h += 1) {
            for (let w = 0; w < arrValue[h].length; w += 1) {
                ctx.fillStyle = darkTheme ? '#8f8f8f' : '#dadada';
                ctx.fillRect(w * size, h * size, size - 1, size - 1);
                if (arrValue[h][w] !== 0 && arrValue[h][w] < 10) {
                    ctx.fillStyle = darkTheme ? '#ffffff' : '#000000';
                    ctx.font = `${size === 30 ? 13 : 11}pt Arial`;
                    ctx.fillText(arrValue[h][w], w * size + (size / 3), (h + 1) * size - (size / 4));
                } else if (arrValue[h][w] >= 10) {
                    ctx.fillStyle = darkTheme ? '#ffffff' : '#000000';
                    ctx.fillText(arrValue[h][w], w * size + (size / 6), (h + 1) * size - (size / 3));
                }
            }
        }
    }

    static drawCrossLines(ctx, x, y) {
        const { size } = HelperDraw;

        if (Store.getIsDarkTheme()) {
            ctx.strokeStyle = '#ffffff';
        } else {
            ctx.strokeStyle = '#000000';
        }

        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(x * size + 2, y * size + 2);
        ctx.lineTo(x * size + size - 2, y * size + size - 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x * size + size - 2, y * size + 2);
        ctx.lineTo(x * size + 2, y * size + size - 2);
        ctx.stroke();
    }
}
