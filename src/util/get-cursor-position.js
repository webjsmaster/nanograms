import { Store } from './store.js';

function getCursorPosition(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / Store.getSizeCell());
    const y = Math.floor((event.clientY - rect.top) / Store.getSizeCell());
    return {
        x,
        y,
    };
}

export { getCursorPosition };
