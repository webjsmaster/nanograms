import { defineConfig } from 'vite';
import svgLoader from '@mistweaverco/vite-svg-loader';

export default defineConfig({
    build: {
        outDir: './docs',
    },
    base: './',
    plugins: [svgLoader()],
});
